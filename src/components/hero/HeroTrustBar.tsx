import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldCheck,
  Compass,
  HeartPulse,
  Sparkles,
  Clock,
  Leaf,
} from 'lucide-react';

interface TrustItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  badge?: string;
}

const trustItems: TrustItem[] = [
  {
    icon: ShieldCheck,
    title: 'Govt. Licensed Operator',
    subtitle: 'Ministry of Tourism & TAAN Active Member',
    badge: 'Official',
  },
  {
    icon: Compass,
    title: 'Native Sherpa Leadership',
    subtitle: '100% Born & Raised High-Altitude Guides',
  },
  {
    icon: HeartPulse,
    title: 'Safety-First Protocols',
    subtitle: 'Certified WFR Guides & Oxygen on Route',
  },
  {
    icon: Sparkles,
    title: '100% Tailor-Made',
    subtitle: 'Bespoke Private Pacing & Custom Routes',
  },
  {
    icon: Clock,
    title: '24/7 Kathmandu Operations',
    subtitle: 'Live Satellite SOS & Emergency Dispatch',
  },
  {
    icon: Leaf,
    title: 'Ethical & Eco-Conscious',
    subtitle: 'Porter Welfare Standards & Leave No Trace',
  },
];

export const HeroTrustBar: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="EcoSummit Credentials and Trust Guarantees"
      className="relative z-20 bg-[#0B131D] text-white border-y border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.35)]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-center">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex items-start gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 text-[#E85D2A] group-hover:bg-[#E85D2A] group-hover:text-white group-hover:border-[#E85D2A] transition-all duration-300 shadow-xs">
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="font-sans text-[12px] sm:text-[13px] font-bold text-white tracking-tight leading-snug group-hover:text-[#FF7A45] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <p className="font-sans text-[10.5px] sm:text-[11px] text-white/60 font-light leading-snug mt-0.5 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
