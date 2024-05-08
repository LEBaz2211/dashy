import TaskCard from "./TaskCard";
import AddTaskInline from "./AddTaskInline";
import EditableTaskListTitle from "./EditableTaskListTitle";
import TaskListOptionsMenu from "./TaskListOptionsMenu";
import CompletedTaskList from "./CompletedTaskList";
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

  return (
    <div className="bg-white p-4 shadow-md rounded mb-4">
      <div className="flex items-center justify-between mb-2">
        <EditableTaskListTitle taskList={taskList} />
        <TaskListOptionsMenu taskListId={taskList.id} />
      </div>
      {activeTasks.length === 0 ? (
        <p className="text-gray-600">No active tasks available</p>
      ) : (
        activeTasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
      <AddTaskInline taskListId={taskList.id} />
      {completedTasks.length > 0 && (
        <CompletedTaskList tasks={completedTasks} />
      )}
    </div>
  );
}
