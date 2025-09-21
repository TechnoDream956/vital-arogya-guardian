import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Shield, Clock, Globe } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import logoImage from "@/assets/arogya-logo.svg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 gradient-hero opacity-90" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 float-animation">
        <div className="w-4 h-4 bg-primary rounded-full shadow-primary" />
      </div>
      <div className="absolute top-40 right-20 float-animation" style={{ animationDelay: "1s" }}>
        <div className="w-6 h-6 bg-medical-cyan rounded-full shadow-medical" />
      </div>
      <div className="absolute bottom-20 left-40 float-animation" style={{ animationDelay: "2s" }}>
        <div className="w-3 h-3 bg-success rounded-full shadow-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img 
              src={logoImage} 
              alt="Arogya Raksha Logo" 
              className="w-24 h-24 animate-pulse-glow"
            />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
          </div>
        </div>

        {/* Badge */}
        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm shadow-medical">
          <Activity className="w-4 h-4 mr-2" />
          24/7 AI स्वास्थ्य सहायक
        </Badge>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="text-gradient-primary">Arogya</span>{" "}
          <span className="text-gradient-medical">Raksha</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          आपका विश्वसनीय AI स्वास्थ्य सहायक
        </p>

        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
          24/7 उपलब्ध, बहुभाषी समर्थन के साथ विश्वसनीय स्वास्थ्य जानकारी और मार्गदर्शन प्राप्त करें। 
          केवल स्वास्थ्य संबंधी प्रश्नों के लिए डिज़ाइन किया गया।
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Button 
            size="lg" 
            className="gradient-primary shadow-primary hover:scale-105 transition-all duration-300 px-8 py-6 text-lg"
            onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Activity className="w-5 h-5 mr-2" />
            चैट शुरू करें
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-6 text-lg"
          >
            <Shield className="w-5 h-5 mr-2" />
            और जानें
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="flex items-center justify-center gap-3 p-4 bg-card/30 backdrop-blur-md rounded-xl border shadow-medical">
            <Clock className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">24/7 उपलब्ध</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 bg-card/30 backdrop-blur-md rounded-xl border shadow-medical">
            <Globe className="w-6 h-6 text-medical-cyan" />
            <span className="text-sm font-medium">बहुभाषी समर्थन</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 bg-card/30 backdrop-blur-md rounded-xl border shadow-medical">
            <Shield className="w-6 h-6 text-success" />
            <span className="text-sm font-medium">विश्वसनीय जानकारी</span>
          </div>
        </div>
      </div>
    </section>
  );
}