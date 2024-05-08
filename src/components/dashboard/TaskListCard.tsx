import TaskCard from "./TaskCard";
import AddTaskInline from "./AddTaskInline";
import EditableTaskListTitle from "./EditableTaskListTitle";
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
      <EditableTaskListTitle taskList={taskList} />
      <AddTaskInline taskListId={taskList.id} />
      {taskList.tasks.length === 0 ? (
        <p className="text-gray-600">No tasks available</p>
      ) : (
        taskList.tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
}
