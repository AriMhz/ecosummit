import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Compass,
  Sparkles,
  Leaf,
  Wind,
} from 'lucide-react';

import everestImg from '../../assets/everest.png';
import ktImg from '../../assets/kt.jpg';
import pokharaImg from '../../assets/1s.jpg';
import chitwanImg from '../../assets/chitwan.png';
import skyeImg from '../../assets/skye.png';

interface DestinationCardItem {
  id: string;
  slug: string;
  badge: {
    text: string;
    icon?: React.ReactNode;
  };
  location: string;
  title: string;
  eyebrow: string;
  description: string;
  experienceCount: string;
  image: string;
  imagePosition?: string;
  link: string;
}

const destinationCards: DestinationCardItem[] = [
  {
    id: 'everest',
    slug: 'everest-khumbu',
    badge: {
      text: 'POPULAR',
    },
    location: 'Solukhumbu',
    title: 'Everest Region',
    eyebrow: 'THE LAND OF GIANTS',
    description: 'Stand at the foot of the world’s highest peak and experience the adventure of a lifetime.',
    experienceCount: '5+ Experiences',
    image: everestImg,
    imagePosition: 'object-[11%_center]',
    link: '/destinations/everest-khumbu',
  },
  {
    id: 'kathmandu',
    slug: 'kathmandu-valley',
    badge: {
      text: 'CULTURE',
      icon: <Compass className="w-3 h-3" />,
    },
    location: 'Kathmandu',
    title: 'Kathmandu Valley',
    eyebrow: 'TIMELESS HERITAGE',
    description: 'Explore ancient temples, royal palaces and vibrant local life in Nepal’s cultural heart.',
    experienceCount: '7+ Experiences',
    image: ktImg,
    imagePosition: 'object-[66%_center]',
    link: '/destinations/kathmandu-valley',
  },
  {
    id: 'pokhara',
    slug: 'pokhara-valley',
    badge: {
      text: 'NATURE',
      icon: <Leaf className="w-3 h-3" />,
    },
    location: 'Pokhara',
    title: 'Pokhara',
    eyebrow: 'NATURE’S PLAYGROUND',
    description: 'Relax by peaceful lakes, hike scenic trails and enjoy stunning mountain views.',
    experienceCount: '6+ Experiences',
    image: pokharaImg,
    imagePosition: 'object-[46%_center]',
    link: '/destinations/pokhara-valley',
  },
  {
    id: 'chitwan',
    slug: 'chitwan-national-park',
    badge: {
      text: 'WILDLIFE',
      icon: <Sparkles className="w-3 h-3" />,
    },
    location: 'Chitwan',
    title: 'Chitwan National Park',
    eyebrow: 'WILDLIFE & ADVENTURE',
    description: 'Discover rare wildlife, jungle safaris and authentic Tharu culture.',
    experienceCount: '5+ Experiences',
    image: chitwanImg,
    imagePosition: 'object-[12%_center]',
    link: '/destinations/chitwan-national-park',
  },
  {
    id: 'adventure',
    slug: 'pokhara-valley',
    badge: {
      text: 'ADVENTURE',
      icon: <Wind className="w-3 h-3" />,
    },
    location: 'Pokhara',
    title: 'Adventure Sports',
    eyebrow: 'THRILLS IN NATURE',
    description: 'Try paragliding, white-water rafting, bungee jumping and more.',
    experienceCount: '4+ Experiences',
    image: skyeImg,
    imagePosition: 'object-[40%_center]',
    link: '/treks',
  },
];

