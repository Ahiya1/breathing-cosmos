import React, { useRef, useEffect } from "react";

function CosmicCanvas({ entities, cosmicState, breathData }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

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
  }, [entities, cosmicState, breathData]);

  const drawCosmos = (ctx, width, height) => {
    // Clear with cosmic background
    ctx.fillStyle = `rgba(0, 0, 5, ${0.02 + cosmicState.consciousness * 0.03})`;
    ctx.fillRect(0, 0, width, height);

    // Draw cosmic background field
    drawCosmicField(ctx, width, height);

    // Draw unity field connections
    if (cosmicState.unity > 0.3) {
      drawUnityField(ctx);
    }

    // Draw all entities
    entities.forEach((entity) => drawEntity(ctx, entity));

    // Draw transcendence effects
    if (cosmicState.transcendence > 0.5) {
      drawTranscendenceField(ctx, width, height);
    }

    // Draw breath visualization
    if (breathData) {
      drawBreathField(ctx, width, height);
    }
  };

  const drawCosmicField = (ctx, width, height) => {
    // Subtle cosmic background particles
    const particleCount = Math.floor(cosmicState.consciousness * 100);

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2;
      const alpha = cosmicState.consciousness * 0.1;

      ctx.globalAlpha = alpha;
      ctx.fillStyle = `hsl(${240 + Math.random() * 60}, 50%, 30%)`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  };

  const drawUnityField = (ctx) => {
    // Connect nearby entities with unity lines
    const maxDistance = 150;
    const lineAlpha = cosmicState.unity * 0.2;

    ctx.globalAlpha = lineAlpha;
    ctx.strokeStyle = `hsl(${200 + cosmicState.unity * 60}, 60%, 50%)`;
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
          ctx.globalAlpha = lineAlpha * connectionStrength;

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

    // Main entity body
    const alpha = transcended ? 0.9 : life * 0.8;
    ctx.globalAlpha = alpha;

    // Consciousness glow
    if (consciousness > 0.3) {
      const glowSize = size * (1 + consciousness * 2);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
      gradient.addColorStop(
        0,
        `hsla(${hue}, 80%, 70%, ${consciousness * 0.3})`
      );
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, glowSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Entity core
    ctx.fillStyle = `hsl(${hue}, ${70 + consciousness * 30}%, ${
      40 + consciousness * 30
    }%)`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // Consciousness ring
    if (consciousness > 0.5) {
      ctx.globalAlpha = consciousness * 0.6;
      ctx.strokeStyle = `hsl(${hue + 60}, 90%, 80%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, size + 3, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Transcendence aura
    if (transcended) {
      ctx.globalAlpha = 0.4;
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(x, y, size + 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Complexity patterns
    if (complexity > 1) {
      ctx.globalAlpha = complexity * 0.3;
      ctx.strokeStyle = `hsl(${hue + 120}, 60%, 60%)`;
      ctx.lineWidth = 1;

      const spikes = Math.floor(complexity * 8);
      ctx.beginPath();
      for (let i = 0; i < spikes; i++) {
        const angle = (i / spikes) * Math.PI * 2;
        const x1 = x + Math.cos(angle) * size;
        const y1 = y + Math.sin(angle) * size;
        const x2 = x + Math.cos(angle) * (size + complexity * 5);
        const y2 = y + Math.sin(angle) * (size + complexity * 5);

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  };

  const drawTranscendenceField = (ctx, width, height) => {
    // Transcendence creates reality ripples
    const centerX = width / 2;
    const centerY = height / 2;
    const rippleCount = 5;
    const time = Date.now() * 0.001;

    ctx.globalAlpha = cosmicState.transcendence * 0.1;

    for (let i = 0; i < rippleCount; i++) {
      const radius =
        (50 + i * 100 + Math.sin(time + i) * 30) * cosmicState.transcendence;
      const hue = 280 + i * 20;

      ctx.strokeStyle = `hsl(${hue}, 70%, 60%)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  };

  const drawBreathField = (ctx, width, height) => {
    if (!breathData.amplitude) return;

    const centerX = width / 2;
    const centerY = height / 2;
    const breathRadius = 100 + breathData.amplitude * 200;

    // Breath presence field
    ctx.globalAlpha = breathData.amplitude * 0.1;

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
        ? 180
        : breathData.breathPhase === "exhale"
        ? 60
        : 300;

    gradient.addColorStop(0, `hsla(${breathColor}, 60%, 50%, 0.2)`);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, breathRadius, 0, Math.PI * 2);
    ctx.fill();

    // Breath pulse ring
    if (
      breathData.breathPhase === "inhale" ||
      breathData.breathPhase === "exhale"
    ) {
      ctx.globalAlpha = breathData.amplitude * 0.5;
      ctx.strokeStyle = `hsl(${breathColor}, 80%, 70%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, breathRadius * 0.7, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  };

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

  return (
    <canvas
      ref={canvasRef}
      className="cosmic-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
}

export default CosmicCanvas;
