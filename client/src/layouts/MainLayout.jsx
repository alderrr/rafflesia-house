import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import logo from "../assets/RAFFLESIA-01.png";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[var(--color-surface-soft)] border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Rafflesia House"
              className="h-8 w-8 object-contain"
            />
            <span className="font-semibold text-[var(--color-primary)]">
              Rafflesia House
            </span>
          </div>
          <div className="flex gap-6 text-[var(--color-text-muted)]">
            <Link to="/">Home</Link>
            <Link to="/rooms">Rooms</Link>
            <Link to="/about">About</Link>
            <Link
              to="/login"
              className="text-[var(--color-primary)] font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      <FloatingWhatsApp />
    </div>
  );
}

export default MainLayout;
