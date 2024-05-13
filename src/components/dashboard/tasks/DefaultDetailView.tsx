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
  const [loadingAiTasks, setLoadingAiTasks] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAiTasks = async () => {
      setLoadingAiTasks(true);
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
      } finally {
        setLoadingAiTasks(false);
      }
    };

    fetchAiTasks();
  }, [task.id]);

  return (
    <>
      <div className="flex justify-between mb-4">
        <TaskTitle task={task} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close task view"
          className="text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
      </div>

      <DueDateReminder task={task} />
      <SubtasksSection task={task} />
      <TagsSection
        task={task}
        onGenerateTags={() => setIsLoading(true)}
        isLoading={isLoading}
      />
      <NotesSection task={task} />

      <div className="mt-4">
        <h4 className="font-bold text-lg mb-2">AI Tasks</h4>
        {aiTasks.map((aiTask) => (
          <AITaskItem
            key={aiTask.id}
            aiTask={aiTask}
            userId="clvxvtq980000gq25tm6p2g64"
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <span className="text-sm text-gray-500">
          Created on {new Date(task.createdAt).toLocaleDateString()}
        </span>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label="Delete task"
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
