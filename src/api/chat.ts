import type { Request, Response } from "express";
import { ChatGoogleGenerativeAI } from "langchain/chat_models";
import { HumanMessage } from "@langchain/core/messages";

// ✅ Use backend-only env var (no VITE_ prefix)
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req: Request, res: Response) {
  if (req.method === "POST") {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      // ✅ Correct LangChain message format
      const response = await llm.invoke([new HumanMessage(message)]);

      res.status(200).json({ answer: response.content });
    } catch (err: any) {
      console.error("LLM error:", JSON.stringify(err, null, 2)); // log full error

      res.status(500).json({
        error: err.message || err.toString() || "AI processing error",
        details: err.response || err, // include raw details
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
