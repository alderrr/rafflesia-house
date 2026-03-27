import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GraduationCap, Car, Leaf } from "lucide-react";
import api from "../services/api";

function HomePage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const res = await api.get("/rooms");
        setRooms(res.data.data.slice(0, 3)); // show only 3
      } catch (err) {
        console.error(err);
      }
    };

    loadRooms();
  }, []);

  return (
    <div className="space-y-20">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Background Image */}
        <img
          src="https://placehold.co/1200x600?text=Rafflesia+House"
          className="w-full h-[400px] md:h-[500px] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight fade-up">
            Your Perfect Stay in Palembang
          </h1>

          <p className="mt-4 text-white/90 text-lg fade-up fade-up-delay-1">
            Comfortable, strategic, and peaceful living at Rafflesia House.
          </p>

          <div className="flex gap-3 mt-6 flex-wrap fade-up fade-up-delay-2">
            <Link to="/rooms" className="btn-primary">
              View Rooms
            </Link>

            <a
              href="https://wa.me/6281349785960"
              target="_blank"
              className="bg-white/90 text-black px-4 py-2 rounded-xl font-medium hover:bg-white transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* SELLING POINTS */}
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        {/* Academic */}
        <div className="card-base p-6 space-y-3 text-center hover:shadow-lg hover:-translate-y-1 transition fade-up">
          <div className="flex justify-center">
            <GraduationCap size={28} className="text-[var(--color-primary)]" />
          </div>

          <h3 className="font-semibold text-lg">Academic Convenience</h3>

          <p className="text-sm text-[var(--color-text-muted)]">
            Minutes from Muhammadiyah University of Palembang, Bina Darma
            University, and Sriwijaya University.
          </p>
        </div>

        {/* Connectivity */}
        <div className="card-base p-6 space-y-3 text-center hover:shadow-lg hover:-translate-y-1 transition fade-up fade-up-delay-1">
          <div className="flex justify-center">
            <Car size={28} className="text-[var(--color-primary)]" />
          </div>

          <h3 className="font-semibold text-lg">Easy Connectivity</h3>

          <p className="text-sm text-[var(--color-text-muted)]">
            Close to PT KAI, major roads, and public transport options.
          </p>
        </div>

        {/* Comfort */}
        <div className="card-base p-6 space-y-3 text-center hover:shadow-lg hover:-translate-y-1 transition fade-up fade-up-delay-2">
          <div className="flex justify-center">
            <Leaf size={28} className="text-[var(--color-primary)]" />
          </div>

          <h3 className="font-semibold text-lg">Peaceful Living</h3>

          <p className="text-sm text-[var(--color-text-muted)]">
            Quiet neighborhood with a safe and friendly community.
          </p>
        </div>
      </div>

      {/* SOFT SECTION DIVIDER */}
      {/* <div className="h-px bg-[var(--color-border)] opacity-40"></div> */}

      <div className="flex justify-center">
        <div className="h-px w-16 bg-[var(--color-border)] opacity-50"></div>
      </div>

      {/* FEATURED ROOMS */}
      <div className="space-y-8 fade-up">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
            Featured Rooms
          </h2>

          <p className="text-sm text-[var(--color-text-muted)]">
            Discover our most popular rooms
          </p>

          <Link
            to="/rooms"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {rooms.map((room, index) => (
            <Link
              to={`/rooms/${room.id}`}
              key={room.id}
              className="card-base overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1 block group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={room.photos?.[0] || "https://placehold.co/600x400"}
                loading="lazy"
                className="w-full h-44 object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="p-4 space-y-2">
                <h3 className="font-semibold">{room.name}</h3>

                <p className="text-sm text-[var(--color-text-muted)]">
                  Rp {Number(room.priceMonthly).toLocaleString("id-ID")} / month
                </p>

                <span
                  className={`text-xs ${
                    room.isAvailable
                      ? "text-[var(--color-secondary)]"
                      : "text-gray-400"
                  }`}
                >
                  {room.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SOFT SECTION DIVIDER */}
      {/* <div className="h-px bg-[var(--color-border)] opacity-40"></div> */}

      <div className="flex justify-center">
        <div className="h-px w-16 bg-[var(--color-border)] opacity-50"></div>
      </div>

      {/* TESTIMONIALS */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
          What Our Residents Say
        </h2>

        <p className="text-sm text-[var(--color-text-muted)]">
          Real experiences from our residents
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="card-base p-5 space-y-3 hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <div className="text-yellow-500 text-sm">★★★★★</div>

            <p className="text-sm text-[var(--color-text-muted)]">
              The experience of staying here was pleasant and comfortable, the
              room was clean, the bed was soft, the AC was cold, the water was
              clean and smooth, there was a living room on the terrace, complete
              with a common kitchen.
            </p>

            <p className="text-sm font-medium">- Fajar Juniaty</p>
          </div>

          {/* Card 2 */}
          <div className="card-base p-5 space-y-3 hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <div className="text-yellow-500 text-sm">★★★★★</div>

            <p className="text-sm text-[var(--color-text-muted)]">
              A very clean and comfortable boarding house. The caretaker is very
              friendly.
            </p>

            <p className="text-sm font-medium">- Tri Judi</p>
          </div>

          {/* Card 3 */}
          <div className="card-base p-5 space-y-3 hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <div className="text-yellow-500 text-sm">★★★★★</div>

            <p className="text-sm text-[var(--color-text-muted)]">
              Comfortable, safe, clean, and sharia-compliant boarding house.
              Each floor has a pantry and lounge area.
            </p>

            <p className="text-sm font-medium">- Zee Aziespri</p>
          </div>
        </div>
        <a
          href="https://maps.app.goo.gl/7i1U2dcTYtTDxtUU6"
          target="_blank"
          className="text-sm text-[var(--color-primary)] hover:underline"
        >
          View all reviews on Google →
        </a>
      </div>
    </div>
  );
}

export default HomePage;
