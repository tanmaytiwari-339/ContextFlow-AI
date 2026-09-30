import { useState } from "react";

import {
  UserCircle,
  Mail,
  ShieldCheck,
  Pencil,
  Lock,
  Save,
  X,
} from "lucide-react";

function ProfilePage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@contextflow.com",
    role: "Administrator",
    department: "Administration",
    phone: "+91 98765 43210",
  });

  const [editData, setEditData] = useState(profile);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(editData);
    setShowEditModal(false);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowPasswordModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-12 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your account information and security settings.
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <UserCircle size={48} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                {profile.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {profile.email}
              </p>

              <span className="mt-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                {profile.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setEditData(profile);
              setShowEditModal(true);
            }}
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <Pencil size={17} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Information + Security */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Personal Information */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 xl:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="font-semibold text-slate-800 dark:text-white">
              Personal Information
            </h2>

            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Your account and organizational information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Full Name */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase text-slate-400 dark:text-slate-500">
                Full Name
              </p>

              <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800">
                <UserCircle
                  size={18}
                  className="text-slate-400 dark:text-slate-500"
                />

                <span className="text-sm text-slate-700 dark:text-slate-200">
                  {profile.name}
                </span>
              </div>
            </div>

            {/* Email */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase text-slate-400 dark:text-slate-500">
                Email
              </p>

              <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800">
                <Mail
                  size={18}
                  className="text-slate-400 dark:text-slate-500"
                />

                <span className="text-sm text-slate-700 dark:text-slate-200">
                  {profile.email}
                </span>
              </div>
            </div>

            {/* Role */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase text-slate-400 dark:text-slate-500">
                Role
              </p>

              <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800">
                <ShieldCheck
                  size={18}
                  className="text-slate-400 dark:text-slate-500"
                />

                <span className="text-sm text-slate-700 dark:text-slate-200">
                  {profile.role}
                </span>
              </div>
            </div>

            {/* Department */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase text-slate-400 dark:text-slate-500">
                Department
              </p>

              <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800">
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-slate-300 text-[10px] text-white dark:bg-slate-600">
                  D
                </span>

                <span className="text-sm text-slate-700 dark:text-slate-200">
                  {profile.department}
                </span>
              </div>
            </div>

            {/* Phone */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase text-slate-400 dark:text-slate-500">
                Phone
              </p>

              <div className="rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800">
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  {profile.phone}
                </span>
              </div>
            </div>

            {/* Account Status */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase text-slate-400 dark:text-slate-500">
                Account Status
              </p>

              <div className="px-1 py-3">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-500/10 dark:text-green-400">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="font-semibold text-slate-800 dark:text-white">
              Security
            </h2>

            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Manage your account security.
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Lock size={20} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Password
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-400 dark:text-slate-500">
              Keep your account secure by regularly updating your password.
            </p>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <Lock size={16} />
              Change Password
            </button>
          </div>

          <div className="mt-5 rounded-lg border border-green-100 bg-green-50 p-4 dark:border-green-900/40 dark:bg-green-500/10">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              Account secured
            </p>

            <p className="mt-1 text-xs leading-5 text-green-600 dark:text-green-500">
              Your account is currently active and protected.
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                  Update your profile information.
                </p>
              </div>

              <button
                onClick={() => setShowEditModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSaveProfile}
              className="space-y-5 p-6"
            >
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-500/20"
                />
              </div>

              {/* Department */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={editData.department}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-500/20"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Change Password
                </h2>

                <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                  Update your account password.
                </p>
              </div>

              <button
                onClick={() => setShowPasswordModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-5 p-6"
            >
              {/* Current Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Current Password
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-500/20"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-500/20"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <Lock size={16} />
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;