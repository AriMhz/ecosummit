import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin, Compass, CheckCircle2 } from 'lucide-react';
import type { LeadershipLead } from './types';

export const AboutLeadership: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const leaders: LeadershipLead[] = [
    {
      id: 'pasang-sherpa',
      name: 'Pasang Tenzing Sherpa',
      role: 'Senior Mountain Guide & Co-Founder',
      experience: '18+ Years High-Altitude Guiding',
      hometown: 'Pangboche, Khumbu (3,985m)',
      credentials: [
        'UIAGM / NNMGA Certified Mountain Guide',
        'International Wilderness First Aid (WFA) Lead',
        '28+ Traverses of Cho La, Renjo La & Larkya La',
        '14x 8,000m Peak Expedition Sirdar',
      ],
      languages: ['Sherpa', 'Nepali', 'English', 'Basic German'],
      bio: 'Born in Pangboche beneath the shadow of Ama Dablam, Pasang has spent nearly two decades guiding discerning international trekkers and alpine climbers. He leads strictly from the front — pacing journeys for patient acclimatisation and sharing the sacred oral traditions of his Khumbu ancestors.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
      quote:
        'A Himalayan journey is measured not just by the pass you cross, but by how safely and deeply you experienced every village and monastery along the trail.',
    },
    {
      id: 'pemba-tamang',
      name: 'Pemba Doma Tamang',
      role: 'Cultural Expedition Director & Senior Guide',
      experience: '12+ Years High-Altitude Guiding',
      hometown: 'Syabrubesi, Langtang',
      credentials: [
        'UNESCO Sacred Valley Heritage Specialist',
        'Himalayan Ethnobotany & Alpine Flora Authority',
        'Women in Himalayan Guiding Pioneer',
        'Senior Wilderness Medical Responder',
      ],
      languages: ['Nepali', 'Tamang', 'English', 'Conversational French'],
      bio: 'Pemba introduces travellers to the living spiritual culture, monastic rituals, and village wisdom of Nepal’s mid-hills and mountain corridors. Her deep lineage in Tamang mountain heritage transforms every trek into an intimate, culturally authentic exchange.',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85',
      quote:
        'When you walk through our sacred valleys with quiet reverence, the high mountains open their heart to you.',
    },
    {
      id: 'dawa-lama',
      name: 'Dawa Norbu Lama',
      role: 'Head of Operations & Mountain Logistics',
      experience: '15+ Years Expedition Aviation Logistics',
      hometown: 'Boudhanath & Rolwaling Valley',
      credentials: [
        'Civil Aviation High-Altitude Flight Lead',
        'Restricted Valley Permit Liaison (Upper Mustang & Dolpo)',
        '24/7 Satellite Emergency Dispatch Coordinator',
        'Certified Mountain Search & Rescue Logistics',
      ],
      languages: ['Nepali', 'English', 'Hindi', 'Tibetan'],
      bio: 'Dawa orchestrates EcoSummit’s behind-the-scenes precision — from Lukla STOL flights and helicopter standby to private lodge bookings. He works directly with guests from the initial consultation, ensuring every bespoke itinerary runs with Swiss precision.',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85',
      quote:
        'Himalayan logistics demand meticulous planning and instantaneous local adaptability. We handle every complex detail so you can walk with absolute stillness.',
    },
    {
      id: 'dr-aruna-karki',
      name: 'Dr. Aruna Karki',
      role: 'Medical Advisor & High-Altitude Physician',
      experience: '10+ Years Altitude Medicine & Critical Care',
      hometown: 'Kathmandu / Lukla Field Base',
      credentials: [
        'High-Altitude Physiology & AMS Clinical Specialist',
        'Lake Louise Consensus Scoring Protocol Lead',
        'CIWEC Travel Medicine & Altitude Clinic Alumni',
        'Wilderness Medical Society (WMS) Member',
      ],
      languages: ['Nepali', 'English'],
      bio: 'Dr. Karki reviews our high-altitude acclimatisation profiles and provides remote medical consultations for high-pass crossings. Her clinical protocols guarantee that every EcoSummit traveller ascends safely within sound physiological boundaries.',
      image: '/team-assets/expert_aruna.jpg',
      quote:
        'Altitude is not something to fight. With conservative elevation profiles and twice-daily oximetry logs, any determined traveller can thrive beyond 5,000 meters.',
    },
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#FAF8F5] border-b border-[#E8E2D8]/80 relative overflow-hidden">
      {/* Background ambient spotlight */}
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(229,169,60,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#183E63]/10 text-xs font-simplon-mono tracking-[0.25em] font-semibold text-[#183E63] uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Frontline Leadership</span>
          </div>

          <h2 className="font-simplon text-3xl sm:text-5xl lg:text-6xl font-bold text-[#102942] tracking-[-0.03em] leading-tight">
            An elite leadership team
          </h2>

          {/* Elite Exped accent underline */}
          <div className="w-20 h-[3.5px] bg-[#E5A93C] rounded-full mt-4 mb-6 shadow-xs" />

          <p className="font-simplon text-base sm:text-lg text-[#59615D] leading-relaxed font-normal">
            Some commercial operators manage Nepal from overseas offices. Our founders, directors,
            and expedition doctors lead from where it matters most: directly on the trails and high
            ridges of the Himalayas.
          </p>
        </div>

        {/* Alternating Large Profile Cards (Elite Exped Format) */}
        <div className="space-y-16 sm:space-y-24">
          {leaders.map((leader, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={leader.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl overflow-hidden border border-[#E2DDD5] shadow-card-elevated hover:shadow-[0_25px_60px_-15px_rgba(16,41,66,0.14)] transition-all duration-500 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Portrait Column */}
                  <div
                    className={`lg:col-span-5 min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] relative overflow-hidden bg-[#EAE6DF] ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <img
                      src={leader.image}
                      alt={leader.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                    {/* Hometown & Experience Badge */}
                    <div className="absolute bottom-5 left-5 right-5 text-white z-10 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-simplon-mono text-xs tracking-wider uppercase text-white/90 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/20">
                        <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
                        <span>{leader.hometown}</span>
                      </div>
                      <span className="font-simplon-mono text-[11px] bg-[#E5A93C] text-[#102942] px-3 py-1.5 rounded-md uppercase tracking-wider font-bold shadow-sm">
                        {leader.experience}
                      </span>
                    </div>
                  </div>

                  {/* Narrative & Credentials Column */}
                  <div
                    className={`lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-6 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-simplon-mono uppercase tracking-[0.22em] text-[#183E63] font-bold block mb-1">
                          {leader.role}
                        </span>
                        <h3 className="font-simplon text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#102942] tracking-[-0.03em] leading-tight">
                          {leader.name}
                        </h3>
                        <div className="w-12 h-[2.5px] bg-[#E5A93C] mt-3 rounded-full" />
                      </div>

                      <p className="font-simplon text-base sm:text-lg text-[#4E5652] leading-relaxed font-normal">
                        {leader.bio}
                      </p>

                      {/* Credentials Grid */}
                      <div className="pt-4 border-t border-[#F0EBE1] space-y-2.5">
                        <span className="text-xs font-simplon-mono uppercase tracking-[0.18em] text-[#59615D] font-bold block">
                          Key Qualifications & Provenance
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-simplon text-[#2C3432]">
                          {leader.credentials.map((cred, cIdx) => (
                            <div key={cIdx} className="flex items-start gap-2 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EAE6DF]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C] mt-0.5 shrink-0" />
                              <span className="leading-snug font-medium">{cred}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Personal Quote */}
                      {leader.quote && (
                        <blockquote className="pt-2 italic text-sm text-[#59615D] font-simplon border-l-2 border-[#E5A93C] pl-4">
                          “{leader.quote}”
                        </blockquote>
                      )}
                    </div>

                    {/* Elite Exped Round Arrow CTA */}
                    <div className="pt-4">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-3.5 text-xs font-simplon-mono tracking-[0.16em] uppercase font-bold text-[#102942] hover:text-[#183E63] group/btn transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full border border-[#102942]/30 group-hover/btn:border-[#E5A93C] group-hover/btn:bg-[#E5A93C] group-hover/btn:text-[#102942] flex items-center justify-center transition-all duration-300 shadow-xs">
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                        </div>
                        <span className="underline decoration-transparent group-hover/btn:decoration-current underline-offset-4 transition-all">
                          Consult with {leader.name.split(' ')[0]} on your journey
                        </span>
                      </Link>
                    </div>
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
