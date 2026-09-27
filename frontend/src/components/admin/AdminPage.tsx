import React from 'react';
import { Shield, LogOut } from 'lucide-react';
import { EmployeeItem } from '../../types';

interface AdminPageProps {
  currentUser?: EmployeeItem;
  onSignOut: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ currentUser, onSignOut }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Admin Top Navbar */}
      <header className="sticky top-0 z-30 w-full bg-slate-900 border-b border-slate-800 text-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">
                  DOCWISE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Admin Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Enterprise Administration Control</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-xs font-bold text-slate-200">
                {currentUser?.name || 'Administrator'}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {currentUser?.email || 'admin@company.com'}
              </span>
            </div>

            <button
              onClick={onSignOut}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all shadow-xs cursor-pointer"
              title="Sign Out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Blank Page Area */}
      <main className="flex-1 w-full bg-[#F8FAFC]">
        {/* Intentionally blank admin workspace canvas */}
      </main>
    </div>
  );
};
