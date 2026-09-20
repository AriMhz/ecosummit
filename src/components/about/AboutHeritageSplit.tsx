import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Compass, ShieldCheck, Heart } from 'lucide-react';

export const AboutHeritageSplit: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-36 bg-[#F7F5EF] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 sm:space-y-36">
        {/* Story Block 1: Born in the Mountains (Photo Left, Story Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Authentic Photography with Glass Badge */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative group"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card-elevated border border-[#E2DDD5] bg-[#EAE6DF] relative">
              <img
                src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1400&q=85"
                alt="Sherpa expedition leader navigating high ridge path with trekker"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 grain-overlay pointer-events-none opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Glassmorphic Location Stamp */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-white/60 text-[#102942] font-simplon-mono text-xs tracking-wider uppercase shadow-md">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span className="font-bold">Pangboche Corridor · 3,985m</span>
                </div>
                <span className="text-[#59615D] text-[10px] hidden sm:inline">Khumbu Valley</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative in SimplonNorm */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#E5A93C]/15 border border-[#E5A93C]/30 text-xs font-simplon-mono tracking-[0.2em] font-bold text-[#102942] uppercase">
              <Compass className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>01 / INDIGENOUS LINEAGE</span>
            </div>

            <h2 className="font-simplon text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102942] tracking-[-0.03em] leading-[1.12]">
              Born of the mountains, <br />
              <span className="text-[#183E63]">in the mountains.</span>
            </h2>

            {/* Accent gold bar */}
            <div className="w-16 h-[3px] bg-[#E5A93C] rounded-full" />

            <div className="space-y-4 text-base sm:text-lg font-simplon text-[#4E5652] leading-relaxed font-normal pt-1">
              <p>
                Our founders did not discover the Himalayas through overseas adventure catalogues
                or commercial booking portals. They were born in stone village homesteads in
                Pangboche and Syabrubesi, walking steep yak trails before they could read topographic
                contour maps.
              </p>
              <p>
                In an era where international travel platforms turn Nepal into rushed conveyor-belt
                tours, EcoSummit was established to preserve genuine mountain exploration. We believe
                Himalayan travel must be private, unhurried, and deeply rooted in local valley heritage.
              </p>
            </div>

            {/* Feature pill callout */}
            <div className="pt-2 flex items-center gap-3 text-xs font-simplon-mono uppercase tracking-[0.14em] text-[#183E63] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
              <span>100% Native Sherpa, Tamang & Rai Field Leadership</span>
            </div>
          </motion.div>
        </div>

        {/* Story Block 2: Bridging Two Worlds (Story Left, Photo Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Editorial Narrative */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#183E63]/10 border border-[#183E63]/20 text-xs font-simplon-mono tracking-[0.2em] font-bold text-[#183E63] uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>02 / CLINICAL RIGOR</span>
            </div>

            <h2 className="font-simplon text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102942] tracking-[-0.03em] leading-[1.12]">
              Bridging high-altitude safety <br />
              <span className="text-[#183E63]">& cultural reverence.</span>
            </h2>

            {/* Accent gold bar */}
            <div className="w-16 h-[3px] bg-[#E5A93C] rounded-full" />

            <div className="space-y-4 text-base sm:text-lg font-simplon text-[#4E5652] leading-relaxed font-normal pt-1">
              <p>
                High altitude demands total physiological respect. On every journey climbing above
                3,000 meters, our lead guides log resting blood oxygen saturation (SpO2) and heart
                rate twice daily with medical-grade pulse oximeters, scored against the international
                Lake Louise AMS clinical scale.
              </p>
              <p>
                Yet mountain travel is never strictly clinical. It is a spiritual encounter with
                ancient gompas, prayer flag passes, and butter lamps. By travelling with EcoSummit, you
                walk with guardians who honor modern wilderness medicine alongside centuries of
                sacred mountain traditions.
              </p>
            </div>

            {/* Feature pill callout */}
            <div className="pt-2 flex items-center gap-3 text-xs font-simplon-mono uppercase tracking-[0.14em] text-[#183E63] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
              <span>Wilderness EMT Certified Guides · Satellite Emergency Link</span>
            </div>
          </motion.div>

          {/* Right Column: Authentic Photography with Glass Badge */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative order-1 lg:order-2 group"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card-elevated border border-[#E2DDD5] bg-[#EAE6DF] relative">
              <img
                src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1400&q=85"
                alt="Traveller overlooking prayer flags and snowcapped peaks on high Himalayan pass"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 grain-overlay pointer-events-none opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Glassmorphic Location Stamp */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-white/60 text-[#102942] font-simplon-mono text-xs tracking-wider uppercase shadow-md">
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span className="font-bold">Tengboche Monastic Sanctuary</span>
                </div>
                <span className="text-[#59615D] text-[10px] hidden sm:inline">3,867m Sacred Ridge</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
