import React, { useEffect, useRef } from 'react';

const ChatBubble = ({ message }) => {
  const innerRef = useRef();
  
  useEffect(() => {
    innerRef.current.classList.add('fade-in');
  }, []);
  
  const { role, content } = message;
  
  if (role === 'thinking') {
    return (
      <div ref={innerRef} className="flex justify-start mb-4">
        <div className="max-w-xs p-3 rounded-lg bg-blue-900 text-white">
          <span className="animate-pulse inline-block transition-opacity duration-500">{content}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div ref={innerRef} className={`${role === 'user' ? 'flex justify-end' : 'flex justify-start'} mb-4`}>
      <div
        className={`${role === 'user' ? 'max-w-xs p-3 rounded-lg bg-blue-500 text-white' : 'max-w-xs p-3 rounded-lg bg-blue-900 text-white'}`}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatBubble;