import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Users, Heart, ArrowRight } from 'lucide-react';

export const ResponsibleTravel: React.FC = () => {
  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#26483D] block mb-2">
            Sustainable Tourism Ethos
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#17201D] font-light leading-tight">
            Responsible Travel & Porter Welfare
          </h1>
          <p className="text-base sm:text-lg text-[#59615D] mt-4 font-light leading-relaxed">
            The Himalayas are fragile ecosystems and home to vulnerable indigenous communities. EcoSummit is committed to fair labor, waste reduction, and local economic benefit.
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-[#59615D] leading-relaxed">
          <div className="bg-white p-8 rounded-xl border border-[#E2DDD5] space-y-3">
            <h2 className="font-serif text-2xl text-[#17201D] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#26483D]" />
              Porter Rights & Fair Compensation
            </h2>
            <p>
              Porters are the backbone of Himalayan trekking. We adhere strictly to the guidelines of the International Porter Protection Group (IPPG):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#17201D]">
              <li>Strict weight limits: Maximum 25kg total per porter (typically 15kg for guest bag + personal gear).</li>
              <li>Fair wages well above the government minimum baseline with prompt payment upon completion.</li>
              <li>Adequate protective mountain gear provided (insulated jackets, gloves, boots, sunglasses).</li>
              <li>Comprehensive emergency medical insurance and evacuation coverage equal to guide staff.</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E2DDD5] space-y-3">
            <h2 className="font-serif text-2xl text-[#17201D] flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#26483D]" />
              Plastic Reduction & Leave No Trace
            </h2>
            <p>
              Single-use plastic bottles pose a severe environmental threat to mountain trails with zero municipal recycling infrastructure. EcoSummit encourages all guests to bring reusable insulated flasks and utilizes water purification tablets, UV SteriPENs, or boiled water provided by lodges.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E2DDD5] space-y-3">
            <h2 className="font-serif text-2xl text-[#17201D] flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#26483D]" />
              Direct Economic Benefit to Mountain Families
            </h2>
            <p>
              We patronize family-run teahouses and lodges rather than conglomerate chains, ensuring your travel expenditure directly supports local Sherpa, Tamang, and Gurung households, school fees, and local community infrastructure.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E2DDD5] flex justify-between items-center">
          <Link to="/about" className="text-xs uppercase tracking-wider font-semibold text-[#183E63]">
            ← Learn More About Us
          </Link>
          <Link
            to="/plan-your-trip"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#183E63] text-white text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#102942] transition-colors"
          >
            Plan an Ethical Trip <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
