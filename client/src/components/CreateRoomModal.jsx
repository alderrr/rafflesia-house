import { useState } from "react";
import api from "../api/api";

const CreateRoomModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceDaily, setPriceDaily] = useState("");
  const [priceMonthly, setPriceMonthly] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [facilities, setFacilities] = useState("");
  const [size, setSize] = useState("");
  const [floor, setFloor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomNumber || !title) {
      alert("Room number and title required"); // CHANGE ALERT LATER
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/v1/admin/rooms", {
        roomNumber,
        title,
        description,
        priceDaily: Number(priceDaily),
        priceMonthly: Number(priceMonthly),
        depositAmount: Number(depositAmount),
        facilities: facilities.split(",").map((f) => f.trim()),
        size,
        floor: Number(floor),
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow w-96 max-h-[90vh] overflow-auto">
          <h2 className="text-xl font-bold mb-4">Create Room</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              placeholder="Room Number"
              className="w-full border p-2"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />

            <input
              placeholder="Title"
              className="w-full border p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="w-full border p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              placeholder="Price Daily"
              type="number"
              className="w-full border p-2"
              value={priceDaily}
              onChange={(e) => setPriceDaily(e.target.value)}
            />

            <input
              placeholder="Price Monthly"
              type="number"
              className="w-full border p-2"
              value={priceMonthly}
              onChange={(e) => setPriceMonthly(e.target.value)}
            />

            <input
              placeholder="Deposit Amount"
              type="number"
              className="w-full border p-2"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />

            <input
              placeholder="Facilities (comma separated)"
              className="w-full border p-2"
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
            />

            <input
              placeholder="Size"
              type="number"
              className="w-full border p-2"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />

            <input
              placeholder="Floor"
              type="number"
              className="w-full border p-2"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
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
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRoomModal;
