"use client";

import { useState } from "react";
import { Dashboard } from "@prisma/client";
import DashboardList from "./DashboardList";
import UserMenu from "./UserMenu";
import Image from "next/image";

type Props = {
  dashboards: Dashboard[];
  user: any;
};

export default function SidebarClientSide({ dashboards, user }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 z-50 p-2 focus:outline-none hover:bg-gray-300 rounded"
        title={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        )}
      </button>
      <nav
        className={`bg-gray-100 shadow-md p-4 h-screen sticky top-0 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "w-60" : "w-20 overflow-hidden"
        }`}
      >
        {isOpen && (
          <div>
            <DashboardList dashboards={dashboards} />
          </div>
        )}
        {isOpen && <UserMenu user={user} />}
      </nav>
    </>
  );
}
