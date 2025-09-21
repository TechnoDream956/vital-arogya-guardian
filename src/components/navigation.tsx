import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Activity, Home, MessageCircle, Info, Shield } from "lucide-react";
import logoImage from "@/assets/arogya-logo.svg";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "होम", href: "#home", icon: Home },
    { label: "चैट", href: "#chat-section", icon: MessageCircle },
    { label: "विशेषताएं", href: "#features", icon: Activity },
    { label: "जानकारी", href: "#about", icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Arogya Raksha" className="w-8 h-8" />
            <span className="text-xl font-bold text-gradient-primary">
              Arogya Raksha
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-smooth text-sm font-medium"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Shield className="w-4 h-4 mr-2" />
              सुरक्षित
            </Button>
            <Button 
              size="sm"
              className="gradient-primary shadow-primary"
              onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              चैट शुरू करें
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-md animate-fade-in">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-smooth"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  सुरक्षित AI
                </Button>
                <Button 
                  className="w-full gradient-primary shadow-primary"
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  चैट शुरू करें
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}