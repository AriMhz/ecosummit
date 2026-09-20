import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Play, Globe, MapPin } from 'lucide-react';
import boudhaSunset from '../../assets/boudha_sunset.png';

interface DestinationsMegaMenuProps {
  onClose?: () => void;
}

interface DestinationPreview {
  key: string;
  badge: string;
  country: string;
  title: string;
  image: string;
  bestSeason: string;
  highlight: string;
  description: string;
  path: string;
}

interface PlaceItem {
  name: string;
  slug: string;
  country: string;
  path: string;
  preview: DestinationPreview;
}

interface CountryItem {
  id: string;
  name: string;
  subtitle: string;
  detail: string;
  preview: DestinationPreview;
  places: PlaceItem[];
}

export const DestinationsMegaMenu: React.FC<DestinationsMegaMenuProps> = ({ onClose }) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('nepal');

  const defaultPreview: DestinationPreview = {
    key: 'nepal-country',
    badge: 'CORE HOMELAND',
    country: 'Nepal',
    title: 'Nepal · Land of the Gods',
    image: boudhaSunset,
    bestSeason: 'Sept – May',
    highlight: '8 Peaks >8,000m · UNESCO Valley',
    description: 'Home to eight of the fourteen highest peaks on Earth, ancient UNESCO heritage, and sacred high trails.',
    path: '/destinations',
  };

  const [preview, setPreview] = useState<DestinationPreview>(defaultPreview);

  // The 3 Himalayan Countries with their dedicated places
  const countries: CountryItem[] = [
    {
      id: 'nepal',
      name: 'Nepal',
      subtitle: 'The Himalayan Crown',
      detail: 'Everest, Annapurna, Kathmandu, Mustang & Chitwan',
      preview: {
        key: 'nepal-country',
        badge: 'HIMALAYAN CROWN',
        country: 'Nepal',
        title: 'Nepal · Land of the Gods',
        image: boudhaSunset,
        bestSeason: 'Sept – May',
        highlight: '8 Peaks Above 8,000m',
        description: 'Home to eight of the fourteen highest peaks on Earth, ancient UNESCO heritage, and sacred high trails.',
        path: '/destinations',
      },
      places: [
        {
          name: 'Everest & Khumbu Region',
          slug: 'everest-khumbu',
          country: 'Nepal',
          path: '/destinations/everest-khumbu',
          preview: {
            key: 'everest-place',
            badge: 'NEPAL HIGHLANDS',
            country: 'Nepal',
            title: 'Everest & Khumbu Region',
            image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'March–May & Oct–Dec',
            highlight: 'Namche, Tengboche & Sherpa culture',
            description: 'High Sherpa valleys, ancient cliffside monasteries, and direct views of the highest mountain on Earth.',
            path: '/destinations/everest-khumbu',
          },
        },
        {
          name: 'Annapurna & Pokhara Valley',
          slug: 'annapurna-sanctuary',
          country: 'Nepal',
          path: '/destinations/annapurna-sanctuary',
          preview: {
            key: 'annapurna-place',
            badge: 'NEPAL LAKES & PEAKS',
            country: 'Nepal',
            title: 'Annapurna & Pokhara Valley',
            image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'September – May',
            highlight: 'Phewa Lake & 360° Amphitheater',
            description: 'Serene lakeside living meeting dramatic alpine summits of Machapuchare and the Annapurna wall.',
            path: '/destinations/annapurna-sanctuary',
          },
        },
        {
          name: 'Kathmandu Valley UNESCO Heritage',
          slug: 'kathmandu-valley',
          country: 'Nepal',
          path: '/destinations/kathmandu-valley',
          preview: {
            key: 'ktm-place',
            badge: 'SACRED NEPAL',
            country: 'Nepal',
            title: 'Kathmandu Valley Palaces',
            image: boudhaSunset,
            bestSeason: 'Year-Round',
            highlight: '7 World Heritage Monument Zones',
            description: 'Living museum of medieval Newari brick architecture, courtyards, sacred stupas, and royal palaces.',
            path: '/destinations/kathmandu-valley',
          },
        },
        {
          name: 'Upper Mustang Walled Kingdom',
          slug: 'upper-mustang',
          country: 'Nepal',
          path: '/destinations/upper-mustang',
          preview: {
            key: 'mustang-place',
            badge: 'ANCIENT NEPAL',
            country: 'Nepal',
            title: 'Upper Mustang Kingdom',
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'May – November',
            highlight: 'Lo Manthang & Sacred Cliff Caves',
            description: 'A preserved 14th-century Tibetan Buddhist realm in the trans-Himalayan rain-shadow.',
            path: '/destinations/upper-mustang',
          },
        },
        {
          name: 'Chitwan & Bardia National Parks',
          slug: 'chitwan-safari',
          country: 'Nepal',
          path: '/tours/nepal-wildlife-heritage-odyssey',
          preview: {
            key: 'chitwan-place',
            badge: 'WILD JUNGLE',
            country: 'Nepal',
            title: 'Chitwan Safari & Wildlife',
            image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'October – April',
            highlight: 'Rhinos, Elephants & Bengal Tigers',
            description: 'Subtropical wilderness where one-horned rhinos roam free through tall elephant grass.',
            path: '/tours/nepal-wildlife-heritage-odyssey',
          },
        },
      ],
    },
    {
      id: 'bhutan',
      name: 'Bhutan',
      subtitle: 'Land of the Thunder Dragon',
      detail: 'Tiger’s Nest, Paro, Thimphu, Punakha & Phobjikha',
      preview: {
        key: 'bhutan-country',
        badge: 'THUNDER DRAGON',
        country: 'Bhutan',
        title: 'Kingdom of Bhutan',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
        bestSeason: 'March – May & Sept – Nov',
        highlight: 'Gross National Happiness · Dzongs',
        description: 'The last Himalayan Buddhist kingdom guided by Gross National Happiness, timeless dzongs, and untouched pine forests.',
        path: '/destinations',
      },
      places: [
        {
          name: "Tiger's Nest (Paro Taktsang)",
          slug: 'tigers-nest',
          country: 'Bhutan',
          path: '/destinations',
          preview: {
            key: 'tigers-nest-place',
            badge: 'BHUTAN ICON',
            country: 'Bhutan',
            title: "Tiger's Nest (Paro Taktsang)",
            image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'March–May & Sept–Nov',
            highlight: 'Cliffside Monastery at 3,120m',
            description: 'Perched on a sheer cliff 900m above the Paro valley, one of the most sacred pilgrimage shrines in the Himalayas.',
            path: '/destinations',
          },
        },
        {
          name: 'Punakha Valley & Grand Dzong',
          slug: 'punakha-valley',
          country: 'Bhutan',
          path: '/destinations',
          preview: {
            key: 'punakha-place',
            badge: 'BHUTAN HERITAGE',
            country: 'Bhutan',
            title: 'Punakha Valley & Grand Dzong',
            image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'Sept – May',
            highlight: 'Palace of Great Happiness',
            description: 'A majestic 17th-century fortress situated at the confluence of the Pho Chhu and Mo Chhu rivers.',
            path: '/destinations',
          },
        },
        {
          name: 'Thimphu Monasteries & Valley',
          slug: 'thimphu-capital',
          country: 'Bhutan',
          path: '/destinations',
          preview: {
            key: 'thimphu-place',
            badge: 'BHUTAN CAPITAL',
            country: 'Bhutan',
            title: 'Thimphu Monasteries & Valley',
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'Year-Round',
            highlight: 'Buddha Dordenma & Tashichho Dzong',
            description: 'The world’s only traffic-light-free capital, centered around giant golden Buddha statues and regal dzongs.',
            path: '/destinations',
          },
        },
        {
          name: 'Phobjikha & Gangtey Valley',
          slug: 'phobjikha-valley',
          country: 'Bhutan',
          path: '/destinations',
          preview: {
            key: 'phobjikha-place',
            badge: 'CRANE SANCTUARY',
            country: 'Bhutan',
            title: 'Phobjikha & Gangtey Valley',
            image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'October – March',
            highlight: 'Black-Necked Crane Winter Habitat',
            description: 'Stunning glacial U-shaped valley framed by bamboo shrubs, Gangtey monastery, and wintering Tibetan cranes.',
            path: '/destinations',
          },
        },
        {
          name: 'Bumthang Spiritual Heartland',
          slug: 'bumthang-valley',
          country: 'Bhutan',
          path: '/destinations',
          preview: {
            key: 'bumthang-place',
            badge: 'SACRED VALLEYS',
            country: 'Bhutan',
            title: 'Bumthang Spiritual Heartland',
            image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'March–May & Sept–Nov',
            highlight: 'Kurjey Lhakhang & Jambay Temple',
            description: 'Four sacred valleys where Guru Rinpoche introduced Buddhism, famed for Swiss cheeses and sacred temples.',
            path: '/destinations',
          },
        },
      ],
    },
    {
      id: 'tibet',
      name: 'Tibet',
      subtitle: 'The Roof of the World',
      detail: 'Lhasa, Potala Palace, Yamdrok, Everest North & Kailash',
      preview: {
        key: 'tibet-country',
        badge: 'SACRED PLATEAU',
        country: 'Tibet',
        title: 'Tibet · Roof of the World',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
        bestSeason: 'April – October',
        highlight: 'Potala Palace & Mount Kailash',
        description: 'A deeply spiritual high-altitude plateau of towering golden stupas, sacred turquoise lakes, and ancient monastic chants.',
        path: '/destinations',
      },
      places: [
        {
          name: 'Lhasa & Sacred Potala Palace',
          slug: 'lhasa-potala',
          country: 'Tibet',
          path: '/destinations',
          preview: {
            key: 'lhasa-place',
            badge: 'TIBET HEARTLAND',
            country: 'Tibet',
            title: 'Lhasa & Potala Palace',
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'April – October',
            highlight: 'Winter Palace of the Dalai Lamas',
            description: 'The monumental fortress rising over Lhasa with thousand rooms, golden stupas, and ancient scriptures.',
            path: '/destinations',
          },
        },
        {
          name: 'Mount Kailash & Manasarovar',
          slug: 'mount-kailash',
          country: 'Tibet',
          path: '/destinations',
          preview: {
            key: 'kailash-place',
            badge: 'TIBET PILGRIMAGE',
            country: 'Tibet',
            title: 'Mount Kailash & Holy Lakes',
            image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'May – September',
            highlight: 'Sacred 52km Pilgrim Kora at 5,630m',
            description: 'The spiritual axis of the universe revered by Hindus, Buddhists, and Jains as the ultimate trans-Himalayan pilgrimage.',
            path: '/destinations',
          },
        },
        {
          name: 'Yamdrok Turquoise Sacred Lake',
          slug: 'yamdrok-lake',
          country: 'Tibet',
          path: '/destinations',
          preview: {
            key: 'yamdrok-place',
            badge: 'SACRED LAKE',
            country: 'Tibet',
            title: 'Yamdrok Turquoise Sacred Lake',
            image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'May – October',
            highlight: 'Coral Turquoise Water at 4,441m',
            description: 'One of Tibet’s three holiest lakes with branching bays surrounded by snow-capped peaks and yak herders.',
            path: '/destinations',
          },
        },
        {
          name: 'Everest North Face & Rongbuk',
          slug: 'everest-north-face',
          country: 'Tibet',
          path: '/destinations',
          preview: {
            key: 'everest-north-place',
            badge: 'NORTH FACE VISTA',
            country: 'Tibet',
            title: 'Everest North Face & Rongbuk',
            image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'April – June & Sept – Oct',
            highlight: 'Highest Monastery on Earth at 5,000m',
            description: 'Unobstructed direct vertical view of the north wall of Everest rising over the high Tibetan plateau.',
            path: '/destinations',
          },
        },
        {
          name: 'Shigatse & Tashilhunpo Monastery',
          slug: 'shigatse-tashilhunpo',
          country: 'Tibet',
          path: '/destinations',
          preview: {
            key: 'shigatse-place',
            badge: 'SEAT OF PANCHEN LAMA',
            country: 'Tibet',
            title: 'Shigatse & Tashilhunpo Monastery',
            image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
            bestSeason: 'April – October',
            highlight: 'Giant 26-meter Maitreya Buddha Statue',
            description: 'Historical second city of Tibet, home to the sprawling golden-roofed Tashilhunpo monastery founded in 1447.',
            path: '/destinations',
          },
        },
      ],
    },
  ];

  const activeCountry = countries.find((c) => c.id === selectedCountryId) || countries[0];

  const handleCountryHover = (ctry: CountryItem) => {
    setSelectedCountryId(ctry.id);
    setPreview(ctry.preview);
  };

  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-7 items-stretch">
      {/* ── Column 1: Visual Hero Card (Left Image) ──────────────────── */}
      <div className="col-span-12 xl:col-span-3 rounded-2xl overflow-hidden relative min-h-[420px] flex flex-col justify-between p-6 sm:p-7 group">
        <img
          src={boudhaSunset}
          alt="Destinations across Nepal, Bhutan & Tibet"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#E85D2A] rounded-full" />
            <span className="font-simplon-mono text-[10px] tracking-[0.2em] font-bold text-white/90 uppercase">
              HIMALAYAN DESTINATIONS
            </span>
          </div>

          <h3 className="font-serif text-2xl lg:text-[26px] text-white font-normal leading-[1.18] tracking-tight">
            Three Kingdoms.
            <br />
            Sacred Valleys.
            <br />
            Eternal Peaks.
          </h3>

          <p className="font-sans text-xs text-white/80 leading-relaxed font-light line-clamp-3">
            Handcrafted cross-border expeditions across Nepal, the Kingdom of Bhutan, and the Tibetan plateau.
          </p>
        </div>

        <div className="relative z-10 pt-4">
          <Link
            to="/destinations"
            onClick={onClose}
            className="inline-flex items-center gap-3 text-xs font-semibold text-white group/btn transition-colors hover:text-[#E85D2A]"
          >
            <div className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center text-white group-hover/btn:border-[#E85D2A] group-hover/btn:text-[#E85D2A] group-hover/btn:scale-105 transition-all bg-black/20 backdrop-blur-xs">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span className="tracking-wide">Explore All Destinations</span>
          </Link>
        </div>
      </div>

      {/* ── Column 2: The 3 Himalayan Countries ──────────────────────── */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col justify-between py-1 border-r border-[#F0EFEB]/80 pr-4">
        <div>
          <div className="mb-3.5 pb-2 border-b border-[#E8E2D8]/70 flex items-center justify-between">
            <div>
              <h4 className="font-serif text-[15px] font-bold text-[#142332] leading-tight tracking-tight">
                Explore by Country
              </h4>
              <span className="font-simplon-mono text-[9.5px] uppercase tracking-[0.16em] text-[#E85D2A] font-semibold block mt-0.5">
                Nepal · Bhutan · Tibet
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#E85D2A] font-bold bg-[#E85D2A]/10 px-2 py-0.5 rounded">
              3 Nations
            </span>
          </div>

          <div className="space-y-2.5">
            {countries.map((ctry) => {
              const isActive = selectedCountryId === ctry.id;
              return (
                <div
                  key={ctry.id}
                  onMouseEnter={() => handleCountryHover(ctry)}
                  className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#F2F5F8] shadow-xs border-l-3 border-[#E85D2A] pl-3'
                      : 'hover:bg-[#F7F9FA]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#E85D2A]' : 'text-[#183E63]'
                        }`}
                      />
                      <span
                        className={`font-serif text-[15px] font-bold transition-colors leading-tight ${
                          isActive ? 'text-[#E85D2A]' : 'text-[#17201D]'
                        }`}
                      >
                        {ctry.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#718096] uppercase font-semibold">
                      {ctry.subtitle.split(' ')[0]}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#718096] mt-1 font-light leading-relaxed">
                    {ctry.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-[#F0EFEB]">
          <Link
            to="/destinations"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183E63] hover:text-[#E85D2A] transition-colors"
          >
            <span>Custom Multi-Country Itineraries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Column 3: Dynamic Places for Selected Country ────────────── */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col justify-between py-1 border-r border-[#F0EFEB]/80 pr-4">
        <div>
          <div className="mb-3.5 pb-1.5 border-b border-[#E8E2D8]/70 flex items-center justify-between">
            <h4 className="font-simplon-mono text-[11px] font-bold tracking-[0.16em] text-[#17201D] uppercase truncate">
              {activeCountry.name.toUpperCase()} HIGHLIGHTS
            </h4>
            <span className="text-[9.5px] font-mono font-bold bg-[#E85D2A]/10 text-[#E85D2A] px-2 py-0.5 rounded shrink-0">
              {activeCountry.places.length} Places
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCountry.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="space-y-1.5"
            >
              {activeCountry.places.map((place) => {
                const isHovered = preview.key === place.preview.key;
                return (
                  <Link
                    key={place.slug}
                    to={place.path}
                    onClick={onClose}
                    onMouseEnter={() => setPreview(place.preview)}
                    className={`group flex items-center justify-between p-2 -mx-1.5 rounded-lg transition-colors text-[12.5px] font-medium ${
                      isHovered ? 'bg-[#F2F5F8] text-[#E85D2A]' : 'text-[#4A5568] hover:bg-[#F7F9FA] hover:text-[#E85D2A]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate min-w-0 mr-2">
                      <MapPin
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isHovered ? 'text-[#E85D2A]' : 'text-[#A0AEC0] group-hover:text-[#E85D2A]'
                        }`}
                      />
                      <span className="truncate">{place.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[9px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded transition-colors ${
                          place.country === 'Nepal'
                            ? 'bg-blue-50 text-blue-700'
                            : place.country === 'Bhutan'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-purple-50 text-purple-700'
                        }`}
                      >
                        {place.country}
                      </span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 transition-all ${
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

        <div className="pt-3 mt-3 border-t border-[#F0EFEB] flex items-center justify-between text-[11px] text-[#718096]">
          <span>Visas & Permits handled</span>
          <span className="font-semibold text-[#183E63]">Cross-Border Logistics</span>
        </div>
      </div>

      {/* ── Column 4: Dynamic Featured Destination Card (Right Image) ── */}
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
                      {preview.country}
                    </span>
                    <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded font-semibold text-[#E5A93C]">
                      {preview.bestSeason}
                    </span>
                  </div>
                </div>

                <div className="pt-3 px-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0284C7] bg-[#0284C7]/10 px-2 py-0.5 rounded">
                      DESTINATION
                    </span>
                    <span className="text-[10.5px] font-mono text-[#59615D] truncate">
                      {preview.highlight}
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
                  <span>Explore Destination</span>
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
