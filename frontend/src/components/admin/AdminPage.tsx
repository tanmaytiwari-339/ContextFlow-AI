import React from 'react';
import { EmployeeItem } from '../../types';
import AdminLayout from '../common/AdminLayout';

import { Routes, Route, Navigate } from 'react-router-dom';

import AdminDashboard from './AdminDashboard';
import EmployeePage from './EmployeePage';
import DepartmentPage from './DepartmentPage';
import PositionPage from './PositionPage';
import DocumentPage from './DocumentPage';
import AccessControlPage from './AccessControlPage';
import AnalyticsPage from './AnalyticsPage';
import ProfilePage from './ProfilePage';

interface AdminPageProps {
  currentUser?: EmployeeItem;
  onSignOut: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  currentUser,
  onSignOut,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Plus_Jakarta_Sans',sans-serif]">
      <AdminLayout>
        <Routes>
          <Route path="/admin" element={<AdminDashboard currentUser={currentUser} />} />

          <Route
            path="/admin/employees"
            element={<EmployeePage />}
          />

          <Route
            path="/admin/departments"
            element={<DepartmentPage />}
          />

          <Route
            path="/admin/positions"
            element={<PositionPage />}
          />

          <Route
            path="/admin/documents"
            element={<DocumentPage />}
          />

          <Route
            path="/admin/access-control"
            element={<AccessControlPage />}
          />

          <Route
            path="/admin/analytics"
            element={<AnalyticsPage />}
          />

          <Route
            path="/admin/profile"
            element={<ProfilePage />}
          />

          <Route
            path="*" 
            element={<Navigate to="/admin" replace />} 
          />

        </Routes>
      </AdminLayout>
    </div>
  );
};

export default AdminPage;