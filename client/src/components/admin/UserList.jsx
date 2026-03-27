import { useEffect, useState } from "react";
import api from "../../services/api";

function UserList({ onEdit, refreshKey }) {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");

        if (mounted) {
          setUsers(res.data.data);
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to load users");
      }
    };

    fetchUsers();

    return () => (mounted = false);
  }, [refreshKey]);

  const deactivateUser = async (id) => {
    try {
      const res = await api.patch(`/users/${id}/deactivate`);

      setUsers((prev) => prev.map((u) => (u.id === id ? res.data.data : u)));
    } catch {
      setErrorMsg("Failed to deactivate user");
    }
  };

  return (
    <div className="card-base overflow-hidden">
      {errorMsg && <div className="p-3 text-sm text-red-600">{errorMsg}</div>}

      <div className="divide-y divide-[var(--color-border)]">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4"
          >
            <div>
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Role: {user.role}
              </p>
              <p className="text-xs">{user.isActive ? "Active" : "Inactive"}</p>
            </div>

            <div className="flex gap-2">
              <button className="btn-secondary" onClick={() => onEdit(user)}>
                Edit
              </button>

              {user.isActive && (
                <button
                  className="btn-secondary"
                  onClick={() => deactivateUser(user.id)}
                >
                  Deactivate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
