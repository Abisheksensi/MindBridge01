import React, { useState } from "react";
import Sidebar from '../components/Sidebar/Sidebar';
import ChatArea from '../components/ChatArea/ChatArea';
import ChatInput from '../components/ChatInput/ChatInput';

function Aichat() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col pb-5">
        <ChatArea className="flex-1 w-full" messages={messages} />
        <div className="w-full flex justify-center">
          <ChatInput
            className="w-full max-w-3xl"
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  );
}

export default Aichat;