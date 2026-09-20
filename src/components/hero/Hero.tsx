import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { heroContent } from '../../data/heroContent';

const SLIDE_INTERVAL_MS = 5500;

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = heroContent.slides;
  const totalSlides = slides.length;

  const startTimeRef = useRef<number>(performance.now());
  const rafRef = useRef<number>(0);

  const handleSelectSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Smooth rAF-based progress animation — reset on slide change
  useEffect(() => {
    startTimeRef.current = performance.now();
    setProgress(0);

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_INTERVAL_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [currentIndex, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const activeSlide = slides[currentIndex];

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen h-[100svh] bg-[#0E1412] text-white flex flex-col justify-end overflow-hidden">
      {/* 1. Full-screen Cinematic Background */}
      <HeroBackground slides={slides} currentIndex={currentIndex} />

      {/* 2. Main Hero Content (bottom-left anchor) */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-14 w-full flex-1 flex flex-col justify-end pb-10 sm:pb-14 lg:pb-16 pt-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <HeroContent
            slide={activeSlide}
            slides={slides}
            currentIndex={currentIndex}
            onSelectSlide={handleSelectSlide}
            progress={progress}
          />

          {/* Bottom-right: Location + Custom Trip — consistent inline pill */}
          <div className="hidden sm:flex items-center gap-4 select-none pb-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 px-4 py-2.5 rounded-full bg-black/25 backdrop-blur-md border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span className="font-medium text-white text-[12px]">{activeSlide.location}</span>
                  <span className="text-white/30">·</span>
                  <span className="font-mono text-[11px] text-white/60">{activeSlide.elevation}</span>
                </div>

                <span className="w-[1px] h-4 bg-white/15" />

                <Link
                  to="/plan-your-trip"
                  className="group inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors font-medium tracking-wide uppercase text-[10px]"
                >
                  <span>Custom Trip</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#FF5722]" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 3. Scroll cue — fades out after scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 select-none pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/35">Scroll</span>
        <motion.div
          className="w-[1px] bg-gradient-to-b from-white/50 to-transparent"
          animate={{ height: [16, 28, 16], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
};
