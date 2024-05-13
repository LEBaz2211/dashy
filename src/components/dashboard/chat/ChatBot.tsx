"use client";

import React, { useState, useEffect, useCallback } from "react";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

type Props = {
  userId: string;
  isVisible: boolean;
};

export default function Chatbot({ userId, isVisible }: Props) {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [conversationId, setConversationId] = useState<number | null>(null);

  const handleStartConversation = async () => {
    const response = await fetch("http://127.0.0.1:8000/start_conversation/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        conversation: [{ role: "user", content: userInput }],
      }),
    });
    const data = await response.json();
    setConversation(data.conversation);
    setConversationId(data.id);
    setUserInput("");
  };

  const handleContinueConversation = async () => {
    if (!conversationId) return;
    const response = await fetch(
      "http://127.0.0.1:8000/continue_conversation/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id: conversationId,
          user_message: userInput,
        }),
      }
    );
    const data = await response.json();
    setConversation(data.conversation);
    setUserInput("");
  };

  const sendMessage = () => {
    if (conversation.length === 0) {
      handleStartConversation();
    } else {
      handleContinueConversation();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-lg p-6 z-50 overflow-y-auto">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          {conversation.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={userInput}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="border p-2 w-full"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
