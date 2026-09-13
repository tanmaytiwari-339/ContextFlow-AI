import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  Upload,
  FileText,
  Search,
  MessageSquare,
  File,
  User,
  Settings,
  LogOut,
  Bell,
  Sparkles,
  HardDrive,
  CircleCheck,
} from "lucide-react";
import contextflowLogo from "../../assets/images/contextflow-logo.png";

function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={contextflowLogo}
            alt="ContextFlow AI"
            className="w-10 h-10 object-contain"
          />

          <h1 className="text-lg font-bold">ContextFlow AI</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 mt-4 space-y-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white"
          >
            <LayoutDashboard size={18} strokeWidth={1.8} />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          <Link
            to="/upload"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white"
          >
            <Upload size={18} strokeWidth={1.8} />
            <span className="text-sm">Upload Documents</span>
          </Link>

          <Link
            to="/documents"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white"
          >
            <FileText size={18} strokeWidth={1.8} />
            <span className="text-sm">My Documents</span>
          </Link>

          <button className="flex items-center gap-3 px-4 py-3  rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white">
            <Search size={18} strokeWidth={1.8} />
            <span className="text-sm">Search</span>
          </button>

          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white">
            <MessageSquare size={18} strokeWidth={1.8} />
            <span className="text-sm">Chat with Documents</span>
          </button>

          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white">
            <File size={18} strokeWidth={1.8} />
            <span className="text-sm">Summaries</span>
          </button>

          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white">
            <User size={18} strokeWidth={1.8} />
            <span className="text-sm">Profile</span>
          </button>

          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white">
            <Settings size={18} strokeWidth={1.8} />
            <span className="text-sm">Settings</span>
          </button>
        </nav>

        {/* Logout */}
        <div className="px-4 pb-6 border-t border-slate-700 pt-4">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white transition">
            <LogOut size={18} strokeWidth={1.8} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Temporary main area */}
      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 lg:px-10">
          {/* Search */}
          <div className="relative w-80">
            <Search
              size={18}
              strokeWidth={1.8}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search documents, summaries..."
              className="w-full bg-slate-100 rounded-full py-2 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-5">
            {/* Notification */}
            <button className="text-slate-500 hover:text-indigo-600 transition">
              <Bell size={20} strokeWidth={1.8} />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-semibold">T</span>
              </div>

              <span className="text-sm font-medium text-slate-700">Tanmay</span>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="px-8 pt-8 pb-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome, Tanmay 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Here's what's happening with your documents today.
          </p>
        </section>
        {/* Statistics */}
        {/* Statistics */}
        <section className="px-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Documents */}
            <div className="bg-white rounded-xl border p-5 hover:shadow-md hover:-translate-y-1 transition">
              <div className="w-11 h-11 rounded-lg bg-indigo-100 flex items-center justify-center">
                <FileText
                  size={22}
                  strokeWidth={1.8}
                  className="text-indigo-600"
                />
              </div>

              <p className="text-sm text-slate-500 mt-4">Total Documents</p>

              <h3 className="text-3xl font-bold text-slate-800 mt-1">12</h3>

              <p className="text-sm text-green-500 mt-2">+2 this week</p>
            </div>

            {/* AI Summaries */}
            <div className="bg-white rounded-xl border p-5 hover:shadow-md hover:-translate-y-1 transition">
              <div className="w-11 h-11 rounded-lg bg-purple-100 flex items-center justify-center">
                <Sparkles
                  size={22}
                  strokeWidth={1.8}
                  className="text-purple-600"
                />
              </div>

              <p className="text-sm text-slate-500 mt-4">AI Summaries</p>

              <h3 className="text-3xl font-bold text-slate-800 mt-1">8</h3>

              <p className="text-sm text-green-500 mt-2">+3 this week</p>
            </div>

            {/* Chat Queries */}
            <div className="bg-white rounded-xl border p-5 hover:shadow-md hover:-translate-y-1 transition">
              <div className="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center">
                <MessageSquare
                  size={22}
                  strokeWidth={1.8}
                  className="text-blue-600"
                />
              </div>

              <p className="text-sm text-slate-500 mt-4">Chat Queries</p>

              <h3 className="text-3xl font-bold text-slate-800 mt-1">24</h3>

              <p className="text-sm text-green-500 mt-2">+6 this week</p>
            </div>

            {/* Storage Used */}
            <div className="bg-white rounded-xl border p-5 hover:shadow-md hover:-translate-y-1 transition">
              <div className="w-11 h-11 rounded-lg bg-green-100 flex items-center justify-center">
                <HardDrive
                  size={22}
                  strokeWidth={1.8}
                  className="text-green-600"
                />
              </div>

              <p className="text-sm text-slate-500 mt-4">Storage Used</p>

              <h3 className="text-3xl font-bold text-slate-800 mt-1">2.4 GB</h3>

              <p className="text-sm text-slate-400 mt-2">of 10 GB</p>
            </div>
          </div>
        </section>
        {/* Recent Activity + Quick Actions */}
        <section className="px-8 mt-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">
                  Recent Activity
                </h2>

                <button className="text-sm text-indigo-600 hover:text-indigo-700 transition">
                  View All
                </button>
              </div>

              <div className="mt-6 divide-y">
                {/* Activity 1 */}
                <div className="flex items-center justify-between py-4 px-3 rounded-lg hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Upload
                        size={18}
                        strokeWidth={1.8}
                        className="text-indigo-600"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-slate-700">Resume.pdf</p>

                      <p className="text-sm text-slate-400">
                        Document uploaded
                      </p>
                    </div>
                  </div>

                  <span className="text-sm text-slate-400">2 hours ago</span>
                </div>

                {/* Activity 2 */}
                <div className="flex items-center justify-between py-4 px-3 rounded-lg hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <CircleCheck
                        size={18}
                        strokeWidth={1.8}
                        className="text-green-600"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-slate-700">
                        Project_Report.pdf
                      </p>

                      <p className="text-sm text-slate-400">
                        Document processed successfully
                      </p>
                    </div>
                  </div>

                  <span className="text-sm text-slate-400">Yesterday</span>
                </div>

                {/* Activity 3 */}
                <div className="flex items-center justify-between py-4 px-3 rounded-lg hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Search
                        size={18}
                        strokeWidth={1.8}
                        className="text-purple-600"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-slate-700">AI Query</p>

                      <p className="text-sm text-slate-400">
                        Asked a question about Resume.pdf
                      </p>
                    </div>
                  </div>

                  <span className="text-sm text-slate-400">2 days ago</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-slate-800">
                Quick Actions
              </h2>

              <div className="mt-6 space-y-4">
                {/* Upload Document */}
                <Link
                  to="/upload"
                  className="group flex items-center gap-4 bg-white border rounded-xl p-5 text-slate-700 hover:bg-indigo-600 hover:text-white transition"
                >
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 group-hover:bg-white/20 flex items-center justify-center">
                    <Upload
                      size={20}
                      strokeWidth={1.8}
                      className="text-indigo-600 group-hover:text-white"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold">Upload Document</h3>

                    <p className="text-sm text-slate-500 group-hover:text-indigo-100 mt-1">
                      Add a new document to your knowledge base.
                    </p>
                  </div>
                </Link>

                {/* View Documents */}
                <Link
                  to="/documents"
                  className="group flex items-center gap-4 bg-white border rounded-xl p-5 text-slate-700 hover:bg-indigo-600 hover:text-white transition"
                >
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 group-hover:bg-white/20 flex items-center justify-center">
                    <FileText
                      size={20}
                      strokeWidth={1.8}
                      className="text-indigo-600 group-hover:text-white"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold group-hover:text-white">
                      View Documents
                    </h3>

                    <p className="text-sm text-slate-500 group-hover:text-indigo-100 mt-1">
                      Browse and manage your uploaded documents.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
