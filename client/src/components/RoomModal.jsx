import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const emptyForm = {
  name: "",
  priceDaily: "",
  priceMonthly: "",
  hasAC: false,
  isAvailable: true,
  notes: "",
};

function RoomModal({ room, onClose }) {
  const isEdit = Boolean(room);

  const initialForm = useMemo(() => {
    if (!room) return emptyForm;

    return {
      name: room.name ?? "",
      priceDaily: room.priceDaily ?? "",
      priceMonthly: room.priceMonthly ?? "",
      hasAC: room.hasAC ?? false,
      isAvailable: room.isAvailable ?? true,
      notes: room.notes ?? "",
    };
  }, [room]);

  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState(room?.photos ?? []);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setForm(initialForm);
    setImages(room?.photos ?? []);
    setErrorMsg("");
  }, [initialForm, room]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setErrorMsg("");

      const formData = new FormData();
      formData.append("image", file);

      const res = await api.post("/uploads/room-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImages((prev) => [...prev, res.data.data.url]);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (url) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMsg("");

      const payload = {
        name: form.name.trim(),
        priceDaily: Number(form.priceDaily),
        priceMonthly: Number(form.priceMonthly),
        hasAC: form.hasAC,
        isAvailable: form.isAvailable,
        notes: form.notes.trim(),
        photos: images,
      };

      if (isEdit) {
        await api.put(`/rooms/${room.id}`, payload);
      } else {
        await api.post("/rooms", payload);
      }

      onClose(true);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Failed to save room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="card-base w-full max-w-2xl p-6 space-y-6">
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit Room" : "Add Room"}
        </h2>

        {errorMsg && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {errorMsg}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              placeholder="Room name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-[var(--color-border)] p-3"
            />

            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="hasAC"
                  checked={form.hasAC}
                  onChange={handleChange}
                />
                AC
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={form.isAvailable}
                  onChange={handleChange}
                />
                Available
              </label>
            </div>

            <input
              name="priceDaily"
              type="number"
              placeholder="Daily price"
              value={form.priceDaily}
              onChange={handleChange}
              className="w-full rounded-lg border border-[var(--color-border)] p-3"
            />

            <input
              name="priceMonthly"
              type="number"
              placeholder="Monthly price"
              value={form.priceMonthly}
              onChange={handleChange}
              className="w-full rounded-lg border border-[var(--color-border)] p-3"
            />
          </div>

          {/* Notes */}
          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-[var(--color-border)] p-3"
          />

          {/* Images */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Room photos</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="w-full rounded-lg border border-[var(--color-border)] p-3"
            />

            {uploading && (
              <p className="text-sm text-[var(--color-text-muted)]">
                Uploading...
              </p>
            )}

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {images.map((img) => (
                  <div
                    key={img}
                    className="relative group overflow-hidden rounded-lg"
                  >
                    <img
                      src={img}
                      alt="Room"
                      className="h-24 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(img)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition text-white text-xs flex items-center justify-center"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              className="btn-secondary"
              type="button"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>

            <button className="btn-primary" disabled={loading || uploading}>
              {loading ? "Saving..." : isEdit ? "Update Room" : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoomModal;
