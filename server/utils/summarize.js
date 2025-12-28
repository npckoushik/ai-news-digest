import Groq from "groq-sdk";

export default async function summarize(text) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  if (!text || text.trim().length < 50) {
    return "• Article content was too short to generate a meaningful summary.";
  }

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
You are an AI assistant that summarizes news articles.

Rules you MUST follow:
- Assume the provided text IS the article.
- Do NOT say you are missing information.
- Do NOT apologize.
- Do NOT mention limitations.
- Summarize ONLY the given text.
- Output EXACTLY 4 bullet points.
- Each bullet point must be factual and concise.
`
      },
      {
        role: "user",
        content: text.slice(0, 4000)
      }
    ],
    temperature: 0.2
  });

  return response.choices[0].message.content;
}
