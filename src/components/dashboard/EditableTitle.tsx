"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dashboard } from "@prisma/client";

type Props = {
  dashboard: Dashboard;
};

export default function EditableTitle({ dashboard }: Props) {
  const [title, setTitle] = useState(dashboard.title);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleTitleChange = async () => {
    await fetch(`/api/dashboard/${dashboard.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setIsEditing(false);
    router.refresh();
  };

  return (
    <div className="mb-0">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTitleChange();
          }}
          className="text-3xl font-bold mb-2 border-b-2 border-blue-500 outline-none"
          autoFocus
        />
      ) : (
        <h1
          className="text-3xl font-bold mb-4 cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h1>
      )}
    </div>
  );
}
