import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Shield, 
  Clock, 
  Globe, 
  Brain, 
  Heart,
  Stethoscope,
  Pill,
  UserCheck
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "AI-Powered Intelligence",
      description: "उन्नत AI तकनीक के साथ सटीक स्वास्थ्य जानकारी",
      badge: "Smart AI"
    },
    {
      icon: <Shield className="w-8 h-8 text-medical-blue" />,
      title: "Verified Information",
      description: "चिकित्सा विशेषज्ञों द्वारा सत्यापित विश्वसनीय जानकारी",
      badge: "Trusted"
    },
    {
      icon: <Clock className="w-8 h-8 text-success" />,
      title: "24/7 Availability",
      description: "कभी भी, कहीं भी तुरंत स्वास्थ्य सहायता प्राप्त करें",
      badge: "Always On"
    },
    {
      icon: <Globe className="w-8 h-8 text-medical-cyan" />,
      title: "Multilingual Support",
      description: "हिंदी, अंग्रेजी और अन्य भाषाओं में उपलब्ध",
      badge: "Multi-lang"
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-primary" />,
      title: "Symptom Analysis",
      description: "लक्षणों का विश्लेषण और प्रारंभिक मार्गदर्शन",
      badge: "Analysis"
    },
    {
      icon: <Heart className="w-8 h-8 text-destructive" />,
      title: "Preventive Care",
      description: "निवारक स्वास्थ्य देखभाल की जानकारी और सुझाव",
      badge: "Prevention"
    },
    {
      icon: <Pill className="w-8 h-8 text-warning" />,
      title: "Medication Guidance",
      description: "दवाओं की सामान्य जानकारी और सावधानियां",
      badge: "Medicine"
    },
    {
      icon: <UserCheck className="w-8 h-8 text-success" />,
      title: "Personalized Care",
      description: "व्यक्तिगत स्वास्थ्य आवश्यकताओं के अनुकूल सुझाव",
      badge: "Personal"
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Activity className="w-4 h-4 mr-2" />
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Advanced</span>{" "}
            <span className="text-gradient-medical">Healthcare</span> Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Arogya Raksha आधुनिक AI तकनीक के साथ व्यापक स्वास्थ्य सेवाएं प्रदान करता है
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:shadow-medical hover:scale-105 animate-fade-in border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-medical-blue/10 group-hover:shadow-primary transition-all duration-300">
                  {feature.icon}
                </div>
                <Badge variant="outline" className="mb-2 w-fit mx-auto">
                  {feature.badge}
                </Badge>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            स्वास्थ्य की जानकारी सिर्फ एक क्लिक दूर है
          </p>
          <div className="flex justify-center">
            <div className="flex items-center gap-2 px-6 py-3 bg-gradient-primary rounded-full text-primary-foreground shadow-primary">
              <Shield className="w-5 h-5" />
              <span className="font-medium">100% स्वास्थ्य-केंद्रित AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}