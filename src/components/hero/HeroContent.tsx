import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import type { HeroSlide } from '../../data/heroContent';

interface HeroContentProps {
  slide: HeroSlide;
  slides: HeroSlide[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
  progress: number; // 0–100 for the animated progress bar
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export const HeroContent: React.FC<HeroContentProps> = ({
  slide,
  slides,
  currentIndex,
  onSelectSlide,
  progress,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full flex flex-col gap-0">

      {/* ── TOP: Slide counter + segmented progress bar ── */}
      <div className="flex items-center gap-5 mb-8 sm:mb-10 select-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28 }}
            className="font-mono tabular-nums"
          >
            <span className="text-white text-sm font-semibold">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/30 mx-1.5">/</span>
            <span className="text-white/45 text-xs">
              {String(slides.length).padStart(2, '0')}
            </span>
          </motion.span>
        </AnimatePresence>

        {/* Segmented progress tracks */}
        <div className="flex items-center gap-1.5">
          {slides.map((s, idx) => {
            const isActive = idx === currentIndex;
            const isPast = idx < currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => onSelectSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${s.title}`}
                className="group relative cursor-pointer focus:outline-none"
                style={{ width: isActive ? 52 : 22, height: 3 }}
              >
                <div className="absolute inset-0 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/35" />
                {isPast && <div className="absolute inset-0 rounded-full bg-white/55" />}
                {isActive && !shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#FF5722]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.12, ease: 'linear' }}
                  />
                )}
                {isActive && shouldReduceMotion && (
                  <div className="absolute inset-0 rounded-full bg-[#FF5722]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN TEXT BLOCK ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-start"
        >
          {/* Region badge */}
          <motion.div variants={itemVariants} className="flex items-center gap-2.5 mb-4 sm:mb-5">
            <span className="w-7 h-[1.5px] bg-[#FF5722] shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF5722]">
              {slide.tag}
            </span>
          </motion.div>

          {/* Monumental headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-[3.6rem] sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8rem] xl:text-[9rem] font-black text-white tracking-[-0.025em] leading-[0.9] mb-5 sm:mb-7 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          >
            {slide.title}
          </motion.h1>

          {/* Subtle divider */}
          <motion.div
            variants={itemVariants}
            className="w-10 h-[1.5px] bg-white/40 mb-5 sm:mb-6 shadow-sm"
          />

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-[13px] sm:text-[15px] text-white/90 font-normal tracking-wide leading-relaxed mb-7 sm:mb-8 max-w-[360px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          >
            {slide.tagline}
          </motion.p>

          {/* Dual Action CTAs: High-conversion buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
          >
            {/* Primary: Explore Journeys */}
            <Link
              to={slide.link || "/treks"}
              className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#E85D2A] hover:bg-[#d04e1e] text-white font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] shadow-[0_12px_28px_rgba(232,93,42,0.38)] hover:shadow-[0_16px_36px_rgba(232,93,42,0.52)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Journeys</span>
              <ArrowRight className="w-4 h-4 stroke-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary: Plan a Custom Trip */}
            <Link
              to="/plan-your-trip"
              className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/40 hover:border-white/70 text-white font-sans text-xs sm:text-[13px] font-medium uppercase tracking-[0.16em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              <Compass className="w-4 h-4 text-[#FF7A45] group-hover:rotate-45 transition-transform duration-500" />
              <span>Plan a Custom Trip</span>
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
