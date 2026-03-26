import { useState } from "react";
import RoomList from "../RoomList";
import RoomModal from "../RoomModal";

function RoomSection() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Room Management</h1>

        <button
          onClick={() => {
            setSelectedRoom(null);
            setOpenModal(true);
          }}
          className="btn-primary"
        >
          + Add Room
        </button>
      </div>

      {/* Table/List */}
      <RoomList
        key={refreshKey}
        onEdit={(room) => {
          setSelectedRoom(room);
          setOpenModal(true);
        }}
      />

      {/* Modal */}
      {openModal && (
        <RoomModal
          room={selectedRoom}
          onClose={() => {
            setOpenModal(false);
            setRefreshKey((prev) => prev + 1);
          }}
        />
      )}
    </div>
  );
}

export default RoomSection;
