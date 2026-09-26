import {
  Users,
  Building2,
  FileText,
  HardDrive,
} from "lucide-react";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 px-12 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">
              Welcome back, Admin 👋
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Here's what's happening with your organization today.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {/* Employees */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Total Employees
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Users size={20} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-800">
                124
              </h2>

              <p className="mt-2 text-sm text-green-600">
                +8 this month
              </p>
            </div>

            {/* Departments */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Departments
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Building2 size={20} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-800">
                12
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Active departments
              </p>
            </div>

            {/* Documents */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Documents
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <FileText size={20} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-800">
                856
              </h2>

              <p className="mt-2 text-sm text-green-600">
                +32 this week
              </p>
            </div>

            {/* Storage */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Storage Used
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <HardDrive size={20} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-800">
                6.4 GB
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                of 20 GB
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Recent Activity
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Latest updates across your organization
                </p>
              </div>

              <button className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700">
                View All
              </button>
            </div>

            <div className="mt-6 divide-y divide-slate-100">
              {/* Activity 1 */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-slate-700">
                    New employee created
                  </p>

                  <p className="text-sm text-slate-400">
                    John Doe was added to Engineering
                  </p>
                </div>

                <span className="text-sm text-slate-400">
                  2 hours ago
                </span>
              </div>

              {/* Activity 2 */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-slate-700">
                    Document uploaded
                  </p>

                  <p className="text-sm text-slate-400">
                    Employee handbook.pdf
                  </p>
                </div>

                <span className="text-sm text-slate-400">
                  5 hours ago
                </span>
              </div>

              {/* Activity 3 */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-slate-700">
                    Department created
                  </p>

                  <p className="text-sm text-slate-400">
                    Artificial Intelligence
                  </p>
                </div>

                <span className="text-sm text-slate-400">
                  Yesterday
                </span>
              </div>
            </div>
          </div>
    </div>
  );
}

export default AdminDashboard;