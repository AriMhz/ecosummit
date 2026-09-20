import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Wind,
  Sparkles,
  Users,
  SunMedium,
  Camera,
} from 'lucide-react';
import trekkingHeroImg from '../../assets/1ba4ee33-e39c-438d-ac84-68df4f8e0017.png';
import chitwanImg from '../../assets/chitwan.png';

interface SpecializedCategory {
  title: string;
  image: string;
  link: string;
  icon: React.ReactNode;
}

const specializedCategories: SpecializedCategory[] = [
  {
    title: 'Adventure Sports',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=700&q=80',
    link: '/treks',
    icon: <Wind className="w-3.5 h-3.5" />,
  },
  {
    title: 'Luxury Escapes',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80',
    link: '/tours/nepal-panoramic-luxury-journey',
    icon: <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />,
  },
  {
    title: 'Family & Group Tours',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=700&q=80',
    link: '/tours',
    icon: <Users className="w-3.5 h-3.5" />,
  },
  {
    title: 'Wellness & Relaxation',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80',
    link: '/tours',
    icon: <SunMedium className="w-3.5 h-3.5 text-[#E5A93C]" />,
  },
  {
    title: 'Photography Journeys',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=700&q=80',
    link: '/treks',
    icon: <Camera className="w-3.5 h-3.5" />,
  },
];

