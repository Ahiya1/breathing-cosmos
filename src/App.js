import React, { useState, useEffect, useCallback } from "react";
import BreathingCosmos from "./components/BreathingCosmos";
import BreathingPortal from "./components/BreathingPortal";

function App() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [microphoneStream, setMicrophoneStream] = useState(null);
  const [permissionError, setPermissionError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestMicrophone = useCallback(async () => {
    try {
      setIsLoading(true);
      setPermissionError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          sampleRate: 44100,
        },
      });

      setMicrophoneStream(stream);
      setIsLoading(false);
      return stream;
    } catch (error) {
      setIsLoading(false);
      setPermissionError(error.message);
      console.error("Microphone access denied:", error);
      return null;
    }
  }, []);

  const startBreathing = useCallback(async () => {
    if (!microphoneStream) {
      const stream = await requestMicrophone();
      if (!stream) return;
    }
    setIsBreathing(true);
  }, [microphoneStream, requestMicrophone]);

  const stopBreathing = useCallback(() => {
    setIsBreathing(false);
    if (microphoneStream) {
      microphoneStream.getTracks().forEach((track) => track.stop());
      setMicrophoneStream(null);
    }
  }, [microphoneStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (microphoneStream) {
        microphoneStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [microphoneStream]);

  // Handle escape key to exit
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape" && isBreathing) {
        stopBreathing();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isBreathing, stopBreathing]);

  return (
    <div className="app">
      {!isBreathing ? (
        <BreathingPortal
          onStartBreathing={startBreathing}
          permissionError={permissionError}
          isLoading={isLoading}
        />
      ) : (
        <BreathingCosmos
          microphoneStream={microphoneStream}
          onStop={stopBreathing}
        />
      )}
    </div>
  );
}

export default App;
