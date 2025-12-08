import React, { useEffect, useState } from "react";

export default function HeroCarousel({ height = "340px" }) {
  const slides = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const change = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(change);
  }, []);

  return (
    <div
      className="w-full overflow-hidden rounded-xl shadow-lg"
      style={{ height }}
    >
      {slides.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          className={`w-full h-full object-cover transition-all duration-[1200ms]
            ${i === index ? "opacity-100" : "opacity-0 absolute inset-0"}`}
        />
      ))}
    </div>
  );
}
