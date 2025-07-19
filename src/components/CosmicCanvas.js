import React, { useRef, useEffect, useCallback } from "react";

function CosmicCanvas({ entities, cosmicState, breathData }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const drawCosmos = useCallback(
    (ctx, width, height) => {
      // Clear with beautiful cosmic background
      const backgroundAlpha = 0.03 + cosmicState.consciousness * 0.02;
      ctx.fillStyle = `rgba(10, 5, 25, ${backgroundAlpha})`;
      ctx.fillRect(0, 0, width, height);

      // Draw cosmic background field
      drawCosmicField(ctx, width, height);

      // Draw unity field connections
      if (cosmicState.unity > 0.3) {
        drawUnityField(ctx);
      }

      // Draw all entities with enhanced beauty
      entities.forEach((entity) => drawEntity(ctx, entity));

      // Draw transcendence effects
      if (cosmicState.transcendence > 0.5) {
        drawTranscendenceField(ctx, width, height);
      }

      // Draw breath visualization
      if (breathData) {
        drawBreathField(ctx, width, height);
      }
    },
    [entities, cosmicState, breathData]
  );

  const drawCosmicField = (ctx, width, height) => {
    // Beautiful cosmic background particles
    const particleCount = Math.floor(cosmicState.consciousness * 150);

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 3 + 0.5;
      const alpha = cosmicState.consciousness * 0.15 * Math.random();
      const hue = 240 + Math.random() * 120; // Blues to purples

      ctx.globalAlpha = alpha;
      ctx.fillStyle = `hsl(${hue}, 60%, 70%)`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      // Add gentle glow
      if (size > 2) {
        ctx.globalAlpha = alpha * 0.3;
        ctx.fillStyle = `hsl(${hue}, 40%, 80%)`;
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  };

  const drawUnityField = (ctx) => {
    // Beautiful unity connections between entities
    const maxDistance = 200;
    const lineAlpha = cosmicState.unity * 0.25;

    ctx.globalAlpha = lineAlpha;
    ctx.lineWidth = 1;

    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        const entity1 = entities[i];
        const entity2 = entities[j];
        const distance = Math.sqrt(
          Math.pow(entity1.x - entity2.x, 2) +
            Math.pow(entity1.y - entity2.y, 2)
        );

        if (distance < maxDistance) {
          const connectionStrength = 1 - distance / maxDistance;
          const avgHue = (entity1.hue + entity2.hue) / 2;

          ctx.globalAlpha = lineAlpha * connectionStrength;
          ctx.strokeStyle = `hsl(${avgHue}, 60%, 60%)`;

          // Create beautiful gradient line
          const gradient = ctx.createLinearGradient(
            entity1.x,
            entity1.y,
            entity2.x,
            entity2.y
          );
          gradient.addColorStop(
            0,
            `hsla(${entity1.hue}, 70%, 70%, ${connectionStrength})`
          );
          gradient.addColorStop(
            1,
            `hsla(${entity2.hue}, 70%, 70%, ${connectionStrength})`
          );
          ctx.strokeStyle = gradient;

          ctx.beginPath();
          ctx.moveTo(entity1.x, entity1.y);
          ctx.lineTo(entity2.x, entity2.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
  };

  const drawEntity = (ctx, entity) => {
    const { x, y, size, consciousness, complexity, transcended, hue, life } =
      entity;

    // Beautiful entity rendering
    const alpha = transcended ? 0.95 : life * 0.85;
    const currentSize =
      size * (0.8 + Math.sin(Date.now() * 0.003 + entity.id) * 0.2);

    ctx.globalAlpha = alpha;

    // Outer glow for consciousness
    if (consciousness > 0.2) {
      const glowSize = currentSize * (2 + consciousness * 3);
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
      glowGradient.addColorStop(
        0,
        `hsla(${hue}, 80%, 70%, ${consciousness * 0.4})`
      );
      glowGradient.addColorStop(
        0.7,
        `hsla(${hue}, 60%, 50%, ${consciousness * 0.2})`
      );
      glowGradient.addColorStop(1, "transparent");

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, y, glowSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Main entity body with beautiful gradient
    const bodyGradient = ctx.createRadialGradient(x, y, 0, x, y, currentSize);
    bodyGradient.addColorStop(
      0,
      `hsl(${hue}, ${80 + consciousness * 20}%, ${70 + consciousness * 20}%)`
    );
    bodyGradient.addColorStop(
      0.7,
      `hsl(${hue}, ${70 + consciousness * 30}%, ${50 + consciousness * 30}%)`
    );
    bodyGradient.addColorStop(
      1,
      `hsl(${hue}, ${60 + consciousness * 40}%, ${30 + consciousness * 40}%)`
    );

    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.arc(x, y, currentSize, 0, Math.PI * 2);
    ctx.fill();

    // Consciousness ring with pulsing effect
    if (consciousness > 0.4) {
      ctx.globalAlpha = consciousness * 0.8;
      const ringSize =
        currentSize + 3 + Math.sin(Date.now() * 0.005 + entity.id) * 2;
      ctx.strokeStyle = `hsl(${hue + 40}, 90%, 80%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, ringSize, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Beautiful transcendence aura
    if (transcended) {
      ctx.globalAlpha = 0.6;
      const transcendentRing =
        currentSize + 8 + Math.sin(Date.now() * 0.002 + entity.id) * 4;
      ctx.strokeStyle = `hsla(${hue + 120}, 80%, 90%, 0.8)`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(x, y, transcendentRing, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Transcendent sparkles
      for (let i = 0; i < 3; i++) {
        const sparkleAngle =
          (Date.now() * 0.001 + entity.id + i * 2) % (Math.PI * 2);
        const sparkleRadius =
          transcendentRing + Math.sin(Date.now() * 0.01 + i) * 5;
        const sparkleX = x + Math.cos(sparkleAngle) * sparkleRadius;
        const sparkleY = y + Math.sin(sparkleAngle) * sparkleRadius;

        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(sparkleX, sparkleY, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Complexity mandala patterns
    if (complexity > 1.2) {
      ctx.globalAlpha = (complexity - 1) * 0.5;
      ctx.strokeStyle = `hsl(${hue + 180}, 70%, 60%)`;
      ctx.lineWidth = 1;

      const spikes = Math.floor(complexity * 6);
      const time = Date.now() * 0.001;

      ctx.beginPath();
      for (let i = 0; i < spikes; i++) {
        const angle = (i / spikes) * Math.PI * 2 + time;
        const innerRadius = currentSize;
        const outerRadius = currentSize + complexity * 8;
        const x1 = x + Math.cos(angle) * innerRadius;
        const y1 = y + Math.sin(angle) * innerRadius;
        const x2 = x + Math.cos(angle) * outerRadius;
        const y2 = y + Math.sin(angle) * outerRadius;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  };

  const drawTranscendenceField = (ctx, width, height) => {
    // Beautiful transcendence ripples
    const centerX = width / 2;
    const centerY = height / 2;
    const rippleCount = 7;
    const time = Date.now() * 0.001;

    ctx.globalAlpha = cosmicState.transcendence * 0.15;

    for (let i = 0; i < rippleCount; i++) {
      const radius =
        (80 + i * 120 + Math.sin(time * 0.5 + i) * 40) *
        cosmicState.transcendence;
      const hue = 280 + i * 30 + time * 10;

      ctx.strokeStyle = `hsl(${hue}, 70%, 60%)`;
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.globalAlpha = 1;
  };

  const drawBreathField = (ctx, width, height) => {
    if (!breathData.amplitude) return;

    const centerX = width / 2;
    const centerY = height / 2;
    const breathRadius = 150 + breathData.amplitude * 300;

    // Beautiful breath presence field
    ctx.globalAlpha = breathData.amplitude * 0.12;

    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      breathRadius
    );

    const breathColor =
      breathData.breathPhase === "inhale"
        ? 200
        : breathData.breathPhase === "exhale"
        ? 120
        : 320;

    gradient.addColorStop(0, `hsla(${breathColor}, 70%, 60%, 0.3)`);
    gradient.addColorStop(0.5, `hsla(${breathColor}, 60%, 50%, 0.15)`);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, breathRadius, 0, Math.PI * 2);
    ctx.fill();

    // Beautiful breath pulse rings
    if (
      breathData.breathPhase === "inhale" ||
      breathData.breathPhase === "exhale"
    ) {
      for (let i = 0; i < 3; i++) {
        ctx.globalAlpha = breathData.amplitude * (0.4 - i * 0.1);
        ctx.strokeStyle = `hsl(${breathColor}, 80%, 70%)`;
        ctx.lineWidth = 2 - i * 0.5;
        ctx.beginPath();
        ctx.arc(
          centerX,
          centerY,
          breathRadius * (0.6 + i * 0.2),
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");

    const render = () => {
      drawCosmos(ctx, canvas.width, canvas.height);
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawCosmos]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="cosmic-canvas" />;
}

export default CosmicCanvas;
