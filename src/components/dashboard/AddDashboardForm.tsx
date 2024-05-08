"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddDashboardForm = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleAddDashboard = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      router.refresh();
    } else {
      console.error("Failed to create dashboard:", await response.json());
    }

    setTitle("");
  };

  return (
    <form
      onSubmit={handleAddDashboard}
      className="bg-gray-200 p-4 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-bold mb-2">Add New Dashboard</h2>
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
  );
};

export default AddDashboardForm;
