"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import useOnClickOutside from "@/hooks/useOnClickOutside";

type Props = {
  user: User | null | undefined;
};

export default function UserMenu({ user }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useOnClickOutside(menuRef, closeMenu);

  return (
    <div
      className="mt-8 flex flex-col items-start gap-4 relative"
      ref={menuRef}
    >
      <button
        type="button"
        onClick={toggleMenu}
        className="flex items-center gap-4"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="font-bold">{user?.name || "Username"}</p>
          {/* <p className="text-gray-600">{user?.email}</p> */}
        </div>
      </button>

      {menuOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded-lg p-4 z-10">
          <ul className="space-y-2">
            <li
              className="cursor-pointer text-red-500 hover:underline"
              onClick={() => signOut()}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
