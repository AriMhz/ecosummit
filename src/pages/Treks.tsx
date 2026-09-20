import React, { useState } from 'react';
import { treksData } from '../data/treks';
import { JourneyCard } from '../components/cards/JourneyCard';
import { Filter, Mountain, CheckCircle2, Award, ShieldCheck, Compass } from 'lucide-react';
import everestImg from '../assets/everest.png';
import { CountUp } from '../components/common/CountUp';

export const Treks: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const filteredTreks = selectedDifficulty === 'All'
    ? treksData
    : treksData.filter((t) => t.difficulty === selectedDifficulty);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#17201D] relative overflow-hidden">
      {/* ── 1. ATMOSPHERIC HIMALAYAN MOUNTAIN HERO HEADER ── */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-20 overflow-hidden border-b border-[#E8E2D8]">
        {/* Layer 1: Authentic Majestic Himalayan Panorama */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src={everestImg}
            alt="Majestic Himalayan Peaks"
            className="w-full h-full object-cover object-[center_30%] filter brightness-95 contrast-105 scale-102"
          />

          {/* Directional gradient: 100% clean readability on left, glorious mountain vista revealed on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 via-45% md:via-55% to-[#FAF8F5]/25" />

          {/* Bottom edge fade: perfectly blends into page content */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F5] to-transparent" />

          {/* Top soft vignette for navigation clarity */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#FAF8F5]/90 to-transparent" />

          {/* Subtle warm alpine glow accent */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Layer 2: Elegant Topographic Contour Lines */}
        <svg
          className="absolute -top-12 right-0 w-[500px] lg:w-[680px] h-[500px] lg:h-[680px] text-[#E85D2A]/15 pointer-events-none select-none z-0"
          viewBox="0 0 400 400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M 20,180 C 80,120 160,110 240,120 C 320,130 360,190 380,260" />
          <path d="M 10,220 C 70,160 150,150 230,160 C 310,170 350,230 370,300" />
          <path d="M 0,260 C 60,200 140,190 220,200 C 300,210 340,270 360,340" />
          <path d="M 0,300 C 50,240 130,230 210,240 C 290,250 330,310 350,380" />
          <circle cx="280" cy="180" r="45" strokeDasharray="3 3" />
        </svg>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading & Narrative */}
            <div className="lg:col-span-7">
              {/* Handwritten Warm Terracotta Badge */}
              <span className="font-handwriting text-2xl sm:text-3xl lg:text-4xl text-[#E85D2A] block -rotate-1 mb-2 tracking-wide">
                Authentic High-Altitude Trails
              </span>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#E8E2D8] text-xs font-bold uppercase tracking-[0.2em] text-[#142332] mb-3 shadow-2xs">
                <Mountain className="w-3.5 h-3.5 text-[#E85D2A]" />
                <span>Himalayan Mountain Routes</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#142332] font-normal leading-tight tracking-tight">
                Curated Himalayan Treks
              </h1>

              <p className="text-base sm:text-lg text-[#4A5568] mt-4 font-light leading-relaxed max-w-2xl">
                Thoughtfully planned trekking journeys through the Everest, Annapurna, Manaslu, and Langtang corridors. Each itinerary includes dedicated acclimatisation days, wilderness-certified Sherpa guides, and private pacing.
              </p>

              {/* Elevated Trust Badges */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-6 text-xs sm:text-[13px]">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E2DDD5] shadow-xs font-semibold text-[#142332]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  100% Native Sherpa Guides
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E2DDD5] shadow-xs font-semibold text-[#142332]">
                  <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
                  Acclimatisation Pacing Guaranteed
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E2DDD5] shadow-xs font-semibold text-[#142332]">
                  <Award className="w-4 h-4 text-[#E85D2A]" />
                  98% Route Success Rate
                </span>
              </div>
            </div>

            {/* Right Column: Cardless Floating Numbers with Count-Up Animation */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 pl-4">
                {/* Stat 1: Handcrafted Routes */}
                <div className="relative pl-5 border-l-2 border-[#E85D2A]/60">
                  <div className="font-sans text-4xl sm:text-5xl font-black text-[#142332] tracking-tight leading-none drop-shadow-xs">
                    <CountUp end={20} duration={1600} suffix="+" />
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#142332] mt-2.5">
                    Handcrafted Routes
                  </span>
                  <span className="block text-[12px] text-[#5D6B78] font-light mt-0.5">
                    Everest, Annapurna & Beyond
                  </span>
                </div>

                {/* Stat 2: Peak Elevation */}
                <div className="relative pl-5 border-l-2 border-[#E85D2A]">
                  <div className="font-sans text-4xl sm:text-5xl font-black text-[#E85D2A] tracking-tight leading-none drop-shadow-xs">
                    <CountUp end={5545} duration={1900} suffix="m" />
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#142332] mt-2.5">
                    Peak Elevation
                  </span>
                  <span className="block text-[12px] text-[#5D6B78] font-light mt-0.5">
                    Kala Patthar Summit Ridge
                  </span>
                </div>

                {/* Stat 3: Sherpa-Led Safety */}
                <div className="relative pl-5 border-l-2 border-[#183E63]/60">
                  <div className="font-sans text-4xl sm:text-5xl font-black text-[#142332] tracking-tight leading-none drop-shadow-xs">
                    <CountUp end={100} duration={1500} suffix="%" />
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#142332] mt-2.5">
                    Sherpa Guided
                  </span>
                  <span className="block text-[12px] text-[#5D6B78] font-light mt-0.5">
                    Government Licensed Leads
                  </span>
                </div>

                {/* Stat 4: Route Success Rate */}
                <div className="relative pl-5 border-l-2 border-emerald-600/70">
                  <div className="font-sans text-4xl sm:text-5xl font-black text-[#142332] tracking-tight leading-none drop-shadow-xs flex items-baseline gap-1.5">
                    <CountUp end={98} duration={1700} suffix="%" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block mb-1" />
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#142332] mt-2.5">
                    Route Success
                  </span>
                  <span className="block text-[12px] text-[#5D6B78] font-light mt-0.5">
                    Acclimatisation Guaranteed
                  </span>
                </div>
              </div>

              {/* Bottom Subtle Status Bar */}
              <div className="mt-8 pt-4 border-t border-[#E8E2D8]/80 flex items-center justify-between text-xs text-[#5D6B78] pl-4">
                <span className="flex items-center gap-1.5 font-semibold text-[#142332]">
                  <Compass className="w-4 h-4 text-[#E85D2A]" />
                  Khumbu · Annapurna · Langtang · Manaslu
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[#E85D2A] text-[11.5px]">
                  Private & Small Groups
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FILTER & JOURNEY GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <div className="flex items-center gap-2 pb-6 mb-8 border-b border-[#E8E2D8] overflow-x-auto no-scrollbar text-xs">
          <span className="flex items-center gap-1.5 text-[#59615D] uppercase tracking-wider font-semibold mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#183E63]" /> Difficulty:
          </span>
          {['All', 'Moderate', 'Challenging', 'Strenuous'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all shrink-0 cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-[#183E63] text-white shadow-xs'
                  : 'bg-white text-[#59615D] hover:bg-[#FAF8F5] border border-[#E8E2D8]'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Journey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreks.map((trek) => (
            <JourneyCard key={trek.slug} journey={trek} variant="editorial" />
          ))}
        </div>
      </div>
    </div>
  );
};
