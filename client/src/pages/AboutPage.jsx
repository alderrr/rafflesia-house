import { Phone, MapPin, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function AboutPage() {
  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
          Contact & Location
        </h1>
        <p className="text-[var(--color-text-muted)] mt-1">
          Reach us easily or visit our location
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* LEFT */}
        <div className="card-base p-6 space-y-6 transition hover:shadow-lg">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Contact Information
          </h2>

          {/* Phone */}
          <a
            href="tel:+6281234567890"
            className="flex items-center gap-3 hover:text-[var(--color-primary)] transition"
          >
            <Phone size={20} />
            <span className="font-medium">+62 812-3456-7890</span>
          </a>

          {/* Address */}
          <div className="flex gap-3">
            <MapPin size={20} />
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Rafflesia House <br />
              Gang Rafflesia 2 No.156A, 14 Ulu, Plaju <br />
              Palembang, Indonesia
            </p>
          </div>

          {/* Email */}
          <div className="flex gap-3">
            <Mail size={20} />
            <p className="text-[var(--color-text-muted)]">email@example.com</p>
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/6281349785960"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 mt-2"
          >
            <FaWhatsapp size={18} />
            Contact via WhatsApp
          </a>
        </div>

        {/* RIGHT: MAP */}
        <div className="card-base overflow-hidden relative group transition hover:shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.3739212935657!2d104.7788731!3d-2.9935426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b77000eb26751%3A0x7f4f22384f372ceb!2sRafflesia%20House!5e0!3m2!1sen!2sid!4v1774411230057!5m2!1sen!2sid"
            width="100%"
            height="100%"
            className="min-h-[320px] md:min-h-[420px]"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>

          {/* Overlay Button */}
          <a
            href="https://maps.google.com?q=Rafflesia+House+Palembang"
            target="_blank"
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-white transition"
          >
            Open in Maps
          </a>
        </div>
      </div>

      {/* LOCATION PHOTOS */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--color-primary)]">
          Surroundings
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img
            src="https://placehold.co/300x200?text=Front"
            className="rounded-lg object-cover w-full h-32 hover:scale-105 transition"
          />

          <img
            src="https://placehold.co/300x200?text=Street"
            className="rounded-lg object-cover w-full h-32 hover:scale-105 transition"
          />

          <img
            src="https://placehold.co/300x200?text=Nearby"
            className="rounded-lg object-cover w-full h-32 hover:scale-105 transition"
          />

          <img
            src="https://placehold.co/300x200?text=Area"
            className="rounded-lg object-cover w-full h-32 hover:scale-105 transition"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
