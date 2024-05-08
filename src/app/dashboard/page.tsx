import prisma from "@/lib/prisma";
import SidebarNavigation from "@/components/sidebar/SidebarNavigation";

const fetchDashboards = async () => {
  return await prisma.dashboard.findMany({
    include: {
      taskLists: true,
    },
  });
};

export default async function DashboardPage() {
  const dashboards = await fetchDashboards();

  return (
    <div className="flex h-screen">
      <SidebarNavigation />
      <main className="flex-1 p-8 overflow-y-auto">
        <p className="italic">Click on a dashboard</p>
      </main>
    </div>
  );
}
