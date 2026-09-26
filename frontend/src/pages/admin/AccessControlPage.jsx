import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  X,
  Eye,
  Pencil,
  Trash2,
  ShieldCheck,
  Users,
  Check,
} from "lucide-react";

function AccessControlPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editingRole, setEditingRole] = useState(null);

  const permissions = [
    "View Documents",
    "Upload Documents",
    "Edit Documents",
    "Delete Documents",
    "Manage Employees",
    "Manage Departments",
    "Manage Positions",
    "Manage Access",
    "View Analytics",
  ];

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Administrator",
      description: "Full access to the organization.",
      users: 3,
      status: "Active",
      permissions: [...permissions],
    },
    {
      id: 2,
      name: "HR Manager",
      description: "Manage employees and HR documents.",
      users: 5,
      status: "Active",
      permissions: [
        "View Documents",
        "Upload Documents",
        "Edit Documents",
        "Manage Employees",
        "View Analytics",
      ],
    },
    {
      id: 3,
      name: "Department Manager",
      description: "Manage department resources and documents.",
      users: 8,
      status: "Active",
      permissions: [
        "View Documents",
        "Upload Documents",
        "Manage Employees",
        "View Analytics",
      ],
    },
    {
      id: 4,
      name: "Employee",
      description: "Basic access to organizational resources.",
      users: 108,
      status: "Active",
      permissions: ["View Documents"],
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    users: 0,
    status: "Active",
    permissions: [],
  });

  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      `${role.name} ${role.description}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All Roles" || role.name === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePermission = (permission) => {
    setFormData((prev) => {
      const exists = prev.permissions.includes(permission);

      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter(
              (item) => item !== permission
            )
          : [...prev.permissions, permission],
      };
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      users: 0,
      status: "Active",
      permissions: [],
    });

    setEditingRole(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      return;
    }

    if (editingRole) {
      setRoles(
        roles.map((role) =>
          role.id === editingRole.id
            ? {
                ...role,
                ...formData,
                users: Number(formData.users),
              }
            : role
        )
      );
    } else {
      const newRole = {
        id: Date.now(),
        ...formData,
        users: Number(formData.users),
      };

      setRoles([...roles, newRole]);
    }

    resetForm();
    setShowModal(false);
    setOpenMenu(null);
  };

  const handleEdit = (role) => {
    setEditingRole(role);

    setFormData({
      name: role.name,
      description: role.description,
      users: role.users,
      status: role.status,
      permissions: [...role.permissions],
    });

    setOpenMenu(null);
    setShowModal(true);
  };

  const handleView = (role) => {
    setSelectedRole(role);
    setOpenMenu(null);
    setShowViewModal(true);
  };

  const handleDeleteClick = (role) => {
    setSelectedRole(role);
    setOpenMenu(null);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setRoles(
      roles.filter(
        (role) => role.id !== selectedRole.id
      )
    );

    setSelectedRole(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-12 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Access Control
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage roles and permissions across your organization.
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
          Add Role
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
            placeholder="Search roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none"
        >
          <option>All Roles</option>
          {roles.map((role) => (
            <option key={role.id}>{role.name}</option>
          ))}
        </select>
      </div>

      {/* Role Table */}
      <div className="overflow-visible rounded-xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Role
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Users
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Permissions
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
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role) => (
                <tr
                  key={role.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <ShieldCheck size={20} />
                      </div>

                      <div>
                        <p className="font-medium text-slate-700">
                          {role.name}
                        </p>

                        <p className="text-sm text-slate-400">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} />
                      {role.users}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                      {role.permissions.length} permissions
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        role.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {role.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === role.id
                              ? null
                              : role.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === role.id && (
                        <div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg">
                          <button
                            onClick={() => handleView(role)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                          >
                            <Eye size={16} />
                            View
                          </button>

                          <button
                            onClick={() => handleEdit(role)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteClick(role)
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
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center"
                >
                  <p className="text-sm font-medium text-slate-500">
                    No roles found
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Try searching with a different role.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Role Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-8">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {editingRole ? "Edit Role" : "Add Role"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {editingRole
                    ? "Update role and permissions."
                    : "Create a new role for your organization."}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
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
                  Role Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Content Manager"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what this role is responsible for..."
                  rows="3"
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Assigned Users
                  </label>

                  <input
                    type="number"
                    name="users"
                    min="0"
                    value={formData.users}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
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

              {/* Permissions */}
              <div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Permissions
                  </label>

                  <p className="mt-1 text-xs text-slate-400">
                    Select the permissions this role should have.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 rounded-lg border border-slate-200 p-3 md:grid-cols-2">
                  {permissions.map((permission) => {
                    const checked =
                      formData.permissions.includes(
                        permission
                      );

                    return (
                      <button
                        type="button"
                        key={permission}
                        onClick={() =>
                          togglePermission(permission)
                        }
                        className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                          checked
                            ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{permission}</span>

                        {checked && (
                          <Check
                            size={16}
                            className="text-indigo-600"
                          />
                        )}
                      </button>
                    );
                  })}
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
                  {editingRole
                    ? "Save Changes"
                    : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Role Modal */}
      {showViewModal && selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-8">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Role Details
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {selectedRole.name}
                </p>
              </div>

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
                  Description
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {selectedRole.description ||
                    "No description provided."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Assigned Users
                  </p>

                  <p className="mt-1 text-xl font-semibold text-slate-800">
                    {selectedRole.users}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Permissions
                  </p>

                  <p className="mt-1 text-xl font-semibold text-slate-800">
                    {selectedRole.permissions.length}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase text-slate-400">
                  Permissions
                </p>

                <div className="space-y-2">
                  {selectedRole.permissions.length > 0 ? (
                    selectedRole.permissions.map(
                      (permission) => (
                        <div
                          key={permission}
                          className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700"
                        >
                          <Check size={16} />
                          {permission}
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-sm text-slate-400">
                      No permissions assigned.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Status
                </p>

                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    selectedRole.status === "Active"
                      ? "bg-green-50 text-green-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {selectedRole.status}
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

      {/* Delete Modal */}
      {showDeleteModal && selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>

              <h2 className="text-lg font-semibold text-slate-800">
                Delete Role
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-700">
                  {selectedRole.name}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedRole(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteConfirm}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessControlPage;