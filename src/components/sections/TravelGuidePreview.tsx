import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Sun, 
  Mountain, 
  Landmark, 
  TreePine,
  Sparkles
} from 'lucide-react';
import travelGuideBg from '../../assets/travel_guide_bg.jpg';
import { articlesData } from '../../data/articles';

// Helper to choose the right category icon
const getCategoryIcon = (category: string) => {
  const cat = category.toUpperCase();
  if (cat.includes('TREKKING') || cat.includes('HIKING') || cat.includes('SEASONS')) {
    return <Mountain className="w-3.5 h-3.5 text-amber-400" />;
  }
  if (cat.includes('CULTURE') || cat.includes('HERITAGE') || cat.includes('PACKING')) {
    return <Landmark className="w-3.5 h-3.5 text-amber-400" />;
  }
  if (cat.includes('NATURE') || cat.includes('WILDLIFE')) {
    return <TreePine className="w-3.5 h-3.5 text-emerald-400" />;
  }
  return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
};

export const TravelGuidePreview: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Update button disabled state and active index based on current scroll position
  const updateScrollState = useCallback(() => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < maxScroll - 8);

    const firstCard = el.firstElementChild as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 20; // card width + 20px gap
      const index = Math.round(el.scrollLeft / cardWidth);
      setCurrentIndex(Math.min(articlesData.length - 1, Math.max(0, index)));
    }
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Mouse Drag / Press and Slide handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button or touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (!carouselRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    startXRef.current = e.clientX;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
    carouselRef.current.style.scrollBehavior = 'auto';
    carouselRef.current.style.scrollSnapType = 'none';
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 6) {
      setHasDragged(true);
    }
    carouselRef.current.scrollLeft = scrollLeftRef.current - deltaX;
  };

  const handlePointerUp = () => {
    if (!isDragging || !carouselRef.current) return;
    setIsDragging(false);
    carouselRef.current.style.scrollBehavior = 'smooth';
    carouselRef.current.style.scrollSnapType = 'x mandatory';
    updateScrollState();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const scrollPrev = () => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.firstElementChild as HTMLElement;
    const cardStep = firstCard ? firstCard.offsetWidth + 20 : 320;
    carouselRef.current.scrollBy({ left: -cardStep, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.firstElementChild as HTMLElement;
    const cardStep = firstCard ? firstCard.offsetWidth + 20 : 320;
    carouselRef.current.scrollBy({ left: cardStep, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const targetCard = carouselRef.current.children[index] as HTMLElement;
    if (targetCard) {
      carouselRef.current.scrollTo({
        left: targetCard.offsetLeft - carouselRef.current.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="travel-guide" className="relative bg-[#FAF8F5] text-[#142332] overflow-hidden pt-0 pb-16 sm:pb-24">
      {/* Background Topographic sketch accent in bottom-left */}
      <div className="absolute bottom-6 left-6 pointer-events-none opacity-20 select-none z-0">
        <svg width="220" height="140" viewBox="0 0 220 140" fill="none" stroke="#B8AFA2" strokeWidth="1">
          <path d="M10 130 C 50 110, 80 120, 130 90 C 170 65, 190 85, 210 50" />
          <path d="M20 140 C 60 120, 90 130, 140 100 C 180 75, 200 95, 220 60" />
          <path d="M0 120 C 40 100, 70 110, 120 80 C 160 55, 180 75, 200 40" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 1. TOP HERO PANORAMA WITH LONE TREKKER & EDITORIAL TITLE  */}
      {/* ========================================================= */}
      <div className="relative w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex items-center mb-8 sm:mb-12">
        {/* Full-bleed Panoramic Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={travelGuideBg}
            alt="Majestic Nepal Himalayan Range with trekker and prayer flags"
            draggable={false}
            className="w-full h-full object-cover object-[82%_15%] lg:object-[86%_18%] select-none transition-transform duration-1000 ease-out"
          />
          {/* Subtle multi-stop gradient dissolve to guarantee pristine text contrast on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/92 via-40% md:via-48% lg:via-42% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/30 to-transparent" />
        </div>

        {/* Floating Top-Right Live Weather & Location Badge */}
        <div className="absolute top-4 sm:top-6 right-6 sm:right-12 lg:right-20 z-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/85 backdrop-blur-md border border-white/70 shadow-[0_4px_16px_rgba(0,0,0,0.06)] rounded-full text-xs font-medium text-slate-800 hover:bg-white transition-all">
            <MapPin className="w-3.5 h-3.5 text-[#D46238]" />
            <span className="font-semibold tracking-wide">Kathmandu, Nepal</span>
            <span className="text-slate-300">•</span>
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-bold text-[#142332]">18°C</span>
          </div>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full pt-4 pb-6 sm:pt-6 sm:pb-8">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Knowledge Centre Tag */}
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs uppercase tracking-[0.28em] font-bold text-[#D46238] mb-4">
              <span className="w-6 h-[1.5px] bg-[#D46238]"></span>
              <span>KNOWLEDGE CENTRE</span>
              <span className="w-6 h-[1.5px] bg-[#D46238]"></span>
            </div>

            {/* Title with Hand-drawn Script flourish */}
            <div className="relative mb-5">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-normal leading-[1.08] text-[#142332] tracking-tight">
                  The Nepal <br />
                  <span className="italic font-light">Travel Guide</span>
                </h2>

                {/* Slanted handwritten script annotation */}
                <span className="font-script text-3xl sm:text-4xl lg:text-[42px] text-[#2D6688] -rotate-6 select-none inline-block drop-shadow-xs translate-y-1">
                  Plan Better, Travel Deeper
                </span>
              </div>
            </div>

            {/* Editorial Description */}
            <p className="text-sm sm:text-base text-[#566370] leading-relaxed mb-8 max-w-lg font-normal">
              Practical, honest, preparation guides written by local guides, mountain enthusiasts, and locals. Discover the best of Nepal with expert tips, essential information, and insider advice.
            </p>

            {/* Dark Pill CTA Button */}
            <div>
              <Link
                to="/travel-guide"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#122434] text-white text-xs sm:text-sm font-semibold hover:bg-[#1D3A50] hover:shadow-lg transition-all duration-300 group"
              >
                <span>View All Travel Guides</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. FEATURED GUIDES SLIDER SECTION                         */}
      {/* ========================================================= */}
      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Title, Subtitle, and Explore Link */}
          <div className="w-full lg:w-64 xl:w-72 flex-shrink-0 flex flex-col justify-between pt-1">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-bold text-[#D46238] mb-3">
                <span className="w-5 h-[2px] bg-[#D46238]"></span>
                <span>FEATURED TRAVEL GUIDES</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5D6B78] leading-relaxed mt-2 font-normal">
                Detailed itineraries, local insights, and expert tips to help you make the most of your Nepal journey.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link
                to="/travel-guide"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-wider font-bold text-[#142332] hover:text-[#D46238] transition-colors group"
              >
                <span className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center group-hover:border-[#D46238] group-hover:bg-[#D46238]/5 transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span>Explore All Guides</span>
              </Link>
            </div>

            {/* Desktop Navigation Arrows */}
            <div className="hidden lg:flex items-center gap-3 mt-10">
              <button
                onClick={scrollPrev}
                disabled={!canScrollLeft}
                aria-label="Previous guides"
                className="w-11 h-11 rounded-full bg-white border border-[#E2DDD5] flex items-center justify-center text-[#142332] shadow-sm hover:border-[#D46238] hover:text-[#D46238] hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollRight}
                aria-label="Next guides"
                className="w-11 h-11 rounded-full bg-white border border-[#E2DDD5] flex items-center justify-center text-[#142332] shadow-sm hover:border-[#D46238] hover:text-[#D46238] hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Cards Carousel */}
          <div className="w-full flex-grow relative">
            {/* Right Floating Arrow Button (matching reference mockup) */}
            <button
              onClick={scrollNext}
              disabled={!canScrollRight}
              aria-label="Next guides"
              className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-[#E2DDD5] items-center justify-center text-[#142332] shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:border-[#D46238] hover:text-[#D46238] hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scrollable Container with Press & Drag to Slide */}
            <div
              ref={carouselRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`flex gap-5 overflow-x-auto no-scrollbar pb-4 pt-1 select-none transition-all ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab scroll-smooth snap-x snap-mandatory'
              }`}
              style={{ touchAction: 'pan-y' }}
            >
              {articlesData.map((article) => (
                <article
                  key={article.slug}
                  onClick={handleCardClick}
                  className="w-[280px] sm:w-[295px] xl:w-[310px] flex-shrink-0 snap-start bg-white rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col group select-none"
                >
                  {/* Card Thumbnail Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 pointer-events-none select-none">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-cover pointer-events-none select-none group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Category Pill Badge (Top Left) */}
                    <div className="absolute top-3 left-3 bg-[#112332]/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      {getCategoryIcon(article.category)}
                      <span>{article.category}</span>
                    </div>

                    {/* Reading Time Badge (Top Right) */}
                    <div className="absolute top-3 right-3 bg-black/45 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Clock className="w-3 h-3 text-slate-200" />
                      <span>{article.readingTime}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-grow justify-between bg-white">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#142332] group-hover:text-[#D46238] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-[#5D6B78] line-clamp-3 leading-relaxed mt-2.5 font-normal">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Card Footer: Author Avatar, Role & Read More */}
                    <div className="mt-5 pt-3.5 border-t border-[#F0ECE6] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {article.authorAvatar && (
                          <img
                            src={article.authorAvatar}
                            alt={article.author}
                            draggable={false}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-xs pointer-events-none select-none"
                          />
                        )}
                        <div>
                          <div className="text-[11px] font-semibold text-[#142332] leading-tight">
                            By {article.author}
                          </div>
                          <div className="text-[9px] text-[#7A8895] uppercase tracking-wide">
                            {article.authorRole}
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/travel-guide/${article.slug}`}
                        onClick={handleCardClick}
                        className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wider text-[#142332] group-hover:text-[#D46238] transition-colors"
                      >
                        <span>READ MORE</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile & Tablet Arrow Controls */}
            <div className="flex lg:hidden justify-center items-center gap-4 mt-6">
              <button
                onClick={scrollPrev}
                disabled={!canScrollLeft}
                aria-label="Previous guides"
                className="w-10 h-10 rounded-full bg-white border border-[#E2DDD5] flex items-center justify-center text-[#142332] shadow-sm disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollRight}
                aria-label="Next guides"
                className="w-10 h-10 rounded-full bg-white border border-[#E2DDD5] flex items-center justify-center text-[#142332] shadow-sm disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {articlesData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-6 bg-[#142332]'
                      : 'w-2 bg-[#D9D3C7] hover:bg-[#B3ABA0]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. BOTTOM ACCENTS: SCRIPT & MOUNTAIN LINE ART             */}
        {/* ========================================================= */}
        <div className="mt-14 pt-6 border-t border-[#EAE5DC]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left subtle note */}
          <div className="flex items-center gap-2 text-xs text-[#8090A0] font-light tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#D46238]/70"></span>
            <span>Handcrafted field notes & high-altitude insights from Kathmandu</span>
          </div>

          {/* Right handwritten accent with mountain vector sketch */}
          <div className="flex items-center gap-3">
            <span className="font-script text-2xl sm:text-3xl text-[#526B7E] italic select-none">
              More Journeys, More Stories
            </span>
            <svg 
              className="w-10 h-7 text-[#526B7E]" 
              viewBox="0 0 42 26" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.6" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 23L14 7L23 18L30 10L39 23H3Z" />
              <path d="M14 7L18 13L23 18" />
              <path d="M30 10L33 15" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
