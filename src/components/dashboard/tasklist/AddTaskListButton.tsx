"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  dashboardId: number;
};

export default function AddTaskListButton({ dashboardId }: Props) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTaskList = async () => {
    setIsAdding(true);

    const response = await fetch("/api/task-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Untitled Task List", dashboardId }),
    });

    if (response.ok) {
      const newTaskList = await response.json();
      router.refresh();
    }

    setIsAdding(false);
  };

  return (
    <button
      type="button"
      onClick={handleAddTaskList}
      disabled={isAdding}
      className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
    >
      + Add New Task List
    </button>
  );
}
