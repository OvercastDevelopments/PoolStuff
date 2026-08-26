"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { asset } from "../lib/asset";

const SLIDES = [
  { src: asset("/hero/1.jpg"), alt: "Indoor aquatic centre with lane ropes, water polo goals and diving towers" },
  { src: asset("/hero/2.jpg"), alt: "Outdoor 50-metre competition pool with lane ropes and a water polo goal" },
  { src: asset("/hero/3.jpg"), alt: "Swimmers racing breaststroke down a lane pool at a competition" },
  { src: asset("/hero/4.jpg"), alt: "Water polo player shooting at goal during a match" },
  { src: asset("/hero/5.jpg"), alt: "Outdoor competition pool lanes divided by a red lane rope" },
  { src: asset("/hero/6.jpg"), alt: "Dolphin Wave 100 robotic pool cleaner beside a resort pool" },
  { src: asset("/hero/7.jpg"), alt: "Indoor competition pool lined with ANTI numbered starting blocks" },
  { src: asset("/hero/8.jpg"), alt: "Indoor splash pad with colourful interactive water play features" },
  { src: asset("/hero/9.jpg"), alt: "Yellow Pelican pool hoist poolside at an indoor accessibility pool" },
  { src: asset("/hero/10.jpg"), alt: "Lovibond MD150 photometer sending a test result to a phone" },
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
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/45 via-slate-900/35 to-slate-900/50" />

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className="px-1 py-3 group"
          >
            {/* The dot stays small; the padding above gives it a tappable box. */}
            <span
              className={
                "block h-2 rounded-full transition-all " +
                (i === index ? "w-8 bg-white" : "w-2 bg-white/50 group-hover:bg-white/80")
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
}
