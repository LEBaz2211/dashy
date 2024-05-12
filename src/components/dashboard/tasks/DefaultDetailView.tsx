"use client";

import { Task, Subtask, Tag } from "@prisma/client";
import { AITask } from "@prisma/ai_client";
import TaskTitle from "./TaskTitle";
import DueDateReminder from "./DueDateReminder";
import TagsSection from "./TagsSection";
import SubtasksSection from "./SubtasksSection";
import NotesSection from "./NotesSection";
import AITaskItem from "./AITaskItem";
import ConfirmationModal from "../ConfirmationModal";
import { useEffect, useState } from "react";

type Props = {
  task: Task & { tags: Tag[]; subtasks: Subtask[] };
  onClose: () => void;
  refreshTaskData: () => void;
};

export default function DefaultDetailView({
  task,
  onClose,
  refreshTaskData,
}: Props) {
  const [aiTasks, setAiTasks] = useState<AITask[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingAiTasks, setLoadingAiTasks] = useState(false);

  useEffect(() => {
    const fetchAiTasks = async () => {
      try {
        const response = await fetch(`/api/ai_tasks/${task.id}`);
        if (response.ok) {
          const data = await response.json();
          setAiTasks(data);
        } else {
          console.error("Failed to fetch AI tasks");
        }
      } catch (err) {
        console.error("Error fetching AI tasks:", err);
      }
    };

    fetchAiTasks();
  }, [task.id]);

  const handleGenerateTags = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/auto_tag/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tasks: [task.id],
          user_id: "clvxvtq980000gq25tm6p2g64",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to auto-tag task");
      }

      refreshTaskData();
      setSuccessMessage("Tags generated successfully!");
    } catch (err) {
      console.error("Failed to generate tags:", err);
      setSuccessMessage("Failed to generate tags");
    } finally {
      setIsLoading(false);
    }
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
      <SubtasksSection task={task} />
      <TagsSection task={task} />
      <NotesSection task={task} />

      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={handleGenerateTags}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? "Generating..." : "Generate Tags"}
        </button>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
      <div className="mt-4">
        <h4 className="font-bold text-lg mb-2">AI Tasks</h4>
        {loadingAiTasks ? (
          <p>Loading AI tasks...</p>
        ) : (
          aiTasks.map((aiTask) => (
            <AITaskItem
              key={aiTask.id}
              aiTask={aiTask}
              userId="clvxvtq980000gq25tm6p2g64"
            />
          ))
        )}
      </div>

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
          onConfirm={() => {}}
          onCancel={() => setIsModalOpen(false)}
          message="Are you sure you want to delete this task?"
        />
      </div>
    </>
  );
}
