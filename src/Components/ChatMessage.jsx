// ChatMessage.jsx
import React from "react";

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex w-full ${isUser ? "justify-start" : "justify-start"} mb-4`}>
      <div
        className={`p-4 rounded-lg shadow-md ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
