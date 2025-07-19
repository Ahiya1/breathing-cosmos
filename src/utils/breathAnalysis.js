// Beautiful breath pattern analysis utilities

export function analyzeBreathPattern(history) {
  if (history.length < 10) {
    return {
      trend: "neutral",
      avgAmplitude: 0,
      frequency: 0,
      stability: 0,
      cycles: 0,
    };
  }

  const amplitudes = history.map((entry) => entry.amplitude);
  const frequencies = history.map((entry) => entry.frequency);
  const timestamps = history.map((entry) => entry.timestamp);

  return {
    trend: analyzeTrend(amplitudes),
    avgAmplitude: calculateAverage(amplitudes),
    frequency: calculateAverage(frequencies),
    stability: calculateStability(amplitudes),
    cycles: detectBreathCycles(amplitudes, timestamps),
    peakDetection: findPeaks(amplitudes),
    rhythmAnalysis: analyzeRhythm(amplitudes, timestamps),
  };
}

function analyzeTrend(amplitudes) {
  if (amplitudes.length < 5) return "neutral";

  const recent = amplitudes.slice(-5);
  const older = amplitudes.slice(-10, -5);

  const recentAvg = calculateAverage(recent);
  const olderAvg = calculateAverage(older);

  const threshold = 0.02;

  if (recentAvg > olderAvg + threshold) return "increasing";
  if (recentAvg < olderAvg - threshold) return "decreasing";
  return "stable";
}

function calculateAverage(array) {
  return array.length > 0
    ? array.reduce((sum, val) => sum + val, 0) / array.length
    : 0;
}

function calculateStability(amplitudes) {
  if (amplitudes.length < 10) return 0;

  const mean = calculateAverage(amplitudes);
  const variance =
    amplitudes.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    amplitudes.length;
  const stdDev = Math.sqrt(variance);

  // Return stability as 1 - normalized standard deviation
  return Math.max(0, 1 - stdDev / (mean + 0.001));
}

function detectBreathCycles(amplitudes, timestamps) {
  if (amplitudes.length < 20) return 0;

  const peaks = findPeaks(amplitudes);
  const valleys = findValleys(amplitudes);

  // A breath cycle is peak -> valley -> peak
  const cycles = Math.min(peaks.length - 1, valleys.length);

  // Calculate average cycle duration
  if (peaks.length > 1) {
    const cycleDurations = [];
    for (let i = 1; i < peaks.length; i++) {
      const duration = timestamps[peaks[i]] - timestamps[peaks[i - 1]];
      cycleDurations.push(duration);
    }

    const avgCycleDuration = calculateAverage(cycleDurations);
    // Normal breathing cycle is 3-6 seconds
    const normalizedDuration = Math.max(
      0,
      1 - Math.abs(avgCycleDuration - 4000) / 2000
    );

    return {
      count: cycles,
      avgDuration: avgCycleDuration,
      quality: normalizedDuration,
    };
  }

  return { count: 0, avgDuration: 0, quality: 0 };
}

function findPeaks(amplitudes) {
  const peaks = [];
  const minPeakHeight = calculateAverage(amplitudes) * 0.8;
  const minDistance = 5; // Minimum distance between peaks

  for (let i = 1; i < amplitudes.length - 1; i++) {
    if (
      amplitudes[i] > amplitudes[i - 1] &&
      amplitudes[i] > amplitudes[i + 1] &&
      amplitudes[i] > minPeakHeight
    ) {
      // Check minimum distance from last peak
      if (peaks.length === 0 || i - peaks[peaks.length - 1] >= minDistance) {
        peaks.push(i);
      }
    }
  }

  return peaks;
}

function findValleys(amplitudes) {
  const valleys = [];
  const maxValleyHeight = calculateAverage(amplitudes) * 0.5;
  const minDistance = 5;

  for (let i = 1; i < amplitudes.length - 1; i++) {
    if (
      amplitudes[i] < amplitudes[i - 1] &&
      amplitudes[i] < amplitudes[i + 1] &&
      amplitudes[i] < maxValleyHeight
    ) {
      if (
        valleys.length === 0 ||
        i - valleys[valleys.length - 1] >= minDistance
      ) {
        valleys.push(i);
      }
    }
  }

  return valleys;
}

function analyzeRhythm(amplitudes, timestamps) {
  const peaks = findPeaks(amplitudes);

  if (peaks.length < 3) {
    return { regularity: 0, tempo: 0, coherence: 0 };
  }

  // Calculate intervals between peaks
  const intervals = [];
  for (let i = 1; i < peaks.length; i++) {
    intervals.push(timestamps[peaks[i]] - timestamps[peaks[i - 1]]);
  }

  const avgInterval = calculateAverage(intervals);
  const variance =
    intervals.reduce(
      (sum, interval) => sum + Math.pow(interval - avgInterval, 2),
      0
    ) / intervals.length;
  const stdDev = Math.sqrt(variance);

  // Regularity: how consistent the intervals are
  const regularity = Math.max(0, 1 - stdDev / avgInterval);

  // Tempo: breaths per minute
  const tempo = 60000 / avgInterval; // Convert ms to breaths per minute

  // Coherence: combination of regularity and optimal tempo (12-20 bpm is ideal)
  const optimalTempo =
    tempo >= 12 && tempo <= 20 ? 1 : Math.max(0, 1 - Math.abs(tempo - 16) / 10);
  const coherence = (regularity + optimalTempo) / 2;

  return {
    regularity,
    tempo,
    coherence,
    intervals,
    avgInterval,
  };
}

// Advanced breath state detection
export function detectBreathState(pattern) {
  const { rhythmAnalysis, stability, avgAmplitude } = pattern;

  if (rhythmAnalysis.coherence > 0.8 && stability > 0.7) {
    return "deep_meditation";
  } else if (rhythmAnalysis.coherence > 0.6 && rhythmAnalysis.tempo <= 15) {
    return "relaxed";
  } else if (rhythmAnalysis.tempo > 20 || stability < 0.4) {
    return "active";
  } else if (avgAmplitude < 0.1) {
    return "shallow";
  } else {
    return "normal";
  }
}

// Consciousness mapping functions
export function mapBreathToConsciousness(breathState, pattern) {
  const baseConsciousness = {
    deep_meditation: 0.9,
    relaxed: 0.7,
    normal: 0.5,
    active: 0.3,
    shallow: 0.2,
  };

  const base = baseConsciousness[breathState] || 0.5;
  const coherenceBonus = pattern.rhythmAnalysis.coherence * 0.2;
  const stabilityBonus = pattern.stability * 0.1;

  return Math.min(1, base + coherenceBonus + stabilityBonus);
}

export function mapBreathToComplexity(breathDepth, stability, cycles) {
  const depthFactor = breathDepth * 0.4;
  const stabilityFactor = stability * 0.3;
  const cycleFactor = cycles.quality * 0.3;

  return Math.min(2, depthFactor + stabilityFactor + cycleFactor);
}
