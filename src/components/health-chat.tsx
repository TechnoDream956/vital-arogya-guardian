import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/ui/chat-message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

export function HealthChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "नमस्ते! मैं Arogya Raksha हूं, आपका AI स्वास्थ्य सहायक। मैं केवल स्वास्थ्य संबंधी प्रश्नों का उत्तर देता हूं। आप मुझसे क्या पूछना चाहते हैं?",
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

    // Simulate bot response (replace with actual AI integration)
    setTimeout(() => {
      const isHealthRelated = checkHealthRelated(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: isHealthRelated 
          ? generateHealthResponse(inputValue)
          : "मैं केवल स्वास्थ्य संबंधी प्रश्नों का उत्तर दे सकता हूं। कृपया कोई स्वास्थ्य संबंधी प्रश्न पूछें।",
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 2000);
  };

  const checkHealthRelated = (message: string): boolean => {
    const healthKeywords = [
      "स्वास्थ्य", "बीमारी", "दवा", "डॉक्टर", "दर्द", "बुखार", "सिरदर्द", "खांसी", "सर्दी",
      "health", "medicine", "doctor", "pain", "fever", "headache", "cough", "cold", "symptom",
      "treatment", "disease", "illness", "medication", "hospital", "clinic", "diabetes", "blood pressure"
    ];
    
    return healthKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const generateHealthResponse = (message: string): string => {
    const responses = [
      "आपके स्वास्थ्य संबंधी प्रश्न के लिए धन्यवाद। कृपया ध्यान दें कि यह केवल सामान्य जानकारी है। गंभीर स्वास्थ्य समस्याओं के लिए डॉक्टर से सलाह लें।",
      "स्वास्थ्य संबंधी जानकारी प्रदान करना मेरी प्राथमिकता है। हालांकि, व्यक्तिगत चिकित्सा सलाह के लिए योग्य चिकित्सक से संपर्क करें।",
      "आपके स्वास्थ्य प्रश्न महत्वपूर्ण हैं। मैं सामान्य मार्गदर्शन प्रदान कर सकता हूं, लेकिन निदान और उपचार के लिए डॉक्टर से मिलें।"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col h-[600px] bg-card rounded-2xl shadow-elegant border">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-gradient-primary rounded-t-2xl">
        <div className="w-10 h-10 rounded-full gradient-medical flex items-center justify-center shadow-medical">
          <Bot className="w-5 h-5 text-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground">Arogya Raksha</h3>
          <p className="text-sm text-primary-foreground/80">AI स्वास्थ्य सहायक</p>
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
          
          {isTyping && (
            <ChatMessage
              message=""
              isBot={true}
              isTyping={true}
            />
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="अपना स्वास्थ्य प्रश्न यहाँ लिखें..."
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
          Arogya Raksha केवल स्वास्थ्य संबंधी प्रश्नों का उत्तर देता है
        </p>
      </div>
    </div>
  );
}