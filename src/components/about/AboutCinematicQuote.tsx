import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Quote, Award } from 'lucide-react';

export const AboutCinematicQuote: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-28 sm:py-36 flex items-center justify-center overflow-hidden bg-[#0A141D]">
      {/* Background Mountaineering Photography with High-Contrast Treatment */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=2400&q=85"
          alt="Expedition team walking in line along high alpine Himalayan snow pass"
          loading="lazy"
          className="w-full h-full object-cover object-center grayscale contrast-125 opacity-35 scale-105"
        />
        {/* Film grain and layered dark vignette */}
        <div className="absolute inset-0 grain-overlay pointer-events-none opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A141D] via-[#0A141D]/75 to-[#0A141D]" />
        {/* Amber radial glow spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(229,169,60,0.12),transparent_70%)] pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10 text-center">
        {/* Stylized Accent Quotation Mark Icon */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="w-14 h-14 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#E5A93C] flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(229,169,60,0.25)]"
        >
          <Quote className="w-6 h-6 fill-current" />
        </motion.div>

        {/* Monumental Quote in SimplonNorm */}
        <motion.blockquote
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-simplon text-2xl sm:text-4xl md:text-5xl lg:text-[46px] text-white font-bold leading-[1.25] tracking-[-0.03em] max-w-4xl mx-auto"
        >
          “The Himalayas are not an obstacle course to conquer.{' '}
          <span className="text-[#E5A93C]">
            They are living temples.
          </span>{' '}
          When you walk these trails with reverence and patience, the mountains reveal everything they have to give.”
        </motion.blockquote>

        {/* Founder Attribution in SimplonMono */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mt-10 sm:mt-12 space-y-2 inline-flex flex-col items-center"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-[1.5px] bg-[#E5A93C]" />
            <p className="font-simplon-mono text-sm sm:text-base tracking-[0.22em] uppercase font-bold text-white">
              PASANG TENZING SHERPA
            </p>
            <span className="w-6 h-[1.5px] bg-[#E5A93C]" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-simplon-mono tracking-[0.16em] uppercase text-[#E5A93C]">
            <span>Co-Founder & Senior Mountain Lead</span>
            <span className="text-white/30 hidden sm:inline">·</span>
            <span className="text-white/70">Pangboche, Khumbu (3,985m)</span>
            <span className="text-white/30 hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1 text-white/90">
              <Award className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>UIAGM / NNMGA Certified</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
