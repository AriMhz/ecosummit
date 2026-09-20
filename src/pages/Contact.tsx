import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  AlertCircle,
  Check,
} from 'lucide-react';
import { companyData } from '../data/company';
import { COUNTRIES } from '../data/countries';
import { COUNTRY_DIAL_CODES } from '../data/countryCodes';
import { api } from '../services/api';
import contactHeroBg from '../assets/travel_guide_bg.jpg';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simplified Form State (Inquiry Style)
  const [fullName, setFullName] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+977');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Math Captcha
  const captcha = useMemo(() => {
    const a = Math.floor(Math.random() * 8) + 4;
    const b = Math.floor(Math.random() * (a - 2)) + 1;
    const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    const bWord = words[b] || String(b);
    return { a, b, bWord, answer: a - b };
  }, [submitted]);

  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Auto-sync country code when nationality is picked if match exists
  const handleNationalityChange = (val: string) => {
    setNationality(val);
    const matched = COUNTRY_DIAL_CODES.find(
      (c) => c.name.toLowerCase() === val.toLowerCase()
    );
    if (matched) {
      setCountryCode(matched.dialCode);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaAnswer.trim(), 10) !== captcha.answer) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setIsSubmitting(true);

    try {
      await api.submitInquiry({
        type: 'general',
        full_name: fullName,
        email,
        phone: phone ? `${countryCode} ${phone}` : undefined,
        country: nationality,
        message,
      });
    } catch {
      // smooth fallback
    }

    setIsSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const resetForm = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setNationality('');
    setCountryCode('+977');
    setMessage('');
    setCaptchaAnswer('');
    setCaptchaError(false);
  };

  const faqItems = [
    {
      q: 'How quickly will your Kathmandu team respond to my message?',
      a: 'We guarantee a personal, detailed response within 2 hours during Nepal operating hours (09:00 - 18:00 NPT, UTC+5:45). For messages received overnight, our team responds first thing the following morning. For urgent inquiries, our WhatsApp line is monitored live 24/7.',
    },
    {
      q: 'Can EcoSummit fully customize our route, duration, and acclimatisation days?',
      a: 'Absolutely. Over 70% of our guests book tailor-made private itineraries. Whether you wish to add extra rest days in Namche Bazaar, detour to Gokyo Ri, upgrade to luxury heritage lodges, or combine rafting with trekking, our mountain planners will design a bespoke route for your exact pace.',
    },
    {
      q: 'Do you assist with Lukla flights, helicopter shuttles, and national park permits?',
      a: 'Yes, our Kathmandu office manages all operational logistics end-to-end. This includes domestic flights (Lukla, Pokhara, Jomsom), Sagarmatha and Annapurna conservation permits, TIMS registration, airport transfers, and private helicopter charters.',
    },
    {
      q: 'Can I visit your office in Thamel for an in-person briefing before my trek?',
      a: 'You are warmly welcome! Our headquarters are located in Bhagawan Bahal, Thamel. We encourage travelers to visit us 1-2 days prior to departure for freshly brewed Himalayan organic tea, a comprehensive pre-trip briefing with your lead Sherpa guide, and complimentary gear inspection.',
    },
    {
      q: 'How are medical emergencies and high-altitude rescues handled?',
      a: 'Every EcoSummit guide carries pulse oximeters, high-altitude first aid kits, and Garmin InReach satellite communicators with two-way SOS capabilities. In the rare event of severe altitude sickness or trauma, our 24/7 emergency desk in Kathmandu coordinates immediate helicopter evacuation to top medical centers in Kathmandu.',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#142332] min-h-screen">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 1. TOPOGRAPHIC HERO SECTION                             ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FAF8F5] text-[#142332] pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-20 overflow-hidden border-b border-[#EAE5DC]">
        {/* ── Layer 0: High-Altitude Himalayan Vista with directional fade ── */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src={contactHeroBg}
            alt="Majestic Himalayan Peaks and Gokyo Lakes"
            className="w-full h-full object-cover object-[center_right] filter brightness-[0.98] contrast-[1.03]"
          />
          {/* Directional gradient: 100% clean contrast on the left, mountain panorama revealed on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 via-45% md:via-55% to-transparent" />
          {/* Bottom blend into content */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F5] to-transparent" />
          {/* Top blend for sticky navbar */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FAF8F5]/90 to-transparent" />
        </div>

        {/* ── Topographic Contour Lines – Top Right ── */}
        <div className="absolute top-0 right-0 w-[420px] sm:w-[600px] lg:w-[780px] h-[380px] sm:h-[480px] lg:h-[580px] pointer-events-none select-none z-0 overflow-hidden">
          <svg viewBox="0 0 700 560" fill="none" stroke="#CBA46E" className="w-full h-full">
            {/* Outer sweeping contour layers */}
            <path d="M 120 20 C 220 0, 350 60, 460 45 C 560 30, 630 90, 700 115" strokeWidth="0.8" opacity="0.18" />
            <path d="M 100 70 C 205 45, 330 110, 455 95 C 565 78, 625 148, 700 175" strokeWidth="0.9" opacity="0.26" />
            <path d="M 80 125 C 185 95, 310 165, 445 148 C 555 130, 615 208, 700 238" strokeWidth="1.0" opacity="0.34" />
            <path d="M 65 182 C 168 150, 295 222, 435 202 C 548 185, 605 268, 700 300" strokeWidth="1.1" opacity="0.3" />
            <path d="M 50 242 C 152 208, 278 280, 420 258 C 535 238, 592 330, 700 362" strokeWidth="1.0" opacity="0.22" />
            <path d="M 35 305 C 135 268, 260 340, 405 315 C 522 292, 578 392, 700 425" strokeWidth="0.9" opacity="0.16" />
            {/* Elevation Labels */}
            <text x="468" y="43" fill="#CBA46E" fontSize="8.5" opacity="0.45" fontFamily="monospace" letterSpacing="1.2">3,500m</text>
            <text x="458" y="93" fill="#CBA46E" fontSize="8.5" opacity="0.55" fontFamily="monospace" letterSpacing="1.2">4,200m</text>
            <text x="448" y="146" fill="#CBA46E" fontSize="8.5" opacity="0.65" fontFamily="monospace" letterSpacing="1.2">4,800m</text>
            <text x="445" y="200" fill="#CBA46E" fontSize="8.5" opacity="0.7" fontFamily="monospace" letterSpacing="1.2">5,364m [EBC]</text>
            {/* Dotted Trail Route */}
            <path
              d="M 180 330 C 250 265, 310 275, 390 200 C 455 140, 530 155, 620 90"
              stroke="#D46238"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              opacity="0.5"
            />
            {/* Waypoint Markers */}
            <circle cx="390" cy="200" r="3.5" fill="#D46238" opacity="0.75" />
            <text x="400" y="197" fill="#D46238" fontSize="8" fontWeight="bold" opacity="0.75" letterSpacing="1">NAMCHE 3,440m</text>
            <circle cx="620" cy="90" r="3.5" fill="#D46238" opacity="0.75" />
            <text x="555" y="83" fill="#D46238" fontSize="8" fontWeight="bold" opacity="0.75" letterSpacing="1">SUMMIT CAMP</text>
            {/* Compass Rose */}
            <g transform="translate(638, 490)" opacity="0.3">
              <circle cx="0" cy="0" r="20" stroke="#CBA46E" strokeWidth="0.8" fill="none" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#CBA46E" strokeWidth="0.8" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#CBA46E" strokeWidth="0.8" />
              <text x="-3" y="-21" fill="#CBA46E" fontSize="7" fontFamily="monospace">N</text>
            </g>
          </svg>
        </div>

        {/* ── Topographic Contour Lines – Bottom Left ── */}
        <div className="absolute -bottom-8 -left-16 w-[280px] sm:w-[380px] lg:w-[480px] h-[280px] sm:h-[360px] lg:h-[440px] pointer-events-none select-none z-0 overflow-hidden">
          <svg viewBox="0 0 480 440" fill="none" stroke="#A69C8E" className="w-full h-full">
            <path d="M -20 260 C 80 238, 170 205, 265 228 C 355 248, 415 195, 480 172" strokeWidth="0.8" opacity="0.2" />
            <path d="M -20 310 C 80 285, 175 252, 272 278 C 362 300, 418 248, 480 228" strokeWidth="1.0" opacity="0.28" />
            <path d="M -20 360 C 82 333, 178 300, 280 328 C 368 350, 422 298, 480 280" strokeWidth="1.1" opacity="0.36" />
            <path d="M -20 410 C 85 382, 182 348, 288 378 C 374 400, 428 350, 480 334" strokeWidth="1.0" opacity="0.28" />
          </svg>
        </div>

        {/* ── Center faint topographic rings ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none select-none z-0 opacity-[0.04]">
          <svg viewBox="0 0 600 600" fill="none" stroke="#183E63" className="w-full h-full">
            <circle cx="300" cy="300" r="80" strokeWidth="1.5" />
            <circle cx="300" cy="300" r="140" strokeWidth="1.2" />
            <circle cx="300" cy="300" r="200" strokeWidth="1.0" />
            <circle cx="300" cy="300" r="260" strokeWidth="0.8" />
            <circle cx="300" cy="300" r="290" strokeWidth="0.6" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8A96A0] mb-8 font-sans">
            <Link to="/" className="hover:text-[#142332] transition-colors">Home</Link>
            <span className="text-[#C5BAB0]">/</span>
            <span className="text-[#142332] font-medium">Contact Us</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10">
            {/* Left 8 Cols: Main Editorial Header */}
            <div className="lg:col-span-8">
              {/* ── Editorial Kicker & Styled "BEGIN YOUR JOURNEY" ── */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D46238]/10 border border-[#D46238]/30 text-[11px] uppercase tracking-[0.22em] font-bold text-[#D46238] shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D46238] animate-pulse" />
                  <span>BEGIN YOUR JOURNEY</span>
                </div>
                <span className="text-xs text-[#C5BAB0] hidden sm:inline">•</span>
                <span className="font-script text-[#3A6B88] text-2xl -rotate-2 select-none inline-block font-medium">
                  talk directly with Sherpa guides
                </span>
                <span className="hidden sm:inline text-[10px] font-mono tracking-widest text-[#8A96A0] uppercase ml-auto">
                  27°42′N · 85°19′E · ELEV. 1,400M
                </span>
              </div>

              {/* Main Editorial Title */}
              <div className="relative mb-4">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-[#142332] font-normal leading-[1.08] tracking-tight">
                  Reach Our <br />
                  <span className="italic font-light text-[#183E63]">Himalayan Team</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-script text-2xl sm:text-3xl text-[#D46238] -rotate-1 select-none inline-block font-medium">
                    Every Summit Starts With a Conversation ✦
                  </span>
                </div>
              </div>

              {/* Narrative Lead */}
              <p className="text-base sm:text-lg text-[#526272] leading-relaxed font-light max-w-2xl">
                Questions about seasonal conditions, fitness prep, high-altitude safety, or custom private departures?
                Our licensed Sherpa guides and expedition specialists in Thamel are here for you.
              </p>
            </div>

            {/* Right 4 Cols: "Real People Real Journeys" Handwritten Stamp Badge */}
            <div className="lg:col-span-4 hidden lg:flex flex-col items-end justify-end select-none">
              <div className="relative text-right -rotate-2 p-5 bg-white/80 backdrop-blur-xs rounded-3xl border border-[#EAE5DC] shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:border-[#CBA46E]/60 transition-all">
                <div className="flex items-center justify-end gap-1.5 mb-1.5 text-[9px] font-mono tracking-widest text-[#8A96A0] uppercase">
                  <span>THAMEL, KATHMANDU</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">DESK ONLINE</span>
                </div>
                <span className="font-script text-3xl xl:text-4xl text-[#183E63] font-bold tracking-wide block leading-[1.05] drop-shadow-2xs">
                  Real People
                </span>
                <span className="font-script text-3xl xl:text-4xl text-[#D46238] font-bold tracking-wide block leading-[1.05] drop-shadow-2xs">
                  Real Journeys
                </span>
                {/* Hand-drawn curved underline swoop */}
                <svg className="w-36 xl:w-44 h-4 text-[#D46238]/85 mt-0.5 ml-auto" viewBox="0 0 160 20" fill="none">
                  <path d="M5 12 C 45 4, 110 4, 155 14 C 120 18, 60 16, 25 15" fill="currentColor" />
                </svg>
                <p className="text-[11px] text-[#566370] mt-2 max-w-[210px] text-right font-light leading-snug">
                  Zero middlemen. Speak directly to certified mountain directors who plan the routes.
                </p>
              </div>
            </div>
          </div>

          {/* Live Trust Metrics Bar – warm card style */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#E2DDD5]">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">⚡</span>
              <div>
                <strong className="block text-[#142332] text-xs font-bold leading-none">&lt; 2 Hr Reply</strong>
                <span className="text-[10px] text-[#8A96A0]">During Nepal Hours</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#2E7D32] shrink-0" />
              <div>
                <strong className="block text-[#142332] text-xs font-bold leading-none">Sherpa Led</strong>
                <span className="text-[10px] text-[#8A96A0]">Native Guides</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-[#D46238] shrink-0" />
              <div>
                <strong className="block text-[#142332] text-xs font-bold leading-none">Thamel Office</strong>
                <span className="text-[10px] text-[#8A96A0]">Open 7 Days/Wk</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="block text-[#142332] text-xs font-bold leading-none">24/7 SOS Line</strong>
                <span className="text-[10px] text-[#8A96A0]">Satellite InReach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative bg-[#FAF8F5] overflow-hidden">
        {/* Faint topographic accent for main content area */}
        <div className="absolute top-0 left-0 w-[320px] h-[320px] pointer-events-none select-none z-0 opacity-30">
          <svg viewBox="0 0 320 320" fill="none" stroke="#CBA46E" className="w-full h-full">
            <path d="M -20 80 C 60 60, 130 90, 200 75 C 270 60, 300 100, 320 115" strokeWidth="0.7" opacity="0.3" />
            <path d="M -20 130 C 60 108, 130 140, 200 125 C 275 110, 305 152, 320 168" strokeWidth="0.8" opacity="0.38" />
            <path d="M -20 185 C 58 160, 132 192, 202 176 C 278 160, 308 205, 320 222" strokeWidth="0.7" opacity="0.3" />
          </svg>
        </div>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-16 relative z-10">
          {/* ═════════════════════════════════════════════════════════ */}
          {/* ── SECTION 1: Direct Channels & Interactive Inquiry Form ── */}
          {/* ═════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-10 lg:mb-14">
            
            {/* Left Column (5 cols): Direct Instant Access Channels */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-7 shadow-[0_12px_36px_rgba(24,62,99,0.06)] space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#E8EFF5] pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-xl sm:text-2xl text-[#142332] font-normal">
                          Instant Communications
                        </h3>
                        <span className="font-script text-lg text-[#25D366] -rotate-2 select-none hidden sm:inline">
                          live chat ✦
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7D8F] mt-0.5 font-light">
                        Direct line to our operational desks in Kathmandu
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-[#183E63]/10 text-[#183E63] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {/* WhatsApp Quick Chat */}
                    <a
                      href={`https://wa.me/${companyData.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20EcoSummit%20Nepal,%20I%20would%20like%20to%20inquire%20about%20a%20Himalayan%20journey.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 rounded-2xl transition-all duration-200 group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                          <MessageCircle className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold block">
                            Live Chat On WhatsApp
                          </span>
                          <strong className="text-sm font-sans text-emerald-950 block">
                            {companyData.whatsappNumber}
                          </strong>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs animate-pulse">
                        Online Now
                      </span>
                    </a>

                    {/* Direct Telephone Calling */}
                    <a
                      href={`tel:${companyData.contactPhone.replace(/\s+/g, '')}`}
                      className="w-full flex items-center justify-between p-4 bg-[#183E63] hover:bg-[#122F4C] text-white rounded-2xl transition-all duration-200 group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <span className="text-[10.5px] font-mono uppercase tracking-wider text-white/70 block">
                            Kathmandu Office Telephone
                          </span>
                          <strong className="text-sm font-sans text-white block">
                            {companyData.contactPhone}
                          </strong>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Email Support */}
                    <a
                      href={`mailto:${companyData.contactEmail}`}
                      className="w-full flex items-center justify-between p-4 bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2EAF1] rounded-2xl transition-all duration-200 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#183E63]/10 text-[#183E63] flex items-center justify-center">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#6B7D8F] block">
                            Direct Email Inquiries
                          </span>
                          <strong className="text-sm font-sans text-[#142332] block">
                            {companyData.contactEmail}
                          </strong>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:translate-x-1 group-hover:text-[#142332] transition-all" />
                    </a>
                  </div>
                </div>

                {/* 24/7 Field Operations SOS Note */}
                <div className="p-3.5 rounded-2xl bg-amber-500/8 border border-amber-500/25 flex items-start gap-3 mt-4">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <strong className="font-semibold block mb-0.5">24/7 Expedition SOS Hotline:</strong>
                    Active field clients, emergency teams, and satellite SOS relays have round-the-clock priority dispatch via Kathmandu operations desk.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Interactive Inquiry Form */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-white rounded-3xl border border-[#D9E2EC] p-7 sm:p-10 shadow-[0_16px_44px_rgba(24,62,99,0.08)] flex-1 flex flex-col justify-between">
              
              {submitted ? (
                <div className="py-12 sm:py-16 text-center space-y-6">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-xs">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase font-mono tracking-[0.2em] font-bold text-emerald-700 block">
                      MESSAGE TRANSMITTED
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal">
                      Thank You, {fullName || 'Friend'}!
                    </h3>
                    <p className="text-sm text-[#526272] max-w-md mx-auto leading-relaxed font-light">
                      Your inquiry has been routed to our lead mountain planners in Kathmandu. We will review your requirements and reply to <span className="font-semibold text-[#142332]">{email}</span> within 2 hours.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-emerald-200 max-w-md mx-auto text-left space-y-2 text-xs text-emerald-950">
                    <div className="flex items-center gap-2 font-bold text-emerald-900">
                      <Clock className="w-4 h-4 text-emerald-700" />
                      <span>Next Steps From Kathmandu:</span>
                    </div>
                    <p className="leading-relaxed">
                      1. Our route planner checks current seasonal conditions & permits.<br />
                      2. We craft a detailed PDF dossier with day-by-day altitude profiles.<br />
                      3. You receive transparent pricing with zero hidden local agency markups.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <a
                      href={`https://wa.me/${companyData.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20EcoSummit,%20I%20just%20submitted%20an%20inquiry%20from%20${encodeURIComponent(fullName || 'website')}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Need Faster Answer? WhatsApp Us</span>
                    </a>

                    <button
                      onClick={resetForm}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#142332] text-xs font-semibold transition-all cursor-pointer"
                    >
                      Submit Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Form Header */}
                  <div className="border-b border-[#E8EFF5] pb-4 space-y-1">
                    <span className="text-[11px] uppercase font-mono tracking-[0.2em] font-bold text-[#D46238] block">
                      MAKE AN INQUIRY
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#142332] font-normal">
                      Send Us A Message
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#6B7D8F] font-light">
                      Tell us about your questions, dream journey, or custom departure dates. We reply within 2 hours.
                    </p>
                  </div>

                  {/* Row 1: Full Name + Nationality */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl px-4 py-3 text-sm text-[#142332] placeholder-[#94A3B8] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]/20 transition-all"
                      />
                    </div>
                    <div>
                      <select
                        required
                        value={nationality}
                        onChange={(e) => handleNationalityChange(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl px-4 py-3 text-sm text-[#142332] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]/20 transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23183E63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                      >
                        <option value="" disabled className="text-[#94A3B8]">Nationality</option>
                        {COUNTRIES.map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Phone with Country Code + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex rounded-xl border border-[#E8E2D8] bg-[#FAF8F5] focus-within:border-[#183E63] focus-within:ring-1 focus-within:ring-[#183E63]/20 transition-all overflow-hidden">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-[#FAF8F5] hover:bg-slate-100 border-r border-[#E8E2D8] px-2.5 sm:px-3 py-3 text-xs sm:text-sm text-[#142332] font-mono font-medium focus:outline-none cursor-pointer shrink-0 max-w-[105px] sm:max-w-[125px]"
                        aria-label="Country Code"
                      >
                        {COUNTRY_DIAL_CODES.map((c) => (
                          <option key={`${c.code}-${c.dialCode}`} value={c.dialCode}>
                            {c.flag} {c.dialCode}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="flex-1 bg-transparent px-3.5 py-3 text-sm text-[#142332] placeholder-[#94A3B8] focus:outline-none min-w-0"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl px-4 py-3 text-sm text-[#142332] placeholder-[#94A3B8] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Message"
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl px-4 py-3 text-sm text-[#142332] placeholder-[#94A3B8] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]/20 transition-all resize-none"
                    />
                  </div>

                  {/* Row 4: Math Verification Captcha */}
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-[#183E63] font-semibold whitespace-nowrap">
                      {captcha.a} − {captcha.bWord} =
                    </span>
                    <input
                      type="text"
                      required
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      className="w-20 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl px-3 py-2.5 text-sm text-[#142332] text-center focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]/20 transition-all"
                      placeholder="?"
                    />
                    {captchaError && (
                      <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Incorrect answer
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#183E63] hover:bg-[#122F4C] text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Routing to Kathmandu Ops Desk...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-4 text-[11px] text-[#718096]">
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Zero Booking Obligation
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        100% Privacy Guarantee
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Direct Local Rates
                      </span>
                    </div>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════ */}
        {/* ── SECTION 2: In-Person Briefing & Mountain Team         ── */}
        {/* ═════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left (7 cols): Visit Headquarters & Interactive Map Card */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-8 shadow-[0_12px_36px_rgba(24,62,99,0.06)] space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#E8EFF5] pb-3.5 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10.5px] uppercase font-mono tracking-[0.2em] font-bold text-[#D46238] block">
                        IN-PERSON BRIEFING
                      </span>
                      <span className="font-script text-base text-[#D46238] -rotate-2 select-none">
                        tea is on us! 🍵
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#142332] font-normal mt-0.5">
                      Visit Our Thamel Office
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-[#D46238]/10 text-[#D46238] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-[13px] text-[#3D4B58] mb-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#D46238] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#142332]">Headquarters Address:</strong>
                      <span>Bhagawan Bahal, Thamel-29, Kathmandu 44600, Nepal</span>
                      <span className="text-[11px] text-[#718096] block mt-0.5">(Minutes from Kathmandu Guest House & Chhaya Center)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#183E63] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#142332]">Office & Lounge Hours:</strong>
                      <span>09:00 – 18:00 (NPT, UTC+5:45) • Open 7 Days a Week</span>
                      <span className="text-[11px] text-[#718096] block mt-0.5">Pre-trip gear checks & route planning briefings</span>
                    </div>
                  </div>
                </div>

                {/* Embedded Interactive Map */}
                <div className="relative rounded-2xl overflow-hidden border border-[#E2EAF1] shadow-xs h-[230px] bg-slate-100">
                  <iframe
                    title="EcoSummit Kathmandu Headquarters Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14129.479708945415!2d85.30485858000673!3d27.715789642646637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4bd%3A0x58099b1deff7014!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs border-t border-[#F0EFEB]">
                <span className="text-[#6B7D8F] font-light">
                  🍵 Complimentary organic tea & route maps
                </span>
                <a
                  href="https://maps.google.com/?q=Thamel,+Kathmandu,+Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#183E63] hover:text-[#D46238] transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right (5 cols): Meet The Mountain Team Concierge */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-8 shadow-[0_12px_36px_rgba(24,62,99,0.06)] space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#E8EFF5] pb-3.5 mb-3">
                  <div>
                    <span className="text-[10.5px] uppercase font-mono tracking-[0.2em] font-bold text-[#142332] block">
                      MEET YOUR INQUIRY PLANNERS
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#142332] font-normal mt-0.5">
                      Native Sherpa Directors
                    </h3>
                  </div>
                  <span className="font-script text-base text-[#183E63] -rotate-1 select-none">
                    actual guides ✦
                  </span>
                </div>
                
                <p className="text-xs text-[#566370] leading-relaxed font-light mb-4">
                  Your message is answered directly by certified mountain professionals who have summited 8,000m peaks and guided hundreds of expeditions.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] border border-[#EAEFF5] hover:border-[#183E63]/30 transition-colors">
                    <img
                      src="/team-assets/expert_pasang.jpg"
                      alt="Pasang Sherpa"
                      className="w-12 h-12 rounded-xl object-cover border border-[#D9E2EC] shrink-0"
                    />
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center justify-between">
                        <h5 className="font-sans font-bold text-xs text-[#142332] truncate">Pasang Sherpa</h5>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Active</span>
                      </div>
                      <span className="text-[11px] text-[#0284C7] font-medium block">Lead High-Altitude Guide & Route Planner</span>
                      <span className="text-[10.5px] text-[#718096] block">Everest 7x Summit · Khumbu Native</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] border border-[#EAEFF5] hover:border-[#183E63]/30 transition-colors">
                    <img
                      src="/team-assets/expert_pemba.jpg"
                      alt="Pemba Tamang"
                      className="w-12 h-12 rounded-xl object-cover border border-[#D9E2EC] shrink-0"
                    />
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center justify-between">
                        <h5 className="font-sans font-bold text-xs text-[#142332] truncate">Pemba Tamang</h5>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Active</span>
                      </div>
                      <span className="text-[11px] text-[#0284C7] font-medium block">Operations & Helicopter Rescue Director</span>
                      <span className="text-[10.5px] text-[#718096] block">High-Altitude First Responder & Dispatch</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] border border-[#EAEFF5] hover:border-[#183E63]/30 transition-colors">
                    <img
                      src="/team-assets/expert_aruna.jpg"
                      alt="Aruna Rai"
                      className="w-12 h-12 rounded-xl object-cover border border-[#D9E2EC] shrink-0"
                    />
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center justify-between">
                        <h5 className="font-sans font-bold text-xs text-[#142332] truncate">Aruna Rai</h5>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Active</span>
                      </div>
                      <span className="text-[11px] text-[#0284C7] font-medium block">Guest Concierge & Permit Specialist</span>
                      <span className="text-[10.5px] text-[#718096] block">TIMS & National Park Authority Liaison</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center text-[11px] text-[#718096] border-t border-[#F0EFEB]">
                <span>Zero Call Centers • Certified Sherpa Team in Kathmandu</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 3. FAQ ACCORDION SECTION                                ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FAF8F5] border-t border-[#E8E2D8] py-16 lg:py-20 overflow-hidden">
        {/* Topographic rings - center background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <svg viewBox="0 0 800 600" fill="none" stroke="#CBA46E" className="w-full h-full max-w-4xl">
            <ellipse cx="400" cy="300" rx="120" ry="80" strokeWidth="0.7" opacity="0.12" />
            <ellipse cx="400" cy="300" rx="210" ry="140" strokeWidth="0.7" opacity="0.1" />
            <ellipse cx="400" cy="300" rx="300" ry="200" strokeWidth="0.6" opacity="0.08" />
            <ellipse cx="400" cy="300" rx="380" ry="260" strokeWidth="0.5" opacity="0.06" />
          </svg>
        </div>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] font-bold text-[#D46238]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>COMMONLY ASKED QUESTIONS</span>
            </div>
            <div className="relative">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal">
                Before You Contact Us
              </h2>
              {/* Handwritten underline annotation */}
              <span
                className="block font-script text-[#3A6B88] text-xl mt-1 -rotate-1 select-none"
                style={{fontFamily: "'Caveat', cursive"}}
              >
                we're always happy to help
              </span>
            </div>
            <p className="text-sm text-[#6B7D8F] font-light leading-relaxed">
              Quick answers about planning your route, scheduling pre-trip meetings, and emergency coverage in Nepal.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 relative z-10">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E8E2D8] bg-[#FAF8F5] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group"
                  >
                    <span className="font-serif text-base sm:text-lg text-[#142332] font-normal group-hover:text-[#D46238] transition-colors pr-4">
                      {item.q}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white border border-[#E8E2D8] flex items-center justify-center shrink-0 text-[#142332] group-hover:border-[#D46238] group-hover:text-[#D46238] transition-all">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E8E2D8]/60 bg-white">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Handwritten reassurance at bottom of FAQ */}
          <div className="text-center mt-10 relative z-10">
            <span className="font-script text-2xl text-[#D46238] -rotate-1 inline-block select-none">
              Have another question? Reach out on WhatsApp anytime ✦
            </span>
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 4. OFFICIAL LICENSES & TRUST FOOTER BANNER              ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF8F5] py-10 border-b border-[#E8E2D8]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D46238] font-bold block">
                Govt. Licensed Agency
              </span>
              <p className="text-[11px] text-[#6B7D8F]">Ministry of Culture, Tourism & Civil Aviation, Nepal</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#183E63] font-bold block">
                TAAN Active Member
              </span>
              <p className="text-[11px] text-[#6B7D8F]">Trekking Agencies' Association of Nepal Certified</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#183E63] font-bold block">
                NMA Partner
              </span>
              <p className="text-[11px] text-[#6B7D8F]">Nepal Mountaineering Association Expedition Partner</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold block">
                Porter Welfare Alliance
              </span>
              <p className="text-[11px] text-[#6B7D8F]">Fair wages, full insurance & ethical high-altitude porter standards</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
