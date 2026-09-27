import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, ChevronDown, User, LogOut, CheckCircle2 } from 'lucide-react';
import { EmployeeView, EmployeeItem } from '../../types';
import { BrandLogo } from './Illustrations';

interface HeaderProps {
  currentUser?: EmployeeItem;
  activeEmployeeView: EmployeeView;
  setActiveEmployeeView: (view: EmployeeView) => void;
  onOpenSearch: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeEmployeeView,
  setActiveEmployeeView,
  onOpenSearch,
  darkMode,
  onToggleDarkMode,
  onSignOut,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const userName = currentUser?.name || 'Tanmay Tiwari';
  const userEmpId = currentUser?.empId || 'EMP1005';
  const userEmail = currentUser?.email || 'tanmay.tiwari@company.com';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  const notifications = [
    {
      id: 1,
      title: 'Company Leave Policy updated',
      time: '2 hours ago',
      unread: true,
      type: 'document'
    },
    {
      id: 2,
      title: 'Q3 Product Strategy Guide published',
      time: '5 hours ago',
      unread: true,
      type: 'document'
    },
    {
      id: 3,
      title: 'AI Summary generated for 3 docs',
      time: 'Yesterday',
      unread: false,
      type: 'ai'
    }
  ];

  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-6 flex items-center justify-between transition-colors">
      {/* Brand area */}
      <div className="flex items-center">
        <button
          onClick={() => setActiveEmployeeView('dashboard')}
          className="text-left focus:outline-hidden cursor-pointer flex items-center transition-opacity hover:opacity-90"
          title="Return to Dashboard"
        >
          <BrandLogo size="md" />
        </button>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-xl mx-4 lg:mx-8 hidden sm:block">
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full h-10 px-3.5 bg-slate-50 hover:bg-slate-100/90 border border-slate-200/90 hover:border-blue-400 rounded-xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-2.5 text-slate-400 text-xs sm:text-sm truncate">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
            <span className="truncate">
              Search your documents, summaries or ask anything...
            </span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-medium text-slate-500 bg-white border border-slate-200 rounded-md shadow-2xs">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Quick View Navigator Jump Menu */}
        <div className="relative hidden lg:block">
          <select
            value={activeEmployeeView}
            onChange={(e) => setActiveEmployeeView(e.target.value as EmployeeView)}
            className="text-xs bg-blue-50/70 border border-blue-200/80 text-blue-800 rounded-lg px-2.5 py-1.5 font-medium focus:outline-hidden cursor-pointer hover:bg-blue-50"
            aria-label="Direct Screen Jump"
          >
            <option value="dashboard">Screen: 1. Employee Dashboard</option>
            <option value="documents">Screen: 2. Employee Documents</option>
            <option value="knowledge-chat">Screen: 3. Knowledge Chat</option>
            <option value="document-detail">Screen: 4. Document Summary / View</option>
            <option value="activity">Screen: 5. My Activity</option>
            <option value="profile">Screen: 6. Employee Profile</option>
          </select>
        </div>

        {/* Day/Night Theme Pill Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="relative w-12 h-6 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 p-0.5 flex items-center cursor-pointer transition-all shadow-inner focus:outline-hidden"
          title="Toggle color theme"
          aria-label="Theme toggle"
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center transform transition-transform ${
              darkMode ? 'translate-x-6' : 'translate-x-0'
            }`}
          >
            {darkMode ? (
              <Moon className="w-3 h-3 text-blue-600" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            )}
          </div>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-9 h-9 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 relative transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white ring-1 ring-red-400/50" />
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-semibold text-xs text-slate-900">Notifications</span>
                <span className="text-[11px] text-blue-600 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {notifications.map((item) => (
                  <div key={item.id} className="py-2.5 px-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-slate-800">{item.title}</p>
                        <span className="text-[10px] text-slate-400">{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Pill / Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1 pl-1.5 pr-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 via-rose-500 to-indigo-600 p-[1.5px] shrink-0">
              <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center font-bold text-xs text-slate-700">
                <span className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white w-full h-full flex items-center justify-center text-[10px]">
                  {userInitials}
                </span>
              </div>
            </div>

            {/* User Meta */}
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {userName}
              </p>
              <p className="text-[10px] text-slate-500 leading-none">
                {userEmpId}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900">
                  {userName}
                </p>
                <p className="text-[11px] text-slate-500">
                  {userEmail}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Employee
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setActiveEmployeeView('profile');
                    setProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  View Profile
                </button>
                <button
                  onClick={() => {
                    setActiveEmployeeView('activity');
                    setProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                  My Activity
                </button>
                {onSignOut && (
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onSignOut();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer border-t border-slate-100 mt-1 font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    Sign Out to Landing Page
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
