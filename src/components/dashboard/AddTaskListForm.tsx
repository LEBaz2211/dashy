"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  dashboardId: number;
};

export default function AddTaskListForm({ dashboardId }: Props) {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleAddTaskList = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/task-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, dashboardId }),
    });
    setTitle("");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleAddTaskList}
      className="bg-gray-100 p-4 shadow-md rounded mt-4"
    >
      <h3 className="text-lg font-bold mb-2">Add New Task List</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mr-2 p-1 border rounded"
        placeholder="New Task List"
      />
      <button
        type="submit"
        className="px-4 py-1 bg-blue-500 text-white rounded"
      >
        Add
      </button>
    </form>
  );
}
