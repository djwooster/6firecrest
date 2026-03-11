"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface GalleryProps {
  images: { src: string; alt: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbTrack = useRef<HTMLDivElement>(null);

  const goTo = (index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  };

  const prev = () => {
    if (current > 0) goTo(current - 1, -1);
  };

  const next = () => {
    if (current < images.length - 1) goTo(current + 1, 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Scroll active thumbnail into view
  useEffect(() => {
    const thumb = thumbRefs.current[current];
    const track = thumbTrack.current;
    if (!thumb || !track) return;
    const thumbLeft = thumb.offsetLeft;
    const thumbRight = thumbLeft + thumb.offsetWidth;
    const trackScroll = track.scrollLeft;
    const trackWidth = track.offsetWidth;
    if (thumbLeft < trackScroll) {
      track.scrollTo({ left: thumbLeft - 8, behavior: "smooth" });
    } else if (thumbRight > trackScroll + trackWidth) {
      track.scrollTo({ left: thumbRight - trackWidth + 8, behavior: "smooth" });
    }
  }, [current]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div>
      {/* Main slide */}
      <div
        className="relative w-full bg-black rounded-2xl overflow-hidden"
        style={{ aspectRatio: "4/3" }}
      >
        <div
          className="relative w-full h-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={images[current].src}
                alt={images[current].alt}
                fill
                className="object-cover"
                priority={current === 0}
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next arrows */}
        {current > 0 && (
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full items-center justify-center shadow transition-colors z-10"
          >
            <ChevronLeft />
          </button>
        )}
        {current < images.length - 1 && (
          <button
            onClick={next}
            aria-label="Next photo"
            className="flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full items-center justify-center shadow transition-colors z-10"
          >
            <ChevronRight />
          </button>
        )}

        {/* Counter */}
        <div className="absolute top-3 right-3 z-10 bg-black/40 text-white text-xs px-2 py-1 rounded-full font-medium tracking-wide">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div
        ref={thumbTrack}
        className="flex gap-2 mt-2.5 overflow-x-auto no-scrollbar py-1"
      >
        {images.map((img, i) => (
          <button
            key={i}
            ref={(el) => { thumbRefs.current[i] = el; }}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`View photo ${i + 1}`}
            className="relative flex-none rounded-xl overflow-hidden transition-opacity"
            style={{
              width: 72,
              height: 54,
              opacity: i === current ? 1 : 0.85,
              outline: i === current ? "2px solid #0a0a0a" : "2px solid transparent",
              outlineOffset: 2,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="72px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
