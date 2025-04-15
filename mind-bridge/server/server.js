const express = require("express");
const { OpenAI } = require("openai");
const cors = require("cors");
const { MongoClient } = require("mongodb"); // Added for MongoDB

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Matches your frontend
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Optional, for form-data (can remove if unused)

// MongoDB setup
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://jayathilakeabishek:jInwlI3XnpwZMICj@messages.cuxljij.mongodb.net/?retryWrites=true&w=majority&appName=Messages";
let client;
let globalMongoClientPromise;

const getMongoClient = async () => {
  if (globalMongoClientPromise) {
    return globalMongoClientPromise;
  }

  try {
    client = new MongoClient(MONGODB_URI);
    globalMongoClientPromise = client.connect();
    console.log("Connected to MongoDB");
    return globalMongoClientPromise;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// DeepSeek configuration
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
  "can't go on",
  "kill myself",
  "no point",
];
const stressAnxietyKeywords = [
  "stressed",
  "anxious",
  "overwhelmed",
  "can't think",
  "panic",
];

// Save conversation endpoint (Updated to use MongoDB)
app.post("/save-conversation", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length <= 1) {
    return res.json({ success: false, message: "No conversation to save" });
  }

  try {
    const client = await getMongoClient();
    const db = client.db("mental-health-chatbot");
    const collection = db.collection("conversations");

    const result = await collection.insertOne({
      messages,
      createdAt: new Date(),
    });

    res.json({ success: true, conversationId: result.insertedId });
  } catch (error) {
    console.error("Error saving conversation:", error);
    res.status(500).json({ success: false, message: "Failed to save conversation" });
  }
});

// Get conversations endpoint (Added)
app.get("/get-conversations", async (req, res) => {
  try {
    const client = await getMongoClient();
    const db = client.db("mental-health-chatbot");
    const collection = db.collection("conversations");

    const conversations = await collection.find({}).toArray();
    res.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Failed to fetch conversations" });
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
    console.log("Messages sent to DeepSeek:", chatMessages);

    // Check for distress in latest message
    const latestMessage = chatMessages[chatMessages.length - 1].content.toLowerCase();
    const isSuicidal = suicidalKeywords.some((keyword) => latestMessage.includes(keyword));
    const isStressed = stressAnxietyKeywords.some((keyword) => latestMessage.includes(keyword));

    if (isSuicidal) {
      return res.json({
        content:
          "I'm really worried about you—it sounds incredibly tough right now. I'm here, but I also want you to know you're not alone. Please call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 for immediate support. Can you tell me more about what's going on?",
      });
    }

    // Call DeepSeek API
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-4-maverick:free", // Updated to DeepSeek's chat model
      messages: chatMessages,
      stream: false,
    });
    console.log("DeepSeek response:", response); // Log API response

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
        "\n\nLet's try something to ease that feeling—how about a quick breathing exercise? Inhale for 4 seconds, hold for 4, exhale for 4. Want to do it together?";
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