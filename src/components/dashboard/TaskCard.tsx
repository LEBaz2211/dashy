"use client";

import { useState } from "react";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  task: Task;
  onClick?: () => void;
};

export default function TaskCard({ task, onClick }: Props) {
  const [completed, setCompleted] = useState(task.completed);
  const router = useRouter();

  const handleTaskCompletion = async () => {
    const updatedCompleted = !completed;

    await fetch(`/api/task/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: updatedCompleted }),
    });

    setCompleted(updatedCompleted);
    router.refresh();
  };

  return (
    <div
      className={`bg-white shadow-md rounded p-4 mb-2 flex items-center ${completed ? "line-through text-gray-500" : ""}`}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={handleTaskCompletion}
        className="mr-2"
      />
      <span className="cursor-pointer flex-1" onClick={onClick}>
        {task.title}
      </span>
    </div>
  );
}
