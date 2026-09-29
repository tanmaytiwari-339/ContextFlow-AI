import React from 'react';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Clock,
  User,
  Sparkles,
  PanelLeftClose,
  ChevronRight,
} from 'lucide-react';
import { EmployeeView } from '../../types';

interface SidebarProps {
  activeEmployeeView: EmployeeView;
  setActiveEmployeeView: (view: EmployeeView) => void;
  isOpen?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeEmployeeView,
  setActiveEmployeeView,
  isOpen = true,
  onClose,
  onToggle,
}) => {
  const employeeNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'knowledge-chat', label: 'Knowledge Chat', icon: MessageSquare },
    { id: 'activity', label: 'My Activity', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Floating Slide-Open Tab shown when sidebar is closed */}
      {!isOpen && onToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="fixed left-0 top-20 z-30 flex items-center gap-1.5 pl-2.5 pr-3 py-2 bg-white/95 hover:bg-white text-slate-700 hover:text-blue-600 border border-l-0 border-slate-200/90 shadow-md hover:shadow-lg rounded-r-xl text-xs font-bold transition-all duration-200 group cursor-pointer hover:pl-3.5 animate-fadeIn"
          title="Open sidebar (Slide to open)"
          aria-label="Open sidebar"
        >
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          <span className="font-semibold text-xs text-slate-700 group-hover:text-blue-600">Menu</span>
        </button>
      )}

      {/* Collapsible Sliding Sidebar */}
      <aside
        className={`fixed lg:sticky top-16 z-30 lg:z-10 h-[calc(100vh-4rem)] bg-white/95 lg:bg-white/80 backdrop-blur-md border-r border-slate-200/80 flex flex-col justify-between shrink-0 select-none transition-all duration-300 ease-in-out shadow-xl lg:shadow-none overflow-y-auto overflow-x-hidden ${
          isOpen
            ? 'w-64 p-4 translate-x-0 opacity-100 visible'
            : 'w-0 p-0 -translate-x-full opacity-0 invisible overflow-hidden border-none pointer-events-none'
        }`}
      >
        <div className="space-y-4 min-w-[224px]">
          {/* Top Header with Slide-Close Button */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Workspace Menu
            </span>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer group flex items-center gap-1 text-[11px]"
                title="Slide sidebar closed"
                aria-label="Slide sidebar closed"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 text-[10px] font-medium">
                  Slide Close
                </span>
                <PanelLeftClose className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {employeeNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeEmployeeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveEmployeeView(item.id as EmployeeView)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Motivational Branding Card */}
        <div className="mt-8 min-w-[224px]">
          <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-indigo-50/80 border border-blue-100 shadow-2xs">
            {/* Subtle wave gradient visual */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-8 h-8 rounded-xl bg-white shadow-xs border border-blue-100 flex items-center justify-center text-blue-600 mb-3">
                <Sparkles className="w-4 h-4" />
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-tight">
                Knowledge Drives Progress
              </h4>

              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Turn documents into decisions with intelligent enterprise synthesis.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
