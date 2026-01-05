import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { logoutUser } from "../../lib/auth";

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Providers",
    to: "/providers",
    icon: Users,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
];

const AppLayout = ({ title = "Dashboard", subtitle, children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-zinc-200 shadow-sm
          transition-transform duration-200
          md:static md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-white text-sm font-semibold">
              PM
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Provider Management
              </p>
              <p className="text-xs text-zinc-500">Admin Console</p>
            </div>
          </div>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-1.5 hover:bg-zinc-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="mt-4 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
                  ].join(" ")
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto px-3 pb-4 hidden md:block">
          <button
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main column */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between bg-white/80 backdrop-blur border-b border-zinc-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg p-1.5 hover:bg-zinc-100"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-sm font-semibold text-zinc-900">{title}</h1>
              {subtitle && (
                <p className="text-xs text-zinc-500">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-xs font-medium text-zinc-900">
                Mock Admin
              </p>
              <p className="text-[11px] text-zinc-500">
                Local session only
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-semibold text-white">
              SA
            </div>
            <button
              onClick={handleLogout}
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-zinc-200 px-2.5 py-1.5 text-[11px] font-medium text-zinc-800 hover:bg-zinc-50"
            >
              <LogOut className="h-3.5 w-3.5 mr-1" />
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 py-4 md:px-6 md:py-6">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
