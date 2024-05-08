"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  taskListId: number;
};

export default function AddTaskForm({ taskListId }: Props) {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, taskListId }),
    });
    setTitle("");
    router.refresh();
  };

  return (
    <form onSubmit={handleAddTask} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mr-2 p-1 border rounded"
        placeholder="Add new task"
      />
      <button
        type="submit"
        className="px-4 py-1 bg-blue-500 text-white rounded"
      >
        Add Task
      </button>
    </form>
  );
}
