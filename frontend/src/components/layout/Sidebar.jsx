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
} from "lucide-react";

import { NavLink } from "react-router-dom";
import contextflowLogo from "../../assets/images/contextflow-logo.png";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
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
      className={`fixed left-0 top-0 z-40 h-screen bg-slate-900 text-white transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div
        className={`flex h-20 items-center border-b border-slate-800 ${
          sidebarOpen ? "justify-between px-5" : "justify-center"
        }`}
      >
        {sidebarOpen && (
          <img
            src={contextflowLogo}
            alt="ContextFlow"
            className="h-9 w-auto"
          />
        )}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
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
                  sidebarOpen
                    ? "gap-3 px-3"
                    : "justify-center px-0"
                } ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="absolute bottom-0 left-0 w-full border-t border-slate-800 p-3">
        <NavLink
          to="/admin/profile"
          title={!sidebarOpen ? "Profile" : ""}
          className={({ isActive }) =>
            `flex items-center rounded-lg py-3 text-sm font-medium transition ${
              sidebarOpen
                ? "gap-3 px-3"
                : "justify-center px-0"
            } ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <UserCircle size={20} />

          {sidebarOpen && <span>Profile</span>}
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;