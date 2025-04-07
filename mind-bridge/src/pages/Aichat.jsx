import React, { useState } from "react";
import Sidebar from '../components/Sidebar/Sidebar';
import ChatArea from '../components/ChatArea/ChatArea';
import ChatInput from '../components/ChatInput/ChatInput';

function Aichat() {
  const [messages, setMessages] = useState([
    { id: Date.now(), role: "system", content: "You are a helpful assistant." },
  ]);

  const handleNewConversation = async () => {
    if (messages.length > 1) { // Only save if there's more than the system prompt
      try {
        const response = await fetch("http://localhost:3000/save-conversation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages }),
        });
        const result = await response.json();
        if (result.success) {
          console.log(`Conversation saved with ID: ${result.conversationId}`);
        } else {
          console.log("No conversation to save");
        }
      } catch (error) {
        console.error("Error saving conversation:", error);
      }
    }
    // Reset to a new chat window
    setMessages([
      { id: Date.now(), role: "system", content: "You are a helpful assistant." },
    ]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onNewConversation={handleNewConversation} />
      <div className="flex flex-col flex-1 h-screen">
        <div className="flex-1 overflow-hidden">
          <ChatArea className="h-full w-full" messages={messages} />
        </div>
        <div className="w-full flex justify-center p-3 bg-gradient-to-t from-white to-transparent">
          <ChatInput
            className="w-full max-w-4xl"
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  );
}

export default Aichat;