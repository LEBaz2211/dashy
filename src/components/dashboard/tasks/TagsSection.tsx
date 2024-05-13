"use client";

import { Task, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  task: Task & { tags: Tag[] };
  onGenerateTags: () => void;
  isLoading: boolean;
};

export default function TagsSection({
  task,
  onGenerateTags,
  isLoading,
}: Props) {
  const [tags, setTags] = useState<Tag[]>(task.tags || []);
  const [newTag, setNewTag] = useState("");
  const [addingTag, setAddingTag] = useState(false);
  const router = useRouter();

  const handleGenerateTags = async () => {
    await onGenerateTags();
    // Call the tagging API and refresh task data
    try {
      const response = await fetch("http://localhost:8000/auto_tag/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks: [task.id],
          user_id: "clvxvtq980000gq25tm6p2g64",
        }),
      });
      if (response.ok) {
        router.refresh();
      } else {
        throw new Error("Failed to auto-tag task");
      }
    } catch (error) {
      console.error("Auto-tagging failed:", error);
    } finally {
      onGenerateTags(); // Reset loading state
    }

    router.refresh();
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;

    const response = await fetch(`/api/task/${task.id}/tags`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tagName: newTag }),
    });

    if (response.ok) {
      const addedTag = await response.json();
      setTags([...tags, addedTag]);
      setNewTag("");
      setAddingTag(false);
    }

    router.refresh();
  };

  const handleRemoveTag = async (tagName: string) => {
    await fetch(`/api/task/${task.id}/tags`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tagName }),
    });

    setTags(tags.filter((tag) => tag.name !== tagName));
    router.refresh();
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <label className="block font-semibold mb-1">Tags</label>
        <button
          onClick={handleGenerateTags}
          disabled={isLoading}
          className="p-1 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200"
          title="Generate tags for this task"
          aria-label="Generate tags"
        >
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : (
            <span className="text-gray-500 hover:text-gray-700">&#10022;</span>
          )}
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <div
              key={tag.id}
              className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center"
            >
              {tag.name}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag.name)}
                className="ml-2 text-xs"
                aria-label={`Remove tag ${tag.name}`}
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No tags available</p>
        )}
      </div>
      {addingTag ? (
        <div className="mt-2 flex">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="p-2 border rounded flex-1"
            placeholder="New tag"
            aria-label="New tag name"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            aria-label="Add tag"
          >
            Add
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAddingTag(true)}
          className="mt-2 text-blue-500 hover:text-blue-700"
          aria-label="Show add tag input"
        >
          + Add tag
        </button>
      )}
    </div>
  );
}
