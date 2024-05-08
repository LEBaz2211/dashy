"use client";

import { useState } from "react";
import TaskCard from "../tasks/TaskCard";
import AddTaskInline from "../tasks/AddTaskInline";
import EditableTaskListTitle from "./EditableTaskListTitle";
import TaskListOptionsMenu from "./TaskListOptionsMenu";
import CompletedTaskList from "./CompletedTaskList";
import TaskDetailView from "../tasks/TaskDetailView";
import { Task, TaskList } from "@prisma/client";

type TaskListWithTasks = TaskList & {
  tasks: Task[];
};

type Props = {
  taskList: TaskListWithTasks;
};

export default function TaskListCard({ taskList }: Props) {
  const activeTasks = taskList.tasks.filter((task) => !task.completed);
  const completedTasks = taskList.tasks.filter((task) => task.completed);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <div className="relative bg-white p-4 shadow-md rounded mb-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <EditableTaskListTitle taskList={taskList} />
        <TaskListOptionsMenu taskListId={taskList.id} />
      </div>
      {activeTasks.length === 0 ? (
        <p className="text-gray-600">No active tasks available</p>
      ) : (
        activeTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => setSelectedTask(task)}
          />
        ))
      )}
      <AddTaskInline taskListId={taskList.id} />
      {completedTasks.length > 0 && (
        <CompletedTaskList tasks={completedTasks} />
      )}
      {selectedTask && (
        <TaskDetailView
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}
