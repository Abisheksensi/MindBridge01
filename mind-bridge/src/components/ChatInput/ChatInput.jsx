import React, { useState } from "react";

const ChatInput = ({ messages, setMessages, className }) => {
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

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
  if (inputText.trim()) {
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
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      console.log("Server response:", data); // Debug server response

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
        return [...newMessages, { id: Date.now(), role: "assistant", content: "Sorry, something went wrong!" }];
      });
    }
  }
};

  const startSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false; // Stop after one phrase
      recognition.interimResults = true; // Show real-time results
      recognition.lang = 'en-US'; // Set language (adjust as needed)

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInputText(transcript);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

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
      className={`relative w-full max-w-[993px] h-[85px] bg-gradient-to-t from-white to-[#f5f6fe] rounded-[28px] shadow-lg flex items-center p-4 ${className}`}
    >
      <span
        className="material-icons text-gray-600 cursor-pointer"
        style={{ fontSize: "36px" }}
      >
        add_circle
      </span>
      <div className="flex-1 mx-4 bg-white rounded-3xl h-[67px] flex items-center px-6 shadow-sm border border-gray-200">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="We are here with you, Talk with us!"
          className="w-full text-xl font-['General_Sans'] font-normal text-gray-700 bg-transparent border-none outline-none placeholder-gray-400"
        />
      </div>
      <span
        className={`material-icons cursor-pointer ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}
        style={{ fontSize: "36px" }}
        onClick={startSpeechRecognition}
      >
        mic
      </span>
    </div>
  );
};

export default ChatInput;