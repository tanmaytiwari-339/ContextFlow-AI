import React, { useState, useEffect } from 'react';
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Lock,
  Shield,
  Key,
  ChevronRight,
  Info,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { EmployeeItem } from '../../types';

interface EmployeeProfileProps {
  currentUser?: EmployeeItem;
}

export const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ currentUser }) => {
  const [fullName, setFullName] = useState(currentUser?.name || 'Tanmay Tiwari');
  const [email, setEmail] = useState(currentUser?.email || 'tanmay.tiwari@company.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
    }
  }, [currentUser]);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const activityList = [
    { text: 'Logged in from Windows (Chrome)', time: 'Today, 10:24 AM', dotColor: 'bg-emerald-500' },
    { text: 'Viewed Company Leave Policy.pdf', time: 'Today, 09:15 AM', dotColor: 'bg-emerald-500' },
    { text: 'Asked a question in Knowledge Chat', time: 'Yesterday, 04:32 PM', dotColor: 'bg-blue-500' },
    { text: 'Downloaded Engineering Guidelines.docx', time: 'Sep 10, 2025', dotColor: 'bg-blue-500' },
    { text: 'Updated profile picture', time: 'Sep 08, 2025', dotColor: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
            Profile
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your account information and preferences.
          </p>
        </div>

        <div className="text-right hidden md:block">
          <p className="text-xs italic text-slate-500 font-serif">
            “A more informed you builds a smarter tomorrow.”
          </p>
          <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
            ContextFlow AI
          </span>
        </div>
      </div>

      {/* Top 2 Columns: Left Profile Identity Card & Right Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Tanmay Tiwari Identity */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col items-center text-center space-y-4">
          {/* Avatar with Camera badge */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-tr from-slate-800 to-slate-900 overflow-hidden">
                <span className="text-3xl font-black text-white">
                  {(currentUser?.name || fullName).split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => alert('Photo upload dialog opened.')}
              className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors"
              title="Change Photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-900">
              {currentUser?.name || fullName}
            </h2>
            <p className="text-xs text-slate-500 font-medium">{currentUser?.position || 'Software Developer'}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </div>
          </div>

          <p className="text-xs italic text-slate-600 max-w-xs font-serif bg-slate-50 p-3 rounded-xl border border-slate-100">
            “Turning documents into knowledge for a better tomorrow.”
          </p>

          <div className="w-full space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2.5 text-left">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{currentUser?.email || email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-left">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2.5 text-left">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Bangalore, India</span>
            </div>
          </div>
        </div>

        {/* Right 2 cols: Personal Information & Organization Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-6">
            {/* Personal Information Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Personal Information
                  </h3>
                  <p className="text-xs text-slate-500">
                    Update your personal details. Some information is managed by your administrator.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                {savedSuccess ? 'Saved!' : 'Save Changes'}
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 focus:bg-white bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 focus:bg-white bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 focus:bg-white bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Profile Picture
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => alert('Photo file picker opened')}
                    className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5 text-blue-600" />
                    <span>Change Photo</span>
                  </button>
                  <span className="text-[11px] text-slate-400">JPG, PNG (Max 2MB)</span>
                </div>
              </div>
            </div>

            {/* Managed Info Banner */}
            <div className="bg-sky-50/70 border border-sky-200/80 rounded-xl p-3 flex items-center gap-2.5 text-xs text-sky-800">
              <Info className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Some of your information is managed by your administrator and cannot be changed.</span>
            </div>

            {/* Organization Information (Managed by Administrator) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>🏢</span> Organization Information <span className="text-slate-400 font-normal">(Managed by Administrator)</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Employee ID</span>
                    <span className="text-xs font-bold text-slate-800">{currentUser?.empId || 'EMP1005'}</span>
                  </div>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Department</span>
                    <span className="text-xs font-bold text-slate-800">{currentUser?.department || 'Engineering'}</span>
                  </div>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Position</span>
                    <span className="text-xs font-bold text-slate-800 truncate block max-w-[90px]">{currentUser?.position || 'Software Dev'}</span>
                  </div>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">System Role</span>
                    <span className="text-xs font-bold text-slate-800">{currentUser?.role?.toUpperCase() || 'EMPLOYEE'}</span>
                  </div>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Security & Account Activity matching Image 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Security</h3>
            <p className="text-xs text-slate-500">
              Manage your password and account security.
            </p>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => alert('Change password workflow initiated.')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Change Password</h4>
                  <p className="text-[11px] text-slate-400">
                    Update your password regularly to keep your account secure.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            <div
              onClick={() => alert('Two-factor authentication setup will be enabled shortly.')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Two-Factor Authentication</h4>
                  <p className="text-[11px] text-slate-400">
                    Add an extra layer of security (Coming Soon)
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Account Activity Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Account Activity</h3>
              <p className="text-xs text-slate-500">
                Your recent account activity.
              </p>
            </div>
            <button
              onClick={() => alert('Full activity audit log opened')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activityList.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${item.dotColor} shrink-0`} />
                  <span className="text-slate-700 font-medium">{item.text}</span>
                </div>
                <span className="text-slate-400 text-[11px] shrink-0 font-medium">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
