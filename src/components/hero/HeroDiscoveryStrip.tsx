import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { HeroCorridor } from '../../data/heroContent';

interface HeroDiscoveryStripProps {
  corridors: HeroCorridor[];
}

export const HeroDiscoveryStrip: React.FC<HeroDiscoveryStripProps> = ({ corridors }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.75 }}
      className="hidden md:flex items-center gap-6 text-xs text-white/60 select-none"
    >
      <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.25em] text-[#C6B59A] shrink-0">
        <span>Explore by Corridor:</span>
      </div>

      <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
        {corridors.map((c, idx) => (
          <React.Fragment key={c.label}>
            <Link
              to={c.path}
              className="text-white/70 hover:text-white transition-colors duration-200 text-xs font-light tracking-wide hover:underline underline-offset-4"
            >
              {c.label}
            </Link>
            {idx < corridors.length - 1 && (
              <span className="text-white/25 select-none">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};
