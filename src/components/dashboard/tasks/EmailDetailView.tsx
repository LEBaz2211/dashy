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

export default function EmailDetailView({ task, onClose }: Props) {
  const [recipient, setRecipient] = useState(task.recipient || "");
  const [emailBody, setEmailBody] = useState(task.emailBody || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDeleteTask = async () => {
    await fetch(`/api/task/${task.id}`, {
      method: "DELETE",
    });

    onClose();
    router.refresh();
  };

  const handleRecipientChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setRecipient(value);

    await fetch(`/api/task/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient: value }),
    });

    router.refresh();
  };

  const handleEmailBodyChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setEmailBody(value);

    await fetch(`/api/task/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailBody: value }),
    });

    router.refresh();
  };

  return (
    <>
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

      <div className="mb-4">
        <label className="block font-semibold mb-1">Recipient</label>
        <input
          type="text"
          value={recipient}
          onChange={handleRecipientChange}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Email Body</label>
        <textarea
          value={emailBody}
          onChange={handleEmailBodyChange}
          className="p-2 border rounded w-full h-32"
          placeholder="Draft your email response..."
        />
      </div>

      <SubtasksSection task={task} />

      <TagsSection task={task} />

      <NotesSection task={task} />

      <div className="flex justify-between items-center mt-8">
        <span className="text-sm text-gray-500">
          Created on {new Date(task.createdAt).toLocaleDateString()}
        </span>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
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
    </>
  );
}
