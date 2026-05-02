"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { asset } from "../lib/asset";

const SLIDES = [
  { src: asset("/hero/1.jpg"), alt: "Swimmer doing butterfly stroke in a lap pool" },
  { src: asset("/hero/2.jpg"), alt: "Resort swimming pool with sun loungers" },
  { src: asset("/hero/3.jpg"), alt: "Swimmer doing freestyle in a lane pool" },
  { src: asset("/hero/4.jpg"), alt: "Multiple swimmers racing across pool lanes" },
  { src: asset("/hero/5.jpg"), alt: "Lane pool with a swimmer mid-lap" },
];

const INTERVAL_MS = 5500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          className={
            "absolute inset-0 transition-opacity duration-1000 ease-in-out " +
            (i === index ? "opacity-100" : "opacity-0")
          }
          aria-hidden={i !== index}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-700/80 via-sky-800/70 to-cyan-900/75" />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={
              "h-2 rounded-full transition-all " +
              (i === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80")
            }
          />
        ))}
      </div>
    </div>
  );
}
