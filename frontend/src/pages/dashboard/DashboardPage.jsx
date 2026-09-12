import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5">
          <h1 className="text-lg font-bold">◈ ContextFlow AI</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 mt-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white"
          >
            <span>⌂</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          <Link
            to="/upload"
            className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white"
          >
            <span>↥</span>
            <span className="text-sm">Upload Documents</span>
          </Link>

          <Link
            to="/documents"
            className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white"
          >
            <span>□</span>
            <span className="text-sm">My Documents</span>
          </Link>

          <button className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white">
            <span>⌕</span>
            <span className="text-sm">Search</span>
          </button>

          <button className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white">
            <span>▢</span>
            <span className="text-sm">Chat with Documents</span>
          </button>

          <button className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white">
            <span>▤</span>
            <span className="text-sm">Summaries</span>
          </button>

          <button className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white">
            <span>♙</span>
            <span className="text-sm">Profile</span>
          </button>

          <button className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white">
            <span>⚙</span>
            <span className="text-sm">Settings</span>
          </button>
        </nav>

        {/* Logout */}
        <div className="px-4 pb-6">
          <button className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white">
            <span>↪</span>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Temporary main area */}
      <main className="flex-1">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          {/* Search */}
          <div className="relative w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search documents, summaries..."
              className="w-full bg-slate-100 rounded-full py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-5">
            {/* Notification */}
            <button className="text-slate-500 hover:text-indigo-600 text-lg">
              ♧
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
        <section className="px-8 pt-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome, Tanmay 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Here's what's happening with your documents today.
          </p>
        </section>
        {/* Statistics */}
        <section className="px-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Documents */}
            <div className="bg-white rounded-xl p-6 border">
              <p className="text-sm text-slate-500">Total Documents</p>

              <h3 className="text-3xl font-bold text-slate-800 mt-2">12</h3>

              <p className="text-sm text-green-500 mt-2">+2 this week</p>
            </div>

            {/* AI Summaries */}
            <div className="bg-white rounded-xl p-6 border">
              <p className="text-sm text-slate-500">AI Summaries</p>

              <h3 className="text-3xl font-bold text-slate-800 mt-2">8</h3>

              <p className="text-sm text-green-500 mt-2">+3 this week</p>
            </div>

            {/* Chat Queries */}
            <div className="bg-white rounded-xl p-6 border">
              <p className="text-sm text-slate-500">Chat Queries</p>

              <h3 className="text-3xl font-bold text-slate-800 mt-2">24</h3>

              <p className="text-sm text-green-500 mt-2">+6 this week</p>
            </div>

            {/* Storage Used */}
            <div className="bg-white rounded-xl p-6 border">
              <p className="text-sm text-slate-500">Storage Used</p>

              <h3 className="text-3xl font-bold text-slate-800 mt-2">2.4 GB</h3>

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

                <button className="text-sm text-indigo-600 hover:text-indigo-700">
                  View All
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {/* Activity 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600">↥</span>
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <span className="text-green-600">✓</span>
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600">⌕</span>
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
                  className="flex items-center gap-4 bg-indigo-600 text-white rounded-xl p-5 hover:bg-indigo-700 transition"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <span className="text-xl">↥</span>
                  </div>

                  <div>
                    <h3 className="font-semibold">Upload Document</h3>

                    <p className="text-sm text-indigo-100 mt-1">
                      Add a new document to your knowledge base.
                    </p>
                  </div>
                </Link>

                {/* View Documents */}
                <Link
                  to="/documents"
                  className="flex items-center gap-4 bg-slate-50 border rounded-xl p-5 hover:bg-slate-100 transition"
                >
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <span className="text-xl text-indigo-600">□</span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      View Documents
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
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
