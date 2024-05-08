import prisma from "@/lib/prisma";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import AddDashboardForm from "@/components/dashboard/AddDashboardForm";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboards</h1>
      {dashboards.length === 0 ? (
        <p className="text-gray-600 mb-4">
          No dashboards available. Please add one!
        </p>
      ) : (
        <DashboardNavigation dashboards={dashboards} />
      )}
      <AddDashboardForm />
    </div>
  );
}
