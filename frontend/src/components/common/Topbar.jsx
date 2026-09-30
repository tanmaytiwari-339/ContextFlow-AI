import { useEffect, useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  X,
  User,
  Settings,
  LogOut,
  FileText,
  Users,
  Building2,
  Check,
  Sun,
  Moon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );

  // Ctrl + K
  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }

      if (e.key === "Escape") {
        setSearchOpen(false);
        setNotificationOpen(false);
        setProfileOpen(false);
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const searchItems = [
    {
      name: "Employees",
      description: "Manage organization employees",
      icon: Users,
      path: "/admin/employees",
    },
    {
      name: "Departments",
      description: "Manage departments",
      icon: Building2,
      path: "/admin/departments",
    },
    {
      name: "Documents",
      description: "Manage organization documents",
      icon: FileText,
      path: "/admin/documents",
    },
    {
      name: "Profile",
      description: "Manage your profile",
      icon: User,
      path: "/admin/profile",
    },
  ];

  const filteredItems = searchItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const notifications = [
    {
      title: "Document uploaded",
      message: "Engineering Guidelines.pdf",
      time: "2 hours ago",
      icon: FileText,
    },
    {
      title: "New employee created",
      message: "Riya Sharma joined the organization",
      time: "4 hours ago",
      icon: Users,
    },
    {
      title: "Access updated",
      message: "Remote Work Policy.pdf",
      time: "6 hours ago",
      icon: Check,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSearchNavigation = (path) => {
    navigate(path);
    setSearch("");
    setSearchOpen(false);
  };

  return (
    <>
      {/* TOPBAR */}
      <header className="relative z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900">
        {/* LEFT */}
        <div className="hidden lg:block">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Admin Panel
          </p>

          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Manage your organization
          </h2>
        </div>

        {/* SEARCH */}
        <button
          onClick={() => setSearchOpen(true)}
          className="group mx-2 flex h-11 min-w-0 flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-left transition hover:border-indigo-300 hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 sm:mx-4 sm:px-4"
        >
          <Search
            size={19}
            className="mr-3 text-slate-400 transition group-hover:text-indigo-500"
          />

          <span className="min-w-0 flex-1 truncate text-sm text-slate-400">
            Search employees, documents, departments...
          </span>

          <span className="hidden rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-400 sm:block">
            Ctrl + K
          </span>
        </button>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Theme */}
          <button
            onClick={() => {
              const newMode = !darkMode;

              setDarkMode(newMode);

              if (newMode) {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            }}
            className="hidden h-10 w-20 items-center justify-center rounded-full border border-slate-200 bg-slate-50 md:flex"
            title="Toggle theme"
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
                darkMode
                  ? "bg-slate-700 text-white"
                  : "bg-white text-yellow-500 shadow-sm"
              }`}
            >
              {darkMode ? <Moon size={16} /> : <Sun size={16} />}
            </span>

            <span
              className={`ml-1 h-7 w-7 rounded-full transition ${
                darkMode
                  ? "bg-slate-800"
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
              }`}
            />
          </button>

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setProfileOpen(false);
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Bell size={22} strokeWidth={1.8} />

              {/* Notification badge */}
              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 top-14 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Notifications
                    </h3>

                    <p className="text-xs text-slate-400">
                      You have 3 new notifications
                    </p>
                  </div>

                  <button
                    onClick={() => setNotificationOpen(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div>
                  {notifications.map((notification, index) => {
                    const Icon = notification.icon;

                    return (
                      <button
                        key={index}
                        className="flex w-full gap-3 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <Icon size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-700">
                            {notification.title}
                          </p>

                          <p className="truncate text-xs text-slate-400">
                            {notification.message}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            {notification.time}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button className="w-full py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* PROFILE */}
          <div className="relative border-l border-slate-200 pl-3">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationOpen(false);
              }}
              className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-slate-50"
            >
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                A
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  Admin
                </p>

                <p className="text-xs text-slate-400 dark:text-slate-300">
                  System Administrator
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`text-slate-400 transition ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                <div className="border-b border-slate-100 px-4 py-4">
                  <p className="font-semibold text-slate-800 dark:text-white">
                    Admin
                  </p>

                  <p className="text-xs text-slate-400 dark:text-slate-300">
                    System Administrator
                  </p>
                </div>

                <button
                  onClick={() => {
                    navigate("/admin/profile");
                    setProfileOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <User size={17} />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/admin/profile");
                    setProfileOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <Settings size={17} />
                  Settings
                </button>

                <div className="border-t border-slate-100" />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-900/30 px-4 pt-24 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center border-b border-slate-100 px-5">
              <Search size={21} className="text-indigo-500" />

              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search employees, documents, departments..."
                className="h-16 flex-1 px-4 text-sm text-slate-700 outline-none"
              />

              <button
                onClick={() => {
                  setSearch("");
                  setSearchOpen(false);
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-3">
              {search.length === 0 ? (
                <div className="px-3 py-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Quick Navigation
                  </p>

                  {searchItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.name}
                        onClick={() => handleSearchNavigation(item.path)}
                        className="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition hover:bg-indigo-50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <Icon size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {item.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.name}
                      onClick={() => handleSearchNavigation(item.path)}
                      className="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition hover:bg-indigo-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <Icon size={19} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {item.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-10 text-center">
                  <Search size={30} className="mx-auto mb-3 text-slate-300" />

                  <p className="text-sm font-medium text-slate-600">
                    No results found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try searching for employees, documents or departments.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-400">
              <span>Press ESC to close</span>

              <span>Ctrl + K to open search</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Topbar;
