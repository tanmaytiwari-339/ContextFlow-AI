import { useNavigate } from "react-router-dom";

import {
  Users,
  FileText,
  Building2,
  BriefcaseBusiness,
  Plus,
  Upload,
  ShieldCheck,
  BarChart3,
  Clock,
  CheckCircle2,
  UserPlus,
  Database,
  MoreVertical,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Employees",
      value: "124",
      change: "↑ 12% from last month",
      icon: Users,
      iconBg: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
      changeColor: "text-emerald-500 dark:text-emerald-400",
    },
    {
      title: "Total Documents",
      value: "342",
      change: "↑ 18% from last month",
      icon: FileText,
      iconBg: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
      changeColor: "text-emerald-500 dark:text-emerald-400",
    },
    {
      title: "Departments",
      value: "8",
      change: "No change",
      icon: Building2,
      iconBg: "bg-purple-50 dark:bg-purple-950",
      iconColor: "text-purple-600 dark:text-purple-400",
      changeColor: "text-slate-400 dark:text-slate-500",
    },
    {
      title: "Positions",
      value: "16",
      change: "↑ 6% from last month",
      icon: BriefcaseBusiness,
      iconBg: "bg-purple-50 dark:bg-purple-950",
      iconColor: "text-purple-600 dark:text-purple-400",
      changeColor: "text-emerald-500 dark:text-emerald-400",
    },
  ];

  const activities = [
    {
      title: "Document uploaded",
      description: "Engineering Guidelines.pdf",
      time: "2 hours ago",
      icon: FileText,
      iconBg: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "New employee created",
      description: "EMP1023 - Riya Sharma",
      time: "4 hours ago",
      icon: UserPlus,
      iconBg: "bg-emerald-50 dark:bg-emerald-950",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Access updated",
      description: "Remote Work Policy.pdf",
      time: "6 hours ago",
      icon: ShieldCheck,
      iconBg: "bg-purple-50 dark:bg-purple-950",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Document processing completed",
      description: "Company Leave Policy.pdf",
      time: "1 day ago",
      icon: CheckCircle2,
      iconBg: "bg-red-50 dark:bg-red-950",
      iconColor: "text-red-500 dark:text-red-400",
    },
    {
      title: "Department added",
      description: "Research & Development",
      time: "1 day ago",
      icon: Building2,
      iconBg: "bg-emerald-50 dark:bg-emerald-950",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  const documents = [
    {
      name: "Company Leave Policy.pdf",
      department: "HR",
      date: "Sep 10, 2025",
      status: "Ready",
    },
    {
      name: "Engineering Guidelines.docx",
      department: "Engineering",
      date: "Sep 08, 2025",
      status: "Ready",
    },
    {
      name: "Remote Work Policy.pdf",
      department: "Admin",
      date: "Sep 06, 2025",
      status: "Processing",
    },
    {
      name: "Project Reporting Template.xlsx",
      department: "Engineering",
      date: "Sep 01, 2025",
      status: "Ready",
    },
    {
      name: "Employee Handbook.pdf",
      department: "HR",
      date: "Aug 28, 2025",
      status: "Ready",
    },
  ];

  const departments = [
    { name: "Engineering", value: 38 },
    { name: "HR", value: 22 },
    { name: "Finance", value: 18 },
    { name: "Sales", value: 16 },
    { name: "Operations", value: 12 },
    { name: "Others", value: 18 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      {/* Welcome Section */}
      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_325px]">
        <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-white via-blue-50 to-indigo-100 p-7 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
          <div className="relative z-10">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Good Morning,
            </p>

            <h1 className="mt-1 text-3xl font-bold text-blue-950 dark:text-white">
              Admin 👋
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage your organization's knowledge, people and access with
              ContextFlow AI.
            </p>
          </div>

          <div className="absolute right-8 top-8 hidden max-w-[280px] text-right text-sm italic text-blue-800 dark:text-blue-300 xl:block">
            <p className="font-medium">
              "Knowledge shared securely builds stronger organizations."
            </p>

            <p className="mt-2 text-xs">— ContextFlow AI</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="text-blue-600" size={20} />

            <h2 className="font-bold text-blue-950 dark:text-white">
              Quick Actions
            </h2>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => navigate("/admin/employees")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              <Plus size={18} />
              Create Employee
            </button>

            <button
              onClick={() => navigate("/admin/documents")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Upload size={18} />
              Upload Document
            </button>

            <button
              onClick={() => navigate("/admin/access-control")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <ShieldCheck size={18} />
              Manage Access
            </button>

            <button
              onClick={() => navigate("/admin/analytics")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <BarChart3 size={18} />
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                >
                  <Icon size={26} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-blue-950 dark:text-white">
                    {stat.value}
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </p>

                  <p
                    className={`mt-1 text-xs font-medium ${stat.changeColor}`}
                  >
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_1.2fr_0.9fr]">
        {/* Document Processing */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2">
            <FileText className="text-blue-600" size={21} />

            <h2 className="font-bold text-blue-950 dark:text-white">
              Document Processing Status
            </h2>
          </div>

          <div className="flex items-center justify-center gap-8">
            <div
              className="relative flex h-40 w-40 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#10b981 0deg 295deg, #3b82f6 295deg 331deg, #fbbf24 331deg 350deg, #f97316 350deg 358deg, #ef4444 358deg 360deg)",
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white dark:bg-slate-900">
                <span className="text-2xl font-bold text-blue-950 dark:text-white">
                  342
                </span>

                <span className="text-xs text-slate-400">
                  Documents
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              {[
                ["Ready", "280", "bg-emerald-500"],
                ["Processing", "34", "bg-blue-500"],
                ["Text Extraction", "18", "bg-yellow-400"],
                ["AI Processing", "8", "bg-orange-500"],
                ["Failed", "2", "bg-red-500"],
              ].map(([name, value, color]) => (
                <div key={name} className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${color}`}
                  />

                  <span className="w-28 text-slate-600 dark:text-slate-300">
                    {name}
                  </span>

                  <span className="font-semibold text-blue-950 dark:text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Employee Distribution */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2">
            <Users className="text-blue-600" size={21} />

            <h2 className="font-bold text-blue-950 dark:text-white">
              Employee Distribution
            </h2>
          </div>

          <div className="flex h-52 items-end justify-between gap-3 border-b border-slate-100 px-2 dark:border-slate-800">
            {departments.map((department) => (
              <div
                key={department.name}
                className="flex h-full flex-1 flex-col items-center justify-end"
              >
                <span className="mb-2 text-xs font-bold text-blue-900 dark:text-blue-300">
                  {department.value}
                </span>

                <div
                  className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-blue-500 to-indigo-400"
                  style={{
                    height: `${department.value * 3.2}px`,
                  }}
                />

                <span className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
                  {department.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="text-blue-600" size={21} />

              <h2 className="font-bold text-blue-950 dark:text-white">
                Recent Activity
              </h2>
            </div>

            <button
              onClick={() => navigate("/admin/analytics")}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="flex gap-3 py-3"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${activity.iconBg} ${activity.iconColor}`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-blue-950 dark:text-white">
                      {activity.title}
                    </p>

                    <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                      {activity.description}
                    </p>
                  </div>

                  <span className="whitespace-nowrap text-[10px] text-slate-400 dark:text-slate-500">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_330px]">
        {/* Recent Documents */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" size={21} />

              <h2 className="font-bold text-blue-950 dark:text-white">
                Recent Documents
              </h2>
            </div>

            <button
              onClick={() => navigate("/admin/documents")}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-400 dark:border-slate-800">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Uploaded By</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Upload Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {documents.map((document) => (
                  <tr
                    key={document.name}
                    className="border-b border-slate-50 last:border-0 dark:border-slate-800"
                  >
                    <td className="py-4 font-medium text-blue-950 dark:text-white">
                      {document.name}
                    </td>

                    <td className="py-4 text-slate-500 dark:text-slate-400">
                      Admin
                    </td>

                    <td className="py-4 text-slate-500 dark:text-slate-400">
                      {document.department}
                    </td>

                    <td className="py-4 text-slate-500 dark:text-slate-400">
                      {document.date}
                    </td>

                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                          document.status === "Ready"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                            : "bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {document.status}
                      </span>
                    </td>

                    <td className="py-4">
                      <button
                        onClick={() => navigate("/admin/documents")}
                        className="text-blue-600 transition hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-2">
            <Database className="text-blue-600" size={21} />

            <h2 className="font-bold text-blue-950 dark:text-white">
              System Status
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "Backend API",
              "Document Processing Service",
              "AI Service",
              "Database",
            ].map((service) => (
              <div
                key={service}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {service}
                  </span>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  ● Online
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;