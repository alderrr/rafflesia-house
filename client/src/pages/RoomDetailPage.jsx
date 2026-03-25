import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Snowflake, ArrowLeft } from "lucide-react";
import api from "../services/api";

function RoomDetailPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadRoom = async () => {
      try {
        const res = await api.get(`/rooms/${id}`);
        if (mounted) {
          setRoom(res.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadRoom();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return <p>Loading room...</p>;
  }

  if (!room) {
    return <p>Room not found.</p>;
  }

  return (
    <div className="space-y-6">
      <Link
        to="/rooms"
        className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:opacity-80"
      >
        <ArrowLeft size={18} />
        Back to Rooms
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="card-base overflow-hidden">
          <img
            src={room.photos?.[0] || "https://placehold.co/1000x700?text=Room"}
            alt={room.name}
            loading="lazy"
            className="w-full h-[320px] md:h-[420px] object-cover"
          />
        </div>

        <div className="card-base p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
                {room.name}
              </h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Comfortable room at Rafflesia House
              </p>
            </div>

            {room.hasAC && (
              <span className="inline-flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1 rounded-full text-sm">
                <Snowflake size={16} />
                AC
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Daily</p>
              <p className="text-xl font-semibold text-[var(--color-primary)]">
                Rp {Number(room.priceDaily).toLocaleString("id-ID")}
              </p>
            </div>

            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Monthly</p>
              <p className="text-xl font-semibold">
                Rp {Number(room.priceMonthly).toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          <div>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                room.isAvailable
                  ? "bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-border)]"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {room.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>

          {room.isAvailable ? (
            <a
              href="https://wa.me/6281349785960"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-block text-center"
            >
              Ask via WhatsApp
            </a>
          ) : (
            <button
              disabled
              className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl"
            >
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPage;
