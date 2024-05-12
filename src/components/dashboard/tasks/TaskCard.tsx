"use client";

import { useState } from "react";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import TaskOptionsMenu from "./TaskOptionsMenu";

type Props = {
  task: Task;
  onClick?: () => void;
};

export default function TaskCard({ task, onClick }: Props) {
  const [completed, setCompleted] = useState(task.completed);
  const [menuOpen, setMenuOpen] = useState(false);
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
      className={`bg-white shadow-md rounded p-4 mb-2 flex items-center justify-between ${
        completed ? "line-through text-gray-500" : ""
      }`}
    >
      <div className="flex items-center cursor-pointer" onClick={onClick}>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleTaskCompletion}
          className="mr-2"
        />
        <span>{task.title}</span>
      </div>
      <TaskOptionsMenu
        taskId={task.id}
        currentType={task.type}
        isOpen={menuOpen}
        setIsOpen={setMenuOpen}
      />
    </div>
  );
}
