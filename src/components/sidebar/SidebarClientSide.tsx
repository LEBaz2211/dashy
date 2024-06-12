"use client";

import { useState } from "react";
import { Dashboard } from "@prisma/client";
import DashboardList from "./DashboardList";
import UserMenu from "./UserMenu";

type Props = {
  dashboards: Dashboard[];
  user: any; // Adjust this type according to your user type definition
};

export default function SidebarClientSide({ dashboards, user }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 z-50 p-1.5 focus:outline-none hover:bg-gray-300 rounded"
        title={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
            className="h-5 w-5"
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
      {isOpen && (
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 z-50 p-1.5 focus:outline-none hover:bg-gray-300 rounded"
          title="Add Dashboard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      )}
      <nav
        className={`bg-gray-100 shadow-md p-4 h-screen sticky top-0 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        {isOpen && (
          <div className="relative">
            <DashboardList dashboards={dashboards} />
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded shadow-lg z-10">
                <form className="p-4">
                  <input
                    type="text"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Dashboard Title"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
        {isOpen && <UserMenu user={user} />}
      </nav>
    </>
  );
}
