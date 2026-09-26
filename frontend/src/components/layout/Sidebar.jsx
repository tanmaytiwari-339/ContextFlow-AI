import {
  LayoutDashboard,
  Users,
  Building2,
  BriefcaseBusiness,
  FileText,
  ShieldCheck,
  BarChart3,
  UserCircle,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import contextflowLogo from "../../assets/images/contextflow-logo.png";

function Sidebar() {
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
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-slate-950 text-white">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-800 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center">
            <img
              src={contextflowLogo}
              alt="ContextFlow AI"
              className="h-11 w-11 object-contain"
            />
          </div>

          <div>
            <h1 className="text-lg font-bold">ContextFlow</h1>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-slate-800 p-4">
        <a
          href="/admin/profile"
          className="mb-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <UserCircle size={19} strokeWidth={1.8} />
          <span>Profile</span>
        </a>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400">
          <LogOut size={19} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
