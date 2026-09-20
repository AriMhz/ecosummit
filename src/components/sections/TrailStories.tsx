import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Mountain,
  ArrowRight,
} from 'lucide-react';

// Small thumbnail kept only for the Lokta paper card (decorative texture use)
import card4BotPaper from '../../assets/gallery/card4_bot_paper.png';

// High-resolution source assets for fullscreen interactive lightbox
import stupaHighRes from '../../assets/14ea9714-56e5-46fd-a5ad-ed27307c24a9.png';
import wwaHighRes from '../../assets/wwa.png';
import valleyHighRes from '../../assets/1s.jpg';
import lakeHighRes from '../../assets/lake.png';
import ktHighRes from '../../assets/kt.jpg';
import mapFlatlayHighRes from '../../assets/map_flatlay.jpg';

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  tag: string;
  subtitle: string;
  elevation: string;
  cardImage: string;
  lightboxImage: string;
  caption: string;
  photographer: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'langtang-stupa',
    title: 'Sacred Stupa & Himalayan Ramparts',
    location: 'Langtang Valley Trail',
    tag: 'Langtang Trail',
    subtitle: 'Sacred Mountain Path',
    elevation: '3,870m Trail',
    // Use high-res image for crisp rendering on all screen sizes
    cardImage: stupaHighRes,
    lightboxImage: stupaHighRes,
    caption:
      'Ancient stone chorten and colorful Tibetan prayer flags perched along the rocky mountain path below glaciated summits.',
    photographer: 'Mingma Dorje · Alpine Specialist',
  },
  {
    id: 'alpine-peak',
    title: 'Jagged Alpine Pyramid & Glacial Moraine',
    location: 'High Himalayan Summit Route',
    tag: 'Summit Ridge',
    subtitle: 'Alpine Moraine',
    elevation: '5,160m Summit',
    cardImage: wwaHighRes,
    lightboxImage: wwaHighRes,
    caption:
      'Crisp morning sunlight illuminating the sheer ice gullies and windswept snow ridges above the subalpine scrub.',
    photographer: 'Pasang Sherpa · Lead Guide',
  },
  {
    id: 'subalpine-valley',
    title: 'Subalpine Pine Valley & Glacial River',
    location: 'Manang Glacial Basin',
    tag: 'Manang Basin',
    subtitle: 'River Valley',
    elevation: '3,540m Basin',
    cardImage: valleyHighRes,
    lightboxImage: valleyHighRes,
    caption:
      'Lush evergreen pines framing the wide river floodplain with towering snowfields rising on the horizon.',
    photographer: 'Rabin Gurung · Field Leader',
  },
  {
    id: 'sunset-sanctuary',
    title: 'Tranquil Sunset Reflections & Pine Sanctuary',
    location: 'Begnas & Phewa Lake Sanctuary',
    tag: 'Lake Sanctuary',
    subtitle: 'Tranquil Sunset',
    elevation: '822m Basin',
    cardImage: lakeHighRes,
    lightboxImage: lakeHighRes,
    caption:
      'Warm peach sunset light painting the quiet river waters as dusk settles over forested valley ramparts.',
    photographer: 'Dawa Lama · High Altitude Naturalist',
  },
  {
    id: 'suspension-crossing',
    title: 'Himalayan Suspension Crossing',
    location: 'Historic Mountain Settlement',
    tag: 'Heritage Trail',
    subtitle: 'Living Heritage',
    elevation: '2,840M',
    cardImage: ktHighRes,
    lightboxImage: ktHighRes,
    caption:
      'A traveler journeying through narrow heritage corridors connecting ancient trade routes across the hills.',
    photographer: 'Pemba Tamang · Cultural Historian',
  },
  {
    id: 'lokta-paper',
    title: 'Handcrafted Nepalese Lokta Parchment',
    location: 'Patan Heritage Artisan Guild',
    tag: 'Artisan Craft',
    subtitle: 'Handmade Paper',
    elevation: '1,400m Valley',
    cardImage: card4BotPaper,
    lightboxImage: card4BotPaper,
    caption:
      'Traditional sun-dried Daphne bark paper, crafted using centuries-old Himalayan papermaking techniques.',
    photographer: 'Sunil Shakya · Heritage Guild',
  },
  {
    id: 'expedition-survey',
    title: "Cartographer's Expedition Survey Flatlay",
    location: 'Basecamp Planning & Survey Desk',
    tag: 'Expedition Survey',
    subtitle: 'Field Cartography',
    elevation: 'Expedition Base',
    cardImage: mapFlatlayHighRes,
    lightboxImage: mapFlatlayHighRes,
    caption:
      'Hand-annotated topographic survey maps, field compass, and expedition optics ready for the trek ahead.',
    photographer: 'Eco Treks Expedition Archive',
  },
];

