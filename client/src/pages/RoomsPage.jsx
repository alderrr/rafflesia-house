import { useEffect, useState } from "react";
import api from "../services/api";

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadRooms = async () => {
      try {
        const res = await api.get("/rooms");
        if (mounted) {
          setRooms(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadRooms();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <p>Loading rooms...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Available Rooms</h1>

      {rooms.length === 0 ? (
        <p>No rooms available yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <div key={room.id} className="card-base overflow-hidden">
              <img
                src={
                  room.photos?.[0] ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                alt={room.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{room.name}</h2>

                <p className="text-sm text-gray-600 mb-1">
                  Daily: Rp {Number(room.priceDaily).toLocaleString("id-ID")}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  Monthly: Rp{" "}
                  {Number(room.priceMonthly).toLocaleString("id-ID")}
                </p>

                <p className="text-sm mb-1">{room.hasAC ? "AC" : "Non AC"}</p>

                <p
                  className={`text-sm font-medium ${
                    room.isAvailable
                      ? "text-[var(--color-secondary)]"
                      : "text-gray-500"
                  }`}
                >
                  {room.isAvailable ? "Available" : "Not Available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomsPage;
