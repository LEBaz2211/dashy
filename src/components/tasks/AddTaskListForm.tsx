"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  dashboardId: number;
};

const AddTaskListForm: React.FC<Props> = ({ dashboardId }) => {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const addTaskList = async (title: string) => {
    await fetch("/api/task-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, dashboardId }),
    });
    router.refresh();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTaskList(title);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 p-4 rounded-lg mb-4 shadow-md"
    >
      <h2 className="text-lg font-bold mb-2">Add New Task List</h2>
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
};

export default AddTaskListForm;
