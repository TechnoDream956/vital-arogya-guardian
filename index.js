const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ChatGoogleGenerativeAI } = require("langchain/chat_models");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  apiKey: process.env.VITE_GEMINI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await llm.invoke([{ role: "user", content: message }]);
    res.json({ answer: response.content });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ error: "AI processing error" });
  }
});

// Serve the built React app as static files
const path = require("path");
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
