import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();          // ✅ await here
  const session = cookieStore.get("pm_session")?.value;

  if (!session) redirect("/login");

  return (
    <main className="min-h-screen bg-zinc-50 p-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
        <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-600">
          You are logged in (mock session cookie detected).
        </p>
      </div>
    </main>
  );
}
