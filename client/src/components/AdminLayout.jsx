import { Outlet, useNavigate } from "react-router-dom";
import { removeToken } from "../api/auth";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      <div className="w-64 bg-white shadow">
        <div className="p-4 text-xl font-bold border-b">Rafflesia CMS</div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/rooms")}
            className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
          >
            Rooms
          </button>

          <button
            onClick={() => navigate("/admin/guests")}
            className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
          >
            Guests
          </button>

          <button
            onClick={() => navigate("/admin/tenants")}
            className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
          >
            Tenants
          </button>

          <button
            onClick={() => navigate("/admin/payments")}
            className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
          >
            Payments
          </button>

          <button
            onClick={() => navigate("/admin/reports")}
            className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
          >
            Reports
          </button>
        </nav>
      </div>

      {/* Main Content */}

      <div className="flex-1 flex flex-col">
        {/* Topbar */}

        <div className="bg-white shadow px-6 py-3 flex justify-between">
          <div className="font-semibold">Admin Panel</div>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}

        <div className="p-6 overflow-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
