import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Award,
  Languages,
  ShieldCheck,
  Compass,
  Heart,
  X,
  Quote,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { teamData } from '../../data/team';
import type { TeamMember } from '../../types';
import ourTeamBg from '../../assets/our team.png';

export const LocalExperts: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedExpert, setSelectedExpert] = useState<TeamMember | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse Drag-to-Slide states (press & slide left/right)
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  // Check scroll bounds for chevron disabled states & update active index
  const updateScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    const card = carouselRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 350;
    const newIdx = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(newIdx, 0), teamData.length - 1));
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.firstElementChild as HTMLElement | null;
    const scrollAmount = card ? card.offsetWidth + 24 : 350;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(updateScrollState, 350);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    isMouseDownRef.current = true;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftStartRef.current = carouselRef.current.scrollLeft;
    hasDraggedRef.current = false;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeftStartRef.current - walk;
    updateScrollState();
  };

  const handleMouseUp = () => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    setIsDragging(false);
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 80);
  };

  const handleMouseLeave = () => {
    if (isMouseDownRef.current) {
      isMouseDownRef.current = false;
      setIsDragging(false);
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 80);
    }
  };

  return (
    <section className="relative pt-8 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 lg:pb-24 overflow-hidden bg-[#dce8f0]">
      {/* ── 1. Full Himalayan Mountain Backdrop with Hiker & Prayer Flags on Ridge ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src={ourTeamBg}
          alt="Himalayan Mountain Range"
          role="presentation"
          className="w-full h-full object-cover object-right-bottom select-none opacity-95"
        />
        {/* Soft atmospheric gradient blend matching other sections for seamless flow and pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#dce8f0] via-[#dce8f0]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-transparent to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#031815] via-[#031815]/40 to-transparent pointer-events-none z-[1]" />
      </div>

      {/* ── Topographic Line SVG Texture in bottom corners ── */}
      <div className="absolute bottom-4 left-4 z-0 opacity-20 pointer-events-none hidden md:block">
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none" stroke="#183E63" strokeWidth="0.8">
          <path d="M10 110 C 60 90, 100 115, 160 85 C 190 70, 210 95, 220 110" />
          <path d="M0 85 C 45 65, 95 90, 150 60 C 180 45, 205 70, 220 85" />
          <path d="M0 60 C 40 40, 85 65, 140 35 C 170 20, 195 45, 220 60" />
          <path d="M0 35 C 35 15, 75 40, 130 10 C 160 -5, 185 20, 220 35" />
        </svg>
      </div>

      {/* ── Bottom Right Mountain Peak Sketch Illustration (matches Image 1) ── */}
      <div className="absolute bottom-6 right-8 lg:right-16 z-0 opacity-25 pointer-events-none select-none hidden sm:block">
        <svg width="180" height="90" viewBox="0 0 180 90" fill="none" stroke="#102942" strokeWidth="1.2">
          <path d="M10 85 L 65 30 L 95 55 L 140 15 L 175 85" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M65 30 L 78 50 L 95 55" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M140 15 L 125 45 L 110 50" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M140 15 L 148 40 L 165 75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M35 55 L 50 65 L 65 85" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* ── 2. Header & Pillars Area ── */}
        <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12 sm:mb-16">
          {/* Left: Headline & Narrative */}
          <div className="max-w-2xl space-y-4">
            {/* Eyebrow badge matching Image 1: — GROUNDED LEADERSHIP */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2.5px] bg-[#E85D2A] rounded-full" />
              <span className="font-simplon-mono text-xs uppercase tracking-[0.25em] font-bold text-[#17201D]">
                Grounded Leadership
              </span>
            </div>

            {/* Editorial Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[#102942] font-normal leading-[1.12] tracking-tight">
              Meet Your Local <br />
              <span className="italic font-normal">Himalayan Experts</span>
            </h2>

            {/* Narrative paragraph */}
            <p className="font-sans text-sm sm:text-base text-[#4A5568] leading-relaxed font-light max-w-xl">
              Our journeys are led by experienced local guides who understand Nepal’s trails, cultures,
              and changing mountain conditions. Their local knowledge, practical support, and personal
              care help travellers explore with greater confidence.
            </p>

            {/* ── 3 Value Proposition Pillars (Image 1 feature row) ── */}
            <div className="pt-3 flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 border-t border-[#D6E2EC]/80 mt-6">
              {/* Pillar 1: Local Knowledge */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-[#102942]/20 bg-white/70 backdrop-blur-xs flex items-center justify-center text-[#102942] shrink-0 shadow-2xs">
                  <Compass className="w-4 h-4 text-[#183E63]" />
                </div>
                <div>
                  <span className="font-serif text-sm sm:text-[15px] font-bold text-[#102942] block leading-tight">
                    Local Knowledge
                  </span>
                  <span className="text-[11px] text-[#59615D] block">
                    Real insights, real experiences
                  </span>
                </div>
              </div>

              <div className="hidden sm:block w-[1px] h-8 bg-[#D6E2EC]" />

              {/* Pillar 2: Trusted Support */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-[#102942]/20 bg-white/70 backdrop-blur-xs flex items-center justify-center text-[#102942] shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#1E7755]" />
                </div>
                <div>
                  <span className="font-serif text-sm sm:text-[15px] font-bold text-[#102942] block leading-tight">
                    Trusted Support
                  </span>
                  <span className="text-[11px] text-[#59615D] block">
                    Safety in every step
                  </span>
                </div>
              </div>

              <div className="hidden sm:block w-[1px] h-8 bg-[#D6E2EC]" />

              {/* Pillar 3: Personal Care */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-[#102942]/20 bg-white/70 backdrop-blur-xs flex items-center justify-center text-[#102942] shrink-0 shadow-2xs">
                  <Heart className="w-4 h-4 text-[#E85D2A]" />
                </div>
                <div>
                  <span className="font-serif text-sm sm:text-[15px] font-bold text-[#102942] block leading-tight">
                    Personal Care
                  </span>
                  <span className="text-[11px] text-[#59615D] block">
                    More than just a guide
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: "Real People Real Journeys" + Carousel Navigation (matches Featured Journeys) */}
          <div className="flex flex-col items-start lg:items-end justify-between gap-5 shrink-0 self-start lg:self-end">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="select-none pointer-events-none flex flex-col items-center lg:items-end"
            >
              <div className="relative text-center lg:text-right">
                <span className="font-script text-3xl sm:text-4xl lg:text-[42px] text-[#2C4A6F] font-bold tracking-wide block leading-[1.05] drop-shadow-2xs">
                  Real People
                </span>
                <span className="font-script text-3xl sm:text-4xl lg:text-[42px] text-[#E85D2A] font-bold tracking-wide block leading-[1.05] drop-shadow-2xs">
                  Real Journeys
                </span>
                {/* Hand-drawn curved underline swoop */}
                <svg
                  className="w-36 sm:w-44 h-4 text-[#E85D2A]/80 mt-0.5 ml-auto"
                  viewBox="0 0 160 20"
                  fill="none"
                >
                  <path
                    d="M5 12 C 45 4, 110 4, 155 14 C 120 18, 60 16, 25 15"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Carousel Navigation Buttons & Link (like Featured Journeys) */}
            <div className="flex items-center gap-4 pt-1">
              <Link
                to="/team"
                className="group relative inline-flex items-center gap-2 text-xs font-simplon-mono font-bold tracking-[0.16em] uppercase text-[#102942] hover:text-[#E85D2A] transition-colors pb-1"
              >
                <span>MEET ALL TEAM</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#E85D2A]" />
              </Link>

              {/* Navigation Carousel Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleScroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Previous expert"
                  className="w-11 h-11 rounded-full border border-[#CBD5E0] bg-white/80 hover:bg-white text-[#102942] hover:text-[#E85D2A] flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll('right')}
                  disabled={!canScrollRight}
                  aria-label="Next expert"
                  className="w-11 h-11 rounded-full bg-[#102942] hover:bg-[#E85D2A] text-white flex items-center justify-center transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. Cards Track with Vertical Index Indicator ── */}
        <div className="relative flex items-center gap-4 sm:gap-6 mb-14">
          {/* Vertical Index Indicator (01 / 06) - Desktop only (matches FeaturedJourneys) */}
          <div className="hidden xl:flex flex-col items-center gap-2.5 select-none shrink-0 pr-2">
            <span className="font-simplon-mono text-xs font-bold text-[#102942]">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <div className="w-[1.5px] h-20 bg-[#CBD5E0] relative rounded-full overflow-hidden">
              <div
                className="w-full bg-[#102942] rounded-full transition-all duration-300"
                style={{
                  height: `${100 / teamData.length}%`,
                  transform: `translateY(${activeIndex * 100}%)`,
                }}
              />
            </div>
            <span className="w-1 h-1 rounded-full bg-[#CBD5E0]" />
            <span className="font-simplon-mono text-xs font-medium text-[#718096]">
              {String(teamData.length).padStart(2, '0')}
            </span>
          </div>

          {/* Cards Track: Exact sizing so cards fit 100% without being awkwardly sliced in half */}
          <div
            ref={carouselRef}
            onScroll={updateScrollState}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-4 pt-2 px-1 select-none no-scrollbar w-full ${
              isDragging
                ? 'cursor-grabbing scroll-auto'
                : 'cursor-grab scroll-smooth snap-x snap-mandatory'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {teamData.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => {
                  if (!hasDraggedRef.current) {
                    setSelectedExpert(member);
                  }
                }}
                className="group w-[84vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] h-[500px] sm:h-[530px] shrink-0 snap-start rounded-[26px] overflow-hidden relative shadow-[0_12px_36px_rgba(16,41,66,0.12)] hover:shadow-[0_26px_60px_rgba(16,41,66,0.32)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between select-none cursor-pointer bg-[#102942] ring-1 ring-white/15 hover:ring-[#E85D2A]/60"
              >
                {/* ── Card Full-Bleed Background Photo ── */}
                <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    draggable={false}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = '/team-assets/expert_aruna.jpg';
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out select-none pointer-events-none"
                  />
                  {/* Top soft shadow for badges */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
                </div>

                {/* ── Top Badges: Location & Experience ── */}
                <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between gap-2 pointer-events-none">
                  {/* Location Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-[#E85D2A] shrink-0" />
                    <span className="truncate max-w-[140px]">{member.hometown}</span>
                  </div>

                  {/* Experience Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#102942]/85 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-bold shadow-md">
                    <Award className="w-3 h-3 text-[#E85D2A] shrink-0" />
                    <span>{member.experience.split(' ')[0]} Yrs Lead</span>
                  </div>
                </div>

                {/* ── Bottom Content Overlay: Role, Name, Summits, Expandable Bio & Action ── */}
                <div className="relative z-10 pt-16 pb-5 px-5 sm:px-6 bg-gradient-to-t from-black/95 via-black/80 via-45% to-transparent flex flex-col justify-end">
                  {/* Role Eyebrow */}
                  <span className="font-simplon-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#E85D2A] block mb-1">
                    {member.role}
                  </span>

                  {/* Guide Name */}
                  <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-white group-hover:text-[#F6AD55] transition-colors leading-snug mb-2">
                    {member.name}
                  </h3>

                  {/* Notable Summit / Route Highlight */}
                  {member.summits && member.summits.length > 0 && (
                    <div className="flex items-center gap-1.5 text-[11.5px] text-white/90 font-medium mb-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E85D2A] shrink-0" />
                      <span className="truncate">{member.summits[0]}</span>
                    </div>
                  )}

                  {/* Expandable Bio on Hover */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 ease-out">
                    <p className="font-sans text-[12px] text-white/85 leading-relaxed font-light mb-3 line-clamp-3">
                      {member.bio}
                    </p>
                  </div>

                  {/* Bottom Action Row: Languages & Profile Button */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-white/15 text-white/80">
                    <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                      <Languages className="w-3.5 h-3.5 text-[#E85D2A] shrink-0" />
                      <span className="truncate max-w-[130px]">
                        {member.languages.slice(0, 2).join(', ')}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 group-hover:bg-[#E85D2A] text-white text-xs font-simplon-mono uppercase tracking-wider font-bold transition-all duration-300 shadow-xs group-hover:shadow-md">
                      <span>Profile</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 4. Bottom Safety & Action Row (Certified Professionals & CTAs) ── */}
        <div className="bg-white/85 backdrop-blur-md border border-white/90 rounded-2xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(16,41,66,0.06)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#183E63]/10 border border-[#183E63]/15 flex items-center justify-center text-[#183E63] shrink-0 shadow-2xs">
              <ShieldCheck className="w-7 h-7 stroke-[1.8] text-[#183E63]" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#102942]">
                Travel with Certified Himalayan Professionals
              </h4>
              <p className="font-sans text-xs sm:text-[13px] text-[#59615D] mt-0.5 leading-relaxed font-light">
                All lead guides are government-licensed, certified Wilderness First Responders (WFR),
                and carry pulse oximeters and satellite SOS beacons on every high-altitude route.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/team"
              className="flex-1 md:flex-none text-center px-6 py-3 rounded-full border border-[#E85D2A]/60 hover:border-[#E85D2A] bg-white/90 text-xs font-simplon-mono uppercase tracking-[0.14em] font-bold text-[#102942] hover:text-[#E85D2A] shadow-2xs hover:shadow-md transition-all duration-300"
            >
              Meet Our Full Team
            </Link>
            <Link
              to="/plan-your-trip"
              className="flex-1 md:flex-none text-center px-6 py-3 bg-[#183E63] hover:bg-[#102942] text-xs font-simplon-mono uppercase tracking-[0.14em] font-bold text-white rounded-full shadow-sm hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2 group/btn"
            >
              <span>Plan Your Trip</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 5. Interactive Expert Profile Modal ── */}
      <AnimatePresence>
        {selectedExpert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExpert(null)}
              className="fixed inset-0 bg-[#0E1412]/60 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#F7F6F1] rounded-3xl shadow-2xl border border-white/80 overflow-hidden z-10 my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedExpert(null)}
                aria-label="Close guide details"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-[#E2DDD5] flex items-center justify-center text-[#17201D] hover:bg-[#183E63] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left: Guide Portrait */}
                <div className="relative md:w-5/12 h-64 md:h-auto bg-[#EAE8E1]">
                  <img
                    src={selectedExpert.image}
                    alt={selectedExpert.name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = '/team-assets/expert_aruna.jpg';
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 left-3 bg-[#102942]/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#E85D2A]" />
                    <span>{selectedExpert.hometown}</span>
                  </div>
                </div>

                {/* Right: Detailed Dossier */}
                <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                  <div>
                    <span className="font-simplon-mono text-[10px] uppercase tracking-[0.16em] font-bold text-[#E85D2A] block mb-1">
                      {selectedExpert.role}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#102942]">
                      {selectedExpert.name}
                    </h3>

                    {/* Bio */}
                    <p className="font-sans text-xs sm:text-[13px] text-[#4A5568] leading-relaxed mt-3 font-light">
                      {selectedExpert.bio}
                    </p>

                    {/* Guide's Quote */}
                    {selectedExpert.quote && (
                      <div className="mt-4 p-3 bg-white/70 rounded-xl border border-[#E2DDD5]/70 flex items-start gap-2.5 text-xs italic text-[#102942]">
                        <Quote className="w-4 h-4 text-[#E85D2A] shrink-0 mt-0.5" />
                        <p className="font-serif text-[13px] leading-snug">
                          "{selectedExpert.quote}"
                        </p>
                      </div>
                    )}

                    {/* Summits / Key Milestones */}
                    {selectedExpert.summits && selectedExpert.summits.length > 0 && (
                      <div className="mt-4">
                        <span className="font-simplon-mono text-[10px] uppercase tracking-wider font-bold text-[#17201D] block mb-1.5 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#E85D2A]" />
                          Notable Summits & Routes
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedExpert.summits.map((summit, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#183E63]/10 text-[#183E63] font-medium"
                            >
                              {summit}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {selectedExpert.certifications && selectedExpert.certifications.length > 0 && (
                      <div className="mt-3">
                        <span className="font-simplon-mono text-[10px] uppercase tracking-wider font-bold text-[#17201D] block mb-1.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#1E7755]" />
                          Safety & Accreditations
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedExpert.certifications.map((cert, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[11px] px-2.5 py-0.5 rounded-md bg-white border border-[#E2DDD5] text-[#4A5568]"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Modal Footer / Direct Inquiry CTA */}
                  <div className="pt-4 border-t border-[#E2DDD5] flex items-center gap-3">
                    <Link
                      to={`/plan-your-trip?guide=${encodeURIComponent(selectedExpert.id)}`}
                      onClick={() => setSelectedExpert(null)}
                      className="flex-1 text-center py-2.5 px-4 bg-[#183E63] hover:bg-[#102942] text-white text-xs font-simplon-mono uppercase tracking-[0.14em] font-bold rounded-xl shadow-xs transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Request {selectedExpert.name.split(' ')[0]}</span>
                    </Link>
                    <button
                      onClick={() => setSelectedExpert(null)}
                      className="py-2.5 px-4 bg-white border border-[#E2DDD5] hover:bg-[#EAE6DF] text-[#17201D] text-xs font-simplon-mono uppercase tracking-[0.14em] font-bold rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

