import { FaWhatsapp } from "react-icons/fa";

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/6281349785960"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition hover:scale-105 animate-[float_3s_ease-in-out_infinite]"
      style={{
        backgroundColor: "#C47A2C", // your orange
        color: "white",
      }}
    >
      <FaWhatsapp size={20} />
      <span className="hidden md:inline text-sm font-medium">WhatsApp</span>
    </a>
  );
}

export default FloatingWhatsApp;
