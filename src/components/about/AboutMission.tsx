import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mountain, HeartHandshake, Leaf, Quote } from 'lucide-react';

export const AboutMission: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const pillars = [
    {
      title: 'Authentic Experiences',
      icon: Mountain,
    },
    {
      title: 'Local Support',
      icon: HeartHandshake,
    },
    {
      title: 'Sustainable Travel',
      icon: Leaf,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-[#EFECE6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mission Narrative & 3 Pillars */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#f77f3c]" />
              <span className="font-simplon-mono text-xs uppercase tracking-[0.25em] text-[#17201D] font-bold">
                Our Mission
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#17201D] font-normal leading-[1.2] tracking-tight">
              To create life-changing journeys that inspire, connect and preserve.
            </h2>

            {/* Body Description */}
            <p className="font-sans text-sm sm:text-base text-[#59615D] leading-relaxed font-light max-w-lg">
              Our mission is to make travel more than just a vacation — it’s a way to experience
              new cultures, support local communities and protect the natural beauty of our planet.
              We believe in responsible tourism and unforgettable experiences that leave a positive impact.
            </p>

            {/* 3 Pillars Row */}
            <div className="pt-6 grid grid-cols-3 gap-4 sm:gap-6 border-t border-[#EFECE6]">
              {pillars.map((pillar, idx) => {
                const IconComp = pillar.icon;
                return (
                  <div key={idx} className="space-y-3 text-left group">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#f77f3c] group-hover:scale-105 group-hover:border-[#f77f3c] transition-all duration-300">
                      <IconComp className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h4 className="font-sans text-xs sm:text-sm font-semibold text-[#17201D] leading-snug">
                      {pillar.title}
                    </h4>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Featured Image with Floating Navy Quote Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            {/* Main Photography Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/11] bg-[#EAE6DF]">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85"
                alt="High-altitude Himalayan alpine lake with stone chorten cairn"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              {/* Floating Navy Quote Card (Matching Reference Image) */}
              <div className="absolute top-6 left-6 max-w-[240px] sm:max-w-[280px] bg-[#102942]/95 backdrop-blur-md p-6 rounded-xl text-white shadow-2xl border border-white/10">
                <Quote className="w-6 h-6 text-[#f77f3c] fill-current mb-3" />
                <p className="font-serif italic text-base sm:text-lg leading-snug text-white/95">
                  Not just destinations, but stories that stay with you forever.
                </p>
                <div className="w-8 h-[2px] bg-[#f77f3c] mt-4" />
              </div>
            </div>

            {/* Orange vertical accent bar on the right */}
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-20 bg-[#f77f3c] rounded-full hidden sm:block shadow-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
