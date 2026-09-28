import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Trash2,
  Trees,
  Heart,
} from 'lucide-react';

interface VolunteerProject {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  badge: string;
  badgeColor: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  stat: string;
  description: string;
  activities: string[];
  image: string;
}

const volunteerProjects: VolunteerProject[] = [
  {
    id: 'village-schools',
    title: 'Village Schools',
    subtitle: 'Classroom & book support',
    location: 'Solukhumbu & Helambu Valleys',
    badge: 'Education & Youth',
    badgeColor: 'bg-[#E85D2A]',
    iconBg: 'bg-[#FFF3EC]',
    iconColor: 'text-[#E85D2A]',
    icon: <BookOpen className="w-5 h-5" />,
    stat: '14 Schools Supported · 650+ Students',
    description: 'Help provide classroom learning materials, set up village reading libraries, and assist local teachers with conversational English and digital literacy in remote mountain settlements.',
    activities: [
      'Classroom library setup & book donation',
      'Solar-powered lighting & educational tablets',
      'Conversational English & creative workshops',
    ],
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'trail-cleanups',
    title: 'Trail Cleanups',
    subtitle: 'Himalayan waste sweeps',
    location: 'Everest & Annapurna Sanctuary Trails',
    badge: 'Eco Conservation',
    badgeColor: 'bg-[#2E7D32]',
    iconBg: 'bg-[#EDF7ED]',
    iconColor: 'text-[#2E7D32]',
    icon: <Trash2 className="w-5 h-5" />,
    stat: '8,500kg Waste Removed · 120km Trails',
    description: 'Work alongside Sherpa environmental teams on high-pass sweeps to clear discarded plastics, install eco-friendly waste stations, and safeguard sacred glacial waterways.',
    activities: [
      'Plastic & litter sweeps on high alpine passes',
      'Installing eco-friendly trail waste bins',
      'Protecting fragile glacial water sources',
    ],
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'tree-planting',
    title: 'Tree Planting',
    subtitle: 'Mountain slope restoration',
    location: 'Langtang & Lower Mustang Foothills',
    badge: 'Climate & Habitat',
    badgeColor: 'bg-[#1565C0]',
    iconBg: 'bg-[#E8F1FC]',
    iconColor: 'text-[#1565C0]',
    icon: <Trees className="w-5 h-5" />,
    stat: '25,000+ Native Saplings Planted',
    description: 'Plant native oak, pine, and wild rhododendron saplings on vulnerable ridges to stabilize mountain slopes against monsoon landslides and restore wildlife habitats.',
    activities: [
      'Planting indigenous Himalayan tree saplings',
      'Slope terracing & erosion prevention',
      'Community tree nursery maintenance',
    ],
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'community-care',
    title: 'Community Care',
    subtitle: 'Health & local aid',
    location: 'Gorkha & Ruby Valley Foothills',
    badge: 'Community Health',
    badgeColor: 'bg-[#C2410C]',
    iconBg: 'bg-[#FFF7ED]',
    iconColor: 'text-[#C2410C]',
    icon: <Heart className="w-5 h-5" />,
    stat: '42 Ceramic Filters · 6 Health Camps',
    description: 'Distribute clean ceramic water filters to village families, host basic sanitation workshops, and provide essential volunteer support for remote mobile health clinics.',
    activities: [
      'Clean ceramic drinking water filter setup',
      'Family health & hygiene guidance sessions',
      'Assisting visiting rural medical camps',
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
];

export const VoluntaryWork: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-[#FAF8F5] text-[#102942] overflow-hidden border-t border-[#EAE5DC]/60">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* ── Centered Bold Header (Matching Featured Treks) ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[62px] text-[#12365B] tracking-tight leading-tight">
            Volunteer &amp; Community Work
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#59615D] leading-relaxed max-w-2xl mx-auto mt-3 font-normal">
            Meaningful Himalayan travel where your presence directly empowers mountain schools, preserves pristine trails, and supports local communities.
          </p>
        </div>

        {/* ── 4 Rich Project Cards Grid ──────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {volunteerProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-[28px] overflow-hidden bg-white border border-[#EAE5DC] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-[#102942]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                {/* Badge top-left */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1.5 rounded-full text-white text-[11px] font-bold tracking-wide shadow-md ${project.badgeColor}`}>
                    {project.badge}
                  </span>
                </div>

                {/* Stat bottom-left */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5 text-xs font-semibold drop-shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#F6AD55]" />
                    <span>{project.stat}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  {/* Header Row: Icon + Title & Subtitle */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs border border-black/5 ${project.iconBg} ${project.iconColor}`}>
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#102942] group-hover:text-[#E85D2A] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-sans text-xs text-[#718096] font-medium mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Location Pin */}
                  <div className="flex items-center gap-1.5 text-xs text-[#E85D2A] font-semibold mb-2.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{project.location}</span>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-[13.5px] text-[#59615D] leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Key Activities List */}
                  <div className="mt-4 pt-3.5 border-t border-[#F0ECE1] space-y-2">
                    {project.activities.map((act, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#334155]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-4 border-t border-[#F0ECE1] flex items-center justify-between">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#12365B] group-hover:text-[#E85D2A] transition-colors"
                  >
                    <span>Get Involved</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <span className="text-[11px] font-simplon-mono text-[#718096]">
                    Open to All Trekkers
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom Callout Banner ─────────────────────────────── */}
        <div className="rounded-[28px] bg-gradient-to-r from-[#021B38] via-[#073669] to-[#0F64B2] p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2 text-center md:text-left">
            <span className="font-simplon-mono text-xs uppercase tracking-[0.24em] text-[#F6AD55] font-bold">
              COMBINE TRAVEL WITH PURPOSE
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white leading-tight">
              Want to add 2-4 days of voluntary service to your trek?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed">
              We arrange seamless volunteer extensions for solo travellers, couples, schools, and private groups. We match your skills with trusted local community partners in Nepal.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-full bg-[#E85D2A] hover:bg-[#D45120] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Enquire for Volunteering</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
