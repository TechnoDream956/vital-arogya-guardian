import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

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

    console.log('Incoming question:', message);

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
1. Only answer health-related questions.
2. Reply in the user's language.
3. Keep answers simple.
4. Be empathetic.
5. Never mention AI companies.
6. End with a medical disclaimer.
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

    console.log('Groq response:', JSON.stringify(data));

    if (data.choices?.[0]?.message?.content) {
      return res.json({
        response: data.choices[0].message.content
      });
    }

    return res.status(500).json({
      error: 'Invalid Groq response',
      details: data
    });

  } catch (error) {
    console.error('SERVER ERROR:', error);

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
