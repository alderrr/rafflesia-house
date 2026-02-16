import { useState, useEffect } from "react";
import api from "../../api/api";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    activeTenants: 0,
    totalDepositHeld: 0,
    monthlyRevenueProjection: 0,
  });

  const fetchDashboard = async () => {
    try {
      const response = await api.get("api/v1/admin/dashboard");
      setStats(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          <Card title="Total Rooms" value={stats.totalRooms} />
          <Card title="Active Tenants" value={stats.activeTenants} />
          {/* ADD HERE */}
        </div>
      </div>
    </>
  );
};

const Card = ({ title, value }) => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
        <div className="text-gray-400">{title}</div>
        <div className="text-3xl font-bold mt-2">{value}</div>
      </div>
    </>
  );
};

export default DashboardPage;
