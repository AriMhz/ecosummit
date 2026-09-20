import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, AlertTriangle, Check, ArrowRight } from 'lucide-react';

export const TravelInsurance: React.FC = () => {
  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#183E63] block mb-2">
            Essential Requirements
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#17201D] font-light leading-tight">
            Travel & High-Altitude Medical Insurance
          </h1>
          <p className="text-base sm:text-lg text-[#59615D] mt-4 font-light leading-relaxed">
            Comprehensive travel insurance with explicit coverage for high-altitude trekking and emergency helicopter rescue is mandatory for all EcoSummit participants.
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-[#59615D] leading-relaxed">
          <div className="bg-[#183E63]/5 border border-[#183E63]/20 p-8 rounded-xl space-y-4">
            <h2 className="font-serif text-2xl text-[#17201D] flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#183E63]" />
              Mandatory Policy Coverage Checklist
            </h2>
            <p className="text-xs sm:text-sm text-[#17201D]">
              Prior to departure, our Kathmandu office verifies that your policy document contains:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#17201D]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#26483D] shrink-0 mt-0.5" />
                <span><strong>Altitude Limit:</strong> Explicit coverage up to 6,000m (for EBC/Annapurna/Manaslu) or 6,500m (for Peak climbing). Standard travel policies often cap at 2,500m or 3,000m.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#26483D] shrink-0 mt-0.5" />
                <span><strong>Emergency Helicopter Evacuation:</strong> Direct cashless guarantee or swift reimbursement authorization for mountain helicopter extraction.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#26483D] shrink-0 mt-0.5" />
                <span><strong>Inpatient Hospitalization & Repatriation:</strong> Full medical treatment at certified hospitals in Kathmandu (e.g., CIWEC Hospital, ERA Hospital).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#26483D] shrink-0 mt-0.5" />
                <span><strong>Trip Cancellation & Delay:</strong> Compensation for weather-related flight delays (such as Lukla weather holds).</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E2DDD5] space-y-4">
            <h2 className="font-serif text-2xl text-[#17201D] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#C6B59A]" />
              Recommended International Providers
            </h2>
            <p className="text-xs sm:text-sm">
              While EcoSummit does not sell insurance policies directly, our past international guests have successfully used:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#17201D]">
              <li><strong>Global Rescue</strong> (Worldwide high-altitude and medical extraction specialist)</li>
              <li><strong>Ripcord Rescue Travel Insurance</strong> (Comprehensive alpine evacuation)</li>
              <li><strong>World Nomads</strong> (Explorer Plan with high-altitude upgrade option)</li>
              <li><strong>Allianz Global Assistance / AXA</strong> (Ensure high-altitude alpine rider is added)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E2DDD5] flex justify-between items-center">
          <Link to="/safety-altitude" className="text-xs uppercase tracking-wider font-semibold text-[#183E63]">
            ← Wilderness Safety Protocols
          </Link>
          <Link
            to="/plan-your-trip"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#183E63] text-white text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#102942] transition-colors"
          >
            Ask Our Team <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
