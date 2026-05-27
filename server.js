import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { config } from 'dotenv';

config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// ── Health query endpoint using Claude API ──
app.post('/api/health-query', async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured. Add ANTHROPIC_API_KEY to your .env file.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 800,
        system: `You are Arogya Raksha, a trusted AI health assistant for India, especially for rural communities.

RULES:
1. Only answer health-related, medical, or wellness questions.
2. If not health-related, say you only answer health questions (in the user's language).
3. Auto-detect the user's language and respond in the SAME language.
4. Use simple, easy-to-understand words suitable for general public.
5. Be empathetic and supportive.
6. Keep responses under 300 words.
7. End with: "यह सामान्य जानकारी है। गंभीर समस्या के लिए डॉक्टर से मिलें।" (for Hindi/Odia/Bengali) or "This is general information. For serious conditions, please consult a doctor." (for English).
8. Never mention any AI platform or company. You are only Arogya Raksha.`,
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();
    if (data.content?.[0]?.text) {
      res.json({ response: data.content[0].text });
    } else {
      res.status(500).json({ error: 'No response from AI', details: data.error?.message });
    }
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ error: 'AI processing failed', details: err.message });
  }
});

// ── Serve static files ──
app.use(express.static(__dirname));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Arogya Raksha server running at http://localhost:${PORT}`);
});
