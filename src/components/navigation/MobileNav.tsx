import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  ArrowRight,
  Phone,
} from 'lucide-react';
import logoImg from '../../assets/logo.png';
import { companyData } from '../../data/company';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

// Animated hamburger → X morphing icon
interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
  isScrolled: boolean;
}

export const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, onClick, isScrolled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      className={`relative w-11 h-11 rounded-2xl flex flex-col items-center justify-center gap-[5px] transition-all duration-300 focus:outline-none group ${
        isScrolled
          ? 'bg-white border border-[#E8E2D8] shadow-sm hover:shadow-md hover:border-[#C8A97A]'
          : 'bg-white/12 border border-white/25 backdrop-blur-sm hover:bg-white/20'
      }`}
    >
      {/* Top bar */}
      <motion.span
        animate={
          isOpen
            ? { rotate: 45, y: 7.5, width: '20px' }
            : { rotate: 0, y: 0, width: '20px' }
        }
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className={`block h-[1.5px] rounded-full origin-center transition-colors duration-300 ${
          isScrolled ? 'bg-[#17201D]' : 'bg-white'
        }`}
        style={{ width: '20px' }}
      />
      {/* Middle bar */}
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={`block h-[1.5px] rounded-full transition-colors duration-300 ${
          isScrolled ? 'bg-[#17201D]' : 'bg-white'
        }`}
        style={{ width: '14px', marginLeft: '-3px' }}
      />
      {/* Bottom bar */}
      <motion.span
        animate={
          isOpen
            ? { rotate: -45, y: -7.5, width: '20px' }
            : { rotate: 0, y: 0, width: '20px' }
        }
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className={`block h-[1.5px] rounded-full origin-center transition-colors duration-300 ${
          isScrolled ? 'bg-[#17201D]' : 'bg-white'
        }`}
        style={{ width: '20px' }}
      />
    </button>
  );
};

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const location = useLocation();

  const whatsappNumber = companyData.whatsappNumber.replace(/[^0-9]/g, '');

  // Close on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset expanded section when closed
      setTimeout(() => setExpandedSection(null), 400);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const navSections = [
    {
      id: 'treks',
      label: 'Treks (20 Routes)',
      subsections: [
        { label: 'Everest Region (EBC, Gokyo, Heli, 3 Passes)', to: '/treks' },
        { label: 'Annapurna Region (ABC, Circuit, Mardi, Poon Hill)', to: '/treks' },
        { label: 'Langtang Region (Valley, Tamang, Gosainkunda)', to: '/treks' },
        { label: 'Off the Beaten Path (Manaslu, Mustang, Dolpo)', to: '/treks' },
        { label: 'View All 20 Himalayan Treks', to: '/treks' },
      ],
    },
    {
      id: 'tours',
      label: 'Tours (8 Experiences)',
      subsections: [
        { label: 'Cultural & UNESCO Heritage Tours', to: '/tours' },
        { label: 'Chitwan & Bardia Wildlife Safaris', to: '/tours' },
        { label: 'Luxury Helicopter Mountain Escapes', to: '/tours' },
        { label: 'Spiritual, Yoga & Buddhist Pilgrimage', to: '/tours' },
        { label: 'View All 8 Guided Tours', to: '/tours' },
      ],
    },
    {
      id: 'expeditions',
      label: 'Expeditions & Climbing (10 Peaks)',
      subsections: [
        { label: 'Above 7,000m (Everest, Manaslu, Ama Dablam)', to: '/expeditions' },
        { label: 'Below 7,000m Trekking Peaks (Island, Mera, Lobuche)', to: '/expeditions' },
        { label: 'View All 10 Climbing Expeditions', to: '/expeditions' },
      ],
    },
    {
      id: 'destinations',
      label: 'Destinations',
      subsections: [
        { label: 'Nepal (Everest, Annapurna, Mustang)', to: '/destinations' },
        { label: 'Bhutan (Paro, Thimphu, Tiger’s Nest)', to: '/destinations' },
        { label: 'Tibet (Lhasa, Potala Palace, Kailash)', to: '/destinations' },
        { label: 'India (Ladakh, Pangong Lake, Sikkim)', to: '/destinations' },
        { label: 'Explore All Himalayan Countries', to: '/destinations' },
      ],
    },
    {
      id: 'about',
      label: 'About',
      subsections: [
        { label: 'Our Story & Philosophy', to: '/about' },
        { label: 'Our Team & Mountain Guides', to: '/team' },
        { label: 'Responsible Travel', to: '/responsible-travel' },
        { label: 'Guest Reviews', to: '/reviews' },
        { label: 'Contact Us', to: '/contact' },
      ],
    },
    {
      id: 'guide',
      label: 'Travel Guide',
      subsections: [
        { label: 'Altitude Illness & Safety', to: '/safety-altitude' },
        { label: 'Emergency Rescue & Evacuation', to: '/emergency-rescue' },
        { label: 'Travel Insurance', to: '/travel-insurance' },
        { label: 'Booking Terms & Permits', to: '/booking-terms' },
        { label: 'Full Travel Guide Hub', to: '/travel-guide' },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop (High-performance solid overlay, zero blur lag) ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/65 xl:hidden"
            onClick={onClose}
          />

          {/* ── Right-side Drawer (Hardware accelerated) ── */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform' }}
            className="fixed inset-y-0 right-0 z-50 w-[90vw] max-w-[385px] sm:max-w-[400px] xl:hidden flex flex-col h-[100dvh] bg-[#0E1A14] shadow-[-12px_0_40px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* ── Authentic Himalayan Topographic Background Artwork ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
              {/* Summit Contours (Top-Right) */}
              <svg
                className="absolute -top-12 -right-16 w-[420px] h-[520px] text-[#C8A97A] opacity-[0.14]"
                viewBox="0 0 400 500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden="true"
              >
                {/* Summit Contours */}
                <ellipse cx="280" cy="120" rx="25" ry="18" strokeWidth="1.2" />
                <path d="M 240,115 C 250,90 295,85 315,110 C 330,130 305,155 275,150 C 250,145 230,135 240,115 Z" />
                <path d="M 215,110 C 230,70 320,65 345,100 C 365,130 335,175 285,170 C 235,165 200,145 215,110 Z" />
                <path d="M 185,105 C 205,50 340,45 375,95 C 400,135 365,195 295,190 C 220,185 170,155 185,105 Z" strokeDasharray="4 2" strokeWidth="0.85" />
                <path d="M 155,100 C 180,30 365,25 405,85 C 435,140 390,220 305,215 C 205,210 140,165 155,100 Z" />
                <path d="M 125,95 C 155,10 390,5 435,75 C 470,145 420,240 315,235 C 190,230 110,175 125,95 Z" strokeWidth="1.2" />
                
                {/* Ridge contours flowing down */}
                <path d="M 80,180 C 140,130 250,180 340,240 C 390,275 420,330 450,400" />
                <path d="M 50,210 C 120,155 240,205 330,265 C 380,300 405,360 430,440" strokeDasharray="3 3" />
                <path d="M 20,240 C 100,180 230,230 320,290 C 370,325 390,390 410,480" />
                <path d="M 0,270 C 80,210 220,255 310,315 C 360,350 375,420 390,500" strokeWidth="1.2" />

                {/* Elevation callouts */}
                <text x="245" y="123" fill="#C8A97A" fontSize="7.5" fontFamily="monospace" letterSpacing="0.18em" opacity="0.9">
                  ▲ 8,848M
                </text>
                <text x="275" y="188" fill="#C8A97A" fontSize="6.5" fontFamily="monospace" letterSpacing="0.15em" opacity="0.75">
                  7,200M CONTOUR
                </text>
                <text x="250" y="255" fill="#C8A97A" fontSize="6" fontFamily="monospace" letterSpacing="0.12em" opacity="0.6">
                  6,000M RIDGE
                </text>

                {/* Cartographic crosshair markers */}
                <text x="35" y="70" fill="#C8A97A" fontSize="9" fontFamily="monospace" opacity="0.45">+</text>
                <text x="180" y="240" fill="#C8A97A" fontSize="9" fontFamily="monospace" opacity="0.45">+</text>
                <text x="320" y="380" fill="#C8A97A" fontSize="9" fontFamily="monospace" opacity="0.45">+</text>
              </svg>

              {/* Valley Contours (Bottom-Left) */}
              <svg
                className="absolute -bottom-16 -left-16 w-[360px] h-[360px] text-[#C8A97A] opacity-[0.11]"
                viewBox="0 0 350 350"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden="true"
              >
                <path d="M 30,160 C 90,130 160,160 210,110 C 260,60 300,90 350,50" />
                <path d="M 10,190 C 70,160 150,190 200,135 C 250,85 285,115 335,75" strokeDasharray="3 2" />
                <path d="M 0,220 C 60,190 140,220 190,160 C 240,110 270,140 320,100" strokeWidth="1.1" />
                <path d="M 0,250 C 50,220 130,250 180,185 C 230,135 255,165 305,125" />
                <path d="M 0,280 C 40,250 120,280 170,210 C 220,160 240,190 290,150" />
                
                {/* Elevation callout */}
                <text x="45" y="275" fill="#C8A97A" fontSize="6.5" fontFamily="monospace" letterSpacing="0.14em" opacity="0.8">
                  ELEV. 2,800M // LUKLA
                </text>
                <text x="110" y="325" fill="#C8A97A" fontSize="6" fontFamily="monospace" letterSpacing="0.12em" opacity="0.6">
                  27°41'N · 86°43'E
                </text>
              </svg>
            </div>

            {/* ── Header ── */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8 shrink-0">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-3.5 group"
              >
                {/* 1. Animated Logo Container: Starts empty, builds smoothly from bottom up */}
                <div className="relative">
                  {/* Subtle blooming glow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 0, 0.6, 0.2], scale: [0.85, 0.85, 1.25, 1] }}
                    transition={{ duration: 1.6, times: [0, 0.2, 0.75, 1], delay: 0.25, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#C8A97A]/40 to-[#26483D]/50 blur-md pointer-events-none"
                  />

                  {/* Outer Logo Box with GPU overflow clipping */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
                    className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-white/14 to-white/6 border border-white/20 flex items-center justify-center p-1.5 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.3)] group-hover:border-[#C8A97A]/60 transition-colors duration-200"
                  >
                    {/* Logo Image: slides smoothly from bottom up (Cinematic luxurious pace) */}
                    <motion.div
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      style={{ willChange: 'transform, opacity' }}
                      className="w-full h-full relative flex items-center justify-center"
                    >
                      <img
                        src={logoImg}
                        alt="EcoSummit Nepal"
                        className="w-full h-full object-contain select-none"
                      />

                      {/* Rising gold horizon line traveling up with the reveal */}
                      <motion.div
                        initial={{ top: '100%', opacity: 0 }}
                        animate={{ top: '-10%', opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A97A] to-transparent pointer-events-none shadow-[0_0_10px_#C8A97A]"
                      />
                    </motion.div>

                    {/* Subtle finishing sheen once built */}
                    <motion.div
                      initial={{ x: '-150%', opacity: 0 }}
                      animate={{ x: '180%', opacity: [0, 0.8, 0] }}
                      transition={{ duration: 0.75, delay: 1.75, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
                    />
                  </motion.div>
                </div>

                {/* 2. Brand Typography: Builds smoothly from the side */}
                <div className="flex flex-col justify-center">
                  {/* "EcoSummit" — GPU slide from left with deliberate elegance */}
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ x: '-105%', opacity: 0 }}
                      animate={{ x: '0%', opacity: 1 }}
                      transition={{ duration: 0.75, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                      style={{ willChange: 'transform, opacity' }}
                      className="relative"
                    >
                      <span className="font-serif text-lg font-bold tracking-tight text-white leading-none uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] block">
                        EcoSummit
                      </span>
                    </motion.div>
                  </div>

                  {/* "TRAVEL & TOURS" — GPU slide from left right after */}
                  <div className="overflow-hidden mt-1">
                    <motion.div
                      initial={{ x: '-105%', opacity: 0 }}
                      animate={{ x: '0%', opacity: 1 }}
                      transition={{ duration: 0.65, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ willChange: 'transform, opacity' }}
                      className="relative"
                    >
                      <span className="text-[8px] font-semibold text-[#C8A97A] tracking-[0.24em] uppercase leading-none block drop-shadow-[0_1px_4px_rgba(200,169,122,0.25)]">
                        TRAVEL &amp; TOURS
                      </span>
                    </motion.div>
                  </div>
                </div>
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-colors duration-150 cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Scrollable nav body (Flex-1 column with guaranteed full-height expansion) ── */}
            <div className="relative z-10 flex-1 flex flex-col min-h-0 h-full overflow-y-auto overscroll-contain">
              <div className="flex-1 flex flex-col justify-between min-h-full pt-3 pb-6 sm:pb-8">
                {/* ── Top: Nav accordion with larger, premium typography ── */}
                <div className="px-4 space-y-1.5 sm:space-y-2">
                  {navSections.map((section, idx) => {
                    const isExpanded = expandedSection === section.id;
                    const itemIndex = String(idx + 1).padStart(2, '0');

                    return (
                      <div key={section.id}>
                        <button
                          type="button"
                          onClick={() => toggleSection(section.id)}
                          className={`w-full flex items-center justify-between px-4 py-3.5 sm:py-4 rounded-xl text-left transition-all duration-200 group cursor-pointer ${
                            isExpanded
                              ? 'bg-white/[0.09] text-white shadow-xs'
                              : 'text-white/80 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            {/* Expedition Index Number */}
                            <span
                              className={`font-simplon-mono text-xs sm:text-[13px] tracking-[0.22em] font-bold transition-colors duration-200 ${
                                isExpanded
                                  ? 'text-[#C8A97A]'
                                  : 'text-[#C8A97A]/70 group-hover:text-[#C8A97A]'
                              }`}
                            >
                              {itemIndex}
                            </span>

                            <span className="w-2.5 h-px bg-white/25" />

                            {/* Nav Label: Bigger text as requested */}
                            <span
                              className={`font-sans text-[19px] sm:text-[20px] font-semibold tracking-wide transition-colors ${
                                isExpanded ? 'text-white font-bold' : 'text-white/95 group-hover:text-white'
                              }`}
                            >
                              {section.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            {isExpanded && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97A] shadow-[0_0_8px_#C8A97A]" />
                            )}
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown
                                className={`w-4.5 h-4.5 transition-colors ${
                                  isExpanded ? 'text-[#C8A97A]' : 'text-white/40 group-hover:text-white/70'
                                }`}
                              />
                            </motion.div>
                          </div>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pl-11 pr-3 pt-1.5 pb-2.5 space-y-0.5">
                                {section.subsections.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    to={sub.to}
                                    onClick={onClose}
                                    className="flex items-center justify-between text-[14.5px] sm:text-[15px] text-white/65 hover:text-white py-3 pr-1 transition-colors duration-150 group/sub border-b border-white/4 last:border-0"
                                  >
                                    <span className="font-medium leading-tight">{sub.label}</span>
                                    <ChevronRight className="w-4 h-4 text-white/25 group-hover/sub:text-[#C8A97A] group-hover/sub:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* ── Bottom Section (Anchored to bottom — Perfect Fit, No Dead Gap) ── */}
                <div className="mt-6 pt-4 border-t border-white/8 space-y-3.5 sm:space-y-4 shrink-0">
                  {/* CTA Buttons */}
                  <div className="px-4 space-y-2.5">
                    <Link
                      to="/plan-your-trip"
                      onClick={onClose}
                      className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 sm:py-4 px-6 rounded-2xl bg-[#C8A97A] hover:bg-[#B8946A] text-[#0E1A14] text-[14.5px] sm:text-[15px] font-bold tracking-wide transition-all duration-200 shadow-[0_8px_24px_rgba(200,169,122,0.25)] hover:shadow-[0_12px_32px_rgba(200,169,122,0.35)] active:scale-[0.98]"
                    >
                      <span>Plan Your Journey</span>
                      <ArrowRight className="w-4.5 h-4.5" />
                    </Link>

                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-white/[0.07] border border-white/12 text-white/90 hover:text-white hover:bg-white/12 text-[13.5px] sm:text-[14px] font-semibold tracking-wide transition-all duration-200 active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4.5 h-4.5 text-[#25D366]" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>

                  {/* Scenic Brand Card */}
                  <div className="mx-4">
                    <div className="rounded-2xl overflow-hidden relative aspect-[16/7.2] bg-[#0a1510] border border-white/10 shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
                        alt="Himalayas"
                        className="absolute inset-0 w-full h-full object-cover opacity-35 select-none pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A14] via-[#0E1A14]/40 to-transparent" />
                      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-3">
                        <p className="font-serif italic text-[16px] sm:text-[17px] text-white/95 font-normal tracking-wide leading-tight">
                          Real Journeys. Lasting Memories.
                        </p>
                        <span className="font-simplon-mono text-[9px] uppercase tracking-[0.28em] text-[#C8A97A] font-bold block mt-1.5">
                          ECOSUMMIT NEPAL
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact info: clean single-line format */}
                  <div className="mx-4 pt-1 flex items-center justify-between text-white/50 text-xs font-simplon-mono">
                    <a
                      href={`tel:${companyData.contactPhone}`}
                      className="hover:text-[#C8A97A] transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C8A97A]" />
                      <span>{companyData.contactPhone}</span>
                    </a>
                    <span className="text-white/20">·</span>
                    <span className="text-white/50">Kathmandu, Nepal</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
