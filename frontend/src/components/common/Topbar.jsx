import { Bell, Search, ChevronDown } from "lucide-react";

function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          Admin Dashboard
        </h2>
        <p className="text-sm text-slate-500">
          Manage your organization and employees
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Notification */}
        <button className="relative text-slate-500 transition hover:text-indigo-600">
          <Bell size={21} strokeWidth={1.8} />

          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-semibold text-white">
            3
          </span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 border-l border-slate-200 pl-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
            A
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-700">
              Admin
            </p>
            <p className="text-xs text-slate-400">
              Administrator
            </p>
          </div>

          <ChevronDown size={16} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
}

export default Topbar;