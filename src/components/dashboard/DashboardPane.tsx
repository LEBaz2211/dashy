import prisma from "@/lib/prisma";
import DashboardClientSide from "./DashboardClientSide";

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
      <DashboardClientSide dashboard={dashboard} />
    </div>
  );
}
