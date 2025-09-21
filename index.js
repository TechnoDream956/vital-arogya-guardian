const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch");
const { ChatGoogleGenerativeAI } = require("langchain/chat_models");
const { LLMChain, PromptTemplate } = require("langchain/chains");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // Use express built-in JSON parser

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  apiKey: process.env.VITE_GEMINI_API_KEY,
});

const prompt = new PromptTemplate({
  inputVariables: ["question", "web_data", "language_name", "recent_history"],
  template: `You are a health educator for rural Odisha. Respond in {language_name} using simple, easy-to-understand words suitable for villagers with limited education.

Current question: '{question}'

Recent conversation history (last 3 questions for context): {recent_history}

Available data to reference: {web_data}

Guidelines:
- Be empathetic, supportive, and encouraging.
- Structure your response naturally.
- Cover symptoms, causes, prevention, treatment, vaccines, local context.
- Reference recent history if relevant.
- Keep response under 350 words.
- Always end with: 'यह सलाह सामान्य है। अपनी व्यक्तिगत स्थिति के लिए डॉक्टर से परामर्श करें।' (if Hindi/Odia) or 'This is general advice. Consult a doctor for personal guidance.' (if English).

Respond helpfully and appropriately to the current question.`,
});

const chain = new LLMChain({ llm, prompt });
const questionHistory = [];

function detectLanguage(text) {
  for (const c of text) {
    const code = c.charCodeAt(0);
    if (code >= 0x0900 && code <= 0x097f) return "hi"; // Hindi
    if (code >= 0x0b00 && code <= 0x0b7f) return "or"; // Odia
  }
  return "en"; // Default English
}

async function fetchWebData(question) {
  const params = new URLSearchParams({
    q: `${question} symptoms prevention vaccines site:who.int OR site:cdc.gov OR site:mohfw.gov.in`,
    format: "json",
    no_html: "1",
    skip_disambig: "1",
  });
  try {
    const res = await fetch("https://api.duckduckgo.com/?" + params.toString());
    const json = await res.json();
    if (json.Abstract) return json.Abstract.slice(0, 400);
    if (json.RelatedTopics && json.RelatedTopics.length > 0) {
      return json.RelatedTopics.slice(0, 3)
        .map((t) => t.Text)
        .join(" ")
        .slice(0, 400);
    }
  } catch {
    return "No specific health information found.";
  }
  return "No specific health information found.";
}

function getRecentHistory() {
  if (questionHistory.length === 0) return "No previous questions.";
  const recent = questionHistory.slice(-3);
  return recent
    .map((q) => `- ${q.timestamp}: ${q.question} (in ${q.language})`)
    .join("\n");
}

app.post("/health_query", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Missing question" });

  const language = detectLanguage(question);
  const recentHistory = getRecentHistory();
  const webData = await fetchWebData(question);

  questionHistory.push({
    question,
    language,
    timestamp: new Date().toLocaleString(),
  });

  try {
    const response = await chain.run({
      question,
      web_data: webData,
      language_name: language,
      recent_history: recentHistory,
    });
    res.json({ response });
  } catch (error) {
    console.error("AI processing error:", error);
    res.status(500).json({ error: "AI processing failed" });
  }
});

// Serve React static build files
const buildPath = path.join(__dirname, "dist");
app.use(express.static(buildPath));

// SPA fallback - serve index.html for any unknown route
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
