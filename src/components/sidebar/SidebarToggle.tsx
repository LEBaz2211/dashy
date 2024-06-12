"use client";

import { useState } from "react";
import SidebarNavigation from "./SidebarNavigation";

export default function SidebarToggle() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex h-screen">
      <SidebarNavigation isVisible={isSidebarVisible} />
      <main
        className={`flex-1 p-8 overflow-y-auto transition-all duration-300 ${isSidebarVisible ? "ml-64" : "ml-0"}`}
      >
        <button
          onClick={toggleSidebar}
          className="p-2 bg-blue-500 text-white rounded fixed top-4 left-4 z-50"
        >
          {isSidebarVisible ? "Hide" : "Show"} Sidebar
        </button>
        <p className="italic">Click on a dashboard</p>
      </main>
    </div>
  );
}
