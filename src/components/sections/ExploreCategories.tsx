import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Wind,
  Sparkles,
} from 'lucide-react';
import trekkingHeroImg from '../../assets/1ba4ee33-e39c-438d-ac84-68df4f8e0017.png';
import chitwanImg from '../../assets/chitwan.png';

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
        {/* ── Section Header matching Featured Treks ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[62px] text-[#12365B] tracking-tight leading-tight">
            Explore Categories
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#59615D] leading-relaxed max-w-2xl mx-auto mt-3 font-normal">
            Discover the many ways to experience Nepal, from legendary high Himalayan trails to ancient heritage and wildlife safaris.
          </p>
        </div>

        {/* ── Primary Category Grid (1 Hero Card + 4 Balanced Grid Cards) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch mb-8 lg:mb-10">
          {/* Card 1: Trekking & Expeditions (Large Hero Card) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-[26px] overflow-hidden relative group min-h-[460px] sm:min-h-[520px] lg:h-full flex flex-col justify-between p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-500"
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

          {/* Right Column: 4 Balanced Cards in a 2x2 Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Card 2: Culture & Heritage */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-[24px] overflow-hidden relative group min-h-[240px] sm:min-h-[255px] flex flex-col justify-end p-6 shadow-md hover:shadow-2xl transition-all duration-500"
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
                  Ancient traditions &amp; UNESCO sites
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
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-[24px] overflow-hidden relative group min-h-[240px] sm:min-h-[255px] flex flex-col justify-end p-6 shadow-md hover:shadow-2xl transition-all duration-500"
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
                  Chitwan safaris &amp; royal tigers
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

            {/* Card 4: Luxury & Scenic Escapes */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[24px] overflow-hidden relative group min-h-[240px] sm:min-h-[255px] flex flex-col justify-end p-6 shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <Link
                to="/tours/nepal-panoramic-luxury-journey"
                className="absolute inset-0 z-20"
                aria-label="Luxury & Scenic Escapes"
              />

              <div className="absolute inset-0 z-0 bg-[#102942] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury & Scenic Escapes in Nepal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
              </div>

              {/* Top Sparkle Icon */}
              <div className="absolute top-5 left-5 z-10">
                <div className="w-8 h-8 rounded-lg bg-black/35 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#E5A93C]">
                  <Sparkles className="w-4 h-4 text-[#E5A93C]" />
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-[#E85D2A] transition-colors">
                  Luxury &amp; Escapes
                </h4>
                <p className="text-xs text-white/85 mt-0.5 font-light">
                  Helicopter tours &amp; boutique retreats
                </p>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/15">
                  <span className="text-[10px] font-simplon-mono text-white/80">
                    Bespoke Luxury
                  </span>
                  <span className="text-xs font-bold text-[#E85D2A] group-hover:text-white transition-colors inline-flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 5: Peak Climbing & Summits */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-[24px] overflow-hidden relative group min-h-[240px] sm:min-h-[255px] flex flex-col justify-end p-6 shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <Link
                to="/expeditions"
                className="absolute inset-0 z-20"
                aria-label="Peak Climbing & Summits"
              />

              <div className="absolute inset-0 z-0 bg-[#102942] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1000&q=80"
                  alt="Peak Climbing in Nepal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
              </div>

              {/* Top Wind / Summit Icon */}
              <div className="absolute top-5 left-5 z-10">
                <div className="w-8 h-8 rounded-lg bg-black/35 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <Wind className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-[#E85D2A] transition-colors">
                  Peak Climbing
                </h4>
                <p className="text-xs text-white/85 mt-0.5 font-light">
                  Mera Peak, Island Peak &amp; 6,000m summits
                </p>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/15">
                  <span className="text-[10px] font-simplon-mono text-white/80">
                    Alpine Summits
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
