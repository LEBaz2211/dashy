"use client";

import { useState } from "react";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
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
      className={`bg-white shadow-md rounded p-4 flex items-center mb-2 cursor-pointer ${
        completed ? "line-through text-gray-500" : ""
      }`}
      onClick={handleTaskCompletion}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {}}
        className="mr-2"
      />
      <span>{task.title}</span>
    </div>
  );
}
