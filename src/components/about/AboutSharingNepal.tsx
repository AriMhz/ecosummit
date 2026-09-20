import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

export const AboutSharingNepal: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F5] relative overflow-hidden">
      {/* Topographic Contour Lines in background */}
      <svg
        className="absolute top-12 left-1/3 w-[600px] h-[600px] text-[#E8E2D8]/40 pointer-events-none -z-0"
        viewBox="0 0 500 500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M 50,250 C 70,180 150,150 250,150 C 350,150 430,200 450,270 C 470,340 380,410 280,420 C 180,430 30,320 50,250 Z" />
        <path d="M 90,250 C 110,195 170,175 250,175 C 330,175 390,210 410,265 C 430,320 360,380 280,390 C 200,400 70,305 90,250 Z" />
        <path d="M 130,250 C 145,210 190,195 250,195 C 310,195 355,220 370,260 C 385,300 330,350 270,355 C 210,360 115,290 130,250 Z" />
        <path d="M 170,250 C 180,225 210,215 250,215 C 290,215 320,230 330,255 C 340,280 305,315 265,320 C 225,325 160,275 170,250 Z" />
      </svg>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative */}
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
                About Us
              </span>
            </div>

            <span className="block text-[11px] font-simplon-mono uppercase tracking-[0.22em] text-[#8C938E] font-semibold">
              More than just a trip
            </span>

            {/* Main Headline */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] text-[#17201D] font-normal leading-[1.12] tracking-tight">
              We’re not just <br className="hidden sm:inline" />
              showing you Nepal, <br />
              <span className="italic text-[#f77f3c] font-serif font-normal">
                we’re sharing it.
              </span>
            </h2>

            {/* Body Prose */}
            <p className="font-sans text-sm sm:text-base text-[#59615D] leading-relaxed font-light max-w-lg">
              We are a team of passionate travel experts, local guides and adventure lovers,
              dedicated to creating meaningful journeys across Nepal and beyond. From the majestic
              Himalayas to hidden cultural gems, we design experiences that connect you with nature,
              people and the true spirit of the destination.
            </p>

            {/* Video Story Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="group inline-flex items-center gap-4 text-xs font-simplon-mono tracking-[0.16em] uppercase font-bold text-[#17201D] hover:text-[#f77f3c] transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#f77f3c] text-white flex items-center justify-center shadow-md group-hover:scale-105 group-hover:shadow-lg group-hover:bg-[#e06c28] transition-all duration-300">
                  <Play className="w-4 h-4 fill-white translate-x-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Layered Tilted Photographic Collage */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-6 relative pb-8 pt-4 sm:pt-0"
          >
            {/* Top script tag */}
            <div className="text-right pr-6 sm:pr-12 mb-3">
              <span className="font-serif italic text-2xl sm:text-3xl text-[#7E8A84] tracking-wide select-none">
                Explore · Experience · Belong
              </span>
            </div>

            <div className="relative mx-auto max-w-lg">
              {/* Orange corner L-bracket behind cards */}
              <div className="absolute -bottom-4 -right-4 w-28 h-28 border-r-4 border-b-4 border-[#f77f3c] rounded-br-2xl pointer-events-none z-0 hidden sm:block" />

              {/* Main Card: Tilted trekker overlooking peaks */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 -rotate-2 rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] sm:aspect-[4/5] max-w-[85%] bg-[#EAE6DF]"
              >
                <img
                  src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=85"
                  alt="Trekker looking at majestic Himalayan peaks"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Secondary Overlapping Polaroid Card: Boudhanath Stupa */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { rotate: 0, scale: 1.04 }}
                transition={{ duration: 0.4 }}
                className="absolute -bottom-6 right-0 sm:right-2 z-20 rotate-4 bg-white p-3.5 pb-8 rounded-xl shadow-2xl border border-[#EAE6DF] max-w-[210px] sm:max-w-[260px]"
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-[#FAF8F5]">
                  <img
                    src="https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=85"
                    alt="Boudhanath Stupa with colorful prayer flags in Kathmandu"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="font-serif italic text-xs text-[#59615D]">
                    Kathmandu Heritage · Boudha
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              <iframe
                src="https://www.youtube-nocookie.com/embed/1la3b7p4SgA?autoplay=1&rel=0"
                title="EcoSummit Nepal Himalayan Journey Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
