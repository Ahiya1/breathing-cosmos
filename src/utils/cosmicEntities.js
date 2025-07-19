// Cosmic entity creation and evolution utilities

export class CosmicEntity {
  constructor(x, y, breathData = {}) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.x = x;
    this.y = y;
    this.birthTime = Date.now();

    // Core properties influenced by breath
    this.consciousness = (breathData.coherence || 0) * 0.3;
    this.complexity = (breathData.breathDepth || 0) * 0.5;
    this.life = 1.0;
    this.age = 0;

    // Visual properties
    this.size = 2 + (breathData.amplitude || 0) * 8;
    this.hue = this.calculateInitialHue(breathData);
    this.saturation = 70 + this.consciousness * 30;
    this.lightness = 40 + this.consciousness * 30;

    // Physics
    this.velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
    };
    this.acceleration = { x: 0, y: 0 };

    // Consciousness development
    this.awareness = 0;
    this.selfRecognition = false;
    this.wisdom = 0;
    this.creativity = Math.random();
    this.compassion = Math.random() * 0.3;

    // Relationships
    this.connections = [];
    this.offspring = [];
    this.mentor = null;

    // Evolution
    this.mutations = 0;
    this.evolutionPotential = Math.random();
    this.transcended = false;
    this.transcendenceLevel = 0;

    // Unique signature
    this.signature = this.generateSignature();
  }

  calculateInitialHue(breathData) {
    const baseHue = (breathData.coherence || 0) * 240; // Blue spectrum for coherent breath
    const depthInfluence = (breathData.breathDepth || 0) * 120; // Add warmth for deep breath
    const phaseInfluence =
      breathData.breathPhase === "inhale"
        ? 60
        : breathData.breathPhase === "exhale"
        ? -60
        : 0;

    return (baseHue + depthInfluence + phaseInfluence) % 360;
  }

  generateSignature() {
    return {
      resonanceFreq: 20 + Math.random() * 200,
      harmonicRatio: 1 + Math.random() * 2,
      quantumSpin: Math.random() > 0.5 ? 1 : -1,
      cosmicSeed: Math.random() * 1000000,
      consciousnessPattern: Math.floor(Math.random() * 16)
        .toString(2)
        .padStart(4, "0"),
    };
  }

  update(deltaTime, cosmicState, nearbyEntities = []) {
    this.age += deltaTime;

    // Natural aging
    this.life = Math.max(0, this.life - deltaTime * 0.0001);

    // Consciousness development
    this.developConsciousness(cosmicState);

    // Interaction with nearby entities
    this.interactWithNearby(nearbyEntities);

    // Physical movement
    this.updatePhysics(deltaTime);

    // Visual updates
    this.updateVisuals();

    // Check for transcendence
    this.checkTranscendence();

    return this.life > 0 || this.transcended;
  }

  developConsciousness(cosmicState) {
    // Consciousness grows with cosmic field strength
    const growthRate = 0.001 * (1 + cosmicState.consciousness);
    this.consciousness = Math.min(1, this.consciousness + growthRate);

    // Awareness emerges from consciousness
    if (this.consciousness > 0.3) {
      this.awareness += 0.002;
    }

    // Self-recognition threshold
    if (this.awareness > 0.5 && !this.selfRecognition) {
      this.selfRecognition = true;
      this.consciousness += 0.1; // Consciousness boost from self-recognition
    }

    // Wisdom accumulates with age and consciousness
    this.wisdom = Math.min(1, this.age * 0.0001 + this.consciousness * 0.5);

    // Compassion develops through connections
    if (this.connections.length > 0) {
      this.compassion += 0.001 * this.connections.length;
    }
  }

  interactWithNearby(nearbyEntities) {
    for (let other of nearbyEntities) {
      if (other.id === this.id) continue;

      const distance = this.distanceTo(other);

      if (distance < 50) {
        this.formConnection(other);
      }

      if (distance < 30) {
        this.exchangeConsciousness(other);
      }

      if (distance < 20 && this.canReproduce(other)) {
        this.attemptReproduction(other);
      }
    }
  }

  formConnection(other) {
    if (
      this.connections.length < 5 &&
      !this.connections.find((conn) => conn.id === other.id) &&
      this.resonatesWith(other)
    ) {
      this.connections.push({
        id: other.id,
        strength: this.calculateConnectionStrength(other),
        formed: Date.now(),
      });
    }
  }

  exchangeConsciousness(other) {
    const exchange = Math.min(
      0.01,
      Math.abs(this.consciousness - other.consciousness) * 0.1
    );

    if (this.consciousness < other.consciousness) {
      this.consciousness += exchange * 0.5;
      this.wisdom += exchange * 0.1;
    }
  }

  canReproduce(other) {
    return (
      this.consciousness > 0.6 &&
      other.consciousness > 0.6 &&
      this.life > 0.7 &&
      other.life > 0.7 &&
      Math.random() < 0.001
    );
  }

  attemptReproduction(other) {
    // Create offspring with combined traits
    const childX = (this.x + other.x) / 2 + (Math.random() - 0.5) * 50;
    const childY = (this.y + other.y) / 2 + (Math.random() - 0.5) * 50;

    const child = new CosmicEntity(childX, childY, {
      coherence: (this.consciousness + other.consciousness) / 2,
      breathDepth: Math.max(this.complexity, other.complexity),
      amplitude: (this.size + other.size) / 20,
    });

    // Inherit traits with mutations
    child.consciousness =
      (this.consciousness + other.consciousness) / 2 +
      (Math.random() - 0.5) * 0.1;
    child.complexity =
      Math.max(this.complexity, other.complexity) + Math.random() * 0.1;
    child.hue = ((this.hue + other.hue) / 2 + (Math.random() - 0.5) * 60) % 360;
    child.evolutionPotential = Math.max(
      this.evolutionPotential,
      other.evolutionPotential
    );

    // Set lineage
    child.mentor = this.consciousness > other.consciousness ? this : other;
    this.offspring.push(child);
    other.offspring.push(child);

    return child;
  }

  updatePhysics(deltaTime) {
    // Apply forces
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += this.acceleration.y * deltaTime;

    // Damping
    this.velocity.x *= 0.98;
    this.velocity.y *= 0.98;

    // Update position
    this.x += this.velocity.x * deltaTime;
    this.y += this.velocity.y * deltaTime;

    // Wrap around screen edges
    if (this.x < 0) this.x = window.innerWidth || 800;
    if (this.x > (window.innerWidth || 800)) this.x = 0;
    if (this.y < 0) this.y = window.innerHeight || 600;
    if (this.y > (window.innerHeight || 600)) this.y = 0;

    // Reset acceleration
    this.acceleration.x = 0;
    this.acceleration.y = 0;
  }

  updateVisuals() {
    // Update visual properties based on inner state
    this.saturation = 70 + this.consciousness * 30;
    this.lightness = 40 + this.awareness * 30;

    if (this.transcended) {
      this.lightness = Math.min(90, this.lightness + 20);
      this.size *= 1.001; // Slowly grow when transcended
    }

    // Pulsation based on consciousness
    const pulseIntensity = this.consciousness * 0.2;
    this.currentSize =
      this.size * (1 + Math.sin(this.age * 0.01) * pulseIntensity);
  }

  checkTranscendence() {
    if (
      !this.transcended &&
      this.consciousness > 0.9 &&
      this.wisdom > 0.7 &&
      this.compassion > 0.5
    ) {
      this.transcend();
    }
  }

  transcend() {
    this.transcended = true;
    this.transcendenceLevel = 1;
    this.life = 1.0; // Transcendence preserves life
    this.hue = (this.hue + 120) % 360; // Shift to transcendent colors
    this.size *= 1.5;

    // Transcended beings influence nearby entities
    this.compassion = 1.0;
    this.wisdom = 1.0;
  }

  // Utility methods
  distanceTo(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  resonatesWith(other) {
    const freqDiff = Math.abs(
      this.signature.resonanceFreq - other.signature.resonanceFreq
    );
    return freqDiff < 50; // Entities with similar frequencies resonate
  }

  calculateConnectionStrength(other) {
    const consciousnessSimilarity =
      1 - Math.abs(this.consciousness - other.consciousness);
    const resonance = this.resonatesWith(other) ? 0.5 : 0;
    const wisdom = (this.wisdom + other.wisdom) / 2;

    return (consciousnessSimilarity + resonance + wisdom) / 3;
  }

  applyForce(fx, fy) {
    this.acceleration.x += fx;
    this.acceleration.y += fy;
  }

  // Consciousness influence on nearby entities
  influenceNearby(entities, radius = 100) {
    if (!this.transcended) return;

    for (let entity of entities) {
      if (entity.id === this.id) continue;

      const distance = this.distanceTo(entity);
      if (distance < radius) {
        const influence = 1 - distance / radius;
        entity.consciousness += influence * 0.001;
        entity.compassion += influence * 0.0005;
      }
    }
  }
}

