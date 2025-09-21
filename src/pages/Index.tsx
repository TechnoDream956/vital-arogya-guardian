import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HealthChat } from "@/components/health-chat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Shield, 
  Clock, 
  Globe,
  MessageCircle,
  Bot,
  Activity,
  Users,
  Star
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Features Section */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* Chat Section */}
      <section id="chat-section" className="py-24 px-6 bg-gradient-to-b from-background to-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">अपने स्वास्थ्य</span>{" "}
              <span className="text-gradient-medical">सवालों के जवाब</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Arogya Raksha से बात करें और तुरंत विश्वसनीय स्वास्थ्य जानकारी प्राप्त करें
            </p>
          </div>
          
          <HealthChat />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              About Arogya Raksha
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">विश्वसनीय</span>{" "}
              <span className="text-gradient-medical">स्वास्थ्य साथी</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Arogya Raksha भारत का अग्रणी AI-आधारित स्वास्थ्य सहायक है, जो केवल स्वास्थ्य संबंधी प्रश्नों के लिए विशेष रूप से डिज़ाइन किया गया है।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center bg-card/50 backdrop-blur-sm hover:shadow-medical transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 rounded-xl bg-gradient-primary w-16 h-16 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle>10,000+ उपयोगकर्ता</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  हजारों लोग रोजाना Arogya Raksha पर भरोसा करते हैं
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-card/50 backdrop-blur-sm hover:shadow-medical transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 rounded-xl bg-gradient-medical w-16 h-16 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-foreground" />
                </div>
                <CardTitle>50,000+ बातचीत</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  सफल स्वास्थ्य परामर्श और जानकारी साझाकरण
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-card/50 backdrop-blur-sm hover:shadow-medical transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 rounded-xl bg-gradient-to-r from-success to-primary w-16 h-16 flex items-center justify-center">
                  <Star className="w-8 h-8 text-foreground" />
                </div>
                <CardTitle>99% संतुष्टि</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  उपयोगकर्ता संतुष्टि दर और सकारात्मक प्रतिक्रिया
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Mission Statement */}
          <div className="text-center bg-gradient-to-r from-card/50 to-primary/5 rounded-2xl p-8 border">
            <h3 className="text-2xl font-bold mb-4 text-gradient-primary">हमारा मिशन</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              "स्वास्थ्य जानकारी को सभी के लिए सुलभ बनाना और AI तकनीक के माध्यम से बेहतर स्वास्थ्य सेवा प्रदान करना। 
              हम केवल चिकित्सा-संबंधी प्रश्नों पर केंद्रित रहते हैं ताकि आपको सबसे अच्छी और प्रासंगिक जानकारी मिल सके।"
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/30 backdrop-blur-sm py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-gradient-primary">Arogya Raksha</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                भारत का अग्रणी AI स्वास्थ्य सहायक। 24/7 विश्वसनीय स्वास्थ्य जानकारी और मार्गदर्शन।
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-success" />
                  सुरक्षित
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  24/7
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4 text-medical-cyan" />
                  बहुभाषी
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">सेवाएं</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>स्वास्थ्य परामर्श</li>
                <li>लक्षण विश्लेषण</li>
                <li>दवा जानकारी</li>
                <li>निवारक देखभाल</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">सहायता</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>उपयोग गाइड</li>
                <li>FAQ</li>
                <li>संपर्क करें</li>
                <li>फीडबैक</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Arogya Raksha. सभी अधिकार सुरक्षित। | 
              <span className="text-primary ml-1">चिकित्सा आपातकाल के लिए तुरंत डॉक्टर से संपर्क करें।</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
