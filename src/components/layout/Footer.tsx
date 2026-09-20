import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  Sparkles
} from 'lucide-react';
import { companyData } from '../../data/company';
import { AffiliationsAndPayments } from '../common/AffiliationsAndPayments';
import logoImg from '../../assets/logo.png';
import mountainVectorBg from '../../assets/mountain_vector_bg.png';

/* Social media SVG Icons */
const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative text-[#F7F6F1] overflow-hidden select-none">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 1. MAJESTIC HIMALAYAN MOUNTAIN RIDGE & HILLY HORIZON    ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden select-none pointer-events-none">
        {/* Base Layer: Panoramic Mountain Vector Artwork */}
        <img 
          src={mountainVectorBg} 
          alt="Himalayan Mountain Panorama" 
          className="w-full h-full object-cover object-bottom filter contrast-105 saturate-110 brightness-95"
        />

        {/* Seamless Top Blend into Parchment Canvas (#FAF8F5) - Softened & kept to the top edge */}
        <div className="absolute top-0 inset-x-0 h-10 sm:h-14 lg:h-16 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/40 to-transparent z-1" />

        {/* Atmosphere Sunlight Warmth Radial Glow in the Central Valley */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_50%_40%] from-[#FAF4EA]/15 via-transparent to-transparent pointer-events-none z-1" />

        {/* SVG Alpine Detail Layer: Survey Pins, Prayer Flags, Trails & Coordinates */}
        <div className="absolute inset-0 z-2">
          <svg viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none" className="w-full h-full">
            {/* ── Expedition Summit Survey Markers ── */}
            {/* Peak 1: Sagarmatha / Everest (Left Prominent Peak, ~x=350, y=95) */}
            <g transform="translate(355, 75)" className="hidden sm:block">
              {/* Vertical leader line */}
              <line x1="0" y1="20" x2="0" y2="0" stroke="#CBA46E" strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="0" cy="20" r="3" fill="#D46238" />
              <circle cx="0" cy="20" r="5" stroke="#CBA46E" strokeWidth="0.8" opacity="0.6" />
              {/* Summit Tag Card */}
              <rect x="-65" y="-22" width="130" height="20" rx="10" fill="#142332" fillOpacity="0.88" stroke="#CBA46E" strokeWidth="0.9" />
              <text x="0" y="-9" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">
                ▲ SAGARMATHA · 8,848M
              </text>
            </g>

            {/* Peak 2: Ama Dablam / Sharp Pyramid (Right Peak, ~x=1180, y=105) */}
            <g transform="translate(1175, 88)" className="hidden sm:block">
              <line x1="0" y1="20" x2="0" y2="0" stroke="#CBA46E" strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="0" cy="20" r="3" fill="#D46238" />
              <circle cx="0" cy="20" r="5" stroke="#CBA46E" strokeWidth="0.8" opacity="0.6" />
              <rect x="-60" y="-22" width="120" height="20" rx="10" fill="#142332" fillOpacity="0.88" stroke="#CBA46E" strokeWidth="0.9" />
              <text x="0" y="-9" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">
                ▲ AMA DABLAM · 6,812M
              </text>
            </g>

            {/* High Mountain Pass: Thorong La Pass */}
            <g transform="translate(775, 166)" className="hidden md:block">
              <circle cx="0" cy="0" r="3" fill="#D46238" />
              <circle cx="0" cy="0" r="5" stroke="#CBA46E" strokeWidth="0.8" opacity="0.6" />
              <rect x="8" y="-9" width="138" height="18" rx="9" fill="#142332" fillOpacity="0.92" stroke="#CBA46E" strokeWidth="0.9" />
              <text x="77" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.6">
                HIGH COL PASS · 5,416M
              </text>
            </g>

            {/* ── Authentic Nepali Lungta (Prayer Flags) Across Valley Saddle ── */}
            <g transform="translate(620, 155)">
              <path d="M 0 0 Q 75 16 150 4" stroke="#8C7A68" strokeWidth="1" opacity="0.7" strokeDasharray="2 1" />
              {/* Flag 1: Blue (Sky) */}
              <polygon points="18,3 28,6 25,18 15,15" fill="#1E88E5" opacity="0.95" />
              {/* Flag 2: White (Air) */}
              <polygon points="36,7 46,9 43,21 33,19" fill="#FFFFFF" opacity="0.95" />
              {/* Flag 3: Red (Fire) */}
              <polygon points="54,10 64,11 61,23 51,22" fill="#E53935" opacity="0.95" />
              {/* Flag 4: Green (Water) */}
              <polygon points="72,11 82,12 79,24 69,23" fill="#43A047" opacity="0.95" />
              {/* Flag 5: Yellow (Earth) */}
              <polygon points="90,11 100,10 97,22 87,23" fill="#FDD835" opacity="0.95" />
              {/* Flag 6: Blue */}
              <polygon points="108,9 118,8 115,20 105,21" fill="#1E88E5" opacity="0.95" />
              {/* Flag 7: White */}
              <polygon points="126,7 136,5 133,17 123,19" fill="#FFFFFF" opacity="0.95" />
            </g>

            {/* ── Dashed Alpine Expedition Trail Route Winding Across Valleys ── */}
            <path
              d="M 180 280 C 320 250, 420 220, 560 210 C 660 200, 780 230, 920 190 C 1050 160, 1180 220, 1340 240"
              stroke="#D46238"
              strokeWidth="1.6"
              strokeDasharray="5 5"
              opacity="0.55"
            />

            {/* Waypoint dots */}
            <circle cx="560" cy="210" r="3" fill="#D46238" opacity="0.75" />
            <circle cx="920" cy="190" r="3" fill="#D46238" opacity="0.75" />

            {/* ── Foreground Rolling Mountain Foothill Crest (Smoothly meets #0E1412) ── */}
            <path
              d="M 0 255 C 160 235, 300 270, 480 248 C 660 226, 800 262, 980 240 C 1140 220, 1300 255, 1440 235 L 1440 320 L 0 320 Z"
              fill="#0E1412"
            />
            {/* Glowing Amber Crest Accent Line on the Foreground Ridge */}
            <path
              d="M 0 255 C 160 235, 300 270, 480 248 C 660 226, 800 262, 980 240 C 1140 220, 1300 255, 1440 235"
              stroke="#CBA46E"
              strokeWidth="1.5"
              opacity="0.65"
            />
          </svg>
        </div>

        {/* Deep Bottom Shadow Gradient Fusing Seamlessly into the Footer Body */}
        <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-t from-[#0E1412] via-[#0E1412]/90 to-transparent z-3" />
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 2. MAIN FOOTER BODY CONTENT                             ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#0E1412] -mt-px pt-6 sm:pt-10 pb-12">

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          
          {/* Upper Brand & Newsletter Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-white/10 items-start">
            
            {/* Left Column: Brand, Ethos & Accreditations */}
            <div className="lg:col-span-5 space-y-4">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-3.5 group cursor-pointer"
                title="EcoSummit Nepal - Return to Home"
              >
                <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <img src={logoImg} alt="EcoSummit Nepal" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl text-white tracking-tight leading-none">EcoSummit</span>
                  <span className="text-[10px] font-semibold text-[#A5B38A] tracking-[0.24em] uppercase mt-1 leading-none">
                    Expeditions · Nepal
                  </span>
                </div>
              </Link>

              <p className="font-serif text-base sm:text-lg text-[#C6B59A] italic">
                "Journey Beyond the Himalayas"
              </p>

              <p className="text-xs text-white/70 max-w-md leading-relaxed font-normal">
                Thoughtfully curated private treks, cultural journeys, and high-altitude Himalayan expeditions. Planned with care, quiet expertise, and genuine local insight by our Sherpa-led team in Kathmandu.
              </p>

              {/* Official Credentials & Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-[10.5px] text-[#A5B38A]/90">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  <ShieldCheck className="w-3 h-3 text-[#A5B38A]" />
                  <span>NMA Registered</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  <Compass className="w-3 h-3 text-[#CBA46E]" />
                  <span>TAAN Certified</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  <Sparkles className="w-3 h-3 text-[#D46238]" />
                  <span>Leave No Trace Partner</span>
                </span>
              </div>

              {/* Social Media Links */}
              <div className="pt-3 space-y-2.5">
                <span className="text-[10.5px] uppercase font-mono font-bold tracking-[0.2em] text-[#C6B59A] block">
                  Connect & Follow Us
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#1877F2]/40 shadow-sm"
                    aria-label="Facebook"
                    title="Follow EcoSummit on Facebook"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#DD2A7B]/40 shadow-sm"
                    aria-label="Instagram"
                    title="Follow EcoSummit on Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-black text-white border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-white/50 hover:shadow-lg hover:shadow-black/50 shadow-sm"
                    aria-label="X (Twitter)"
                    title="Follow EcoSummit on X"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#0A66C2]/40 shadow-sm"
                    aria-label="LinkedIn"
                    title="Connect with EcoSummit on LinkedIn"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#FF0000] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FF0000]/40 shadow-sm"
                    aria-label="YouTube"
                    title="Subscribe to EcoSummit on YouTube"
                  >
                    <YouTubeIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Himalayan Travel Notes Newsletter */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-sm relative overflow-hidden shadow-sm">
                <div className="w-10 h-1 bg-[#E5A93C] rounded-full mb-3" />
                <h4 className="font-serif text-xl sm:text-2xl text-white mb-2 tracking-tight">
                  Himalayan Travel Notes & Season Updates
                </h4>
                <p className="text-xs text-white/70 mb-5 leading-relaxed font-normal">
                  Receive our quarterly seasonal trail conditions, high-altitude preparation notes, and cultural stories directly from our Kathmandu expedition desk.
                </p>

                {subscribed ? (
                  <div className="flex items-center gap-2.5 text-xs text-[#A5B38A] bg-[#26483D]/50 p-4 rounded-xl border border-[#A5B38A]/40">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Namaste. You have been added to our Himalayan travel journal dispatches.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E5A93C] focus:bg-white/15 transition-all"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#FAF8F5] text-[#142332] hover:bg-[#E5A93C] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer shadow-sm"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}

                <div className="flex items-center gap-4 text-[10.5px] text-white/45 mt-3">
                  <span>• Quarterly dispatch</span>
                  <span>• Sherpa field notes</span>
                  <span>• 100% privacy assured</span>
                </div>
              </div>
            </div>
          </div>

          {/* Four Column Directory */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
            {/* Column 1: Company */}
            <div>
              <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6B59A] mb-4">
                Company
              </h5>
              <ul className="space-y-2.5 text-white/70">
                <li>
                  <Link to="/about" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">About Us</Link>
                </li>
                <li>
                  <Link to="/our-team" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Our Team</Link>
                </li>
                <li>
                  <Link to="/why-ecosummit" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Why EcoSummit</Link>
                </li>
                <li>
                  <Link to="/responsible-travel" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Responsible Travel</Link>
                </li>
                <li>
                  <Link to="/reviews" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Guest Travel Notes</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Contact Desk</Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Journeys */}
            <div>
              <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6B59A] mb-4">
                Journeys
              </h5>
              <ul className="space-y-2.5 text-white/70">
                <li>
                  <Link to="/treks" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Himalayan Treks</Link>
                </li>
                <li>
                  <Link to="/tours" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Cultural & Heritage Tours</Link>
                </li>
                <li>
                  <Link to="/expeditions" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Mountaineering Expeditions</Link>
                </li>
                <li>
                  <Link to="/destinations" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Nepal Destinations</Link>
                </li>
                <li>
                  <Link to="/plan-your-trip" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Custom Tailor-Made Trips</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Travel Resources */}
            <div>
              <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6B59A] mb-4">
                Travel Resources
              </h5>
              <ul className="space-y-2.5 text-white/70">
                <li>
                  <Link to="/travel-guide" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Nepal Travel Guide</Link>
                </li>
                <li>
                  <Link to="/safety-altitude" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Safety & Altitude Guide</Link>
                </li>
                <li>
                  <Link to="/travel-insurance" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Insurance Requirements</Link>
                </li>
                <li>
                  <Link to="/emergency-rescue" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Emergency Rescue Standby</Link>
                </li>
                <li>
                  <Link to="/booking-terms" className="hover:text-[#E5A93C] hover:translate-x-0.5 inline-block transition-transform">Booking Terms & Conditions</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Local Presence */}
            <div>
              <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6B59A] mb-4">
                Kathmandu Office
              </h5>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D46238] shrink-0 mt-0.5" />
                  <span>{companyData.officeLocation}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#CBA46E] shrink-0" />
                  <a href={`tel:${companyData.contactPhone}`} className="hover:text-white transition-colors">
                    {companyData.contactPhone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="relative">
                    <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse" />
                  </div>
                  <a
                    href={`https://wa.me/${companyData.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>WhatsApp: {companyData.whatsappNumber}</span>
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#A5B38A] shrink-0" />
                  <a href={`mailto:${companyData.contactEmail}`} className="hover:text-white transition-colors">
                    {companyData.contactEmail}
                  </a>
                </li>
                <li className="text-[11px] text-white/50 pt-1">
                  Office Hours: {companyData.operatingHours}
                </li>
              </ul>
            </div>
          </div>

          {/* Official Affiliations & Online Payment Acceptance Strip */}
          <div className="pt-8 pb-4 my-2 border-t border-white/10">
            <AffiliationsAndPayments variant="dark" layout="row" />
          </div>

          {/* Bottom Bar: Copyright, Geographic Coordinates & Legal */}
          <div className="pt-8 mt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <p>© {new Date().getFullYear()} EcoSummit Travel & Adventure Pvt. Ltd. Registered in Nepal.</p>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="font-mono text-[10.5px] text-[#A5B38A]/80">
                27°42'48"N 85°18'43"E • Elev. 1,400m
              </span>
            </div>

            <div className="flex items-center gap-6 text-[11px]">
              <Link to="/booking-terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/responsible-travel" className="hover:text-white transition-colors">Responsible Travel</Link>
              <Link to="/safety-altitude" className="hover:text-white transition-colors">Wilderness Safety</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