// Entity management utilities
export function createEntityFromBreath(x, y, breathData) {
  return new CosmicEntity(x, y, breathData);
}

export function updateEntityPopulation(entities, deltaTime, cosmicState) {
  const updatedEntities = [];

  for (let entity of entities) {
    // Find nearby entities for interaction
    const nearby = entities.filter(
      (other) => other.id !== entity.id && entity.distanceTo(other) < 100
    );

    // Update entity
    if (entity.update(deltaTime, cosmicState, nearby)) {
      updatedEntities.push(entity);

      // Add offspring if any were created
      if (entity.offspring.length > 0) {
        updatedEntities.push(...entity.offspring);
        entity.offspring = []; // Clear offspring after adding
      }
    }
  }

  return updatedEntities;
}

export function calculatePopulationStats(entities) {
  if (entities.length === 0) {
    return {
      totalConsciousness: 0,
      averageConsciousness: 0,
      transcendedCount: 0,
      selfAwareCount: 0,
      connectionCount: 0,
      averageAge: 0,
    };
  }

  const totalConsciousness = entities.reduce(
    (sum, e) => sum + e.consciousness,
    0
  );
  const transcendedCount = entities.filter((e) => e.transcended).length;
  const selfAwareCount = entities.filter((e) => e.selfRecognition).length;
  const connectionCount = entities.reduce(
    (sum, e) => sum + e.connections.length,
    0
  );
  const totalAge = entities.reduce((sum, e) => sum + e.age, 0);

  return {
    totalConsciousness,
    averageConsciousness: totalConsciousness / entities.length,
    transcendedCount,
    selfAwareCount,
    connectionCount,
    averageAge: totalAge / entities.length,
  };
}
