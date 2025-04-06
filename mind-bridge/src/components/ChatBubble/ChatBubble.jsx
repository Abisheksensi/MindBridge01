import React from "react";

const ChatBubble = ({ message, isUser = false }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isUser ? 'bg-blue-500 text-white' : 'bg-blue-900 text-white'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;