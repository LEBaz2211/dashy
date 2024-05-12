"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  taskId: number;
  currentType: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const TASK_TYPES = ["DEFAULT", "EMAIL", "COURSE"];

export default function TaskOptionsMenu({
  taskId,
  currentType,
  isOpen,
  setIsOpen,
}: Props) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleChangeType = async (type: string) => {
    await fetch(`/api/task/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });

    setIsOpen(false);
    router.refresh();
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        className="text-gray-600 hover:text-gray-800"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        &#x22EE;
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 py-2 w-40 bg-white rounded shadow-lg z-10">
          {TASK_TYPES.map((type) => (
            <li
              key={type}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${
                type === currentType ? "font-bold" : ""
              }`}
              onClick={() => handleChangeType(type)}
            >
              {type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
