import { useEffect, useState } from "react";
import api from "../services/api";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    const res = await api.get("/rooms");
    setRooms(res.data.data);
  };

  useEffect(() => {
    // fetchRooms();

    const load = async () => {
      try {
        const res = await api.get("/rooms");
        setRooms(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  const toggleAvailability = async (room) => {
    await api.put(`/rooms/${room.id}`, {
      isAvailable: !room.isAvailable,
    });

    fetchRooms();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-3">Room List</h2>

      {rooms.map((room) => (
        <div
          key={room.id}
          className="border p-3 mb-2 flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">{room.name}</h3>
            <p>Daily: {room.priceDaily}</p>
            <p>Monthly: {room.priceMonthly}</p>
            <p>{room.hasAC ? "AC" : "No AC"}</p>
          </div>

          <div className="flex gap-2 items-center">
            <span
              className={`text-sm ${
                room.isAvailable ? "text-green-600" : "text-red-500"
              }`}
            >
              {room.isAvailable ? "Available" : "Not Available"}
            </span>

            <button
              onClick={() => toggleAvailability(room)}
              className="bg-gray-200 px-3 py-1 rounded"
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
