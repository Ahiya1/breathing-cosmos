import React, { useState, useEffect, useRef, useCallback } from "react";
import useBreathDetection from "../hooks/useBreathDetection";
import CosmicCanvas from "./CosmicCanvas";

function BreathingCosmos({ microphoneStream, onStop }) {
  const [sessionTime, setSessionTime] = useState(0);
  const [entities, setEntities] = useState([]);
  const [cosmicState, setCosmicState] = useState({
    consciousness: 0,
    complexity: 0,
    unity: 0,
    transcendence: 0,
  });

  const sessionStartTime = useRef(Date.now());
  const entityIdCounter = useRef(0);
  const animationFrameRef = useRef();

  // Breath detection hook
  const breathData = useBreathDetection(microphoneStream);

  // Memoized entity creation function
  const birthEntity = useCallback(
    (depth, coherence, amplitude) => {
      const newEntity = {
        id: entityIdCounter.current++,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        consciousness: coherence * 0.5,
        complexity: depth,
        life: 1.0,
        age: 0,
        size: 2 + depth * 8,
        hue: (coherence * 360 + amplitude * 120) % 360,
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        connections: [],
        transcended: false,
        birthTime: sessionTime,
      };

      setEntities((prev) => [...prev, newEntity]);
    },
    [sessionTime]
  );

  // Memoized entity evolution function
  const evolveEntities = useCallback((breathDepth, coherence) => {
    setEntities((prev) =>
      prev.map((entity) => {
        if (entity.transcended) return entity;

        return {
          ...entity,
          consciousness: Math.min(1, entity.consciousness + coherence * 0.02),
          complexity: Math.min(2, entity.complexity + breathDepth * 0.01),
          age: entity.age + 1,
          life: Math.max(0, entity.life - 0.001 + coherence * 0.002),
        };
      })
    );
  }, []);

  // Memoized transcendence function
  const transcendEntities = useCallback(() => {
    setEntities((prev) =>
      prev.map((entity) => {
        if (
          entity.consciousness > 0.8 &&
          !entity.transcended &&
          Math.random() < 0.1
        ) {
          return {
            ...entity,
            transcended: true,
            size: entity.size * 1.5,
            hue: (entity.hue + 60) % 360,
          };
        }
        return entity;
      })
    );
  }, []);

  // Update session time
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(Date.now() - sessionStartTime.current);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Update cosmic state based on breath
  useEffect(() => {
    if (!breathData) return;

    const { breathPhase, breathDepth, breathRhythm, coherence, amplitude } =
      breathData;

    setCosmicState((prev) => ({
      consciousness: Math.min(1, prev.consciousness + coherence * 0.01),
      complexity: Math.min(1, prev.complexity + breathDepth * 0.005),
      unity: Math.min(1, prev.unity + (breathRhythm > 0.7 ? 0.01 : -0.005)),
      transcendence: Math.min(
        1,
        prev.transcendence + (amplitude > 0.8 ? 0.008 : 0)
      ),
    }));

    // Entity birth on inhale peaks
    if (
      breathPhase === "inhale" &&
      breathDepth > 0.6 &&
      Math.random() < breathDepth * 0.3
    ) {
      birthEntity(breathDepth, coherence, amplitude);
    }

    // Evolution pulses on exhale
    if (breathPhase === "exhale" && breathDepth > 0.4) {
      evolveEntities(breathDepth, coherence);
    }

    // Transcendence events during breath pauses
    if (breathPhase === "pause" && amplitude > 0.7) {
      transcendEntities();
    }
  }, [breathData, birthEntity, evolveEntities, transcendEntities]);

  // Continuous entity evolution
  useEffect(() => {
    const evolve = () => {
      setEntities((prev) => {
        return prev
          .map((entity) => ({
            ...entity,
            x: entity.x + entity.velocity.x,
            y: entity.y + entity.velocity.y,
            age: entity.age + 0.1,
            life: entity.transcended
              ? entity.life
              : Math.max(0, entity.life - 0.0001),
          }))
          .filter((entity) => entity.life > 0 || entity.transcended)
          .map((entity) => {
            // Wrap around screen edges
            if (entity.x < 0) entity.x = window.innerWidth;
            if (entity.x > window.innerWidth) entity.x = 0;
            if (entity.y < 0) entity.y = window.innerHeight;
            if (entity.y > window.innerHeight) entity.y = 0;
            return entity;
          });
      });

      animationFrameRef.current = requestAnimationFrame(evolve);
    };

    animationFrameRef.current = requestAnimationFrame(evolve);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  const getBreathPhaseColor = () => {
    if (!breathData) return "#667eea";

    switch (breathData.breathPhase) {
      case "inhale":
        return "#4facfe";
      case "exhale":
        return "#43e97b";
      case "pause":
        return "#fa54c4";
      default:
        return "#667eea";
    }
  };

  return (
    <div className="breathing-cosmos">
      {/* Beautiful cosmic background */}
      <div className="cosmic-background"></div>

      {/* Cosmic Canvas */}
      <CosmicCanvas
        entities={entities}
        cosmicState={cosmicState}
        breathData={breathData}
      />

      {/* Beautiful Session UI */}
      <div className="session-ui">
        {/* Top left - Session info */}
        <div className="session-info">
          <div className="session-card">
            <div className="session-time">{formatTime(sessionTime)}</div>
            <div className="entity-count">
              {entities.length} conscious beings
            </div>
            <div className="transcended-count">
              {entities.filter((e) => e.transcended).length} transcended
            </div>
          </div>
        </div>

        {/* Top right - Cosmic meters */}
        <div className="cosmic-meters">
          <div className="meters-card">
            <h3 className="meters-title">Cosmic Field</h3>

            <div className="meter">
              <span className="meter-label">Consciousness</span>
              <div className="meter-track">
                <div
                  className="meter-fill consciousness"
                  style={{ width: `${cosmicState.consciousness * 100}%` }}
                />
              </div>
              <span className="meter-value">
                {Math.floor(cosmicState.consciousness * 100)}%
              </span>
            </div>

            <div className="meter">
              <span className="meter-label">Complexity</span>
              <div className="meter-track">
                <div
                  className="meter-fill complexity"
                  style={{ width: `${cosmicState.complexity * 100}%` }}
                />
              </div>
              <span className="meter-value">
                {Math.floor(cosmicState.complexity * 100)}%
              </span>
            </div>

            <div className="meter">
              <span className="meter-label">Unity</span>
              <div className="meter-track">
                <div
                  className="meter-fill unity"
                  style={{ width: `${cosmicState.unity * 100}%` }}
                />
              </div>
              <span className="meter-value">
                {Math.floor(cosmicState.unity * 100)}%
              </span>
            </div>

            <div className="meter">
              <span className="meter-label">Transcendence</span>
              <div className="meter-track">
                <div
                  className="meter-fill transcendence"
                  style={{ width: `${cosmicState.transcendence * 100}%` }}
                />
              </div>
              <span className="meter-value">
                {Math.floor(cosmicState.transcendence * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Bottom center - Breath indicator */}
        <div className="breath-indicator">
          <div className="breath-card">
            {breathData && (
              <div className={`breath-visualization ${breathData.breathPhase}`}>
                <div
                  className="breath-orb"
                  style={{
                    transform: `scale(${0.6 + breathData.breathDepth * 0.8})`,
                    backgroundColor: getBreathPhaseColor(),
                    boxShadow: `0 0 ${
                      20 + breathData.amplitude * 40
                    }px ${getBreathPhaseColor()}33`,
                  }}
                />
                <div className="breath-rings">
                  <div
                    className="breath-ring ring-1"
                    style={{ borderColor: getBreathPhaseColor() + "33" }}
                  ></div>
                  <div
                    className="breath-ring ring-2"
                    style={{ borderColor: getBreathPhaseColor() + "22" }}
                  ></div>
                  <div
                    className="breath-ring ring-3"
                    style={{ borderColor: getBreathPhaseColor() + "11" }}
                  ></div>
                </div>
                <div className="breath-info">
                  <span className="phase-text">{breathData.breathPhase}</span>
                  <span className="depth-text">
                    Depth: {Math.floor(breathData.breathDepth * 100)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom right - Exit button */}
        <div className="session-controls">
          <button className="exit-button" onClick={onStop}>
            <span className="exit-icon">✨</span>
            <span>Return to Void</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BreathingCosmos;
