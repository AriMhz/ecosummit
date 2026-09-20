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

// Local High-Resolution Assets
import lakeBg from '../../assets/lake.png';
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

const destinationFeatures = [
  {
    id: 'views',
    title: 'Mountain Views',
    subtitle: 'Breathtaking landscapes',
    borderClass: 'border-2 border-[#E85D2A]',
    iconColor: 'text-[#E85D2A]',
    icon: (
      <svg
        className="w-5 h-5 text-[#E85D2A]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 18L8.5 9.5L12.5 15L16.5 8.5L21.5 18H3Z" />
        <path d="M8.5 9.5L11.5 15L14 11.5L16.5 15" />
      </svg>
    ),
  },
  {
    id: 'culture',
    title: 'Rich Culture',
    subtitle: 'Ancient traditions',
    borderClass: 'border border-[#718096]/60',
    iconColor: 'text-[#4A5568]',
    icon: (
      <svg
        className="w-5 h-5 text-[#4A5568]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="12" y1="8" x2="12" y2="14" />
        <line x1="9" y1="11" x2="15" y2="11" />
      </svg>
    ),
  },
  {
    id: 'wildlife',
    title: 'Unique Wildlife',
    subtitle: 'Rare and diverse species',
    borderClass: 'border border-[#718096]/60',
    iconColor: 'text-[#4A5568]',
    icon: (
      <svg
        className="w-5 h-5 text-[#4A5568]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20" />
        <path d="M12 4c4.5 1.5 6.5 5.5 6.5 10a6.5 6.5 0 0 1-13 0c0-4.5 2-8.5 6.5-10z" />
        <path d="M12 10l4.5-2" />
        <path d="M12 14l-4.5-2" />
      </svg>
    ),
  },
  {
    id: 'people',
    title: 'Warm People',
    subtitle: 'Unforgettable hospitality',
    borderClass: 'border border-[#718096]/60',
    iconColor: 'text-[#4A5568]',
    icon: (
      <svg
        className="w-5 h-5 text-[#4A5568]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
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
    <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-14 bg-[#FAF8F5] overflow-hidden text-[#17201D]">
      {/* ── Background Mountain & Lake Panorama: ONLY for the top header area (Never behind cards) ── */}
      <div className="absolute top-0 left-0 right-0 h-[430px] sm:h-[470px] lg:h-[500px] z-0 pointer-events-none overflow-hidden select-none">
        <img
          src={lakeBg}
          alt="Himalayan mountain panorama across Phewa Lake"
          role="presentation"
          className="w-full h-full object-cover object-[52%_35%] scale-[0.90] sm:scale-[0.90] lg:scale-[0.88] origin-[52%_35%] opacity-100"
        />
        {/* Generous atmospheric gradient covering the text area so all typography is 100% crisp and readable */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[50%] lg:w-[35%] xl:w-[30%] bg-gradient-to-r from-[#FAF8F5] from-50% via-[#FAF8F5]/90 via-75% to-transparent z-1 pointer-events-none" />

        {/* Right side gradient: dissolves the mountain photo into pure #FAF8F5 right before the far-right badges and map */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-[50%] lg:w-[32%] xl:w-[26%] bg-gradient-to-l from-[#FAF8F5] from-55% via-[#FAF8F5]/90 via-75% to-transparent z-1 pointer-events-none" />

        {/* Bottom smooth fade to solid #FAF8F5: completely dissolves to pure background before the cards */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5] via-28% to-transparent z-1 pointer-events-none" />
      </div>

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
        {/* ── Handwritten Script Note: Floating in bright sky above the mountain range (Matching Mockup) ── */}
        <div className="hidden lg:block absolute left-[31%] xl:left-[33%] -top-2 lg:-top-3 xl:-top-4 z-10 select-none pointer-events-none -rotate-3">
          <div className="font-script text-2xl sm:text-[28px] text-[#4A3E31] leading-tight text-left">
            <span>Same Country,</span>
            <br />
            <span className="inline-block relative">
              A Thousand Stories
              {/* Tapered artistic brush stroke matching mockup */}
              <svg
                className="w-28 h-2 text-[#C26638] mt-1 -ml-1"
                viewBox="0 0 120 8"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M 4 4 Q 60 1 116 4 Q 60 7 4 4 Z" opacity="0.85" />
              </svg>
            </span>
          </div>
        </div>

        {/* ── Top Header Area & Feature Badges Stack ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 sm:mb-12 lg:mb-14 -mt-2 sm:-mt-3 lg:-mt-6 xl:-mt-8 relative z-10">
          {/* Left Column: Eyebrow + Headline + Description + Button */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-3 pt-1">
              <span className="w-8 h-[2.5px] bg-[#E85D2A] rounded-full" />
              <span className="font-simplon-mono text-xs uppercase tracking-[0.25em] text-[#17201D] font-bold">
                FEATURED DESTINATIONS
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] text-[#102942] font-normal leading-[1.08] sm:leading-[1.06] tracking-tight">
              Unforgettable
              <br />
              Experiences Across
              <br />
              Nepal
            </h2>

            <p className="font-sans text-sm sm:text-[15px] text-[#374151] leading-relaxed max-w-[430px] font-normal">
              From vibrant cities to remote mountain villages, explore handpicked destinations that
              showcase the true beauty, culture and diversity of Nepal.
            </p>

            <div className="pt-2 flex items-center gap-6 flex-wrap">
              <Link
                to="/destinations"
                className="group inline-flex items-center gap-3 text-sm font-sans font-medium text-[#17201D] hover:text-[#E85D2A] transition-colors"
              >
                <div className="w-8 h-8 rounded-full border border-[#E85D2A] bg-white/80 group-hover:bg-[#E85D2A] text-[#E85D2A] group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
                <span className="font-medium text-[14px]">Explore All Destinations</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Coordinates + Nepal Map Outline + 4 Feature Badges (Moved up and right) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start lg:items-end justify-start gap-3 sm:gap-4 translate-x-0 lg:translate-x-6 xl:translate-x-10 lg:-mt-8 xl:-mt-10 relative z-10">
            {/* Top Coordinates & Accurate Nepal Country Map Vector */}
            <div className="w-full flex items-start justify-between lg:justify-end gap-6 sm:gap-10 mb-0 select-none relative">

              {/* Geographic Coordinates with Compass Crosshair Reticle */}
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-simplon-mono text-[#334155] font-semibold tracking-wider pt-2 relative z-1">
                <span>28.3949° N</span>
                <span className="text-[#94A3B8]">·</span>
                <span>84.1240° E</span>
                <svg
                  className="w-4 h-4 text-[#475569] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                </svg>
              </div>

              {/* Accurate Geographic Nepal Map with Regional Borders (Positioned cleanly without cutoff) */}
              <div className="relative z-1 mr-2 sm:mr-4 lg:mr-6 xl:mr-8 mt-0.5 sm:mt-1 lg:mt-1.5">
                {/* Topographic Contour Wave Lines radiating behind map */}
                <svg
                  className="absolute -top-2 -right-3 w-48 sm:w-52 h-40 pointer-events-none text-[#CBD5E1]/45"
                  viewBox="0 0 200 160"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.85"
                  aria-hidden="true"
                >
                  <path d="M 70,0 C 95,25 130,45 200,55" />
                  <path d="M 50,0 C 80,32 120,55 200,70" />
                  <path d="M 30,0 C 65,38 110,65 200,85" />
                  <path d="M 10,0 C 50,45 100,75 200,100" />
                  <path d="M 0,15 C 40,55 90,85 200,115" />
                  <path d="M 0,35 C 35,68 80,95 200,130" />
                </svg>

                <svg
                  className="w-44 sm:w-52 lg:w-56 xl:w-60 h-auto text-[#102942]/35 hover:text-[#102942]/60 transition-colors"
                  viewBox="0 -2 200 102"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="Geographic Map of Nepal"
                >
                  {/* Geographic Country Outer Border (Natural Earth cartography) */}
                  <path
                    d="M 187.5 61 L 188.4 61.6 L 188.4 62.6 L 188.3 63.7 L 187.4 66 L 186.6 67.6 L 185.6 71.1 L 184.7 77.1 L 184.9 78.1 L 187.5 81.6 L 188.5 84.2 L 188.6 86 L 187.5 89.1 L 186.3 92.5 L 185.7 93.2 L 185 93.5 L 181.8 92.3 L 179.6 92.5 L 177.1 93.2 L 174.4 93 L 172.3 92.6 L 169.5 94 L 166.9 93.3 L 165.2 92.4 L 164.1 90 L 163.6 89.7 L 158 92.2 L 156.7 92.4 L 153.3 91 L 150.4 89.7 L 149.4 89.3 L 146.7 88.8 L 144.2 88.5 L 141.5 87.7 L 138.2 88.8 L 136.9 88.7 L 135.6 87.9 L 135 86.3 L 134.8 84.8 L 133.7 83.8 L 131.9 83.5 L 129.5 84.5 L 125.9 85.7 L 124.8 85.5 L 123.7 85.1 L 123.3 84.8 L 122.8 83.4 L 122.3 83.1 L 121.4 83 L 120 82.7 L 118.2 81.6 L 112.6 79.1 L 112 78 L 112 75.6 L 111.7 74.6 L 111 73.5 L 108.2 72.4 L 102.7 70.7 L 99.7 69.3 L 98.2 69.9 L 95.4 70.5 L 93.9 71.8 L 92.1 71.4 L 87.9 70 L 85.6 69.9 L 84.2 70.3 L 83.9 71.1 L 82.2 71.9 L 80.5 71.2 L 77.2 70.3 L 74.4 69.8 L 70 68.7 L 69.5 67 L 68.8 65.3 L 67.7 65 L 63.8 65.3 L 60.3 63.5 L 56.4 61.1 L 54.8 60.3 L 53.7 60.1 L 52.8 60.4 L 51.7 60.9 L 50.7 61.1 L 48.7 60.1 L 46 58.6 L 42.7 56.8 L 38.9 54.3 L 37.3 52.9 L 36.6 51.8 L 35.8 50.8 L 32.5 49.2 L 29.8 47.9 L 26.7 46.4 L 26.1 46.1 L 24.9 45.1 L 23.1 44 L 21.6 43.6 L 21.1 44.3 L 20.7 45 L 19.4 44.8 L 17.4 43.6 L 15.2 42.4 L 13.5 41.2 L 11.8 40 L 11.4 39.2 L 12.1 36.4 L 13.1 34.1 L 14 33.6 L 15.4 32.1 L 15.9 29.4 L 15.8 27.1 L 17.2 23.8 L 19 20.4 L 22.3 16.7 L 23.7 15.4 L 25.2 14.6 L 28.2 11.9 L 28.8 11.4 L 30.1 10.7 L 31.4 10.5 L 32.3 10.9 L 33.3 12.3 L 34.5 13.7 L 36 13.6 L 37.7 12.4 L 41.2 7.1 L 46.1 6 L 50.8 6.5 L 54.9 7.3 L 56.1 9.1 L 56.9 11 L 57.4 12 L 58.8 13.1 L 64.6 15.7 L 68 18.2 L 72.6 21.4 L 76.1 22.8 L 79.2 22.9 L 81 24.2 L 83.6 26.7 L 85.8 29.6 L 88.6 32.3 L 90.5 32.2 L 93.1 31.3 L 96.3 30.2 L 98.2 30.8 L 99.9 31.5 L 100.5 32.9 L 101.5 35.5 L 102.7 38.2 L 104.5 39.2 L 106.6 40.6 L 107.8 41.7 L 111.9 43.8 L 112.5 44.6 L 113.3 45.2 L 114.3 45.5 L 115.1 45.9 L 116.4 46.1 L 121 44.8 L 122.3 45 L 123 45.2 L 123 45.7 L 122.2 47.6 L 121.5 50 L 122.2 51.3 L 124.2 51.8 L 128.5 52.1 L 134.3 52.1 L 136.1 53.3 L 137.9 55.2 L 139.7 58.4 L 140.4 59.7 L 141.3 60.1 L 142.8 59.6 L 143 58.3 L 143.1 56.3 L 144.4 55.7 L 145.2 56.2 L 146.1 57.7 L 148.6 59.1 L 150.3 59.7 L 152 59.5 L 152.7 59 L 153.5 56.3 L 154.8 55.9 L 156.5 56.1 L 157.1 56.6 L 157.8 57.7 L 159.8 58.2 L 161.8 58.9 L 163.7 59.7 L 166.3 61.7 L 169.6 62.1 L 173.4 62 L 175.4 62.1 L 176.8 62.2 L 178.1 62.1 L 182 60.7 L 183.6 60.6 L 185.6 60.7 L 187.5 61 Z"
                    strokeWidth="1.3"
                  />
                  {/* Regional Boundary Divider Lines */}
                  <path
                    d="M 42.5 14.8 L 45.9 16.7 L 48.3 22.4 L 47.5 27.9 L 44.4 30.9 L 39.1 36.8 L 39.3 39.6 L 37.4 44.6 L 34.7 47.9"
                    strokeWidth="0.85"
                    strokeDasharray="2 2"
                    opacity="0.55"
                  />
                  <path
                    d="M 90.1 33.6 L 88.9 36.2 L 83.7 41.1 L 77.8 44.1 L 74.2 47.9 L 76.7 51.8 L 75.9 56.7 L 73.3 60.4 L 71.2 63"
                    strokeWidth="0.85"
                    strokeDasharray="2 2"
                    opacity="0.55"
                  />
                  <path
                    d="M 120.8 51.2 L 119.4 53.1 L 117.2 55.7 L 115.1 58 L 112.5 60.7 L 110.6 62.4 L 105.2 65 L 98 68.1 L 96.5 69.2"
                    strokeWidth="0.85"
                    strokeDasharray="2 2"
                    opacity="0.55"
                  />
                  <path
                    d="M 153.3 60 L 153.4 63.2 L 151.1 66.3 L 147.4 70.3 L 146.9 74 L 149.2 77.4 L 146.9 81.4 L 145.1 85.1 L 145.3 87.5"
                    strokeWidth="0.85"
                    strokeDasharray="2 2"
                    opacity="0.55"
                  />
                </svg>
              </div>
            </div>

            {/* Mobile/Tablet Script Note (hidden on desktop where it floats in the sky) */}
            <div className="lg:hidden font-script text-2xl text-[#5C5247] leading-tight text-left mb-6 -rotate-2 select-none">
              <span>Same Country,</span>
              <br />
              <span className="inline-block relative">
                A Thousand Stories
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E85D2A] rounded-full" />
              </span>
            </div>

            {/* 4 Feature Badges List (Stacked on the right, matching mockup Image 2) */}
            <div className="flex flex-col w-full max-w-[260px] self-start lg:self-end select-none">
              {destinationFeatures.map((feat, idx) => (
                <React.Fragment key={feat.id}>
                  <div className="flex items-center gap-3.5 group py-1.5">
                    <div
                      className={`w-11 h-11 rounded-full ${feat.borderClass} bg-white flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105`}
                    >
                      {feat.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-sans font-bold text-[14px] sm:text-[15px] text-[#102942] leading-tight tracking-tight">
                        {feat.title}
                      </h4>
                      <p className="font-sans text-[12px] text-[#718096] leading-tight mt-1 font-normal">
                        {feat.subtitle}
                      </p>
                    </div>
                  </div>
                  {idx < destinationFeatures.length - 1 && (
                    <div className="w-14 h-px bg-[#E2DDD5]/85 my-1.5 ml-14" />
                  )}
                </React.Fragment>
              ))}
            </div>
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

        {/* ── Bottom Micro Banner: "Plan Your Next Journey" ────────── */}
        <div className="mt-14 pt-8 border-t border-[#E2DDD5]/70 flex flex-col lg:flex-row items-center justify-between gap-6 bg-white/60 backdrop-blur-xs rounded-2xl p-6 sm:p-8 border border-white/80 shadow-xs">
          {/* Left: Himalayan Peak Line Art + Eyebrow + Title */}
          <div className="flex items-center gap-4 sm:gap-5 w-full lg:w-auto">
            {/* 3-peak Himalayan line art matching mockup */}
            <div className="shrink-0 text-[#102942]/60 hidden sm:block">
              <svg
                className="w-12 h-9"
                viewBox="0 0 48 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M4 28 L14 10 L24 28" strokeLinejoin="round" />
                <path d="M18 20 L28 4 L40 28" strokeLinejoin="round" />
                <path d="M34 18 L40 10 L46 28" strokeLinejoin="round" />
                <path d="M2 28 H46" strokeLinecap="round" />
              </svg>
            </div>

            <div className="sm:border-l sm:border-[#D5C7B5] sm:pl-5">
              <span className="font-simplon-mono text-[10px] font-bold tracking-[0.25em] text-[#17201D] uppercase block mb-1">
                NEPAL HAS MORE TO OFFER
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#102942] font-normal leading-tight">
                Plan Your Next Journey
              </h3>
            </div>
          </div>

          {/* Center / Right: Description + View All Destinations Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto justify-between lg:justify-end">
            <p className="text-xs sm:text-sm text-[#59615D] font-normal leading-relaxed max-w-xs">
              From hidden valleys to iconic landmarks, find the perfect destination for your next
              adventure.
            </p>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-[#D5C7B5] bg-white hover:bg-[#102942] text-[#102942] hover:text-white hover:border-[#102942] text-xs font-simplon-mono font-bold tracking-[0.12em] uppercase transition-all shadow-xs hover:shadow-md shrink-0"
            >
              <span>View All Destinations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
