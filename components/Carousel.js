"use client";

import useEmblaCarousel from "embla-carousel-react";

export default function Carousel({ slides }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div className="flex space-x-4">
        {slides.map((src, idx) => (
          <img key={idx} src={src} className="flex-none w-64" />
        ))}
      </div>
    </div>
  );
}
