import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  CheckCircle2,
  ArrowRight,
  X,
  Calendar,
} from 'lucide-react';
import { reviewsData } from '../../data/reviews';
import type { Review } from '../../types';
import mountainVectorBg from '../../assets/mountain_vector_bg.png';

// Separate reviews into Google and TripAdvisor
const googleReviews = reviewsData.filter((r) => r.platform === 'google');
const tripadvisorReviews = reviewsData.filter((r) => r.platform === 'tripadvisor');

export const Testimonials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'google' | 'tripadvisor'>('google');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedModalReview, setSelectedModalReview] = useState<Review | null>(null);

  // Responsive visible cards count: 3 on desktop for spacious, large luxury cards
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1180) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentReviews = activeTab === 'google' ? googleReviews : tripadvisorReviews;
  const maxIndex = Math.max(0, currentReviews.length - cardsPerPage);

  // Reset index when tab switches
  const handleTabChange = (tab: 'google' | 'tripadvisor') => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  // Auto-play timer (5s) with pause on hover
  useEffect(() => {
    if (isHovered || selectedModalReview) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isHovered, maxIndex, selectedModalReview]);

  return (
    <section
      className="relative pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 bg-[#FAF8F5] text-[#17201D] overflow-hidden border-t border-[#E8E2D8]/80 scroll-mt-20"
      id="testimonials"
    >
      {/* ── 1. Panoramic Mountain Vector Artwork Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src={mountainVectorBg}
          alt="Himalayan Mountain Vector Panorama"
          className="w-full h-full object-cover object-bottom opacity-70 filter saturate-110"
        />
        {/* Atmospheric top and bottom parchment blend */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent" />
        <div className="absolute inset-0 bg-radial-[ellipse_at_50%_50%] from-[#FAF8F5]/25 via-transparent to-[#FAF8F5]/45" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/90 to-[#FAF8F5]" />
      </div>

      {/* ── 2. Topographic Accent Curves ── */}
      <div className="absolute top-4 right-6 w-96 h-96 pointer-events-none opacity-20 select-none overflow-hidden z-0">
        <svg viewBox="0 0 350 350" fill="none" stroke="#CBA46E" strokeWidth="1" className="w-full h-full">
          <path d="M 50 0 C 130 90, 220 50, 350 120" />
          <path d="M 90 0 C 170 110, 260 70, 350 160" />
          <path d="M 130 0 C 210 130, 300 90, 350 200" />
          <path d="M 180 0 C 260 160, 330 130, 350 250" />
        </svg>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-7 h-[2px] bg-[#E85D2A] rounded-full" />
            <span className="font-simplon-mono text-xs uppercase tracking-[0.25em] font-bold text-[#183E63]">
              GROUNDED FEEDBACK
            </span>
            <span className="w-7 h-[2px] bg-[#E85D2A] rounded-full" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] text-[#102942] font-normal leading-tight tracking-tight">
            Traveller Perspectives
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#59615D] font-normal leading-relaxed mt-1.5">
            Independent ratings & field logs from verified Himalayan expeditions worldwide
          </p>

          {/* ── Interactive Luxury Platform Tabs Switcher (Responsive on Mobile) ── */}
          <div className="inline-flex items-center p-1 sm:p-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[#E8E2D8] shadow-[0_6px_20px_rgba(16,41,66,0.06)] mt-4 sm:mt-5 gap-1 sm:gap-2 max-w-full overflow-x-auto no-scrollbar">
            {/* Google Reviews Tab */}
            <button
              onClick={() => handleTabChange('google')}
              className={`flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'google'
                  ? 'bg-[#102942] text-white shadow-md'
                  : 'text-[#4A5568] hover:text-[#102942] hover:bg-[#FAF8F5]'
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.49 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google Reviews</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-mono whitespace-nowrap inline-block ${
                  activeTab === 'google'
                    ? 'bg-[#DEC096] text-[#102942] font-bold'
                    : 'bg-[#FAF8F5] text-[#7A8380]'
                }`}
              >
                4.9 ★ · 194
              </span>
            </button>

            {/* TripAdvisor Reviews Tab */}
            <button
              onClick={() => handleTabChange('tripadvisor')}
              className={`flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'tripadvisor'
                  ? 'bg-[#00AA6C] text-white shadow-md'
                  : 'text-[#4A5568] hover:text-[#00AA6C] hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="w-4.5 h-4.5 rounded-full bg-[#00AA6C] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.55.06-1.09.17-1.61 1.47 1.05 3.32 1.61 5.33 1.61 1.77 0 3.42-.44 4.87-1.22 1.45.78 3.1 1.22 4.87 1.22 2.01 0 3.86-.56 5.33-1.61.11.52.17 1.06.17 1.61 0 4.41-3.59 8-8 8zm-4.5-9c-1.38 0-2.5-1.12-2.5-2.5S6.12 6 7.5 6s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm9 0c-1.38 0-2.5-1.12-2.5-2.5S15.12 6 16.5 6s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <span>Tripadvisor</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-mono whitespace-nowrap inline-block ${
                  activeTab === 'tripadvisor'
                    ? 'bg-white text-[#00AA6C] font-bold'
                    : 'bg-[#FAF8F5] text-[#7A8380]'
                }`}
              >
                5.0 🟢 · 286
              </span>
            </button>
          </div>
        </div>

        {/* ── Active Platform Carousel Track ── */}
        <div
          className="relative max-w-[1440px] mx-auto px-2 sm:px-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Floating Arrow Button (Desktop Only - Avoids covering mobile cards) */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))}
            className="hidden md:flex absolute md:-left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white/95 backdrop-blur-md border border-[#E8E2D8] shadow-[0_8px_24px_rgba(16,41,66,0.12)] items-center justify-center text-[#102942] hover:bg-[#102942] hover:text-white transition-all active:scale-95 cursor-pointer"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Floating Arrow Button (Desktop Only - Avoids covering mobile cards) */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))}
            className="hidden md:flex absolute md:-right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white/95 backdrop-blur-md border border-[#E8E2D8] shadow-[0_8px_24px_rgba(16,41,66,0.12)] items-center justify-center text-[#102942] hover:bg-[#102942] hover:text-white transition-all active:scale-95 cursor-pointer"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* 3 Spacious Cards Track */}
          <div className="overflow-hidden py-3 px-1">
            <motion.div
              className="flex gap-5 sm:gap-6"
              animate={{
                x: `calc(-${currentIndex * (100 / cardsPerPage)}% - ${currentIndex * 24 / cardsPerPage}px)`,
              }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 26,
              }}
            >
              {currentReviews.map((rev) => (
                <div
                  key={rev.id}
                  className={`w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E8E2D8] p-5 sm:p-6 flex flex-col justify-between shadow-[0_8px_24px_rgba(16,41,66,0.06)] hover:shadow-[0_18px_40px_rgba(16,41,66,0.12)] transition-all duration-300 relative group min-h-[225px] ${
                    activeTab === 'google'
                      ? 'hover:border-[#4285F4]/50'
                      : 'hover:border-[#00AA6C]/50'
                  }`}
                >
                  {/* Top Platform Badge Icon */}
                  <div className="absolute top-6 right-6">
                    {activeTab === 'google' ? (
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.49 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    ) : (
                      <span className="w-3 h-3 rounded-full bg-[#00AA6C] block ring-4 ring-[#00AA6C]/15" />
                    )}
                  </div>

                  <div>
                    {/* Author Row */}
                    <div className="flex items-center gap-3.5 mb-3.5 pr-8">
                      <div
                        className="w-11 h-11 rounded-full text-white flex items-center justify-center font-serif text-base font-semibold shrink-0 shadow-xs"
                        style={{
                          backgroundColor:
                            rev.avatarColor || (activeTab === 'google' ? '#4285F4' : '#00AA6C'),
                        }}
                      >
                        {rev.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-[15px] sm:text-base text-[#102942] leading-tight">
                            {rev.name}
                          </h4>
                          <CheckCircle2 className="w-4 h-4 text-[#1877F2] shrink-0 fill-[#1877F2]/10" />
                        </div>
                        <span className="text-xs text-[#7A8380] block mt-0.5">
                          {rev.timeAgo} · {rev.country}
                        </span>
                      </div>
                    </div>

                    {/* Rating Icons */}
                    <div className="flex items-center gap-1 mb-3">
                      {activeTab === 'google' ? (
                        [...Array(5)].map((_, i) => (
                          <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5 text-[#FBBC05]">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))
                      ) : (
                        [...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className="w-4.5 h-4.5 rounded-full bg-[#00AA6C] flex items-center justify-center shadow-2xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          </span>
                        ))
                      )}
                    </div>

                    {/* Full Legible Review Content */}
                    <p className="font-sans text-[14.5px] sm:text-[15px] text-[#2D3748] leading-relaxed line-clamp-3 sm:line-clamp-4 font-normal">
                      "{rev.content}"
                    </p>
                  </div>

                  {/* Card Bottom Row: Read More + Full Expedition Route */}
                  <div className="pt-3.5 mt-3.5 border-t border-[#F0ECE6] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedModalReview(rev)}
                      className={`text-xs sm:text-sm font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1 ${
                        activeTab === 'google'
                          ? 'text-[#183E63] hover:text-[#4285F4]'
                          : 'text-[#183E63] hover:text-[#00AA6C]'
                      }`}
                    >
                      <span>Read story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs text-[#59615D] bg-[#FAF8F5] px-2.5 sm:px-3 py-1 rounded-full border border-[#E8E2D8] font-medium truncate max-w-[170px] sm:max-w-[240px]">
                      {rev.journey.split('(')[0].trim()}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Controls (Centered Dots + Mobile Arrow Controls) */}
          <div className="flex items-center justify-center gap-3.5 mt-6">
            {/* Mobile Previous Button */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))}
              className="md:hidden w-9 h-9 rounded-full bg-white border border-[#E8E2D8] shadow-xs flex items-center justify-center text-[#102942] hover:bg-[#102942] hover:text-white transition-all active:scale-95 cursor-pointer shrink-0"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === i
                      ? `w-7 ${activeTab === 'google' ? 'bg-[#102942]' : 'bg-[#00AA6C]'}`
                      : 'w-2 bg-[#D0C8B8] hover:bg-[#A09888]'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Mobile Next Button */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))}
              className="md:hidden w-9 h-9 rounded-full bg-white border border-[#E8E2D8] shadow-xs flex items-center justify-center text-[#102942] hover:bg-[#102942] hover:text-white transition-all active:scale-95 cursor-pointer shrink-0"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Bottom Callout Link ── */}
        <div className="text-center mt-6 sm:mt-7">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white border border-[#E8E2D8] hover:border-[#102942] text-xs font-simplon-mono uppercase tracking-[0.15em] font-bold text-[#102942] hover:bg-[#102942] hover:text-[#DEC096] transition-all shadow-xs"
          >
            <span>Explore All 480+ Verified Travel Letters & Logs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Full Review Modal ── */}
      <AnimatePresence>
        {selectedModalReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E2D8] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedModalReview(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#102942] hover:bg-[#102942] hover:text-white transition-colors cursor-pointer"
                aria-label="Close review"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Reviewer Header */}
              <div className="flex items-center gap-3.5 mb-4 pr-8">
                <div
                  className="w-11 h-11 rounded-full text-white flex items-center justify-center font-serif text-sm font-semibold shadow-xs shrink-0"
                  style={{ backgroundColor: selectedModalReview.avatarColor || '#183E63' }}
                >
                  {selectedModalReview.name.charAt(0)}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif text-base text-[#102942] font-semibold">
                      {selectedModalReview.name}
                    </h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1877F2]" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#59615D] mt-0.5">
                    <Globe className="w-3.5 h-3.5 text-[#183E63]" />
                    <span>{selectedModalReview.country}</span>
                    <span>•</span>
                    <span className="font-medium text-[#2E7D32]">{selectedModalReview.source}</span>
                  </div>
                </div>
              </div>

              {/* Journey Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF8F5] border border-[#E8E2D8] rounded-full text-xs font-medium text-[#102942] mb-4">
                <Calendar className="w-3.5 h-3.5 text-[#E85D2A]" />
                <span>{selectedModalReview.journey}</span>
                <span>•</span>
                <span className="text-[#7A8380]">{selectedModalReview.seasonYear}</span>
              </div>

              {/* Title & Body */}
              {selectedModalReview.title && (
                <h4 className="font-serif font-bold text-base text-[#102942] mb-2">
                  "{selectedModalReview.title}"
                </h4>
              )}

              <p className="font-sans text-xs sm:text-sm text-[#2D3748] leading-relaxed mb-6 font-normal">
                "{selectedModalReview.content}"
              </p>

              <button
                onClick={() => setSelectedModalReview(null)}
                className="w-full py-2.5 rounded-full bg-[#102942] hover:bg-[#183E63] text-white text-xs font-simplon-mono uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer"
              >
                Close Story
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
