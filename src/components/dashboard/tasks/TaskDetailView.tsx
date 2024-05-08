"use client";

import { Task, Subtask, Tag } from "@prisma/client";
import TaskTitle from "./TaskTitle";
import DueDateReminder from "./DueDateReminder";
import TagsSection from "./TagsSection";
import SubtasksSection from "./SubtasksSection";
import NotesSection from "./NotesSection";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";

type Props = {
  task: Task & { tags: Tag[]; subtasks: Subtask[] };
  onClose: () => void;
};

export default function TaskDetailView({ task, onClose }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteTask = async () => {
    await fetch(`/api/task/${task.id}`, {
      method: "DELETE",
    });

    onClose();
    router.refresh();
  };

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
          onClick={() => {
            setIsModalOpen(true);
          }}
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
