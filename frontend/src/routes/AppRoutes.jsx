import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import EmployeePage from "../pages/admin/EmployeePage";
import DepartmentPage from "../pages/admin/DepartmentPage";
import PositionPage from "../pages/admin/PositionPage";
import DocumentPage from "../pages/admin/DocumentPage";
import AccessControlPage from "../pages/admin/AccessControlPage";

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
      <Route
        path="/admin/positions"
        element={
          <AdminLayout>
            <PositionPage />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/documents"
        element={
          <AdminLayout>
            <DocumentPage />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/access-control"
        element={
          <AdminLayout>
            <AccessControlPage />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
