import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white">
      <header className="mb-16">
        <h1 className="text-5xl font-bold mb-2">Welcome to Dashy</h1>
        <p className="text-lg">
          A modern way to manage your tasks and projects
        </p>
      </header>

      <main className="flex gap-8">
        <Link href="/register">
          <button
            type="button"
            className="px-6 py-3 bg-white text-blue-500 font-bold rounded-full shadow-lg hover:shadow-2xl hover:bg-blue-100 transition-all"
          >
            Register
          </button>
        </Link>
        <Link href="/login">
          <button
            type="button"
            className="px-6 py-3 bg-white text-blue-500 font-bold rounded-full shadow-lg hover:shadow-2xl hover:bg-blue-100 transition-all"
          >
            Login
          </button>
        </Link>
      </main>

      <footer className="mt-16 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Dashy. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
