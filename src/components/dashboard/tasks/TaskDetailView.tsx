"use client";

import { useState, useEffect } from "react";
import { Task, Subtask, Tag } from "@prisma/client";
import TaskTitle from "./TaskTitle";
import DueDateReminder from "./DueDateReminder";
import TagsSection from "./TagsSection";
import SubtasksSection from "./SubtasksSection";
import NotesSection from "./NotesSection";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../ConfirmationModal";

type Props = {
  taskId: number;
  initialTask?: Task & { tags: Tag[]; subtasks: Subtask[] };
  onClose: () => void;
};

export default function TaskDetailView({
  taskId,
  initialTask,
  onClose,
}: Props) {
  const [task, setTask] = useState<
    (Task & { tags: Tag[]; subtasks: Subtask[] }) | null
  >(initialTask || null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!initialTask) {
      const fetchTask = async () => {
        const response = await fetch(`/api/task/${taskId}`);
        if (response.ok) {
          const data = await response.json();
          setTask(data);
        }
      };

      fetchTask();
    }
  }, [taskId, initialTask]);

  const handleDeleteTask = async () => {
    await fetch(`/api/task/${taskId}`, {
      method: "DELETE",
    });

    onClose();
    router.refresh();
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-lg p-6 z-50 overflow-y-auto">
      <div className="flex justify-between mb-4">
        <TaskTitle task={task} />
        <button
          type="button"
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
      </div>

      <DueDateReminder task={task} />

      <SubtasksSection task={task} />

      <TagsSection task={task} />

      <NotesSection task={task} />

      <div className="flex justify-between items-center mt-8">
        <span className="text-sm text-gray-500">
          Created on {new Date(task.createdAt).toLocaleDateString()}
        </span>
        <button
          type="button"
          onClick={handleDeleteTask}
          className="text-red-500 hover:text-red-700"
        >
          &#x1F5D1;
        </button>
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={handleDeleteTask}
          onCancel={() => setIsModalOpen(false)}
          message="Are you sure you want to delete this task?"
        />
      </div>
    </div>
  );
}
