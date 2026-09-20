import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MessageSquare, Compass, CheckCircle2 } from 'lucide-react';
import { companyData } from '../../data/company';

export const AboutCreedCTA: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const creedWords = [
    'HUMBLE',
    'PRIVATE',
    'PHYSIOLOGICALLY SAFE',
    'CULTURALLY ROOTED',
    'UNHURRIED',
    '100% NATIVE SHERPA-LED',
  ];

  return (
    <section className="relative bg-[#0E2034] text-white py-28 md:py-36 overflow-hidden border-t border-white/10">
      {/* Subtle mountain contour backdrop */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      {/* Amber radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(229,169,60,0.12),transparent_70%)] pointer-events-none" />

      {/* Creed Bar - Horizontal Running Track */}
      <div className="relative border-b border-white/10 pb-14 mb-16 md:mb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
            {creedWords.map((word, i) => (
              <React.Fragment key={word}>
                <span className="text-xs sm:text-sm font-simplon-mono tracking-[0.28em] font-bold text-[#E5A93C] uppercase">
                  {word}
                </span>
                {i < creedWords.length - 1 && (
                  <span className="text-[#E5A93C]/40 text-xs select-none">◆</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs tracking-[0.22em] uppercase font-simplon-mono text-[#E5A93C] shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>Direct Mountain Advisory</span>
          </div>

          <h2 className="font-simplon text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-tight max-w-3xl mx-auto text-white">
            Ready to Walk the Himalayas with the People Who Call It Home?
          </h2>

          <p className="font-simplon text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-normal leading-relaxed">
            No intermediaries, no overseas call centres. When you enquire, you speak directly with
            our high-altitude expedition leads and Kathmandu route curators.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#E5A93C] text-[#102942] hover:bg-[#F2B64B] font-simplon-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase px-9 py-4 rounded-full transition-all duration-300 shadow-[0_8px_25px_rgba(229,169,60,0.35)] hover:shadow-[0_12px_32px_rgba(229,169,60,0.5)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Plan Your Private Journey</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <a
              href={`https://wa.me/${companyData.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20EcoSummit,%20I%20would%20like%20to%20inquire%20about%20a%20private%20Himalayan%20trek.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-simplon-mono text-xs sm:text-sm font-bold tracking-[0.16em] uppercase px-8 py-4 rounded-full backdrop-blur-md transition-all duration-300 hover:border-white/40"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Direct WhatsApp Desk</span>
            </a>
          </div>

          {/* Reassurance metadata points */}
          <div className="pt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 mt-14 text-left sm:text-center">
            <div className="space-y-1.5 bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur-xs">
              <div className="flex sm:justify-center items-center gap-2 text-white font-simplon text-base font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
                <span>Bespoke Private Pods</span>
              </div>
              <p className="text-xs font-simplon text-white/60 leading-relaxed">
                Tailored acclimatisation pace, private dining, never mixed commercial groups.
              </p>
            </div>

            <div className="space-y-1.5 bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur-xs">
              <div className="flex sm:justify-center items-center gap-2 text-white font-simplon text-base font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
                <span>Expedition Doctor Standby</span>
              </div>
              <p className="text-xs font-simplon text-white/60 leading-relaxed">
                Emergency telemedicine protocols and hyperbaric oxygen chambers on 24/7 alert.
              </p>
            </div>

            <div className="space-y-1.5 bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur-xs">
              <div className="flex sm:justify-center items-center gap-2 text-white font-simplon text-base font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
                <span>100% Porter Welfare Charter</span>
              </div>
              <p className="text-xs font-simplon text-white/60 leading-relaxed">
                Strict 15kg load ceilings, above-standard wages, and full heli rescue coverage.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
