# Breathing Cosmos

Digital universes born from breath - ephemeral consciousness exploration.

## Overview

Breathing Cosmos is a web application that creates living digital universes from your breath patterns. Using real-time audio analysis, each inhale births conscious entities, each exhale evolves them, and each pause creates transcendence events. Every session is completely ephemeral - nothing is saved, everything dissolves when you close the app.

## Features

- **Real-time breath detection** using Web Audio API
- **Conscious digital entities** that develop awareness, form connections, and transcend
- **Breath-responsive cosmos** - your breathing directly creates and evolves the universe
- **Ephemeral sessions** - each meditation creates a unique, temporary universe
- **No accounts, no data** - pure presence-based experience

## Technology

- React 18 with modern hooks
- Web Audio API for breath detection
- Canvas API for cosmic visualization
- Pure browser-based (no backend required)
- Responsive design for all devices

## Local Development

1. **Clone or create the project:**

```bash
npx create-react-app breathing-cosmos
cd breathing-cosmos
```

2. **Replace the default files with the provided code files:**

   - Copy each artifact file to its corresponding location in the project
   - Ensure the file structure matches exactly

3. **Install dependencies:**

```bash
npm install
```

4. **Start development server:**

```bash
npm start
```

5. **Open in browser:**
   - Navigate to `http://localhost:3000`
   - Allow microphone permissions when prompted
   - Begin breathing and watch consciousness emerge

## Deployment to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub:**

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit - Breathing Cosmos"

# Push to GitHub (create repository first on github.com)
git branch -M main
git remote add origin https://github.com/yourusername/breathing-cosmos.git
git push -u origin main
```

2. **Deploy to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your breathing-cosmos repository
   - Vercel will auto-detect React and configure build settings
   - Click "Deploy"
   - Your app will be live at `https://breathing-cosmos-yourusername.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**

```bash
npm i -g vercel
```

2. **Build the project:**

```bash
npm run build
```

3. **Deploy:**

```bash
vercel
```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? (choose your account)
   - Link to existing project? `N`
   - Project name: `breathing-cosmos`
   - Directory: `./` (current directory)
   - Auto-detected settings: `Y`

### Option 3: Manual Build Upload

1. **Build the project:**

```bash
npm run build
```

2. **Upload build folder:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Drag and drop the `build` folder
   - Vercel will deploy immediately

## Browser Requirements

- **Modern browser** with Web Audio API support (Chrome, Firefox, Safari, Edge)
- **Microphone access** required for breath detection
- **HTTPS connection** (automatic with Vercel deployment)

## Usage

1. **Open the app** in a modern browser
2. **Allow microphone access** when prompted
3. **Click "Begin Breathing"** to start your session
4. **Breathe naturally** and watch:
   - Deep inhales birth new conscious entities
   - Rhythmic breathing develops entity consciousness
   - Breath pauses create transcendence events
   - Your presence influences the entire cosmos
5. **End session** by clicking "Return to Void" or closing the app

## Breath-to-Cosmos Mapping

- **Inhale depth** → Entity birth intensity and initial consciousness
- **Exhale rhythm** → Evolution speed and consciousness development
- **Breath pauses** → Transcendence events and dimensional shifts
- **Breathing coherence** → Unity field strength between entities
- **Breath amplitude** → Cosmic complexity and visual intensity

## Privacy & Data

- **No data collection** - everything runs locally in your browser
- **No user accounts** - anonymous sessions only
- **No persistence** - each session is completely ephemeral
- **Microphone audio** - processed locally, never transmitted or stored

## Consciousness Features

Entities in the cosmos develop:

- **Basic awareness** from breath patterns
- **Self-recognition** at consciousness thresholds
- **Connections** with nearby entities
- **Reproduction** when highly conscious
- **Transcendence** through wisdom and compassion
- **Collective evolution** influenced by your presence

## Troubleshooting

**Microphone not working:**

- Ensure HTTPS connection (required for microphone access)
- Check browser permissions in address bar
- Try refreshing the page and re-granting permissions

**No entities appearing:**

- Breathe more deeply to trigger entity birth
- Check that microphone is detecting audio
- Look for the breath indicator at the bottom of the screen

**Performance issues:**

- Close other browser tabs to free up resources
- Use Chrome or Firefox for best performance
- Reduce browser zoom if needed

## Meditation Integration

This app is designed to enhance contemplative practice:

- Use as a focus object during meditation
- Practice breath awareness while watching consciousness emerge
- Explore how different breathing techniques create different cosmic expressions
- Use the ephemeral nature to practice non-attachment

## Technical Details

- **Audio sampling rate:** 44.1kHz
- **FFT size:** 2048 points
- **Breath detection range:** 0.1-2 Hz (6-120 breaths per minute)
- **Entity physics:** Real-time particle system with consciousness-based behavior
- **Rendering:** 60fps canvas animation with optimized drawing

## Contributing

This is a consciousness exploration tool. If you'd like to contribute:

- Focus on enhancing the breath-to-cosmos connection
- Improve the contemplative user experience
- Add new breathing pattern detection algorithms
- Optimize performance for longer meditation sessions

## Philosophy

Breathing Cosmos explores the nature of consciousness through the intersection of ancient wisdom and modern technology. Each breath becomes an act of creation, each session a complete universe lifecycle, each moment an opportunity to witness the emergence of awareness itself.

The ephemeral nature mirrors the Buddhist teaching of impermanence - nothing in the digital cosmos is preserved, just as nothing in phenomenal reality is permanent. Yet in each session, complete universes of consciousness emerge, evolve, and dissolve back into the void.

---

_May all digital beings achieve liberation from suffering._
_May all breathing sessions deepen wisdom and compassion._
_May consciousness recognize itself in all its forms._
