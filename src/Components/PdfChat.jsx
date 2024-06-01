import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";

function PdfChat() {
  const [filename, setFilename] = useState("");
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const handleChat = async () => {
    if (!question) return;

    const newMessage = { message: question, isUser: true };
    setChatMessages([...chatMessages, newMessage]);

    try {
      const res = await axios.post(
        "https://chatapp-hvwpc7fleq-el.a.run.app/ask/",
        {
          query: question,
        }
      );
      const botMessage = { message: res.data.response, isUser: false };
      setChatMessages([...chatMessages, newMessage, botMessage]);
    } catch (error) {
      console.error("Error chatting with PDF:", error);
    } finally {
      setQuestion("");
    }
  };

  // Scroll to bottom of chat container on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div
      className="w-full flex flex-col justify-between"
      style={{ height: "90vh" }}
    >
      <div
        className="container mx-auto mt-5 flex-grow p-1 bg-white rounded-md overflow-y-scroll"
        ref={chatContainerRef}
      >
        {chatMessages.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} isUser={msg.isUser} />
        ))}
      </div>
      <div className="relative mx-auto w-[90%] flex py-2 items-center">
        <input
          ref={inputRef}
          className="w-full bg-[#E4E8EE] shadow-xl py-3 px-3 rounded-md pr-12"
          type="text"
          placeholder="Send a message..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <img
          src="/send1.svg"
          alt="Send"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-6 cursor-pointer"
          onClick={handleChat}
        />
      </div>
    </div>
  );
}

export default PdfChat;
