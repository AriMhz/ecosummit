import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Radio, HeartPulse, ArrowRight } from 'lucide-react';
import { companyData } from '../data/company';

export const EmergencyRescue: React.FC = () => {
  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#183E63] block mb-2">
            Emergency Preparedness
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#17201D] font-light leading-tight">
            Emergency & Mountain Rescue Protocols
          </h1>
          <p className="text-base sm:text-lg text-[#59615D] mt-4 font-light leading-relaxed">
            In the remote Himalayas, preparedness is everything. How our 24/7 Kathmandu operations command and certified trail guides handle urgent medical evacuations.
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-[#59615D] leading-relaxed">
          <div className="bg-white p-8 rounded-xl border border-[#E2DDD5] space-y-4">
            <h2 className="font-serif text-2xl text-[#17201D] flex items-center gap-2">
              <Radio className="w-5 h-5 text-[#183E63]" />
              1. Field Satellite Communication
            </h2>
            <p>
              On remote trails (such as Manaslu, Upper Mustang, and high passes), our lead guides carry satellite messenger devices (Garmin inReach / Iridium networks). Even in deep gorges without cellular connectivity, guides can send coordinates and status alerts directly to our Kathmandu operations desk.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E2DDD5] space-y-4">
            <h2 className="font-serif text-2xl text-[#17201D] flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-[#183E63]" />
              2. Medical Evaluation & First Response
            </h2>
            <p>
              All lead guides have completed Wilderness First Responder (WFR) training and carry comprehensive medical kits, oral rehydration salts, pulse oximeters, and emergency descent protocol plans. If acute mountain sickness (AMS) or serious injury is identified, evacuation is immediately initiated.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E2DDD5] space-y-4">
            <h2 className="font-serif text-2xl text-[#17201D] flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-[#183E63]" />
              3. Helicopter Evacuation Dispatch
            </h2>
            <p>
              EcoSummit works with Kathmandu’s premier licensed helicopter charter services (Air Dynasty, Simrik Air, Altitude Air). Upon receiving a rescue call, our operations desk contacts your international insurance provider for guarantee of payment, dispatches the nearest high-altitude helicopter, and arranges an ambulance on the Kathmandu helipad to escort the patient directly to CIWEC or ERA International Hospital.
            </p>
          </div>

          <div className="bg-[#F7F6F1] p-6 rounded-xl border border-[#E2DDD5] text-xs text-[#17201D] space-y-2">
            <h4 className="font-medium text-sm">24/7 Emergency Kathmandu Standby:</h4>
            <p>Direct Ops Line: <strong>{companyData.contactPhone}</strong></p>
            <p>WhatsApp Ops Desk: <strong>{companyData.whatsappNumber}</strong></p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E2DDD5] flex justify-between items-center">
          <Link to="/safety-altitude" className="text-xs uppercase tracking-wider font-semibold text-[#183E63]">
            ← Safety & Altitude
          </Link>
          <Link
            to="/plan-your-trip"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#183E63] text-white text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#102942] transition-colors"
          >
            Plan Your Journey <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
