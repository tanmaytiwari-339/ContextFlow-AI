import { Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Dashboard</h1>} />
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/upload" element={<h1>Upload</h1>} />
    </Routes>
  );
}

export default AppRoutes;