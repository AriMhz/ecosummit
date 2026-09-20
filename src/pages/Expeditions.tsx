import React from 'react';
import { expeditionsData } from '../data/expeditions';
import { JourneyCard } from '../components/cards/JourneyCard';
import { Mountain, CheckCircle2, Award, ShieldCheck, MapPin } from 'lucide-react';
import everestImg from '../assets/everest.png';
import { CountUp } from '../components/common/CountUp';

export const Expeditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#17201D] relative overflow-hidden">
      {/* ── 1. ATMOSPHERIC MOUNTAINEERING HERO HEADER ── */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-20 overflow-hidden border-b border-[#E8E2D8]">
        {/* Layer 1: Authentic Mountain Panorama */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src={everestImg}
            alt="Himalayan Climbing Peaks"
            className="w-full h-full object-cover object-[center_20%] filter brightness-95 contrast-105 scale-102"
          />

          {/* Directional gradient: clean readability on left, glorious summits on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 via-45% md:via-55% to-[#FAF8F5]/25" />

          {/* Bottom edge fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F5] to-transparent" />

          {/* Top soft vignette */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#FAF8F5]/90 to-transparent" />

          {/* Alpine glow accent */}
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
              <span className="font-handwriting text-2xl sm:text-3xl lg:text-4xl text-[#E85D2A] block -rotate-1 mb-2 tracking-wide">
                Technical & Non-Technical Summits
              </span>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#E8E2D8] text-xs font-bold uppercase tracking-[0.2em] text-[#142332] mb-3 shadow-2xs">
                <Mountain className="w-3.5 h-3.5 text-[#E85D2A]" />
                <span>Mountaineering & High Summits</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#142332] font-normal leading-tight tracking-tight">
                Himalayan Peak Expeditions
              </h1>

              <p className="text-base sm:text-lg text-[#4A5568] mt-4 font-light leading-relaxed max-w-2xl">
                Targeting iconic 6,000-meter peaks like Island Peak (6,189m), Mera Peak (6,476m), and Ama Dablam (6,812m). Guided by certified IFMGA / NMA climbing Sherpa leads with high guide ratios, fixed-line safety systems, and base camp support.
              </p>

              {/* Elevated Trust Badges */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-6 text-xs sm:text-[13px]">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E2DDD5] shadow-xs font-semibold text-[#142332]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  IFMGA / NMA Certified Sherpas
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E2DDD5] shadow-xs font-semibold text-[#142332]">
                  <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
                  1:1 / 2:1 Summit Sherpa Ratio
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E2DDD5] shadow-xs font-semibold text-[#142332]">
                  <Award className="w-4 h-4 text-[#E85D2A]" />
                  Fixed-Rope & Medical O₂ Support
                </span>
              </div>
            </div>

            {/* Right Column: Expedition Telemetry Card */}
            {/* Right Column: Cardless Floating Numbers with Count-Up Animation */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 pl-4">
                {/* Stat 1: Peak Summits */}
                <div className="relative pl-5 border-l-2 border-[#E85D2A]/60">
                  <div className="font-sans text-4xl sm:text-5xl font-black text-[#142332] tracking-tight leading-none drop-shadow-xs">
                    <CountUp end={10} duration={1400} suffix=" Peaks" />
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#142332] mt-2.5">
                    Himalayan Summits
                  </span>
                  <span className="block text-[12px] text-[#5D6B78] font-light mt-0.5">
                    Trekking & Technical Climbs
                  </span>
                </div>

                {/* Stat 2: Max Altitude */}
                <div className="relative pl-5 border-l-2 border-[#E85D2A]">
                  <div className="font-sans text-4xl sm:text-5xl font-black text-[#E85D2A] tracking-tight leading-none drop-shadow-xs">
                    <CountUp end={8848} duration={2100} suffix="m" />
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#142332] mt-2.5">
                    Maximum Elevation
                  </span>
                  <span className="block text-[12px] text-[#5D6B78] font-light mt-0.5">
                    Mt. Everest (Sagarmatha)
                  </span>
                </div>

                {/* Stat 3: Sherpa Climber Ratio */}
                <div className="relative pl-5 border-l-2 border-[#183E63]/60">
                  <div className="font-sans text-4xl sm:text-5xl font-black text-[#142332] tracking-tight leading-none drop-shadow-xs">
                    1:1 / 2:1
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#142332] mt-2.5">
                    Climber Ratio
                  </span>
                  <span className="block text-[12px] text-[#5D6B78] font-light mt-0.5">
                    Personal Sherpa Guide
                  </span>
                </div>

                {/* Stat 4: Evacuation Readiness */}
                <div className="relative pl-5 border-l-2 border-emerald-600/70">
                  <div className="font-sans text-4xl sm:text-5xl font-black text-[#142332] tracking-tight leading-none drop-shadow-xs flex items-baseline gap-1.5">
                    <CountUp end={100} duration={1500} suffix="%" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block mb-1" />
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#142332] mt-2.5">
                    Rescue Standby
                  </span>
                  <span className="block text-[12px] text-[#5D6B78] font-light mt-0.5">
                    24/7 Heli & Satellite SOS
                  </span>
                </div>
              </div>

              {/* Bottom Status Bar */}
              <div className="mt-8 pt-4 border-t border-[#E8E2D8]/80 flex items-center justify-between text-xs text-[#5D6B78] pl-4">
                <span className="flex items-center gap-1.5 font-semibold text-[#142332]">
                  <MapPin className="w-4 h-4 text-[#E85D2A]" />
                  Island Peak · Mera · Lobuche · Ama Dablam
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[#E85D2A] text-[11.5px]">
                  IFMGA / NMA Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. EXPEDITIONS GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expeditionsData.map((expedition) => (
            <JourneyCard key={expedition.slug} journey={expedition} variant="editorial" />
          ))}
        </div>
      </div>
    </div>
  );
};
