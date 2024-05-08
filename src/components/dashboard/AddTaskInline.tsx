"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  taskListId: number;
};

export default function AddTaskInline({ taskListId }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleAddTask = async () => {
    if (title.trim() === "") return;

    await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, taskListId }),
    });

    setTitle("");
    setIsEditing(false);
    router.refresh();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setTitle("");
    }
  };

  return (
    <div
      className={`bg-white shadow-md rounded p-4 flex items-center mb-2 cursor-pointer ${
        isEditing ? "outline outline-blue-500" : ""
      }`}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (!title.trim()) setIsEditing(false);
          }}
          className="w-full border-b border-blue-500 outline-none p-1"
          placeholder="Add new task"
          autoFocus
        />
      ) : (
        <span className="text-gray-500 italic">+ Add New Task</span>
      )}
    </div>
  );
}
