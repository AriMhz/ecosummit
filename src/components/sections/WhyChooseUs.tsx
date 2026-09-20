import React from 'react';

export const WhyChooseUs: React.FC = () => {
  const cards = [
    {
      id: 'local-expertise',
      title: 'Local Expertise & Authentic Experiences',
      description:
        'Explore Nepal with experienced local guides who know the mountains, culture, and hidden trails deeply. Our team ensures genuine experiences while supporting local communities and sustainable tourism.',
      icon: (
        <svg
          className="w-16 h-16 text-[#1A62B6]"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle soft tint backing for depth */}
          <circle cx="36" cy="36" r="30" fill="#EDF5FD" />

          {/* Guide Head & Hair */}
          <circle cx="33" cy="22" r="9.5" stroke="#1A62B6" strokeWidth="2.5" fill="#FFFFFF" />
          <path
            d="M26 17.5 C 29 13.5, 37 13.5, 40 17.5"
            stroke="#1A62B6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Smile */}
          <path
            d="M30 24.5 Q 33 27 36 24.5"
            stroke="#1A62B6"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Shoulders */}
          <path
            d="M21 44 C 21 34.5, 25.5 32.5, 33 32.5 C 40.5 32.5, 45 34.5, 45 44"
            stroke="#1A62B6"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="#FFFFFF"
          />

          {/* Laptop */}
          <rect
            x="24"
            y="41"
            width="18"
            height="11"
            rx="2"
            fill="#FFFFFF"
            stroke="#1A62B6"
            strokeWidth="2.5"
          />
          <line x1="20" y1="52" x2="46" y2="52" stroke="#1A62B6" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="33" cy="46.5" r="1.5" fill="#1A62B6" />

          {/* Location Pin */}
          <g transform="translate(13, 3)">
            <path
              d="M34 32 C34 27.5 37.5 24 42 24 C46.5 24 50 27.5 50 32 C50 38 42 45 42 45 C42 45 34 38 34 32 Z"
              fill="#E85D2A"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <circle cx="42" cy="32" r="2.5" fill="#FFFFFF" />
          </g>
        </svg>
      ),
    },
    {
      id: 'customized-trips',
      title: 'Customized Trips for Every Traveler',
      description:
        'Whether you are planning a trekking adventure, cultural tour, peak climbing expedition, or family holiday, we design flexible itineraries based on your interests, schedule, fitness level, and budget.',
      icon: (
        <svg
          className="w-16 h-16 text-[#1A62B6]"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle soft tint backing */}
          <circle cx="36" cy="36" r="30" fill="#EDF5FD" />

          {/* Center pole */}
          <line x1="36" y1="14" x2="36" y2="56" stroke="#1A62B6" strokeWidth="2.8" strokeLinecap="round" />
          
          {/* Top Sign pointing left */}
          <path
            d="M21 23 L36 23 L36 32 L21 32 L15 27.5 Z"
            fill="#FFFFFF"
            stroke="#1A62B6"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line x1="20" y1="27.5" x2="31" y2="27.5" stroke="#E85D2A" strokeWidth="2" strokeLinecap="round" />

          {/* Bottom Sign pointing right */}
          <path
            d="M36 34 L51 34 L57 38.5 L51 43 L36 43 Z"
            fill="#FFFFFF"
            stroke="#1A62B6"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line x1="41" y1="38.5" x2="52" y2="38.5" stroke="#E85D2A" strokeWidth="2" strokeLinecap="round" />

          {/* Cloud base */}
          <path
            d="M22 56 C22 51.5 26.5 49 31 51 C33 47.5 40 47.5 42 51 C46.5 49 51 51.5 51 56 Z"
            fill="#FFFFFF"
            stroke="#1A62B6"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'luxury-premium',
      title: 'Luxury & Premium Experiences',
      description:
        'Enjoy carefully designed journeys with premium accommodations, private transportation, personalized services, and attention to every detail for a comfortable and elevated travel experience.',
      icon: (
        <svg
          className="w-16 h-16 text-[#1A62B6]"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle soft tint backing */}
          <circle cx="36" cy="36" r="30" fill="#EDF5FD" />

          {/* Top Star */}
          <path
            d="M36 12 L38.8 19 L46 19.5 L40.5 24.5 L42.2 31.5 L36 27.8 L29.8 31.5 L31.5 24.5 L26 19.5 L33.2 19 Z"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Star Sparkle Rays */}
          <line x1="36" y1="6" x2="36" y2="8.5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="47" y1="14" x2="49" y2="12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="25" y1="14" x2="23" y2="12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

          {/* 3 Tier Podium */}
          {/* Top step */}
          <rect
            x="27"
            y="35"
            width="18"
            height="7"
            rx="2"
            fill="#FFFFFF"
            stroke="#1A62B6"
            strokeWidth="2.5"
          />
          {/* Middle step */}
          <rect
            x="20"
            y="42"
            width="32"
            height="7"
            rx="2"
            fill="#FFFFFF"
            stroke="#1A62B6"
            strokeWidth="2.5"
          />
          {/* Bottom step */}
          <rect
            x="14"
            y="49"
            width="44"
            height="7"
            rx="2"
            fill="#FFFFFF"
            stroke="#1A62B6"
            strokeWidth="2.5"
          />
        </svg>
      ),
    },
    {
      id: '24-7-support',
      title: '24/7 Dedicated Travel Assistance',
      description:
        'Travel with confidence knowing our support team is available before, during, and after your trip. We are always ready to assist with guidance, updates, and any travel needs throughout your adventure.',
      icon: (
        <svg
          className="w-16 h-16 text-[#1A62B6]"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle soft tint backing */}
          <circle cx="36" cy="36" r="30" fill="#EDF5FD" />

          {/* Classic Telephone Handset */}
          <path
            d="M20 20 C20 37 34 51 51 51 L53.5 44.5 C54 42.8 52.5 41 50.8 40.5 L43.5 37 C41.8 36.2 39.8 37.2 39 38.5 L36.5 41.5 C30.5 38 26.5 33.5 23.5 27.5 L26.5 25 C27.8 23.8 28.5 21.8 28 20.2 L24.5 12.8 C24 11 22.2 9.5 20.5 10 Z"
            fill="#FFFFFF"
            stroke="#1A62B6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 24/7 Badge */}
          <g transform="translate(38, 16)">
            <rect x="0" y="0" width="22" height="13" rx="4" fill="#E85D2A" />
            <text
              x="11"
              y="9.5"
              fill="#FFFFFF"
              fontSize="9"
              fontWeight="bold"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="0.4"
            >
              24/7
            </text>
          </g>
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-28 bg-gradient-to-r from-[#123356] via-[#1A4574] to-[#245B96] text-white overflow-hidden">
      {/* ── Soft Atmospheric Background Elements ─────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-white/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#E85D2A]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* ── Top Header Row ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-16 mb-14 sm:mb-16">
          {/* Left Title */}
          <div className="lg:max-w-md">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.18] font-sans">
              Why EcoSummit
            </h2>
          </div>

          {/* Right Introductory Narrative */}
          <div className="lg:max-w-xl">
            <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal">
              At EcoSummit Expeditions, we believe every journey should be meaningful, safe, and unforgettable. With experienced local guides, personalized itineraries, and dedicated support, we create authentic Himalayan adventures tailored to your travel goals.
            </p>
          </div>
        </div>

        {/* ── 4 Clean White Cards Grid ────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-7 sm:p-8 flex flex-col justify-start shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 transition-all duration-300 group"
            >
              {/* Large, Prominent Icon Logo */}
              <div className="mb-7 flex items-center justify-start group-hover:scale-105 transition-transform duration-300">
                {card.icon}
              </div>

              {/* Card Title */}
              <h3 className="text-lg sm:text-[19px] font-bold text-[#143D6B] leading-snug mb-3">
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="text-sm text-[#4A5568] leading-relaxed font-normal">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
