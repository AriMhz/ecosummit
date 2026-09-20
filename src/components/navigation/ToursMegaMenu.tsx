import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Play, Landmark, Sparkles } from 'lucide-react';

interface ToursMegaMenuProps {
  onClose?: () => void;
}

interface TourPreview {
  key: string;
  badge: string;
  title: string;
  image: string;
  duration: string;
  style: string;
  price?: string;
  description: string;
  path: string;
}

interface TourItem {
  name: string;
  slug: string;
  path: string;
  duration: string;
  style: string;
  price: string;
  badge: string;
  image: string;
  description: string;
}

interface TourStyleCategory {
  id: string;
  name: string;
  detail: string;
  path: string;
  preview: TourPreview;
  tours: TourItem[];
}

export const ToursMegaMenu: React.FC<ToursMegaMenuProps> = ({ onClose }) => {
  const [selectedStyleId, setSelectedStyleId] = useState<string>('cultural');

  const defaultPreview: TourPreview = {
    key: 'cultural-panoramic',
    badge: 'LUXURY HERITAGE',
    title: 'Nepal Panoramic & Luxury Lodges',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
    duration: '8 Days',
    style: 'Boutique Luxury & Heli',
    price: '$2,850',
    description: 'Experience Nepal with private helicopter flights, luxury heritage lodges, and personal guided access to hidden sanctums.',
    path: '/tours/nepal-panoramic-luxury-journey',
  };

  const [preview, setPreview] = useState<TourPreview>(defaultPreview);

  const majorStyles: TourStyleCategory[] = [
    {
      id: 'cultural',
      name: 'Cultural Journeys',
      detail: 'Medieval squares, living goddesses & stupas',
      path: '/tours/nepal-panoramic-luxury-journey',
      preview: {
        key: 'cultural-journeys',
        badge: 'CULTURAL IMMERSION',
        title: 'Kathmandu Valley & Sacred Shrines',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
        duration: '7 Days',
        style: 'UNESCO Heritage',
        price: 'From $1,250',
        description: 'Explore living Newari culture, medieval palace courtyards, and sunrise blessing ceremonies at holy Pashupatinath.',
        path: '/tours/nepal-panoramic-luxury-journey',
      },
      tours: [
        {
          name: 'Nepal Panoramic Luxury Journey',
          slug: 'nepal-panoramic-luxury-journey',
          path: '/tours/nepal-panoramic-luxury-journey',
          duration: '8 Days',
          style: 'Luxury Lodge & Heli',
          price: '$2,850',
          badge: 'TOP SELLER',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'The golden triangle of Nepal: Kathmandu royal cities, Pokhara lakefront, and luxury resort stays.',
        },
        {
          name: 'Kathmandu Valley Cultural Immersion',
          slug: 'kathmandu-valley-cultural',
          path: '/destinations/kathmandu-valley',
          duration: '5 Days',
          style: 'UNESCO Heritage',
          price: '$890',
          badge: 'HERITAGE ESCAPE',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'Intimate exploration of Buddhist monastic life, artisan metalworkers, and historic Newar courtyards.',
        },
        {
          name: 'Ancient Newari Cities & Living Goddess',
          slug: 'ancient-newari-cities',
          path: '/destinations/kathmandu-valley',
          duration: '4 Days',
          style: 'Living Culture',
          price: '$650',
          badge: 'SACRED REALM',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'Walk the ancient cobblestone alleys of Patan and Bhaktapur, visiting Kumari Ghar and woodcarving masters.',
        },
        {
          name: 'Lumbini Sacred Buddha Pilgrimage',
          slug: 'lumbini-pilgrimage',
          path: '/tours',
          duration: '4 Days',
          style: 'Spiritual Pilgrimage',
          price: '$790',
          badge: 'BIRTHPLACE OF BUDDHA',
          image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
          description: 'Visit Mayadevi Temple, sacred Ashoka Pillar, and monastic gardens representing 30+ Buddhist nations.',
        },
      ],
    },
    {
      id: 'wildlife',
      name: 'Wildlife & Jungle Safaris',
      detail: 'Rhinos, elephants & Bengal tigers in Chitwan',
      path: '/tours/nepal-wildlife-heritage-odyssey',
      preview: {
        key: 'wildlife-safari',
        badge: 'JUNGLE SAFARI',
        title: 'Chitwan & Bardia Wild Safari Odyssey',
        image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
        duration: '5 – 10 Days',
        style: 'Wildlife & Nature',
        price: 'From $1,490',
        description: 'Encounter one-horned rhinos, Asian elephants, and elusive Royal Bengal tigers with master naturalists in deep sal forest.',
        path: '/tours/nepal-wildlife-heritage-odyssey',
      },
      tours: [
        {
          name: 'Nepal Wildlife & Heritage Odyssey',
          slug: 'nepal-wildlife-heritage-odyssey',
          path: '/tours/nepal-wildlife-heritage-odyssey',
          duration: '10 Days',
          style: 'Safari & Culture',
          price: '$1,950',
          badge: 'SAFARI CLASSIC',
          image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
          description: 'Chitwan jungle safaris paired with ancient medieval capitals and Annapurna sunrise viewpoints.',
        },
        {
          name: 'Chitwan Royal Jungle & Wildlife Safari',
          slug: 'chitwan-royal-jungle-safari',
          path: '/tours/nepal-wildlife-heritage-odyssey',
          duration: '4 Days',
          style: 'Subtropical Jungle',
          price: '$950',
          badge: 'ONE-HORNED RHINO',
          image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
          description: 'Jeep tracking in pristine sal forests, tranquil dug-out canoe rides on the Rapti river, and Tharu cultural dances.',
        },
        {
          name: 'Bardia Wild Tiger Sanctuary Safari',
          slug: 'bardia-wild-tiger-safari',
          path: '/tours/nepal-wildlife-heritage-odyssey',
          duration: '6 Days',
          style: 'Untouched Wilderness',
          price: '$1,480',
          badge: 'TIGER HABITAT',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Nepal’s most remote lowland park with the highest density of wild Royal Bengal tigers and Gangetic river dolphins.',
        },
        {
          name: 'Koshi Tappu Wetland Birding Safari',
          slug: 'koshi-tappu-birding-safari',
          path: '/tours',
          duration: '4 Days',
          style: 'Birding & River',
          price: '$780',
          badge: 'RAMSAR WETLAND',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'Over 500 migratory bird species, wild water buffaloes (Arna), and peaceful boating across tranquil marshlands.',
        },
      ],
    },
    {
      id: 'unesco',
      name: 'UNESCO Heritage Circuits',
      detail: 'Kathmandu, Patan & Bhaktapur palaces',
      path: '/destinations/kathmandu-valley',
      preview: {
        key: 'unesco-heritage',
        badge: 'WORLD HERITAGE',
        title: 'Patan, Bhaktapur & Kathmandu Royal Palaces',
        image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
        duration: '6 Days',
        style: 'Architectural History',
        price: 'From $980',
        description: 'Masterwood craftsmanship, golden pagodas, and intricate Newari art across all seven UNESCO monument zones.',
        path: '/destinations/kathmandu-valley',
      },
      tours: [
        {
          name: 'Kathmandu 7 UNESCO Monument Zones',
          slug: 'kathmandu-seven-unesco-zones',
          path: '/destinations/kathmandu-valley',
          duration: '6 Days',
          style: 'World Heritage',
          price: '$980',
          badge: 'ALL 7 MONUMENTS',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'Swayambhunath, Boudhanath, Pashupatinath, Changu Narayan, and the three regal Durbar Squares.',
        },
        {
          name: 'Bhaktapur Medieval Potter & Wood Guilds',
          slug: 'bhaktapur-medieval-artisan-tour',
          path: '/destinations/kathmandu-valley',
          duration: '3 Days',
          style: 'Artisan Heritage',
          price: '$490',
          badge: 'CITY OF DEVOTEES',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'Step into a traffic-free 12th-century living city, famed for 55-window palaces and Nyatapola pagoda.',
        },
        {
          name: 'Sacred Hill Temples of Changu & Nagarkot',
          slug: 'changu-narayan-nagarkot-heritage',
          path: '/destinations/kathmandu-valley',
          duration: '3 Days',
          style: 'Temples & Sunrise',
          price: '$520',
          badge: 'OLDEST TEMPLE (464 AD)',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Oldest stone inscription temple in Nepal paired with uninterrupted panoramic sunrise vistas of the Langtang range.',
        },
      ],
    },
    {
      id: 'helicopter',
      name: 'Luxury Helicopter Flights',
      detail: 'Sunrise mountain landings & Everest views',
      path: '/tours/nepal-panoramic-luxury-journey',
      preview: {
        key: 'heli-luxury',
        badge: 'AERIAL SPECTACULAR',
        title: 'Everest Sunrise Helicopter Champagne Flight',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
        duration: '1 Day (4 Hours)',
        style: 'Private Aviation',
        price: '$1,350',
        description: 'Take flight at dawn from Kathmandu, land at Kala Patthar (5,400m), and toast with champagne facing the Khumbu Icefall.',
        path: '/tours/nepal-panoramic-luxury-journey',
      },
      tours: [
        {
          name: 'Everest Sunrise Helicopter Champagne Flight',
          slug: 'everest-heli-champagne-flight',
          path: '/tours/nepal-panoramic-luxury-journey',
          duration: '1 Day (4 Hours)',
          style: 'Private Helicopter',
          price: '$1,350',
          badge: 'EBC / KALA PATTHAR',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'Land at Kala Patthar facing Mt. Everest, followed by champagne breakfast on the terrace at Hotel Everest View.',
        },
        {
          name: 'Annapurna Sanctuary Helicopter Breakfast',
          slug: 'annapurna-sanctuary-heli-breakfast',
          path: '/destinations/annapurna-sanctuary',
          duration: '1 Day (3 Hours)',
          style: 'Mountain Heli',
          price: '$980',
          badge: '360° GLACIER BOWL',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Depart Pokhara lakefront, hover past Machapuchare, and land inside the natural amphitheater of Annapurna Base Camp.',
        },
        {
          name: 'Langtang Kyanjin Valley Heli Landing',
          slug: 'langtang-kyanjin-heli-flight',
          path: '/tours',
          duration: '1 Day (2.5 Hours)',
          style: 'Himalayan Flight',
          price: '$850',
          badge: 'CHEESE & GLACIERS',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'Dramatic short flight over deep pine canyons to Kyanjin Gompa (3,800m) for yak cheese tasting and glacier panoramas.',
        },
      ],
    },
    {
      id: 'spiritual',
      name: 'Spiritual & Wellness',
      detail: 'Monastic stays, meditation & sacred shrines',
      path: '/tours',
      preview: {
        key: 'spiritual-wellness',
        badge: 'SACRED SANCTUARY',
        title: 'Himalayan Monastery Retreat & Meditation',
        image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
        duration: '8 Days',
        style: 'Mindfulness & Yoga',
        price: 'From $1,150',
        description: 'Awaken to deep monastic horn chants, guided meditation with Tibetan lamas, and mountain sound bowl healing.',
        path: '/tours',
      },
      tours: [
        {
          name: 'Himalayan Monastery Retreat & Meditation',
          slug: 'monastery-retreat-meditation',
          path: '/tours',
          duration: '8 Days',
          style: 'Mindfulness & Yoga',
          price: '$1,150',
          badge: 'MONASTIC STAY',
          image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
          description: 'Live inside a Himalayan monastery, participating in dawn puja chants, silent meditation, and Buddhist philosophy talks.',
        },
        {
          name: 'Tibetan Sound Bowl & Chakra Healing',
          slug: 'sound-bowl-chakra-healing',
          path: '/tours',
          duration: '5 Days',
          style: 'Holistic Wellness',
          price: '$790',
          badge: 'ANCIENT FREQUENCIES',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'Certified 7-metal Singing Bowl therapy sessions overlooking the Kathmandu valley with Ayurvedic organic dining.',
        },
        {
          name: 'Sacred Caves of Guru Rinpoche (Padmasambhava)',
          slug: 'caves-of-guru-rinpoche',
          path: '/tours',
          duration: '6 Days',
          style: 'Sacred Pilgrimage',
          price: '$920',
          badge: 'SACRED ASURA CAVE',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Journey to the holy meditation caves of Pharping and Maratika, revered as the cradle of Vajrayana Buddhism.',
        },
      ],
    },
    {
      id: 'bespoke',
      name: 'Private Bespoke Escapes',
      detail: 'Custom chauffeured private travel',
      path: '/plan-your-trip',
      preview: {
        key: 'bespoke-escapes',
        badge: 'CUSTOM ITINERARY',
        title: 'Tailor-Made Private Himalayan Journey',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
        duration: 'Flexible (4–21 Days)',
        style: 'Private Concierge',
        price: 'On Request',
        description: 'Every detail handpicked: private air transfers, exclusive villa buyouts, and personalized cultural encounters.',
        path: '/plan-your-trip',
      },
      tours: [
        {
          name: 'Tailor-Made Private Himalayan Journey',
          slug: 'tailor-made-private-journey',
          path: '/plan-your-trip',
          duration: 'Flexible (4–21 Days)',
          style: 'Private Concierge',
          price: 'Custom Quote',
          badge: '100% BESPOKE',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Design your dream itinerary with a dedicated Kathmandu mountain concierge, private chauffeurs, and luxury lodges.',
        },
        {
          name: 'Himalayan Luxury Honeymoon Odyssey',
          slug: 'luxury-honeymoon-odyssey',
          path: '/plan-your-trip',
          duration: '9 Days',
          style: 'Luxury Romance',
          price: '$3,800',
          badge: 'ROMANTIC ESCAPE',
          image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
          description: 'Private candlelit dining facing the Annapurnas, sunrise helicopter flights, and boutique mountain spa villas.',
        },
        {
          name: 'Family Discovery & Himalayan Culture',
          slug: 'family-discovery-culture',
          path: '/plan-your-trip',
          duration: '8 Days',
          style: 'Family Adventure',
          price: '$2,200',
          badge: 'ALL AGES FRIENDLY',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'Gentle nature walks, pottery making in Bhaktapur, ethical elephant encounters, and safe family-paced travel.',
        },
      ],
    },
  ];

  const activeStyle = majorStyles.find((s) => s.id === selectedStyleId) || majorStyles[0];

  const handleStyleHover = (style: TourStyleCategory) => {
    setSelectedStyleId(style.id);
    setPreview(style.preview);
  };

  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-7 items-stretch">
      {/* ── Column 1: Visual Hero Card (Left Image) ──────────────────── */}
      <div className="col-span-12 xl:col-span-3 rounded-2xl overflow-hidden relative min-h-[420px] flex flex-col justify-between p-6 sm:p-7 group">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80"
          alt="Tours in Nepal"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#E85D2A] rounded-full" />
            <span className="font-simplon-mono text-[10px] tracking-[0.2em] font-bold text-white/90 uppercase">
              CULTURAL EXPERIENCES
            </span>
          </div>

          <h3 className="font-serif text-2xl lg:text-[26px] text-white font-normal leading-[1.18] tracking-tight">
            Ancient Temples.
            <br />
            Untamed
            <br />
            Wilderness.
          </h3>

          <p className="font-sans text-xs text-white/80 leading-relaxed font-light line-clamp-3">
            Immerse yourself in Nepal's sacred Buddhist monasteries, historic royal palaces, and rich safari ecosystems.
          </p>
        </div>

        <div className="relative z-10 pt-4">
          <Link
            to="/tours"
            onClick={onClose}
            className="inline-flex items-center gap-3 text-xs font-semibold text-white group/btn transition-colors hover:text-[#E85D2A]"
          >
            <div className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center text-white group-hover/btn:border-[#E85D2A] group-hover/btn:text-[#E85D2A] group-hover/btn:scale-105 transition-all bg-black/20 backdrop-blur-xs">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span className="tracking-wide">Explore All Tours</span>
          </Link>
        </div>
      </div>

      {/* ── Column 2: Major Tour Styles ───────────────────────────────── */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col justify-between py-1 border-r border-[#F0EFEB]/80 pr-4">
        <div>
          <div className="mb-3.5 pb-2 border-b border-[#E8E2D8]/70 flex items-center justify-between">
            <h4 className="font-serif text-[15px] font-bold text-[#142332] leading-tight tracking-tight">
              Tour Categories
            </h4>
            <span className="text-[10px] font-mono text-[#E85D2A] font-bold bg-[#E85D2A]/10 px-2 py-0.5 rounded">
              {majorStyles.length} Styles
            </span>
          </div>

          <div className="space-y-2">
            {majorStyles.map((style) => {
              const isActive = selectedStyleId === style.id;
              return (
                <div
                  key={style.id}
                  onMouseEnter={() => handleStyleHover(style)}
                  className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#F2F5F8] shadow-xs border-l-3 border-[#E85D2A] pl-3'
                      : 'hover:bg-[#F7F9FA]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <Landmark
                        className={`w-4 h-4 transition-colors shrink-0 ${
                          isActive ? 'text-[#E85D2A]' : 'text-[#183E63]'
                        }`}
                      />
                      <span
                        className={`font-serif text-[14.5px] font-bold transition-colors leading-tight truncate ${
                          isActive ? 'text-[#E85D2A]' : 'text-[#17201D]'
                        }`}
                      >
                        {style.name}
                      </span>
                    </div>
                    <span className="text-[9.5px] font-mono text-[#718096] uppercase font-semibold shrink-0 ml-1">
                      {style.tours.length} trips
                    </span>
                  </div>

                  <p className="text-[11px] text-[#718096] mt-1 font-light leading-relaxed truncate">
                    {style.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 mt-2 border-t border-[#F0EFEB]">
          <Link
            to="/tours"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183E63] hover:text-[#E85D2A] transition-colors"
          >
            <span>View All Cultural Itineraries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Column 3: Dynamic Tours for Selected Style ─────────────────── */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col justify-between py-1 border-r border-[#F0EFEB]/80 pr-4">
        <div>
          <div className="mb-3.5 pb-1.5 border-b border-[#E8E2D8]/70 flex items-center justify-between">
            <h4 className="font-simplon-mono text-[11px] font-bold tracking-[0.16em] text-[#17201D] uppercase truncate">
              {activeStyle.name.toUpperCase()}
            </h4>
            <span className="text-[9.5px] font-mono font-bold bg-[#E85D2A]/10 text-[#E85D2A] px-2 py-0.5 rounded shrink-0">
              {activeStyle.tours.length} Tours
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStyle.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="space-y-1.5"
            >
              {activeStyle.tours.map((tour) => {
                const isHovered = preview.key === tour.slug;
                return (
                  <Link
                    key={tour.slug}
                    to={tour.path}
                    onClick={onClose}
                    onMouseEnter={() =>
                      setPreview({
                        key: tour.slug,
                        badge: tour.badge,
                        title: tour.name,
                        image: tour.image,
                        duration: tour.duration,
                        style: tour.style,
                        price: tour.price,
                        description: tour.description,
                        path: tour.path,
                      })
                    }
                    className={`group flex items-center justify-between p-2 -mx-1.5 rounded-lg transition-colors text-[12.5px] font-medium ${
                      isHovered ? 'bg-[#F2F5F8] text-[#E85D2A]' : 'text-[#4A5568] hover:bg-[#F7F9FA] hover:text-[#E85D2A]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Sparkles
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isHovered ? 'text-[#E85D2A]' : 'text-[#A0AEC0] group-hover:text-[#E85D2A]'
                        }`}
                      />
                      <span className="truncate">{tour.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="font-mono text-[10px] text-[#A0AEC0]">{tour.duration}</span>
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
            <span>Verified Guides & Lodges</span>
            <span className="font-semibold text-[#183E63]">Direct Booking</span>
          </div>
        </div>
      </div>

      {/* ── Column 4: Dynamic Featured Tour Card (Right Image) ───────── */}
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
                      {preview.style}
                    </span>
                  </div>
                </div>

                <div className="pt-3 px-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0284C7] bg-[#0284C7]/10 px-2 py-0.5 rounded">
                      VERIFIED TOUR
                    </span>
                    {preview.price && (
                      <span className="text-xs font-bold text-[#E85D2A] font-mono">
                        {preview.price}
                      </span>
                    )}
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
                  <span>Explore Tour Itinerary</span>
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
