import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { destinationsData } from '../data/destinations';
import { MapPin, ArrowRight, Compass, Calendar, CheckCircle2 } from 'lucide-react';

export const Destinations: React.FC = () => {
  const [selectedCorridor, setSelectedCorridor] = useState<string>('all');

  const corridorFilters = [
    { id: 'all', label: 'All Regions' },
    { id: 'himalayan', label: 'High Himalayan Corridors' },
    { id: 'remote', label: 'Restricted & Trans-Himalayan' },
    { id: 'cultural', label: 'Cultural Valleys & Terai' },
  ];

  const filteredDestinations = destinationsData.filter((dest) => {
    if (selectedCorridor === 'all') return true;
    if (selectedCorridor === 'himalayan') {
      return ['everest-khumbu', 'annapurna-sanctuary', 'langtang-valley'].includes(dest.slug);
    }
    if (selectedCorridor === 'remote') {
      return ['manaslu-circuit', 'upper-mustang'].includes(dest.slug);
    }
    if (selectedCorridor === 'cultural') {
      return ['kathmandu-valley', 'pokhara-valley', 'chitwan-national-park'].includes(dest.slug);
    }
    return true;
  });

  return (
    <div className="bg-[#FAF8F5] text-[#142332] min-h-screen pt-28 md:pt-36 pb-24">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183E63]/10 text-[#183E63] text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Nepal Geographical Corridors & Microclimates</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#142332] font-light leading-tight">
            Nepal Destinations & Sanctuaries
          </h1>

          <p className="text-base sm:text-lg text-[#566370] font-light leading-relaxed">
            From the high alpine glaciers of the Khumbu to the wind-carved rain-shadow desert of Upper Mustang and the subtropical tiger jungles of Chitwan. Explore Nepal's extraordinary microclimates, sacred monasteries, and dramatic vertical relief.
          </p>
        </div>

        {/* Corridor Filter Bar */}
        <div className="flex items-center gap-2 pb-8 mb-10 border-b border-[#E8E2D8] overflow-x-auto no-scrollbar text-xs">
          {corridorFilters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCorridor(tab.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
                selectedCorridor === tab.id
                  ? 'bg-[#142332] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#566370] hover:bg-[#EAE5DC] border border-[#E8E2D8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <Link
              key={dest.slug}
              to={`/destinations/${dest.slug}`}
              className="group bg-white border border-[#E8E2D8] rounded-3xl overflow-hidden hover:border-[#183E63]/40 transition-all duration-500 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] flex flex-col"
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                    <MapPin className="w-3 h-3 text-[#D46238]" />
                    <span>{dest.name.split(' ')[0]}</span>
                  </span>

                  {dest.unescoStatus && (
                    <span className="bg-[#2E7D32]/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border border-white/20">
                      UNESCO
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#CBA46E] block font-semibold">
                      {dest.elevationRange ? dest.elevationRange.split('(')[0] : 'High Altitude'}
                    </span>
                    <span className="font-mono text-xs text-white/80">
                      {dest.journeyCount} Curated Itineraries
                    </span>
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 text-white">
                    From {dest.startingPrice || '$850'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex flex-col flex-grow justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[11px] text-[#8C5D38] font-serif italic tracking-wide block">
                    "{dest.subtitle}"
                  </span>

                  <h3 className="font-serif text-2xl text-[#142332] group-hover:text-[#183E63] transition-colors font-medium">
                    {dest.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#566370] line-clamp-3 leading-relaxed font-light">
                    {dest.description}
                  </p>

                  {/* Highlights Pill Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {dest.highlights.slice(0, 2).map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[11px] text-[#183E63] bg-[#183E63]/5 px-2.5 py-1 rounded-lg border border-[#183E63]/10"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#2E7D32]" />
                        <span className="truncate max-w-[200px]">{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-[#EAE5DC] flex items-center justify-between text-xs">
                  <span className="text-[#566370] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D46238]" />
                    <span>Best: <strong className="text-[#142332]">{dest.bestSeason.split('(')[0].split('&')[0]}</strong></span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-bold text-[#183E63] group-hover:text-[#D46238] group-hover:translate-x-1 transition-all">
                    Explore Region <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
