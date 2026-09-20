import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, MapPin, Mountain, Compass, Star, Award, Sparkles } from 'lucide-react';
import ourTeamBg from '../../assets/our team.png';
import everestImg from '../../assets/everest.png';
import annapurnaImg from '../../assets/wwa.png';
import langtangImg from '../../assets/14ea9714-56e5-46fd-a5ad-ed27307c24a9.png';
import culturalImg from '../../assets/4f8ec3b9-bb3b-4fac-997a-def6c522e8c6.png';

interface FeaturedJourneyItem {
  id: string;
  slug: string;
  badge?: {
    text: string;
    variant: 'popular' | 'bestseller' | 'curated' | 'heritage';
  };
  region: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  price: string;
  image: string;
  imagePosition?: string;
  link: string;
}

const featuredJourneysData: FeaturedJourneyItem[] = [
  {
    id: 'ebc',
    slug: 'everest-base-camp-kala-patthar',
    badge: {
      text: 'Most Popular',
      variant: 'popular',
    },
    region: 'Everest Region',
    title: 'Everest Base Camp Trek',
    description: 'Walk in the footsteps of legends and experience the world’s highest peak up close.',
    duration: '14 Days',
    difficulty: 'Moderate',
    price: '$1,450',
    image: everestImg,
    imagePosition: 'object-[18%_center]',
    link: '/treks/everest-base-camp-kala-patthar',
  },
  {
    id: 'annapurna',
    slug: 'annapurna-sanctuary-base-camp',
    badge: {
      text: 'Best Seller',
      variant: 'bestseller',
    },
    region: 'Annapurna Region',
    title: 'Annapurna Circuit Trek',
    description: 'A classic journey through diverse landscapes and traditional villages.',
    duration: '16 Days',
    difficulty: 'Moderate',
    price: '$1,200',
    image: annapurnaImg,
    imagePosition: 'object-center',
    link: '/treks/annapurna-sanctuary-base-camp',
  },
  {
    id: 'langtang',
    slug: 'langtang-valley-kyanjin-gompa',
    badge: {
      text: 'Scenic Valley',
      variant: 'curated',
    },
    region: 'Langtang Region',
    title: 'Langtang Valley Trek',
    description: 'A short yet stunning trek with beautiful valleys and local culture.',
    duration: '10 Days',
    difficulty: 'Easy',
    price: '$950',
    image: langtangImg,
    imagePosition: 'object-center',
    link: '/treks/langtang-valley-kyanjin-gompa',
  },
  {
    id: 'cultural',
    slug: 'cultural-heritage-tour',
    badge: {
      text: 'Living Heritage',
      variant: 'heritage',
    },
    region: 'Kathmandu Valley',
    title: 'Cultural & Heritage Tour',
    description: 'Discover ancient temples, vibrant markets and living traditions.',
    duration: '5 Days',
    difficulty: 'Easy',
    price: '$450',
    image: culturalImg,
    imagePosition: 'object-[36%_center]',
    link: '/tours/nepal-panoramic-luxury-journey',
  },
];

