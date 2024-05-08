import TaskCard from "./TaskCard";
import AddTaskInline from "./AddTaskInline";
import EditableTaskListTitle from "./EditableTaskListTitle";
import TaskListOptionsMenu from "./TaskListOptionsMenu";
import { Task, TaskList } from "@prisma/client";

type TaskListWithTasks = TaskList & {
  tasks: Task[];
};

type Props = {
  taskList: TaskListWithTasks;
};

export default function TaskListCard({ taskList }: Props) {
  return (
    <div className="bg-white p-4 shadow-md rounded mb-4">
      <div className="flex items-center justify-between mb-2">
        <EditableTaskListTitle taskList={taskList} />
        <TaskListOptionsMenu taskListId={taskList.id} />
      </div>
      {taskList.tasks.length === 0 ? (
        <p className="text-gray-600">No tasks available</p>
      ) : (
        taskList.tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
      <AddTaskInline taskListId={taskList.id} />
    </div>
  );
}
