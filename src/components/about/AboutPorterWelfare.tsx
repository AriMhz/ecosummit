import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Scale, HeartHandshake, ShieldPlus, Home, Heart } from 'lucide-react';
import type { WelfarePrinciple } from './types';

export const AboutPorterWelfare: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const standards: WelfarePrinciple[] = [
    {
      title: 'Strict 15kg Weight Ceilings',
      description:
        'We strictly adhere to International Porter Protection Group (IPPG) weight limits. Porters carry a maximum of 15kg of guest duffel gear, protecting their physical spine and trail stamina.',
      icon: Scale,
    },
    {
      title: 'Alpine Down Gear Issued',
      description:
        'Every porter and kitchen crew member is issued 700+ fill-power down jackets, weatherproof overtrousers, high-traction mountain boots, and UV400 glacier eye protection.',
      icon: ShieldPlus,
    },
    {
      title: 'Equal Medical & Heli Insurance',
      description:
        'Our mountain crew receives the identical emergency helicopter evacuation coverage and inpatient hospital care insurance provided to our international expedition leaders.',
      icon: HeartHandshake,
    },
    {
      title: 'Fair Wages & Warm Lodge Rest',
      description:
        'Above-standard union wages paid on schedule, guaranteed warm lodge beds with sleeping mattresses, and nutritious three-course meals alongside our guiding leads.',
      icon: Home,
    },
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#F7F5EF] border-b border-[#E8E2D8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#183E63]/10 text-xs font-simplon-mono tracking-[0.25em] font-semibold text-[#183E63] uppercase mb-3">
            <Heart className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Ethical Mountaineering Charter</span>
          </div>

          <h2 className="font-simplon text-3xl sm:text-5xl lg:text-6xl font-bold text-[#102942] tracking-[-0.03em] leading-tight">
            Guiding with dignity: <br />
            <span className="text-[#183E63]">Our porter & crew charter</span>
          </h2>

          <div className="w-20 h-[3.5px] bg-[#E5A93C] rounded-full mt-4 mb-6 shadow-xs" />

          <p className="font-simplon text-base sm:text-lg text-[#59615D] leading-relaxed font-normal">
            In the Himalayas, our porters and kitchen staff are not an anonymous workforce — they
            are our childhood neighbours, cousins, and mountain brothers. We protect their health and
            dignity with the exact same rigor we bring to every expedition client.
          </p>
        </div>

        {/* 4 Standards Cards with Elite Exped Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {standards.map((std, idx) => {
            const IconComp = std.icon;
            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={shouldReduceMotion ? {} : { y: -5, transition: { duration: 0.2 } }}
                className="bg-white p-8 rounded-2xl border border-[#E2DDD5] hover:border-[#E5A93C]/60 shadow-card-elevated hover:shadow-[0_20px_45px_rgba(16,41,66,0.1)] transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Top gold accent line on hover */}
                <div className="absolute top-0 left-8 right-8 h-[2.5px] bg-transparent group-hover:bg-[#E5A93C] transition-colors duration-300 rounded-full" />

                <div>
                  <div className="w-13 h-13 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/25 text-[#E5A93C] group-hover:bg-[#E5A93C] group-hover:text-[#102942] group-hover:scale-105 flex items-center justify-center mb-6 transition-all duration-300 shadow-xs">
                    <IconComp className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  <h3 className="font-simplon text-xl font-bold text-[#102942] mb-3 leading-snug tracking-tight group-hover:text-[#183E63] transition-colors">
                    {std.title}
                  </h3>

                  <p className="font-simplon text-sm text-[#59615D] leading-relaxed font-normal">
                    {std.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F0EBE1] flex items-center justify-between text-xs font-simplon-mono uppercase tracking-[0.15em] text-[#183E63]">
                  <span className="font-bold">Protocol {idx + 1}</span>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#E5A93C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] animate-pulse-glow" />
                    <span>Guaranteed</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
