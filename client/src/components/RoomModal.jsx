import { useState, useEffect } from "react";
import api from "../services/api";

function RoomModal({ room, onClose }) {
  const isEdit = !!room;

  const [form, setForm] = useState({
    name: "",
    priceDaily: "",
    priceMonthly: "",
    hasAC: false,
    photos: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // safe initialization (no cascading issue)
  useEffect(() => {
    if (!room) return;

    setForm({
      name: room.name || "",
      priceDaily: room.priceDaily || "",
      priceMonthly: room.priceMonthly || "",
      hasAC: room.hasAC || false,
      photos: room.photos?.join(",") || "",
    });
  }, [room]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        ...form,
        priceDaily: Number(form.priceDaily),
        priceMonthly: Number(form.priceMonthly),
        photos: form.photos ? form.photos.split(",") : [],
      };

      if (isEdit) {
        await api.put(`/rooms/${room.id}`, payload);
      } else {
        await api.post("/rooms", payload);
      }

      onClose(); // parent will refresh list
    } catch (err) {
      console.error("Room save error:", err);
      setErrorMsg(
        err.response?.data?.message || err.message || "Failed to save room",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="card-base p-6 w-full max-w-lg space-y-4">
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit Room" : "Add Room"}
        </h2>

        {/* Error */}
        {errorMsg && (
          <div className="text-sm text-red-500 bg-red-50 border border-red-200 p-2 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Room Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-[var(--color-border)] p-3 rounded-lg"
          />

          <input
            name="priceDaily"
            placeholder="Daily Price"
            value={form.priceDaily}
            onChange={handleChange}
            className="w-full border border-[var(--color-border)] p-3 rounded-lg"
          />

          <input
            name="priceMonthly"
            placeholder="Monthly Price"
            value={form.priceMonthly}
            onChange={handleChange}
            className="w-full border border-[var(--color-border)] p-3 rounded-lg"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hasAC"
              checked={form.hasAC}
              onChange={handleChange}
            />
            Has AC
          </label>

          <input
            name="photos"
            placeholder="Photo URLs (comma separated)"
            value={form.photos}
            onChange={handleChange}
            className="w-full border border-[var(--color-border)] p-3 rounded-lg"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>

            <button
              disabled={loading}
              className={`btn-primary ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoomModal;
