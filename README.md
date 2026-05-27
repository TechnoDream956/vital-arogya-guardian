# Arogya Raksha — Multilingual AI Health Assistant

AI-powered healthcare assistant built for India using Groq LLaMA 3.3 with support for 25+ Indian languages.

---

## Features

- 🩺 AI-powered health & wellness guidance
- 🌍 Support for 25+ Indian languages
- ⚡ Fast multilingual responses using Groq
- 💬 Real-time responsive AI chat interface
- 🔒 Health-only restricted assistant behavior
- 📱 Fully responsive futuristic UI
- 🎨 Cyberpunk-inspired medical design
- 🧠 Smart quick health prompts
- 🌐 Serverless backend powered by Vercel
- 🛡 Built-in medical disclaimer & safety restrictions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML · CSS · Vanilla JavaScript |
| Backend | Vercel Serverless Functions |
| LLM | LLaMA 3.3 via Groq API |
| Deployment | Vercel |
| Architecture | Serverless AI Chat |

---

## Architecture

```text
User Question
      ↓
Language Detection
      ↓
Frontend Chat UI
      ↓
Vercel Serverless API
      ↓
Groq LLaMA 3.3
      ↓
Multilingual Health Response

25+ Indian Languages Supported

| Method | Route               | Description                                   |
| ------ | ------------------- | --------------------------------------------- |
| POST   | `/api/health-query` | Send health-related questions to AI assistant |

git clone https://github.com/TechnoDream956/vital-arogya-guardian.git

cd vital-arogya-guardian

npm install

export GROQ_API_KEY="your_key_here"

vercel dev

GROQ_API_KEY=your_groq_api_key

Add your Vercel deployment link here

