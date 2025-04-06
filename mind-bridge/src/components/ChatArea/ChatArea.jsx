import React, { useEffect, useState } from "react";
import ChatBubble from '../ChatBubble/ChatBubble.jsx';

const ChatArea = ({ messages, className }) => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (messages.length > 1) {
      const hasUserMessage = messages.some(msg => msg.role === "user");
      if (hasUserMessage) {
        setTimeout(() => setShowWelcome(false), 500); // allow animation time
      }
    }
  }, [messages]);

  return (
    <div className={`flex-1 relative bg-gradient-to-b from-purple-50 to-white p-6 flex flex-col justify-between ${className}`}>
      {showWelcome && (
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out
            ${messages.length > 1 ? 'opacity-0 -translate-y-8' : 'opacity-100 -translate-y-1/2'}`}
        >
          <h1 className="text-3xl font-bold text-gray-800 text-center leading-snug">
            Good Morning
            <br />
            What can I help you with today?
          </h1>
        </div>
      )}
      <div className="flex-1 overflow-y-auto mt-6">
        {messages.slice(1).map((message, index) => (
          <ChatBubble
            key={index}
            message={message.content}
            isUser={message.role === "user"}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatArea;

