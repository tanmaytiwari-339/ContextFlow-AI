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
  ArrowUpRight,
  Activity,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Employees",
      value: "124",
      change: "↑ 12% from last month",
      icon: Users,
      iconBg: "bg-blue-50 dark:bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      changeColor: "text-emerald-500 dark:text-emerald-400",
    },
    {
      title: "Total Documents",
      value: "342",
      change: "↑ 18% from last month",
      icon: FileText,
      iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      changeColor: "text-emerald-500 dark:text-emerald-400",
    },
    {
      title: "Departments",
      value: "8",
      change: "No change",
      icon: Building2,
      iconBg: "bg-purple-50 dark:bg-purple-500/10",
      iconColor: "text-purple-600 dark:text-purple-400",
      changeColor: "text-slate-400 dark:text-slate-500",
    },
    {
      title: "Positions",
      value: "16",
      change: "↑ 6% from last month",
      icon: BriefcaseBusiness,
      iconBg: "bg-violet-50 dark:bg-violet-500/10",
      iconColor: "text-violet-600 dark:text-violet-400",
      changeColor: "text-emerald-500 dark:text-emerald-400",
    },
  ];

  const activities = [
    {
      title: "Document uploaded",
      description: "Engineering Guidelines.pdf",
      time: "2 hours ago",
      icon: FileText,
      iconBg: "bg-blue-50 dark:bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "New employee created",
      description: "EMP1023 - Riya Sharma",
      time: "4 hours ago",
      icon: UserPlus,
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Access updated",
      description: "Remote Work Policy.pdf",
      time: "6 hours ago",
      icon: ShieldCheck,
      iconBg: "bg-purple-50 dark:bg-purple-500/10",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Document processing completed",
      description: "Company Leave Policy.pdf",
      time: "1 day ago",
      icon: CheckCircle2,
      iconBg: "bg-red-50 dark:bg-red-500/10",
      iconColor: "text-red-500 dark:text-red-400",
    },
    {
      title: "Department added",
      description: "Research & Development",
      time: "1 day ago",
      icon: Building2,
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
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

  const maxDepartmentValue = Math.max(
    ...departments.map((department) => department.value)
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-white sm:p-5 lg:p-6">
      {/* =========================================================
          WELCOME + QUICK ACTIONS
      ========================================================= */}
      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
        {/* Welcome */}
        <div className="relative min-h-[190px] overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 sm:p-7">
          {/* Decorative circles */}
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-blue-200/30 blur-2xl dark:bg-blue-500/10" />

          <div className="absolute -bottom-20 right-24 h-44 w-44 rounded-full bg-indigo-200/30 blur-2xl dark:bg-indigo-500/10" />

          <div className="relative z-10 max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-3 py-1 text-xs font-medium text-blue-600 backdrop-blur-sm dark:border-blue-500/20 dark:bg-slate-800/70 dark:text-blue-400">
              <Activity size={13} />
              Admin Dashboard
            </div>

            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Good Morning,
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-blue-950 dark:text-white sm:text-4xl">
              Admin 👋
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Manage your organization's knowledge, people and access with
              ContextFlow AI.
            </p>
          </div>

          <div className="absolute bottom-7 right-8 hidden max-w-[280px] text-right text-sm italic text-blue-800 dark:text-blue-300 xl:block">
            <p className="font-medium leading-6">
              "Knowledge shared securely builds stronger organizations."
            </p>

            <p className="mt-2 text-xs not-italic text-blue-500 dark:text-blue-400">
              — ContextFlow AI
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <BarChart3 size={18} />
              </div>

              <h2 className="font-bold text-slate-800 dark:text-white">
                Quick Actions
              </h2>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => navigate("/admin/employees")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md"
            >
              <Plus size={18} />
              Create Employee
            </button>

            <button
              onClick={() => navigate("/admin/documents")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <Upload size={18} />
              Upload Document
            </button>

            <button
              onClick={() => navigate("/admin/access-control")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <ShieldCheck size={18} />
              Manage Access
            </button>

            <button
              onClick={() => navigate("/admin/analytics")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <BarChart3 size={18} />
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          STATISTICS
      ========================================================= */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                >
                  <Icon size={23} />
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-slate-300 transition group-hover:text-blue-400 dark:text-slate-600 dark:group-hover:text-blue-400"
                />
              </div>

              <div className="mt-5">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {stat.value}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {stat.title}
                </p>

                <p
                  className={`mt-2 text-xs font-medium ${stat.changeColor}`}
                >
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================
          MAIN ANALYTICS
      ========================================================= */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.05fr_1.15fr_0.95fr]">
        {/* Document Processing */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <FileText size={18} />
              </div>

              <h2 className="font-bold text-slate-800 dark:text-white">
                Document Processing
              </h2>
            </div>

            <span className="text-xs font-medium text-slate-400">
              342 Total
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-7 sm:flex-row">
            <div
              className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#10b981 0deg 295deg, #3b82f6 295deg 331deg, #fbbf24 331deg 350deg, #f97316 350deg 358deg, #ef4444 358deg 360deg)",
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white dark:bg-slate-900">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  342
                </span>

                <span className="text-xs text-slate-400">Documents</span>
              </div>
            </div>

            <div className="w-full max-w-[220px] space-y-3 text-sm">
              {[
                ["Ready", "280", "bg-emerald-500"],
                ["Processing", "34", "bg-blue-500"],
                ["Text Extraction", "18", "bg-yellow-400"],
                ["AI Processing", "8", "bg-orange-500"],
                ["Failed", "2", "bg-red-500"],
              ].map(([name, value, color]) => (
                <div
                  key={name}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${color}`}
                  />

                  <span className="min-w-0 flex-1 text-slate-600 dark:text-slate-300">
                    {name}
                  </span>

                  <span className="font-semibold text-slate-900 dark:text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Employee Distribution */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Users size={18} />
              </div>

              <h2 className="font-bold text-slate-800 dark:text-white">
                Employee Distribution
              </h2>
            </div>

            <span className="text-xs text-slate-400">By department</span>
          </div>

          <div className="flex h-56 items-end justify-between gap-2 border-b border-slate-100 px-1 dark:border-slate-800 sm:gap-3 sm:px-2">
            {departments.map((department) => {
              const height =
                (department.value / maxDepartmentValue) * 145;

              return (
                <div
                  key={department.name}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                >
                  <span className="mb-2 text-xs font-bold text-blue-900 dark:text-blue-300">
                    {department.value}
                  </span>

                  <div
                    className="w-full max-w-11 rounded-t-lg bg-gradient-to-t from-blue-500 to-indigo-400 transition hover:from-blue-600 hover:to-indigo-500"
                    style={{
                      height: `${height}px`,
                    }}
                  />

                  <span className="mt-2 w-full truncate text-center text-[10px] text-slate-500 dark:text-slate-400">
                    {department.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Clock size={18} />
              </div>

              <h2 className="font-bold text-slate-800 dark:text-white">
                Recent Activity
              </h2>
            </div>

            <button
              onClick={() => navigate("/admin/analytics")}
              className="text-xs font-medium text-blue-600 transition hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
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
                  className="flex gap-3 py-3.5"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${activity.iconBg} ${activity.iconColor}`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                      {activity.title}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-slate-400 dark:text-slate-500">
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

      {/* =========================================================
          RECENT DOCUMENTS + SYSTEM STATUS
      ========================================================= */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
        {/* Recent Documents */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <FileText size={18} />
              </div>

              <h2 className="font-bold text-slate-800 dark:text-white">
                Recent Documents
              </h2>
            </div>

            <button
              onClick={() => navigate("/admin/documents")}
              className="text-sm font-medium text-blue-600 transition hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-400 dark:border-slate-800">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Uploaded By</th>
                  <th className="pb-3 font-medium">Department</th>
                  <th className="pb-3 font-medium">Upload Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {documents.map((document) => (
                  <tr
                    key={document.name}
                    className="border-b border-slate-50 transition last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                  >
                    <td className="py-4 font-medium text-slate-800 dark:text-white">
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
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          document.status === "Ready"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {document.status}
                      </span>
                    </td>

                    <td className="py-4">
                      <button
                        onClick={() => navigate("/admin/documents")}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-blue-400"
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
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Database size={18} />
              </div>

              <h2 className="font-bold text-slate-800 dark:text-white">
                System Status
              </h2>
            </div>

            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Healthy
            </span>
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
                className="flex items-center justify-between gap-3"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />

                  <span className="truncate text-sm text-slate-600 dark:text-slate-300">
                    {service}
                  </span>
                </div>

                <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  Online
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