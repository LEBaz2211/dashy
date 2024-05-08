"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskList } from "@prisma/client";

type Props = {
  taskList: TaskList;
};

export default function EditableTaskListTitle({ taskList }: Props) {
  const [title, setTitle] = useState(taskList.title);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleTitleChange = async () => {
    await fetch(`/api/task-list/${taskList.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setIsEditing(false);
    router.refresh();
  };

  return (
    <div className="mb-2">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTitleChange();
            if (e.key === "Escape") setIsEditing(false);
          }}
          className="text-lg font-bold mb-2 border-b-2 border-blue-500 outline-none p-1"
          autoFocus
        />
      ) : (
        <h2
          className="text-lg font-bold cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h2>
      )}
    </div>
  );
}
