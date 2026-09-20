import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mountain, Check } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-[#F7F6F1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Editorial Image with Floating Accent */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-[#E2DDD5]">
              <img
                src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=85"
                alt="Sherpa guide and foreign traveller walking along mountain trail in Nepal"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping Editorial Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-6 rounded-xl border border-[#E2DDD5] shadow-lg max-w-[260px] hidden sm:block">
              <div className="flex items-center gap-2 text-[#183E63] font-serif text-lg mb-1">
                <Mountain className="w-5 h-5" />
                <span>Locally Grounded</span>
              </div>
              <p className="text-xs text-[#59615D] leading-relaxed">
                Headquartered in Kathmandu, with mountain guides native to the Khumbu, Annapurna and Langtang corridors.
              </p>
            </div>
          </div>

          {/* Right Column: Magazine Story Feature */}
          <div className="lg:col-span-6 lg:pl-4 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#26483D]">
              <span className="w-6 h-[1.5px] bg-[#26483D]" />
              Our Philosophy & Heritage
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#17201D] font-light leading-[1.15]">
              Nepal, Planned by People <br />
              <span className="italic font-normal">Who Call It Home</span>
            </h2>

            <p className="text-base sm:text-lg text-[#59615D] leading-relaxed font-light">
              EcoSummit creates thoughtful Himalayan journeys for travellers who want to experience Nepal with confidence, comfort, and genuine local insight. From classic treks and cultural tours to private journeys and peak climbing, every trip is carefully planned around the traveller’s pace, interests, and experience.
            </p>

            <p className="text-sm sm:text-base text-[#59615D] leading-relaxed">
              We reject high-volume, generic tour packaging. Mountain travel in the Himalayas requires nuanced preparation, physiological respect for altitude, and deep familiarity with mountain communities. By working directly with us in Kathmandu, foreign guests receive honest advice, flexible pacing, and sincere Himalayan care.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#17201D]">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#A5B38A]/20 flex items-center justify-center text-[#26483D]">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                <span>Direct communication with local planners</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#A5B38A]/20 flex items-center justify-center text-[#26483D]">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                <span>Certified wilderness medical first responders</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#A5B38A]/20 flex items-center justify-center text-[#26483D]">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                <span>Ethical porter treatment & fair wages</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#A5B38A]/20 flex items-center justify-center text-[#26483D]">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                <span>Customised acclimatisation schedules</span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#17201D] text-white hover:bg-[#183E63] text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors duration-200"
              >
                Our Story & Team
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
