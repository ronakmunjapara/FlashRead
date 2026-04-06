# FlashRead — ORP Speed Reader

**SpeedReader - Read faster with RSVP technology — no eye movement needed**

A speed reading application that uses Optimal Recognition Point (ORP) technology to help users read faster by displaying one word at a time with the middle character aligned on a vertical center line.

## What is RSVP Speed Reading?

RSVP (Rapid Serial Visual Presentation) is a technique that displays words one at a time in a fixed position, eliminating the need for eye movement across the page. By keeping the optimal recognition point (ORP) aligned on a center line, your eyes stay focused on the most important part of each word, allowing for significantly faster reading speeds (300-1200+ WPM) without comprehension loss.

## Features

- **ORP-Based Reading**: Words are displayed with the optimal recognition point highlighted on a fixed vertical center line, reducing eye movement
- **Adjustable Speed**: Control reading speed from 300 to 1200+ WPM
- **Smart Pausing**: Automatically adds pauses for commas, semicolons, and sentence endings
- **URL Import**: Load articles directly from web pages via a CORS-friendly proxy
- **Keyboard Controls**: Space to play/pause, arrow keys to step through words, R to restart
- **Customizable Font Size**: Adjust text size from 28px to 92px

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How It Works

1. **Text Input**: Paste text directly or import from a URL
2. **Tokenization**: Text is split into individual words/tokens
3. **ORP Calculation**: Each word's optimal recognition point is calculated based on word length
4. **Display**: Words are flashed one at a time with the ORP character highlighted on the center line
5. **Timing**: Reading speed is adjusted with smart pauses for punctuation

## Project Structure

```
src/
├── components/
│   ├── ControlsPanel.tsx    # Input controls, WPM slider, URL loader
│   └── Reader.tsx           # Word display with ORP highlighting
├── lib/
│   ├── text.ts              # Text processing, tokenization, ORP logic
│   └── fetchArticle.ts      # URL content fetching via proxy
├── App.tsx                  # Main application component
├── main.tsx                 # Entry point
└── index.css               # Global styles
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space | Play/Pause |
| → | Next word |
| ← | Previous word |
| R | Restart from beginning |

## Credits

- Built with inspiration from Spritz's RSVP (Rapid Serial Visual Presentation) technology
- ORP algorithm based on research in optimal recognition points

---

**Contributors**: @ronakmunjapara