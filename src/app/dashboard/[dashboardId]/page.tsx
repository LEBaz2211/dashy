import SidebarNavigation from "@/components/sidebar/SidebarNavigation";
import DashboardPane from "@/components/dashboard/DashboardPane";

export default async function DashboardPage({
  params,
}: {
  params: { dashboardId: string };
}) {
  return (
    <div className="flex h-screen">
      <SidebarNavigation />
      <main className="flex-1 p-8 overflow-y-auto">
        <DashboardPane dashboardId={params.dashboardId} />
      </main>
    </div>
  );
}
