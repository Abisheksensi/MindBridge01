import React from "react";
import ChatBubble from '../ChatBubble/ChatBubble.jsx';

const ChatArea = ({ messages, className }) => {
  return (
    <div className={`flex-1 bg-gradient-to-b from-purple-50 to-white p-6 flex flex-col justify-between ${className}`}>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Good Morning
          <br />
          What can I help you with today?
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto">
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