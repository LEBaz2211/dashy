"use client";

import { useState, useRef, useEffect } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { useRouter } from "next/navigation";

type Props = {
  dashboardId: number;
};

export default function DashboardOptionsMenu({ dashboardId }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleDeleteDashboard = async () => {
    await fetch(`/api/dashboard/${dashboardId}`, {
      method: "DELETE",
    });

    setIsModalOpen(false);
    router.push("/dashboard");
    router.refresh();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex flex-row items-center justify-center gap-1 p-2"
      >
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
          <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
          <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
        </div>
      </button>

      {isMenuOpen && (
        <ul className="absolute right-0 bg-white border rounded shadow-lg z-10">
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              setIsMenuOpen(false);
              setIsModalOpen(true);
            }}
          >
            Delete
          </li>
        </ul>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleDeleteDashboard}
        onCancel={() => setIsModalOpen(false)}
        message="Are you sure you want to delete this dashboard?"
      />
    </div>
  );
}
