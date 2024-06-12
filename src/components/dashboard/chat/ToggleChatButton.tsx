"use client";

import React from "react";

const ToggleChatButton = () => {
  const toggleChatBot = () => {
    const chatBot = document.getElementById("chatBotContainer");
    if (chatBot) {
      chatBot.style.display =
        chatBot.style.display === "block" ? "none" : "block";
    }
  };

  return (
    <button
      onClick={toggleChatBot}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Toggle Chat
    </button>
  );
};

export default ToggleChatButton;
