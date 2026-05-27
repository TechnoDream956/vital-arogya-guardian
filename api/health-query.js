export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

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
2. Reply in the user's language.
3. Keep answers simple and concise.
4. Never mention AI companies.
5. End with:
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
