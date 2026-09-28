import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, MapPin, Mountain, Compass, Star, Wind } from 'lucide-react';
import everestImg from '../../assets/everest.png';
import annapurnaImg from '../../assets/wwa.png';
import skyeImg from '../../assets/skye.png';
import langtangImg from '../../assets/14ea9714-56e5-46fd-a5ad-ed27307c24a9.png';
import ourTeamBg from '../../assets/our team.png';

interface ExpeditionItem {
  id: string;
  slug: string;
  badge?: {
    text: string;
    variant: '8000m' | 'technical' | 'trekking-peak' | 'popular';
  };
  region: string;
  title: string;
  description: string;
  duration: string;
  altitude: string;
  price: string;
  image: string;
  imagePosition?: string;
  link: string;
}

const featuredExpeditionsData: ExpeditionItem[] = [
  {
    id: 'everest-expedition',
    slug: 'mount-everest-south-col-expedition',
    badge: {
      text: '8,848m Summit',
      variant: '8000m',
    },
    region: 'Khumbu / Everest Region',
    title: 'Mount Everest (8,848.86m) Expedition',
    description: 'The pinnacle of human mountaineering: stand on the highest point on Earth with a 1:1 elite Sherpa ratio and private heated base camp.',
    duration: '60 Days',
    altitude: '8,848m',
    price: '$45,000',
    image: everestImg,
    imagePosition: 'object-[20%_center]',
    link: '/expeditions/mount-everest-south-col-expedition',
  },
  {
    id: 'ama-dablam',
    slug: 'ama-dablam-southwest-ridge-expedition',
    badge: {
      text: 'Technical Peak',
      variant: 'technical',
    },
    region: 'Everest / Khumbu',
    title: 'Ama Dablam (6,812m) Technical Ascent',
    description: 'Known as the "Matterhorn of the Himalayas" — a breathtaking mixed rock, snow, and ice climb along the iconic Southwest Ridge.',
    duration: '28 Days',
    altitude: '6,812m',
    price: '$7,850',
    image: skyeImg,
    imagePosition: 'object-center',
    link: '/expeditions/ama-dablam-southwest-ridge-expedition',
  },
  {
    id: 'mera-peak',
    slug: 'mera-peak-high-altitude-climb',
    badge: {
      text: 'Highest Trekking Peak',
      variant: 'trekking-peak',
    },
    region: 'Hinku Valley, Makalu-Barun',
    title: 'Mera Peak (6,476m) High-Altitude Summit',
    description: 'Nepal’s highest official trekking peak featuring an unrivaled 360-degree panorama of five 8,000-meter giants including Everest and Lhotse.',
    duration: '18 Days',
    altitude: '6,476m',
    price: '$2,350',
    image: annapurnaImg,
    imagePosition: 'object-center',
    link: '/expeditions/mera-peak-high-altitude-climb',
  },
  {
    id: 'island-peak',
    slug: 'island-peak-everest-base-camp',
    badge: {
      text: 'Classic Alpine Peak',
      variant: 'popular',
    },
    region: 'Chhukung / Everest Region',
    title: 'Island Peak (6,189m) & Everest Base Camp',
    description: 'The ultimate high-altitude combo: hike to Everest Base Camp & Kala Patthar, then ascend headwalls to summit the iconic Imja Tse.',
    duration: '19 Days',
    altitude: '6,189m',
    price: '$2,150',
    image: langtangImg,
    imagePosition: 'object-center',
    link: '/expeditions/island-peak-everest-base-camp',
  },
  {
    id: 'manaslu-expedition',
    slug: 'manaslu-expedition-nepal',
    badge: {
      text: '8,163m Giant',
      variant: '8000m',
    },
    region: 'Manaslu Himalaya, Gorkha',
    title: 'Mount Manaslu (8,163m) Expedition',
    description: 'The "Mountain of the Spirit" — the premier autumn 8,000-meter expedition with low objective hazard and world-class logistical safety.',
    duration: '45 Days',
    altitude: '8,163m',
    price: '$14,500',
    image: ourTeamBg,
    imagePosition: 'object-center',
    link: '/expeditions/manaslu-expedition-nepal',
  },
];

