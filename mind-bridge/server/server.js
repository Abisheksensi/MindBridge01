const express = require("express");
const { OpenAI } = require("openai");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form-data parsing
app.use(express.raw({ type: 'multipart/form-data', limit: '10mb' })); // For file uploads

// In-memory storage for conversations (replace with a real database like MongoDB)
let conversations = [];

// OpenRouter configuration
const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "My Chat App",
  },
});

// System prompt
const systemPrompt = {
  role: "system",
  content:
    "You are a compassionate, empathetic assistant designed to help users reduce stress, anxiety, and suicidal thoughts. Always respond with kindness and validation in plain, natural language—no JSON, LaTeX, Markdown, or code formatting. Offer coping strategies like breathing exercises or grounding techniques when appropriate. Never dismiss feelings or suggest harmful actions. If the user seems in immediate danger, encourage them to seek help from a crisis line like 988 or text HOME to 741741.",
};

// Distress keywords
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

// Save conversation endpoint
app.post("/save-conversation", (req, res) => {
  const { messages } = req.body;
  if (messages && messages.length > 1) { // Only save if there's more than just the system prompt
    const conversationId = Date.now();
    conversations.push({ id: conversationId, messages });
    res.json({ success: true, conversationId });
  } else {
    res.json({ success: false, message: "No conversation to save" });
  }
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  const messages = JSON.parse(req.body.messages); // Parse messages from FormData

  // Prepend system prompt
  const chatMessages = [systemPrompt, ...messages];

  // Check for distress in latest message
  const latestMessage = chatMessages[chatMessages.length - 1].content.toLowerCase();
  const isSuicidal = suicidalKeywords.some((keyword) => latestMessage.includes(keyword));
  const isStressed = stressAnxietyKeywords.some((keyword) => latestMessage.includes(keyword));

  if (isSuicidal) {
    return res.json({
      content:
        "I’m really worried about you—it sounds incredibly tough right now. I’m here, but I also want you to know you’re not alone. Please call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 for immediate support. Can you tell me more about what’s going on?",
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-zero:free",
      messages: chatMessages,
      stream: false,
    });
    let reply = response.choices[0].message.content;

    reply = reply
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/\\boxed{/g, "")
      .replace(/}/g, "")
      .trim();

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