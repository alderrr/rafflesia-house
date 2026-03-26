import { useEffect, useState } from "react";
import api from "../services/api";

function RoomList({ onEdit }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms/admin");
      setRooms(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const toggleAvailability = async (room) => {
    try {
      const res = await api.put(`/rooms/${room.id}`, {
        isAvailable: !room.isAvailable,
      });

      // update state without reload
      setRooms((prev) =>
        prev.map((r) => (r.id === room.id ? res.data.data : r)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading rooms...</p>;

  return (
    <div className="space-y-4">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="card-base p-4 flex justify-between items-center"
        >
          {/* Info */}
          <div>
            <h3 className="font-semibold">{room.name}</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Rp {Number(room.priceMonthly).toLocaleString("id-ID")} / month
            </p>

            <p className="text-sm">{room.hasAC ? "AC" : "Non AC"}</p>

            <span
              className={`text-xs ${
                room.isAvailable
                  ? "text-[var(--color-secondary)]"
                  : "text-gray-400"
              }`}
            >
              {room.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={() => onEdit(room)} className="btn-secondary">
              Edit
            </button>

            <button
              onClick={() => toggleAvailability(room)}
              className="btn-secondary"
            >
              Toggle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomList;
