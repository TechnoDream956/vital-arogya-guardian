import type { Request, Response } from "express";
import { ChatGoogleGenerativeAI } from "langchain/chat_models";
import { HumanMessage } from "@langchain/core/messages";

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
      const response = await llm.invoke([new HumanMessage(message)]);
      res.status(200).json({ answer: response.content });
    } catch (err: any) {
      console.error("LLM error full dump:", err);

      // Ensure JSON always gets sent back
      res.status(500).json({
        error: "AI processing error",
        details: err?.message || String(err),
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
