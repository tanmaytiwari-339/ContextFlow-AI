import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png"; // adjust filename if needed

import {
  LayoutDashboard,
  UploadCloud,
  FileText,
  Search,
  MessageCircle,
  Sparkles,
  User,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Upload Documents",
    icon: UploadCloud,
    path: "/upload",
  },
  {
    name: "My Documents",
    icon: FileText,
    path: "/documents",
  },
  {
    name: "Search",
    icon: Search,
    path: "/search",
  },
  {
    name: "Chat with Documents",
    icon: MessageCircle,
    path: "/chat",
  },
  {
    name: "Summaries",
    icon: Sparkles,
    path: "/summaries",
  },
  {
    name: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#071433] text-white flex flex-col min-h-screen">

      {/* Logo */}
      <div className="px-6 py-8 border-b border-white/10">
        <div className="flex items-center gap-3">

          <div className="flex items-center gap-3">
          <img
              src={logo}
              alt="ContextFlow AI"
              className="w-12 h-12 object-contain"
            />

          <div>
            <h1 className="font-bold text-lg">
              ContextFlow AI
            </h1>

            <p className="text-xs text-slate-400">
              AI Document Intelligence
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10">
        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-sm text-slate-300">
            ContextFlow AI
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Version 1.0.0
          </p>
        </div>
      </div>
    </aside>
  );
}