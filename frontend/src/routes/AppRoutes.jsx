import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import EmployeePage from "../pages/admin/EmployeePage";
import DepartmentPage from "../pages/admin/DepartmentPage";

import AdminLayout from "../components/layout/AdminLayout";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/employees"
        element={
          <AdminLayout>
            <EmployeePage />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/departments"
        element={
          <AdminLayout>
            <DepartmentPage />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
