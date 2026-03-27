import { useEffect, useState } from "react";
import api from "../../services/api";

function UserModal({ user, onClose }) {
  const isEdit = Boolean(user);

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "staff",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username,
        password: "",
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMsg("");

      if (isEdit) {
        await api.put(`/users/${user.id}`, {
          username: form.username,
          role: form.role,
          ...(form.password && { password: form.password }),
        });
      } else {
        await api.post("/users", form);
      }

      onClose(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
      <div className="card-base w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit User" : "Add User"}
        </h2>

        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder={isEdit ? "New password (optional)" : "Password"}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>

            <button className="btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
