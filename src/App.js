import React, { useState, useEffect } from "react";
import BreathingCosmos from "./components/BreathingCosmos";
import BreathingButton from "./components/BreathingButton";

function App() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState(null);
  const [permissionError, setPermissionError] = useState(null);

  const requestMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          sampleRate: 44100,
        },
      });
      setMicrophonePermission(stream);
      setPermissionError(null);
      return stream;
    } catch (error) {
      setPermissionError(error.message);
      console.error("Microphone access denied:", error);
      return null;
    }
  };

  const startBreathing = async () => {
    if (!microphonePermission) {
      const stream = await requestMicrophone();
      if (!stream) return;
    }
    setIsBreathing(true);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    // Optional: stop microphone stream to save resources
    if (microphonePermission) {
      microphonePermission.getTracks().forEach((track) => track.stop());
      setMicrophonePermission(null);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (microphonePermission) {
        microphonePermission.getTracks().forEach((track) => track.stop());
      }
    };
  }, [microphonePermission]);

  return (
    <div className="app">
      {!isBreathing ? (
        <div className="breathing-portal">
          <div className="portal-content">
            <h1 className="cosmos-title">Breathing Cosmos</h1>
            <p className="cosmos-subtitle">
              Digital universes born from breath
            </p>

            {permissionError && (
              <div className="error-message">
                Microphone access needed to detect your breath patterns
              </div>
            )}

            <BreathingButton onClick={startBreathing} disabled={false} />

            <div className="instructions">
              <p>• Find a comfortable seated position</p>
              <p>• Allow your breathing to be natural</p>
              <p>• Watch consciousness emerge from breath</p>
              <p>• When finished, simply close the app</p>
            </div>
          </div>
        </div>
      ) : (
        <BreathingCosmos
          microphoneStream={microphonePermission}
          onStop={stopBreathing}
        />
      )}
    </div>
  );
}

export default App;
