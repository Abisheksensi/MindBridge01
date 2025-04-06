import React, { useState } from "react";

const ChatInput = ({ messages, setMessages, className }) => {
  const [inputText, setInputText] = useState("");

const sendMessage = async () => {
  if (inputText.trim()) {
    const userMessage = { role: "user", content: inputText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText("");

    try {
      const response = await fetch("http://localhost:3000/chat", { // Line 14: Fetch call
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data.content },
      ]);
    } catch (error) {
      console.error("Error calling DeepSeek API:", error); // Line 30: Error logged here
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, something went wrong!" },
      ]);
    }
  }
};

  return (
    <div className={`relative w-[993px] h-[85px] bg-[#f5f6fe] rounded-[28px] shadow-[0_11px_24px_rgba(51,39,58,0.1),0_43px_43px_rgba(51,39,58,0.09),0_97px_58px_rgba(51,39,58,0.05),0_172px_69px_rgba(51,39,58,0.01)] flex items-center ${className}`}>
      <span
        className="material-icons absolute left-6 text-gray-600"
        style={{ top: "50%", transform: "translateY(-50%)", fontSize: "36px" }}
      >
        add_circle
      </span>
      <div className="absolute left-[95px] top-1/2 -translate-y-1/2 w-[810px] h-[67px] bg-white rounded-3xl px-6 py-2.5 flex items-center gap-2.5 gradient-border">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="We are here with you, Talk with us!"
          className="flex-1 text-xl font-['General_Sans'] font-normal text-[var(--dark-blue700)] bg-transparent border-none outline-none"
        />
      </div>
      <span
        className="material-icons absolute left-[927px] text-gray-600"
        style={{ top: "50%", transform: "translateY(-50%)", fontSize: "36px" }}
      >
        mic
      </span>
    </div>
  );
};

export default ChatInput;