export const ExploreCategories: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-[#FAF8F5] overflow-hidden text-[#17201D]">
      {/* ── Subtle Background Topographic Curves ───────────────── */}
      <svg
        className="absolute top-0 right-0 w-96 sm:w-[500px] lg:w-[650px] h-96 sm:h-[500px] lg:h-[650px] text-[#E2DDD5]/40 pointer-events-none z-0"
        viewBox="0 0 500 500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <path d="M 50,150 C 120,80 250,90 350,160 C 450,230 480,360 410,440 C 340,520 180,480 100,410 C 20,340 -20,220 50,150 Z" />
        <path d="M 90,170 C 150,110 260,120 340,180 C 420,240 440,340 380,410 C 320,480 190,440 120,380 C 50,320 30,230 90,170 Z" />
        <path d="M 130,190 C 180,140 270,150 330,200 C 390,250 400,320 350,380 C 300,440 200,400 140,350 C 80,300 80,240 130,190 Z" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* ── Section Header ─────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12 lg:mb-14">
          <div className="max-w-2xl">
            <span className="font-simplon-mono text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#17201D] uppercase block mb-3">
              EXPLORE CATEGORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#102942] font-normal leading-[1.12] tracking-tight">
              Discover Your Perfect
              <br />
              Travel Experience
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#59615D] leading-relaxed max-w-xl mt-3 font-normal">
              From Himalayan adventures and ancient cultures to serene nature escapes, discover the
              many ways to experience Nepal.
            </p>
            <Link
              to="/treks"
              className="inline-flex items-center gap-1.5 text-xs font-simplon-mono font-bold tracking-[0.14em] uppercase text-[#102942] hover:text-[#E85D2A] transition-colors mt-4 group"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Script Handwritten Note */}
          <div className="font-script text-2xl sm:text-3xl text-[#C26638] leading-tight self-start md:self-center md:text-right select-none pt-2 -rotate-1">
            <span>Different places.</span>
            <br />
            <span>One unforgettable journey.</span>
          </div>
        </div>

        {/* ── Primary Category Grid (Hero Card + 2 Stacked Cards) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-8 lg:mb-10">
          {/* Card 1: Trekking & Expeditions (Large Hero Card) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-[26px] overflow-hidden relative group min-h-[460px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-500"
          >
            <Link to="/treks" className="absolute inset-0 z-20" aria-label="Trekking & Expeditions" />

            {/* Background Photo */}
            <div className="absolute inset-0 z-0 bg-[#102942] overflow-hidden">
              <img
                src={trekkingHeroImg}
                alt="Trekking & Expeditions in Nepal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />
            </div>

            {/* Top Row: Mountain Icon (Left) + Coordinates (Right) */}
            <div className="relative z-10 flex items-center justify-between text-white/80">
              <div className="w-9 h-9 rounded-xl bg-black/35 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-sm">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M3 20h18L12 4 3 20z" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-simplon-mono text-[10px] tracking-widest text-white/70 uppercase">
                27°59'17" N · 86°55'31" E
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10">
              <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-[32px] text-white tracking-wide uppercase leading-tight group-hover:text-[#E85D2A] transition-colors">
                TREKKING &amp; EXPEDITIONS
              </h3>
              <p className="text-sm font-medium text-white/95 mt-1">
                Into the heart of the Himalayas
              </p>
              <p className="text-xs text-white/80 italic mt-2.5 font-light max-w-lg leading-relaxed">
                "Walk legendary trails, cross remote valleys and experience Nepal beyond the ordinary."
              </p>

              {/* Bottom Action Bar */}
              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[11px] font-simplon-mono text-white/90">
                  45+ Journeys Available
                </span>
                <span className="text-xs font-bold text-[#E85D2A] group-hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <span>Explore Journey</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stack of 2 Medium Landscape Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            {/* Card 2: Culture & Heritage */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-[24px] overflow-hidden relative group min-h-[220px] sm:min-h-[235px] flex-1 flex flex-col justify-end p-6 sm:p-7 shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <Link to="/tours" className="absolute inset-0 z-20" aria-label="Culture & Heritage" />

              <div className="absolute inset-0 z-0 bg-[#102942] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80"
                  alt="Culture & Heritage in Nepal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
              </div>

              {/* Top Pagoda / Temple Icon */}
              <div className="absolute top-5 left-5 z-10">
                <div className="w-8 h-8 rounded-lg bg-black/35 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M4 21h16M7 21v-7h10v7M2 14l10-8 10 8M10 6V3h4v3" />
                  </svg>
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-[#E85D2A] transition-colors">
                  Culture &amp; Heritage
                </h4>
                <p className="text-xs text-white/85 mt-0.5 font-light">
                  Immerse in ancient traditions
                </p>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/15">
                  <span className="text-[10px] font-simplon-mono text-white/80">
                    30+ Experiences
                  </span>
                  <span className="text-xs font-bold text-[#E85D2A] group-hover:text-white transition-colors inline-flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Nature & Wildlife */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[24px] overflow-hidden relative group min-h-[220px] sm:min-h-[235px] flex-1 flex flex-col justify-end p-6 sm:p-7 shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <Link
                to="/tours/nepal-wildlife-heritage-odyssey"
                className="absolute inset-0 z-20"
                aria-label="Nature & Wildlife"
              />

              <div className="absolute inset-0 z-0 bg-[#102942] overflow-hidden">
                <img
                  src={chitwanImg}
                  alt="Chitwan National Park Wildlife Safari in Nepal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
              </div>

              {/* Top Leaf Icon */}
              <div className="absolute top-5 left-5 z-10">
                <div className="w-8 h-8 rounded-lg bg-black/35 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c-.5 3.5-.5 6-1.5 8.5C16.3 13.5 14 16 11 20z" />
                    <path d="m2 21 7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-[#E85D2A] transition-colors">
                  Nature &amp; Wildlife
                </h4>
                <p className="text-xs text-white/85 mt-0.5 font-light">
                  Encounter diverse ecosystems
                </p>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/15">
                  <span className="text-[10px] font-simplon-mono text-white/80">
                    20+ Safaris
                  </span>
                  <span className="text-xs font-bold text-[#E85D2A] group-hover:text-white transition-colors inline-flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Specialized Styles (5 Bottom Compact Cards) ────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {specializedCategories.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Link to={item.link} className="group flex flex-col cursor-pointer">
                {/* Image Box */}
                <div className="aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden relative bg-[#102942] mb-3 shadow-xs group-hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                  {/* Floating Icon in top-left */}
                  <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                </div>

                {/* Text Info */}
                <div>
                  <h5 className="font-sans font-bold text-sm sm:text-[15px] text-[#102942] group-hover:text-[#E85D2A] transition-colors leading-snug">
                    {item.title}
                  </h5>
                  <span className="text-[11px] font-medium text-[#59615D] group-hover:text-[#E85D2A] transition-colors inline-flex items-center gap-1 mt-0.5">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom Micro CTA ───────────────────────────────────── */}
        <div className="mt-14 pt-8 border-t border-[#E2DDD5]/70 flex flex-col items-center justify-center text-center">
          <svg
            className="w-7 h-7 text-[#102942]/60 mb-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" strokeLinejoin="round" />
          </svg>
          <span className="font-simplon-mono text-xs font-bold tracking-[0.25em] text-[#17201D] uppercase">
            NEPAL HAS MORE TO OFFER
          </span>
          <Link
            to="/treks"
            className="text-xs font-medium text-[#59615D] hover:text-[#E85D2A] transition-colors inline-flex items-center gap-1.5 mt-1.5 group"
          >
            <span>Explore All Experiences</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
