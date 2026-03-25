import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ImageSlider({ images = [] }) {
  const [current, setCurrent] = useState(0);

  if (!images.length) {
    return (
      <img
        src="https://placehold.co/600x400?text=Room"
        className="w-full h-48 object-cover"
      />
    );
  }

  const prev = (e) => {
    e.preventDefault();
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = (e) => {
    e.preventDefault();
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative group">
      {/* Image */}
      <img
        src={images[current]}
        loading="lazy"
        className="w-full h-48 md:h-56 object-cover transition"
      />

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 w-full flex justify-center gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageSlider;
