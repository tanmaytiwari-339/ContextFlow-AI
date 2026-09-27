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

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
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
    <div className="min-h-screen bg-slate-100 px-12 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your account information and security settings.
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <UserCircle size={48} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                {profile.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {profile.email}
              </p>

              <span className="mt-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
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
        <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="font-semibold text-slate-800">
              Personal Information
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Your account and organizational information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase text-slate-400">
                Full Name
              </p>

              <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
                <UserCircle
                  size={18}
                  className="text-slate-400"
                />

                <span className="text-sm text-slate-700">
                  {profile.name}
                </span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase text-slate-400">
                Email
              </p>

              <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
                <Mail
                  size={18}
                  className="text-slate-400"
                />

                <span className="text-sm text-slate-700">
                  {profile.email}
                </span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase text-slate-400">
                Role
              </p>

              <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
                <ShieldCheck
                  size={18}
                  className="text-slate-400"
                />

                <span className="text-sm text-slate-700">
                  {profile.role}
                </span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase text-slate-400">
                Department
              </p>

              <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-slate-300 text-[10px] text-white">
                  D
                </span>

                <span className="text-sm text-slate-700">
                  {profile.department}
                </span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase text-slate-400">
                Phone
              </p>

              <div className="rounded-lg bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-700">
                  {profile.phone}
                </span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase text-slate-400">
                Account Status
              </p>

              <div className="px-1 py-3">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="font-semibold text-slate-800">
              Security
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Manage your account security.
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Lock size={20} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-700">
              Password
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Keep your account secure by regularly updating your
              password.
            </p>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              <Lock size={16} />
              Change Password
            </button>
          </div>

          <div className="mt-5 rounded-lg border border-green-100 bg-green-50 p-4">
            <p className="text-sm font-medium text-green-700">
              Account secured
            </p>

            <p className="mt-1 text-xs leading-5 text-green-600">
              Your account is currently active and protected.
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Update your profile information.
                </p>
              </div>

              <button
                onClick={() => setShowEditModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSaveProfile}
              className="space-y-5 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={editData.department}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
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
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Change Password
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Update your account password.
                </p>
              </div>

              <button
                onClick={() => setShowPasswordModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-5 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Current Password
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
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