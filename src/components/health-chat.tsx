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

    setTimeout(() => {
      const isHealthRelated = checkHealthRelated(inputValue);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: isHealthRelated
          ? generateHealthResponse(inputValue)
          : t("chat.non_health"),
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 2000);
  };

  // Expanded medical keywords covering professional and complex terms in English, Hindi, Odia, Bangla
  const healthKeywords = [
    // English medical terms
    "health",
    "medicine",
    "doctor",
    "pain",
    "fever",
    "headache",
    "cough",
    "cold",
    "symptom",
    "treatment",
    "disease",
    "illness",
    "infection",
    "medication",
    "hospital",
    "clinic",
    "diabetes",
    "blood pressure",
    "cancer",
    "virus",
    "bacteria",
    "allergy",
    "vaccine",
    "vaccination",
    "immune",
    "therapy",
    "surgery",
    "rehabilitation",
    "pharmacy",
    "pathology",
    "oncology",
    "cardiology",
    "neurology",
    "psychiatry",
    "dermatology",
    "pediatrics",
    "gynecology",
    "anatomy",
    "physiology",
    "pharmacology",
    "hematology",
    "radiology",
    "epidemiology",
    "microbiology",
    "pathogenesis",
    "prognosis",
    "diagnosis",
    "chronic",
    "acute",
    "emergency",
    "consultation",
    "prescription",
    "symptomatic",
    "asymptomatic",
    "infection",
    "transmission",
    "contagious",
    "immunization",
    "biopsy",
    "organ",
    "metabolism",
    "hormone",
    "neuropathy",
    "cardiomyopathy",
    "angioplasty",
    "dialysis",
    "encephalopathy",
    "anemia",
    "leukemia",
    "lymphoma",
    "sepsis",
    "metrorrhagia",
    "tachycardia",
    "bradycardia",
    "hypertension",
    "hypotension",
    "immunodeficiency",
    "autoimmune",
    "pathogen",
    "differential diagnosis",
    // Hindi medical terms (expanded)
    "स्वास्थ्य",
    "दवा",
    "डॉक्टर",
    "दर्द",
    "बुखार",
    "सिरदर्द",
    "खांसी",
    "सर्दी",
    "लक्षण",
    "इलाज",
    "रोग",
    "बीमारी",
    "संक्रमण",
    "टीका",
    "टीकाकरण",
    "प्रतिरक्षा",
    "सर्जरी",
    "चिकित्सा",
    "फार्मेसी",
    "पैथोलॉजी",
    "ऑन्कोलॉजी",
    "कार्डियोलॉजी",
    "न्यूरोलॉजी",
    "मनोचिकित्सा",
    "त्वचा विज्ञान",
    "बाल रोग",
    "स्त्री रोग",
    "शरीर रचना",
    "अन्य शरीर विज्ञान",
    "फार्माकोलॉजी",
    "रक्त विज्ञान",
    "रेडियोलॉजी",
    "महामारी विज्ञान",
    "सूक्ष्मजीव विज्ञान",
    "बीमारी की प्रक्रिया",
    "भविष्यवाणी",
    "निदान",
    "दीर्घकालिक",
    "तीव्र",
    "आपातकालीन",
    "सलाह",
    "प्रिस्क्रिप्शन",
    "लक्षणात्मक",
    "अलक्षणात्मक",
    "संचरण",
    "संक्रमण",
    "संक्रामक",
    "रोग प्रतिरोधक",
    "जीवाणु",
    "बीमारी फैलना",
    "जीवाणुभूत",
    "बायोप्सी",
    "अंग",
    "चयापचय",
    "हार्मोन",
    "तंत्रिका रोग",
    "हृदय रोग",
    "एंजियोप्लास्टी",
    "डायलिसिस",
    "मस्तिष्क विकृति",
    "रक्ताल्पता",
    "लीय्यूकेमिया",
    "लिम्फोम",
    "संसेप्सिस",
    "टैचीकार्डिया",
    "ब्रैडिकार्डिया",
    "उच्च रक्तचाप",
    "निम्न रक्तचाप",
    "प्रतिरक्षा दोष",
    "स्वप्रतिरक्षित",
    "रोगजनक",
    "विभेदक निदान",
    // Odia medical terms
    "ସ୍ୱାସ୍ଥ୍ୟ",
    "ଔଷଧ",
    "ଡାକ୍ତର",
    "ବେଦନା",
    "ଜ୍ୱର",
    "ମୁଣ୍ଡବ୍ୟଥା",
    "କାଶି",
    "ସର୍ଦି",
    "ଲକ୍ଷଣ",
    "ଚିକିତ୍ସା",
    "ରୋଗ",
    "ବିମାରୀ",
    "ସଂକ୍ରମଣ",
    "ଟୀକା",
    "ଟୀକାକରଣ",
    "ପ୍ରତିରୋଧ",
    "ସର୍ଜେରୀ",
    "ୱେଦନା",
    "ଫାର୍ମାସୀ",
    "ପାଥୋଲୋଜି",
    "ଅଙ୍କୋଲୋଜି",
    "କାର୍ଡିଓଲୋଜି",
    "ନ୍ୟୁରୋଲୋଜି",
    "ମନୋଚିକିତ୍ସା",
    "ଚର୍ମବିଜ୍ଞାନ",
    "ଶିଶୁରୋଗ",
    "ମହିଳାରୋଗ",
    "ଶରୀର ଗଠନ",
    "ଫାର୍ମାକୋଲୋଜି",
    "ରକ୍ତ ବିଜ୍ଞାନ",
    "ରେଡିଓଲୋଜି",
    "ଏପିଡେମିଓଲୋଜି",
    "ସୂକ୍ଷ୍ମଜୀବ ବିଜ୍ଞାନ",
    "ରୋଗ ପ୍ରକ୍ରିୟା",
    "ପୂର୍ବାନୁମାନ",
    "ନିଦାନ",
    "ଦୀର୍ଘକାଳୀନ",
    "ତୀବ୍ର",
    "ତତ୍କାଳ",
    "ପରାମର୍ଶ",
    "ପ୍ରିସ୍କ୍ରିପ୍ସନ",
    "ଲକ୍ଷଣବତ୍ତା",
    "ଅଲକ୍ଷଣବତ୍ତା",
    "ସଂକ୍ରମଣ",
    "ସଂକ୍ରାମକ",
    "ରୋଗ ପ୍ରତିରୋଧ",
    "ଜୀବାଣୁ",
    "ବାୟୋପ୍ସି",
    "ଅଙ୍ଗ",
    "ପାଚକ୍ରିୟା",
    "ହର୍ମୋନ",
    "ସ୍ନାୟୁରୋଗ",
    "ହୃଦ୍ରୋଗ",
    "ଏଞ୍ଜିଓପ୍ଲାସ୍ଟି",
    "ଡାୟାଲିସିସ",
    "ମଗଜ ରୋଗ",
    " ରକ୍ତାଳ୍ପତା",
    "ଲେୟୁକେମିଆ",
    "ଲିମ୍ଫୋମା",
    "ସେପ୍ସିସ୍",
    "ଟାଚିକାର୍ଡିଆ",
    "ବ୍ରାଡିକାର୍ଡିଆ",
    "ଉଚ୍ଚ ରକ୍ତଚାପ",
    "ନିମ୍ନ ରକ୍ତଚାପ",
    "ପ୍ରତିରୋଧ ଦୋଷ",
    "ସ୍ୱପ୍ରତିରୋଧ",
    "ରୋଗ ଜୀବଜନ୍ତୁ",
    "ଭିନ୍ନ ନିଦାନ",
    // Bangla medical terms
    "স্বাস্থ্য",
    "ঔষধ",
    "ডাক্তার",
    "ব্যথা",
    "জ্বর",
    "মাথাব্যথা",
    "কাশি",
    "ঠান্ডা",
    "লক্ষণ",
    "চিকিৎসা",
    "রোগ",
    "অসুস্থতা",
    "সংক্রমণ",
    "টিকা",
    "টিকাকরণ",
    "প্রতিরক্ষা",
    "শস্ত্রচিকিৎসা",
    "ফার্মাসি",
    "প্যাথলজি",
    "অঙ্কোলজি",
    "কার্ডিওলজি",
    "নিউরোলজি",
    "মনঃস্থৈর্য্য",
    "ত্বকবিজ্ঞান",
    "শিশুখণ্ড",
    "নারী রোগ",
    "শরীর গঠন",
    "ফার্মাকোলজি",
    "রক্তবিজ্ঞান",
    "রেডিওলজি",
    "রোগতত্ত্ব",
    "ক্ষুদ্রজীববিজ্ঞান",
    "রোগের পদ্ধতি",
    "পূর্বাভাস",
    "নির্ণয়",
    "দীর্ঘস্থায়ী",
    "তীব্র",
    "জরুরী",
    "পরামর্শ",
    "প্রেসক্রিপশন",
    "লক্ষণীয়",
    "অলক্ষণীয়",
    "সংক্রমণ",
    "সংক্রামক",
    "রোগ প্রতিরোধ",
    "জীবাণু",
    "বায়োপসি",
    "অঙ্গ",
    "উৎপাদনক্রিয়া",
    "হরমোন",
    "স্নায়ুবিজ্ঞান",
    "হৃদরোগ",
    "অ্যাঞ্জিওপ্লাস্টি",
    "ডায়ালাইসিস",
    "মস্তিষ্ক রোগ",
    "রক্তস্বল্পতা",
    "লিউকেমিয়া",
    "লিম্ফোমা",
    "সেপ্টিসিস",
    "ট্যাকিকার্ডিয়া",
    "ব্রাডিকার্ডিয়া",
    "উচ্চরক্তচাপ",
    "নিম্নরক্তচাপ",
    "প্রতিরোধহীনতা",
    "স্বতন্ত্রপ্রতিরক্ষা",
    "রোগজীবাণু",
    "বিভিন্ন রোগনির্ণয়",
  ];

  const checkHealthRelated = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return healthKeywords.some((keyword) =>
      lowerMessage.includes(keyword.toLowerCase())
    );
  };

  const generateHealthResponse = (message: string): string => {
    const responses = [
      t("chat.response1"),
      t("chat.response2"),
      t("chat.response3"),
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
