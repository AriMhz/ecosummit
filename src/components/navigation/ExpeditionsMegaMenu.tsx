import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Play, Mountain } from 'lucide-react';

interface ExpeditionsMegaMenuProps {
  onClose?: () => void;
}

interface ClimbPreview {
  key: string;
  badge: string;
  title: string;
  image: string;
  altitude: string;
  duration: string;
  difficulty: string;
  description: string;
  path: string;
}

interface ClimbItem {
  name: string;
  slug: string;
  path: string;
  altitude: string;
  duration: string;
  difficulty: string;
  badge: string;
  image: string;
  detail?: string;
  description: string;
}

interface ExpeditionCategory {
  id: string;
  name: string;
  subtitle: string;
  detail: string;
  path: string;
  preview: ClimbPreview;
  climbs: ClimbItem[];
}

export const ExpeditionsMegaMenu: React.FC<ExpeditionsMegaMenuProps> = ({ onClose }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('above-7000');

  const defaultPreview: ClimbPreview = {
    key: 'everest-expedition',
    badge: 'EXPEDITION (>7,000M)',
    title: 'Mt. Everest South Col (8,848.86m)',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
    altitude: '8,848.86 m',
    duration: '60 Days',
    difficulty: 'Extreme 8,000m',
    description: 'Stand on the apex of the Earth with 1:1 Sherpa master leadership, oxygen systems, and fixed rope management.',
    path: '/expeditions/mount-everest-south-col-expedition',
  };

  const [preview, setPreview] = useState<ClimbPreview>(defaultPreview);

  const categories: ExpeditionCategory[] = [
    {
      id: 'above-7000',
      name: 'Major Expeditions (>7,000m)',
      subtitle: '8,000m Giants & Ultra Summits',
      detail: 'Everest, Kanchenjunga, Manaslu & 8,000ers',
      path: '/expeditions',
      preview: {
        key: 'everest-expedition',
        badge: 'EXPEDITION (>7,000M)',
        title: 'Mt. Everest South Col (8,848.86m)',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
        altitude: '8,848.86 m',
        duration: '60 Days',
        difficulty: 'Extreme 8,000m',
        description: 'Stand on the apex of the Earth with 1:1 Sherpa master leadership, oxygen systems, and fixed rope management.',
        path: '/expeditions/mount-everest-south-col-expedition',
      },
      climbs: [
        {
          name: 'Mount Everest South Col (8,848m)',
          slug: 'mount-everest-south-col-expedition',
          path: '/expeditions/mount-everest-south-col-expedition',
          altitude: '8,848.86 m',
          duration: '60 Days',
          difficulty: 'Extreme 8,000m',
          badge: 'WORLD HIGHEST',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          detail: 'Roof of the world with 1:1 elite Sherpa masters',
          description: 'The pinnacle of high-altitude mountaineering with dedicated private Sherpa master guidance and supplemental oxygen.',
        },
        {
          name: 'Kanchenjunga Wild East (8,586m)',
          slug: 'kanchenjunga-wild-east-expedition',
          path: '/expeditions/kanchenjunga-wild-east-expedition',
          altitude: '8,586 m',
          duration: '52 Days',
          difficulty: 'Extreme 8,000m',
          badge: 'THIRD HIGHEST',
          image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
          detail: 'Untouched eastern wilderness massif',
          description: 'An immense Himalayan massif on the Sikkim border revered as a sacred mountain by the Sikkimese and Nepalese.',
        },
        {
          name: 'Manaslu Mountain of Spirit (8,163m)',
          slug: 'manaslu-mountain-of-the-spirit',
          path: '/expeditions/manaslu-mountain-of-the-spirit',
          altitude: '8,163 m',
          duration: '45 Days',
          difficulty: 'High 8,000m',
          badge: 'EIGHTH HIGHEST',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          detail: 'Premier introductory 8,000m mountain',
          description: 'The classic premier high-altitude introductory 8,000m peak with expansive snow slopes and wild approach.',
        },
        {
          name: 'Himlung Himal Remote (7,126m)',
          slug: 'himlung-himal-expedition',
          path: '/expeditions/himlung-himal-expedition',
          altitude: '7,126 m',
          duration: '32 Days',
          difficulty: 'High 7,000m Alpine',
          badge: 'REMOTE TIBET BORDER',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          detail: 'Remote Tibetan border alpine ascent in Peri Himal',
          description: 'A secluded, non-commercial 7,000er nestled northwest of Manaslu offering pristine wilderness climbing.',
        },
        {
          name: 'Baruntse High Glacial Ascent (7,129m)',
          slug: 'baruntse-high-glacial-ascent',
          path: '/expeditions',
          altitude: '7,129 m',
          duration: '34 Days',
          difficulty: 'High 7,000m Alpine',
          badge: 'HONKU VALLEY GEM',
          image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
          detail: 'Dramatic symmetrical peak between Everest & Makalu',
          description: 'Crown of the wild Honku valley with a classic snow-and-ice south-east ridge ascent.',
        },
      ],
    },
    {
      id: 'below-7000',
      name: 'Peak Climbing (<7,000m)',
      subtitle: 'Trekking Peaks & Introductory Summits',
      detail: 'Island Peak, Mera Peak, Lobuche & Chulu',
      path: '/expeditions',
      preview: {
        key: 'island-peak-preview',
        badge: 'PEAK CLIMBING (<7,000M)',
        title: 'Island Peak (Imja Tse) 6,189m',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
        altitude: '6,189 m',
        duration: '16 Days',
        difficulty: 'Alpine Grade PD+',
        description: 'Nepal’s premier introductory climbing peak featuring a steep headwall and dramatic narrow summit ridge.',
        path: '/expeditions/island-peak-imja-tse-ascent',
      },
      climbs: [
        {
          name: 'Island Peak (Imja Tse) 6,189m',
          slug: 'island-peak-imja-tse-ascent',
          path: '/expeditions/island-peak-imja-tse-ascent',
          altitude: '6,189 m',
          duration: '16 Days',
          difficulty: 'Alpine Grade PD+',
          badge: 'POPULAR TREKKING PEAK',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Nepal’s premier introductory climbing peak featuring a steep headwall and dramatic narrow summit ridge.',
        },
        {
          name: 'Mera Peak High Trekking Peak (6,476m)',
          slug: 'mera-peak-expedition',
          path: '/expeditions/mera-peak-expedition',
          altitude: '6,476 m',
          duration: '18 Days',
          difficulty: 'Alpine Grade F/PD',
          badge: 'HIGHEST TREKKING PEAK',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'Highest trekking summit in Nepal with an unmatched vantage point surveying 5 of the world’s 14 eight-thousanders.',
        },
        {
          name: 'Lobuche East & High Camp (6,119m)',
          slug: 'lobuche-east-peak-climb',
          path: '/expeditions/lobuche-east-peak-climb',
          altitude: '6,119 m',
          duration: '16 Days',
          difficulty: 'Alpine Grade PD+',
          badge: 'KHUMBU GLACIAL PEAK',
          image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
          description: 'Challenging snow and ice ridge climb directly facing the Nuptse-Lhotse wall and Khumbu glacier.',
        },
        {
          name: 'Chulu West Annapurna Climb (6,419m)',
          slug: 'chulu-west-annapurna-climb',
          path: '/expeditions/chulu-west-annapurna-climb',
          altitude: '6,419 m',
          duration: '21 Days',
          difficulty: 'Alpine Grade PD',
          badge: 'ANNAPURNA VISTA',
          image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
          description: 'Rewarding alpine peak overlooking the entire Annapurna and Dhaulagiri massifs from the sacred Manang valley.',
        },
        {
          name: 'Pisang Peak Glacial Pyramid (6,091m)',
          slug: 'pisang-peak-annapurna',
          path: '/expeditions',
          altitude: '6,091 m',
          duration: '17 Days',
          difficulty: 'Alpine Grade PD',
          badge: 'MANANG PYRAMID',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'Uniform snow pyramid rising gracefully above Pisang village along the classic Annapurna Circuit route.',
        },
      ],
    },
    {
      id: 'technical',
      name: 'Technical Alpine Peaks',
      subtitle: 'Steep Rock & Exposed Ridge Climbs',
      detail: 'Ama Dablam, Pumori & Kyajo Ri',
      path: '/expeditions',
      preview: {
        key: 'ama-dablam-preview',
        badge: 'TECHNICAL ALPINE',
        title: 'Ama Dablam Technical Ridge (6,812m)',
        image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
        altitude: '6,812 m',
        duration: '28 Days',
        difficulty: 'Technical Extreme',
        description: 'Widely considered the most aesthetically stunning technical climb on Earth with steep exposed granite arêtes.',
        path: '/expeditions/ama-dablam-technical-expedition',
      },
      climbs: [
        {
          name: 'Ama Dablam Technical Ridge (6,812m)',
          slug: 'ama-dablam-technical-expedition',
          path: '/expeditions/ama-dablam-technical-expedition',
          altitude: '6,812 m',
          duration: '28 Days',
          difficulty: 'Technical Extreme',
          badge: 'MATTERHORN OF HIMALAYAS',
          image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
          description: 'Widely considered the most aesthetically stunning technical climb on Earth with steep exposed granite arêtes.',
        },
        {
          name: 'Pumori Daughter Mountain (7,161m)',
          slug: 'pumori-daughter-expedition',
          path: '/expeditions',
          altitude: '7,161 m',
          duration: '30 Days',
          difficulty: 'Technical High Alpine',
          badge: 'FACING MT. EVEREST',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'Pyramidal snow cone rising 8km west of Everest, commanding the most majestic direct summit view in the Khumbu.',
        },
        {
          name: 'Kyajo Ri Technical Granite Spire (6,186m)',
          slug: 'kyajo-ri-technical-climb',
          path: '/expeditions',
          altitude: '6,186 m',
          duration: '18 Days',
          difficulty: 'Alpine Grade D',
          badge: 'UNSPOILT TECHNICAL PEAK',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'Pristine technical granite spire in the Gokyo valley with sustained 55-degree ice and knife-edge rock ridges.',
        },
      ],
    },
    {
      id: 'beginner',
      name: 'Beginner & Alpine Schools',
      subtitle: 'First Summits & Ice Prep Courses',
      detail: 'Yala Peak, Tent Peak & Glacier Training',
      path: '/expeditions',
      preview: {
        key: 'yala-peak-preview',
        badge: 'INTRODUCTORY SUMMIT',
        title: 'Yala Peak Langtang Ascent (5,500m)',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
        altitude: '5,500 m',
        duration: '12 Days',
        difficulty: 'Alpine Grade F (Beginner)',
        description: 'Non-technical first Himalayan climb offering close-up vistas of Shishapangma (8,027m) inside Tibet.',
        path: '/expeditions/yala-peak-langtang-climb',
      },
      climbs: [
        {
          name: 'Yala Peak Langtang Ascent (5,500m)',
          slug: 'yala-peak-langtang-climb',
          path: '/expeditions/yala-peak-langtang-climb',
          altitude: '5,500 m',
          duration: '12 Days',
          difficulty: 'Alpine Grade F (Beginner)',
          badge: 'NO CRAMPON EXP. NEEDED',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'Non-technical first Himalayan climb offering close-up vistas of Shishapangma (8,027m) inside Tibet.',
        },
        {
          name: 'Tharpu Chuli (Tent Peak) 5,663m',
          slug: 'tharpu-chuli-tent-peak',
          path: '/expeditions',
          altitude: '5,663 m',
          duration: '15 Days',
          difficulty: 'Alpine Grade PD-',
          badge: 'SANCTUARY HEARTLAND',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Centrally positioned summit inside the Annapurna Sanctuary natural amphitheater with low objective hazards.',
        },
        {
          name: 'Pokalde Peak Khumbu Glaciers (5,806m)',
          slug: 'pokalde-peak-khumbu',
          path: '/expeditions',
          altitude: '5,806 m',
          duration: '14 Days',
          difficulty: 'Alpine Grade F/PD',
          badge: 'SHERPA TRAINING SUMMIT',
          image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
          description: 'Short scrambling peak close to Kongma La pass offering non-intimidating glacier crossing practice.',
        },
      ],
    },
  ];

  const activeCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];

  const handleCategoryHover = (cat: ExpeditionCategory) => {
    setSelectedCategoryId(cat.id);
    setPreview(cat.preview);
  };

  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-7 items-stretch">
      {/* ── Column 1: Visual Hero Card (Left Image) ──────────────────── */}
      <div className="col-span-12 xl:col-span-3 rounded-2xl overflow-hidden relative min-h-[420px] flex flex-col justify-between p-6 sm:p-7 group">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
          alt="Expeditions in Nepal"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#E85D2A] rounded-full" />
            <span className="font-simplon-mono text-[10px] tracking-[0.2em] font-bold text-white/90 uppercase">
              HIGH-ALTITUDE SUMMITS
            </span>
          </div>

          <h3 className="font-serif text-2xl lg:text-[26px] text-white font-normal leading-[1.18] tracking-tight">
            Beyond Limits.
            <br />
            Above the
            <br />
            Clouds.
          </h3>

          <p className="font-sans text-xs text-white/80 leading-relaxed font-light line-clamp-3">
            Elite Sherpa rope teams, high-grade medical gear, and personalized alpine acclimatization protocols.
          </p>
        </div>

        <div className="relative z-10 pt-4">
          <Link
            to="/expeditions"
            onClick={onClose}
            className="inline-flex items-center gap-3 text-xs font-semibold text-white group/btn transition-colors hover:text-[#E85D2A]"
          >
            <div className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center text-white group-hover/btn:border-[#E85D2A] group-hover/btn:text-[#E85D2A] group-hover/btn:scale-105 transition-all bg-black/20 backdrop-blur-xs">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span className="tracking-wide">Explore All Summits</span>
          </Link>
        </div>
      </div>

      {/* ── Column 2: Expedition Categories (Hoverable) ──────────────── */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col justify-between py-1 border-r border-[#F0EFEB]/80 pr-4">
        <div>
          <div className="mb-3.5 pb-2 border-b border-[#E8E2D8]/70 flex items-center justify-between">
            <h4 className="font-serif text-[15px] font-bold text-[#142332] leading-tight tracking-tight">
              Climbing Categories
            </h4>
            <span className="text-[10px] font-mono text-[#E85D2A] font-bold bg-[#E85D2A]/10 px-2 py-0.5 rounded">
              {categories.length} Tiers
            </span>
          </div>

          <div className="space-y-2">
            {categories.map((cat) => {
              const isActive = selectedCategoryId === cat.id;
              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => handleCategoryHover(cat)}
                  className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#F2F5F8] shadow-xs border-l-3 border-[#E85D2A] pl-3'
                      : 'hover:bg-[#F7F9FA]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <Mountain
                        className={`w-4 h-4 transition-colors shrink-0 ${
                          isActive ? 'text-[#E85D2A]' : 'text-[#183E63]'
                        }`}
                      />
                      <span
                        className={`font-serif text-[14px] font-bold transition-colors leading-tight truncate ${
                          isActive ? 'text-[#E85D2A]' : 'text-[#17201D]'
                        }`}
                      >
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-[9.5px] font-mono text-[#718096] uppercase font-semibold shrink-0 ml-1">
                      {cat.climbs.length} peaks
                    </span>
                  </div>

                  <p className="text-[11px] text-[#718096] mt-1 font-light leading-relaxed truncate">
                    {cat.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 mt-2 border-t border-[#F0EFEB]">
          <Link
            to="/expeditions"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183E63] hover:text-[#E85D2A] transition-colors"
          >
            <span>Compare All Climbing Permits</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Column 3: Dynamic Climbs for Selected Category ────────────── */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col justify-between py-1 border-r border-[#F0EFEB]/80 pr-4">
        <div>
          <div className="mb-3.5 pb-1.5 border-b border-[#E8E2D8]/70 flex items-center justify-between">
            <h4 className="font-simplon-mono text-[11px] font-bold tracking-[0.16em] text-[#17201D] uppercase truncate">
              {activeCategory.name.toUpperCase()}
            </h4>
            <span className="text-[9.5px] font-mono font-bold bg-[#E85D2A]/10 text-[#E85D2A] px-2 py-0.5 rounded shrink-0">
              {activeCategory.climbs.length} Summits
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="space-y-1.5"
            >
              {activeCategory.climbs.map((climb) => {
                const isHovered = preview.key === climb.slug;
                return (
                  <Link
                    key={climb.slug}
                    to={climb.path}
                    onClick={onClose}
                    onMouseEnter={() =>
                      setPreview({
                        key: climb.slug,
                        badge: climb.badge,
                        title: climb.name,
                        image: climb.image,
                        altitude: climb.altitude,
                        duration: climb.duration,
                        difficulty: climb.difficulty,
                        description: climb.description,
                        path: climb.path,
                      })
                    }
                    className={`group flex items-center justify-between p-2 -mx-1.5 rounded-lg transition-colors text-[12.5px] font-medium ${
                      isHovered ? 'bg-[#F2F5F8] text-[#E85D2A]' : 'text-[#4A5568] hover:bg-[#F7F9FA] hover:text-[#E85D2A]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Mountain
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isHovered ? 'text-[#E85D2A]' : 'text-[#A0AEC0] group-hover:text-[#E85D2A]'
                        }`}
                      />
                      <span className="truncate">{climb.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="font-mono text-[10px] text-[#A0AEC0]">{climb.altitude}</span>
                      <ChevronRight
                        className={`w-3 h-3 transition-all ${
                          isHovered
                            ? 'text-[#E85D2A] translate-x-0.5 opacity-100'
                            : 'text-[#CBD5E0] opacity-0 group-hover:opacity-100 group-hover:text-[#E85D2A]'
                        }`}
                      />
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pt-3 mt-3 border-t border-[#F0EFEB]">
          <div className="flex items-center justify-between text-[11px] text-[#718096]">
            <span>1:1 Sherpa Master Guide</span>
            <span className="font-semibold text-[#183E63]">Fixed Rope & Oxygen</span>
          </div>
        </div>
      </div>

      {/* ── Column 4: Dynamic Featured Expedition Card (Right Image) ─── */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col justify-between py-1">
        <div className="rounded-2xl overflow-hidden border border-[#E8E2D8]/80 bg-[#FAF9F5] p-3 shadow-xs hover:shadow-md transition-shadow group flex flex-col h-full justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={preview.key}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col h-full justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#17201D]">
                  <img
                    src={preview.image}
                    alt={preview.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                  <div className="absolute top-2.5 left-2.5 bg-[#E85D2A] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded shadow-sm">
                    {preview.badge}
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10.5px] font-mono">
                    <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded font-semibold">
                      {preview.duration}
                    </span>
                    <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded font-semibold text-[#E5A93C]">
                      {preview.altitude}
                    </span>
                  </div>
                </div>

                <div className="pt-3 px-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0284C7] bg-[#0284C7]/10 px-2 py-0.5 rounded">
                      {preview.difficulty}
                    </span>
                    <span className="text-[11px] font-mono text-[#59615D]">
                      Sherpa 1:1 Guided
                    </span>
                  </div>

                  <h4 className="font-serif text-[16px] font-bold text-[#17201D] group-hover:text-[#E85D2A] transition-colors leading-snug">
                    {preview.title}
                  </h4>

                  <p className="font-sans text-[11.5px] text-[#526272] leading-relaxed font-light line-clamp-2">
                    {preview.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 px-1 border-t border-[#E8E2D8]/70 mt-2">
                <Link
                  to={preview.path}
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#E85D2A] hover:bg-[#D34D1E] text-white text-xs font-semibold tracking-wide shadow-xs hover:shadow-md transition-all group/btn"
                >
                  <span>View Expedition Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
