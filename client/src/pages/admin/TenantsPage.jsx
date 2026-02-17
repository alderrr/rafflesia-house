import { useState, useEffect } from "react";
import CreateTenantModal from "../../components/CreateTenantModal";
import api from "../../api/api";

const TenantsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const [tenantRes, guestRes, roomRes] = await Promise.all([
        api.get("/api/v1/admin/tenants"),
        api.get("/api/v1/admin/guests"),
        api.get("/api/v1/admin/rooms"),
      ]);
      setTenants(tenantRes.data);
      setGuests(guestRes.data);
      setRooms(roomRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tenants");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (tenant) => {
    const confirmCheckout = window.confirm("Checkout this tenant?");
    if (!confirmCheckout) return;
    await api.patch(`/api/v1/admin/tenants/${tenant._id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getGuestName = (guestId) => {
    const guest = guests.find((g) => g._id === guestId);
    return guest?.name || "-";
  };
  const getRoomNumber = (roomId) => {
    const room = rooms.find((r) => r._id === roomId);
    return room?.roomNumber || "-";
  };
  if (loading) return <div>Loading tenants...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <div>
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Tenants</h1>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Check-in Tenant
          </button>
        </div>

        <div className="bg-white rounded shadow overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Guest</th>
                <th className="p-3">Room</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Check-in</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant._id} className="border-t">
                  <td className="p-3">{getGuestName(tenant.guestId)}</td>
                  <td className="p-3">{getRoomNumber(tenant.roomId)}</td>
                  <td className="p-3">{tenant.paymentType}</td>
                  <td className="p-3">
                    {new Date(tenant.checkInDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {tenant.isActive ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-gray-500">Checked-out</span>
                    )}
                  </td>

                  <td className="p-3">
                    {tenant.isActive && (
                      <button
                        onClick={() => handleCheckout(tenant)}
                        className="text-red-500"
                      >
                        Check-out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <CreateTenantModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchData}
        />
      )}
    </>
  );
};

export default TenantsPage;
