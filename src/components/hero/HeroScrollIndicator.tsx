import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroScrollIndicatorProps {
  onScrollClick?: () => void;
}

export const HeroScrollIndicator: React.FC<HeroScrollIndicatorProps> = ({
  onScrollClick,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = () => {
    if (onScrollClick) {
      onScrollClick();
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.9,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="group flex flex-col items-center gap-2.5 text-white/50 hover:text-white transition-colors cursor-pointer select-none focus:outline-none"
      aria-label="Scroll to discover Nepal journeys"
    >
      <span className="font-mono text-[9.5px] font-medium tracking-[0.3em] uppercase transition-colors group-hover:text-white/90">
        Scroll to Discover
      </span>

      <div className="w-[1.5px] h-8 bg-white/20 relative overflow-hidden rounded-full">
        {!shouldReduceMotion && (
          <motion.div
            animate={{
              y: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: 'easeInOut',
            }}
            className="w-full h-1/2 bg-[#C6B59A] rounded-full"
          />
        )}
      </div>
    </motion.button>
  );
};
