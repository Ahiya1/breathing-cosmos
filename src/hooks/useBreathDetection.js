import { useState, useEffect, useRef } from "react";
import { analyzeBreathPattern } from "../utils/breathAnalysis";

function useBreathDetection(microphoneStream) {
  const [breathData, setBreathData] = useState(null);

  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);
  const breathHistoryRef = useRef([]);
  const lastPhaseRef = useRef("neutral");
  const phaseTimerRef = useRef(0);

  useEffect(() => {
    if (!microphoneStream) return;

    const setupAudioAnalysis = async () => {
      try {
        // Create audio context
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();

        // Create analyzer node
        analyzerRef.current = audioContextRef.current.createAnalyser();
        analyzerRef.current.fftSize = 2048;
        analyzerRef.current.smoothingTimeConstant = 0.3;

        // Create source from microphone stream
        sourceRef.current =
          audioContextRef.current.createMediaStreamSource(microphoneStream);
        sourceRef.current.connect(analyzerRef.current);

        // Start analysis loop
        startBreathAnalysis();
      } catch (error) {
        console.error("Error setting up audio analysis:", error);
      }
    };

    setupAudioAnalysis();

    return () => {
      cleanup();
    };
  }, [microphoneStream]);

  const startBreathAnalysis = () => {
    const bufferLength = analyzerRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const analyze = () => {
      if (!analyzerRef.current) return;

      analyzerRef.current.getByteFrequencyData(dataArray);

      // Focus on breathing frequency range (0.1 - 2 Hz)
      // This translates to lower frequency bins in our FFT
      const breathingBins = dataArray.slice(1, 20); // Approximate breathing range

      // Calculate amplitude (breath volume)
      const amplitude =
        breathingBins.reduce((sum, val) => sum + val, 0) /
        breathingBins.length /
        255;

      // Calculate dominant frequency in breathing range
      const maxBin = breathingBins.reduce(
        (maxIdx, val, idx) => (val > breathingBins[maxIdx] ? idx : maxIdx),
        0
      );
      const dominantFreq =
        maxBin *
        (audioContextRef.current.sampleRate / analyzerRef.current.fftSize);

      // Add to history for pattern analysis
      const timestamp = Date.now();
      breathHistoryRef.current.push({
        amplitude,
        frequency: dominantFreq,
        timestamp,
      });

      // Keep only recent history (last 10 seconds)
      breathHistoryRef.current = breathHistoryRef.current.filter(
        (entry) => timestamp - entry.timestamp < 10000
      );

      // Analyze breathing pattern
      const pattern = analyzeBreathPattern(breathHistoryRef.current);

      // Determine breath phase
      const breathPhase = determineBreathPhase(amplitude, pattern);

      // Calculate breath metrics
      const breathDepth = Math.min(1, amplitude * 2); // Normalize breath depth
      const breathRhythm = calculateRhythm(breathHistoryRef.current);
      const coherence = calculateCoherence(breathHistoryRef.current);

      setBreathData({
        amplitude,
        frequency: dominantFreq,
        breathPhase,
        breathDepth,
        breathRhythm,
        coherence,
        rawData: Array.from(breathingBins),
      });

      animationFrameRef.current = requestAnimationFrame(analyze);
    };

    analyze();
  };

  const determineBreathPhase = (amplitude, pattern) => {
    const threshold = 0.1;
    const currentTime = Date.now();

    // Detect phase transitions based on amplitude changes
    if (amplitude > threshold) {
      if (
        pattern.trend === "increasing" &&
        amplitude > pattern.avgAmplitude * 1.2
      ) {
        if (lastPhaseRef.current !== "inhale") {
          lastPhaseRef.current = "inhale";
          phaseTimerRef.current = currentTime;
        }
        return "inhale";
      } else if (
        pattern.trend === "decreasing" &&
        amplitude > pattern.avgAmplitude * 0.8
      ) {
        if (lastPhaseRef.current !== "exhale") {
          lastPhaseRef.current = "exhale";
          phaseTimerRef.current = currentTime;
        }
        return "exhale";
      }
    } else {
      // Low amplitude - likely a pause between breaths
      if (currentTime - phaseTimerRef.current > 500) {
        // 500ms threshold
        lastPhaseRef.current = "pause";
        return "pause";
      }
    }

    return lastPhaseRef.current || "neutral";
  };

  const calculateRhythm = (history) => {
    if (history.length < 20) return 0;

    // Calculate rhythm consistency over time
    const intervals = [];
    for (let i = 1; i < history.length; i++) {
      intervals.push(history[i].timestamp - history[i - 1].timestamp);
    }

    const avgInterval =
      intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
    const variance =
      intervals.reduce((sum, val) => sum + Math.pow(val - avgInterval, 2), 0) /
      intervals.length;
    const stdDev = Math.sqrt(variance);

    // Lower standard deviation means more rhythmic breathing
    return Math.max(0, 1 - stdDev / avgInterval);
  };

  const calculateCoherence = (history) => {
    if (history.length < 30) return 0;

    // Heart Rate Variability-inspired coherence calculation
    const amplitudes = history.map((entry) => entry.amplitude);
    const mean =
      amplitudes.reduce((sum, val) => sum + val, 0) / amplitudes.length;

    // Calculate how smoothly amplitude changes over time
    let coherenceScore = 0;
    for (let i = 1; i < amplitudes.length; i++) {
      const change = Math.abs(amplitudes[i] - amplitudes[i - 1]);
      coherenceScore += Math.exp(-change * 10); // Reward smooth changes
    }

    return Math.min(1, coherenceScore / amplitudes.length);
  };

  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }
  };

  return breathData;
}

export default useBreathDetection;
