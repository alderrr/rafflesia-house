import { useState } from "react";
import api from "../services/api";

function RoomForm() {
  const [form, setForm] = useState({
    name: "",
    priceDaily: "",
    priceMonthly: "",
    hasAC: false,
    photos: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/rooms", {
        ...form,
        priceDaily: Number(form.priceDaily),
        priceMonthly: Number(form.priceMonthly),
        photos: form.photos ? form.photos.split(",") : [],
      });

      alert("Room added");

      setForm({
        name: "",
        priceDaily: "",
        priceMonthly: "",
        hasAC: false,
        photos: "",
      });

      window.location.reload(); // simple refresh (we improve later)
    } catch (err) {
      alert("Failed to add room", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="font-semibold mb-3">Add Room</h2>

      <input
        name="name"
        placeholder="Room Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      />

      <input
        name="priceDaily"
        placeholder="Daily Price"
        value={form.priceDaily}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      />

      <input
        name="priceMonthly"
        placeholder="Monthly Price"
        value={form.priceMonthly}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      />

      <label className="flex items-center gap-2 mb-2">
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
        className="w-full border p-2 mb-3"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Room
      </button>
    </form>
  );
}

export default RoomForm;
