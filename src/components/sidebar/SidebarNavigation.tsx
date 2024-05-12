import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import DashboardList from "./DashboardList";
import ConversationList from "./ConversationList";
import UserMenu from "./UserMenu";

export default async function SidebarNavigation() {
  const session = await getServerSession(authOptions);

  // Fetch all dashboards for the logged-in user
  const dashboards = session?.user?.email
    ? await prisma.dashboard.findMany({
        where: { user: { email: session.user.email } },
      })
    : [];

  return (
    <nav className="bg-gray-100 shadow-md p-4 w-64 h-screen sticky top-0 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashy</h1>
        <DashboardList dashboards={dashboards} />
        {/* <ConversationList /> */}
      </div>
      <UserMenu user={session?.user} />
    </nav>
  );
}