export const DestinationExperience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse Drag-to-Slide states
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isMouseDownRef.current = true;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStartRef.current = scrollRef.current.scrollLeft;
    hasDraggedRef.current = false;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUp = () => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    setIsDragging(false);
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  const handleMouseLeave = () => {
    if (isMouseDownRef.current) {
      isMouseDownRef.current = false;
      setIsDragging(false);
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 60);
    }
  };

  return (
    <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-16 lg:pb-20 bg-[#FAF8F5] overflow-hidden text-[#17201D] border-t border-[#EAE5DC]/60">
      {/* ── Topographic Contour Lines Decoration (Bottom-Left) ───── */}
      <svg
        className="absolute -bottom-16 -left-16 w-80 sm:w-96 lg:w-[480px] h-80 sm:h-96 lg:h-[480px] text-[#E2DDD5]/50 pointer-events-none z-[1]"
        viewBox="0 0 400 400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <path d="M 30,220 C 50,160 110,130 190,130 C 270,130 330,170 340,230 C 350,290 280,340 200,350 C 120,360 20,270 30,220 Z" />
        <path d="M 60,220 C 75,175 130,150 190,150 C 250,150 300,180 310,225 C 320,270 260,315 200,320 C 140,325 50,250 60,220 Z" />
        <path d="M 90,220 C 105,185 150,170 190,170 C 230,170 270,190 280,220 C 290,250 240,290 200,295 C 160,300 80,240 90,220 Z" />
      </svg>

      <div className="max-w-[1720px] 2xl:max-w-[1800px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* ── Centered Bold Header (Matching Featured Treks) ── */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[62px] text-[#12365B] tracking-tight leading-tight">
            Featured Destinations
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#59615D] leading-relaxed max-w-2xl mx-auto mt-3 font-normal">
            From iconic high Himalayan summits to peaceful valleys, explore Nepal's most legendary travel destinations.
          </p>
        </div>

        {/* ── Action bar: Explore all destinations + Carousel Controls ── */}
        <div className="flex items-center justify-between sm:justify-end gap-5 mb-6 sm:mb-8">
          <Link
            to="/destinations"
            className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#D46238] hover:text-[#102942] transition-colors"
          >
            <span>Explore all destinations</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Previous destination"
              className="w-10 h-10 rounded-full border border-[#CBD5E0] bg-white/90 hover:bg-white text-[#102942] hover:text-[#D46238] flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Next destination"
              className="w-10 h-10 rounded-full border border-[#CBD5E0] bg-white/90 hover:bg-white text-[#102942] hover:text-[#D46238] flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Destinations 5-Card Layout (Matching Mockup) ─── */}
        <div className="relative group/track">
          {/* Left Arrow Floating Button (Mobile / Tablet) */}
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Previous destinations"
            className="lg:hidden absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#CBD5E0] bg-white/95 hover:bg-[#102942] hover:text-white text-[#102942] flex items-center justify-center transition-all shadow-md hover:shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Floating Button (Mobile / Tablet) */}
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Next destinations"
            className="lg:hidden absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#CBD5E0] bg-white/95 hover:bg-[#102942] hover:text-white text-[#102942] flex items-center justify-center transition-all shadow-md hover:shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Track: Full 5-column grid on desktop, scrollable on mobile */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`flex lg:grid lg:grid-cols-5 gap-3.5 xl:gap-4 overflow-x-auto lg:overflow-visible scrollbar-none pb-4 pt-1 px-1 -mx-1 snap-x snap-mandatory lg:snap-none scroll-smooth w-full select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab lg:cursor-default'
            }`}
          >
            {destinationCards.map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="snap-start shrink-0 w-[265px] sm:w-[285px] lg:w-full h-[450px] sm:h-[470px] lg:h-[435px] xl:h-[455px] rounded-[20px] overflow-hidden relative shadow-md hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between select-none"
              >
                {/* Full-Card Link */}
                <Link
                  to={dest.link}
                  onClick={(e) => {
                    if (hasDraggedRef.current) {
                      e.preventDefault();
                    }
                  }}
                  draggable={false}
                  className="absolute inset-0 z-20 select-none cursor-pointer"
                  aria-label={dest.title}
                />

                {/* Card Background Photo */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#102942] pointer-events-none select-none">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    draggable={false}
                    className={`w-full h-full object-cover ${
                      dest.imagePosition || 'object-center'
                    } group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none`}
                  />
                  {/* Subtle top shadow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 p-3.5 sm:p-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase shadow-xs border border-white/30">
                    {dest.badge.icon}
                    <span>{dest.badge.text}</span>
                  </div>
                </div>

                {/* Bottom Content Overlay */}
                <div className="relative z-10 pt-16 pb-4 px-4 sm:px-4.5 bg-gradient-to-t from-black/95 via-black/75 via-45% to-transparent">
                  {/* Location Pin */}
                  <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-white/80 mb-1">
                    <MapPin className="w-3 h-3 text-[#E85D2A] shrink-0" />
                    <span>{dest.location}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl lg:text-[18px] xl:text-[20px] font-bold text-white leading-snug group-hover:text-[#E85D2A] transition-colors">
                    {dest.title}
                  </h3>

                  {/* Eyebrow / Tagline */}
                  <span className="font-simplon-mono text-[9px] font-bold tracking-[0.16em] uppercase text-white/70 block mt-0.5 mb-1.5">
                    {dest.eyebrow}
                  </span>

                  {/* Description */}
                  <p className="font-sans text-[11px] text-white/80 leading-relaxed font-light line-clamp-2 mb-3">
                    {dest.description}
                  </p>

                  {/* Bottom Bar: Experience Count + Explore Link */}
                  <div className="pt-2.5 border-t border-white/15 flex items-center justify-between">
                    <span className="text-[10.5px] font-simplon-mono text-white/85 font-medium">
                      {dest.experienceCount}
                    </span>

                    <span className="text-[11px] font-bold text-white group-hover:text-[#E85D2A] transition-colors inline-flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
