import React from 'react';

interface AffiliationsAndPaymentsProps {
  variant?: 'dark' | 'light';
  layout?: 'row' | 'stack';
  className?: string;
  showPayOnline?: boolean;
}

export const AffiliationsAndPayments: React.FC<AffiliationsAndPaymentsProps> = ({
  variant = 'dark',
  layout = 'row',
  className = '',
  showPayOnline = true,
}) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={`${
        layout === 'row'
          ? 'flex flex-col md:flex-row md:items-center md:justify-between gap-6'
          : 'space-y-5'
      } ${className}`}
    >
      {/* ── 1. AFFILIATION SECTION ── */}
      <div className="space-y-2.5">
        <h4
          className={`font-sans font-bold text-sm tracking-wide ${
            isDark ? 'text-[#E5A93C]' : 'text-[#D46238]'
          }`}
        >
          Affiliation
        </h4>
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* TAAN Logo */}
          <div
            title="Trekking Agencies' Association of Nepal (TAAN)"
            className="w-12 h-10 sm:w-14 sm:h-11 bg-white rounded-lg border border-slate-200/90 shadow-xs flex items-center justify-center p-1 hover:scale-105 transition-transform select-none cursor-default"
          >
            <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Green circular crest */}
              <circle cx="50" cy="38" r="32" stroke="#1E7B34" strokeWidth="3" fill="#EBF6EE" />
              {/* Ice Axe */}
              <path d="M32 20 L68 56" stroke="#1E7B34" strokeWidth="4" strokeLinecap="round" />
              <path d="M26 23 L37 17 C42 15 45 18 43 23 L32 29 Z" fill="#1E7B34" />
              <path d="M64 52 L70 58 L67 61 L61 55 Z" fill="#1E7B34" />
              {/* Mountain ridge inside */}
              <path d="M30 45 L45 30 L55 38 L65 28 L72 45 Z" fill="#1E7B34" opacity="0.85" />
              {/* Text TAAN */}
              <text x="50" y="76" textAnchor="middle" fill="#1E7B34" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">
                TAAN
              </text>
            </svg>
          </div>

          {/* NMA Logo */}
          <div
            title="Nepal Mountaineering Association (NMA)"
            className="w-12 h-10 sm:w-14 sm:h-11 bg-white rounded-lg border border-slate-200/90 shadow-xs flex items-center justify-center p-1 hover:scale-105 transition-transform select-none cursor-default"
          >
            <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Triangle peak frame */}
              <polygon points="50,12 82,62 18,62" stroke="#104E96" strokeWidth="3.5" fill="#EEF4FC" />
              {/* Inner mountain peak */}
              <polygon points="50,18 72,56 42,56" fill="#104E96" />
              {/* Nepal Flag pennant */}
              <path d="M48 24 L58 32 L48 38 L58 48 L46 48 Z" fill="#DC2626" stroke="#104E96" strokeWidth="1" />
              {/* Sun & Moon symbols */}
              <circle cx="50" cy="33" r="2" fill="#FFFFFF" />
              <circle cx="50" cy="43" r="2.5" fill="#FFFFFF" />
              {/* Text NMA */}
              <text x="50" y="75" textAnchor="middle" fill="#104E96" fontSize="12" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
                NMA
              </text>
            </svg>
          </div>

          {/* NTB Logo (Nepal Tourism Board) */}
          <div
            title="Nepal Tourism Board (NTB)"
            className="w-12 h-10 sm:w-14 sm:h-11 bg-white rounded-lg border border-slate-200/90 shadow-xs flex items-center justify-center p-1 hover:scale-105 transition-transform select-none cursor-default"
          >
            <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Pagoda temple roof */}
              <path d="M38 32 L50 20 L62 32 Z" fill="#B91C1C" />
              <path d="M42 20 L50 12 L58 20 Z" fill="#B91C1C" />
              <rect x="48.5" y="8" width="3" height="5" fill="#F59E0B" />
              {/* Temple Eyes of the Buddha */}
              <rect x="42" y="32" width="16" height="10" fill="#FEE2E2" />
              <circle cx="46" cy="36" r="1.5" fill="#111827" />
              <circle cx="54" cy="36" r="1.5" fill="#111827" />
              {/* Mountain line */}
              <path d="M22 50 L38 38 L50 46 L68 30 L80 50 Z" fill="#1E3A8A" opacity="0.8" />
              {/* Text NTB */}
              <text x="50" y="66" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">
                NTB
              </text>
              <text x="50" y="76" textAnchor="middle" fill="#B91C1C" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
                NATURALLY NEPAL
              </text>
            </svg>
          </div>

          {/* Government of Nepal (MoCTCA) Crest */}
          <div
            title="Government of Nepal - Ministry of Culture, Tourism and Civil Aviation"
            className="w-12 h-10 sm:w-14 sm:h-11 bg-white rounded-lg border border-slate-200/90 shadow-xs flex items-center justify-center p-1 hover:scale-105 transition-transform select-none cursor-default"
          >
            <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Circular Rhododendron wreath */}
              <circle cx="50" cy="38" r="28" stroke="#DC2626" strokeWidth="2.5" fill="#FEF2F2" strokeDasharray="3 1.5" />
              {/* White snowy Everest peak */}
              <polygon points="50,18 64,38 36,38" fill="#2563EB" />
              <polygon points="50,18 56,28 44,28" fill="#FFFFFF" />
              {/* Green hills below */}
              <path d="M28 44 Q50 34 72 44 Z" fill="#15803D" />
              {/* Handshake of unity */}
              <rect x="42" y="44" width="16" height="5" rx="2" fill="#E5A93C" />
              {/* Red garland ribbon at bottom */}
              <path d="M30 54 Q50 62 70 54 L68 58 Q50 66 32 58 Z" fill="#DC2626" />
              {/* Text NEPAL GOVT */}
              <text x="50" y="75" textAnchor="middle" fill="#B91C1C" fontSize="9" fontWeight="800" fontFamily="sans-serif">
                GOVT OF NEPAL
              </text>
            </svg>
          </div>

          {/* KEEP Logo */}
          <div
            title="Kathmandu Environmental Education Project (KEEP)"
            className="w-12 h-10 sm:w-14 sm:h-11 bg-white rounded-lg border border-slate-200/90 shadow-xs flex items-center justify-center p-1 hover:scale-105 transition-transform select-none cursor-default"
          >
            <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Blue sky & green arch */}
              <rect x="24" y="12" width="52" height="48" rx="6" fill="#1D4ED8" />
              <path d="M24 38 Q50 18 76 38 L76 60 L24 60 Z" fill="#15803D" />
              {/* White mountain peak */}
              <polygon points="50,22 65,42 35,42" fill="#FFFFFF" />
              {/* Text KEEP */}
              <text x="50" y="75" textAnchor="middle" fill="#15803D" fontSize="12" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.2">
                KEEP
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* ── 2. PAY ONLINE SECTION ── */}
      {showPayOnline && (
        <div className="space-y-2.5">
          <h4
            className={`font-sans font-bold text-sm tracking-wide ${
              isDark ? 'text-[#E5A93C]' : 'text-[#D46238]'
            }`}
          >
            Pay Online
          </h4>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* VISA Logo Tile */}
            <div
              title="Visa Card Secure Payment"
              className="w-14 h-10 sm:w-16 sm:h-11 bg-white rounded-lg border border-slate-200/90 shadow-xs flex items-center justify-center p-1.5 hover:scale-105 transition-all select-none cursor-default overflow-hidden"
            >
              <img
                src="/payments/visa.svg"
                alt="Visa"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* MasterCard Logo Tile */}
            <div
              title="MasterCard SecureCode"
              className="w-14 h-10 sm:w-16 sm:h-11 bg-white rounded-lg border border-slate-200/90 shadow-xs flex items-center justify-center p-1.5 hover:scale-105 transition-all select-none cursor-default overflow-hidden"
            >
              <img
                src="/payments/mastercard.svg"
                alt="Mastercard"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* American Express Logo Tile */}
            <div
              title="American Express"
              className="w-14 h-10 sm:w-16 sm:h-11 bg-white rounded-lg border border-slate-200/90 shadow-xs flex items-center justify-center p-1 hover:scale-105 transition-all select-none cursor-default overflow-hidden"
            >
              <img
                src="/payments/amex.svg"
                alt="American Express"
                className="w-full h-full object-contain rounded-sm"
                loading="lazy"
              />
            </div>

            {/* Discover Network Logo Tile */}
            <div
              title="Discover Network"
              className="w-14 h-10 sm:w-16 sm:h-11 bg-white rounded-lg border border-slate-200/90 shadow-xs flex items-center justify-center p-1.5 hover:scale-105 transition-all select-none cursor-default overflow-hidden"
            >
              <img
                src="/payments/discover.svg"
                alt="Discover Network"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
