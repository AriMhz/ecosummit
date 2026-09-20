import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Users,
  ShieldCheck,
  Star,
  Compass,
  Mountain,
  Flower2,
  Crosshair,
  MapPin,
} from 'lucide-react';
import boudhaBg from '../../assets/boudha_bg.png';
import boudhaThumb from '../../assets/boudha_card_thumb.jpg';

export const PrivateJourneys: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Exclusive Private Guides',
      desc: 'Personalized attention, deeper connections.',
    },
    {
      icon: ShieldCheck,
      title: 'Seamless Travel Support',
      desc: "From arrival to departure, we're with you.",
    },
    {
      icon: Star,
      title: 'Premium Accommodation',
      desc: 'Handpicked stays, from boutique lodges to luxury hotels.',
    },
    {
      icon: Mountain,
      title: 'Unique Cultural Encounters',
      desc: 'Authentic experiences, lasting memories.',
    },
    {
      icon: Compass,
      title: 'Flexible Itineraries',
      desc: 'Tailored to your interests, pace, and travel style.',
    },
    {
      icon: Flower2,
      title: 'Wellness & Luxury Stays',
      desc: 'Rejuvenate in the heart of the Himalayas.',
    },
  ];

  return (
    <section
      className="relative w-full bg-[#031815] text-white overflow-hidden select-none scroll-mt-24"
      id="private-journeys"
    >
      {/* ── Outer Stage Container: Full screen height (100vh) seamlessly filling the display ── */}
      <div className="relative w-full min-h-[calc(100vh-72px)] lg:h-[calc(100vh-72px)] py-8 sm:py-12 lg:py-0 flex items-center overflow-hidden">
        {/* ── 1. Master High-Resolution Background ────── */}
        <div className="absolute inset-0 z-0">
          <img
            src={boudhaBg}
            alt="Boudhanath Stupa at Sunset, Kathmandu Nepal"
            className="w-full h-full object-cover object-[72%_35%] sm:object-[68%_35%] lg:object-[64%_35%]"
            loading="eager"
          />
        </div>

        {/* ── 2. Cinematic Spruce Green Fade Overlays ──────────── */}
        {/* Desktop Horizontal Left-to-Right Emerald Gradient */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none hidden sm:block"
          style={{
            background:
              'linear-gradient(90deg, #031714 0%, #031714 28%, rgba(3,23,20,0.95) 42%, rgba(3,23,20,0.65) 54%, rgba(3,23,20,0.15) 68%, transparent 82%)',
          }}
        />

        {/* Mobile Full-Bleed Readability Backdrop */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none sm:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(3,23,20,0.92) 0%, rgba(3,23,20,0.85) 50%, rgba(3,23,20,0.95) 100%)',
          }}
        />

        {/* Subtle Edge Vignette for depth and contrast */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 16% 50%, rgba(3,23,20,0.85) 0%, rgba(3,23,20,0.25) 60%, transparent 85%), linear-gradient(180deg, rgba(3,23,20,0.4) 0%, transparent 15%, transparent 85%, rgba(3,23,20,0.7) 100%)',
          }}
        />

        {/* ── 3. Golden Topographic Contour Lines SVG Patterns ── */}
        {/* Bottom-Left Rich Topographic Elevation Contours */}
        <div className="absolute -bottom-6 -left-6 w-[520px] sm:w-[580px] h-[460px] sm:h-[500px] z-[2] pointer-events-none opacity-45 select-none overflow-hidden">
          <svg
            viewBox="0 0 540 480"
            fill="none"
            stroke="#DEC096"
            strokeWidth="1.15"
            className="w-full h-full"
            aria-hidden="true"
          >
            <path d="M -50 410 C 50 400, 110 360, 150 300 C 190 240, 170 170, 250 140 C 320 110, 410 150, 490 120" opacity="0.25" />
            <path d="M -40 435 C 70 420, 130 375, 170 315 C 210 255, 190 185, 270 155 C 340 125, 430 165, 510 135" opacity="0.4" />
            <path d="M -30 460 C 85 440, 150 390, 190 330 C 230 270, 210 200, 290 170 C 360 140, 450 180, 530 150" opacity="0.55" />
            <path d="M -10 485 C 100 465, 170 415, 210 355 C 250 295, 230 225, 310 195 C 380 165, 470 205, 550 175" opacity="0.7" />
            <path d="M 20 510 C 120 490, 190 440, 230 380 C 270 320, 250 250, 330 220 C 400 190, 490 230, 570 200" opacity="0.5" />
            <path d="M 50 530 C 140 510, 210 460, 250 400 C 290 340, 270 270, 350 240 C 420 210, 510 250, 590 220" opacity="0.3" />
            {/* Upper contour lines crawling up left margin */}
            <path d="M -60 350 C 30 340, 80 300, 120 250 C 160 200, 150 140, 220 110 C 290 80, 370 120, 450 90" opacity="0.25" />
            <path d="M -70 290 C 20 280, 60 240, 95 200 C 130 160, 130 100, 190 75 C 250 50, 330 85, 405 60" opacity="0.2" />
            <path d="M -80 230 C 10 220, 45 180, 75 145 C 105 110, 110 65, 165 45 C 220 25, 290 55, 360 35" opacity="0.15" />
          </svg>
        </div>

        {/* Top-Left Topographic Contour Waves */}
        <div className="absolute top-0 left-0 w-72 sm:w-84 h-64 sm:h-76 z-[2] pointer-events-none opacity-25 select-none overflow-hidden">
          <svg
            viewBox="0 0 360 320"
            fill="none"
            stroke="#DEC096"
            strokeWidth="1.1"
            className="w-full h-full"
            aria-hidden="true"
          >
            <path d="M -30 20 C 50 10, 90 60, 140 80 C 190 100, 220 70, 280 100 C 330 130, 350 190, 380 240" />
            <path d="M -30 60 C 60 45, 100 95, 150 115 C 200 135, 230 105, 290 135 C 340 165, 360 225, 390 275" />
            <path d="M -30 100 C 70 80, 110 130, 160 150 C 210 170, 240 140, 300 170 C 350 200, 370 260, 400 310" />
          </svg>
        </div>

        {/* Top-Right Sky Topographic Contours & Trail Line */}
        <div className="absolute top-0 right-0 w-80 sm:w-96 h-72 sm:h-80 z-[2] pointer-events-none opacity-40 select-none overflow-hidden">
          <svg
            viewBox="0 0 400 320"
            fill="none"
            stroke="#DEC096"
            strokeWidth="1.1"
            className="w-full h-full"
            aria-hidden="true"
          >
            <path d="M 220 0 C 240 40, 290 60, 340 80 C 380 100, 400 130, 420 180" opacity="0.3" />
            <path d="M 180 0 C 210 50, 260 80, 310 110 C 360 140, 380 180, 400 240" opacity="0.4" />
            <path d="M 140 0 C 180 60, 230 100, 280 140 C 330 180, 360 230, 380 300" opacity="0.25" />
            {/* Trail route from pin to stupa */}
            <path
              d="M 276 112 C 285 125, 315 140, 320 160 C 328 190, 365 205, 385 235"
              stroke="#DEC096"
              strokeWidth="1.4"
              strokeDasharray="4 4"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* ── 4. Main Section Content Layout: Clean Left-Alignment & Responsive Proportions ──── */}
        <div className="relative z-10 w-full max-w-[1760px] mx-auto px-5 sm:px-8 md:px-12 lg:pl-12 lg:pr-10 xl:pl-16 xl:pr-14 py-4 sm:py-6 lg:py-6 xl:py-8 flex flex-col justify-between h-full min-h-[580px] lg:min-h-0">
          {/* Top Bar: Eyebrow + Coordinates & Pin */}
          <div className="flex items-center justify-between w-full mb-4 lg:mb-2 xl:mb-4">
            {/* Left Eyebrow */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-6 sm:w-8 h-[2px] bg-[#DEC096] rounded-full" />
              <span className="text-[10.5px] sm:text-xs font-sans tracking-[0.24em] text-[#DEC096] uppercase font-medium">
                ELEVATED MOUNTAIN HOSPITALITY
              </span>
            </div>

            {/* Right Coordinates & Location Pin Badge */}
            <div className="flex items-center gap-4 sm:gap-6 text-[#DEC096]">
              {/* Coordinates */}
              <div className="hidden sm:flex items-center gap-2 text-xs text-[#DEC096]/90 font-mono tracking-wider">
                <Crosshair className="w-3.5 h-3.5 text-[#DEC096]" />
                <span className="w-[1px] h-3 bg-[#DEC096]/40" />
                <span>27.7172° N</span>
                <span>85.3240° E</span>
              </div>

              {/* Pin & Stupa Location */}
              <div className="flex items-center gap-2 text-right">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    <svg
                      viewBox="0 0 24 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-4 h-2.5 text-[#DEC096]"
                    >
                      <polygon points="12,1 6,13 18,13" />
                      <polygon points="5,5 1,13 9,13" />
                      <polygon points="19,5 15,13 23,13" />
                    </svg>
                    <MapPin className="w-3.5 h-3.5 text-[#DEC096] fill-[#DEC096]/20" />
                  </div>
                  <span className="text-[9px] font-sans tracking-[0.22em] text-[#DEC096] uppercase leading-tight font-medium mt-0.5">
                    KATHMANDU
                  </span>
                  <span className="text-[8px] font-sans tracking-[0.22em] text-[#DEC096]/80 uppercase leading-none">
                    BOUDHANATH
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Content: Headline, Subtitle, Features & CTA Button */}
          <div className="max-w-2xl lg:max-w-[580px] xl:max-w-[660px] my-auto py-2 lg:py-1">
            {/* Main Title - Prominent, Luxury Serif */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[64px] leading-[1.06] tracking-tight mb-3 sm:mb-4">
              <span className="font-serif text-white block">Private and</span>
              <span className="font-serif italic text-[#DEC096] font-normal block mt-1">
                Refined Journeys
              </span>
            </h2>

            {/* Subtitle Description */}
            <p className="text-[#C4D3CE] text-xs sm:text-sm md:text-[14.5px] lg:text-[15px] leading-relaxed max-w-xl mb-5 sm:mb-6 font-normal">
              Experience Nepal with more privacy, flexibility, and comfort — from
              private guides and premium accommodation to personalized itineraries
              and carefully arranged transfers.
            </p>

            {/* 6 Features Grid (2 columns on sm+, 1 col on xs) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-7 gap-y-3.5 sm:gap-y-4 lg:gap-y-3 xl:gap-y-3.5 mb-6 sm:mb-7 max-w-xl xl:max-w-2xl">
              {features.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 group">
                    {/* Circular Gold Icon Badge */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#DEC096]/60 bg-[#031815]/60 flex items-center justify-center shrink-0 text-[#DEC096] transition-all duration-300 group-hover:border-[#DEC096] group-hover:bg-[#DEC096]/15 shadow-[0_0_10px_rgba(222,192,150,0.12)]">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    {/* Text Details */}
                    <div>
                      <h4 className="text-white text-xs sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-medium leading-snug tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-[#96ACA5] text-[11px] sm:text-xs lg:text-[11.5px] xl:text-xs leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Single Crisp CTA Button */}
            <div>
              <Link
                to="/plan-your-trip"
                className="group inline-flex items-center justify-between gap-3 sm:gap-4 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#DEC096] to-[#CBA46E] hover:from-[#E8CCA6] hover:to-[#D8B37D] text-[#0A1A16] font-sans text-xs sm:text-sm font-medium tracking-wide shadow-[0_6px_22px_rgba(222,192,150,0.35)] hover:shadow-[0_10px_32px_rgba(222,192,150,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              >
                <span>Design My Private Journey</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* Bottom Bar: Brand Emblem (Left) & Floating Quote Card (Right) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-8 mt-4 sm:mt-6 pt-3 lg:pt-1">
            {/* Bottom-Left Brand Seal */}
            <div className="flex items-center gap-2.5 text-[#DEC096]">
              {/* Three Mountain Peaks Crest */}
              <svg
                viewBox="0 0 32 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="w-6 sm:w-7 h-3.5 sm:h-4 text-[#DEC096]"
              >
                <polygon points="16,1 9,17 23,17" />
                <polygon points="8,6 2,17 14,17" />
                <polygon points="24,6 18,17 30,17" />
                <line x1="16" y1="1" x2="16" y2="17" strokeWidth="0.8" opacity="0.6" />
              </svg>
              <div className="w-[1px] h-5 sm:h-6 bg-[#DEC096]/40" />
              <div>
                <span className="text-[9.5px] sm:text-[10.5px] font-sans tracking-[0.24em] text-[#DEC096] font-semibold uppercase block leading-tight">
                  NEPAL
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[8.5px] sm:text-[9px] font-sans tracking-[0.2em] text-[#DEC096]/80 uppercase leading-none font-medium">
                    TIMELESS. AUTHENTIC. YOURS.
                  </span>
                  <span className="w-3.5 sm:w-4 h-[1.5px] bg-[#DEC096]/80 inline-block" />
                </div>
              </div>
            </div>

            {/* Bottom-Right Floating Quote Card */}
            <motion.div
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative self-end w-full sm:w-auto max-w-sm sm:max-w-md lg:max-w-[460px] rounded-2xl sm:rounded-3xl bg-[#EBE4D5]/95 backdrop-blur-md p-3.5 sm:p-4 lg:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-[#DEC096]/40 text-[#1D211F]"
            >
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Quote Text Column */}
                <div className="flex-1 space-y-2">
                  {/* Decorative Big Serif Quote Mark */}
                  <span className="font-serif text-2xl sm:text-3xl text-[#CBA46E] leading-none block -mb-1">
                    “
                  </span>
                  <p className="font-serif italic text-xs sm:text-[13px] lg:text-[13.5px] text-[#222725] leading-snug">
                    “The true luxury of travel is having the time, space and freedom to experience a place deeply.”
                  </p>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="w-4 h-[1.5px] bg-[#CBA46E]" />
                    <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.22em] text-[#635E54] uppercase font-semibold">
                      NEPAL PRIVATE JOURNEYS
                    </span>
                  </div>
                </div>

                {/* Stupa Photo Thumbnail */}
                <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-[#CBA46E]/30">
                  <img
                    src={boudhaThumb}
                    alt="Kathmandu Boudhanath Stupa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
