"use client";

import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  task: Task;
};

export default function TaskTitle({ task }: Props) {
  const [title, setTitle] = useState(task.title);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleTitleChange = async () => {
    await fetch(`/api/task/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setIsEditing(false);
    router.refresh();
  };

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTitleChange();
          }}
          className="text-2xl font-bold mb-4 border-b-2 border-blue-500 outline-none p-1"
          autoFocus
        />
      ) : (
        <h1
          className="text-2xl font-bold mb-4 cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h1>
      )}
    </>
  );
}
