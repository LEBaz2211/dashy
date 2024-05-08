"use client";

import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  task: Task;
};

export default function NotesSection({ task }: Props) {
  const [notes, setNotes] = useState(task.notes || "");
  const router = useRouter();

  const handleNotesChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotes(value);

    await fetch(`/api/task/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: value }),
    });

    router.refresh();
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Notes</label>
      <textarea
        value={notes}
        onChange={handleNotesChange}
        className="p-2 border rounded w-full h-32"
        placeholder="Add notes..."
      />
    </div>
  );
}
