import {
  Users,
  Building2,
  FileText,
  HardDrive,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";

function AnalyticsPage() {
  const departmentData = [
    { name: "Engineering", employees: 42 },
    { name: "AI & ML", employees: 28 },
    { name: "Design", employees: 18 },
    { name: "HR", employees: 12 },
    { name: "Marketing", employees: 14 },
    { name: "Finance", employees: 10 },
  ];

  const documentData = [
    { name: "PDF", count: 512 },
    { name: "DOCX", count: 238 },
    { name: "Other", count: 106 },
  ];

  const activities = [
    {
      action: "New employee added",
      user: "Sarah Smith",
      time: "10 minutes ago",
    },
    {
      action: "Document uploaded",
      user: "John Doe",
      time: "35 minutes ago",
    },
    {
      action: "Role updated",
      user: "Admin",
      time: "1 hour ago",
    },
    {
      action: "Department created",
      user: "Admin",
      time: "2 hours ago",
    },
    {
      action: "Document deleted",
      user: "Michael Brown",
      time: "4 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-12 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Monitor organization activity and resource usage.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* Employees */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Users size={21} />
            </div>

            <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
              <TrendingUp size={14} />
              6.4%
            </span>
          </div>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Total Employees
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
            124
          </h2>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Compared to last month
          </p>
        </div>

        {/* Departments */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Building2 size={21} />
            </div>

            <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
              <TrendingUp size={14} />
              8.2%
            </span>
          </div>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Departments
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
            12
          </h2>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            2 added this quarter
          </p>
        </div>

        {/* Documents */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <FileText size={21} />
            </div>

            <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
              <TrendingUp size={14} />
              12.5%
            </span>
          </div>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Total Documents
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
            856
          </h2>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            32 uploaded this week
          </p>
        </div>

        {/* Storage */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              <HardDrive size={21} />
            </div>

            <span className="flex items-center gap-1 text-xs font-medium text-red-500 dark:text-red-400">
              <TrendingDown size={14} />
              2.1%
            </span>
          </div>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Storage Used
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
            6.4 GB
          </h2>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Of 20 GB available
          </p>
        </div>
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Department Distribution */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800 dark:text-white">
                Employees by Department
              </h2>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Current employee distribution
              </p>
            </div>

            <Users
              size={20}
              className="text-slate-400 dark:text-slate-500"
            />
          </div>

          <div className="space-y-5">
            {departmentData.map((department) => {
              const percentage = (department.employees / 124) * 100;

              return (
                <div key={department.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {department.name}
                    </span>

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {department.employees}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Document Distribution */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800 dark:text-white">
                Document Distribution
              </h2>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Documents by file type
              </p>
            </div>

            <FileText
              size={20}
              className="text-slate-400 dark:text-slate-500"
            />
          </div>

          <div className="space-y-5">
            {documentData.map((document) => {
              const percentage = (document.count / 856) * 100;

              return (
                <div key={document.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {document.name}
                    </span>

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {document.count}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-purple-600"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Total Documents
              </span>

              <span className="font-semibold text-slate-800 dark:text-white">
                856
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Storage */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800 dark:text-white">
                Storage Usage
              </h2>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Organization storage overview
              </p>
            </div>

            <HardDrive
              size={20}
              className="text-slate-400 dark:text-slate-500"
            />
          </div>

          <div className="mb-3 flex items-end justify-between">
            <div>
              <span className="text-3xl font-bold text-slate-800 dark:text-white">
                6.4 GB
              </span>

              <span className="ml-2 text-sm text-slate-400 dark:text-slate-500">
                / 20 GB
              </span>
            </div>

            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              32%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-indigo-600"
              style={{ width: "32%" }}
            />
          </div>

          <div className="mt-5 flex justify-between text-xs text-slate-400 dark:text-slate-500">
            <span>Used: 6.4 GB</span>
            <span>Available: 13.6 GB</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800 dark:text-white">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Latest organization activity
              </p>
            </div>

            <Activity
              size={20}
              className="text-slate-400 dark:text-slate-500"
            />
          </div>

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <Activity size={15} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {activity.action}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;