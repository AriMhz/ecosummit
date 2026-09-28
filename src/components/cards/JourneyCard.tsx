import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Mountain, ArrowRight, Heart, Star } from 'lucide-react';
import type { Journey } from '../../types';

interface JourneyCardProps {
  journey: Journey;
  variant?: 'editorial' | 'horizontal';
  imageAspect?: 'landscape' | 'balanced' | 'square' | 'portrait';
}

export const JourneyCard: React.FC<JourneyCardProps> = ({
  journey,
  variant = 'editorial',
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const detailPath =
    journey.category === 'trek'
      ? `/treks/${journey.slug}`
      : journey.category === 'tour'
      ? `/tours/${journey.slug}`
      : `/expeditions/${journey.slug}`;

  // Clean formatted price, e.g. "US$ 1,890" matching reference images
  const formattedPrice = (() => {
    if (!journey.startingPrice) return 'Custom Quote';
    const num = parseInt(journey.startingPrice.replace(/[^0-9]/g, ''), 10);
    return !isNaN(num) && num > 0 ? `US$ ${num.toLocaleString()}` : journey.startingPrice;
  })();

  // ── HORIZONTAL VARIANT (List view) ──
  if (variant === 'horizontal') {
    return (
      <Link
        to={detailPath}
        className="group flex flex-col md:flex-row bg-white border border-[#E8E2D8] hover:border-[#E85D2A]/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="md:w-2/5 relative overflow-hidden aspect-[16/11] md:aspect-auto">
          <img
            src={journey.featuredImage}
            alt={journey.title}
            loading="lazy"
            className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-3 left-3 bg-[#142332]/85 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
            <MapPin className="w-3 h-3 text-[#E85D2A]" />
            <span>{journey.region || 'Nepal'}</span>
          </div>
        </div>

        <div className="md:w-3/5 p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-2.5">
              <span className="flex items-center gap-1.5 font-semibold text-[#142332]">
                <Calendar className="w-3.5 h-3.5 text-[#E85D2A]" /> {journey.duration}
              </span>
              <span>•</span>
              <span className="bg-[#FAF8F5] border border-[#E8E2D8] text-[#142332] font-semibold px-2 py-0.5 rounded text-[11px]">
                {journey.difficulty}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-600">
                <Mountain className="w-3.5 h-3.5 text-slate-400" /> {journey.maxAltitude}
              </span>
            </div>

            <h3
              style={{ fontFamily: 'var(--font-simplon), var(--font-sans), sans-serif' }}
              className="!font-sans text-2xl sm:text-[26px] font-extrabold text-[#142332] group-hover:text-[#E85D2A] transition-colors leading-tight tracking-tight"
            >
              {journey.title}
            </h3>
          </div>

          <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between">
            <div>
              <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-bold block">
                Starting From
              </span>
              <span className="text-2xl font-black text-[#E85D2A] tracking-tight">
                {formattedPrice} <span className="text-xs font-normal text-slate-500">/ person</span>
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF8F5] group-hover:bg-[#E85D2A] border border-[#E8E2D8] group-hover:border-[#E85D2A] text-xs font-bold text-[#142332] group-hover:text-white transition-all duration-300 shadow-2xs">
              <span>View Detail</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // ── FULL-BLEED LUXURY CARD (ZERO BULKY WHITE BOX, CINEMATIC HIMALAYAN DESIGN) ──
  return (
    <Link
      to={detailPath}
      className="group relative flex flex-col justify-between h-[490px] sm:h-[510px] rounded-[24px] overflow-hidden bg-[#102942] border border-black/10 hover:border-[#E85D2A]/70 shadow-[0_10px_30px_rgba(16,41,66,0.12)] hover:shadow-[0_24px_50px_rgba(16,41,66,0.30)] hover:-translate-y-1.5 transition-all duration-500 select-none cursor-pointer"
    >
      {/* ── FULL-BLEED BACKGROUND PHOTO ── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#102942]">
        <img
          src={journey.featuredImage}
          alt={journey.title}
          loading="lazy"
          className="w-full h-full object-cover object-[center_30%] group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Top soft vignette for badge contrast */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 via-black/25 to-transparent pointer-events-none" />

        {/* Bottom deep luxury gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black/95 via-black/80 via-50% to-transparent pointer-events-none" />
      </div>

      {/* ── TOP BADGES ROW ── */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between pointer-events-auto">
        {/* Region Pill */}
        <span className="bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 shadow-md">
          <MapPin className="w-3.5 h-3.5 text-[#E85D2A]" />
          <span className="truncate max-w-[170px]">{journey.region || 'Nepal'}</span>
        </span>

        {/* Interactive Wishlist Heart Button */}
        <button
          type="button"
          aria-label="Save to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className="w-9 h-9 rounded-full bg-black/45 hover:bg-white text-white hover:text-[#E85D2A] backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-md cursor-pointer"
        >
          <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-[#E85D2A] text-[#E85D2A]' : ''}`} />
        </button>
      </div>

      {/* ── BOTTOM CONTENT OVERLAY (NO WHITE BOX!) ── */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end">
        {/* Meta badges: Duration, Grade, Altitude & Rating */}
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-[11px] font-semibold border border-white/15">
            <Calendar className="w-3 h-3 text-[#E85D2A]" />
            <span>{journey.duration}</span>
          </span>

          {journey.difficulty && (
            <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-md text-[#FED7AA] px-2.5 py-1 rounded-md text-[11px] font-bold border border-white/15">
              <span>Grade: {journey.difficulty}</span>
            </span>
          )}

          {journey.maxAltitude && (
            <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md text-white/85 px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/10 hidden sm:inline-flex">
              <Mountain className="w-3 h-3 text-white/70" />
              <span>Max {journey.maxAltitude.split(' ')[0]}</span>
            </span>
          )}

          <div className="ml-auto flex items-center gap-1 text-amber-400 font-bold text-xs bg-black/40 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>5.0</span>
            <span className="text-white/60 font-normal text-[10px]">(48)</span>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{ fontFamily: 'var(--font-simplon), var(--font-sans), sans-serif' }}
          className="!font-sans text-xl sm:text-[22px] font-extrabold text-white group-hover:text-[#F6AD55] transition-colors leading-snug tracking-tight mb-3 line-clamp-2"
        >
          {journey.title}
        </h3>

        {/* Bottom Price & CTA Row */}
        <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/60 font-bold block leading-none">
              Estimated From
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-2xl font-black text-[#F6AD55] font-sans tracking-tight">
                {formattedPrice}
              </span>
              <span className="text-xs text-white/75 font-semibold">/ pax</span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 group-hover:bg-[#E85D2A] text-white text-xs font-bold transition-all duration-300 border border-white/20 group-hover:border-[#E85D2A] shadow-xs shrink-0">
            <span>View Detail</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};
