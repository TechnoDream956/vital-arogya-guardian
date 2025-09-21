import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/ui/chat-message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

export function HealthChat() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: t("chat.greeting"),
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const aiResponse = await generateHealthResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content:
          t("chat.error") || "Sorry, I couldn't get an answer right now.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsTyping(false);
  };

  // Function calls backend API to get Gemini AI response securely
  const generateHealthResponse = async (message: string): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      return data.answer;
    } catch {
      return t("chat.error") || "Sorry, I couldn't get an answer right now.";
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-card rounded-2xl shadow-elegant border">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-gradient-primary rounded-t-2xl">
        <div className="w-10 h-10 rounded-full gradient-medical flex items-center justify-center shadow-medical">
          <Bot className="w-5 h-5 text-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground">
            Arogya Raksha
          </h3>
          <p className="text-sm text-primary-foreground/80">
            AI स्वास्थ्य सहायक
          </p>
        </div>
        <div className="ml-auto">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-0">
        <div className="space-y-2">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          {isTyping && <ChatMessage message="" isBot={true} isTyping={true} />}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t("chat.placeholder")}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-background border-border"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="gradient-primary shadow-primary hover:scale-105 transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {t("chat.disclaimer")}
        </p>
      </div>
    </div>
  );
}
