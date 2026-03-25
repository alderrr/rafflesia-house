import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="py-10">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Rafflesia House</h1>

        <p className="text-gray-600 mb-6">
          Comfortable boarding house with practical facilities and affordable
          pricing.
        </p>

        <div className="flex gap-3">
          <Link
            to="/rooms"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            View Rooms
          </Link>

          <Link to="/contact" className="border px-5 py-2 rounded-lg">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
