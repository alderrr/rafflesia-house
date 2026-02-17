import { useState, useEffect } from "react";
import CreateGuestModal from "../../components/CreateGuestModal";
import EditGuestModal from "../../components/EditGuestModal";
import api from "../../api/api";

const GuestsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guests, setGuests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const fetchGuests = async () => {
    try {
      const response = await api.get("/api/v1/admin/guests");
      setGuests(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load guests");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (guest) => {
    const confirmDelete = window.confirm(`Delete guest ${guest.name}?`);

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/v1/admin/guests/${guest._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <>
      <div>
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Guests</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Guest
          </button>
        </div>

        {/* STATES */}
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {/* EMPTY */}
        {!loading && guests.length === 0 && (
          <div className="bg-white p-4 rounded shadow">No guests found</div>
        )}

        {/* TABLE */}
        {!loading && guests.length > 0 && (
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">ID Card</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest._id} className="border-t">
                    <td className="p-3">{guest.idcard}</td>
                    <td className="p-3">{guest.name}</td>
                    <td className="p-3">{guest.phone}</td>
                    <td className="p-3">{guest.email}</td>
                    <td className="p-3 space-x-3">
                      <button
                        onClick={() => {
                          setSelectedGuest(guest);
                          setShowEditModal(true);
                        }}
                        className="text-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(guest)}
                        className="text-red-500"
                      >
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
        <CreateGuestModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchGuests}
        />
      )}
      {showEditModal && (
        <EditGuestModal
          guest={selectedGuest}
          onClose={() => setShowEditModal(false)}
          onSuccess={fetchGuests}
        />
      )}
    </>
  );
};

export default GuestsPage;
