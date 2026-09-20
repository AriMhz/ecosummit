import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const AboutExploreCTA: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-28 sm:py-36 bg-[#0E1720] text-white overflow-hidden">
      {/* Background Sunset Photography with Mountain Silhouettes & Prayer Flags */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85"
          alt="Himalayan mountain ranges at golden hour sunset"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Layered dark gradient vignettes for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1720]/90 via-[#0E1720]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1720] via-transparent to-[#0E1720]/50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl space-y-6 text-left"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#f77f3c]" />
            <span className="font-simplon-mono text-xs uppercase tracking-[0.25em] text-white/90 font-bold">
              Ready for your next adventure?
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-white font-normal leading-[1.12] tracking-tight">
            Let’s Explore Nepal Together
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-xl">
            Whether it’s your first time or your tenth, we’re here to make it an experience you’ll
            never forget.
          </p>

          {/* Action Button */}
          <div className="pt-4">
            <Link
              to="/plan-your-trip"
              className="inline-flex items-center gap-3 bg-[#f77f3c] hover:bg-[#e06c28] text-white font-simplon-mono text-xs sm:text-sm font-bold tracking-[0.16em] uppercase px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 group"
            >
              <span>Plan Your Trip</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