export const FeaturedExpeditions: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse Drag State
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const dragAccumulatorRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const [, setIsDragging] = useState(false);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : featuredExpeditionsData.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < featuredExpeditionsData.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.children[activeIndex] as HTMLElement;
      if (card) {
        const targetScroll =
          card.offsetLeft - (container.clientWidth / 2 - card.clientWidth / 2);
        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
        });
      }
    }
  }, [activeIndex, shouldReduceMotion]);

  const handleScroll = () => {
    if (scrollRef.current && window.innerWidth < 1024) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 330;
      const newIndex = Math.min(
        Math.max(Math.round(scrollLeft / cardWidth), 0),
        featuredExpeditionsData.length - 1
      );
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

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

    const swipeThreshold = 50;
    if (delta < -swipeThreshold) {
      handleNext();
      startXRef.current = currentX;
      dragAccumulatorRef.current = 0;
    } else if (delta > swipeThreshold) {
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
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-[#EDF3F7] text-[#102942] border-t border-[#CBD5E0]/60">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* ── Centered Bold Header (Simple & High-Impact) ─────── */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[62px] text-[#12365B] tracking-tight leading-tight">
            Featured Expeditions
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#59615D] leading-relaxed max-w-2xl mx-auto mt-3 font-normal">
            Conquer legendary Himalayan summits with world-class Sherpa guides, 1:1 oxygen support, and proven summit safety.
          </p>
        </div>

        {/* ── Action bar: View all expeditions + Carousel Controls ─────── */}
        <div className="flex items-center justify-between sm:justify-end gap-5 mb-6 sm:mb-8">
          <Link
            to="/expeditions"
            className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#D46238] hover:text-[#102942] transition-colors"
          >
            <span>View all expeditions</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Navigation Carousel Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous expedition"
              className="w-10 h-10 rounded-full border border-[#CBD5E0] bg-white/90 hover:bg-white text-[#102942] hover:text-[#D46238] flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next expedition"
              className="w-10 h-10 rounded-full border border-[#CBD5E0] bg-white/90 hover:bg-white text-[#102942] hover:text-[#D46238] flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Carousel Cards Container ──────────────────────────── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="flex lg:flex-row overflow-x-auto lg:overflow-visible gap-4 sm:gap-6 no-scrollbar pb-6 pt-2 scroll-smooth select-none cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {featuredExpeditionsData.map((expedition, idx) => {
            const isActive = idx === activeIndex;

            return (
              <motion.div
                key={expedition.id}
                layout
                initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  layout: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                }}
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) {
                    setActiveIndex(idx);
                  }
                }}
                onClick={() => {
                  if (!hasDraggedRef.current && !isActive) {
                    setActiveIndex(idx);
                  }
                }}
                className={`shrink-0 rounded-[24px] overflow-hidden relative shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between select-none cursor-pointer ${
                  'w-[82vw] sm:w-[330px] snap-center h-[480px] sm:h-[500px] ' +
                  (isActive
                    ? 'lg:w-auto lg:flex-[1.55] lg:h-[500px]'
                    : 'lg:w-auto lg:flex-1 lg:h-[500px] hover:brightness-[1.03]')
                }`}
              >
                {/* Overlay Link */}
                <Link
                  to={expedition.link}
                  onClick={(e) => {
                    if (hasDraggedRef.current) {
                      e.preventDefault();
                    }
                  }}
                  draggable={false}
                  className="absolute inset-0 z-20 select-none cursor-pointer"
                  aria-label={expedition.title}
                />

                {/* Card Background Photo */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#102942] pointer-events-none select-none">
                  <img
                    src={expedition.image}
                    alt={expedition.title}
                    draggable={false}
                    className={`w-full h-full object-cover ${expedition.imagePosition || 'object-center'} group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 p-4 sm:p-5">
                  {expedition.badge && (
                    expedition.badge.variant === '8000m' ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E85D2A] text-white text-[10.5px] font-bold tracking-wide shadow-md">
                        <Mountain className="w-3.5 h-3.5" />
                        <span>{expedition.badge.text}</span>
                      </div>
                    ) : expedition.badge.variant === 'technical' ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10.5px] font-bold tracking-wide shadow-md border border-white/20">
                        <Star className="w-3.5 h-3.5 fill-[#F6AD55] text-[#F6AD55]" />
                        <span>{expedition.badge.text}</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-white text-[10.5px] font-medium tracking-wide shadow-sm border border-white/15">
                        <Compass className="w-3.5 h-3.5 text-[#A5B38A]" />
                        <span>{expedition.badge.text}</span>
                      </div>
                    )
                  )}
                </div>

                {/* Bottom Content Overlay */}
                <div className="relative z-10 pt-16 pb-5 px-4 sm:px-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
                  {/* Region */}
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/80 mb-1.5">
                    <MapPin className="w-3 h-3 text-[#E85D2A] shrink-0" />
                    <span className="truncate">{expedition.region}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-serif font-bold text-white leading-snug group-hover:text-[#E85D2A] transition-colors ${
                      isActive
                        ? 'text-xl sm:text-2xl lg:text-[25px]'
                        : 'text-lg sm:text-xl line-clamp-1 lg:line-clamp-2'
                    }`}
                  >
                    {expedition.title}
                  </h3>

                  {/* Description (expanded on active card) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-sans text-[11.5px] text-white/75 leading-relaxed font-light mt-2 line-clamp-2"
                      >
                        {expedition.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Bottom Stats & Price Row */}
                  <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] text-white/80">
                      <div className="flex items-center gap-1">
                        <Mountain className="w-3 h-3 text-white/70 shrink-0" />
                        <span>{expedition.duration}</span>
                      </div>
                      {isActive && (
                        <>
                          <span>·</span>
                          <div className="flex items-center gap-1">
                            <Wind className="w-3 h-3 text-white/70 shrink-0" />
                            <span>{expedition.altitude}</span>
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
                          {expedition.price}
                        </span>
                      </div>

                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                          isActive
                            ? 'bg-[#E85D2A] border-[#E85D2A] text-white shadow-sm'
                            : 'border-white/35 text-white group-hover:bg-[#E85D2A] group-hover:border-[#E85D2A]'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
