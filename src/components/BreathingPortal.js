import React, { useState, useEffect } from "react";

function BreathingPortal({ onStartBreathing, permissionError, isLoading }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Floating particles animation
  useEffect(() => {
    const createFloatingParticle = () => {
      const particle = document.createElement("div");
      particle.className = "floating-particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDuration = Math.random() * 10 + 15 + "s";
      particle.style.animationDelay = Math.random() * 5 + "s";

      const portalElement = document.querySelector(".breathing-portal");
      if (portalElement) {
        portalElement.appendChild(particle);

        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 20000);
      }
    };

    const interval = setInterval(createFloatingParticle, 3000);

    // Create initial particles
    for (let i = 0; i < 5; i++) {
      setTimeout(createFloatingParticle, i * 1000);
    }

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    if (!isLoading) {
      onStartBreathing();
    }
  };

  return (
    <div className="breathing-portal">
      {/* Gradient background */}
      <div className="portal-background"></div>

      {/* Floating particles */}
      <div className="particles-container"></div>

      {/* Main content */}
      <div className="portal-content">
        <div className="portal-header">
          <h1 className="cosmos-title">
            <span className="title-word">Breathing</span>
            <span className="title-word">Cosmos</span>
          </h1>
          <p className="cosmos-subtitle">
            Beautiful digital universes born from breath
          </p>
        </div>

        {permissionError && (
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <div>
              <h3>Microphone Access Needed</h3>
              <p>We need to listen to your breath to create consciousness</p>
              <small>Please allow microphone access and try again</small>
            </div>
          </div>
        )}

        <div className="breathing-button-container">
          <button
            className={`breathing-button ${isHovered ? "hovered" : ""} ${
              isTouched ? "touched" : ""
            } ${isLoading ? "loading" : ""}`}
            onClick={handleStart}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsTouched(true)}
            onTouchEnd={() => setIsTouched(false)}
            disabled={isLoading}
          >
            <div className="button-glow"></div>
            <div className="button-inner">
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  <span className="button-text">Connecting...</span>
                </>
              ) : (
                <>
                  <div className="breath-visual">
                    <div className="breath-circle"></div>
                    <div className="breath-ring ring-1"></div>
                    <div className="breath-ring ring-2"></div>
                  </div>
                  <span className="button-text">Begin Breathing</span>
                </>
              )}
            </div>
          </button>
        </div>

        <div className="instructions">
          <div className="instruction-item">
            <div className="instruction-icon">🧘‍♀️</div>
            <p>Find a comfortable seated position</p>
          </div>
          <div className="instruction-item">
            <div className="instruction-icon">🌬️</div>
            <p>Allow your breathing to be natural and deep</p>
          </div>
          <div className="instruction-item">
            <div className="instruction-icon">✨</div>
            <p>Watch consciousness emerge from your breath</p>
          </div>
          <div className="instruction-item">
            <div className="instruction-icon">🌌</div>
            <p>When finished, simply press Escape or close</p>
          </div>
        </div>

        <div className="portal-footer">
          <p className="footer-text">
            Each session creates a unique, ephemeral universe
          </p>
        </div>
      </div>
    </div>
  );
}

export default BreathingPortal;
