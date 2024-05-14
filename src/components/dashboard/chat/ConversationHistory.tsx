import React, { useEffect, useState } from "react";

type Conversation = {
  id: string;
  createdAt: string;
};

type Props = {
  userId: string;
  onClose: () => void;
  onSelectConversation: (conversationId: string) => void;
};

export function ConversationHistory({
  userId,
  onClose,
  onSelectConversation,
}: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`/api/conversations/${userId}`);
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error("Failed to fetch conversations", error);
      }
    };

    fetchConversations();
  }, [userId]);

  return (
    <div className="history-container">
      <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4">Conversation History</h2>
      <ul className="conversation-list">
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <button
              onClick={() => onSelectConversation(conversation.id)}
              className="text-blue-500 hover:text-blue-700"
            >
              Conversation ID: {conversation.id} (Created at:{" "}
              {new Date(conversation.createdAt).toLocaleString()})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
