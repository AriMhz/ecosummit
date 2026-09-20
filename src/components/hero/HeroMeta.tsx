import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Compass } from 'lucide-react';

interface HeroMetaProps {
  coordinates: string;
  region: string;
  year: string;
  tag: string;
  detail: string;
}

export const HeroMeta: React.FC<HeroMetaProps> = ({
  coordinates,
  region,
  year,
  tag,
  detail,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Vertical Side Coordinates (Desktop only) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="hidden 2xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6 pointer-events-none select-none text-white/45"
      >
        <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180">
          {coordinates} · {region}
        </span>
        <div className="w-[1px] h-16 bg-white/20" />
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase [writing-mode:vertical-rl] rotate-180 text-[#C6B59A]/80">
          {year}
        </span>
      </motion.div>

      {/* Micro Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 sm:mt-12 inline-flex items-center gap-3.5 py-2 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs text-white/75 select-none"
      >
        <div className="w-5 h-5 rounded-full bg-[#183E63]/60 flex items-center justify-center text-[#C6B59A]">
          <Compass className="w-3 h-3 stroke-[2.2]" />
        </div>
        <div className="flex items-center gap-2 text-xs font-light">
          <span className="font-semibold text-white/95 tracking-wider uppercase text-[10.5px]">
            {tag}
          </span>
          <span className="text-white/40">•</span>
          <span className="text-white/70 text-[11.5px]">{detail}</span>
        </div>
      </motion.div>
    </>
  );
};
