import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
  isTyping?: boolean;
}

export function ChatMessage({ message, isBot, timestamp, isTyping }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-3 p-4 message-enter",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <Avatar className="w-8 h-8 shadow-medical">
          <AvatarImage src="/api/placeholder/32/32" />
          <AvatarFallback className="gradient-primary">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 transition-smooth",
          isBot
            ? "bg-card border shadow-medical"
            : "gradient-primary shadow-primary"
        )}
      >
        {isTyping ? (
          <div className="flex gap-1 items-center">
            <div className="typing-indicator w-2 h-2 bg-primary rounded-full" />
            <div className="typing-indicator w-2 h-2 bg-primary rounded-full" style={{ animationDelay: "0.2s" }} />
            <div className="typing-indicator w-2 h-2 bg-primary rounded-full" style={{ animationDelay: "0.4s" }} />
          </div>
        ) : (
          <p className={cn(
            "text-sm leading-relaxed",
            isBot ? "text-card-foreground" : "text-primary-foreground"
          )}>
            {message}
          </p>
        )}
        
        {timestamp && (
          <p className={cn(
            "text-xs mt-1 opacity-70",
            isBot ? "text-muted-foreground" : "text-primary-foreground"
          )}>
            {timestamp}
          </p>
        )}
      </div>
      
      {!isBot && (
        <Avatar className="w-8 h-8">
          <AvatarImage src="/api/placeholder/32/32" />
          <AvatarFallback className="bg-secondary">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}