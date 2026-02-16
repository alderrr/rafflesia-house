import { useState, useEffect } from "react";
import api from "../api/api";

const EditGuestModal = ({ guest, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [idcard, setIdcard] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (guest) {
      setIdcard(guest.idcard || "");
      setName(guest.name || "");
      setPhone(guest.phone || "");
      setEmail(guest.email || "");
    }
  }, [guest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/api/v1/admin/guests/${guest._id}`, {
        idcard,
        name,
        phone,
        email,
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
        <div className="bg-white p-6 rounded shadow w-96">
          <h2 className="text-xl font-bold mb-4">Edit Guest</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              placeholder="ID Card"
              className="w-full border p-2"
              value={idcard}
              onChange={(e) => setIdcard(e.target.value)}
            />

            <input
              placeholder="Name"
              className="w-full border p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Phone"
              className="w-full border p-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              placeholder="Email"
              className="w-full border p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="border px-4 py-2"
              >
                Cancel
              </button>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditGuestModal;
