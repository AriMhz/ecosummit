import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, AlertCircle, ArrowRight, Activity, Thermometer } from 'lucide-react';

export const SafetyAltitude: React.FC = () => {
  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#26483D] block mb-2">
            Wilderness Protocols
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#17201D] font-light leading-tight">
            Safety & High-Altitude Guidelines
          </h1>
          <p className="text-base sm:text-lg text-[#59615D] mt-4 font-light leading-relaxed">
            Walking through high Himalayan passes is an extraordinary experience when approached with clinical respect for physiological adaptation. Here is our comprehensive safety framework.
          </p>
        </div>

        <div className="space-y-12 text-sm sm:text-base text-[#59615D] leading-relaxed">
          {/* Protocol 1 */}
          <div className="bg-white p-8 rounded-xl border border-[#E2DDD5] space-y-4">
            <div className="flex items-center gap-3 text-[#183E63]">
              <HeartPulse className="w-6 h-6" />
              <h2 className="font-serif text-2xl text-[#17201D]">
                1. Daily Physiological Health Screenings
              </h2>
            </div>
            <p>
              On every high-altitude journey above 3,000m, our lead guides conduct morning and evening health assessments. Using medical-grade pulse oximeters, we measure resting blood oxygen saturation (SpO2) and heart rate. Results are logged alongside the international Lake Louise Acute Mountain Sickness (AMS) score to detect early signs of physiological distress before they develop into acute symptoms.
            </p>
          </div>

          {/* Protocol 2 */}
          <div className="bg-white p-8 rounded-xl border border-[#E2DDD5] space-y-4">
            <div className="flex items-center gap-3 text-[#183E63]">
              <Activity className="w-6 h-6" />
              <h2 className="font-serif text-2xl text-[#17201D]">
                2. The "Climb High, Sleep Low" Acclimatisation Rule
              </h2>
            </div>
            <p>
              Our itineraries are deliberately paced with conservative sleeping elevation gains—rarely exceeding 400–500m of net sleep elevation increase per day above 3,000m. Dedicated acclimatisation days include active, moderate day hikes to higher viewpoints (such as Hotel Everest View at 3,880m or Nangkartshang Peak at 5,000m) before returning to lower teahouses to sleep.
            </p>
          </div>

          {/* Protocol 3 */}
          <div className="bg-white p-8 rounded-xl border border-[#E2DDD5] space-y-4">
            <div className="flex items-center gap-3 text-[#183E63]">
              <Thermometer className="w-6 h-6" />
              <h2 className="font-serif text-2xl text-[#17201D]">
                3. Hydration, Nutrition & Cold Protection
              </h2>
            </div>
            <p>
              At high altitude, moisture is lost rapidly through rapid exhalation and dry mountain winds. We require guests to consume a minimum of 3.5 to 4 liters of clean fluids daily, emphasizing hot lemon, garlic soup, and electrolyte water. Alcohol, sedatives, and smoking are strongly discouraged on high trails.
            </p>
          </div>

          {/* Protocol 4 */}
          <div className="bg-white p-8 rounded-xl border border-[#E2DDD5] space-y-4">
            <div className="flex items-center gap-3 text-[#183E63]">
              <AlertCircle className="w-6 h-6 text-[#26483D]" />
              <h2 className="font-serif text-2xl text-[#17201D]">
                4. The Golden Rule of Descent
              </h2>
            </div>
            <p>
              If a traveller displays symptoms of moderate-to-severe AMS (persistent severe headache, ataxia/loss of coordination, confusion, or persistent vomiting), the single non-negotiable rule is <strong>immediate descent to lower elevation</strong>. No summit or itinerary milestone ever takes precedence over personal life and safety.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-[#E2DDD5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/travel-insurance"
            className="text-xs uppercase tracking-wider font-semibold text-[#183E63] hover:underline"
          >
            Read Insurance Requirements →
          </Link>
          <Link
            to="/plan-your-trip"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#183E63] text-white text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#102942] transition-colors"
          >
            Plan a Safe Journey <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
