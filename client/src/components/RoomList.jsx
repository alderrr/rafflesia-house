import { useEffect, useState } from "react";
import api from "../services/api";

function RoomList({ onEdit, refreshKey }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchRooms = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await api.get("/rooms/admin/list");

        if (mounted) {
          setRooms(res.data.data);
        }
      } catch (error) {
        if (mounted) {
          setErrorMsg(error.response?.data?.message || "Failed to load rooms");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchRooms();

    return () => {
      mounted = false;
    };
  }, [refreshKey]);

  const toggleAvailability = async (id) => {
    try {
      const res = await api.patch(`/rooms/${id}/toggle-availability`);

      setRooms((prev) =>
        prev.map((room) => (room.id === id ? res.data.data : room)),
      );
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Failed to update availability",
      );
    }
  };

  const deactivateRoom = async (id) => {
    try {
      const res = await api.patch(`/rooms/${id}/deactivate`);

      setRooms((prev) =>
        prev.map((room) => (room.id === id ? res.data.data : room)),
      );
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Failed to deactivate room");
    }
  };

  if (loading) return <p>Loading rooms...</p>;

  return (
    <div className="card-base overflow-hidden">
      {errorMsg && (
        <div className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMsg}
        </div>
      )}

      <div className="hidden md:grid md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 border-b border-[var(--color-border)] px-4 py-3 text-sm font-medium">
        <span>Room</span>
        <span>Monthly</span>
        <span>AC</span>
        <span>Available</span>
        <span>Active</span>
        <span>Actions</span>
      </div>

      <div className="divide-y divide-[var(--color-border)]">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="grid gap-3 px-4 py-4 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] md:items-center"
          >
            <div>
              <p className="font-medium">{room.name}</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Daily: Rp {Number(room.priceDaily).toLocaleString("id-ID")}
              </p>
              {room.notes ? (
                <p className="mt-1 line-clamp-2 text-sm text-[var(--color-text-muted)]">
                  {room.notes}
                </p>
              ) : null}
            </div>

            <div>Rp {Number(room.priceMonthly).toLocaleString("id-ID")}</div>
            <div>{room.hasAC ? "AC" : "Non AC"}</div>
            <div>{room.isAvailable ? "Available" : "Unavailable"}</div>
            <div>{room.isActive ? "Active" : "Inactive"}</div>

            <div className="flex flex-wrap gap-2">
              <button className="btn-secondary" onClick={() => onEdit(room)}>
                Edit
              </button>
              <button
                className="btn-secondary"
                onClick={() => toggleAvailability(room.id)}
              >
                Toggle
              </button>
              {room.isActive && (
                <button
                  className="btn-secondary"
                  onClick={() => deactivateRoom(room.id)}
                >
                  Deactivate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;
