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

function PositionPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [editingPosition, setEditingPosition] = useState(null);

  const [positions, setPositions] = useState([
    {
      id: 1,
      title: "Software Engineer",
      department: "Engineering",
      description: "Develop and maintain software applications.",
      employees: 24,
      status: "Active",
    },
    {
      id: 2,
      title: "Senior Software Engineer",
      department: "Engineering",
      description: "Lead software development and technical initiatives.",
      employees: 12,
      status: "Active",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      description: "Design user interfaces and digital experiences.",
      employees: 8,
      status: "Active",
    },
    {
      id: 4,
      title: "ML Engineer",
      department: "AI & ML",
      description: "Build and deploy machine learning solutions.",
      employees: 10,
      status: "Active",
    },
    {
      id: 5,
      title: "HR Manager",
      department: "HR",
      description: "Manage employee relations and HR operations.",
      employees: 4,
      status: "Inactive",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
    employees: 0,
    status: "Active",
  });

  const filteredPositions = positions.filter((position) => {
    const matchesSearch =
      `${position.title} ${position.department} ${position.description}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesDepartment =
      department === "All Departments" ||
      position.department === department;

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
      title: "",
      department: "",
      description: "",
      employees: 0,
      status: "Active",
    });

    setEditingPosition(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.department) {
      return;
    }

    if (editingPosition) {
      setPositions(
        positions.map((position) =>
          position.id === editingPosition.id
            ? {
                ...position,
                ...formData,
                employees: Number(formData.employees),
              }
            : position
        )
      );
    } else {
      const newPosition = {
        id: Date.now(),
        ...formData,
        employees: Number(formData.employees),
      };

      setPositions([...positions, newPosition]);
    }

    resetForm();
    setShowModal(false);
    setOpenMenu(null);
  };

  const handleEdit = (position) => {
    setEditingPosition(position);

    setFormData({
      title: position.title,
      department: position.department,
      description: position.description,
      employees: position.employees,
      status: position.status,
    });

    setOpenMenu(null);
    setShowModal(true);
  };

  const handleView = (position) => {
    setSelectedPosition(position);
    setOpenMenu(null);
    setShowViewModal(true);
  };

  const handleDeleteClick = (position) => {
    setSelectedPosition(position);
    setOpenMenu(null);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setPositions(
      positions.filter(
        (position) => position.id !== selectedPosition.id
      )
    );

    setSelectedPosition(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-12 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Positions
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage job positions across your organization.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Position
        </button>
      </div>

      {/* Search + Filter */}
      <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
        <div className="relative w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search positions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none"
        >
          <option>All Departments</option>
          <option>Engineering</option>
          <option>Design</option>
          <option>AI & ML</option>
          <option>HR</option>
        </select>
      </div>

      {/* Positions Table */}
      <div className="overflow-visible rounded-xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Position
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Department
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Employees
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredPositions.length > 0 ? (
              filteredPositions.map((position) => (
                <tr
                  key={position.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-700">
                        {position.title}
                      </p>

                      <p className="mt-1 max-w-md truncate text-sm text-slate-400">
                        {position.description}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {position.department}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {position.employees}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        position.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {position.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === position.id
                              ? null
                              : position.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === position.id && (
                        <div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg">
                          <button
                            onClick={() => handleView(position)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                          >
                            <Eye size={16} />
                            View
                          </button>

                          <button
                            onClick={() => handleEdit(position)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteClick(position)
                            }
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
                  <p className="text-sm font-medium text-slate-500">
                    No positions found
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Try searching with a different position or
                    department.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Position Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {editingPosition
                    ? "Edit Position"
                    : "Add Position"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {editingPosition
                    ? "Update position information."
                    : "Add a new position to your organization."}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Position Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Software Engineer"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Department
                </label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">
                    Engineering
                  </option>
                  <option value="Design">Design</option>
                  <option value="AI & ML">AI & ML</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the responsibilities of this position..."
                  rows="4"
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Employees
                  </label>

                  <input
                    type="number"
                    name="employees"
                    min="0"
                    value={formData.employees}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  {editingPosition
                    ? "Save Changes"
                    : "Add Position"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Position Modal */}
      {showViewModal && selectedPosition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Position Details
              </h2>

              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Position
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-800">
                  {selectedPosition.title}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Department
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {selectedPosition.department}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Description
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {selectedPosition.description ||
                    "No description provided."}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Employees
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {selectedPosition.employees}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Status
                </p>

                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    selectedPosition.status === "Active"
                      ? "bg-green-50 text-green-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {selectedPosition.status}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 px-6 py-4 text-right">
              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPosition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>

              <h2 className="text-lg font-semibold text-slate-800">
                Delete Position
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-700">
                  {selectedPosition.title}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedPosition(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteConfirm}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete Position
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PositionPage;