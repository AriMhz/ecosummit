import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import logoImg from '../../assets/logo.png';

export const CompanyIntro: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#FAF8F5] border-b border-[#E8E2D8]/80 py-20 sm:py-24 md:py-28">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Centered Brand Emblem & Wordmark */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-8 sm:mb-10"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-3xl bg-white p-2.5 sm:p-3 shadow-md border border-[#E8E2D8] flex items-center justify-center hover:scale-105 transition-transform duration-300">
            <img
              src={logoImg}
              alt="EcoSummit Nepal"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-sans text-sm sm:text-base font-bold tracking-[0.38em] uppercase text-[#183E63] mt-4 block">
            ECOSUMMIT
          </span>
          <span className="text-[11px] sm:text-xs font-medium tracking-[0.3em] uppercase text-[#59615D] mt-1">
            EXPEDITIONS · NEPAL
          </span>
        </motion.div>

        {/* Centered Editorial Paragraph in Cormorant Garamond */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] text-[#17201D] font-normal leading-[1.5] sm:leading-[1.55] text-center max-w-4xl mx-auto tracking-[-0.015em]"
        >
          Founded on the lifelong mountain expertise of native Sherpa expedition leaders and Kathmandu high-altitude specialists — we believe Himalayan travel should be personal, unhurried, and deeply grounded in genuine local care. EcoSummit will guide you beyond the ordinary, into the heart of the world’s greatest mountains.
        </motion.p>

        {/* Minimalist Centered Warm Accent Divider */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-16 sm:w-20 h-[2.5px] bg-[#E5A93C] mx-auto mt-10 sm:mt-12"
        />
      </div>
    </section>
  );
};
