import { useState, useEffect } from "react";
import api from "../api/api";

const CreateTenantModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [guestId, setGuestId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [paymentType, setPaymentType] = useState("monthly");
  const [checkInDate, setCheckInDate] = useState("");

  const fetchData = async () => {
    try {
      const [guestRes, roomRes] = await Promise.all([
        api.get("/api/v1/admin/guests"),
        api.get("/api/v1/admin/rooms"),
      ]);
      setGuests(guestRes.data);
      setRooms(roomRes.data.filter((room) => room.isAvailable)); // only available rooms
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!guestId || !roomId || !paymentType) {
      alert("Guest, Room, and Payment Type are required"); // CHANGE ALERT LATER
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/v1/admin/tenants", {
        guestId,
        roomId,
        paymentType,
        checkInDate: checkInDate || new Date(),
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      // alert(err.response?.data?.message || "Failed to create tenant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow w-96 max-h-[90vh] overflow-auto">
          <h2 className="text-xl font-bold mb-4">Check-in Tenant</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Guest */}
            <select
              className="w-full border p-2"
              value={guestId}
              onChange={(e) => setGuestId(e.target.value)}
            >
              <option value="">Select Guest</option>
              {guests.map((guest) => (
                <option key={guest._id} value={guest._id}>
                  {guest.name}
                </option>
              ))}
            </select>

            {/* Room */}
            <select
              className="w-full border p-2"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.roomNumber} — Rp {room.priceMonthly}
                </option>
              ))}
            </select>

            {/* Payment Type */}
            <select
              className="w-full border p-2"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="daily">Daily</option>
            </select>

            {/* Check-in Date */}
            <input
              type="date"
              className="w-full border p-2"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border"
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Creating..." : "Check-in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTenantModal;
