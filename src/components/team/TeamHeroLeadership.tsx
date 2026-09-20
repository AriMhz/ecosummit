import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mountain, Compass, Footprints, Camera, Map } from 'lucide-react';
import ourTeamBg from '../../assets/our team.png';

/* ------------------------------------------------------------------ */
/*  Social icon SVGs                                                  */
/* ------------------------------------------------------------------ */
const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Team member data matching exact design                            */
/* ------------------------------------------------------------------ */
interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  badgeIcon: React.FC<{ className?: string }>;
  badgeBg: string;
  image: string;
  socials: { type: 'linkedin' | 'instagram' | 'x' | 'facebook'; url: string }[];
}

const teamMembers: TeamMember[] = [
  {
    id: 'bishal',
    name: 'Bishal Gurung',
    role: 'CEO & FOUNDER',
    description:
      'With a deep love for mountains and a vision for responsible travel, Bishal leads our team with passion and purpose.',
    badgeIcon: Mountain,
    badgeBg: 'bg-[#E85D2A]',
    image: '/team-assets/photo_bishal.jpg',
    socials: [
      { type: 'linkedin', url: '#' },
      { type: 'instagram', url: '#' },
      { type: 'x', url: '#' },
    ],
  },
  {
    id: 'deepak',
    name: 'Deepak Gurung',
    role: 'CO-FOUNDER & GUIDE',
    description:
      'Exploring new paths and creating unforgettable experiences for every traveler.',
    badgeIcon: Compass,
    badgeBg: 'bg-[#1E7755]',
    image: '/team-assets/photo_deepak.jpg',
    socials: [
      { type: 'linkedin', url: '#' },
      { type: 'instagram', url: '#' },
      { type: 'facebook', url: '#' },
    ],
  },
  {
    id: 'roshan',
    name: 'Roshan Gurung',
    role: 'CO-FOUNDER & TREKKING GUIDE',
    description:
      'From challenging trails to breathtaking views, Roshan ensures your journey is safe, smooth and memorable.',
    badgeIcon: Footprints,
    badgeBg: 'bg-[#2D82B7]',
    image: '/team-assets/photo_roshan.jpg',
    socials: [
      { type: 'linkedin', url: '#' },
      { type: 'instagram', url: '#' },
      { type: 'x', url: '#' },
    ],
  },
  {
    id: 'anita',
    name: 'Anita Rai',
    role: 'TRAVEL CONSULTANT',
    description:
      'Always ready to help you plan your perfect trip with personalized itineraries and local insights.',
    badgeIcon: Camera,
    badgeBg: 'bg-[#9E579D]',
    image: '/team-assets/circle_anita.jpg',
    socials: [
      { type: 'linkedin', url: '#' },
      { type: 'instagram', url: '#' },
      { type: 'facebook', url: '#' },
    ],
  },
  {
    id: 'ramesh',
    name: 'Ramesh Tamang',
    role: 'OPERATIONS MANAGER',
    description:
      'Making sure everything runs smoothly behind the scenes so you can focus on the adventure.',
    badgeIcon: Map,
    badgeBg: 'bg-[#2E8B8B]',
    image: '/team-assets/circle_ramesh.jpg',
    socials: [
      { type: 'linkedin', url: '#' },
      { type: 'instagram', url: '#' },
      { type: 'x', url: '#' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Social icon renderer                                              */
/* ------------------------------------------------------------------ */
const SocialIcon: React.FC<{ type: string; className?: string }> = ({ type, className }) => {
  switch (type) {
    case 'linkedin':
      return <LinkedInIcon className={className} />;
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'x':
      return <XIcon className={className} />;
    case 'facebook':
      return <FacebookIcon className={className} />;
    default:
      return null;
  }
};

/* ================================================================== */
/*  COMPONENT                                                         */
/* ================================================================== */
export const TeamHeroLeadership: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 lg:pb-20 overflow-hidden bg-[#dce8f0]">
      {/* ── Background: Full Himalayan Mountain Backdrop (right-bottom aligned so hiker & ridge stay visible) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={ourTeamBg}
          alt="Himalayan Mountain Range"
          role="presentation"
          className="w-full h-full object-cover object-right-bottom select-none"
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* ── Header Area ────────────────────────────────────────── */}
        <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10 sm:mb-12 lg:mb-14">
          {/* Left: Text Content */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl space-y-4"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2.5px] bg-[#E85D2A] rounded-full" />
              <span className="font-simplon-mono text-xs uppercase tracking-[0.25em] text-[#17201D] font-bold">
                Our Team
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] text-[#102942] font-normal leading-[1.12] tracking-tight">
              Passionate People.
              <br />
              Extraordinary Journeys.
            </h1>

            {/* Description */}
            <p className="font-sans text-sm sm:text-base text-[#4A5568] leading-relaxed font-light max-w-md">
              We are a team of travel enthusiasts, local experts and adventure lovers, dedicated to
              creating meaningful journeys across Nepal and beyond.
            </p>
          </motion.div>

          {/* Right: "Local Experts Global Minds" script floating in the sky above Anita & Ramesh */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block select-none pointer-events-none self-start lg:pt-2 lg:mr-8 xl:mr-20"
          >
            <img
              src="/team-assets/local_experts_global_minds.png"
              alt="Local Experts Global Minds"
              className="w-48 sm:w-52 lg:w-56 xl:w-60 h-auto object-contain drop-shadow-sm -rotate-2"
            />
          </motion.div>
        </div>

        {/* ── Team member cards (xl:mr-16 / 2xl:mr-24 leaves clear room on the right for hiker on ridge) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-4.5 lg:gap-4 xl:gap-5 xl:mr-14 2xl:mr-20">
          {teamMembers.map((member, idx) => {
            const IconComp = member.badgeIcon;
            return (
              <motion.div
                key={member.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.08 }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : { y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }
                }
                className="group relative bg-white/75 backdrop-blur-md rounded-2xl p-4 sm:p-4.5 pb-5 sm:pb-5.5 shadow-[0_8px_30px_rgb(0,0,0,0.07)] hover:shadow-xl border border-white/80 hover:border-[#E85D2A]/40 transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
              >
                {/* Circular photo with white ring border */}
                <div className="relative w-24 h-24 sm:w-26 sm:h-26 lg:w-28 lg:h-28 rounded-full p-1 bg-white shadow-md border border-[#D5E3EE] group-hover:border-[#E85D2A]/60 transition-colors duration-300 mb-3 sm:mb-3.5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#EAE6DF]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Badge icon (bottom-left of circle) */}
                  <div
                    className={`absolute bottom-0 left-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${member.badgeBg} text-white flex items-center justify-center shadow-md border-2 border-white`}
                  >
                    <IconComp className="w-3.5 h-3.5 stroke-[2]" />
                  </div>
                </div>

                {/* Name & role */}
                <h3 className="font-serif text-[17px] sm:text-lg font-bold text-[#102942] leading-snug">
                  {member.name}
                </h3>
                <p className="font-simplon-mono text-[9px] sm:text-[9.5px] uppercase tracking-[0.16em] text-[#718096] font-bold mt-1">
                  {member.role}
                </p>

                {/* Description */}
                <p className="font-sans text-[11.5px] text-[#4A5568] leading-relaxed mt-2.5 flex-grow">
                  {member.description}
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-3 mt-3.5 pt-3 border-t border-[#E2E8F0]/60 w-full justify-center text-[#102942]/60">
                  {member.socials.map((social) => (
                    <a
                      key={social.type}
                      href={social.url}
                      aria-label={social.type}
                      className="w-4 h-4 hover:text-[#E85D2A] transition-colors duration-200"
                    >
                      <SocialIcon type={social.type} className="w-full h-full" />
                    </a>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA Button: Pill button with subtle orange border, matching Image 2 ── */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-10 sm:mt-12"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full border border-[#E85D2A]/60 hover:border-[#E85D2A] text-xs font-simplon-mono uppercase tracking-[0.14em] font-bold text-[#102942] hover:text-[#E85D2A] transition-all duration-300 group/btn shadow-xs hover:shadow-md bg-white/80 backdrop-blur-sm"
          >
            <span>Meet Our Full Team</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
