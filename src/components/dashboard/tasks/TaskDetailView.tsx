"use client";

import { useState, useEffect } from "react";
import { Task, Subtask, Tag } from "@prisma/client";
import DefaultDetailView from "./DefaultDetailView";
import EmailDetailView from "./EmailDetailView";
import CourseDetailView from "./CourseDetailView";
import { useRouter } from "next/navigation";

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

  let DetailViewComponent;
  switch (task.type) {
    case "EMAIL":
      DetailViewComponent = EmailDetailView;
      break;
    case "COURSE":
      DetailViewComponent = CourseDetailView;
      break;
    default:
      DetailViewComponent = DefaultDetailView;
      break;
  }

  return (
    <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-lg p-6 z-50 overflow-y-auto">
      <DetailViewComponent
        task={task}
        onClose={onClose}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
