"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dashboard } from "@prisma/client";
import { useState } from "react";

type Props = {
  dashboards: Dashboard[];
};

export default function DashboardList({ dashboards }: Props) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddDashboard = async () => {
    setIsAdding(true);

    const response = await fetch("/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Untitled Dashboard" }),
    });

    if (response.ok) {
      const newDashboard = await response.json();
      router.push(`/dashboard/${newDashboard.id}`);
    }

    setIsAdding(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleAddDashboard}
        disabled={isAdding}
        className="px-4 py-2 bg-blue-500 text-white rounded my-4"
      >
        + New Dashboard
      </button>
      <ul className="space-y-2 mb-4">
        {dashboards.map((dashboard) => (
          <li key={dashboard.id}>
            <Link
              href={`/dashboard/${dashboard.id}`}
              className="text-blue-500 hover:underline"
            >
              {dashboard.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
