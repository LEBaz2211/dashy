"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container flex justify-between py-4">
        <Link href="/" className="text-2xl font-bold">
          Dashy
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          {session ? (
            <>
              <li>
                <button onClick={() => signOut()} className="text-red-500">
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Log In</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
