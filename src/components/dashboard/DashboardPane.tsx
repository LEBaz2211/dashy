import prisma from "@/lib/prisma";
import { Dashboard } from "@prisma/client";
import TaskListCard from "./TaskListCard";
import AddTaskListButton from "./AddTaskListButton";
import EditableTitle from "./EditableTitle";
import DashboardOptionsMenu from "./DashboardOptionsMenu";

type Props = {
  dashboardId: string;
};

const fetchDashboardData = async (dashboardId: number) => {
  return await prisma.dashboard.findUnique({
    where: { id: dashboardId },
    include: {
      taskLists: {
        include: {
          tasks: true,
        },
      },
    },
  });
};

export default async function DashboardPane({ dashboardId }: Props) {
  const dashboardIdNumber = parseInt(dashboardId, 10);
  const dashboard = await fetchDashboardData(dashboardIdNumber);

  if (!dashboard) return <div>Dashboard not found</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <EditableTitle dashboard={dashboard} />
        <DashboardOptionsMenu dashboardId={dashboardIdNumber} />
      </div>
      {dashboard.taskLists.length === 0 ? (
        <p className="text-gray-600 mb-4">No task lists available</p>
      ) : (
        dashboard.taskLists.map((taskList) => (
          <TaskListCard key={taskList.id} taskList={taskList} />
        ))
      )}
      <AddTaskListButton dashboardId={dashboardIdNumber} />
    </div>
  );
}