export const TrailStories: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const activePhoto =
    activePhotoIndex !== null ? GALLERY_ITEMS[activePhotoIndex] : null;

  const handlePrev = useCallback(() => {
    setActivePhotoIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1;
    });
  }, []);

  const handleNext = useCallback(() => {
    setActivePhotoIndex((prev) => {
      if (prev === null) return null;
      return prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1;
    });
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handlePrev, handleNext]);

  return (
    <section
      className="relative w-full bg-[#FAF8F5] text-[#17201D] py-16 sm:py-20 lg:py-24 overflow-hidden select-none"
      id="recent-gallery"
    >
      {/* ── Topographic Elevation Contour Lines Background (Top-Right & Bottom-Left) ── */}
      <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-40 select-none overflow-hidden">
        <svg viewBox="0 0 300 300" fill="none" stroke="#D8D2C6" strokeWidth="1" className="w-full h-full">
          <path d="M50 0 C 120 70, 200 40, 300 100" />
          <path d="M90 0 C 160 90, 240 60, 300 130" />
          <path d="M130 0 C 200 110, 280 80, 300 160" />
          <path d="M170 0 C 240 130, 300 110, 300 190" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-40 select-none overflow-hidden">
        <svg viewBox="0 0 300 300" fill="none" stroke="#D8D2C6" strokeWidth="1" className="w-full h-full">
          <path d="M0 150 C 80 180, 150 110, 250 200" />
          <path d="M0 190 C 100 210, 170 140, 280 240" />
          <path d="M0 230 C 120 240, 190 170, 300 270" />
        </svg>
      </div>

      {/* ── Section Header with Framed Sketches ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        {/* Top-Left Mountain Sketch & Handwritten Script */}
        <div className="absolute left-4 sm:left-6 lg:left-8 top-0 pointer-events-none select-none hidden lg:block">
          <svg width="145" height="65" viewBox="0 0 150 70" fill="none" stroke="#A8B2BD" strokeWidth="1.2">
            <path d="M10 65 L 50 20 L 75 42 L 115 12 L 145 65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M50 20 L 60 36 L 75 42" strokeLinecap="round" />
            <path d="M115 12 L 102 34 L 88 38" strokeLinecap="round" />
            <path d="M115 12 L 122 30 L 136 55" strokeLinecap="round" />
            <path d="M25 42 L 38 50 L 50 65" strokeLinecap="round" />
          </svg>
          <span className="font-['Caveat'] text-xl sm:text-2xl text-[#6B7D8F] block -rotate-6 -mt-2 ml-3 font-semibold whitespace-nowrap">
            Same Country, <br />
            A Thousand Stories
          </span>
        </div>

        {/* Top-Right Compass Rose Sketch */}
        <div className="absolute right-4 sm:right-6 lg:right-8 top-1 pointer-events-none select-none hidden lg:block">
          <svg width="38" height="62" viewBox="0 0 40 65" fill="none" stroke="#A8B2BD" strokeWidth="1.2">
            <text x="20" y="12" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#64748B" fontWeight="600">
              N
            </text>
            <path d="M20 16 L 20 60" strokeLinecap="round" />
            <path d="M9 38 L 31 38" strokeLinecap="round" />
            <polygon points="20,18 17,38 20,34" fill="#64748B" />
            <polygon points="20,18 23,38 20,34" fill="#A8B2BD" />
            <polygon points="20,60 17,38 20,42" fill="#CBD5E1" />
            <polygon points="20,60 23,38 20,42" fill="#E2E8F0" />
          </svg>
        </div>

        {/* Centered Editorial Header */}
        <div className="max-w-xl mx-auto text-center px-4">
          {/* Eyebrow with horizontal dash lines */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-3 text-xs font-simplon-mono uppercase tracking-[0.26em] font-semibold text-[#5A6978]"
          >
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#5A6978]/40" />
            <span>VISUAL CHRONICLES &middot; NEPAL</span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#5A6978]/40" />
          </motion.div>

          {/* Main Title: Recent Gallery */}
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-[#142938] font-normal leading-tight tracking-tight mb-3"
          >
            Recent Gallery
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-xs sm:text-sm text-[#596573] max-w-md mx-auto leading-relaxed font-light"
          >
            Moments from mountains, culture, and unforgettable journeys across Nepal.
          </motion.p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. THE 5-COLUMN GALLERY (Matching Reference Image Layout)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex lg:grid lg:grid-cols-[1fr_1.1fr_1.4fr_1.1fr_1fr] items-center justify-start lg:justify-center gap-3.5 sm:gap-4 lg:gap-4.5 xl:gap-5 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 scrollbar-none snap-x">
          
          {/* ── COLUMN 1: Far Left (Tall Card) ── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            onClick={() => setActivePhotoIndex(0)}
            className="group relative min-w-[220px] sm:min-w-[240px] lg:min-w-0 w-full h-[380px] sm:h-[410px] lg:h-[410px] xl:h-[430px] rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer select-none bg-[#EAE6DE] shadow-[0_10px_28px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)] hover:scale-[1.025] transition-all duration-300 flex-shrink-0 snap-center"
          >
            <img
              src={stupaHighRes}
              alt="Sacred Stupa & Himalayan Ramparts"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Soft hover gradient & badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-[10px] font-simplon-mono uppercase tracking-wider text-[#E5A93C] font-semibold block mb-0.5">
                3,870M · Langtang Trail
              </span>
              <h4 className="font-serif text-[15px] font-medium text-white line-clamp-1">
                Sacred Stupa & Ramparts
              </h4>
            </div>
          </motion.div>

          {/* ── COLUMN 2: Mid Left (2 Stacked Cards) ── */}
          <div className="flex flex-col min-w-[220px] sm:min-w-[240px] lg:min-w-0 w-full h-[430px] sm:h-[470px] lg:h-[470px] xl:h-[490px] justify-between gap-3.5 sm:gap-4 flex-shrink-0 snap-center">
            {/* Top: Mountain Peak */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              onClick={() => setActivePhotoIndex(1)}
              className="group relative w-full h-[202px] sm:h-[222px] lg:h-[223px] xl:h-[233px] rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer select-none bg-[#EAE6DE] shadow-[0_10px_28px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)] hover:scale-[1.025] transition-all duration-300"
            >
              <img
                src={wwaHighRes}
                alt="Jagged Alpine Pyramid"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-[9.5px] font-simplon-mono uppercase tracking-wider text-[#E5A93C] font-semibold block mb-0.5">
                  5,160M · Summit Ridge
                </span>
                <h4 className="font-serif text-[14px] font-medium text-white line-clamp-1">
                  Jagged Alpine Pyramid
                </h4>
              </div>
            </motion.div>

            {/* Bottom: Forest Valley */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12 }}
              onClick={() => setActivePhotoIndex(2)}
              className="group relative w-full h-[202px] sm:h-[222px] lg:h-[223px] xl:h-[233px] rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer select-none bg-[#EAE6DE] shadow-[0_10px_28px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)] hover:scale-[1.025] transition-all duration-300"
            >
              <img
                src={valleyHighRes}
                alt="Subalpine Pine Valley"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-[9.5px] font-simplon-mono uppercase tracking-wider text-[#E5A93C] font-semibold block mb-0.5">
                  3,540M · Manang Basin
                </span>
                <h4 className="font-serif text-[14px] font-medium text-white line-clamp-1">
                  Subalpine Pine Valley
                </h4>
              </div>
            </motion.div>
          </div>

          {/* ── COLUMN 3: Center Hero (Extra-Tall Prominent Card) ── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.16 }}
            onClick={() => setActivePhotoIndex(3)}
            className="group relative min-w-[260px] sm:min-w-[290px] lg:min-w-0 w-full h-[490px] sm:h-[530px] lg:h-[540px] xl:h-[570px] rounded-2xl lg:rounded-[32px] overflow-hidden cursor-pointer select-none bg-[#1A1816] shadow-[0_22px_55px_rgba(0,0,0,0.18)] hover:shadow-[0_28px_65px_rgba(0,0,0,0.26)] hover:scale-[1.02] transition-all duration-400 z-10 ring-1 ring-black/5 flex-shrink-0 snap-center"
          >
            <img
              src={lakeHighRes}
              alt="Tranquil Sunset Reflections"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle permanent soft gradient at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/90" />
            
            {/* Center Floating Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white font-simplon-mono text-[10.5px]">
                <MapPin className="w-3 h-3 text-[#E5A93C]" />
                <span>Sanctuary Waters</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white font-simplon-mono text-[10.5px]">
                <Mountain className="w-3 h-3 text-[#E5A93C]" />
                <span>822M Basin</span>
              </div>
            </div>

            {/* Center Bottom Narrative */}
            <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 pointer-events-none">
              <span className="text-[10px] font-simplon-mono uppercase tracking-[0.2em] text-[#E5A93C] font-bold block mb-1">
                PHEWA & BEGNAS BASIN
              </span>
              <h3 className="font-serif text-lg sm:text-2xl lg:text-[23px] text-white font-normal leading-snug group-hover:text-[#F6AD55] transition-colors mb-1.5">
                Tranquil Sunset Reflections & Pine Sanctuary
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-white/80 font-light line-clamp-2 leading-relaxed hidden sm:block">
                Warm peach sunset light painting the quiet river waters as dusk settles over forested valley ramparts.
              </p>
            </div>
          </motion.div>

          {/* ── COLUMN 4: Mid Right (2 Stacked Cards) ── */}
          <div className="flex flex-col min-w-[220px] sm:min-w-[240px] lg:min-w-0 w-full h-[430px] sm:h-[470px] lg:h-[470px] xl:h-[490px] justify-between gap-3.5 sm:gap-4 flex-shrink-0 snap-center">
            {/* Top: Heritage Alley with EXACT overlay text from reference image */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              onClick={() => setActivePhotoIndex(4)}
              className="group relative w-full h-[202px] sm:h-[222px] lg:h-[223px] xl:h-[233px] rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer select-none bg-[#EAE6DE] shadow-[0_10px_28px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)] hover:scale-[1.025] transition-all duration-300"
            >
              <img
                src={ktHighRes}
                alt="Himalayan Suspension Crossing"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </motion.div>

            {/* Bottom: White Textured Lokta Paper Card */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.24 }}
              onClick={() => setActivePhotoIndex(5)}
              className="group relative w-full h-[202px] sm:h-[222px] lg:h-[223px] xl:h-[233px] rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer select-none bg-[#F7F5F0] border border-[#E6E0D5] shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)] hover:scale-[1.025] transition-all duration-300 flex items-center justify-center p-2.5"
            >
              <img
                src={card4BotPaper}
                alt="Handcrafted Nepalese Lokta Parchment"
                loading="lazy"
                className="w-full h-full object-cover rounded-xl opacity-95 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                <span className="w-8 h-[1px] bg-[#C4B9AA] mb-2 opacity-50 group-hover:opacity-90 transition-opacity" />
                <span className="font-['Caveat'] text-lg sm:text-xl text-[#786D60] font-semibold -rotate-2">
                  Handmade Lokta
                </span>
                <span className="text-[8.5px] font-simplon-mono uppercase tracking-[0.24em] text-[#9A8F82] mt-0.5">
                  NEPALESE PARCHMENT
                </span>
                <span className="w-8 h-[1px] bg-[#C4B9AA] mt-2 opacity-50 group-hover:opacity-90 transition-opacity" />
              </div>
            </motion.div>
          </div>

          {/* ── COLUMN 5: Far Right (Tall Card) ── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.28 }}
            onClick={() => setActivePhotoIndex(6)}
            className="group relative min-w-[220px] sm:min-w-[240px] lg:min-w-0 w-full h-[380px] sm:h-[410px] lg:h-[410px] xl:h-[430px] rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer select-none bg-[#EAE6DE] shadow-[0_10px_28px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)] hover:scale-[1.025] transition-all duration-300 flex-shrink-0 snap-center"
          >
            <img
              src={mapFlatlayHighRes}
              alt="Cartographer's Expedition Survey Flatlay"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-[10px] font-simplon-mono uppercase tracking-wider text-[#E5A93C] font-semibold block mb-0.5">
                Field Survey · Basecamp
              </span>
              <h4 className="font-serif text-[15px] font-medium text-white line-clamp-1">
                Cartographer's Survey Flatlay
              </h4>
            </div>
          </motion.div>

        </div>

        {/* ── Bottom Section: Centered "View Full Gallery" Pill Button & Accents ── */}
        <div className="relative mt-12 sm:mt-16 flex items-center justify-center">
          {/* Left divider line with dot */}
          <div className="hidden sm:flex items-center gap-2 flex-1 justify-end max-w-[200px] pr-4">
            <span className="w-full h-[1px] bg-[#D4A373]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
          </div>

          {/* Centered Pill Button */}
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white/90 hover:bg-[#142938] hover:text-white text-[#142938] text-xs font-simplon-mono uppercase tracking-[0.16em] font-bold rounded-full border border-[#D4A373]/60 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(20,41,56,0.18)] transition-all duration-300 group"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 text-current transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Right divider line with dot */}
          <div className="hidden sm:flex items-center gap-2 flex-1 justify-start max-w-[200px] pl-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
            <span className="w-full h-[1px] bg-[#D4A373]/40" />
          </div>

          {/* Bottom-Right Mountain Sketch & Tagline */}
          <div className="absolute right-0 bottom-0 pointer-events-none select-none hidden lg:flex flex-col items-center">
            <svg width="100" height="42" viewBox="0 0 100 42" fill="none" stroke="#A8B2BD" strokeWidth="1.2">
              <path d="M5 38 L 35 10 L 52 24 L 78 6 L 95 38" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M35 10 L 42 20 L 52 24" strokeLinecap="round" />
              <path d="M78 6 L 70 18 L 62 22" strokeLinecap="round" />
            </svg>
            <span className="font-simplon-mono text-[9px] uppercase tracking-[0.2em] text-[#64748B] font-semibold mt-1">
              NEPAL
            </span>
            <span className="font-simplon-mono text-[8px] uppercase tracking-[0.18em] text-[#8C9AA8]">
              THE HIMALAYAS AWAIT
            </span>
            <span className="w-6 h-[1.5px] bg-[#D4A373] mt-1" />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. FULLSCREEN INTERACTIVE PHOTO LIGHTBOX
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Top Bar: Frame Counter & Close */}
            <div className="absolute top-5 left-6 right-6 z-30 flex items-center justify-between text-white/70 select-none">
              <span className="font-simplon-mono text-xs uppercase tracking-widest text-[#E5A93C]">
                Photo {String((activePhotoIndex ?? 0) + 1).padStart(2, '0')} /{' '}
                {String(GALLERY_ITEMS.length).padStart(2, '0')}
              </span>

              <button
                onClick={() => setActivePhotoIndex(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Chevrons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-105 cursor-pointer"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-105 cursor-pointer"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Body Container */}
            <motion.div
              key={activePhoto.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl max-h-[92vh] flex flex-col items-center select-none my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Primary Image */}
              <div className="relative max-h-[64vh] overflow-hidden rounded-2xl shadow-2xl bg-black border border-white/10">
                <img
                  src={activePhoto.lightboxImage || activePhoto.cardImage}
                  alt={activePhoto.title}
                  className="max-w-full max-h-[64vh] object-contain"
                />
              </div>

              {/* Caption & Location */}
              <div className="mt-4 text-center text-white max-w-xl px-4 space-y-1.5">
                <div className="flex items-center justify-center gap-2 text-xs font-simplon-mono text-[#E5A93C] uppercase tracking-wider">
                  <Mountain className="w-3.5 h-3.5" />
                  <span>{activePhoto.location}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  {activePhoto.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {activePhoto.caption}
                </p>

                <div className="pt-1 text-[11px] text-white/50 font-simplon-mono">
                  Captured by {activePhoto.photographer} · Elevation {activePhoto.elevation}
                </div>
              </div>

              {/* Filmstrip Thumbnails */}
              <div className="mt-4 flex items-center justify-center gap-2 overflow-x-auto max-w-md px-2 pb-1 scrollbar-none select-none">
                {GALLERY_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-12 sm:w-14 h-9 sm:h-10 rounded-md overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activePhotoIndex === idx
                        ? 'border-[#E5A93C] scale-105 opacity-100 shadow-md'
                        : 'border-white/20 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={item.cardImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
