import { useState, useEffect } from "react";
import CreateRoomModal from "../../components/CreateRoomModal";
import EditRoomModal from "../../components/EditRoomModal";
import api from "../../api/api";

const RoomsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const fetchRooms = async () => {
    try {
      const response = await api.get("/api/v1/admin/rooms");
      setRooms(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div>
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Rooms</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Room
          </button>
        </div>

        {/* LOADING */}
        {loading && <div className="text-gray-500">Loading rooms...</div>}

        {/* ERROR */}
        {error && <div className="text-red-500">{error}</div>}

        {/* EMPTY */}
        {!loading && !error && rooms.length === 0 && (
          <div className="bg-white p-6 rounded shadow text-gray-500">
            No rooms found. Click "Add Room" to create your first room.
          </div>
        )}

        {/* TABLE */}
        {!loading && !error && rooms.length > 0 && (
          <div className="bg-white rounded shadow overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">Room</th>
                  <th className="text-left p-3">Title</th>
                  <th className="text-left p-3">Floor</th>
                  <th className="text-left p-3">Size</th>
                  <th className="text-left p-3">Daily</th>
                  <th className="text-left p-3">Monthly</th>
                  <th className="text-left p-3">Deposit</th>
                  <th className="text-left p-3">Facilities</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id || room.id} className="border-t">
                    <td className="p-3 font-medium">{room.roomNumber}</td>
                    <td className="p-3">{room.title}</td>
                    <td className="p-3">{room.floor || "-"}</td>
                    <td className="p-3">
                      {room.size ? `${room.size} m²` : "-"}
                    </td>
                    <td className="p-3">
                      {room.priceDaily ? `Rp ${room.priceDaily}` : "-"}
                    </td>
                    <td className="p-3">Rp {room.priceMonthly}</td>
                    <td className="p-3">
                      {room.depositAmount ? `Rp ${room.depositAmount}` : "-"}
                    </td>
                    <td className="p-3">
                      {room.facilities?.length > 0
                        ? room.facilities.join(", ")
                        : "-"}
                    </td>
                    <td className="p-3">
                      {room.isAvailable ? (
                        <span className="text-green-600 font-medium">
                          Available
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">
                          Occupied
                        </span>
                      )}
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRoom(room);
                          setShowEditModal(true);
                        }}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <CreateRoomModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchRooms}
        />
      )}
      {showEditModal && (
        <EditRoomModal
          room={selectedRoom}
          onClose={() => setShowEditModal(false)}
          onSuccess={fetchRooms}
        />
      )}
    </>
  );
};

export default RoomsPage;
