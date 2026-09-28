import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Quote,
  ShieldCheck,
  Trees,
  LifeBuoy,
  BookOpen,
} from 'lucide-react';

import floodReliefImg from '../../assets/nepal_flood_relief.jpg';
import rescueAidImg from '../../assets/nepal_rescue_aid.jpg';

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const communityFeatures: FeatureItem[] = [
  {
    id: 'flood-relief',
    icon: <ShieldCheck className="w-5 h-5 text-[#34D399]" />,
    title: 'Emergency Flood Relief',
    description:
      'Delivering emergency food packages, clean drinking water, and dry rations to flood-affected mountain families.',
  },
  {
    id: 'trail-cleanups',
    icon: <Trees className="w-5 h-5 text-[#34D399]" />,
    title: 'High-Altitude Cleanups',
    description:
      'Sherpa-led seasonal sweeps removing plastics, clearing debris, and protecting fragile glacial water sources.',
  },
  {
    id: 'rescue-aid',
    icon: <LifeBuoy className="w-5 h-5 text-[#34D399]" />,
    title: 'Rapid Rescue & Evacuation',
    description:
      'Mobilizing local guides for emergency trail logistics, search operations, and flood-stranded villager crossings.',
  },
  {
    id: 'village-schools',
    icon: <BookOpen className="w-5 h-5 text-[#34D399]" />,
    title: 'Himalayan Village Schools',
    description:
      'Equipping remote classrooms with books, stationery, solar lighting, and warm winter uniforms for children.',
  },
];

export const VoluntaryWork: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-[#062016] via-[#08281C] to-[#04160F] text-white overflow-hidden">
      {/* ── Ambient Glow & Texture ─────────────────────────────────── */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#10B981]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#047857]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          
          {/* ── Left Column: Editorial & Storytelling ──────────────── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 xl:col-span-7"
          >
            {/* Main Header */}
            <div className="mb-6">
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                Giving Back to{' '}
                <span className="text-[#34D399]">Nepal's Communities</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/80 font-medium mt-2">
                Emergency Flood Relief, Mountain Rescues &amp; Grassroots Himalayan Support
              </p>
            </div>

            {/* Editorial Story with Quote Icon */}
            <div className="relative pl-0 sm:pl-2 mb-8 sm:mb-10 space-y-4">
              <div className="flex items-start gap-3.5">
                <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[#34D399] shrink-0 fill-[#34D399]/20 -scale-x-100 mt-1" />
                <p className="font-sans text-xs sm:text-[14px] text-white/85 leading-relaxed font-light">
                  EcoSummit Expeditions is more than an adventure company—we are deeply rooted in the Himalayan communities we journey through. When monsoon floods, landslides, and mountain crises strike vulnerable valleys, our local guides, porters, and emergency teams mobilize immediately to deliver critical aid where roads cannot reach.
                </p>
              </div>

              <p className="font-sans text-xs sm:text-[14px] text-white/75 leading-relaxed font-light pl-0 sm:pl-11">
                We believe that every expedition should leave a positive, lasting footprint. A direct portion of every trek funds emergency relief drives, stranded traveller and villager rescues, classroom books for children, and high-altitude trail sweeps. With every journey you take with us, you stand beside the people of Nepal.
              </p>
            </div>

            {/* ── 2x2 Feature Grid (Matching Reference Design) ────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-4 border-t border-white/10">
              {communityFeatures.map((item) => (
                <div key={item.id} className="flex items-start gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-[#34D399]/15 border border-[#34D399]/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#34D399]/25 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm sm:text-[15px] text-white leading-snug group-hover:text-[#34D399] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-white/70 leading-relaxed mt-1 font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── CTA Button ────────────────────────────────────────── */}
            <div className="mt-8 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-xl hover:scale-105"
              >
                <span>Support Our Community Relief</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* ── Right Column: Overlapping Photos Composition ────── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 xl:col-span-5 relative flex flex-col items-center lg:items-end justify-center py-4"
          >
            {/* Top Photo: Flood Relief Donation & Food Aid */}
            <div className="w-full sm:w-[92%] lg:w-[90%] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-white/15 relative group">
              <img
                src={floodReliefImg}
                alt="Nepal Flood Relief and Community Food Aid Donation"
                className="w-full h-[250px] sm:h-[310px] lg:h-[340px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Floating Status Pill */}
              <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 z-10 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-medium flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse shrink-0" />
                <span>Emergency Flood Relief &amp; Food Aid · Nepal</span>
              </div>
            </div>

            {/* Bottom Overlapping Photo: Mountain Rescue & River Assistance */}
            <div className="w-[92%] sm:w-[84%] lg:w-[82%] -mt-16 sm:-mt-24 lg:-mt-28 self-end sm:self-start lg:self-start lg:-ml-8 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#072418] relative z-20 group">
              <img
                src={rescueAidImg}
                alt="Mountain Rescue Team Assisting Flood Evacuation Across River"
                className="w-full h-[210px] sm:h-[270px] lg:h-[300px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              {/* Floating Status Pill */}
              <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 z-10 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-medium flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#34D399] shrink-0" />
                <span>Mountain Rescue &amp; Safe River Evacuation</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
