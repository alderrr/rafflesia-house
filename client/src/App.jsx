import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/admin/LoginPage";

import DashboardPage from "./pages/admin/DashboardPage";
import RoomsPage from "./pages/admin/RoomsPage";
import GuestsPage from "./pages/admin/GuestsPage";
import TenantsPage from "./pages/admin/TenantsPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import ReportsPage from "./pages/admin/ReportsPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />

        {/* LOGIN */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* PROTECTED */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="guests" element={<GuestsPage />} />
          <Route path="tenants" element={<TenantsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
