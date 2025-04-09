const express = require("express");
const { OpenAI } = require("openai");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Matches your frontend
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Optional, for form-data (can remove if unused)

// In-memory storage for conversations (consider MongoDB for production)
let conversations = [];

// OpenRouter configuration with your new API key
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
  if (messages && messages.length > 1) {
    const conversationId = Date.now();
    conversations.push({ id: conversationId, messages });
    res.json({ success: true, conversationId });
  } else {
    res.json({ success: false, message: "No conversation to save" });
  }
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    // Log incoming request for debugging
    console.log("Received request body:", req.body);

    const messages = req.body.messages;
    if (!messages || !Array.isArray(messages)) {
      console.log("Invalid messages format:", messages);
      return res.status(400).json({ content: "Invalid messages format" });
    }

    // Prepend system prompt
    const chatMessages = [systemPrompt, ...messages];
    console.log("Messages sent to OpenRouter:", chatMessages);

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

    // Call OpenRouter API
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-zero:free", // Your updated model
      messages: chatMessages,
      stream: false,
    });
    console.log("OpenRouter response:", response); // Log API response

    let reply = response.choices[0].message.content;

    // Clean up unwanted formatting
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
    console.error("Error in /chat endpoint:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      response: error.response ? error.response.data : null, // Log API error details if available
    });
    res.status(500).json({ content: "Sorry, something went wrong on our end!" });
  }
});

// Health check endpoint for testing server availability
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});