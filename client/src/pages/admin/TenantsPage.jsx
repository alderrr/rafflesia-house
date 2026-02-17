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

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckout = async (tenant) => {
    const confirmCheckout = window.confirm("Checkout this tenant?");
    if (!confirmCheckout) return;
    try {
      await api.patch(`/api/v1/admin/tenants/${tenant._id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (tenant) => {
    const confirmDelete = window.confirm("Delete this tenant?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/api/v1/admin/tenants/${tenant._id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete tenant");
    }
  };

  const getGuestName = (guestId) => {
    const guest = guests.find((g) => g._id === guestId);
    return guest?.name || "-";
  };

  const getRoomNumber = (roomId) => {
    const room = rooms.find((r) => r._id === roomId);
    return room?.roomNumber || "-";
  };

  const formatCurrency = (value) => "Rp " + Number(value).toLocaleString();

  const isOverdue = (tenant) =>
    tenant.isActive && new Date(tenant.nextPaymentDate) < new Date();

  if (loading) return <div>Loading tenants...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <div>
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Tenants</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Check-in Tenant
          </button>
        </div>

        {/* EMPTY */}
        {!loading && tenants.length === 0 && (
          <div className="bg-white p-6 rounded shadow text-gray-500">
            No tenants found.
          </div>
        )}

        {/* TABLE */}
        {!loading && tenants.length > 0 && (
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Guest</th>
                  <th className="p-3 text-left">Room</th>
                  <th className="p-3 text-left">Payment</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Deposit</th>
                  <th className="p-3 text-left">Next Payment</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant._id} className="border-t">
                    <td className="p-3">{getGuestName(tenant.guestId)}</td>
                    <td className="p-3">{getRoomNumber(tenant.roomId)}</td>
                    <td className="p-3">{tenant.paymentType}</td>
                    <td className="p-3">{formatCurrency(tenant.price)}</td>
                    <td className="p-3">
                      {formatCurrency(tenant.depositPaid)}
                      <br />
                      <span className="text-xs">
                        {tenant.depositReturned ? "Returned" : "Held"}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(tenant.nextPaymentDate).toLocaleDateString()}

                      {isOverdue(tenant) && (
                        <div className="text-red-500 text-xs font-bold">
                          OVERDUE
                        </div>
                      )}
                    </td>

                    <td className="p-3">
                      {tenant.isActive ? "Active" : "Checked-out"}
                    </td>

                    <td className="p-3 space-x-2">
                      {tenant.isActive && (
                        <button
                          onClick={() => handleCheckout(tenant)}
                          className="text-blue-500"
                        >
                          Checkout
                        </button>
                      )}

                      {!tenant.isActive && (
                        <button
                          onClick={() => handleDelete(tenant)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
