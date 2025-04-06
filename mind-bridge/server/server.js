const express = require("express");
const { OpenAI } = require("openai");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// OpenRouter configuration
const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "My Chat App",
  },
});

// System prompt to guide the AI's behavior
const systemPrompt = {
  role: "system",
  content:
    "You are a compassionate, empathetic assistant designed to help users reduce stress, anxiety, and suicidal thoughts. Always respond with kindness and validation in plain, natural language—no JSON, LaTeX, Markdown, or code formatting. Offer coping strategies like breathing exercises or grounding techniques when appropriate. Never dismiss feelings or suggest harmful actions. If the user seems in immediate danger, encourage them to seek help from a crisis line like 988 or text HOME to 741741.",
};

// Keywords for detecting distress
const suicidalKeywords = [
  "i want to die",
  "end it",
  "can’t go on",
  "kill myself",
  "no point",
];
const stressAnxietyKeywords = [
  "stressed",
  "anxious",
  "overwhelmed",
  "can’t think",
  "panic",
];

// Chat endpoint
app.post("/chat", async (req, res) => {
  let { messages } = req.body;

  // Prepend the system prompt to every conversation
  messages = [systemPrompt, ...messages];

  // Check for distress signals in the latest user message
  const latestMessage = messages[messages.length - 1].content.toLowerCase();
  const isSuicidal = suicidalKeywords.some((keyword) =>
    latestMessage.includes(keyword)
  );
  const isStressed = stressAnxietyKeywords.some((keyword) =>
    latestMessage.includes(keyword)
  );

  // Handle immediate suicidal risk
  if (isSuicidal) {
    return res.json({
      content:
        "I’m really worried about you—it sounds incredibly tough right now. I’m here, but I also want you to know you’re not alone. Please call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 for immediate support. Can you tell me more about what’s going on?",
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-zero:free",
      messages,
      stream: false,
    });
    let reply = response.choices[0].message.content;

    // Strip any unwanted formatting (e.g., JSON or LaTeX) as a fallback
    reply = reply
      .replace(/```json/g, "") // Remove JSON markers
      .replace(/```/g, "") // Remove code blocks
      .replace(/\\boxed{/g, "") // Remove LaTeX boxing
      .replace(/}/g, "") // Remove closing braces
      .trim();

    // Append coping strategy for stress/anxiety if detected
    if (isStressed) {
      reply +=
        "\n\nLet’s try something to ease that feeling—how about a quick breathing exercise? Inhale for 4 seconds, hold for 4, exhale for 4. Want to do it together?";
    }

    res.json({ content: reply });
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    res.status(500).json({ content: "Sorry, something went wrong!" });
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});