import React from "react";
import AppLayout from "../components/layout/AppLayout"; 
const Dashboard = () => {
  return (
    <AppLayout
      title="Dashboard"
      subtitle="Overview of your providers and requests"
    >
      <div className="grid gap-6 md:grid-cols-3">
        <section className="md:col-span-2 rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 p-5">
          <h2 className="text-sm font-semibold text-zinc-900">Overview</h2>
          <p className="mt-1 text-xs text-zinc-600">
            Quick snapshot of our provider landscape.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                Active providers
              </p>
              <p className="mt-1 text-2xl font-semibold text-zinc-900">12</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                Pending approvals
              </p>
              <p className="mt-1 text-2xl font-semibold text-amber-600">4</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                Blocked
              </p>
              <p className="mt-1 text-2xl font-semibold text-red-600">1</p>
            </div>
          </div>
        </section>

        <aside className="rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 p-5">
          <p className="text-sm font-semibold text-zinc-900">
            Getting started
          </p>
          <p className="mt-1 text-xs text-zinc-600">
            This is using mock authentication. Later we’ll swap local storage
            for real backend tokens.
          </p>

          <ul className="mt-4 space-y-2 text-xs text-zinc-700">
            <li>• Add a Providers page linked from the sidebar.</li>
            <li>• Add a Settings page for user / app config.</li>
            </ul>
        </aside>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