export const FeaturedJourneys: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse drag-to-slide state & refs
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const dragAccumulatorRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % featuredJourneysData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + featuredJourneysData.length) % featuredJourneysData.length);
  };

  // Synchronize mobile scroll container with active card
  useEffect(() => {
    if (scrollContainerRef.current && window.innerWidth < 1024) {
      const container = scrollContainerRef.current;
      const cards = container.children;
      if (cards[activeIndex]) {
        (cards[activeIndex] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [activeIndex]);

  const handleScroll = () => {
    // Only update on mobile/tablet freeform scroll
    if (scrollContainerRef.current && window.innerWidth < 1024) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = 300;
      const newIndex = Math.min(
        Math.max(Math.round(scrollLeft / cardWidth), 0),
        featuredJourneysData.length - 1
      );
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  // Mouse Drag Events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDownRef.current = true;
    startXRef.current = e.pageX;
    dragAccumulatorRef.current = 0;
    hasDraggedRef.current = false;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current) return;
    const currentX = e.pageX;
    const delta = currentX - startXRef.current;
    dragAccumulatorRef.current = delta;

    if (Math.abs(delta) > 8) {
      hasDraggedRef.current = true;
    }

    // Threshold to trigger card slide with mouse drag
    const swipeThreshold = 50;
    if (delta < -swipeThreshold) {
      // Dragged Left -> Next
      handleNext();
      startXRef.current = currentX;
      dragAccumulatorRef.current = 0;
    } else if (delta > swipeThreshold) {
      // Dragged Right -> Prev
      handlePrev();
      startXRef.current = currentX;
      dragAccumulatorRef.current = 0;
    }
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
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-[#EDF3F7]">
      {/* ── Background Mountain Panorama ───────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src={ourTeamBg}
          alt=""
          role="presentation"
          className="w-full h-full object-cover object-[82%_20%] md:object-[80%_15%] opacity-90"
        />
        {/* Soft atmospheric gradient blend for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EDF3F7] via-[#EDF3F7]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#EDF3F7]/50 via-transparent to-[#FAF8F5]" />
      </div>

      {/* ── Topographic contour lines decoration (bottom-left) ── */}
      <svg
        className="absolute bottom-0 left-0 w-80 sm:w-96 lg:w-[440px] h-80 sm:h-96 lg:h-[440px] text-[#A0AEC0]/30 pointer-events-none z-[1] [mask-image:linear-gradient(to_bottom,black_60%,transparent_95%)]"
        viewBox="0 0 400 400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <path d="M 30,220 C 50,160 110,130 190,130 C 270,130 330,170 340,230 C 350,290 280,340 200,350 C 120,360 20,270 30,220 Z" />
        <path d="M 60,220 C 75,175 130,150 190,150 C 250,150 300,180 310,225 C 320,270 260,315 200,320 C 140,325 50,250 60,220 Z" />
        <path d="M 90,220 C 105,185 150,170 190,170 C 230,170 270,190 280,220 C 290,250 240,290 200,295 C 160,300 80,240 90,220 Z" />
        <path d="M 120,220 C 130,195 165,185 190,185 C 215,185 240,200 250,220 C 260,240 220,270 190,272 C 160,275 110,235 120,220 Z" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* ── Editorial Section Header ─────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-8">
          {/* Left: Eyebrow + Headline + Description */}
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2.5px] bg-[#E85D2A] rounded-full" />
              <span className="font-simplon-mono text-xs uppercase tracking-[0.25em] text-[#17201D] font-bold">
                FEATURED JOURNEYS
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] text-[#102942] font-normal leading-[1.15] tracking-tight">
              Our Most Loved
              <br />
              Himalayan Treks
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#59615D] leading-relaxed font-normal max-w-xl">
              Curated routes and expert-led expeditions across Nepal’s iconic mountain trails.
            </p>
          </div>

          {/* Right: View All Link + Carousel Arrows positioned in the mountain sky */}
          <div className="flex flex-col items-start lg:items-end gap-5 shrink-0">
            <Link
              to="/treks"
              className="group relative inline-flex items-center gap-2 text-xs font-simplon-mono font-bold tracking-[0.16em] uppercase text-[#102942] hover:text-[#E85D2A] transition-colors pb-1"
            >
              <span>VIEW ALL JOURNEYS</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#E85D2A]" />
            </Link>

            {/* Navigation Carousel Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous journey"
                className="w-11 h-11 rounded-full border border-[#CBD5E0] bg-white/80 hover:bg-white text-[#102942] hover:text-[#E85D2A] flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next journey"
                className="w-11 h-11 rounded-full bg-[#102942] hover:bg-[#E85D2A] text-white flex items-center justify-center transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Carousel / Card Track with Vertical Index Indicator ── */}
        <div className="relative flex items-center gap-4 sm:gap-6">
          {/* Vertical Index Indicator (01 / 04) - Desktop only */}
          <div className="hidden xl:flex flex-col items-center gap-2.5 select-none shrink-0 pr-2">
            <span className="font-simplon-mono text-xs font-bold text-[#102942]">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <div className="w-[1.5px] h-16 bg-[#CBD5E0] relative rounded-full overflow-hidden">
              <div
                className="w-full bg-[#102942] rounded-full transition-all duration-300"
                style={{
                  height: '25%',
                  transform: `translateY(${activeIndex * 100}%)`,
                }}
              />
            </div>
            <span className="w-1 h-1 rounded-full bg-[#CBD5E0]" />
            <span className="font-simplon-mono text-xs font-medium text-[#718096]">
              {String(featuredJourneysData.length).padStart(2, '0')}
            </span>
          </div>

          {/* Cards Track: On desktop, all 4 cards ALWAYS fit 100% inside container with interactive expansion.
              On mobile/tablet, it scrolls horizontally with clean snapping and zero awkward cutoffs. */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`flex gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible scrollbar-none pb-4 pt-1 px-1 -mx-1 w-full select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {featuredJourneysData.map((journey, idx) => {
              const isActive = idx === activeIndex;

              return (
                <motion.div
                  key={journey.id}
                  layout={!shouldReduceMotion}
                  transition={{ layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
                  onMouseEnter={() => {
                    setActiveIndex(idx);
                  }}
                  onClick={() => {
                    if (!hasDraggedRef.current && !isActive) {
                      setActiveIndex(idx);
                    }
                  }}
                  className={`shrink-0 rounded-[24px] overflow-hidden relative shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between select-none cursor-pointer ${
                    // Mobile & Tablet: full clean card with horizontal snap
                    'w-[82vw] sm:w-[330px] snap-center h-[480px] sm:h-[500px] ' +
                    // Desktop: all 4 cards fit 100% inside container with active card expanded on hover!
                    (isActive
                      ? 'lg:w-auto lg:flex-[1.55] lg:h-[500px]'
                      : 'lg:w-auto lg:flex-1 lg:h-[500px] hover:brightness-[1.03]')
                  }`}
                >
                  {/* Overlay Link - navigates on click */}
                  <Link
                    to={journey.link}
                    onClick={(e) => {
                      if (hasDraggedRef.current) {
                        e.preventDefault();
                      }
                    }}
                    draggable={false}
                    className="absolute inset-0 z-20 select-none cursor-pointer"
                    aria-label={journey.title}
                  />

                  {/* Card Background Photo with automatic fallback */}
                  <div className="absolute inset-0 z-0 overflow-hidden bg-[#102942] pointer-events-none select-none">
                    <img
                      src={journey.image}
                      alt={journey.title}
                      draggable={false}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src =
                          'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85';
                      }}
                      className={`w-full h-full object-cover ${journey.imagePosition || 'object-center'} group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none`}
                    />
                    {/* Subtle top shadow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Top Badge */}
                  <div className="relative z-10 p-4 sm:p-5">
                    {journey.badge && (
                      journey.badge.variant === 'popular' ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E85D2A] text-white text-[10.5px] font-bold tracking-wide shadow-md">
                          <Compass className="w-3.5 h-3.5" />
                          <span>{journey.badge.text}</span>
                        </div>
                      ) : journey.badge.variant === 'bestseller' ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-[10.5px] font-bold tracking-wide shadow-md border border-white/20">
                          <Star className="w-3.5 h-3.5 fill-[#F6AD55] text-[#F6AD55]" />
                          <span>{journey.badge.text}</span>
                        </div>
                      ) : journey.badge.variant === 'curated' ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[10.5px] font-medium tracking-wide shadow-sm border border-white/15">
                          <Sparkles className="w-3.5 h-3.5 text-[#A5B38A]" />
                          <span>{journey.badge.text}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[10.5px] font-medium tracking-wide shadow-sm border border-white/15">
                          <Award className="w-3.5 h-3.5 text-[#E5A93C]" />
                          <span>{journey.badge.text}</span>
                        </div>
                      )
                    )}
                  </div>

                  {/* Bottom Content Overlay */}
                  <div className="relative z-10 pt-16 pb-5 px-4 sm:px-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
                    {/* Region */}
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/80 mb-1.5">
                      <MapPin className="w-3 h-3 text-[#E85D2A] shrink-0" />
                      <span className="truncate">{journey.region}</span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-serif font-bold text-white leading-snug group-hover:text-[#E85D2A] transition-colors ${
                        isActive
                          ? 'text-xl sm:text-2xl lg:text-[25px]'
                          : 'text-lg sm:text-xl line-clamp-1 lg:line-clamp-2'
                      }`}
                    >
                      {journey.title}
                    </h3>

                    {/* Description (expanded on active card, compact on others) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="font-sans text-[11.5px] text-white/75 leading-relaxed font-light mt-2 line-clamp-2"
                        >
                          {journey.description}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Bottom Stats & Price Row */}
                    <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] text-white/80">
                        <div className="flex items-center gap-1">
                          <Mountain className="w-3 h-3 text-white/70 shrink-0" />
                          <span>{journey.duration}</span>
                        </div>
                        {isActive && (
                          <>
                            <span>·</span>
                            <div className="flex items-center gap-1">
                              <Mountain className="w-3 h-3 text-white/70 shrink-0" />
                              <span>{journey.difficulty}</span>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                        <div className="text-right">
                          <span className="text-[8.5px] uppercase tracking-wider text-white/60 block leading-none">
                            From
                          </span>
                          <span className="text-sm sm:text-base font-bold text-white leading-tight">
                            {journey.price}
                          </span>
                        </div>

                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                            isActive
                              ? 'bg-[#E85D2A] border-[#E85D2A] text-white shadow-sm'
                              : 'border-white/35 text-white group-hover:bg-[#E85D2A] group-hover:border-[#E85D2A]'
                          }`}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom Narrative Footer Row matching reference mockup ── */}
        <div className="mt-14 pt-8 border-t border-[#CBD5E0]/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Handwritten "More Than a Trip. It's a Story" */}
          <div className="relative select-none">
            <div className="font-script -rotate-3 text-left">
              <span className="text-2xl sm:text-3xl text-[#102942]/90 block leading-tight">
                More Than a Trip
              </span>
              <span className="text-3xl sm:text-4xl text-[#102942] font-bold block leading-tight mt-0.5">
                It’s a Story
              </span>
              {/* Orange brush underline */}
              <svg
                className="w-28 sm:w-36 h-3 text-[#E85D2A] mt-1 -rotate-1"
                viewBox="0 0 140 12"
                fill="none"
              >
                <path
                  d="M 3,6 Q 40,11 80,5 Q 120,1 137,6"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Right: Mountain icon + category tags */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-[10px] sm:text-xs font-simplon-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#102942]/75 uppercase">
            <svg
              className="w-5 h-5 text-[#102942] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="m8 3 4 8 5-5 5 15H2L8 3z"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            <span className="w-4 h-[1.5px] bg-[#102942]/40 inline-block" />
            <span>TREKKING</span>
            <span className="text-[#A0AEC0]">/</span>
            <span>CULTURE</span>
            <span className="text-[#A0AEC0]">/</span>
            <span>NATURE</span>
            <span className="text-[#A0AEC0]">/</span>
            <span>ADVENTURE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
