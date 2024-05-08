"use client";

import { Task } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  task: Task;
};

export default function DueDateReminder({ task }: Props) {
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.toString().slice(0, 10) : "");
  const [reminder, setReminder] = useState(task.reminder ? task.reminder.toString().slice(0, 16) : "");
  const router = useRouter();

  const handleDueDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDueDate(value);

    await fetch(`/api/task/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dueDate: value ? new Date(value) : null }),
    });

    router.refresh();
  };

  const handleReminderChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReminder(value);

    await fetch(`/api/task/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reminder: value ? new Date(value) : null }),
    });

    router.refresh();
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Add due date</label>
      <input
        type="date"
        value={dueDate}
        onChange={handleDueDateChange}
        className="p-2 border rounded w-full mb-4"
      />
      <label className="block font-semibold mb-1">Remind me at</label>
      <input
        type="datetime-local"
        value={reminder}
        onChange={handleReminderChange}
        className="p-2 border rounded w-full"
      />
    </div>
  );
}
