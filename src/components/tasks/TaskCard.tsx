import { Task } from "@prisma/client";

type Props = {
  task: Task;
};

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 flex items-center mb-2">
      <input
        type="checkbox"
        defaultChecked={task.completed}
        className="mr-2"
        readOnly
      />
      <span>{task.title}</span>
    </div>
  );
};

export default TaskCard;
