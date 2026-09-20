import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const AboutHero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  // Scroll tracking to move the text down as the user scrolls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // As the user scrolls down, the text glides down over the mountain slope
  const textY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 220]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.9, 0.1]);

  // Subtle image parallax
  const imgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '10%']);

  const desktopImgUrl =
    'https://images.prismic.io/elite-exped/3ddf2e78-f23f-402d-907d-2d36b13e89cc_Elite-Exped-Nimsdai-About-Our-Story.jpg?rect=0,5,3257,2171&w=1920&h=1280&auto=format,compress';
  const mobileImgUrl =
    'https://images.prismic.io/elite-exped/3ddf2e78-f23f-402d-907d-2d36b13e89cc_Elite-Exped-Nimsdai-About-Our-Story.jpg?rect=1075,0,1636,2181&w=900&h=1200&auto=format,compress';

  return (
    <section
      ref={containerRef}
      className="relative h-[92vh] sm:h-screen min-h-[580px] max-h-[940px] w-full overflow-hidden bg-[#1E2730]"
    >
      {/* Responsive Background Image: Desktop landscape + Mobile portrait crops */}
      <motion.div
        style={{ y: imgY }}
        className="absolute -top-[5%] -bottom-[5%] left-0 right-0 w-full h-[110%]"
      >
        <picture className="w-full h-full">
          {/* Portrait screens (smartphones in portrait, even in desktop-site mode) */}
          <source media="(orientation: portrait)" srcSet={mobileImgUrl} />
          {/* Mobile: narrow portrait slice for smartphones */}
          <source media="(max-width: 767px)" srcSet={mobileImgUrl} />
          {/* Desktop landscape */}
          <source media="(min-width: 768px) and (orientation: landscape)" srcSet={desktopImgUrl} />
          {/* Fallback default */}
          <img
            src={mobileImgUrl}
            alt="High-altitude mountaineering team ascending Himalayan snow ridge"
            className="w-full h-full object-cover object-[80%_center] sm:object-center select-none"
          />
        </picture>
      </motion.div>

      {/* Subtle atmospheric vignette on the left to ensure white text is 100% crisp */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 25% 45%, rgba(18, 25, 32, 0.45) 0%, rgba(18, 25, 32, 0.2) 55%, transparent 85%)',
        }}
      />
      {/* Left side soft gradient shadow */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none" />

      {/* Top atmospheric shadow for transparent navbar contrast */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-black/60 via-black/25 to-transparent pointer-events-none z-[1]" />

      {/* Content Container: Centered vertically */}
      <div className="relative z-10 h-full w-full flex items-center pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="max-w-2xl text-left"
          >
            {/* Solid Orange Category Badge (Exact Elite Exped style) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-[#f77f3c] text-white font-simplon-mono text-xs sm:text-[13px] font-bold tracking-[0.08em] uppercase px-3 py-1.5 mb-3.5 shadow-sm"
            >
              ABOUT US
            </motion.div>

            {/* Bold Brand Title with Period */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-simplon text-5xl sm:text-7xl lg:text-[84px] font-bold text-white tracking-[-0.035em] leading-none mb-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
            >
              EcoSummit.
            </motion.h1>

            {/* Short 3-Line Statement */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-simplon text-2xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-[-0.025em] leading-[1.12] drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]"
            >
              <p>
                Breath-taking, bespoke <br />
                Himalayan journeys led by <br />
                native mountain masters.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
