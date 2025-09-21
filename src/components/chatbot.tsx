import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "@/hooks/use-toast";

const Chatbot = () => {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "bot"; content: string }>
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("API Key exists:", !!apiKey);

    if (!apiKey) {
      toast({
        title: "API Key Missing",
        description:
          "Please add VITE_GEMINI_API_KEY to your environment variables",
        variant: "destructive",
      });
      return;
    }

    const userMessage = input;
    console.log("User message:", userMessage);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      console.log("Sending request to Gemini...");
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = response.text();
      console.log("Gemini response:", text);

      setMessages((prev) => [...prev, { role: "bot", content: text }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      toast({
        title: "Error",
        description: `Failed to get response: ${error.message}`,
        variant: "destructive",
      });

      // Add a fallback message so users know something went wrong
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-4">
      <div className="h-96 overflow-y-auto mb-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              message.role === "user"
                ? "bg-primary text-primary-foreground ml-auto max-w-xs"
                : "bg-muted max-w-xs"
            }`}
          >
            {message.content}
          </div>
        ))}
        {loading && (
          <div className="bg-muted p-2 rounded max-w-xs">Thinking...</div>
        )}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={loading}>
          Send
        </Button>
      </div>
    </Card>
  );
};

export default Chatbot;
