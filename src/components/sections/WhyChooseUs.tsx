import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldCheck,
  Compass,
  HeartHandshake,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const WhyChooseUs: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const pillars = [
    {
      id: 'sherpa-leadership',
      badge: '100% Local',
      title: 'Native Sherpa Leadership',
      highlight: 'Born & raised on Himalayan trails',
      description:
        'Led by veteran mountain guides with decades of high-altitude experience. We provide fair living wages and comprehensive gear insurance for every porter.',
      icon: <Award className="w-6 h-6 text-[#E85D2A]" />,
      stats: '15+ Years Peak Experience',
    },
    {
      id: 'tailored-pacing',
      badge: '1:4 Guide Ratio',
      title: 'Unhurried, Bespoke Pacing',
      highlight: 'Your rhythm, never a herd tour',
      description:
        'Conservative ascent profiles tailored to your personal fitness. Extra acclimatisation days built in so you soak in every sunrise without altitude sickness.',
      icon: <Compass className="w-6 h-6 text-[#E5A93C]" />,
      stats: 'Flexible Private Departures',
    },
    {
      id: 'medical-safety',
      badge: '24/7 Heli Standby',
      title: 'Rigorous Alpine Safety',
      highlight: 'Continuous health monitoring',
      description:
        'Twice-daily pulse oximeter tracking, comprehensive medical kits, satellite communications, and instant emergency helicopter dispatch on standby.',
      icon: <ShieldCheck className="w-6 h-6 text-[#38A169]" />,
      stats: '99.4% Safety Record',
    },
    {
      id: 'direct-value',
      badge: 'Zero Middleman',
      title: 'Direct Local Value',
      highlight: '100% stays in Nepal',
      description:
        'Directly operated from Kathmandu with transparent pricing. No foreign agency commissions — your investment directly empowers local mountain communities.',
      icon: <HeartHandshake className="w-6 h-6 text-[#4299E1]" />,
      stats: 'Direct Kathmandu Operator',
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#0C1724] text-white overflow-hidden">
      {/* ── Topographic Contour Lines & Ambient Glow ──────────── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Soft amber/orange summit glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[#E85D2A]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[#1A4574]/30 rounded-full blur-[150px]" />

        {/* Contour lines vector */}
        <svg
          className="absolute -top-10 -right-10 w-[600px] h-[600px] text-white/[0.03] pointer-events-none"
          viewBox="0 0 500 500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M 50,150 C 120,80 250,90 350,160 C 450,230 480,360 410,440 C 340,520 180,480 100,410 C 20,340 -20,220 50,150 Z" />
          <path d="M 90,170 C 150,110 260,120 340,180 C 420,240 440,340 380,410 C 320,480 190,440 120,380 C 50,320 30,230 90,170 Z" />
          <path d="M 130,190 C 180,140 270,150 330,200 C 390,250 400,320 350,380 C 300,440 200,400 140,350 C 80,300 80,240 130,190 Z" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* ── Section Header ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-14 mb-14 sm:mb-16">
          <div className="max-w-2xl space-y-3.5">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-[2px] bg-[#E85D2A] rounded-full" />
              <span className="font-simplon-mono text-xs uppercase tracking-[0.24em] text-[#E85D2A] font-bold">
                THE ECOSUMMIT STANDARD
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-white font-normal leading-[1.14] tracking-tight">
              Why EcoSummit
              <br />
              <span className="text-white/60 font-light italic text-2xl sm:text-3xl lg:text-[38px]">
                Built by Sherpas. Perfected for You.
              </span>
            </h2>

            {/* Short, Punchy Narrative */}
            <p className="font-sans text-sm sm:text-base text-white/75 leading-relaxed font-light max-w-xl pt-1">
              No middleman markups. No rushed tourist herds. Just authentic Himalayan expeditions guided by those who call these mountains home.
            </p>
          </div>

          {/* Right Action Link */}
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-xs font-simplon-mono font-bold tracking-[0.16em] uppercase text-[#E85D2A] hover:text-white transition-colors group shrink-0 pb-1"
          >
            <span>Our Mountain Ethos</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── 4 Enhanced Modern Cards Grid ────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-[#E85D2A]/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.25)] relative overflow-hidden"
            >
              {/* Subtle accent corner glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E85D2A]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div>
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-[10.5px] font-simplon-mono text-[#E5A93C] font-semibold tracking-wide">
                    {pillar.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-[22px] font-bold text-white group-hover:text-[#E85D2A] transition-colors leading-snug mb-1">
                  {pillar.title}
                </h3>

                {/* Highlight Tagline */}
                <p className="text-[12px] text-[#E5A93C] font-medium tracking-wide mb-3">
                  {pillar.highlight}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-white/70 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Stat Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/80 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#38A169] shrink-0" />
                <span className="truncate">{pillar.stats}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom Trust / Proof Strip ──────────────────────── */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-xs text-white/60 select-none">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E5A93C]" />
            <span className="font-medium text-white/90">Direct Operator in Thamel, Kathmandu</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38A169]" />
            <span>100% Certified Guides (TAAN / NMA Licensed)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E85D2A]" />
            <span>Ethical Porter Welfare Protocol Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
};
