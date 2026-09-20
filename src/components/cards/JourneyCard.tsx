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
  imageAspect = 'balanced',
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

  // Aspect ratio class for the card photo
  const aspectClass =
    imageAspect === 'portrait'
      ? 'aspect-[4/5]'
      : imageAspect === 'square'
      ? 'aspect-square'
      : imageAspect === 'landscape'
      ? 'aspect-[16/11]'
      : 'aspect-[16/13] sm:aspect-[16/12]'; // Taller, longer image with natural mountain framing

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

  // ── STANDARD HIGH-CONVERTING CARD (MATCHING REAL AGENCY REFERENCE IMAGES) ──
  return (
    <Link
      to={detailPath}
      className="group flex flex-col bg-white border border-[#E8E2D8] hover:border-[#E85D2A]/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* ── PHOTO CONTAINER (TALLER / LONGER IMAGE) ── */}
      <div className={`relative ${aspectClass} overflow-hidden bg-[#EAE8E1]`}>
        <img
          src={journey.featuredImage}
          alt={journey.title}
          loading="lazy"
          className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Subtle bottom gradient for badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges Row */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-auto">
          {/* Destination / Region Pill */}
          <span className="bg-[#142332]/90 backdrop-blur-md text-white text-xs sm:text-[12.5px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm border border-white/15">
            <MapPin className="w-3.5 h-3.5 text-[#E85D2A]" />
            <span>{journey.region || 'Nepal'}</span>
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
            className="w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-[#E85D2A] backdrop-blur-md flex items-center justify-center transition-all shadow-sm cursor-pointer"
          >
            <Heart className={`w-4.5 h-4.5 transition-colors ${isSaved ? 'fill-[#E85D2A] text-[#E85D2A]' : ''}`} />
          </button>
        </div>

        {/* Bottom Photo Overlay Row (Days & Difficulty) */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white pointer-events-none">
          {/* Days / Duration */}
          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-bold border border-white/15 shadow-sm">
            <Calendar className="w-4 h-4 text-[#E85D2A]" />
            <span>{journey.duration}</span>
          </div>

          {/* Difficulty Badge */}
          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-semibold border border-white/15 shadow-sm">
            <span className="text-white/75 text-[11px] uppercase tracking-wide font-mono">Grade:</span>
            <span className="font-extrabold text-[#FED7AA]">{journey.difficulty}</span>
          </div>
        </div>
      </div>

      {/* ── CARD CONTENT (NO DESCRIPTION! PUNCHY, CLEAN AGENCY DESIGN) ── */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-4">
        <div className="space-y-3">
          {/* Rating and Altitude Meta Row */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-sans">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <Mountain className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Max {journey.maxAltitude ? journey.maxAltitude.split(' ')[0] : '4,130m'}</span>
            </div>

            <div className="flex items-center gap-1 text-amber-600 font-bold text-xs sm:text-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>5.0</span>
              <span className="text-slate-400 font-normal text-xs">(48)</span>
            </div>
          </div>

          {/* Title: Clean, modern, authoritative bold sans-serif, significantly larger */}
          <h3
            style={{ fontFamily: 'var(--font-simplon), var(--font-sans), sans-serif' }}
            className="!font-sans text-xl sm:text-[22px] lg:text-[23px] font-extrabold text-[#142332] group-hover:text-[#E85D2A] transition-colors leading-snug line-clamp-2 tracking-tight"
          >
            {journey.title}
          </h3>
        </div>

        {/* ── BOTTOM PRICE & CTA ROW ── */}
        <div className="pt-4 border-t border-[#F0ECE1] flex items-end justify-between gap-2">
          {/* Price: Big, Bold, Highlighted Terracotta */}
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-500 font-bold block leading-tight">
              Estimated From
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl sm:text-[28px] font-black text-[#E85D2A] tracking-tight leading-none font-sans">
                {formattedPrice}
              </span>
              <span className="text-xs sm:text-[13px] text-slate-500 font-semibold">/ pax</span>
            </div>
          </div>

          {/* View Detail Pill Button */}
          <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF8F5] group-hover:bg-[#E85D2A] border border-[#E2DDD5] group-hover:border-[#E85D2A] text-xs sm:text-sm font-bold text-[#142332] group-hover:text-white transition-all duration-300 shadow-2xs shrink-0">
            <span>View Detail</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};
