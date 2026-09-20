import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { companyData } from '../../data/company';

export const FinalCTA: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    destination: 'Everest Base Camp & Gokyo',
    travelMonth: 'Autumn (Sep–Nov)',
    travellers: '2 Travellers',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="plan-trip" className="relative py-20 sm:py-24 lg:py-28 bg-[#FAF8F5] text-[#142332] overflow-hidden border-t border-[#EAE5DC]/80">
      {/* ── 1. Topographic Elevation Contour Lines Background (Top-Right & Bottom-Left) ── */}
      {/* Top-Right Rich Topographic Contours with Elevation Annotations & Trail */}
      <div className="absolute top-0 right-0 w-[420px] sm:w-[540px] lg:w-[680px] h-[400px] sm:h-[500px] lg:h-[620px] pointer-events-none select-none z-0 overflow-hidden">
        <svg viewBox="0 0 600 520" fill="none" stroke="#CBA46E" className="w-full h-full">
          {/* Contour Lines with progressive depth */}
          <path d="M 80 40 C 180 20, 290 80, 380 60 C 470 40, 540 100, 600 130" strokeWidth="1" opacity="0.2" />
          <path d="M 60 90 C 170 65, 280 130, 380 110 C 480 90, 530 160, 600 190" strokeWidth="1.1" opacity="0.3" />
          <path d="M 50 145 C 160 115, 270 185, 380 165 C 470 145, 520 220, 600 250" strokeWidth="1.2" opacity="0.4" />
          <path d="M 40 200 C 150 170, 260 240, 380 215 C 480 195, 510 280, 600 310" strokeWidth="1.1" opacity="0.3" />
          <path d="M 30 260 C 140 225, 250 295, 370 270 C 470 245, 500 340, 600 370" strokeWidth="1" opacity="0.2" />
          
          {/* Elevation Markers */}
          <text x="390" y="58" fill="#CBA46E" fontSize="9" opacity="0.5" fontFamily="monospace" letterSpacing="1">4,200m</text>
          <text x="390" y="108" fill="#CBA46E" fontSize="9" opacity="0.6" fontFamily="monospace" letterSpacing="1">4,800m</text>
          <text x="390" y="163" fill="#CBA46E" fontSize="9" opacity="0.7" fontFamily="monospace" letterSpacing="1">5,364m [EBC]</text>

          {/* Dotted Expedition Trail Route */}
          <path
            d="M 120 260 C 190 200, 240 210, 310 140 C 370 80, 440 95, 520 40"
            stroke="#D46238"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.55"
          />
          {/* Waypoint markers */}
          <circle cx="310" cy="140" r="3.5" fill="#D46238" opacity="0.8" />
          <text x="320" y="137" fill="#D46238" fontSize="8.5" fontWeight="bold" opacity="0.8" letterSpacing="1">NAMCHE 3,440m</text>

          <circle cx="520" cy="40" r="3.5" fill="#D46238" opacity="0.8" />
          <text x="460" y="32" fill="#D46238" fontSize="8.5" fontWeight="bold" opacity="0.8" letterSpacing="1">SUMMIT CAMP</text>
        </svg>
      </div>

      {/* Bottom-Left Topographic Contour Waves */}
      <div className="absolute -bottom-12 -left-12 w-80 sm:w-96 lg:w-[480px] h-80 sm:h-96 lg:h-[480px] pointer-events-none select-none z-0 overflow-hidden">
        <svg viewBox="0 0 450 450" fill="none" stroke="#A69C8E" className="w-full h-full">
          <path d="M 10 260 C 90 240, 160 210, 240 230 C 320 250, 380 200, 440 180" strokeWidth="1" opacity="0.2" />
          <path d="M 0 310 C 80 285, 160 255, 250 280 C 330 300, 380 250, 445 235" strokeWidth="1.1" opacity="0.28" />
          <path d="M -10 360 C 80 335, 170 305, 260 330 C 340 350, 390 300, 450 290" strokeWidth="1.2" opacity="0.38" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* ── Left Column: Editorial Context, Pillars & Live WhatsApp ── */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow & Coordinates */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-bold text-[#D46238]">
                  <span className="w-6 h-[1.5px] bg-[#D46238]"></span>
                  <span>BEGIN YOUR JOURNEY</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#8A96A0] uppercase hidden sm:inline">
                  27°42'N • 85°19'E
                </span>
              </div>

              {/* Title with Handwritten script annotation */}
              <div className="relative mb-4">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#142332] font-normal leading-[1.12] tracking-tight">
                  Not Sure Which Journey <br />
                  <span className="italic font-light">Is Right for You?</span>
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <span className="font-script text-2xl sm:text-[26px] text-[#3A6B88] -rotate-2 select-none inline-block font-medium">
                    Every Summit Starts With a Conversation
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-[#566370] leading-relaxed font-normal mb-6">
                Tell us your preferred travel season, personal fitness, and mountain dreams. Our Kathmandu expedition directors will craft an unhurried, custom route tailored exactly to your pace and aspirations.
              </p>

              {/* 3 Compact Editorial Trust Pillars */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 sm:p-3.5 bg-white/90 backdrop-blur-xs rounded-2xl border border-[#EAE5DC] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#CBA46E]/60 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-[#183E63]/10 text-[#183E63] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#183E63]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#142332] text-xs sm:text-[13px]">
                      Direct Local Expertise & Fair Value
                    </h4>
                    <p className="text-[11px] text-[#5D6B78] mt-0.5 leading-relaxed">
                      Operated by veteran Sherpa mountain guides and Kathmandu logistics directors — transparent pricing with no intermediaries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 sm:p-3.5 bg-white/90 backdrop-blur-xs rounded-2xl border border-[#EAE5DC] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#CBA46E]/60 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-[#D46238]/10 text-[#D46238] flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-4 h-4 text-[#D46238]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#142332] text-xs sm:text-[13px]">
                      Safety & Acclimatisation Priority
                    </h4>
                    <p className="text-[11px] text-[#5D6B78] mt-0.5 leading-relaxed">
                      Custom conservative ascent schedules, pulse oximetry tracking, and round-the-clock emergency helicopter standby.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 sm:p-3.5 bg-white/90 backdrop-blur-xs rounded-2xl border border-[#EAE5DC] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#CBA46E]/60 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#2E7D32]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#142332] text-xs sm:text-[13px]">
                      Thoughtful Response Within 24h
                    </h4>
                    <p className="text-[11px] text-[#5D6B78] mt-0.5 leading-relaxed">
                      A dedicated planner reviews your dates and provides realistic itinerary ideas and full transparent breakdowns within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Quick Chat Capsule (bottom of left column) */}
            <div className="pt-4 mt-4 border-t border-[#EAE5DC]/80">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0E201B] text-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#25D366] border-2 border-[#0E201B] rounded-full animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-wide flex items-center gap-1.5">
                      <span>Prefer a fast conversation?</span>
                    </div>
                    <div className="text-[10.5px] text-[#86A89B]">
                      Kathmandu team online • GMT +5:45
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${companyData.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5B] text-slate-950 text-[11px] uppercase tracking-wider font-bold rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Right Column: High-End Custom Trip Enquiry Card ── */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-md border border-[#E8E2D8] p-6 sm:p-8 lg:p-9 rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.06)] relative overflow-hidden flex flex-col justify-between">
            {/* Top accent bar & consultation tag */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D46238]" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#D46238] uppercase">
                  Bespoke Journey
                </span>
              </div>
              <span className="text-xs text-[#2E7D32] font-semibold flex items-center gap-1.5 bg-[#2E7D32]/10 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complimentary Consultation</span>
              </span>
            </div>

            <div className="mb-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#142332] font-semibold tracking-tight">
                Design Your Himalayan Journey
              </h3>
              <p className="text-xs sm:text-sm text-[#5D6B78] mt-1.5 leading-relaxed">
                No obligations. Share your travel ideas and our Kathmandu team will craft your personal itinerary within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="py-16 text-center space-y-4 my-auto">
                <div className="w-16 h-16 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-serif text-3xl text-[#142332] font-normal">
                  Enquiry Received
                </h4>
                <p className="text-xs sm:text-sm text-[#5D6B78] max-w-md mx-auto leading-relaxed">
                  Namaste <strong>{formData.name}</strong>. Our Kathmandu planning team has received your brief and will respond within 24 hours with a thoughtful custom route itinerary.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#183E63] font-bold hover:text-[#D46238] transition-colors pt-4 cursor-pointer"
                >
                  <span>Send another enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
                {/* Row 1: Full Name & Email / WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#142332] mb-1.5">
                      Full Name <span className="text-[#D46238]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Thomas Davies"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#142332] placeholder-[#8A96A0] focus:outline-none focus:bg-white focus:border-[#D46238] focus:ring-2 focus:ring-[#D46238]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#142332] mb-1.5">
                      Email or WhatsApp <span className="text-[#D46238]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. thomas@domain.com or +44..."
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#142332] placeholder-[#8A96A0] focus:outline-none focus:bg-white focus:border-[#D46238] focus:ring-2 focus:ring-[#D46238]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Destination, Season, Group Size */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#142332] mb-1.5">
                      Destination or Trek
                    </label>
                    <div className="relative">
                      <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full appearance-none bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl px-3.5 py-3 text-xs sm:text-sm text-[#142332] focus:outline-none focus:bg-white focus:border-[#D46238] focus:ring-2 focus:ring-[#D46238]/10 transition-all cursor-pointer pr-8"
                      >
                        <option>Everest Base Camp & Gokyo</option>
                        <option>Annapurna Sanctuary & Circuit</option>
                        <option>Langtang & Gosainkunda</option>
                        <option>Upper Mustang & Hidden Valleys</option>
                        <option>Pokhara Valley & Easy Treks</option>
                        <option>Manaslu Circuit Trek</option>
                        <option>Not sure — recommend for me</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#8A96A0] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#142332] mb-1.5">
                      Travel Season
                    </label>
                    <div className="relative">
                      <select
                        value={formData.travelMonth}
                        onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                        className="w-full appearance-none bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl px-3.5 py-3 text-xs sm:text-sm text-[#142332] focus:outline-none focus:bg-white focus:border-[#D46238] focus:ring-2 focus:ring-[#D46238]/10 transition-all cursor-pointer pr-8"
                      >
                        <option>Autumn (Sep–Nov) • Peak Season</option>
                        <option>Spring (Mar–May) • Wildflowers</option>
                        <option>Winter (Dec–Feb) • Clear Skies</option>
                        <option>Summer (Jun–Aug) • Upper Mustang</option>
                        <option>Flexible Dates</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#8A96A0] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#142332] mb-1.5">
                      Group Size
                    </label>
                    <div className="relative">
                      <select
                        value={formData.travellers}
                        onChange={(e) => setFormData({ ...formData, travellers: e.target.value })}
                        className="w-full appearance-none bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl px-3.5 py-3 text-xs sm:text-sm text-[#142332] focus:outline-none focus:bg-white focus:border-[#D46238] focus:ring-2 focus:ring-[#D46238]/10 transition-all cursor-pointer pr-8"
                      >
                        <option>Solo Traveller</option>
                        <option>2 Travellers</option>
                        <option>Small Group (3–5)</option>
                        <option>Private Group (6+)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#8A96A0] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Special Requests or Questions */}
                <div>
                  <label className="block text-xs font-semibold text-[#142332] mb-1.5">
                    Special Requests or Questions <span className="text-[#8A96A0] font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your fitness level, must-see sights, preferred pace, or any questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#142332] placeholder-[#8A96A0] focus:outline-none focus:bg-white focus:border-[#D46238] focus:ring-2 focus:ring-[#D46238]/10 transition-all resize-none"
                  />
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#D46238] hover:bg-[#B8522E] text-white text-xs sm:text-sm uppercase tracking-wider font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group cursor-pointer mt-1"
                >
                  <Send className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  <span>Request Your Custom Itinerary</span>
                </button>

                {/* Trust Line */}
                <div className="flex items-center justify-center gap-2 text-xs text-[#5D6B78] text-center pt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>No spam. 100% confidential. Personalized reply from Kathmandu within 24 hours.</span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ── Bottom Micro Contact Details Strip (Clear, Bold & Highly Legible) ── */}
        <div className="mt-12 pt-7 border-t border-[#EAE5DC] flex flex-wrap items-center justify-between gap-6 text-xs sm:text-sm text-[#142332]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#D46238]/10 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#D46238]" />
            </div>
            <span className="font-sans font-semibold text-xs sm:text-sm text-[#142332]">
              Thamel, Kathmandu, Nepal
            </span>
          </div>

          <a
            href="tel:+9779841063000"
            className="flex items-center gap-2.5 hover:text-[#183E63] transition-colors cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#183E63]/10 flex items-center justify-center shrink-0 group-hover:bg-[#183E63]/20 transition-colors">
              <Phone className="w-4 h-4 text-[#183E63]" />
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-wide text-[#142332] group-hover:text-[#183E63]">
              {companyData.contactPhone}
            </span>
          </a>

          <a
            href={`mailto:${companyData.contactEmail}`}
            className="flex items-center gap-2.5 hover:text-[#2E7D32] transition-colors cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#2E7D32]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2E7D32]/20 transition-colors">
              <Mail className="w-4 h-4 text-[#2E7D32]" />
            </div>
            <span className="font-sans font-semibold text-xs sm:text-sm text-[#142332] group-hover:text-[#2E7D32]">
              {companyData.contactEmail}
            </span>
          </a>

          {/* Minimalist mountain vector sketch icon matching TravelGuidePreview */}
          <div className="flex items-center gap-2.5 select-none">
            <span className="font-script text-2xl text-[#183E63] font-bold">
              EcoSummit Nepal
            </span>
            <svg 
              className="w-9 h-5 text-[#183E63]" 
              viewBox="0 0 42 26" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 23L14 7L23 18L30 10L39 23H3Z" />
              <path d="M14 7L18 13L23 18" />
              <path d="M30 10L33 15" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

