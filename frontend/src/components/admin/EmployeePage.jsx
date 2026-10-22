import { useEffect, useState } from "react";
import api from "../../api/axios";

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

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchPositions()
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/admin/employees");

      const mappedEmployees = response.data.map((employee) => ({
        ...employee,
        empId: employee.employeeId,
        email: employee.employeeId,
        status: employee.active ? "Active" : "Inactive",
      }));

      setEmployees(mappedEmployees);
    } catch (err) {
      console.error("Failed to fetch employees:", err);

      setError(
        err.response?.data?.message ||
        "Failed to load employees. Please check the backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/api/admin/departments");
      setDepartments(response.data);
    } catch (err) {
      console.error("Failed to fetch departments:", err);
      setFormError("Could not load departments.");
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await api.get("/api/admin/positions");
      setPositions(response.data);
    } catch (err) {
      console.error("Failed to fetch positions:", err);
      setFormError("Could not load positions.");
    }
  };

  const [formData, setFormData] = useState({
      employeeId: "",
      name: "",
      password: "",
      departmentId: "",
      positionId: "",
  });
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = [
      employee.name,
      employee.employeeId,
      employee.department,
      employee.position,
    ]
      .filter(Boolean)
      .join(" ")
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
      employeeId: "",
      name: "",
      password: "",
      departmentId: "",
      positionId: "",
    });

    setFormError("");
    setEditingEmployee(null);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim()) {
      setFormError("Please enter the employee name.");
      return;
    }

    if (!formData.departmentId || !formData.positionId) {
      setFormError("Please select a department and position.");
      return;
    }

    // Validate additional fields only when creating an employee
    if (!editingEmployee) {
      if (!formData.employeeId.trim()) {
        setFormError("Please enter the employee ID.");
        return;
      }

      if (!formData.password.trim()) {
        setFormError("Please enter an initial password.");
        return;
      }
    }

    setSaving(true);

    try {
      if (editingEmployee) {
        // Update an existing employee
        const response = await api.put(
          `/api/admin/employees/${editingEmployee.id}`,
          {
            name: formData.name.trim(),
            departmentId: Number(formData.departmentId),
            positionId: Number(formData.positionId),
          }
        );

        setEmployees((previousEmployees) =>
          previousEmployees.map((employee) =>
            employee.id === editingEmployee.id
              ? {
                  ...employee,
                  ...response.data,
                  empId: response.data.employeeId,
                  email: response.data.employeeId,
                  status: response.data.active
                    ? "Active"
                    : "Inactive",
                }
              : employee
          )
        );
      } else {
        // Create a new employee
        const response = await api.post("/api/admin/employees", {
          employeeId: formData.employeeId.trim(),
          name: formData.name.trim(),
          password: formData.password,
          departmentId: Number(formData.departmentId),
          positionId: Number(formData.positionId),
        });

        if (
          typeof response.data === "string" &&
          response.data.toLowerCase().includes("already exists")
        ) {
          setFormError("This employee ID already exists.");
          return;
        }

        await fetchEmployees();
      }

      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Employee save error:", error);

      setFormError(
        error.response?.data?.message ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : "Unable to save employee. Please try again.")
      );
    } finally {
      setSaving(false);
    }
  };


  const handleEdit = (employee) => {
    setEditingEmployee(employee);

    const selectedDepartment = departments.find(
      (item) => item.name === employee.department
    );

    const selectedPosition = positions.find(
      (item) => item.name === employee.position
    );

    setFormData({
      employeeId: employee.employeeId,
      name: employee.name,
      password: "",
      departmentId: selectedDepartment
        ? String(selectedDepartment.id)
        : "",
      positionId: selectedPosition
        ? String(selectedPosition.id)
        : "",
    });

    setFormError("");
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

  
  const handleDeleteConfirm = async () => {
      if (!selectedEmployee) return;

      try {
        await api.delete(
          `/api/admin/employees/${selectedEmployee.id}`
        );

        // Update the list only after the backend confirms deletion
        setEmployees((previousEmployees) =>
          previousEmployees.filter(
            (employee) => employee.id !== selectedEmployee.id
          )
        );

        setSelectedEmployee(null);
        setShowDeleteModal(false);
        setError("");
      } catch (err) {
        console.error("Failed to delete employee:", err);

        const message =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          (typeof err.response?.data === "string"
            ? err.response.data
            : "Failed to delete employee. Please try again.");

        setError(message);
        setShowDeleteModal(false);
        setSelectedEmployee(null);
      }
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
            placeholder="Search by name or employee ID..."
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

      {loading && (
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Loading employees...
        </p>
      )}

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </p>
      )}

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
            {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-sm text-slate-500">
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.length > 0 ? (
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
                          ID: {employee.employeeId}
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
              {/* Employee ID */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Employee ID / Login ID
                </label>

                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="EMP1004"
                  required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                />
              </div>

              {/* Full Name */}
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
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                />
              </div>

              {/* Initial Password */}
              <div>
                {!editingEmployee && (
                  <>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Initial Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter initial password"
                      autoComplete="new-password"
                      required
                      disabled={!!editingEmployee}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    />
                  </>
                )}
              </div>

              {/* Department and Position */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Department
                  </label>

                  <select
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <option value="">Select department</option>

                    {departments.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Position
                  </label>

                  <select
                    name="positionId"
                    value={formData.positionId}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <option value="">Select position</option>

                    {positions.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Error message */}
              {formError && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                  {formError}
                </p>
              )}

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
                  disabled={saving}
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingEmployee
                      ? "Save Changes"
                      : "Add Employee"}
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