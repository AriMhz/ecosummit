import React, { useState } from 'react';
import type { Journey } from '../../types';
import { 
  Compass, 
  Mountain, 
  Maximize2, 
  Minimize2,
  Info
} from 'lucide-react';

interface RouteMapVisualizerProps {
  journey: Journey;
  elevationPoints: Array<{ point: string; altitude: number; label?: string }>;
}

export const RouteMapVisualizer: React.FC<RouteMapVisualizerProps> = ({ journey, elevationPoints }) => {
  const [activeTab, setActiveTab] = useState<'map' | 'elevation'>('map');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Identify journey region or specific route
  const slug = journey.slug.toLowerCase();
  const isAnnapurna = slug.includes('annapurna') || slug.includes('poon');
  const isManaslu = slug.includes('manaslu');
  const isLangtang = slug.includes('langtang');
  const isEverest = slug.includes('everest') || slug.includes('gokyo') || slug.includes('khumbu') || (!isAnnapurna && !isManaslu && !isLangtang);

  // Determine top banner title
  const bannerTitle = isAnnapurna
    ? 'Annapurna Base Camp Trek via Poon Hill – 12 days'
    : isEverest
    ? 'Everest Base Camp & Kala Patthar Trek – 14 days'
    : isManaslu
    ? 'Manaslu Circuit & Larkya La Pass Trek – 15 days'
    : `${journey.title} – ${journey.duration}`;

  // Region label for the Nepal mini map
  const nepalPinLabel = isAnnapurna
    ? 'ANNAPURNA B.C'
    : isEverest
    ? 'EVEREST B.C'
    : isManaslu
    ? 'MANASLU CIRCUIT'
    : journey.region.toUpperCase().slice(0, 16);

  const nepalPinCoords = isAnnapurna
    ? { cx: 132, cy: 110 }
    : isEverest
    ? { cx: 188, cy: 125 }
    : isManaslu
    ? { cx: 148, cy: 114 }
    : { cx: 155, cy: 118 };

  return (
    <div className={`space-y-5 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900/95 p-4 sm:p-8 overflow-y-auto flex flex-col justify-center' : ''}`}>
      {/* Top Controls: Mode Switcher & Fullscreen */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-[#183E63] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-[#E5A93C]" />
            <span>Illustrated Route Map</span>
          </button>
          <button
            onClick={() => setActiveTab('elevation')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'elevation'
                ? 'bg-[#183E63] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mountain className="w-4 h-4 text-emerald-500" />
            <span>Elevation Profile</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold font-mono">
            MAX ALTITUDE: {journey.maxAltitude.split(' ')[0]}
          </span>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Close' : 'Expand'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'map' ? (
        /* ════════════════════════════════════════════════════════════════
           ILLUSTRATED ROUTE MAP (Exact style of the user's reference image)
           ════════════════════════════════════════════════════════════════ */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
          {/* Top Navy Blue Header Banner */}
          <div className="bg-[#1D3557] px-5 py-4 sm:py-5 text-center relative shadow-sm">
            <h4 className="text-white font-sans font-bold text-base sm:text-xl lg:text-2xl tracking-wide">
              {bannerTitle}
            </h4>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full overflow-x-auto bg-[#FAFBFD] p-2 sm:p-4">
            <svg
              viewBox="0 0 950 820"
              className="w-full h-auto min-w-[750px] select-none"
              style={{ maxHeight: isFullscreen ? '82vh' : '780px' }}
            >
              <defs>
                {/* Subtle map grid background */}
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.4" strokeDasharray="2,2" />
                </pattern>

                {/* Trail drop shadow */}
                <filter id="trailGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0284C7" floodOpacity="0.25" />
                </filter>
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.15" />
                </filter>
              </defs>

              <rect width="950" height="820" fill="#FAFBFD" />
              <rect width="950" height="820" fill="url(#grid)" opacity="0.6" />

              {/* ─────────────────────────────────────────────────────────────
                  TOP-LEFT: NEPAL MAP INSET
                  ───────────────────────────────────────────────────────────── */}
              <g transform="translate(40, 20)">
                <text x="145" y="30" fill="#1D3557" fontSize="13" fontWeight="bold" letterSpacing="0.08em" textAnchor="middle">
                  {nepalPinLabel}
                </text>
                {/* Stylized Nepal Outline Vector */}
                <path
                  d="M 50 88 C 65 72, 85 64, 115 66 C 145 68, 175 72, 200 85 C 220 95, 235 110, 245 130 C 235 142, 215 152, 195 156 C 160 162, 125 158, 95 150 C 70 144, 52 130, 48 110 C 46 98, 48 92, 50 88 Z"
                  fill="#38BDF8"
                  stroke="#0284C7"
                  strokeWidth="2"
                  filter="url(#shadow)"
                />
                {/* Secondary Nepal contour details */}
                <path
                  d="M 115 66 C 140 68, 180 75, 215 95 C 230 105, 240 120, 245 130 L 225 142 C 185 135, 140 130, 95 140 Z"
                  fill="#0284C7"
                  opacity="0.3"
                />
                {/* Pinpoint for trek region */}
                <circle cx={nepalPinCoords.cx} cy={nepalPinCoords.cy} r="7" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
                <circle cx={nepalPinCoords.cx} cy={nepalPinCoords.cy} r="12" fill="#EF4444" opacity="0.3" />
              </g>

              {/* ─────────────────────────────────────────────────────────────
                  TOP-RIGHT: COMPASS ROSE
                  ───────────────────────────────────────────────────────────── */}
              <g transform="translate(840, 30)">
                {/* Compass Circle */}
                <circle cx="0" cy="50" r="32" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3,3" />
                {/* Star Points */}
                {/* North (Dark Blue) */}
                <polygon points="0,50 -7,50 0,15" fill="#1D3557" />
                <polygon points="0,50 7,50 0,15" fill="#64748B" />
                {/* South */}
                <polygon points="0,50 7,50 0,85" fill="#1D3557" />
                <polygon points="0,50 -7,50 0,85" fill="#64748B" />
                {/* East */}
                <polygon points="0,50 0,43 35,50" fill="#1D3557" />
                <polygon points="0,50 0,57 35,50" fill="#64748B" />
                {/* West */}
                <polygon points="0,50 0,57 -35,50" fill="#1D3557" />
                <polygon points="0,50 0,43 -35,50" fill="#64748B" />
                {/* Diagonal Points */}
                <polygon points="0,50 -3,47 22,28" fill="#94A3B8" />
                <polygon points="0,50 3,47 -22,28" fill="#94A3B8" />
                <polygon points="0,50 3,53 22,72" fill="#94A3B8" />
                <polygon points="0,50 -3,53 -22,72" fill="#94A3B8" />
                {/* Center Pin */}
                <circle cx="0" cy="50" r="3" fill="#FFFFFF" stroke="#1D3557" strokeWidth="2" />
                {/* Cardinal Letters */}
                <text x="0" y="8" fill="#1D3557" fontSize="13" fontWeight="bold" textAnchor="middle" fontStyle="italic">N</text>
                <text x="0" y="103" fill="#1D3557" fontSize="11" fontWeight="bold" textAnchor="middle" fontStyle="italic">S</text>
                <text x="45" y="54" fill="#1D3557" fontSize="11" fontWeight="bold" textAnchor="middle" fontStyle="italic">E</text>
                <text x="-45" y="54" fill="#1D3557" fontSize="11" fontWeight="bold" textAnchor="middle" fontStyle="italic">W</text>
              </g>

              {/* ─────────────────────────────────────────────────────────────
                  BACKGROUND WATERMARK LOGO / MOTIF (Matches subtle branding in image)
                  ───────────────────────────────────────────────────────────── */}
              <g opacity="0.05" transform="translate(180, 240)">
                <text x="300" y="120" fontSize="120" fontWeight="900" fill="#1D3557" letterSpacing="0.1em">ECO</text>
                <text x="250" y="230" fontSize="110" fontWeight="900" fill="#1D3557" letterSpacing="0.08em">SUMMIT</text>
                <text x="260" y="290" fontSize="30" fontWeight="bold" fill="#1D3557" letterSpacing="0.25em">TREKS & EXPEDITIONS</text>
              </g>

              {/* ─────────────────────────────────────────────────────────────
                  ROUTE SPECIFIC CONTENT: ANNAPURNA vs EVEREST vs GENERAL
                  ───────────────────────────────────────────────────────────── */}
              {isAnnapurna ? (
                /* ════════ ANNAPURNA BASE CAMP MAP (Exact Match to Image 1) ════════ */
                <g>
                  {/* --- MOUNTAIN PEAKS ACROSS TOP SKYLINE --- */}
                  {/* Himchuli 6111m */}
                  <g transform="translate(520, 205)">
                    <polygon points="20,0 40,30 0,30" fill="#1D3557" />
                    <polygon points="20,0 28,12 20,9 12,12" fill="#FFFFFF" />
                    <text x="20" y="42" fill="#1D3557" fontSize="10.5" fontWeight="bold" textAnchor="middle">Himchuli</text>
                    <text x="20" y="53" fill="#64748B" fontSize="9.5" fontWeight="semibold" textAnchor="middle">6111m</text>
                  </g>

                  {/* Annapurna South 7219m */}
                  <g transform="translate(485, 275)">
                    <polygon points="20,0 40,30 0,30" fill="#1D3557" />
                    <polygon points="20,0 28,12 20,9 12,12" fill="#FFFFFF" />
                    <text x="20" y="42" fill="#1D3557" fontSize="10.5" fontWeight="bold" textAnchor="middle">Annapurna South</text>
                    <text x="20" y="53" fill="#64748B" fontSize="9.5" fontWeight="semibold" textAnchor="middle">7219m</text>
                  </g>

                  {/* Annapurna I 8091m */}
                  <g transform="translate(605, 140)">
                    <polygon points="24,0 48,36 0,36" fill="#1D3557" />
                    <polygon points="24,0 34,14 24,10 14,14" fill="#FFFFFF" />
                    <text x="24" y="48" fill="#1D3557" fontSize="11.5" fontWeight="bold" textAnchor="middle">Annapurna I</text>
                    <text x="24" y="60" fill="#D46238" fontSize="10.5" fontWeight="black" textAnchor="middle">8091m</text>
                  </g>

                  {/* Tent Peak 5663m */}
                  <g transform="translate(710, 155)">
                    <polygon points="18,0 36,28 0,28" fill="#1D3557" />
                    <polygon points="18,0 25,11 18,8 11,11" fill="#FFFFFF" />
                    <text x="18" y="40" fill="#1D3557" fontSize="10.5" fontWeight="bold" textAnchor="middle">Tent Peak</text>
                    <text x="18" y="51" fill="#64748B" fontSize="9.5" fontWeight="semibold" textAnchor="middle">5663m</text>
                  </g>

                  {/* Annapurna III 7555m */}
                  <g transform="translate(805, 175)">
                    <polygon points="22,0 44,32 0,32" fill="#1D3557" />
                    <polygon points="22,0 31,13 22,9 13,13" fill="#FFFFFF" />
                    <text x="22" y="44" fill="#1D3557" fontSize="10.5" fontWeight="bold" textAnchor="middle">Annapurna III</text>
                    <text x="22" y="55" fill="#64748B" fontSize="9.5" fontWeight="semibold" textAnchor="middle">7555m</text>
                  </g>

                  {/* Machhapuchhre (Fishtail) 6933m */}
                  <g transform="translate(870, 245)">
                    <polygon points="14,0 22,30 6,30" fill="#1D3557" />
                    <polygon points="26,0 34,30 18,30" fill="#1D3557" />
                    <polygon points="14,0 18,10 14,8 10,10" fill="#FFFFFF" />
                    <polygon points="26,0 30,10 26,8 22,10" fill="#FFFFFF" />
                    <text x="20" y="42" fill="#1D3557" fontSize="10.5" fontWeight="bold" textAnchor="middle">Machhapuchhre</text>
                    <text x="20" y="53" fill="#64748B" fontSize="9.5" fontWeight="semibold" textAnchor="middle">6933m</text>
                  </g>

                  {/* --- HIGHWAY & FLIGHT PATHS AT BOTTOM --- */}
                  {/* Domestic Flight KTM to Pokhara: Dotted curved arc */}
                  <path
                    d="M 520 730 C 440 680, 370 690, 310 720"
                    fill="none"
                    stroke="#1D3557"
                    strokeWidth="2.5"
                    strokeDasharray="4,4"
                  />
                  {/* Airplane icon on flight route */}
                  <g transform="translate(420, 688) rotate(-165)">
                    <path d="M 0,-6 L 4,5 L 0,3 L -4,5 Z" fill="#1D3557" />
                  </g>

                  {/* Ground Road Pokhara to KTM (bus transport): Dashed Line */}
                  <path
                    d="M 520 745 C 440 760, 380 755, 310 735"
                    fill="none"
                    stroke="#1D3557"
                    strokeWidth="3.5"
                    strokeDasharray="8,5"
                  />
                  {/* Bus icon on KTM-Pokhara road */}
                  <g transform="translate(400, 742)">
                    <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#1D3557" />
                    <circle cx="-5" cy="5" r="1.5" fill="#334155" />
                    <circle cx="5" cy="5" r="1.5" fill="#334155" />
                  </g>

                  {/* Ground Road Pokhara to Nayapul */}
                  <path
                    d="M 305 715 C 310 685, 320 670, 325 655"
                    fill="none"
                    stroke="#1D3557"
                    strokeWidth="4"
                    strokeDasharray="7,4"
                  />
                  <g transform="translate(325, 680) rotate(-70)">
                    <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#1D3557" />
                  </g>

                  {/* --- SECONDARY TREKKING / DESCENT ROUTE (Jhinu Danda to Nayapul) --- */}
                  <path
                    d="M 555 580 C 530 610, 420 635, 325 655"
                    fill="none"
                    stroke="#1D3557"
                    strokeWidth="3"
                    strokeDasharray="5,4"
                  />

                  {/* --- MAIN TREKKING TRAIL (Solid Blue Curve, matching image 1) --- */}
                  <path
                    d="M 325 655
                       C 310 635, 295 620, 290 605
                       C 285 585, 275 560, 270 540
                       C 260 515, 250 490, 240 480
                       C 255 490, 315 505, 355 520
                       C 385 530, 420 545, 450 560
                       C 485 575, 525 565, 555 550
                       C 580 535, 600 505, 615 480
                       C 630 450, 645 425, 665 395
                       C 685 365, 715 340, 735 315
                       C 745 300, 755 285, 750 270
                       C 740 250, 700 240, 660 250"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#trailGlow)"
                  />

                  {/* Poon Hill Viewpoint branch */}
                  <path
                    d="M 240 480 L 195 460"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="4"
                    strokeDasharray="4,3"
                  />

                  {/* Branch from Chhomrong down to Jhinu Danda */}
                  <path
                    d="M 555 550 L 555 580"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="4"
                  />

                  {/* --- TREKKER WALKING SILHOUETTES (along trail) --- */}
                  {/* Near Ghorepani */}
                  <g transform="translate(315, 495) scale(0.9)">
                    <circle cx="0" cy="-14" r="3" fill="#1D3557" />
                    <path d="M 0,-11 L 0,-2 L -4,6 M 0,-2 L 4,6 M -5,-8 L 0,-10 L 4,-6 M 3,-5 L 5,6" stroke="#1D3557" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <rect x="-4" y="-10" width="5" height="7" rx="1.5" fill="#1D3557" />
                  </g>
                  {/* Near Dovan */}
                  <g transform="translate(635, 415) scale(0.9)">
                    <circle cx="0" cy="-14" r="3" fill="#1D3557" />
                    <path d="M 0,-11 L 0,-2 L -4,6 M 0,-2 L 4,6 M -5,-8 L 0,-10 L 4,-6 M 3,-5 L 5,6" stroke="#1D3557" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <rect x="-4" y="-10" width="5" height="7" rx="1.5" fill="#1D3557" />
                  </g>
                  {/* Near Deurali */}
                  <g transform="translate(720, 320) scale(0.9)">
                    <circle cx="0" cy="-14" r="3" fill="#1D3557" />
                    <path d="M 0,-11 L 0,-2 L -4,6 M 0,-2 L 4,6 M -5,-8 L 0,-10 L 4,-6 M 3,-5 L 5,6" stroke="#1D3557" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <rect x="-4" y="-10" width="5" height="7" rx="1.5" fill="#1D3557" />
                  </g>

                  {/* --- WAYPOINTS & PINS --- */}
                  {/* Kathmandu */}
                  <g transform="translate(540, 735)">
                    {/* Pagoda temple icon */}
                    <path d="M -16,0 L 0,-12 L 16,0 M -12,0 L 0,-8 L 12,0 M -8,0 L 0,-5 L 8,0 M -10,0 L -10,8 L 10,8 L 10,0 Z" fill="#1D3557" />
                    {/* Day 1 badge */}
                    <circle cx="-16" cy="4" r="9" fill="#1D3557" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="-16" y="8" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">1</text>
                    <text x="0" y="24" fill="#1D3557" fontSize="12" fontWeight="bold" textAnchor="middle">Kathmandu</text>
                    <text x="0" y="36" fill="#64748B" fontSize="10" fontWeight="semibold" textAnchor="middle">1350m</text>
                  </g>

                  {/* Pokhara with [2, 10] badge */}
                  <g transform="translate(305, 715)">
                    <circle cx="0" cy="0" r="14" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
                    <text x="0" y="4" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">2,10</text>
                    <text x="0" y="26" fill="#1D3557" fontSize="12" fontWeight="bold" textAnchor="middle">Pokhara</text>
                    <text x="0" y="38" fill="#64748B" fontSize="10" fontWeight="semibold" textAnchor="middle">820m</text>
                  </g>

                  {/* Nayapul 1070m */}
                  <g transform="translate(325, 655)">
                    <circle cx="0" cy="0" r="6" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="-12" y="4" fill="#1D3557" fontSize="11" fontWeight="bold" textAnchor="end">Nayapul</text>
                    <text x="-12" y="16" fill="#64748B" fontSize="9.5" textAnchor="end">1070m</text>
                  </g>

                  {/* Hile */}
                  <g transform="translate(290, 605)">
                    <circle cx="0" cy="0" r="5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="-12" y="4" fill="#1D3557" fontSize="11" fontWeight="bold" textAnchor="end">Hile</text>
                  </g>

                  {/* Ulleri with [3] badge */}
                  <g transform="translate(270, 540)">
                    <circle cx="0" cy="0" r="11" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
                    <text x="0" y="4" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">3</text>
                    <text x="-16" y="0" fill="#1D3557" fontSize="11" fontWeight="bold" textAnchor="end">Ulleri</text>
                    <text x="-16" y="12" fill="#64748B" fontSize="9.5" textAnchor="end">2020m</text>
                  </g>

                  {/* Ghorepani with [4] badge */}
                  <g transform="translate(240, 480)">
                    <circle cx="0" cy="0" r="11" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
                    <text x="0" y="4" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">4</text>
                    <text x="16" y="-6" fill="#1D3557" fontSize="11.5" fontWeight="bold">Ghorepani</text>
                    <text x="16" y="6" fill="#64748B" fontSize="9.5">2840m</text>
                  </g>

                  {/* Poonhill Viewpoint 3210m */}
                  <g transform="translate(195, 460)">
                    <circle cx="0" cy="0" r="7" fill="#E5A93C" stroke="#1D3557" strokeWidth="2" />
                    <text x="0" y="-14" fill="#1D3557" fontSize="11.5" fontWeight="black" textAnchor="middle">Poonhill</text>
                    <text x="0" y="-2" fill="#D46238" fontSize="10" fontWeight="bold" textAnchor="middle">3210m</text>
                  </g>

                  {/* Tadapani 2630m */}
                  <g transform="translate(355, 520)">
                    <circle cx="0" cy="0" r="6" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="10" y="-8" fill="#1D3557" fontSize="11" fontWeight="bold">Tadapani</text>
                    <text x="10" y="4" fill="#64748B" fontSize="9.5">2630m</text>
                  </g>

                  {/* Chuile with [5] badge */}
                  <g transform="translate(450, 560)">
                    <circle cx="0" cy="0" r="11" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
                    <text x="0" y="4" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">5</text>
                    <text x="16" y="-6" fill="#1D3557" fontSize="11" fontWeight="bold">Chuile</text>
                    <text x="16" y="6" fill="#64748B" fontSize="9.5">2300m</text>
                  </g>

                  {/* Chhomrong with [6] badge */}
                  <g transform="translate(555, 550)">
                    <circle cx="0" cy="0" r="12" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
                    <text x="0" y="4" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">6</text>
                    <text x="18" y="-4" fill="#1D3557" fontSize="11.5" fontWeight="bold">Chhomrong</text>
                    <text x="18" y="8" fill="#64748B" fontSize="9.5">2140m</text>
                  </g>

                  {/* Sinuwa 2340m */}
                  <g transform="translate(605, 500)">
                    <circle cx="0" cy="0" r="6" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="12" y="4" fill="#1D3557" fontSize="11" fontWeight="bold">Sinuwa</text>
                    <text x="12" y="16" fill="#64748B" fontSize="9.5">2340m</text>
                  </g>

                  {/* Bamboo with [9] badge */}
                  <g transform="translate(635, 455)">
                    <circle cx="0" cy="0" r="11" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
                    <text x="0" y="4" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">9</text>
                    <text x="16" y="0" fill="#1D3557" fontSize="11" fontWeight="bold">Bamboo</text>
                    <text x="16" y="12" fill="#64748B" fontSize="9.5">2345m</text>
                  </g>

                  {/* Dovan 2600m */}
                  <g transform="translate(665, 395)">
                    <circle cx="0" cy="0" r="6" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="12" y="4" fill="#1D3557" fontSize="11" fontWeight="bold">Dovan</text>
                    <text x="12" y="16" fill="#64748B" fontSize="9.5">2600m</text>
                  </g>

                  {/* Himalaya with [7] badge */}
                  <g transform="translate(700, 360)">
                    <circle cx="0" cy="0" r="11" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
                    <text x="0" y="4" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">7</text>
                    <text x="16" y="0" fill="#1D3557" fontSize="11" fontWeight="bold">Himalaya</text>
                    <text x="16" y="12" fill="#64748B" fontSize="9.5">2950m</text>
                  </g>

                  {/* Deurali 3230m */}
                  <g transform="translate(735, 315)">
                    <circle cx="0" cy="0" r="6" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="12" y="4" fill="#1D3557" fontSize="11" fontWeight="bold">Deurali</text>
                    <text x="12" y="16" fill="#64748B" fontSize="9.5">3230m</text>
                  </g>

                  {/* Machhapuchhre B.C (MBC) 3700m */}
                  <g transform="translate(750, 270)">
                    <polygon points="0,-10 10,7 -10,7" fill="#1D3557" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="16" y="-2" fill="#1D3557" fontSize="11" fontWeight="bold">Machhapuchhre B.C</text>
                    <text x="16" y="10" fill="#64748B" fontSize="9.5">3700m</text>
                  </g>

                  {/* Annapurna Base Camp (ABC) 4130m with [8] badge & Tent */}
                  <g transform="translate(660, 250)">
                    {/* Expedition Tent Icon */}
                    <polygon points="0,-16 16,8 -16,8" fill="#D46238" stroke="#1D3557" strokeWidth="2" filter="url(#shadow)" />
                    <polygon points="0,-16 6,8 -6,8" fill="#FFFFFF" opacity="0.4" />
                    {/* Day 8 Badge */}
                    <circle cx="-18" cy="-8" r="12" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="-18" y="-4" fill="#FFFFFF" fontSize="11" fontWeight="black" textAnchor="middle">8</text>
                    <text x="0" y="24" fill="#1D3557" fontSize="13" fontWeight="black" textAnchor="middle">Annapurna B.C</text>
                    <text x="0" y="37" fill="#0284C7" fontSize="11" fontWeight="bold" textAnchor="middle">4130m</text>
                  </g>

                  {/* Jhinu Danda with Hot Spring icon */}
                  <g transform="translate(555, 595)">
                    <circle cx="0" cy="0" r="6" fill="#38BDF8" stroke="#1D3557" strokeWidth="1.5" />
                    <text x="-12" y="4" fill="#1D3557" fontSize="11" fontWeight="bold" textAnchor="end">Jhinu Danda</text>
                    <text x="-12" y="16" fill="#64748B" fontSize="9.5" textAnchor="end">1780m</text>
                    {/* Hot Spring Waves Icon */}
                    <g transform="translate(0, 24)">
                      <text x="0" y="0" fill="#0284C7" fontSize="10" fontWeight="bold" textAnchor="middle">Hot Spring</text>
                      <path d="M -6,6 C -4,4 -2,8 0,6 C 2,4 4,8 6,6" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                      <path d="M -6,10 C -4,8 -2,12 0,10 C 2,8 4,12 6,10" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                    </g>
                  </g>
                </g>
              ) : (
                /* ════════ EVEREST BASE CAMP & GENERAL HIMALAYAN ROUTE MAP ════════ */
                <g>
                  {/* Peaks across top */}
                  <g transform="translate(480, 160)">
                    <polygon points="20,0 40,30 0,30" fill="#1D3557" />
                    <polygon points="20,0 28,12 20,9 12,12" fill="#FFFFFF" />
                    <text x="20" y="42" fill="#1D3557" fontSize="11" fontWeight="bold" textAnchor="middle">Pumori</text>
                    <text x="20" y="53" fill="#64748B" fontSize="9.5" textAnchor="middle">7161m</text>
                  </g>

                  {/* Mt. Everest (8848.86m) - Centerpiece */}
                  <g transform="translate(610, 120)">
                    <polygon points="28,0 56,42 0,42" fill="#1D3557" />
                    <polygon points="28,0 40,16 28,12 16,16" fill="#FFFFFF" />
                    <text x="28" y="56" fill="#1D3557" fontSize="13" fontWeight="black" textAnchor="middle">Mt. Everest</text>
                    <text x="28" y="69" fill="#D46238" fontSize="11" fontWeight="black" textAnchor="middle">8,848.86m</text>
                  </g>

                  {/* Lhotse 8516m */}
                  <g transform="translate(730, 140)">
                    <polygon points="24,0 48,36 0,36" fill="#1D3557" />
                    <polygon points="24,0 34,14 24,10 14,14" fill="#FFFFFF" />
                    <text x="24" y="48" fill="#1D3557" fontSize="11" fontWeight="bold" textAnchor="middle">Lhotse</text>
                    <text x="24" y="60" fill="#64748B" fontSize="9.5" textAnchor="middle">8516m</text>
                  </g>

                  {/* Nuptse 7861m */}
                  <g transform="translate(560, 200)">
                    <polygon points="20,0 40,30 0,30" fill="#1D3557" />
                    <polygon points="20,0 28,12 20,9 12,12" fill="#FFFFFF" />
                    <text x="20" y="42" fill="#1D3557" fontSize="10.5" fontWeight="bold" textAnchor="middle">Nuptse</text>
                    <text x="20" y="53" fill="#64748B" fontSize="9.5" textAnchor="middle">7861m</text>
                  </g>

                  {/* Ama Dablam 6812m */}
                  <g transform="translate(800, 260)">
                    <polygon points="22,0 44,32 0,32" fill="#1D3557" />
                    <polygon points="22,0 31,13 22,9 13,13" fill="#FFFFFF" />
                    <text x="22" y="44" fill="#1D3557" fontSize="11" fontWeight="bold" textAnchor="middle">Ama Dablam</text>
                    <text x="22" y="56" fill="#64748B" fontSize="9.5" textAnchor="middle">6812m</text>
                  </g>

                  {/* Flight route KTM to Lukla */}
                  <path
                    d="M 520 740 C 440 700, 360 690, 300 660"
                    fill="none"
                    stroke="#1D3557"
                    strokeWidth="3"
                    strokeDasharray="4,4"
                  />
                  <g transform="translate(410, 695) rotate(-160)">
                    <path d="M 0,-6 L 4,5 L 0,3 L -4,5 Z" fill="#1D3557" />
                  </g>

                  {/* Everest Main Trekking Trail */}
                  <path
                    d="M 300 660
                       C 320 620, 350 580, 380 540
                       C 420 500, 480 470, 520 440
                       C 560 410, 610 370, 650 330
                       C 680 300, 700 260, 680 230"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="5"
                    strokeLinecap="round"
                    filter="url(#trailGlow)"
                  />

                  {/* Pheriche return loop */}
                  <path
                    d="M 650 330 C 620 370, 570 410, 520 440"
                    fill="none"
                    stroke="#1D3557"
                    strokeWidth="3"
                    strokeDasharray="5,4"
                  />

                  {/* Kathmandu */}
                  <g transform="translate(540, 740)">
                    <path d="M -16,0 L 0,-12 L 16,0 M -12,0 L 0,-8 L 12,0 M -8,0 L 0,-5 L 8,0 M -10,0 L -10,8 L 10,8 L 10,0 Z" fill="#1D3557" />
                    <circle cx="-16" cy="4" r="9" fill="#1D3557" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="-16" y="8" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">1</text>
                    <text x="0" y="24" fill="#1D3557" fontSize="12" fontWeight="bold" textAnchor="middle">Kathmandu</text>
                    <text x="0" y="36" fill="#64748B" fontSize="10" textAnchor="middle">1350m</text>
                  </g>

                  {/* Lukla Airstrip [2, 12] */}
                  <g transform="translate(300, 660)">
                    <circle cx="0" cy="0" r="14" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
                    <text x="0" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">2,12</text>
                    <text x="-16" y="4" fill="#1D3557" fontSize="11.5" fontWeight="bold" textAnchor="end">Lukla</text>
                    <text x="-16" y="16" fill="#64748B" fontSize="9.5" textAnchor="end">2840m</text>
                  </g>

                  {/* Phakding */}
                  <g transform="translate(340, 600)">
                    <circle cx="0" cy="0" r="6" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="12" y="4" fill="#1D3557" fontSize="11" fontWeight="bold">Phakding</text>
                    <text x="12" y="15" fill="#64748B" fontSize="9.5">2610m</text>
                  </g>

                  {/* Namche Bazaar [3, 4] */}
                  <g transform="translate(390, 530)">
                    <circle cx="0" cy="0" r="14" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
                    <text x="0" y="4" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">3,4</text>
                    <text x="18" y="-2" fill="#1D3557" fontSize="12" fontWeight="bold">Namche Bazaar</text>
                    <text x="18" y="10" fill="#64748B" fontSize="10">3440m</text>
                  </g>

                  {/* Tengboche Monastery [5] */}
                  <g transform="translate(480, 460)">
                    <circle cx="0" cy="0" r="11" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="0" y="4" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">5</text>
                    <text x="16" y="-2" fill="#1D3557" fontSize="11.5" fontWeight="bold">Tengboche Monastery</text>
                    <text x="16" y="10" fill="#64748B" fontSize="9.5">3867m</text>
                  </g>

                  {/* Dingboche [6, 7] */}
                  <g transform="translate(560, 400)">
                    <circle cx="0" cy="0" r="13" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="0" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">6,7</text>
                    <text x="18" y="-2" fill="#1D3557" fontSize="11.5" fontWeight="bold">Dingboche</text>
                    <text x="18" y="10" fill="#64748B" fontSize="9.5">4410m</text>
                  </g>

                  {/* Lobuche [8] */}
                  <g transform="translate(625, 345)">
                    <circle cx="0" cy="0" r="11" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="0" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">8</text>
                    <text x="16" y="-2" fill="#1D3557" fontSize="11.5" fontWeight="bold">Lobuche</text>
                    <text x="16" y="10" fill="#64748B" fontSize="9.5">4940m</text>
                  </g>

                  {/* Gorak Shep & Everest Base Camp [9] */}
                  <g transform="translate(680, 230)">
                    <polygon points="0,-16 16,8 -16,8" fill="#D46238" stroke="#1D3557" strokeWidth="2" filter="url(#shadow)" />
                    <circle cx="-18" cy="-8" r="12" fill="#1D3557" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="-18" y="-4" fill="#FFFFFF" fontSize="11" fontWeight="black" textAnchor="middle">9</text>
                    <text x="0" y="24" fill="#1D3557" fontSize="13" fontWeight="black" textAnchor="middle">Everest Base Camp</text>
                    <text x="0" y="37" fill="#0284C7" fontSize="11" fontWeight="bold" textAnchor="middle">5364m</text>
                  </g>

                  {/* Kala Patthar Summit [10] */}
                  <g transform="translate(630, 210)">
                    <circle cx="0" cy="0" r="7" fill="#E5A93C" stroke="#1D3557" strokeWidth="2" />
                    <text x="-12" y="4" fill="#1D3557" fontSize="12" fontWeight="black" textAnchor="end">Kala Patthar</text>
                    <text x="-12" y="16" fill="#D46238" fontSize="10" fontWeight="bold" textAnchor="end">5545m</text>
                  </g>

                  {/* Pheriche [10] */}
                  <g transform="translate(585, 430)">
                    <circle cx="0" cy="0" r="6" fill="#38BDF8" stroke="#1D3557" strokeWidth="1.5" />
                    <text x="-12" y="4" fill="#1D3557" fontSize="11" fontWeight="bold" textAnchor="end">Pheriche</text>
                    <text x="-12" y="15" fill="#64748B" fontSize="9.5" textAnchor="end">4240m</text>
                  </g>
                </g>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  BOTTOM-LEFT: MAP LEGEND (Identical structure to Image 1)
                  ───────────────────────────────────────────────────────────── */}
              <g transform="translate(45, 680)">
                {/* Main Trekking Route */}
                <g transform="translate(0, 0)">
                  <text x="240" y="12" fill="#1D3557" fontSize="13" fontWeight="semibold" textAnchor="end">Main Trekking Route</text>
                  <line x1="255" y1="8" x2="365" y2="8" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
                </g>
                {/* Secondary Trekking Route */}
                <g transform="translate(0, 25)">
                  <text x="240" y="12" fill="#1D3557" fontSize="13" fontWeight="semibold" textAnchor="end">Secondary Trekking Route</text>
                  <line x1="255" y1="8" x2="365" y2="8" stroke="#1D3557" strokeWidth="3" strokeDasharray="5,4" />
                </g>
                {/* Ground Transportation */}
                <g transform="translate(0, 50)">
                  <text x="240" y="12" fill="#1D3557" fontSize="13" fontWeight="semibold" textAnchor="end">Ground Transportation</text>
                  <line x1="255" y1="8" x2="365" y2="8" stroke="#1D3557" strokeWidth="3.5" strokeDasharray="8,5" />
                </g>
                {/* Mountain Peak */}
                <g transform="translate(0, 75)">
                  <text x="240" y="12" fill="#1D3557" fontSize="13" fontWeight="semibold" textAnchor="end">Mountain Peak</text>
                  <polygon points="265,14 275,-2 285,14" fill="#1D3557" />
                  <polygon points="275,-2 279,5 275,3 271,5" fill="#FFFFFF" />
                </g>
                {/* Overnight Camp / High Base Camp */}
                <g transform="translate(0, 100)">
                  <text x="240" y="12" fill="#1D3557" fontSize="13" fontWeight="semibold" textAnchor="end">Overnight Camp / Base Camp</text>
                  <polygon points="275,0 285,14 265,14" fill="#D46238" stroke="#1D3557" strokeWidth="1.5" />
                </g>
              </g>
            </svg>
          </div>

          {/* Bottom helper bar with zoom & download recommendations */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-medium">
              <Info className="w-4 h-4 text-[#0284C7] shrink-0" />
              <span>Route is optimized for gradual altitude adaptation with acclimatisation rest buffers.</span>
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                ✓ GPS Coordinates Verified
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ════════════════════════════════════════════════════════════════
           ELEVATION GAIN PROFILE (Complementary view)
           ════════════════════════════════════════════════════════════════ */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-sans font-bold text-lg text-[#183E63]">
                Altitude Gain & Valley Progression Profile
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Meters above sea level across key acclimatisation waypoints
              </p>
            </div>
            <span className="text-xs font-mono text-[#D46238] font-bold bg-amber-50 border border-amber-200 px-3 py-1 rounded-full self-start">
              PEAK: {journey.maxAltitude.split(' ')[0]}
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-4">
            <div className="h-52 sm:h-64 w-full flex items-end justify-between gap-2 sm:gap-3 pt-8 pb-3 border-b border-[#EAE5DC]">
              {elevationPoints.map((pt, idx) => {
                const heightPercent = Math.min(100, Math.max(16, ((pt.altitude - 800) / (5600 - 800)) * 100));
                const isPeak = pt.altitude >= 5000;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group relative h-full justify-end">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#183E63] text-white text-[11px] font-sans font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap pointer-events-none z-10 shadow-md">
                      {pt.point}: {pt.altitude}m
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 font-bold hidden sm:block">{pt.altitude}m</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-xl transition-all duration-300 ${
                        isPeak
                          ? 'bg-gradient-to-t from-[#D46238] to-[#F97316] group-hover:brightness-110 shadow-sm'
                          : 'bg-gradient-to-t from-[#183E63] to-[#0284C7] group-hover:brightness-110 shadow-sm'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between text-[11px] sm:text-xs font-sans text-slate-500 font-medium px-1">
              <span>Trailhead</span>
              <span>Mid Valley</span>
              <span>Acclimatisation</span>
              <span className="font-bold text-[#D46238]">High Point / Base Camp</span>
              <span>Descent</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
