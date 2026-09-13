import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-[#071433] border-b border-white/10 flex items-center justify-between px-8">

      {/* Search */}
      <div className="relative w-[500px]">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search documents, summaries..."
          className="
            w-full
            bg-[#111C44]
            text-white
            rounded-full
            py-3
            pl-12
            pr-4
            outline-none
            border border-slate-700
            focus:border-indigo-500
          "
        />

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        <button className="relative">
          <Bell
            size={22}
            className="text-white"
          />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
            T
          </div>

          <div>
            <p className="text-white font-medium">
              Tejas
            </p>

            <p className="text-xs text-slate-400">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}