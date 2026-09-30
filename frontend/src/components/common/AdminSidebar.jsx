import {
  LayoutDashboard,
  Users,
  Building2,
  BriefcaseBusiness,
  FileText,
  ShieldCheck,
  BarChart3,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      label: "Employees",
      icon: Users,
      path: "/admin/employees",
    },
    {
      label: "Departments",
      icon: Building2,
      path: "/admin/departments",
    },
    {
      label: "Positions",
      icon: BriefcaseBusiness,
      path: "/admin/positions",
    },
    {
      label: "Documents",
      icon: FileText,
      path: "/admin/documents",
    },
    {
      label: "Access Control",
      icon: ShieldCheck,
      path: "/admin/access-control",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-white text-slate-800 transition-all duration-300 dark:bg-slate-900 dark:text-white ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo Section */}
      <div
        className={`flex h-20 items-center border-b border-slate-200 dark:border-slate-800 ${
          sidebarOpen ? "justify-between px-4" : "justify-center"
        }`}
      >
        {sidebarOpen && (
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
              <span className="text-lg font-bold text-white">C</span>
            </div>

            {/* Brand */}
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                ContextFlow{" "}
                <span className="text-blue-500 dark:text-blue-400">
                  AI
                </span>
              </h1>

              <p className="text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-300">
                Knowledge Intelligence
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {sidebarOpen ? (
            <ChevronLeft size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/admin"}
              title={!sidebarOpen ? item.label : ""}
              className={({ isActive }) =>
                `flex items-center rounded-lg py-3 text-sm font-medium transition ${
                  sidebarOpen ? "gap-3 px-3" : "justify-center px-0"
                } ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Profile + Logout */}
      <div className="absolute bottom-0 left-0 w-full border-t border-slate-200 p-3 dark:border-slate-800">
        <NavLink
          to="/admin/profile"
          title={!sidebarOpen ? "Profile" : ""}
          className={({ isActive }) =>
            `flex items-center rounded-lg py-3 text-sm font-medium transition ${
              sidebarOpen ? "gap-3 px-3" : "justify-center px-0"
            } ${
              isActive
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            }`
          }
        >
          <UserCircle size={20} />

          {sidebarOpen && <span>Profile</span>}
        </NavLink>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className={`mt-1 flex w-full items-center rounded-lg py-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-500 dark:text-slate-300 dark:hover:bg-red-500/10 dark:hover:text-red-400 ${
            sidebarOpen ? "gap-3 px-3" : "justify-center px-0"
          }`}
        >
          <LogOut size={20} />

          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;