import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const WhyChooseUs: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-28 bg-white text-[#102942] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2.5 mb-2.5">
            <span className="w-5 h-[2px] bg-[#E85D2A] rounded-full" />
            <span className="font-simplon-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#E85D2A] font-bold">
              THE ECOSUMMIT STANDARD
            </span>
            <span className="w-5 h-[2px] bg-[#E85D2A] rounded-full" />
          </div>

          {/* Headline - Big & Bold */}
          <h2 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-[56px] text-[#102942] tracking-tight leading-tight">
            Why EcoSummit
          </h2>

          {/* Shortened, Punchy Narrative */}
          <p className="font-sans text-sm sm:text-base text-[#59615D] leading-relaxed max-w-lg mx-auto mt-3 font-normal">
            Authentic, safe, and unforgettable Himalayan adventures tailored to you.
          </p>
        </div>

        {/* ── 2x2 Art-Style Card Grid Matching Reference Design ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* ═════════════════════════════════════════════════════════════
              CARD 1: Local Expertise and Authentic Experiences
              Corners: Rounded Top-Left & Bottom-Left
              Layout: Mountain Hiker (Left) | Text (Right, text-right)
             ═════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-tl-[48px] rounded-bl-[48px] sm:rounded-tl-[60px] sm:rounded-bl-[60px] rounded-tr-2xl rounded-br-2xl bg-gradient-to-b from-[#021B38] via-[#073669] to-[#0F64B2] p-7 sm:p-9 lg:p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 group hover:-translate-y-1 relative overflow-hidden min-h-[310px]"
          >
            {/* Mountain Hiker Illustration (Left) */}
            <div className="w-full sm:w-[44%] shrink-0 flex items-end justify-center sm:justify-start -mb-2 sm:-mb-4 self-end">
              <svg
                viewBox="0 0 210 190"
                fill="none"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full max-w-[200px] max-h-[190px] select-none pointer-events-none drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
              >
                {/* Mountain Ridge Base extending to edge */}
                <path d="M5 165 L45 135 L80 148 L125 110 L175 155 L205 168" strokeWidth="2.2" />
                <path d="M25 150 L45 135 L65 158" opacity="0.6" strokeWidth="1.4" />
                <path d="M100 130 L125 110 L145 140" opacity="0.6" strokeWidth="1.4" />
                <path d="M0 178 C35 168 75 174 115 164 C150 156 185 170 205 180" strokeDasharray="3 3" opacity="0.4" />

                {/* Standing Hiker with Binoculars */}
                <g id="standing-hiker">
                  {/* Head & Cap */}
                  <ellipse cx="68" cy="38" rx="7" ry="8" />
                  <path d="M60 36 C60 31 76 31 76 36" />
                  <path d="M58 38 L80 38" strokeWidth="2" />
                  
                  {/* Binoculars */}
                  <rect x="73" y="35" width="14" height="6" rx="2" fill="white" fillOpacity="0.2" strokeWidth="1.4" />
                  <line x1="87" y1="38" x2="104" y2="38" strokeDasharray="2 2" opacity="0.75" />
                  
                  {/* Arms holding binoculars */}
                  <path d="M62 48 L71 44 L76 39" strokeWidth="1.7" />
                  <path d="M68 50 L78 46 L81 39" strokeWidth="1.7" />
                  
                  {/* Torso & Jacket */}
                  <path d="M60 46 L75 46 L73 78 L58 78 Z" strokeWidth="1.7" />
                  
                  {/* Backpack */}
                  <path d="M58 48 C50 50 49 70 58 76 Z" fill="white" fillOpacity="0.2" strokeWidth="1.5" />
                  <path d="M58 53 C52 55 52 66 58 70" opacity="0.7" />
                  
                  {/* Legs & Boots */}
                  <line x1="63" y1="78" x2="60" y2="114" strokeWidth="2.2" />
                  <line x1="70" y1="78" x2="75" y2="114" strokeWidth="2.2" />
                  <path d="M55 114 L64 114 L62 120 L53 120 Z" fill="white" fillOpacity="0.3" strokeWidth="1.4" />
                  <path d="M71 114 L80 114 L82 120 L73 120 Z" fill="white" fillOpacity="0.3" strokeWidth="1.4" />
                </g>

                {/* Seated Hiker with Map */}
                <g id="seated-hiker">
                  {/* Head */}
                  <circle cx="114" cy="74" r="7.5" />
                  <path d="M107 72 C107 67 121 67 121 72" />
                  
                  {/* Torso & Backpack */}
                  <path d="M107 83 L121 83 L116 112 L103 112 Z" strokeWidth="1.7" />
                  <path d="M103 85 C96 88 96 100 103 108 Z" fill="white" fillOpacity="0.2" strokeWidth="1.4" />
                  
                  {/* Arms & Folded Map */}
                  <path d="M109 87 L120 97" strokeWidth="1.6" />
                  <path d="M119 87 L130 97" strokeWidth="1.6" />
                  <path d="M118 92 L136 85 L149 94 L132 101 Z" fill="white" fillOpacity="0.2" strokeWidth="1.8" />
                  <line x1="127" y1="89" x2="141" y2="98" strokeDasharray="1.5 1.5" opacity="0.7" />
                  
                  {/* Bent Sitting Legs */}
                  <path d="M105 112 L96 125 L116 133" strokeWidth="2.2" />
                  <path d="M114 112 L125 123 L136 130" strokeWidth="2.2" />
                  <path d="M112 131 L120 133 L118 139 L110 137 Z" fill="white" fillOpacity="0.3" strokeWidth="1.4" />
                  <path d="M134 128 L143 130 L141 136 L132 134 Z" fill="white" fillOpacity="0.3" strokeWidth="1.4" />
                </g>
              </svg>
            </div>

            {/* Text Block (Right, right-aligned) */}
            <div className="w-full sm:w-[56%] flex flex-col justify-start sm:justify-center text-left sm:text-right">
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white leading-snug tracking-tight mb-3">
                Local Expertise and Authentic Experiences
              </h3>
              <p className="text-xs sm:text-[13.5px] text-white/90 leading-relaxed font-normal">
                Explore Nepal with experienced local guides who know the mountains, culture, and hidden trails deeply. Our team ensures genuine experiences while supporting local communities and sustainable tourism.
              </p>
            </div>
          </motion.div>

          {/* ═════════════════════════════════════════════════════════════
              CARD 2: Customized Trips for Every Traveler
              Corners: Rounded Top-Right & Bottom-Right
              Layout: Text (Left, text-left) | Suitcase & Trail (Right)
             ═════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-tr-[48px] rounded-br-[48px] sm:rounded-tr-[60px] sm:rounded-br-[60px] rounded-tl-2xl rounded-bl-2xl bg-gradient-to-b from-[#021B38] via-[#073669] to-[#0F64B2] p-7 sm:p-9 lg:p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col-reverse sm:flex-row items-center sm:items-end justify-between gap-6 group hover:-translate-y-1 relative overflow-hidden min-h-[310px]"
          >
            {/* Text Block (Left, left-aligned) */}
            <div className="w-full sm:w-[56%] flex flex-col justify-start sm:justify-center text-left">
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white leading-snug tracking-tight mb-3">
                Customized Trips for Every Traveler
              </h3>
              <p className="text-xs sm:text-[13.5px] text-white/90 leading-relaxed font-normal">
                Whether you are planning a trekking adventure, cultural tour, peak climbing expedition, or family holiday, we design flexible itineraries based on your interests, schedule, fitness level, and budget.
              </p>
            </div>

            {/* Suitcase & Flight Loop Illustration (Right) */}
            <div className="w-full sm:w-[44%] shrink-0 flex items-end justify-center sm:justify-end -mb-2 sm:-mb-4 self-end">
              <svg
                viewBox="0 0 210 190"
                fill="none"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full max-w-[200px] max-h-[190px] select-none pointer-events-none drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
              >
                {/* Looping dotted flight trail */}
                <path d="M15 120 C18 45 80 20 105 65 C120 95 82 135 125 135 C155 135 165 85 185 55" strokeDasharray="4 4" opacity="0.65" strokeWidth="1.6" />
                
                {/* Small Airplane on trail */}
                <g transform="translate(175, 45) rotate(-35)">
                  <path d="M12 0 L15 8 L25 10 L15 12 L12 21 L9 12 L0 10 L9 8 Z" fill="white" strokeWidth="1.2" />
                </g>

                {/* Location Map Pins */}
                <g transform="translate(58, 42)">
                  <path d="M10 2 C5.6 2 2 5.6 2 10 C2 15 10 23 10 23 C10 23 18 15 18 10 C18 5.6 14.4 2 10 2 Z" fill="white" fillOpacity="0.22" strokeWidth="1.6" />
                  <circle cx="10" cy="10" r="3.2" fill="white" />
                </g>
                <g transform="translate(20, 92)">
                  <path d="M8 2 C4.7 2 2 4.7 2 8 C2 12 8 19 8 19 C8 19 14 12 14 8 C14 4.7 11.3 2 8 2 Z" fill="white" fillOpacity="0.22" strokeWidth="1.6" />
                  <circle cx="8" cy="8" r="2.6" fill="white" />
                </g>

                {/* Travel Suitcase */}
                <g transform="translate(95, 82)">
                  {/* Handle */}
                  <path d="M22 14 L22 5 C22 3 24 1 28 1 L38 1 C42 1 44 3 44 5 L44 14" strokeWidth="1.8" />
                  {/* Main Luggage Body */}
                  <rect x="6" y="14" width="54" height="64" rx="9" fill="white" fillOpacity="0.18" strokeWidth="2.2" />
                  {/* Grooves & Corner Bumpers */}
                  <line x1="21" y1="14" x2="21" y2="78" opacity="0.6" strokeWidth="1.4" />
                  <line x1="45" y1="14" x2="45" y2="78" opacity="0.6" strokeWidth="1.4" />
                  <rect x="27" y="36" width="12" height="18" rx="3" strokeWidth="1.3" opacity="0.75" />
                  {/* Wheels */}
                  <circle cx="17" cy="80" r="3.5" fill="white" />
                  <circle cx="49" cy="80" r="3.5" fill="white" />
                </g>

                {/* Retro Camera */}
                <g transform="translate(48, 120)">
                  <rect x="0" y="8" width="46" height="32" rx="5" fill="white" fillOpacity="0.22" strokeWidth="1.8" />
                  <path d="M13 8 L17 3 L29 3 L33 8" strokeWidth="1.6" />
                  <circle cx="23" cy="24" r="9.5" strokeWidth="2" fill="white" fillOpacity="0.12" />
                  <circle cx="23" cy="24" r="4.8" fill="white" />
                  <circle cx="38" cy="14" r="2.2" fill="white" />
                </g>

                {/* Postcards / Stickers */}
                <g transform="translate(132, 50) rotate(14)">
                  <rect x="0" y="0" width="30" height="22" rx="3" fill="white" fillOpacity="0.15" strokeWidth="1.3" />
                  <path d="M4 16 L11 9 L17 14 L22 10 L26 16" opacity="0.75" strokeWidth="1.2" />
                  <circle cx="22" cy="6" r="2.2" opacity="0.75" />
                </g>
              </svg>
            </div>
          </motion.div>

          {/* ═════════════════════════════════════════════════════════════
              CARD 3: Luxury & Premium Experiences
              Corners: Rounded Top-Right & Bottom-Left
              Layout: Text (Left, text-left) | Airplane & Passport (Right)
             ═════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-tr-[48px] rounded-bl-[48px] sm:rounded-tr-[60px] sm:rounded-bl-[60px] rounded-tl-2xl rounded-br-2xl bg-gradient-to-b from-[#021B38] via-[#073669] to-[#0F64B2] p-7 sm:p-9 lg:p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col-reverse sm:flex-row items-center sm:items-end justify-between gap-6 group hover:-translate-y-1 relative overflow-hidden min-h-[310px]"
          >
            {/* Text Block (Left, left-aligned) */}
            <div className="w-full sm:w-[56%] flex flex-col justify-start sm:justify-center text-left">
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white leading-snug tracking-tight mb-3">
                Luxury &amp; Premium Experiences
              </h3>
              <p className="text-xs sm:text-[13.5px] text-white/90 leading-relaxed font-normal">
                Enjoy carefully designed journeys with premium accommodations, private transportation, personalized services, and attention to every detail for a comfortable and elevated travel experience.
              </p>
            </div>

            {/* Airplane & Passport Illustration (Right) */}
            <div className="w-full sm:w-[44%] shrink-0 flex items-end justify-center sm:justify-end -mb-2 sm:-mb-4 self-end">
              <svg
                viewBox="0 0 210 190"
                fill="none"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full max-w-[200px] max-h-[190px] select-none pointer-events-none drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
              >
                {/* Commercial Jet Airliner */}
                <g transform="translate(18, 62) rotate(-22)">
                  {/* Fuselage */}
                  <path d="M0 24 C10 18 55 18 85 24 C95 26 100 28 100 28 C100 28 95 30 85 32 C55 38 10 38 0 32 Z" fill="white" fillOpacity="0.2" strokeWidth="2.2" />
                  {/* Left & Right Swept Wings */}
                  <path d="M42 20 L24 -12 L40 -12 L70 21" fill="white" fillOpacity="0.25" strokeWidth="1.8" />
                  <path d="M42 36 L24 68 L40 68 L70 35" fill="white" fillOpacity="0.25" strokeWidth="1.8" />
                  {/* Jet Engines */}
                  <rect x="36" y="2" width="12" height="6" rx="2" fill="white" fillOpacity="0.3" strokeWidth="1.2" />
                  <rect x="36" y="48" width="12" height="6" rx="2" fill="white" fillOpacity="0.3" strokeWidth="1.2" />
                  {/* Tail Stabilizers */}
                  <path d="M10 21 L-3 3 L12 3 L22 22" fill="white" fillOpacity="0.3" strokeWidth="1.8" />
                  {/* Cabin Windows */}
                  <circle cx="45" cy="28" r="1.6" fill="white" />
                  <circle cx="53" cy="28" r="1.6" fill="white" />
                  <circle cx="61" cy="28" r="1.6" fill="white" />
                  <circle cx="69" cy="28" r="1.6" fill="white" />
                </g>

                {/* Speed / vapor trails */}
                <path d="M10 105 C32 105 52 100 74 90" strokeDasharray="3 3" opacity="0.55" strokeWidth="1.4" />
                <path d="M22 120 C48 120 74 113 95 102" strokeDasharray="3 3" opacity="0.45" strokeWidth="1.4" />

                {/* Passport Booklet & Globe */}
                <g transform="translate(108, 52) rotate(12)">
                  <rect x="0" y="0" width="58" height="82" rx="7" fill="white" fillOpacity="0.18" strokeWidth="2.2" />
                  {/* Globe Grid */}
                  <circle cx="29" cy="34" r="15" strokeWidth="1.6" />
                  <ellipse cx="29" cy="34" rx="15" ry="7.5" opacity="0.75" strokeWidth="1.3" />
                  <ellipse cx="29" cy="34" rx="7.5" ry="15" opacity="0.75" strokeWidth="1.3" />
                  <line x1="14" y1="34" x2="44" y2="34" opacity="0.75" strokeWidth="1.3" />
                  <line x1="29" y1="19" x2="29" y2="49" opacity="0.75" strokeWidth="1.3" />
                  {/* Text lines on passport */}
                  <line x1="14" y1="60" x2="44" y2="60" strokeWidth="2" opacity="0.8" />
                  <line x1="18" y1="67" x2="40" y2="67" opacity="0.6" strokeWidth="1.4" />
                </g>

                {/* Boarding pass ticket */}
                <g transform="translate(86, 90) rotate(-6)">
                  <rect x="0" y="0" width="64" height="36" rx="4" fill="white" fillOpacity="0.14" strokeWidth="1.5" />
                  <line x1="10" y1="11" x2="34" y2="11" strokeWidth="2" opacity="0.85" />
                  <line x1="10" y1="19" x2="28" y2="19" opacity="0.65" strokeWidth="1.3" />
                  {/* Barcode lines */}
                  <line x1="44" y1="7" x2="44" y2="29" strokeWidth="1.3" opacity="0.75" />
                  <line x1="48" y1="7" x2="48" y2="29" strokeWidth="2.2" opacity="0.75" />
                  <line x1="52" y1="7" x2="52" y2="29" strokeWidth="1.2" opacity="0.75" />
                  <line x1="56" y1="7" x2="56" y2="29" strokeWidth="1.9" opacity="0.75" />
                </g>
              </svg>
            </div>
          </motion.div>

          {/* ═════════════════════════════════════════════════════════════
              CARD 4: 24/7 Dedicated Travel Assistance
              Corners: Rounded Top-Left & Bottom-Right
              Layout: Support Agents (Left) | Text (Right, text-right)
             ═════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-tl-[48px] rounded-br-[48px] sm:rounded-tl-[60px] sm:rounded-br-[60px] rounded-tr-2xl rounded-bl-2xl bg-gradient-to-b from-[#021B38] via-[#073669] to-[#0F64B2] p-7 sm:p-9 lg:p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 group hover:-translate-y-1 relative overflow-hidden min-h-[310px]"
          >
            {/* Support Operators Illustration (Left) */}
            <div className="w-full sm:w-[48%] shrink-0 flex items-end justify-center sm:justify-start -mb-2 sm:-mb-4 self-end">
              <svg
                viewBox="0 0 220 190"
                fill="none"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full max-w-[215px] max-h-[190px] select-none pointer-events-none drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
              >
                {/* Desk surface */}
                <polygon points="10,140 160,140 205,164 45,164" fill="white" fillOpacity="0.12" strokeWidth="2" />

                {/* Computer Monitors */}
                <g transform="translate(70, 78)">
                  <rect x="0" y="0" width="28" height="38" rx="2" fill="white" fillOpacity="0.2" strokeWidth="1.7" />
                  <line x1="4" y1="8" x2="24" y2="8" opacity="0.65" strokeWidth="1.2" />
                  <line x1="4" y1="15" x2="20" y2="15" opacity="0.65" strokeWidth="1.2" />
                  <path d="M5 30 L11 23 L17 28 L23 21" opacity="0.85" strokeWidth="1.3" />
                  <line x1="14" y1="38" x2="14" y2="47" strokeWidth="2.2" />
                  <line x1="8" y1="47" x2="20" y2="47" strokeWidth="2.2" />
                </g>
                <g transform="translate(102, 73)">
                  <rect x="0" y="0" width="30" height="40" rx="2" fill="white" fillOpacity="0.25" strokeWidth="1.9" />
                  <line x1="5" y1="8" x2="25" y2="8" opacity="0.75" strokeWidth="1.3" />
                  <path d="M5 28 L13 19 L19 25 L25 17" opacity="0.85" strokeWidth="1.3" />
                  <line x1="15" y1="40" x2="15" y2="50" strokeWidth="2.2" />
                  <line x1="9" y1="50" x2="21" y2="50" strokeWidth="2.2" />
                </g>
                <g transform="translate(136, 78)">
                  <rect x="0" y="0" width="28" height="38" rx="2" fill="white" fillOpacity="0.2" strokeWidth="1.7" />
                  <line x1="4" y1="8" x2="24" y2="8" opacity="0.65" strokeWidth="1.2" />
                  <line x1="14" y1="38" x2="14" y2="47" strokeWidth="2.2" />
                  <line x1="8" y1="47" x2="20" y2="47" strokeWidth="2.2" />
                </g>

                {/* Operator 1 (Left agent speaking with headset) */}
                <g transform="translate(16, 50)">
                  <circle cx="17" cy="14" r="8.5" />
                  {/* Hair */}
                  <path d="M8 14 C8 5 26 5 26 14 C26 23 24 29 21 33" strokeWidth="1.8" />
                  <path d="M8 12 C8 4 25 4 25 12" strokeWidth="2" />
                  {/* Earphone & Mic */}
                  <rect x="6" y="11" width="4.5" height="7.5" rx="2" fill="white" />
                  <path d="M8 16 C8 25 15 25 19 23" strokeWidth="1.5" />
                  <circle cx="19" cy="23" r="1.6" fill="white" />
                  {/* Body & Shoulders */}
                  <path d="M6 35 C6 28 28 28 28 35 L28 68 L4 68 Z" fill="white" fillOpacity="0.16" strokeWidth="1.8" />
                  {/* Hand gestures */}
                  <path d="M6 35 L-2 49 L10 54" strokeWidth="1.6" />
                  <path d="M26 35 L34 48 L26 52" strokeWidth="1.6" />
                </g>

                {/* Operator 2 (Center agent with headset) */}
                <g transform="translate(50, 44)">
                  <circle cx="17" cy="14" r="8.5" />
                  <path d="M8 12 C10 6 24 6 26 12" />
                  <path d="M8 12 C8 4 26 4 26 12" strokeWidth="2" />
                  {/* Headset bar & dual cups */}
                  <rect x="6" y="11" width="4.5" height="6.5" rx="2" fill="white" />
                  <rect x="23" y="11" width="4.5" height="6.5" rx="2" fill="white" />
                  <path d="M25 15 C25 24 19 24 16 22" strokeWidth="1.5" />
                  {/* Body */}
                  <path d="M8 33 C8 26 26 26 26 33 L28 71 L6 71 Z" fill="white" fillOpacity="0.16" strokeWidth="1.8" />
                  {/* Typing arms */}
                  <path d="M8 33 L17 48 L32 48" strokeWidth="1.6" />
                </g>

                {/* Operator 3 (Right agent) */}
                <g transform="translate(86, 47)">
                  <circle cx="15" cy="14" r="8" />
                  <path d="M7 12 C7 4 23 4 23 12" strokeWidth="2" />
                  <rect x="5" y="11" width="4" height="6.5" rx="2" fill="white" />
                  <path d="M7 33 C7 26 23 26 23 33 L25 64 L5 64 Z" fill="white" fillOpacity="0.13" strokeWidth="1.7" />
                </g>
              </svg>
            </div>

            {/* Text Block (Right, right-aligned) */}
            <div className="w-full sm:w-[52%] flex flex-col justify-start sm:justify-center text-left sm:text-right">
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white leading-snug tracking-tight mb-3">
                24/7 Dedicated Travel Assistance
              </h3>
              <p className="text-xs sm:text-[13.5px] text-white/90 leading-relaxed font-normal">
                Travel with confidence knowing our support team is available before, during, and after your trip. We are always ready to assist with guidance, updates, and any travel needs throughout your adventure.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
