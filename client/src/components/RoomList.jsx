import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import api from "../services/api";

function RoomList({ onEdit, refreshKey }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [sort, setSort] = useState("name");
  const [filterAC, setFilterAC] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState(false);

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
        if (mounted) setLoading(false);
      }
    };

    fetchRooms();

    return () => (mounted = false);
  }, [refreshKey]);

  const deactivateRoom = async (id) => {
    try {
      const res = await api.patch(`/rooms/${id}/deactivate`);

      setRooms((prev) =>
        prev.map((room) => (room.id === id ? res.data.data : room)),
      );
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Failed to delete room");
    }
  };

  // Sorting
  const sortedRooms = [...rooms].sort((a, b) => {
    if (sort === "price") return a.priceMonthly - b.priceMonthly;
    return a.name.localeCompare(b.name);
  });

  // Filtering
  const filteredRooms = sortedRooms.filter((room) => {
    if (filterAC && !room.hasAC) return false;
    if (filterAvailable && !room.isAvailable) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="card-base p-6 text-sm text-[var(--color-text-muted)]">
        Loading rooms...
      </div>
    );
  }

  return (
    <div className="card-base overflow-hidden">
      {/* Error */}
      {errorMsg && (
        <div className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMsg}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 border-b border-[var(--color-border)]">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filterAC}
            onChange={(e) => setFilterAC(e.target.checked)}
          />
          AC Only
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filterAvailable}
            onChange={(e) => setFilterAvailable(e.target.checked)}
          />
          Available Only
        </label>
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <div className="p-6 text-center text-sm text-[var(--color-text-muted)]">
          No rooms found.
        </div>
      )}

      {/* ================= MOBILE ================= */}
      <div className="md:hidden divide-y divide-[var(--color-border)]">
        {filteredRooms.map((room) => (
          <div key={room.id} className="flex gap-4 p-4">
            <img
              src={room.photos?.[0] || "https://placehold.co/100x100"}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{room.name}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Rp {Number(room.priceMonthly).toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex gap-1">
                  <button onClick={() => onEdit(room)}>
                    <Pencil size={16} />
                  </button>

                  {room.isActive && (
                    <button
                      onClick={() => deactivateRoom(room.id)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {room.hasAC ? "AC" : "Non AC"}
                </span>

                <span
                  className={`px-2 py-1 rounded ${
                    room.isAvailable
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {room.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <div className="grid grid-cols-[80px_1.5fr_1fr_120px_120px_100px] gap-4 px-4 py-3 text-sm font-medium border-b border-[var(--color-border)]">
          <span></span>
          <span>Room</span>
          <span>Price</span>
          <span>AC</span>
          <span>Available</span>
          <span>Actions</span>
        </div>

        <div className="divide-y divide-[var(--color-border)]">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="grid grid-cols-[80px_1.5fr_1fr_120px_120px_100px] gap-4 items-center px-4 py-3 hover:bg-[var(--color-surface-soft)] transition"
            >
              <img
                src={room.photos?.[0] || "https://placehold.co/100x100"}
                className="w-16 h-16 object-cover rounded-lg"
              />

              <div>
                <p className="font-medium">{room.name}</p>
                {room.notes && (
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {room.notes}
                  </p>
                )}
              </div>

              <div className="text-sm">
                <p>Rp {Number(room.priceMonthly).toLocaleString("id-ID")}</p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Daily: Rp {Number(room.priceDaily).toLocaleString("id-ID")}
                </p>
              </div>

              <span>{room.hasAC ? "Yes" : "No"}</span>

              <span
                className={
                  room.isAvailable ? "text-green-600" : "text-gray-500"
                }
              >
                {room.isAvailable ? "Available" : "Unavailable"}
              </span>

              <div className="flex gap-2">
                <button onClick={() => onEdit(room)}>
                  <Pencil size={16} />
                </button>

                {room.isActive && (
                  <button
                    onClick={() => deactivateRoom(room.id)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomList;
