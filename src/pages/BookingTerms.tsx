import React from 'react';
import { Link } from 'react-router-dom';

export const BookingTerms: React.FC = () => {
  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#183E63] block mb-2">
            Transparency & Policies
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#17201D] font-light leading-tight">
            Booking Terms & Conditions
          </h1>
          <p className="text-base sm:text-lg text-[#59615D] mt-4 font-light leading-relaxed">
            Clear, transparent policies regarding trip confirmations, payments, date changes, weather delays, and cancellation terms.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#E2DDD5] space-y-8 text-xs sm:text-sm text-[#59615D] leading-relaxed">
          <div>
            <h2 className="font-serif text-2xl text-[#17201D] mb-3">
              1. Trip Confirmation & Deposit
            </h2>
            <p>
              To confirm a private trek or expedition, a 20% non-refundable deposit is required at the time of booking. This deposit secures your internal mountain flights (e.g. Kathmandu–Lukla), national park restricted permits, and advance lodge reservations. The remaining 80% balance is payable either via international bank wire prior to arrival or in cash/card upon arrival in Kathmandu.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#17201D] mb-3">
              2. Flexible Date Rescheduling
            </h2>
            <p>
              We understand that international flight disruptions or personal emergencies happen. You may postpone or transfer your journey dates up to 30 days before departure without incurring administrative penalties (subject to permit validity and flight reissuance fees).
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#17201D] mb-3">
              3. Himalayan Weather & Route Adjustments
            </h2>
            <p>
              Mountain weather in the Himalayas can be unpredictable. If high-altitude domestic flights (such as Lukla or Jomsom) are delayed due to weather, EcoSummit works proactively to arrange alternative routes or helicopter flights (at client’s expense or claimable via insurance). Your lead guide retains authority to modify daily itineraries if trail conditions or health considerations necessitate it.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#17201D] mb-3">
              4. Participant Health & Responsibilities
            </h2>
            <p>
              Clients must truthfully disclose pre-existing cardiovascular, respiratory, or musculoskeletal conditions prior to departure. It is the traveller’s responsibility to maintain valid passport credentials (minimum 6 months validity) and mandatory high-altitude medical evacuation insurance.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 text-xs text-[#59615D] flex justify-between">
          <Link to="/contact" className="text-[#183E63] font-semibold hover:underline">
            Questions? Contact Our Team →
          </Link>
          <span>Last Updated: 2026</span>
        </div>
      </div>
    </div>
  );
};
