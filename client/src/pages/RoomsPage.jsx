import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Snowflake } from "lucide-react";
import api from "../services/api";

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadRooms = async () => {
      try {
        const res = await api.get("/rooms");
        if (mounted) {
          setRooms(res.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadRooms();

    return () => (mounted = false);
  }, []);

  if (loading) return <p>Loading rooms...</p>;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
          Available Rooms
        </h1>
        <p className="text-[var(--color-text-muted)]">
          Find your comfortable space at Rafflesia House
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Link
            to={`/rooms/${room.id}`}
            key={room.id}
            className="card-base overflow-hidden transition hover:shadow-lg hover:-translate-y-1 block"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={
                  room.photos?.[0] || "https://placehold.co/600x400?text=Room"
                }
                alt={room.name}
                loading="lazy"
                className="w-full h-48 object-cover"
              />

              {/* Availability badge */}
              <span
                className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-medium ${
                  room.isAvailable
                    ? "bg-white text-[var(--color-primary)]"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {room.isAvailable ? "Available" : "Unavailable"}
              </span>

              {/* AC badge */}
              {room.hasAC && (
                <span className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full shadow text-xs flex items-center gap-1">
                  <Snowflake size={14} />
                  AC
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <h2 className="text-lg font-semibold">{room.name}</h2>

              {/* Pricing */}
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">Daily</p>
                <p className="font-semibold text-[var(--color-primary)]">
                  Rp {Number(room.priceDaily).toLocaleString("id-ID")}
                </p>

                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Monthly
                </p>
                <p className="font-semibold">
                  Rp {Number(room.priceMonthly).toLocaleString("id-ID")}
                </p>
              </div>

              {/* CTA */}
              {room.isAvailable ? (
                <a
                  href="https://wa.me/6281349785960"
                  target="_blank"
                  className="btn-primary w-full text-center block mt-2"
                >
                  Book via WhatsApp
                </a>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-200 text-gray-500 py-2 rounded mt-2"
                >
                  Not Available
                </button>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RoomsPage;
