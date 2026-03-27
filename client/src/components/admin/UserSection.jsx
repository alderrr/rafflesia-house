import { useState } from "react";
import UserList from "./UserList";
import UserModal from "./UserModal";

function UserSection() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">User Management</h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Manage admin and staff accounts
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            setSelectedUser(null);
            setOpenModal(true);
          }}
        >
          + Add User
        </button>
      </div>

      {/* List */}
      <UserList
        refreshKey={refreshKey}
        onEdit={(user) => {
          setSelectedUser(user);
          setOpenModal(true);
        }}
      />

      {/* Modal */}
      {openModal && (
        <UserModal
          user={selectedUser}
          onClose={(didChange = false) => {
            setOpenModal(false);
            setSelectedUser(null);
            if (didChange) setRefreshKey((prev) => prev + 1);
          }}
        />
      )}
    </div>
  );
}

export default UserSection;
