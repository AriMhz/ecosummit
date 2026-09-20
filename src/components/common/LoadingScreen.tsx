import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../../assets/logo.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [altitude, setAltitude] = useState(1400); // Starts at Kathmandu Valley (1,400m)
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    'Surveying Himalayan weather patterns...',
    'Mapping alpine routes & valley trails...',
    'Ascending toward the high summits...',
    'Welcome to Nepal.',
  ];

  useEffect(() => {
    // Progress counter over ~2.1 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slightly organic increment
        const increment = prev < 60 ? Math.floor(Math.random() * 4) + 3 : Math.floor(Math.random() * 3) + 2;
        const next = Math.min(prev + increment, 100);

        // Calculate altitude relative to progress (1,400m -> 8,848m)
        const alt = Math.round(1400 + (next / 100) * (8848 - 1400));
        setAltitude(alt);

        // Update status phrase
        if (next < 35) setStatusIndex(0);
        else if (next < 70) setStatusIndex(1);
        else if (next < 98) setStatusIndex(2);
        else setStatusIndex(3);

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // When progress hits 100%, hold briefly for cinematic feel then exit
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <motion.aside
      key="ecosummit-preloader"
      aria-label="Loading application"
      aria-busy="true"
      initial={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: {
          duration: 0.95,
          ease: [0.76, 0, 0.24, 1], // Luxury editorial cubic bezier
        },
      }}
      className="fixed inset-0 z-[9999] bg-[#0E1412] text-[#FAF8F5] flex flex-col justify-between p-6 sm:p-10 lg:p-14 select-none overflow-hidden"
    >
      {/* ── Background Atmospheric Ambient Glow & Contours ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft mountain dawn radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] sm:h-[650px] bg-gradient-to-b from-[#E85D2A]/10 via-[#183E63]/15 to-transparent rounded-full blur-3xl opacity-80" />

        {/* Subtle Topographic contour watermarks */}
        <svg
          className="absolute -bottom-24 -right-24 w-[550px] h-[550px] text-white/[0.025] pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          aria-hidden="true"
        >
          <path d="M 20,200 C 60,140 120,110 200,110 C 280,110 340,150 360,210 C 370,270 300,320 220,330 C 140,340 30,250 20,200 Z" />
          <path d="M 50,200 C 80,155 135,130 195,130 C 255,130 305,160 325,205 C 335,250 275,295 215,300 C 155,305 65,240 50,200 Z" />
          <path d="M 80,200 C 100,170 145,150 190,150 C 235,150 275,170 290,200 C 300,230 250,270 210,275 C 170,280 95,230 80,200 Z" />
        </svg>
      </div>

      {/* ── Top Monospace Navigation / Metadata Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full flex items-center justify-between text-[11px] sm:text-xs font-simplon-mono text-[#94A3B8] tracking-widest relative z-10"
      >
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E85D2A] animate-pulse" />
          <span className="uppercase text-[#FAF8F5]/90 font-medium">EcoSummit Expeditions</span>
          <span className="hidden sm:inline text-[#64748B]">·</span>
          <span className="hidden sm:inline text-[#94A3B8]">Nepal</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-right">
          <span className="hidden md:inline text-[#64748B]">EXPEDITION BRIEFING</span>
          <span className="hidden md:inline text-[#64748B]">·</span>
          <span className="text-[#E2DDD5]/90 font-semibold">27°59'17" N · 86°55'31" E</span>
        </div>
      </motion.div>

      {/* ── Centerpiece: Brand Emblem & Animated Mountain Peaks ── */}
      <div className="flex flex-col items-center justify-center my-auto relative z-10 py-6">
        {/* Animated Himalayan Ridge Silhouette */}
        <div className="w-64 sm:w-80 md:w-96 mb-6 relative">
          <svg
            viewBox="0 0 320 80"
            fill="none"
            className="w-full h-auto overflow-visible"
            aria-hidden="true"
          >
            {/* Soft background glow trace */}
            <motion.path
              d="M 10 70 L 60 42 L 95 55 L 140 22 L 175 44 L 210 12 L 255 48 L 285 36 L 310 70"
              stroke="#E85D2A"
              strokeWidth="1.2"
              strokeOpacity="0.3"
              fill="none"
            />

            {/* Glowing animated primary summit line */}
            <motion.path
              d="M 10 70 L 60 42 L 95 55 L 140 22 L 175 44 L 210 12 L 255 48 L 285 36 L 310 70"
              stroke="url(#mountainGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Everest Summit Beacon at peak 210, 12 */}
            <motion.circle
              cx="210"
              cy="12"
              r="3.5"
              fill="#E85D2A"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            />

            <defs>
              <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C6B59A" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#FAF8F5" stopOpacity="0.95" />
                <stop offset="68%" stopColor="#E85D2A" stopOpacity="1" />
                <stop offset="100%" stopColor="#C6B59A" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Logo Crest */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative mb-5"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center justify-center p-2.5 shadow-2xl relative group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#E85D2A]/20 to-transparent opacity-50" />
            <img
              src={logoImg}
              alt="EcoSummit Logo"
              className="w-full h-full object-contain filter brightness-110 drop-shadow-md"
            />
          </div>
        </motion.div>

        {/* Brand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF8F5] tracking-[0.22em] uppercase font-normal text-center"
        >
          EcoSummit
        </motion.h1>

        {/* Monospace Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center gap-3 mt-2 text-[#C6B59A] font-simplon-mono text-[10px] sm:text-xs tracking-[0.38em] uppercase"
        >
          <span>Expeditions</span>
          <span className="text-[#E85D2A]">·</span>
          <span>Nepal</span>
        </motion.div>
      </div>

      {/* ── Bottom Section: Altitude Counter, Progress Bar & Status ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="w-full max-w-xl mx-auto relative z-10"
      >
        {/* Metric Readouts: Altitude + Percentage */}
        <div className="flex items-end justify-between mb-3 font-simplon-mono">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-[#64748B] tracking-wider mb-0.5">
              Current Elevation
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#FAF8F5] tabular-nums tracking-wide">
              {altitude.toLocaleString()}
              <span className="text-[#E85D2A] text-xs font-normal ml-1">M</span>
            </span>
          </div>

          {/* Cycling Editorial Status */}
          <div className="hidden sm:block text-center max-w-[260px]">
            <motion.p
              key={statusIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-[#94A3B8] font-sans font-light italic truncate"
            >
              {statuses[statusIndex]}
            </motion.p>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase text-[#64748B] tracking-wider mb-0.5">
              System Ready
            </span>
            <span className="text-sm sm:text-base font-bold text-[#FAF8F5] tabular-nums tracking-widest">
              {progress.toString().padStart(2, '0')}
              <span className="text-[#E85D2A] text-xs font-normal ml-0.5">%</span>
            </span>
          </div>
        </div>

        {/* Fine Progress Track Bar */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C6B59A] via-[#E85D2A] to-[#FAF8F5] rounded-full relative"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          >
            {/* Glowing tip light */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#E85D2A] rounded-full blur-xs opacity-90" />
          </motion.div>
        </div>

        {/* Mobile status caption */}
        <div className="sm:hidden text-center mt-3">
          <p className="text-[11px] text-[#94A3B8] font-sans font-light italic">
            {statuses[statusIndex]}
          </p>
        </div>

        {/* Subtle Skip Hint (only appears after a moment) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 30 ? 0.6 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-4"
        >
          <button
            type="button"
            onClick={onComplete}
            className="text-[10px] font-simplon-mono text-[#64748B] hover:text-[#FAF8F5] transition-colors tracking-widest uppercase cursor-pointer"
          >
            Tap to enter ↵
          </button>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
};
