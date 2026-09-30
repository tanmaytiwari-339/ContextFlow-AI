import { useState } from "react";

import {
  Plus,
  Search,
  MoreVertical,
  X,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

function EmployeePage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      position: "Software Engineer",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.smith@company.com",
      department: "Design",
      position: "UI/UX Designer",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@company.com",
      department: "AI & ML",
      position: "ML Engineer",
      status: "Active",
    },
    {
      id: 4,
      name: "Emily Johnson",
      email: "emily.johnson@company.com",
      department: "HR",
      position: "HR Manager",
      status: "Inactive",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    status: "Active",
  });

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = `${employee.name} ${employee.email} ${employee.department} ${employee.position}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      department === "All Departments" ||
      employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      department: "",
      position: "",
      status: "Active",
    });
    setEditingEmployee(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.position
    ) {
      return;
    }

    if (editingEmployee) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editingEmployee.id
            ? {
                ...employee,
                ...formData,
              }
            : employee
        )
      );
    } else {
      const newEmployee = {
        id: Date.now(),
        ...formData,
      };

      setEmployees([...employees, newEmployee]);
    }

    resetForm();
    setShowModal(false);
    setOpenMenu(null);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);

    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      status: employee.status,
    });

    setOpenMenu(null);
    setShowModal(true);
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setOpenMenu(null);
    setShowViewModal(true);
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setOpenMenu(null);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setEmployees(
      employees.filter(
        (employee) => employee.id !== selectedEmployee.id
      )
    );

    setSelectedEmployee(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:px-6 lg:px-12 lg:py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Employees
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage employees across your organization.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Search + Filter */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />

          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
          />
        </div>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option>All Departments</option>
          <option>Engineering</option>
          <option>Design</option>
          <option>AI & ML</option>
          <option>HR</option>
        </select>
      </div>

      {/* Employees Table */}
      <div className="overflow-x-auto overflow-y-visible rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full min-w-[800px]">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/70">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Employee
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Department
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Position
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        {employee.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-200">
                          {employee.name}
                        </p>

                        <p className="text-sm text-slate-400 dark:text-slate-500">
                          {employee.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {employee.department}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {employee.position}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        employee.status === "Active"
                          ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === employee.id
                              ? null
                              : employee.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === employee.id && (
                        <div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg dark:border-slate-700 dark:bg-slate-900">
                          <button
                            onClick={() => handleView(employee)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            <Eye size={16} />
                            View
                          </button>

                          <button
                            onClick={() => handleEdit(employee)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteClick(employee)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    No employees found
                  </p>

                  <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                    Try searching with a different name, email,
                    department, or position.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl dark:border dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {editingEmployee ? "Edit Employee" : "Add Employee"}
                </h2>

                <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                  {editingEmployee
                    ? "Update employee information."
                    : "Add a new employee to your organization."}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter employee name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="employee@company.com"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Department
                  </label>

                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <option value="">Select</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="HR">HR</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Position
                  </label>

                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Software Engineer"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  {editingEmployee ? "Save Changes" : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Employee Modal */}
      {showViewModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:border dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Employee Details
              </h2>

              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  {selectedEmployee.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    {selectedEmployee.name}
                  </h3>

                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    {selectedEmployee.email}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                    Department
                  </p>

                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {selectedEmployee.department}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                    Position
                  </p>

                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {selectedEmployee.position}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      selectedEmployee.status === "Active"
                        ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {selectedEmployee.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 px-6 py-4 text-right dark:border-slate-800">
              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:border dark:border-slate-800 dark:bg-slate-900">
            <div className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                <Trash2 size={22} />
              </div>

              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Delete Employee
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {selectedEmployee.name}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedEmployee(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteConfirm}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Delete Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeePage;