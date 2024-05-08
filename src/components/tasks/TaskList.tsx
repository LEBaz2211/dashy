"use client";

import TaskCard from "./TaskCard";
import { Task } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  tasks: Task[];
  taskListId: number;
  taskListTitle: string;
};

const TaskList: React.FC<Props> = ({ tasks, taskListId, taskListTitle }) => {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const addTask = async (title: string) => {
    await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, taskListId }),
    });
    router.refresh(); // Refresh the page to show the new task
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(title);
    setTitle("");
  };

  return (
    <div className="bg-white p-4 shadow-md rounded mb-4">
      <h2 className="text-lg font-bold mb-2">{taskListTitle}</h2>
      <form onSubmit={handleSubmit} className="mb-4">
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
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks available</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
