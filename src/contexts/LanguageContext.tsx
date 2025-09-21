import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi" | "or" | "bn"; // English, Hindi, Odia, Bengali

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// ✅ All translations go here
const translations: Record<Language, Record<string, string>> = {
  en: {
    "features.ai_title": "AI-Powered Intelligence",
    "features.ai_desc": "Accurate health insights powered by advanced AI",

    "features.verified_title": "Verified Information",
    "features.verified_desc":
      "Trusted knowledge from certified medical sources",

    "features.availability_title": "24/7 Availability",
    "features.availability_desc": "Get instant health help anytime, anywhere",

    "features.multilang_title": "Multilingual Support",
    "features.multilang_desc": "Available in Hindi, English, Odia and Bengali",

    "features.analysis_title": "Symptom Analysis",
    "features.analysis_desc": "Early detection and guidance based on symptoms",

    "features.preventive_title": "Preventive Care",
    "features.preventive_desc":
      "Tips and knowledge for better preventive health",

    "features.medicine_title": "Medication Guidance",
    "features.medicine_desc":
      "General information and precautions for medicines",

    "features.personal_title": "Personalized Care",
    "features.personal_desc":
      "Customized suggestions based on your health needs",
  },

  hi: {
    "features.ai_title": "एआई-संचालित बुद्धिमत्ता",
    "features.ai_desc": "उन्नत एआई तकनीकों के साथ सटीक स्वास्थ्य जानकारी",

    "features.verified_title": "विश्वसनीय जानकारी",
    "features.verified_desc": "प्रमाणित चिकित्सा स्रोतों से विश्वसनीय ज्ञान",

    "features.availability_title": "24/7 उपलब्धता",
    "features.availability_desc":
      "कभी भी, कहीं भी तुरंत स्वास्थ्य सहायता प्राप्त करें",

    "features.multilang_title": "बहुभाषी समर्थन",
    "features.multilang_desc": "हिंदी, अंग्रेजी, उड़िया और बांग्ला में उपलब्ध",

    "features.analysis_title": "लक्षण विश्लेषण",
    "features.analysis_desc":
      "लक्षणों के आधार पर प्रारंभिक पहचान और मार्गदर्शन",

    "features.preventive_title": "निवारक देखभाल",
    "features.preventive_desc":
      "बेहतर निवारक स्वास्थ्य के लिए सुझाव और जानकारी",

    "features.medicine_title": "दवा मार्गदर्शन",
    "features.medicine_desc": "दवाओं की सामान्य जानकारी और सावधानियां",

    "features.personal_title": "व्यक्तिगत देखभाल",
    "features.personal_desc": "आपकी स्वास्थ्य आवश्यकताओं के अनुसार सुझाव",
  },

  or: {
    "features.ai_title": "AI-ଚାଳିତ ବୁଦ୍ଧିମତା",
    "features.ai_desc": "ଉନ୍ନତ AI ପ୍ରଯୁକ୍ତି ସହିତ ସଠିକ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା",

    "features.verified_title": "ଭରସାଯୋଗ୍ୟ ସୂଚନା",
    "features.verified_desc": "ପ୍ରମାଣିତ ଚିକିତ୍ସା ସ୍ରୋତରୁ ଭରସାଯୋଗ୍ୟ ଜ୍ଞାନ",

    "features.availability_title": "24/7 ଉପଲବ୍ଧ",
    "features.availability_desc":
      "ଯେକଣସି ସମୟରେ, ଯେକଣସି ସ୍ଥାନରୁ ସ୍ୱାସ୍ଥ୍ୟ ସହାୟତା",

    "features.multilang_title": "ବହୁଭାଷା ସମର୍ଥନ",
    "features.multilang_desc": "ହିନ୍ଦୀ, ଇଂରାଜୀ, ଓଡ଼ିଆ ଏବଂ ବଙ୍ଗଳାରେ ଉପଲବ୍ଧ",

    "features.analysis_title": "ଲକ୍ଷଣ ବିଶ୍ଳେଷଣ",
    "features.analysis_desc": "ଲକ୍ଷଣ ଆଧାରିତ ପ୍ରାରମ୍ଭିକ ସନ୍ଦେହ ଏବଂ ଦିଗଦର୍ଶନ",

    "features.preventive_title": "ପ୍ରତିରୋଧାତ୍ମକ ଯତ୍ନ",
    "features.preventive_desc": "ଭଲ ପ୍ରତିରୋଧାତ୍ମକ ସ୍ୱାସ୍ଥ୍ୟ ପାଇଁ ସୁପାରିଶ",

    "features.medicine_title": "ଔଷଧ ମାର୍ଗଦର୍ଶନ",
    "features.medicine_desc": "ଔଷଧ ସମ୍ପର୍କିତ ସାଧାରଣ ସୂଚନା ଏବଂ ସାବଧାନୀ",

    "features.personal_title": "ବ୍ୟକ୍ତିଗତ ଯତ୍ନ",
    "features.personal_desc": "ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରୟୋଜନୀୟତା ଅନୁଯାୟୀ ସୁପାରିଶ",
  },

  bn: {
    "features.ai_title": "এআই-চালিত বুদ্ধিমত্তা",
    "features.ai_desc": "উন্নত এআই প্রযুক্তি দ্বারা চালিত সঠিক স্বাস্থ্য তথ্য",

    "features.verified_title": "যাচাই করা তথ্য",
    "features.verified_desc": "সার্টিফাইড মেডিকেল উৎস থেকে নির্ভরযোগ্য জ্ঞান",

    "features.availability_title": "২৪/৭ উপলব্ধতা",
    "features.availability_desc":
      "যেকোনো সময়, যেকোনো জায়গায় তাৎক্ষণিক স্বাস্থ্য সহায়তা পান",

    "features.multilang_title": "বহুভাষিক সমর্থন",
    "features.multilang_desc":
      "হিন্দি, ইংরেজি, ওড়িয়া এবং বাংলা ভাষায় উপলব্ধ",

    "features.analysis_title": "লক্ষণ বিশ্লেষণ",
    "features.analysis_desc":
      "লক্ষণগুলির উপর ভিত্তি করে প্রাথমিক সনাক্তকরণ এবং নির্দেশনা",

    "features.preventive_title": "প্রতিরোধমূলক যত্ন",
    "features.preventive_desc":
      "উন্নত প্রতিরোধমূলক স্বাস্থ্যের জন্য টিপস এবং জ্ঞান",

    "features.medicine_title": "ঔষধ নির্দেশিকা",
    "features.medicine_desc": "ঔষধ সম্পর্কে সাধারণ তথ্য এবং সতর্কতা",

    "features.personal_title": "ব্যক্তিগত যত্ন",
    "features.personal_desc":
      "আপনার স্বাস্থ্য চাহিদার উপর ভিত্তি করে কাস্টমাইজড পরামর্শ",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en"); // ✅ Default English

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
