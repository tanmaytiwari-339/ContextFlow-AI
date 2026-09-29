import React from 'react';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Clock,
  User,
  Sparkles,
} from 'lucide-react';
import { EmployeeView } from '../../types';

interface SidebarProps {
  activeEmployeeView: EmployeeView;
  setActiveEmployeeView: (view: EmployeeView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeEmployeeView,
  setActiveEmployeeView,
}) => {
  const employeeNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'knowledge-chat', label: 'Knowledge Chat', icon: MessageSquare },
    { id: 'activity', label: 'My Activity', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-slate-200/80 flex flex-col justify-between p-4 shrink-0 select-none min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Navigation items */}
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

      {/* Bottom Motivational Branding Card matching screenshots */}
      <div className="mt-8">
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
  );
};
