"use client";

import { Task, Subtask } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  task: Task & { subtasks: Subtask[] };
};

export default function SubtasksSection({ task }: Props) {
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks || []);
  const [newSubtask, setNewSubtask] = useState("");
  const [addingSubtask, setAddingSubtask] = useState(false);
  const router = useRouter();

  const handleAddSubtask = async () => {
    if (!newSubtask.trim()) return;

    const response = await fetch(`/api/task/${task.id}/subtasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newSubtask }),
    });

    if (response.ok) {
      const addedSubtask = await response.json();
      setSubtasks([...subtasks, addedSubtask]);
      setNewSubtask("");
      setAddingSubtask(false);
    }

    router.refresh();
  };

  const handleToggleSubtaskCompletion = async (subtask: Subtask) => {
    const updatedCompletion = !subtask.completed;

    await fetch(`/api/task/${task.id}/subtasks/${subtask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: updatedCompletion }),
    });

    setSubtasks(
      subtasks.map((s) => (s.id === subtask.id ? { ...s, completed: updatedCompletion } : s))
    );

    router.refresh();
  };

  const handleDeleteSubtask = async (subtaskId: number) => {
    await fetch(`/api/task/${task.id}/subtasks/${subtaskId}`, {
      method: "DELETE",
    });

    setSubtasks(subtasks.filter((s) => s.id !== subtaskId));
    router.refresh();
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Steps</label>
      <div>
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className={`flex items-center justify-between py-1 border-b last:border-b-0 ${
              subtask.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => handleToggleSubtaskCompletion(subtask)}
                className="mr-2"
              />
              {subtask.title}
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleDeleteSubtask(subtask.id)}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>
      {addingSubtask ? (
        <div className="mt-2 flex">
          <input
            type="text"
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            className="p-2 border rounded flex-1"
            placeholder="New step"
          />
          <button
            type="button"
            onClick={handleAddSubtask}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add step
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAddingSubtask(true)}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          + Add step
        </button>
      )}
    </div>
  );
}
