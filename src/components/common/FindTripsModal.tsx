import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Clock, Mountain, Gauge, ArrowRight } from 'lucide-react';
import { allJourneys } from '../../data/journeys';

interface FindTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FindTripsModal: React.FC<FindTripsModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  if (!isOpen) return null;

  const filtered = allJourneys.filter((j) => {
    const matchesQuery =
      query === '' ||
      j.title.toLowerCase().includes(query.toLowerCase()) ||
      j.region.toLowerCase().includes(query.toLowerCase()) ||
      j.shortDescription.toLowerCase().includes(query.toLowerCase());

    const matchesRegion =
      selectedRegion === 'All' ||
      j.region.toLowerCase().includes(selectedRegion.toLowerCase());

    const matchesDifficulty =
      selectedDifficulty === 'All' || j.difficulty === selectedDifficulty;

    return matchesQuery && matchesRegion && matchesDifficulty;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
      <div
        className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden border border-[#E2DDD5] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E2DDD5] flex items-center justify-between bg-[#F7F6F1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#183E63] text-white flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#17201D]">Find Your Himalayan Journey</h3>
              <p className="text-xs text-[#59615D]">Search by region, duration, or trip type</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/5 text-[#59615D] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-6 space-y-4 bg-white border-b border-[#E2DDD5]">
          <div className="relative">
            <Search className="w-5 h-5 text-[#59615D] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by keywords (e.g. Everest, Annapurna, luxury, 14 days)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#F7F6F1] border border-[#E2DDD5] rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#17201D] focus:outline-none focus:border-[#183E63]"
              autoFocus
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-[#59615D] font-medium uppercase tracking-wider">Region:</span>
            {['All', 'Everest', 'Annapurna', 'Manaslu', 'Langtang', 'Kathmandu'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-lg border transition-colors ${
                  selectedRegion === reg
                    ? 'bg-[#183E63] text-white border-[#183E63]'
                    : 'bg-white text-[#59615D] border-[#E2DDD5] hover:bg-[#F7F6F1]'
                }`}
              >
                {reg}
              </button>
            ))}

            <span className="text-[#59615D] font-medium uppercase tracking-wider ml-2">Difficulty:</span>
            {['All', 'Easy', 'Moderate', 'Challenging', 'Strenuous'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg border transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-[#26483D] text-white border-[#26483D]'
                    : 'bg-white text-[#59615D] border-[#E2DDD5] hover:bg-[#F7F6F1]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="p-6 max-h-[50vh] overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-xs text-[#59615D] mb-2">
            <span>Showing {filtered.length} matched journeys</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#59615D]">
              <p className="text-sm">No journeys found matching your search.</p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedRegion('All');
                  setSelectedDifficulty('All');
                }}
                className="mt-3 text-xs font-semibold text-[#183E63] underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filtered.map((j) => (
              <Link
                key={j.slug}
                to={
                  j.category === 'trek'
                    ? `/treks/${j.slug}`
                    : j.category === 'tour'
                    ? `/tours/${j.slug}`
                    : `/expeditions/${j.slug}`
                }
                onClick={onClose}
                className="group flex items-center justify-between p-3.5 rounded-xl border border-[#E2DDD5] hover:border-[#183E63]/40 hover:bg-[#F7F6F1]/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={j.featuredImage}
                    alt={j.title}
                    className="w-16 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-serif text-lg text-[#17201D] group-hover:text-[#183E63] transition-colors leading-snug">
                      {j.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-[#59615D] mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#183E63]" /> {j.duration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-[#183E63]" /> {j.difficulty}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Mountain className="w-3 h-3 text-[#183E63]" /> {j.region}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {j.startingPrice && (
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] text-[#59615D] uppercase block">from</span>
                      <strong className="text-sm text-[#17201D]">{j.startingPrice}</strong>
                    </div>
                  )}
                  <div className="w-8 h-8 rounded-full bg-[#F7F6F1] flex items-center justify-center text-[#183E63] group-hover:bg-[#183E63] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7F6F1] border-t border-[#E2DDD5] flex items-center justify-between text-xs text-[#59615D]">
          <span>Can't find what you are looking for?</span>
          <Link
            to="/plan-your-trip"
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-semibold text-[#183E63] hover:underline"
          >
            Request a Custom Tailored Itinerary →
          </Link>
        </div>
      </div>
    </div>
  );
};
