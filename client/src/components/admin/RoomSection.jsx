import { useState } from "react";
import RoomList from "../RoomList";
import RoomModal from "../RoomModal";

function RoomSection() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Room Management</h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Create, edit, deactivate, and update availability.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            setSelectedRoom(null);
            setOpenModal(true);
          }}
        >
          + Add Room
        </button>
      </div>

      <RoomList
        refreshKey={refreshKey}
        onEdit={(room) => {
          setSelectedRoom(room);
          setOpenModal(true);
        }}
      />

      {openModal && (
        <RoomModal
          room={selectedRoom}
          onClose={(didChange = false) => {
            setOpenModal(false);
            setSelectedRoom(null);
            if (didChange) setRefreshKey((prev) => prev + 1);
          }}
        />
      )}
    </div>
  );
}

export default RoomSection;
