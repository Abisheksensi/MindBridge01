import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "../ChatBubble/ChatBubble.jsx";
import ChatInput from "../ChatInput/ChatInput.jsx";
import "./ChatArea.css";

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
    <div className={`relative h-full flex flex-col bg-gradient-to-b from-purple-50 to-white ${className}`} style={{ position: "relative" }}>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-purple-50 to-transparent z-10"></div>
      <div className="flex-1 overflow-y-auto pt-6 pb-8 space-y-4 md:px-16 lg:px-16 xl:px-32">
        {showWelcome && (
          <div
            className={`animate-fadeIn2 absolute top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out text-center text-3xl font-bold text-gray-800 z-10
              ${!showWelcome ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 -translate-y-1/2'}`}
          >
            {messages[messages.length - 1]?.role === "user" ? (
              <>
                Thinking...
              </>
            ) : (
              <>
                Welcome!
                <br />
                How can I assist you today?
              </>
            )}
          </div>
        )}
        {messages.slice(1).map(message => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center px-3 pb-8 w-full">
          <ChatInput
            className="w-full max-w-2xl animate-fadeIn1"
            messages={messages}
            setMessages={setMessages}
          />
        </div>
        <div className="flex justify-center items-center text-blue-800 font-regular font-[Satoshi] md:w-12 md:justify-center md lg:w-full h-6 text-[12px]">
          This is a demonstration version. The final product will be available soon. Thank you for choosing PixelFix.
        </div>
      </div>
    </div>
  );
};

export default ChatArea;