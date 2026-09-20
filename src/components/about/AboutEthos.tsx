import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, ShieldCheck, Users, Radio, Sparkles } from 'lucide-react';

export const AboutEthos: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const metrics = [
    {
      value: '18+',
      label: 'Years Guiding',
      detail: 'High passes, remote trails & 8000m summits',
      icon: Award,
    },
    {
      value: '100%',
      label: 'Native Mountain Team',
      detail: 'Born & acclimatised in the Khumbu and mid-hills',
      icon: Users,
    },
    {
      value: '1:1 / 2:1',
      label: 'Dedicated Guide Ratio',
      detail: 'Strict private pods, never mass commercial groups',
      icon: ShieldCheck,
    },
    {
      value: '24/7',
      label: 'Expedition Command',
      detail: 'Direct medical oximetry, satellite & rescue dispatch',
      icon: Radio,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] border-b border-[#E8E2D8]/80 relative overflow-hidden">
      {/* Subtle ambient gradient spotlight */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(229,169,60,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Elite Exped Animated Accent Underline */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 text-xs font-simplon-mono tracking-[0.25em] font-semibold text-[#183E63] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Our Ethos & Lineage</span>
            </div>

            <h2 className="font-simplon text-3xl sm:text-5xl lg:text-6xl font-bold text-[#102942] tracking-[-0.03em] leading-tight">
              This is who we are
            </h2>

            {/* Elite Exped Signature Underline with Animated Scale */}
            <motion.div
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="w-20 h-[3.5px] bg-[#E5A93C] rounded-full mt-5 mb-7 shadow-[0_2px_10px_rgba(229,169,60,0.4)]"
            />

            <p className="font-simplon text-base sm:text-lg text-[#59615D] leading-relaxed font-normal max-w-md">
              We operate exclusively from Kathmandu and high-altitude Himalayan valleys — combining
              uncompromising alpine safety standards with the deep hospitality of our mountain homes.
            </p>
          </motion.div>

          {/* Right Column: Lead Statement & Narrative in SimplonNorm */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="font-simplon text-2xl sm:text-3xl lg:text-4xl text-[#102942] font-semibold leading-snug tracking-tight">
              At EcoSummit, the mountains are not merely our workplace — they are our ancestry,
              our home, and our sacred terrain.
            </p>

            <p className="font-simplon text-base sm:text-lg text-[#4E5652] leading-relaxed font-normal">
              Founded by native Sherpa expedition leaders and Kathmandu mountain curators, we exist
              to offer an authentic antidote to high-volume commercial tourism. We reject the
              conveyor-belt model where mass groups are rushed along rigid schedules, acclimatisation
              is truncated to cut costs, and porters are left under-protected.
            </p>

            <p className="font-simplon text-base sm:text-lg text-[#4E5652] leading-relaxed font-normal">
              Every trek and expedition we curate is bespoke, private, and calibrated around your
              physiological wellbeing. When you reach out to us, you speak directly with the certified
              mountain guides and route planners who will meet you upon arrival in Nepal and accompany
              you into the high sanctuaries.
            </p>
          </motion.div>
        </div>

        {/* Provenance Metrics Bar — Upgraded with Elite Exped Style Cards & Icons */}
        <div className="mt-20 pt-14 border-t border-[#E8E2D8]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => {
              const IconComp = metric.icon;
              return (
                <motion.div
                  key={idx}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: idx * 0.1 }}
                  whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                  className="group relative p-6 sm:p-7 rounded-xl bg-white/80 backdrop-blur-xs border border-[#E8E2D8] hover:border-[#E5A93C]/60 hover:shadow-card-elevated transition-all duration-300"
                >
                  {/* Subtle top amber highlight on hover */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-transparent group-hover:bg-[#E5A93C] transition-colors duration-300 rounded-full" />

                  <div className="flex items-center justify-between mb-4">
                    <span className="font-simplon text-4xl sm:text-5xl font-bold text-[#102942] tracking-tight group-hover:text-[#183E63] transition-colors">
                      {metric.value}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#E5A93C]/10 border border-[#E5A93C]/20 flex items-center justify-center text-[#E5A93C] group-hover:bg-[#E5A93C] group-hover:text-[#102942] group-hover:scale-110 transition-all duration-300 shadow-xs">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="font-simplon-mono text-xs uppercase tracking-[0.16em] font-bold text-[#17201D] mb-1.5">
                    {metric.label}
                  </h4>

                  <p className="font-simplon text-xs text-[#59615D] leading-relaxed">
                    {metric.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
