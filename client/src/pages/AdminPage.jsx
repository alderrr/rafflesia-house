import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomSection from "../components/admin/RoomSection";
import UserSection from "../components/admin/UserSection";

function AdminPage() {
  const [activeTab, setActiveTab] = useState("rooms");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-[var(--color-border)]">
        <h2 className="font-semibold text-[var(--color-primary)]">CMS Panel</h2>

        <button onClick={handleLogout} className="text-sm">
          Logout
        </button>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex border-b border-[var(--color-border)]">
        <button
          onClick={() => setActiveTab("rooms")}
          className={`flex-1 py-2 ${
            activeTab === "rooms" ? "font-semibold" : ""
          }`}
        >
          Rooms
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`flex-1 py-2 ${
            activeTab === "users" ? "font-semibold" : ""
          }`}
        >
          Users
        </button>
      </div>

      {/* SIDEBAR (desktop only) */}
      <div className="hidden md:flex w-60 bg-[var(--color-surface)] border-r border-[var(--color-border)] p-4 flex-col">
        <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-6">
          CMS Panel
        </h2>

        <button
          onClick={() => setActiveTab("rooms")}
          className={`text-left px-3 py-2 rounded ${
            activeTab === "rooms" ? "bg-[var(--color-bg)] font-medium" : ""
          }`}
        >
          Rooms
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`text-left px-3 py-2 rounded ${
            activeTab === "users" ? "bg-[var(--color-bg)] font-medium" : ""
          }`}
        >
          Users
        </button>

        <div className="mt-auto">
          <button onClick={handleLogout} className="btn-secondary w-full mt-6">
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-6 space-y-6">
        {activeTab === "rooms" && <RoomSection />}
        {activeTab === "users" && <UserSection />}
      </div>
    </div>
  );
}

export default AdminPage;
