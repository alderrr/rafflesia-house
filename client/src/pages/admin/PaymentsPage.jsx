import { useState, useEffect } from "react";
import CreatePaymentModal from "../../components/CreatePaymentModal";
import api from "../../api/api";

const PaymentsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payments, setPayments] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const [paymentRes, tenantRes, guestRes, roomRes] = await Promise.all([
        api.get("/api/v1/admin/payments"),
        api.get("/api/v1/admin/tenants"),
        api.get("/api/v1/admin/guests"),
        api.get("/api/v1/admin/rooms"),
      ]);
      setPayments(paymentRes.data);
      setTenants(tenantRes.data);
      setGuests(guestRes.data);
      setRooms(roomRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getGuestName = (tenantId) => {
    const tenant = tenants.find((t) => t._id === tenantId);
    if (!tenant) return "-";
    const guest = guests.find((g) => g._id === tenant.guestId);
    return guest?.name || "-";
  };

  const getRoomNumber = (tenantId) => {
    const tenant = tenants.find((t) => t._id === tenantId);
    if (!tenant) return "-";
    const room = rooms.find((r) => r._id === tenant.roomId);
    return room?.roomNumber || "-";
  };

  if (loading) return <div>Loading payments...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <div>
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Payments</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Payment
          </button>
        </div>

        {/* EMPTY */}
        {!loading && payments.length === 0 && (
          <div className="bg-white p-6 rounded shadow text-gray-500">
            No payments found.
          </div>
        )}

        {/* TABLE */}
        {!loading && payments.length > 0 && (
          <div className="bg-white rounded shadow overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Guest</th>
                  <th className="p-3 text-left">Room</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Note</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-t">
                    <td className="p-3">{getGuestName(payment.tenantId)}</td>
                    <td className="p-3">{getRoomNumber(payment.tenantId)}</td>
                    <td className="p-3">{payment.type}</td>
                    <td className="p-3">Rp {payment.amount}</td>
                    <td className="p-3">
                      {new Date(payment.paidAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">{payment.note || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <CreatePaymentModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchData}
        />
      )}
    </>
  );
};

export default PaymentsPage;
