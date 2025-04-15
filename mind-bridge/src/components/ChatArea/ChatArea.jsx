import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "../ChatBubble/ChatBubble.jsx";
import ChatInput from "../ChatInput/ChatInput.jsx";

const ChatArea = ({ messages: initialMessages, className }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Determine if we're in a "thinking state"
    const lastMessage = messages[messages.length - 1];
    const hasUserMessage = messages.some(msg => msg.role === "user");
    
    if (messages.length > 1 && hasUserMessage) {
      // Show welcome message if the last message is from the user (thinking state)
      if (lastMessage.role === "user") {
        setShowWelcome(true);
      } else {
        // Hide welcome message after assistant responds
        setTimeout(() => setShowWelcome(false), 300);
      }
    } else {
      setShowWelcome(true); // Show welcome message initially
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`relative h-full flex flex-col bg-gradient-to-b from-purple-50 to-white ${className}`}>
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-8 space-y-4">
        {showWelcome && (
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out text-center text-3xl font-bold text-gray-800 z-10
              ${!showWelcome ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 -translate-y-1/2'}`}
          >
            {messages[messages.length - 1]?.role === "user" ? (
              <>
                Thinking...
              </>
            ) : (
              <>
                Good Morning
                <br />
                What can I help you with today?
              </>
            )}
          </div>
        )}
        {messages.slice(1).map(message => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className=" left-0 w-full flex justify-center px-3 pb-8">
        <ChatInput
          className="w-full max-w-2xl"
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};

export default ChatArea;