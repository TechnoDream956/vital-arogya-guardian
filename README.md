# Arogya Raksha — AI Health Assistant

> Trusted 24/7 AI-powered health assistant providing reliable medical information in multiple Indian languages.

Built by [Arpit Sehrawat](https://github.com/TechnoDream956)

---

## Features

- 🧠 AI-powered health Q&A (Claude AI)
- 🌐 Multilingual: English, हिंदी, ଓଡ଼ିଆ, বাংলা
- 🕐 24/7 availability
- 🔒 Secure & private conversations
- 🩺 Symptom analysis guidance
- 💊 Medication information
- 🏘️ Designed for rural India

## Setup

### Prerequisites
- Node.js 18+
- An Anthropic API key — get one at [console.anthropic.com](https://console.anthropic.com)

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# 3. Run the server
npm start
# Open http://localhost:3000
```

### Deploy to Vercel

The frontend (`index.html`) can be deployed directly to Vercel as a static site — the chat calls the Anthropic API directly from the browser using your key injected at build time, OR you can deploy the `server.js` as a serverless function.

**For pure static deploy (recommended for Vercel free tier):**
1. Deploy just `index.html`
2. The chat works via browser → Anthropic API directly

**For server deploy:**
1. Set `ANTHROPIC_API_KEY` in Vercel environment variables
2. The `server.js` handles all API calls server-side

## Project Structure

```
arogya-raksha/
├── index.html        # Complete frontend (single-file, no build needed)
├── server.js         # Express server (optional, for backend API proxy)
├── package.json
├── .env.example
├── vercel.json
└── README.md
```

## Tech Stack

- Frontend: Vanilla HTML/CSS/JS (no framework, no build step)
- Backend: Node.js + Express (optional)
- AI: Anthropic Claude API
- Fonts: Google Fonts (Sora + DM Sans)
- Deploy: Vercel

## Important Disclaimer

Arogya Raksha provides general health information only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. For medical emergencies, call 112 immediately.

---

© 2025 Arpit Sehrawat
