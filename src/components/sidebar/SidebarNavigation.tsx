import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import SidebarClientSide from "./SidebarClientSide";

export default async function SidebarNavigation() {
  const session = await getServerSession(authOptions);

  // Fetch all dashboards for the logged-in user
  const dashboards = session?.user?.email
    ? await prisma.dashboard.findMany({
        where: { user: { email: session.user.email } },
      })
    : [];

  return <SidebarClientSide dashboards={dashboards} user={session?.user} />;
}
