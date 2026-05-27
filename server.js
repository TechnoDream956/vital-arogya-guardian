import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.post('/api/health-query', async (req, res) => {
  try {
    const { message } = req.body;

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
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          temperature: 0.7,
          max_tokens: 700,
          messages: [
            {
              role: 'system',
              content: `
You are Arogya Raksha, a trusted AI health assistant for India, especially rural communities.

RULES:
1. ONLY answer health, wellness, medical, fitness, nutrition, medicine, symptoms, disease, and healthcare questions.
2. If question is unrelated to health, politely refuse.
3. Automatically respond in the SAME language as the user.
4. Keep responses simple and easy to understand.
5. Be empathetic and supportive.
6. Keep answers concise but helpful.
7. Use markdown formatting when useful.
8. Never mention AI companies or APIs.
9. End with:

English:
"This is general health information. Please consult a doctor for serious conditions."

Hindi:
"यह सामान्य स्वास्थ्य जानकारी है। गंभीर स्थिति के लिए डॉक्टर से सलाह लें।"
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
      return res.json({
        response: data.choices[0].message.content
      });
    }

    return res.status(500).json({
      error: 'Invalid AI response',
      details: data
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
});

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
