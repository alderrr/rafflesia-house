import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Rafflesia House</h1>

          <div className="flex gap-6">
            <Link to="/">Home</Link>
            <Link to="/rooms">Rooms</Link>
            <Link to="/location">Location</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
