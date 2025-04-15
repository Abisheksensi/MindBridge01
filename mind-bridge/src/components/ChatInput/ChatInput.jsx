import React, { useState } from "react";
import "./ChatInput.css";

const ChatInput = ({ messages, setMessages, className }) => {
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState("");

  const isThinking = messages.length > 0 && messages[messages.length - 1].role === "thinking";
  console.log("isThinking:", isThinking, "Last message:", messages[messages.length - 1]);

  const positiveMessages = [
    "We’re here for you...",
    "Finding the right words...",
    "You’re not alone...",
    "Crafting a warm reply...",
    "Thinking of you...",
    "Help is on the way...",
    "Gathering some hope...",
  ];

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), role: "user", content: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    const thinkingId = Date.now() + 1;
    let messageIndex = 0;
    setMessages((prev) => [
      ...prev,
      { id: thinkingId, role: "thinking", content: positiveMessages[messageIndex] },
    ]);

    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % positiveMessages.length;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingId
            ? { id: msg.id, role: "thinking", content: positiveMessages[messageIndex] }
            : msg
        )
      );
    }, 2500);

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Temporary delay

      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${data.content || "Unknown error"}`);
      }

      clearInterval(interval);
      setMessages((prev) => {
        const newMessages = prev.filter((msg) => msg.id !== thinkingId);
        return [...newMessages, { id: Date.now(), role: "assistant", content: data.content }];
      });
    } catch (error) {
      console.error("Error in sendMessage:", error);
      clearInterval(interval);
      setMessages((prev) => {
        const newMessages = prev.filter((msg) => msg.id !== thinkingId);
        return [
          ...newMessages,
          { id: Date.now(), role: "assistant", content: "Sorry, something went wrong!" },
        ];
      });
    }
  };

  const startSpeechRecognition = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setInputText(transcript);
      };
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
        setInputText("Sorry, I couldn’t hear you. Please try again.");
      };

      recognition.start();
    } else {
      setInputText("Sorry, your browser doesn’t support voice input.");
    }
  };

  return (
    <div
    className={`chat-input-container ${isThinking ? "thinking" : ""} ${className}`}
    >
    <div className="background w-full max-w-2xl">
      <span className="material-icons add-icon" style={{ fontSize: "36px" }}>
        add_circle
      </span>
      <div className="input-wrapper">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="We are here with you, Talk with us!"
          className="chat-input"
        />
      </div>

      <span
        className={`material-icons mic-icon ${isRecording ? "recording" : ""}`}
        style={{ fontSize: "36px" }}
        onClick={startSpeechRecognition}
      >
        mic
      </span>
    </div>
    </div>
  );
};

export default ChatInput;