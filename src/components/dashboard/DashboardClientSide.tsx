"use client";

import { useState } from "react";
import { Dashboard } from "@prisma/client";
import TaskListCard from "./tasklist/TaskListCard";
import AddTaskListButton from "./tasklist/AddTaskListButton";
import EditableTitle from "./EditableTitle";
import DashboardOptionsMenu from "./DashboardOptionsMenu";
import ChatBot from "./chat/ChatBot";
import ToggleChatButton from "./chat/ToggleChatButton";

type Props = {
  dashboard: Dashboard & {
    taskLists: {
      tasks: Task[];
    }[];
  };
};

export default function DashboardClientSide({ dashboard }: Props) {
  const [taskLists, setTaskLists] = useState(dashboard.taskLists);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <EditableTitle dashboard={dashboard} />
        <ToggleChatButton />
        <DashboardOptionsMenu dashboardId={dashboard.id} />
      </div>
      {taskLists.length === 0 ? (
        <p className="text-gray-600 mb-4">No task lists available</p>
      ) : (
        taskLists.map((taskList) => (
          <TaskListCard key={taskList.id} taskList={taskList} />
        ))
      )}
      <AddTaskListButton dashboardId={dashboard.id} />
      <div id="chatBotContainer" style={{ display: "none" }}>
        <ChatBot userId={dashboard.userId} isVisible={true} />
      </div>
    </div>
  );
}
