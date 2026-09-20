import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroActionsProps {
  primaryCta: {
    label: string;
    path: string;
  };
  secondaryCta: {
    label: string;
    path: string;
  };
}

export const HeroActions: React.FC<HeroActionsProps> = ({
  primaryCta,
  secondaryCta,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mt-7 sm:mt-8 flex items-center gap-6 select-none"
    >
      {/* Primary CTA: Refined Pill */}
      <Link
        to={primaryCta.path}
        className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#FDFBF7] text-[#17201D] hover:bg-[#C6B59A] hover:text-[#0E1412] font-medium text-xs sm:text-[13px] uppercase tracking-widest transition-all duration-300 shadow-lg"
      >
        <span>{primaryCta.label}</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>

      {/* Secondary CTA: Understated Editorial Link */}
      <Link
        to={secondaryCta.path}
        className="group inline-flex items-center gap-1.5 text-xs sm:text-[13px] uppercase tracking-widest text-white/80 hover:text-white font-medium transition-colors"
      >
        <span className="border-b border-white/30 group-hover:border-white pb-0.5 transition-colors">
          {secondaryCta.label}
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#C6B59A]" />
      </Link>
    </motion.div>
  );
};
