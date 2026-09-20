import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

export const HimalayanWelcome: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-gradient-to-b from-[#150D09] via-[#1E120A] to-[#0E1412] text-white py-16 sm:py-20 md:py-24 overflow-hidden border-t border-[#E85D2A]/15 border-b border-black/60">
      {/* Decorative Ambient Himalayan Sunset & Terracotta Ember Flares */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Warm Terracotta Glow (Left) */}
        <div
          className="absolute -top-24 left-[10%] sm:left-[22%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(232,93,42,0.15),transparent_65%)] blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        {/* Warm Amber Glow (Right) */}
        <div
          className="absolute -bottom-24 right-[5%] sm:right-[16%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(229,169,60,0.12),transparent_65%)] blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        {/* Subtle Diagonal Sunset Light Streak */}
        <div
          className="absolute -top-20 left-[40%] sm:left-[44%] w-28 sm:w-40 h-[380px] sm:h-[500px] bg-gradient-to-b from-[#E85D2A]/[0.07] to-transparent transform -skew-x-[26deg] blur-md"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Welcoming Invitation */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -16 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-3 sm:space-y-4"
          >
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#E85D2A] rounded-full" />
              <span className="font-simplon-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.25em] text-[#E85D2A] block">
                Welcome to Nepal
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-light text-[#FDFBF7] leading-[1.28] tracking-tight">
              Let us accompany you on one of the <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FEEBC8] via-[#E5A93C] to-[#E85D2A]">most beautiful adventures</span> of your life
            </h3>
          </motion.div>

          {/* Right Column: Grounded Credibility Narrative & Link */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-5"
          >
            <p className="font-sans text-sm sm:text-[15.5px] text-[#D8C7B8] leading-relaxed font-light">
              EcoSummit Expeditions is a Nepal-based trekking and expedition company founded by former mountain guides with lifelong roots in the Himalayas. We are renowned for genuine personalized care, uncompromised wilderness safety, and an exceptional 98% trek summit success rate across Nepal, Bhutan, and Tibet.
            </p>

            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#E85D2A] hover:text-[#F6AD55] transition-colors group"
              >
                <span>Read our story</span>
                <span className="font-bold text-base transition-transform group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
