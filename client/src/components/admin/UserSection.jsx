import { useEffect, useState } from "react";
import api from "../../services/api";

function UserSection() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");

        if (isMounted) {
          setUsers(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">User Management</h1>

      {users.map((user) => (
        <div key={user.id} className="card-base p-4 flex justify-between">
          <div>
            <p className="font-medium">{user.username}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>

          <span
            className={`text-sm ${
              user.isActive ? "text-[var(--color-secondary)]" : "text-gray-400"
            }`}
          >
            {user.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default UserSection;
