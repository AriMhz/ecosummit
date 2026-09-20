import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { HeroSlide } from '../../data/heroContent';

interface HeroBackgroundProps {
  slides: HeroSlide[];
  currentIndex: number;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ slides, currentIndex }) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Parallax translation: 0 to 120px over 900px scroll
  const parallaxY = useTransform(scrollY, [0, 900], [0, shouldReduceMotion ? 0 : 120]);

  // Preload all slide images into browser cache immediately
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.desktopImage;
      if (slide.mobileImage) {
        const mobImg = new Image();
        mobImg.src = slide.mobileImage;
      }
    });
  }, [slides]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0E1412] pointer-events-none select-none">
      {/* Animated Parallax Layer */}
      <motion.div style={{ y: parallaxY }} className="relative w-full h-[115%] -top-[7.5%]">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-1' : 'opacity-0 z-0'
              }`}
            >
              <picture>
                <source media="(max-width: 768px)" srcSet={slide.mobileImage} />
                  <img
                    src={slide.desktopImage}
                    alt={slide.alt}
                    className={`w-full h-full object-cover object-center lg:object-[60%_45%] brightness-[0.98] contrast-[1.05] transition-transform duration-[6500ms] ease-out ${
                      isActive ? 'scale-100' : 'scale-106'
                    }`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
              </picture>
            </div>
          );
        })}
      </motion.div>

      {/* Layer 1: Bottom-left text protection — stronger where text lives, transparent on right */}
      <div className="absolute inset-0 z-10" style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.05) 60%, transparent 100%)'
      }} />

      {/* Layer 2: Bottom edge vignette — anchors content without killing mid-frame */}
      <div className="absolute bottom-0 left-0 right-0 h-56 z-10" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.30) 50%, transparent 100%)'
      }} />

      {/* Layer 3: Soft top strip for navbar only */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/35 to-transparent z-10" />

      {/* Layer 4: Very subtle film grain */}
      <div className="absolute inset-0 grain-overlay opacity-12 pointer-events-none z-10" />
    </div>
  );
};
