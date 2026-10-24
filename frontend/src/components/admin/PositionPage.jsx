
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

function PositionPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [editingPosition, setEditingPosition] = useState(null);

  const [positions, setPositions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
    employees: 0,
    status: "Active",
  });

  // Load positions from the backend
  const fetchPositions = async () => {
    try {
      setError("");

      const response = await api.get("/admin/positions");

      const mappedPositions = response.data.map((position) => ({
        id: position.id,
        title: position.name,
        department: "—",
        description: "",
        employees: 0,
        status: "Active",
      }));

      setPositions(mappedPositions);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          err.response?.data?.title ||
          "Failed to load positions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const filteredPositions = positions.filter((position) => {
    const matchesSearch = `${position.title} ${position.department} ${position.description}`
      .toLowerCase()
      .includes(search.toLowerCase());

    // Department filtering is not supported by the current backend model.
    const matchesDepartment = department === "All Departments";

    return matchesSearch && matchesDepartment;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
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

  // Create or update a position in MySQL
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Position title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        name: formData.title.trim(),
      };

      if (editingPosition) {
        await api.put(
          `/admin/positions/${editingPosition.id}`,
          payload
        );
      } else {
        await api.post("/admin/positions", payload);
      }

      await fetchPositions();

      resetForm();
      setShowModal(false);
      setOpenMenu(null);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          err.response?.data?.title ||
          "Failed to save position."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (position) => {
    setError("");
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
    setError("");
    setSelectedPosition(position);
    setOpenMenu(null);
    setShowDeleteModal(true);
  };

  // Delete a position from MySQL
  const handleDeleteConfirm = async () => {
    if (!selectedPosition) return;

    try {
      setDeleting(true);
      setError("");

      await api.delete(`/admin/positions/${selectedPosition.id}`);

      setShowDeleteModal(false);
      setSelectedPosition(null);

      await fetchPositions();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          err.response?.data?.title ||
          "Failed to delete position."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-12 py-8 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Positions
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage job positions across your organization.
          </p>
        </div>

        <button
          onClick={() => {
            setError("");
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Position
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
        >
          <div className="flex items-start justify-between gap-3">
            <p>{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0"
              aria-label="Dismiss error"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Loading Message */}
      {loading && (
        <p className="mb-4 text-sm text-slate-500">
          Loading positions...
        </p>
      )}

      {/* Search + Filter */}
      <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="relative w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />

          <input
            type="text"
            placeholder="Search positions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20"
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
          <option>AI &amp; ML</option>
          <option>HR</option>
        </select>
      </div>

      {/* Positions Table */}
      <div className="overflow-visible rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Position
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Department
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
            {!loading && filteredPositions.length > 0 ? (
              filteredPositions.map((position) => (
                <tr
                  key={position.id}
                  className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-200">
                        {position.title}
                      </p>

                      <p className="mt-1 max-w-md truncate text-sm text-slate-400 dark:text-slate-500">
                        {position.description}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {position.department}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {position.employees}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        position.status === "Active"
                          ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
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
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === position.id && (
                        <div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg dark:border-slate-700 dark:bg-slate-900">
                          <button
                            onClick={() => handleView(position)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            <Eye size={16} />
                            View
                          </button>

                          <button
                            onClick={() => handleEdit(position)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteClick(position)}
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
            ) : !loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    No positions found
                  </p>

                  <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                    Try searching with a different position.
                  </p>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Position Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {editingPosition ? "Edit Position" : "Add Position"}
                </h2>

                <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                  {editingPosition
                    ? "Update position information."
                    : "Add a new position to your organization."}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                  setError("");
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Position Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Software Engineer"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20"
                />
              </div>

              <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                Only the position title is currently saved in the database.
                Department, description, employee count, and status are not
                persisted by the current backend.
              </p>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                    setError("");
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingPosition
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
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Position Details
              </h2>

              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Position
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-800 dark:text-white">
                  {selectedPosition.title}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Department
                </p>

                <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                  {selectedPosition.department}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Description
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {selectedPosition.description || "Not stored yet."}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Employees
                </p>

                <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                  {selectedPosition.employees}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Status
                </p>

                <span className="mt-1 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-500/10 dark:text-green-400">
                  {selectedPosition.status}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 px-6 py-4 text-right dark:border-slate-700">
              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600"
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
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-slate-900">
            <div className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                <Trash2 size={22} />
              </div>

              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Delete Position
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {selectedPosition.title}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-700">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedPosition(null);
                  setError("");
                }}
                disabled={deleting}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete Position"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PositionPage;
