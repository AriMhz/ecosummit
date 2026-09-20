import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroSlide } from '../../data/heroContent';

interface HeroControlsProps {
  slides: HeroSlide[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  progress: number; // 0 to 100
}

export const HeroControls: React.FC<HeroControlsProps> = ({
  slides,
  currentIndex,
  onSelectSlide,
  onPrev,
  onNext,
  progress,
}) => {
  return (
    <div className="flex items-center gap-6 sm:gap-8 select-none">
      {/* Slide Numbers & Progress Bars */}
      <div className="flex items-center gap-3 sm:gap-4">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const isPast = idx < currentIndex;
          const num = String(idx + 1).padStart(2, '0');

          return (
            <button
              key={slide.id}
              onClick={() => onSelectSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.location}`}
              className="group flex flex-col items-start gap-1 py-2 cursor-pointer focus:outline-hidden"
            >
              <span
                className={`font-mono text-[10px] sm:text-[11px] tracking-wider transition-colors duration-300 ${
                  isActive ? 'text-[#C6B59A] font-semibold' : 'text-white/40 group-hover:text-white/80'
                }`}
              >
                {num}
              </span>
              {/* Progress Line */}
              <div className="w-8 sm:w-12 h-[2px] bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#C6B59A]"
                  style={{
                    width: isActive ? `${progress}%` : isPast ? '100%' : '0%',
                  }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Prev / Next Minimal Tactile Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          aria-label="Previous slide"
          className="w-8 h-8 rounded-full border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 cursor-pointer focus:outline-hidden"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={onNext}
          aria-label="Next slide"
          className="w-8 h-8 rounded-full border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 cursor-pointer focus:outline-hidden"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
