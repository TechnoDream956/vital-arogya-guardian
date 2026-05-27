export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const { message, language } = req.body;

cconst langMap = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
  od: 'Odia',
  ta: 'Tamil',
  te: 'Telugu',
  mr: 'Marathi',
  gu: 'Gujarati',
  pa: 'Punjabi',
  kn: 'Kannada',
  ml: 'Malayalam',
  as: 'Assamese',
  ur: 'Urdu',
  ne: 'Nepali',
  kok: 'Konkani',
  mai: 'Maithili',
  sa: 'Sanskrit',
  sd: 'Sindhi',
  doi: 'Dogri',
  mni: 'Manipuri',
  sat: 'Santali',
  ks: 'Kashmiri',
  bho: 'Bhojpuri',
  tcy: 'Tulu'
};

const selectedLanguage = langMap[language] || 'English';

    if (!message) {
      return res.status(400).json({
        error: 'Message is required'
      });
    }

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          temperature: 0.7,
          max_tokens: 700,
          messages: [
            {
              role: 'system',
              content: `
You are Arogya Raksha, a trusted AI health assistant for India.

RULES:
1. ONLY answer health and wellness questions.
2. Respond STRICTLY in this language:
${selectedLanguage}

Rules:
- English → ONLY English
- Hindi → ONLY Hindi
- Odia → ONLY Odia
- Bengali → ONLY Bengali
- Never mix languages
3. Keep answers detailed but easy to understand.
4. Use bullet points when useful.
5. Explain symptoms, causes, prevention, and basic remedies when relevant.
6. Never mention AI companies.
7. End with:
"This is general health information. Please consult a doctor for serious conditions."
`
            },
            {
              role: 'user',
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.choices?.[0]?.message?.content) {
      return res.status(200).json({
        response: data.choices[0].message.content
      });
    }

    return res.status(500).json({
      error: 'Invalid AI response',
      details: data
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
}
