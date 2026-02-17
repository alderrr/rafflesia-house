import { useState, useEffect } from "react";
import api from "../api/api";

const CreatePaymentModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [tenantId, setTenantId] = useState("");
  const [type, setType] = useState("rent");
  const [amount, setAmount] = useState("");
  const [paidAt, setPaidAt] = useState("");
  const [note, setNote] = useState("");

  const fetchTenants = async () => {
    try {
      const response = await api.get("/api/v1/admin/tenants");
      setTenants(response.data.filter((t) => t.isActive)); // only active tenants
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tenantId || !amount) {
      alert("Tenant and amount required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/v1/admin/payments", {
        tenantId,
        type,
        amount: Number(amount),
        paidAt: paidAt || new Date(),
        note,
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow w-96 max-h-[90vh] overflow-auto">
          <h2 className="text-xl font-bold mb-4">Add Payment</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Tenant */}
            <select
              className="w-full border p-2"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
            >
              <option value="">Select Tenant</option>

              {tenants.map((tenant) => (
                <option key={tenant._id} value={tenant._id}>
                  {tenant._id}
                </option>
              ))}
            </select>

            {/* Type */}
            <select
              className="w-full border p-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="rent">Rent</option>
              <option value="deposit">Deposit</option>
              <option value="deposit_return">Deposit Return</option>
              <option value="damage_deduction">Damage Deduction</option>
            </select>

            {/* Amount */}
            <input
              type="number"
              placeholder="Amount"
              className="w-full border p-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* Date */}
            <input
              type="date"
              className="w-full border p-2"
              value={paidAt}
              onChange={(e) => setPaidAt(e.target.value)}
            />

            {/* Note */}
            <textarea
              placeholder="Note"
              className="w-full border p-2"
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
      ;
    </>
  );
};

export default CreatePaymentModal;
