import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-64">
        <Topbar />

        <main>{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;