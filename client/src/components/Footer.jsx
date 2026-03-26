import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/RAFFLESIA-01.png";

function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-surface-soft)]">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        {/* BRAND */}

        <div className="space-y-3">
          <img src={logo} className="h-6 mb-2" />
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Rafflesia House
          </h2>

          <p className="text-sm text-[var(--color-text-muted)]">
            Comfortable and peaceful living in the heart of Palembang.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="space-y-3">
          <h3 className="font-medium">Explore</h3>

          <div className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
            <Link to="/" className="hover:text-[var(--color-primary)]">
              Home
            </Link>
            <Link to="/rooms" className="hover:text-[var(--color-primary)]">
              Rooms
            </Link>
            <Link to="/about" className="hover:text-[var(--color-primary)]">
              About
            </Link>
          </div>
        </div>

        {/* ABOUT */}
        <div className="space-y-3">
          <h3 className="font-medium">About</h3>

          <div className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
            <a
              href="tel:+6281349785960"
              className="flex items-center gap-2 hover:text-[var(--color-primary)]"
            >
              <Phone size={16} />
              +62 813-4978-5960
            </a>

            <a
              href="https://wa.me/6281349785960"
              target="_blank"
              className="flex items-center gap-2 hover:text-[var(--color-primary)]"
            >
              <FaWhatsapp size={16} />
              WhatsApp
            </a>

            <div className="flex items-start gap-2">
              <MapPin size={16} />
              <span>
                Gang Rafflesia 2 No.156A, 14 Ulu, Plaju <br />
                Palembang, Indonesia
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-[var(--color-border)] text-center text-xs text-[var(--color-text-muted)] py-4">
        © {new Date().getFullYear()} Rafflesia House. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
