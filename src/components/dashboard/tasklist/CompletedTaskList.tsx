"use client";

import { useState } from "react";
import { Task } from "@prisma/client";
import TaskCard from "../tasks/TaskCard";

type Props = {
  tasks: Task[];
};

export default function CompletedTaskList({ tasks }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="mt-4">
      <div
        className="cursor-pointer flex items-center mb-2"
        onClick={toggleCollapse}
      >
        <h3 className="text-lg font-bold">Completed</h3>
        <span className="text-gray-500 ml-2">{isCollapsed ? "▲" : "▼"}</span>
      </div>
      {!isCollapsed &&
        tasks.map((task) => <TaskCard key={task.id} task={task} />)}
    </div>
  );
}
