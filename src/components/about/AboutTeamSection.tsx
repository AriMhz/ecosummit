import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShieldCheck, HeartHandshake, MapPin, Compass } from 'lucide-react';

export const AboutTeamSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const members = [
    {
      id: 'bishal-gurung',
      name: 'Bishal Gurung',
      role: 'CEO & Founder',
      badge: 'FOUNDER',
      hometown: 'Pokhara / Kathmandu',
      experience: '16+ Years Tourism',
      specialty: 'Expedition Strategy & Heritage',
      image: '/team-assets/photo_bishal.jpg',
    },
    {
      id: 'pasang-sherpa',
      name: 'Pasang Tenzing Sherpa',
      role: 'Senior Mountain Guide',
      badge: 'EVEREST × 7',
      hometown: 'Pangboche, Khumbu',
      experience: '18+ Years Guiding',
      specialty: 'High-Pass & Peak Specialist',
      image: '/team-assets/expert_pasang.jpg',
    },
    {
      id: 'pemba-tamang',
      name: 'Pemba Doma Tamang',
      role: 'Cultural Journey Director',
      badge: 'CULTURAL LEAD',
      hometown: 'Syabrubesi, Langtang',
      experience: '11+ Years Guiding',
      specialty: 'Tamang Monastic Traditions',
      image: '/team-assets/expert_pemba.jpg',
    },
    {
      id: 'deepak-gurung',
      name: 'Deepak Gurung',
      role: 'Expedition Leader',
      badge: 'LEAD GUIDE',
      hometown: 'Ghandruk, Annapurna',
      experience: '16+ Years Trail',
      specialty: 'Annapurna Sanctuary × 40+',
      image: '/team-assets/photo_deepak.jpg',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#FAF8F5] text-[#142332] overflow-hidden border-t border-[#EAE5DC]">
      {/* ── Topographic Elevation Contour Lines Background (Top-Right) ── */}
      <div className="absolute top-0 right-0 w-[420px] sm:w-[560px] lg:w-[720px] h-[360px] sm:h-[460px] pointer-events-none select-none z-0 overflow-hidden">
        <svg viewBox="0 0 650 480" fill="none" stroke="#CBA46E" className="w-full h-full">
          <path d="M 90 30 C 200 10, 320 70, 420 50 C 520 30, 580 80, 650 110" strokeWidth="0.8" opacity="0.22" />
          <path d="M 70 80 C 180 55, 300 120, 410 100 C 510 80, 570 140, 650 170" strokeWidth="1.0" opacity="0.30" />
          <path d="M 50 135 C 160 105, 280 175, 400 150 C 500 130, 560 200, 650 230" strokeWidth="1.1" opacity="0.38" />
          <path d="M 30 195 C 145 165, 260 230, 385 205 C 490 185, 545 260, 650 290" strokeWidth="0.9" opacity="0.25" />

          {/* Elevation Markers */}
          <text x="430" y="48" fill="#CBA46E" fontSize="8.5" opacity="0.6" fontFamily="monospace" letterSpacing="1.2">3,500m</text>
          <text x="418" y="98" fill="#CBA46E" fontSize="8.5" opacity="0.65" fontFamily="monospace" letterSpacing="1.2">4,200m</text>
          <text x="408" y="148" fill="#CBA46E" fontSize="8.5" opacity="0.7" fontFamily="monospace" letterSpacing="1.2">5,364m [EBC]</text>

          {/* Dotted Expedition Trail */}
          <path
            d="M 140 280 C 220 210, 280 230, 360 150 C 420 90, 490 105, 570 45"
            stroke="#D46238"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <circle cx="360" cy="150" r="3.5" fill="#D46238" opacity="0.8" />
          <text x="372" y="147" fill="#D46238" fontSize="8" fontWeight="bold" opacity="0.8" letterSpacing="1">NAMCHE 3,440m</text>
        </svg>
      </div>

      {/* ── Topographic Contour Waves (Bottom-Left) ── */}
      <div className="absolute -bottom-10 -left-10 w-72 sm:w-96 h-72 sm:h-96 pointer-events-none select-none z-0 overflow-hidden">
        <svg viewBox="0 0 400 400" fill="none" stroke="#A69C8E" className="w-full h-full">
          <path d="M 0 240 C 80 220, 150 190, 230 210 C 310 230, 360 180, 400 160" strokeWidth="0.8" opacity="0.22" />
          <path d="M -10 290 C 70 265, 150 235, 240 260 C 320 280, 360 230, 410 215" strokeWidth="1.0" opacity="0.30" />
          <path d="M -20 340 C 70 315, 160 285, 250 310 C 330 330, 370 280, 420 270" strokeWidth="1.1" opacity="0.38" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ═════════════════════════════════════════════════════════ */}
          {/* ── LEFT COLUMN: Editorial Narrative, Trust Pillars, CTA ── */}
          {/* ═════════════════════════════════════════════════════════ */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 xl:col-span-4 space-y-6"
          >
            {/* Eyebrow & Coordinates */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#D46238]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D46238] font-bold">
                OUR TEAM
              </span>
              <span className="text-[10.5px] font-mono tracking-widest text-[#8A96A0] uppercase hidden sm:inline">
                27°42′N · 85°19′E
              </span>
            </div>

            {/* Headline with Handwritten Cursive Subtitle */}
            <div className="relative space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#142332] font-normal leading-[1.12] tracking-tight">
                Local Experts. <br />
                <span className="italic font-light text-[#183E63]">Global Mindset.</span>
              </h2>

              <div className="flex items-center gap-2 pt-1">
                <span
                  className="font-script text-2xl sm:text-[26px] text-[#D46238] -rotate-2 select-none inline-block font-medium"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  Born in the high valleys, guiding with heart ✦
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-[#566370] leading-relaxed font-light">
              Our team is made up of native Sherpa guides, certified route directors, and altitude
              logistics specialists who live and breathe the Himalayas. With deep indigenous trail knowledge
              and internationally accredited safety protocols, we ensure every journey is authentic,
              safe, and deeply unforgettable.
            </p>

            {/* 3 Compact Editorial Trust Badges */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-3 p-3 bg-white/85 backdrop-blur-xs rounded-2xl border border-[#EAE5DC] shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-[#183E63]/10 text-[#183E63] flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="w-4 h-4 text-[#183E63]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#142332] text-xs">100% Native Mountain Guides</h4>
                  <p className="text-[11px] text-[#6B7D8F] mt-0.5 leading-snug">
                    Indigenous Khumbu, Langtang & Annapurna lineage with decades on high trails.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/85 backdrop-blur-xs rounded-2xl border border-[#EAE5DC] shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-[#D46238]/10 text-[#D46238] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#D46238]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#142332] text-xs">Wilderness First Responders</h4>
                  <p className="text-[11px] text-[#6B7D8F] mt-0.5 leading-snug">
                    Every guide carries pulse oximeters, medical kits & Garmin satellite SOS comms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/85 backdrop-blur-xs rounded-2xl border border-[#EAE5DC] shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-700/10 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#142332] text-xs">Fair Porter Welfare Alliance</h4>
                  <p className="text-[11px] text-[#6B7D8F] mt-0.5 leading-snug">
                    Ethical high-altitude wages, mountain gear standards & full medical insurance.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-3">
              <Link
                to="/team"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#142332] hover:bg-[#D46238] text-white text-xs font-mono uppercase tracking-[0.16em] font-bold shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <span>MEET OUR FULL TEAM</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* ═════════════════════════════════════════════════════════ */}
          {/* ── RIGHT COLUMN: 4 Authentic Mountain Master Cards     ── */}
          {/* ═════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-8 xl:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {members.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={shouldReduceMotion ? {} : { y: -6 }}
                  className="bg-white/95 backdrop-blur-xs rounded-3xl overflow-hidden border border-[#EAE5DC] shadow-[0_8px_30px_rgba(20,35,50,0.04)] hover:shadow-[0_20px_40px_rgba(212,98,56,0.12)] hover:border-[#D46238]/60 transition-all duration-500 flex flex-col group"
                >
                  <Link to="/team" className="flex flex-col h-full">
                    {/* Member Photo Container */}
                    <div className="aspect-[4/5] relative overflow-hidden bg-[#142332]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                      />

                      {/* Top Badges Bar */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full bg-[#142332]/80 backdrop-blur-md text-[9px] font-mono font-bold tracking-wider text-[#CBA46E] uppercase border border-white/10 shadow-xs">
                          {member.badge}
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/25 shadow-xs" title="Field Ready" />
                      </div>

                      {/* Bottom Image Gradient Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                      
                      {/* Hometown tag on photo */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1 text-[10px] text-white/90 font-medium drop-shadow-xs pointer-events-none">
                        <MapPin className="w-3 h-3 text-[#D46238] shrink-0" />
                        <span className="truncate">{member.hometown}</span>
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="p-4 sm:p-4.5 flex-grow flex flex-col justify-between space-y-2.5 bg-white">
                      <div>
                        <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-[#D46238] block">
                          {member.role}
                        </span>
                        <h3 className="font-serif text-base sm:text-[17px] font-bold text-[#142332] group-hover:text-[#D46238] transition-colors leading-snug mt-0.5">
                          {member.name}
                        </h3>
                        <p className="text-[11px] text-[#6B7D8F] font-light leading-relaxed mt-1 line-clamp-2">
                          {member.specialty}
                        </p>
                      </div>

                      {/* Bottom Footer Accent */}
                      <div className="pt-2.5 border-t border-[#F0EBE1] flex items-center justify-between text-[10px] text-[#8A96A0]">
                        <span className="font-mono font-medium">{member.experience}</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-[#183E63] group-hover:text-[#D46238] group-hover:translate-x-0.5 transition-all">
                          Bio <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
