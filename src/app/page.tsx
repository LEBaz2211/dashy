import Link from "next/link";

export default function HomePage() {
  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Task App</h1>
      <p className="mb-4">Manage your tasks efficiently and collaboratively.</p>
      <Link
        href="/dashboard"
        className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Dashboard
      </Link>
    </section>
  );
}
