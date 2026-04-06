# 🚀 FlashRead

<p align="center">
  <img src="https://raw.githubusercontent.com/ronakmunjapara/FlashRead/main/public/banner.svg" alt="FlashRead Banner" width="100%"/>
</p>

<p align="center">
  <strong>SpeedReader — Read faster with RSVP technology</strong>
</p>

<p align="center">
  <a href="https://github.com/ronakmunjapara/FlashRead/stargazers">
    <img src="https://img.shields.io/github/stars/ronakmunjapara/FlashRead?style=flat&logo=github" alt="Stars"/>
  </a>
  <a href="https://github.com/ronakmunjapara/FlashRead/releases">
    <img src="https://img.shields.io/github/v/release/ronakmunjapara/FlashRead?include_prereleases&style=flat" alt="Version"/>
  </a>
  <a href="https://github.com/ronakmunjapara/FlashRead/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/ronakmunjapara/FlashRead?style=flat" alt="License"/>
  </a>
  <a href="https://github.com/ronakmunjapara/FlashRead/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/ronakmunjapara/FlashRead/ci.yml?style=flat" alt="Build"/>
  </a>
</p>

---

## ✨ What is FlashRead?

FlashRead is a speed reading application that uses **RSVP (Rapid Serial Visual Presentation)** technology with **ORP (Optimal Recognition Point)** alignment. It displays words one at a time with the middle character highlighted on a fixed vertical center line, eliminating eye movement and enabling reading speeds of 300-1200+ WPM.

> 💡 **RSVP** technology allows you to read faster by presenting words sequentially in a fixed position, removing the time your eyes spend searching for the next word.

---

## 🎯 Features

| Feature | Description |
|---------|-------------|
| ⚡ **RSVP Speed Reading** | Words flash one at a time at your chosen speed |
| 🎯 **ORP Alignment** | Optimal recognition point highlighted on center line |
| 🚀 **300-1200+ WPM** | Adjustable reading speed with smart timing |
| ⏸️ **Smart Pausing** | Automatic pauses for commas, periods, and sentence endings |
| 🔗 **URL Import** | Load articles directly from any webpage |
| ⌨️ **Keyboard Controls** | Space, arrows, and R for full control |
| 📝 **Customizable** | Adjustable font size (28-92px) |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `→` | Next word |
| `←` | Previous word |
| `R` | Restart from beginning |

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwind-css)

</div>

- **React 19** — UI Framework
- **TypeScript** — Type safety
- **Vite** — Fast build tool
- **Tailwind CSS 4** — Styling
- **Framer Motion** — Animations
- **Lucide React** — Icons

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ronakmunjapara/FlashRead.git

# Navigate to the project
cd FlashRead

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
FlashRead/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ControlsPanel.tsx    # Input controls, WPM slider, URL loader
│   │   └── Reader.tsx           # Word display with ORP highlighting
│   ├── lib/
│   │   ├── text.ts              # Text processing, tokenization, ORP logic
│   │   └── fetchArticle.ts      # URL content fetching via proxy
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Entry point
│   └── index.css               # Global styles
├── index.html                   # HTML template with SEO metadata
├── package.json                 # Dependencies
├── vite.config.ts              # Vite configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🔬 How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                     FlashRead Flow                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────┐    ┌─────────────┐    ┌─────────────────┐   │
│   │  Text   │───▶│ Tokenization │───▶│  ORP Calculation│   │
│   │  Input  │    │              │    │                 │   │
│   └─────────┘    └─────────────┘    └────────┬────────┘   │
│                                              │              │
│   ┌──────────────────────────────────────────┴──────────┐  │
│   │                                                   ▼  │
│   │   ┌──────────────────────────────────────────────┐   │
│   │   │           Word Display (RSVP)                │   │
│   │   │                                               │   │
│   │   │      [left] [ORP] [right]                    │   │
│   │   │         ◄─────►                              │   │
│   │   │       fixed center line                      │   │
│   │   └──────────────────────────────────────────────┘   │
│   │                                                   │   │
│   └──────────────────────────────────────────────────┬───┘
│                                                      │
│                      ┌──────────────┐               │
│                      │  Timing      │◀──────────────┘
                      │  (WPM based)  │
                      └──────────────┘
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### ORP Algorithm

The Optimal Recognition Point (ORP) is calculated based on word length:

| Word Length | ORP Position |
|-------------|--------------|
| 1-5 chars   | Position 1  |
| 6-9 chars   | Position 2  |
| 10-13 chars | Position 3  |
| 14+ chars   | Position 4  |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by [Spritz](https://www.spritzinc.com/) RSVP technology
- ORP algorithm based on research in visual recognition points
- Built with the amazing [Vite](https://vitejs.dev/) ecosystem

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/ronakmunjapara">@ronakmunjapara</a>
</p>

<p align="center">
  <a href="https://github.com/ronakmunjapara/FlashRead">
    <img src="https://img.shields.io/github/followers/ronakmunjapara?style=social" alt="Follow"/>
  </a>
</p>