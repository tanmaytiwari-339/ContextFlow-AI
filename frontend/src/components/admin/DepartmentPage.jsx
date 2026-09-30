import { useState } from "react";

import {
  Plus,
  Search,
  MoreVertical,
  X,
  Eye,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

function DepartmentPage() {
  const [search, setSearch] = useState("");

  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Engineering",
      description: "Software development and technology",
      manager: "John Doe",
      employeeCount: 42,
      status: "Active",
    },
    {
      id: 2,
      name: "Design",
      description: "Product and user experience design",
      manager: "Sarah Smith",
      employeeCount: 18,
      status: "Active",
    },
    {
      id: 3,
      name: "AI & ML",
      description: "Artificial intelligence and machine learning",
      manager: "Michael Brown",
      employeeCount: 24,
      status: "Active",
    },
    {
      id: 4,
      name: "Human Resources",
      description: "Employee relations and recruitment",
      manager: "Emily Johnson",
      employeeCount: 12,
      status: "Active",
    },
    {
      id: 5,
      name: "Finance",
      description: "Financial planning and accounting",
      manager: "David Wilson",
      employeeCount: 8,
      status: "Inactive",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manager: "",
    employeeCount: 0,
    status: "Active",
  });

  const filteredDepartments = departments.filter((department) =>
    `${department.name} ${department.description} ${department.manager}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      manager: "",
      employeeCount: 0,
      status: "Active",
    });

    setEditingDepartment(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.manager
    ) {
      return;
    }

    const departmentData = {
      ...formData,
      employeeCount: Number(formData.employeeCount),
    };

    if (editingDepartment) {
      setDepartments(
        departments.map((department) =>
          department.id === editingDepartment.id
            ? {
                ...department,
                ...departmentData,
              }
            : department
        )
      );
    } else {
      const newDepartment = {
        id: Date.now(),
        ...departmentData,
      };

      setDepartments([...departments, newDepartment]);
    }

    resetForm();
    setShowModal(false);
    setOpenMenu(null);
  };

  const handleView = (department) => {
    setSelectedDepartment(department);
    setOpenMenu(null);
    setShowViewModal(true);
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);

    setFormData({
      name: department.name,
      description: department.description,
      manager: department.manager,
      employeeCount: department.employeeCount,
      status: department.status,
    });

    setOpenMenu(null);
    setShowModal(true);
  };

  const handleDeleteClick = (department) => {
    setSelectedDepartment(department);
    setOpenMenu(null);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setDepartments(
      departments.filter(
        (department) => department.id !== selectedDepartment.id
      )
    );

    setSelectedDepartment(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:px-6 lg:px-12 lg:py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Departments
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage departments across your organization.
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
          Add Department
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="relative w-full sm:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />

          <input
            type="text"
            placeholder="Search departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Departments Table */}
      <div className="overflow-x-auto overflow-y-visible rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full min-w-[850px]">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/70">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Department
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Manager
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Employees
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
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((department) => (
                <tr
                  key={department.id}
                  className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  {/* Department */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <Users size={19} />
                      </div>

                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-200">
                          {department.name}
                        </p>

                        <p className="text-sm text-slate-400 dark:text-slate-500">
                          {department.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Manager */}
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {department.manager}
                  </td>

                  {/* Employee Count */}
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      {department.employeeCount} employees
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        department.status === "Active"
                          ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {department.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === department.id
                              ? null
                              : department.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === department.id && (
                        <div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg dark:border-slate-700 dark:bg-slate-900">
                          <button
                            onClick={() => handleView(department)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            <Eye size={16} />
                            View
                          </button>

                          <button
                            onClick={() => handleEdit(department)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteClick(department)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
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
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center"
                >
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    No departments found
                  </p>

                  <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                    Try searching with a different department,
                    manager, or description.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Department Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl dark:border dark:border-slate-800 dark:bg-slate-900">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {editingDepartment
                    ? "Edit Department"
                    : "Add Department"}
                </h2>

                <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                  {editingDepartment
                    ? "Update department information."
                    : "Create a new department."}
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

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Department Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Engineering"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the department..."
                  rows="3"
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20"
                />
              </div>

              {/* Manager + Employee Count */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Department Manager
                  </label>

                  <input
                    type="text"
                    name="manager"
                    value={formData.manager}
                    onChange={handleInputChange}
                    placeholder="Manager name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Employees
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              {/* Status */}
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

              {/* Buttons */}
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
                  {editingDepartment
                    ? "Save Changes"
                    : "Add Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Department Modal */}
      {showViewModal && selectedDepartment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:border dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Department Details
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
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <Users size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    {selectedDepartment.name}
                  </h3>

                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    {selectedDepartment.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                    Manager
                  </p>

                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {selectedDepartment.manager}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                    Employees
                  </p>

                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {selectedDepartment.employeeCount}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      selectedDepartment.status === "Active"
                        ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {selectedDepartment.status}
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
      {showDeleteModal && selectedDepartment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:border dark:border-slate-800 dark:bg-slate-900">
            <div className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                <Trash2 size={22} />
              </div>

              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Delete Department
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {selectedDepartment.name}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedDepartment(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteConfirm}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Delete Department
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentPage;