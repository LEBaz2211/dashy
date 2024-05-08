"use client";

import Link from "next/link";
import { Dashboard } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  dashboards: Dashboard[];
};

const DashboardNavigation: React.FC<Props> = ({ dashboards }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAddDashboard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }), // UserId will be taken from the authenticated user session
      });

      if (response.ok) {
        const newDashboard = await response.json();
        router.push(`/dashboard/${newDashboard.id}`);
        router.refresh();
        setError("");
      } else {
        const errorData = await response.json();
        console.error("Failed to create dashboard:", errorData);
        setError(errorData.error || "Unknown error occurred");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error occurred");
    }

    setTitle("");
  };

  return (
    <nav className="bg-gray-100 shadow-md p-4 rounded mb-4">
      <ul className="space-y-2">
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
      <form onSubmit={handleAddDashboard} className="mt-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mr-2 p-1 border rounded"
          placeholder="New Dashboard"
        />
        <button
          type="submit"
          className="px-4 py-1 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </nav>
  );
};

export default DashboardNavigation;
