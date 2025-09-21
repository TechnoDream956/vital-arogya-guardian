import type { Request, Response } from "express"; // adjust import based on your backend framework
import { ChatGoogleGenerativeAI } from "langchain/chat_models";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  apiKey: process.env.VITE_GEMINI_API_KEY,
});

export default async function handler(req: Request, res: Response) {
  if (req.method === "POST") {
    const { message } = req.body;
    try {
      const response = await llm.invoke([{ role: "user", content: message }]);
      res.status(200).json({ answer: response.content });
    } catch (err) {
      res.status(500).json({ error: "AI processing error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
