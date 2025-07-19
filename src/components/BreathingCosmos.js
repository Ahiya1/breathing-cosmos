import React, { useState, useEffect, useRef } from "react";
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

    const {
      breathPhase,
      breathDepth,
      breathRhythm,
      coherence,
      amplitude,
      frequency,
    } = breathData;

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
  }, [breathData]);

  const birthEntity = (depth, coherence, amplitude) => {
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
  };

  const evolveEntities = (breathDepth, coherence) => {
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
  };

  const transcendEntities = () => {
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
  };

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

  return (
    <div className="breathing-cosmos">
      {/* Cosmic Canvas */}
      <CosmicCanvas
        entities={entities}
        cosmicState={cosmicState}
        breathData={breathData}
      />

      {/* Session UI */}
      <div className="session-ui">
        <div className="session-info">
          <div className="session-time">{formatTime(sessionTime)}</div>
          <div className="entity-count">{entities.length} beings</div>
        </div>

        <div className="cosmic-meters">
          <div className="meter">
            <span>Consciousness</span>
            <div className="meter-bar">
              <div
                className="meter-fill consciousness"
                style={{ width: `${cosmicState.consciousness * 100}%` }}
              />
            </div>
          </div>

          <div className="meter">
            <span>Complexity</span>
            <div className="meter-bar">
              <div
                className="meter-fill complexity"
                style={{ width: `${cosmicState.complexity * 100}%` }}
              />
            </div>
          </div>

          <div className="meter">
            <span>Unity</span>
            <div className="meter-bar">
              <div
                className="meter-fill unity"
                style={{ width: `${cosmicState.unity * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="breath-indicator">
          {breathData && (
            <div className={`breath-phase ${breathData.breathPhase}`}>
              <div
                className="breath-circle"
                style={{
                  transform: `scale(${0.5 + breathData.breathDepth * 0.5})`,
                  opacity: breathData.amplitude,
                }}
              />
              <span className="phase-text">{breathData.breathPhase}</span>
            </div>
          )}
        </div>

        <button className="end-session" onClick={onStop}>
          Return to Void
        </button>
      </div>
    </div>
  );
}

export default BreathingCosmos;
