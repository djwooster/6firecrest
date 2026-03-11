"use client";

import { motion } from "framer-motion";
import Gallery from "./components/Gallery";

// ─── Property data — update these fields ─────────────────────────────────────
const property = {
  address: {
    street: "6 Firecrest Ln",
    city: "Aliso Viejo, CA 92656",
  },
  beds: 3,
  baths: 2.5,
  sqft: "1,417",
  lotSize: "3,000 sqft",
  description:
    "A beautifully updated craftsman bungalow nestled on a quiet, tree-lined street. Original hardwood floors, an open-concept kitchen with quartz countertops, and a sun-drenched backyard perfect for entertaining. Minutes from top-rated schools, local restaurants, and the park.",
};

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  { src: "/10-(42)-web-or-mls-6%20Firecrest%2042.jpg", alt: "Photo 1" },
  { src: "/11-web-or-mls-6%20Firecrest%2011.jpg", alt: "Photo 2" },
  { src: "/17-web-or-mls-6%20Firecrest%2017.jpg", alt: "Photo 3" },
  { src: "/18-web-or-mls-6%20Firecrest%2018.jpg", alt: "Photo 4" },
  { src: "/19-web-or-mls-6%20Firecrest%2019.jpg", alt: "Photo 5" },
  { src: "/20-web-or-mls-6%20Firecrest%2020.jpg", alt: "Photo 6" },
  { src: "/21-web-or-mls-6%20Firecrest%2021.jpg", alt: "Photo 7" },
  { src: "/22-web-or-mls-6%20Firecrest%2022.jpg", alt: "Photo 8" },
  { src: "/23-web-or-mls-6%20Firecrest%2023.jpg", alt: "Photo 9" },
  { src: "/27-web-or-mls-6%20Firecrest%2027.jpg", alt: "Photo 10" },
  { src: "/29-web-or-mls-6%20Firecrest%2029.jpg", alt: "Photo 11" },
  { src: "/30-web-or-mls-6%20Firecrest%2030.jpg", alt: "Photo 12" },
  { src: "/33-web-or-mls-6%20Firecrest%2033.jpg", alt: "Photo 13" },
  { src: "/34-web-or-mls-6%20Firecrest%2034.jpg", alt: "Photo 14" },
  { src: "/36-web-or-mls-6%20Firecrest%2036.jpg", alt: "Photo 15" },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.45, ease },
  };
}

export default function Home() {
  const stats = [
    { icon: <BedIcon />, label: "Beds", value: property.beds },
    { icon: <BathIcon />, label: "Baths", value: property.baths },
    { icon: <SqftIcon />, label: "Sq Ft", value: property.sqft },
    { icon: <LotIcon />, label: "Lot", value: property.lotSize },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full md:max-w-[70vw] md:mx-auto">
        {/* Header — address + stats above the gallery */}
        <div className="px-5 md:px-0 pt-10 pb-6">
          {/* Street */}
          <motion.h1
            {...fadeUp(0)}
            className="text-3xl font-bold tracking-tight leading-tight text-gray-950"
          >
            {property.address.street}
          </motion.h1>

          {/* City */}
          <motion.p {...fadeUp(0.06)} className="text-sm font-medium text-gray-400 mt-1 uppercase tracking-widest">
            {property.address.city}
          </motion.p>

          {/* Stats row */}
          <motion.div {...fadeUp(0.12)} className="flex items-center gap-0 mt-5 divide-x divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex-1 flex flex-col items-center gap-1.5 py-4 px-1"
              >
                <span className="text-gray-400">{s.icon}</span>
                <span className="text-[15px] font-bold leading-none tabular-nums text-gray-950">
                  {s.value}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gallery */}
        <Gallery images={images} />

        {/* Description */}
        <div className="px-5 md:px-0 pt-7 pb-20">
          <motion.h4
            {...fadeUp(0.16)}
            className="text-lg font-semibold tracking-tight text-gray-950 mb-2"
          >
            About this home
          </motion.h4>
          <motion.p
            {...fadeUp(0.2)}
            className="text-gray-500 text-[15px] md:text-[17px] leading-relaxed md:max-w-[50%]"
          >
            {property.description}
          </motion.p>
        </div>
      </div>
    </main>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function BedIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5" />
      <path d="M2 20v-3a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v3" />
      <path d="M2 20h20" />
      <path d="M7 13V9" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      <line x1="4" x2="20" y1="13" y2="13" />
    </svg>
  );
}

function SqftIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function LotIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-8h6v8" />
    </svg>
  );
}
