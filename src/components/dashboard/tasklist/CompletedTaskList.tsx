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
        <span className={`mr-2 transform ${isCollapsed ? "" : "rotate-90"}`}>
          &#x25B6;
        </span>
        <h3 className="text-lg font-bold">Completed</h3>
      </div>
      {!isCollapsed &&
        tasks.map((task) => <TaskCard key={task.id} task={task} />)}
    </div>
  );
}
