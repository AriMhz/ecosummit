import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Play, Calendar, Mountain } from 'lucide-react';

interface TreksMegaMenuProps {
  onClose?: () => void;
}

interface PreviewItem {
  key: string;
  badge: string;
  title: string;
  image: string;
  duration: string;
  altitude: string;
  price?: string;
  description: string;
  path: string;
}

interface TrekItem {
  name: string;
  slug: string;
  path: string;
  duration: string;
  altitude: string;
  price: string;
  badge: string;
  image: string;
  description: string;
}

interface RegionItem {
  id: string;
  name: string;
  detail: string;
  path: string;
  preview: PreviewItem;
  treks: TrekItem[];
}

export const TreksMegaMenu: React.FC<TreksMegaMenuProps> = ({ onClose }) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('everest');

  // Default preview item (Everest Base Camp)
  const defaultPreview: PreviewItem = {
    key: 'everest-base-camp',
    badge: 'FEATURED TREK',
    title: 'Everest Base Camp & Kala Patthar',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
    duration: '14 Days',
    altitude: '5,545 m',
    price: '$1,890',
    description: "The classic Himalayan journey through high Sherpa villages, ancient pine forests, and dramatic glacial moraines.",
    path: '/treks/everest-base-camp-kala-patthar',
  };

  const [preview, setPreview] = useState<PreviewItem>(defaultPreview);

  const majorRegions: RegionItem[] = [
    {
      id: 'everest',
      name: 'Everest Region',
      detail: 'Base Camp, Gokyo, Three Passes',
      path: '/treks/everest-base-camp-kala-patthar',
      preview: {
        key: 'everest-region',
        badge: 'EVEREST / KHUMBU',
        title: 'Everest & Khumbu High Glaciers',
        image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
        duration: '8 – 19 Days',
        altitude: '5,545 m',
        price: 'From $1,450',
        description: 'Traverse legendary trails under the shadow of Mt. Everest, Lhotse, and Ama Dablam with Sherpa-led teams.',
        path: '/treks/everest-base-camp-kala-patthar',
      },
      treks: [
        {
          name: 'Everest Base Camp & Kala Patthar',
          slug: 'everest-base-camp-kala-patthar',
          path: '/treks/everest-base-camp-kala-patthar',
          duration: '14 Days',
          altitude: '5,545 m',
          price: '$1,890',
          badge: 'KHUMBU EPIC',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'The legendary trek through Namche Bazaar, Tengboche, and up to the panoramic apex of Kala Patthar.',
        },
        {
          name: 'Luxury EBC with Helicopter Return',
          slug: 'luxury-ebc-helicopter-return',
          path: '/treks/luxury-ebc-helicopter-return',
          duration: '11 Days',
          altitude: '5,545 m',
          price: '$3,450',
          badge: 'LUXURY LODGES & HELI',
          image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=800&q=85',
          description: 'Trek up to Base Camp in elevated luxury, then soar back to Kathmandu by private helicopter from Gorak Shep.',
        },
        {
          name: 'Gokyo Lakes & Renjo La Pass',
          slug: 'gokyo-lakes-renjo-la-pass',
          path: '/treks/gokyo-lakes-renjo-la-pass',
          duration: '15 Days',
          altitude: '5,420 m',
          price: '$1,980',
          badge: 'TURQUOISE LAKES',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Gaze into six emerald glacial lakes and conquer the technical high pass between Gokyo and Everest valley.',
        },
        {
          name: 'Everest High Three Passes Epic',
          slug: 'everest-high-three-passes',
          path: '/treks/everest-high-three-passes',
          duration: '19 Days',
          altitude: '5,535 m',
          price: '$2,290',
          badge: 'ULTIMATE KHUMBU',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'Cross Kongma La, Cho La, and Renjo La passes in an unyielding grand traverse of the Sagarmatha wilderness.',
        },
        {
          name: 'Everest Panorama & Tengboche',
          slug: 'everest-panorama-tengboche',
          path: '/treks/everest-panorama-tengboche',
          duration: '9 Days',
          altitude: '3,860 m',
          price: '$1,350',
          badge: 'SHORT CLASSIC',
          image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
          description: 'Ideal moderate trek reaching historic Tengboche Monastery with staggering views of Everest and Ama Dablam.',
        },
      ],
    },
    {
      id: 'annapurna',
      name: 'Annapurna Region',
      detail: 'Annapurna Circuit, Base Camp, Sanctuary',
      path: '/treks/annapurna-sanctuary-base-camp',
      preview: {
        key: 'annapurna-region',
        badge: 'ANNAPURNA SANCTUARY',
        title: 'Annapurna Amphitheater & Circuit',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
        duration: '7 – 16 Days',
        altitude: '5,416 m',
        price: 'From $1,200',
        description: 'From subtropical rhododendron forests to the 360-degree high glaciated sanctuary of the Annapurna range.',
        path: '/treks/annapurna-sanctuary-base-camp',
      },
      treks: [
        {
          name: 'Annapurna Sanctuary Base Camp',
          slug: 'annapurna-sanctuary-base-camp',
          path: '/treks/annapurna-sanctuary-base-camp',
          duration: '12 Days',
          altitude: '4,130 m',
          price: '$1,350',
          badge: 'NATURAL BOWL',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Hike into the natural glacial bowl surrounded by ten peaks exceeding 7,000m including sacred Machapuchare.',
        },
        {
          name: 'Annapurna Circuit & Thorong La',
          slug: 'annapurna-circuit-thorong-la',
          path: '/treks/annapurna-circuit-thorong-la',
          duration: '16 Days',
          altitude: '5,416 m',
          price: '$1,590',
          badge: 'LEGENDARY PASS',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'The premier classic circuit crossing Thorong La Pass from lush Marshyangdi valleys to arid Muktinath.',
        },
        {
          name: 'Mardi Himal Eco Ridge Trek',
          slug: 'mardi-himal-ridge-trek',
          path: '/treks/mardi-himal-ridge-trek',
          duration: '9 Days',
          altitude: '4,500 m',
          price: '$890',
          badge: 'HIDDEN RIDGE',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'Walk along pristine cloud forest ridges directly facing the razor peak of Machapuchare.',
        },
        {
          name: 'Ghorepani Poon Hill Sunrise',
          slug: 'ghorepani-poon-hill-ghandruk',
          path: '/treks/ghorepani-poon-hill-ghandruk',
          duration: '7 Days',
          altitude: '3,210 m',
          price: '$650',
          badge: 'SUNRISE ICON',
          image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
          description: 'World-famous sunrise over Dhaulagiri and Annapurna ranges through blooming rhododendron forests.',
        },
        {
          name: 'Nar Phu Valley & Kang La Pass',
          slug: 'nar-phu-valley-lost-tibet',
          path: '/treks/nar-phu-valley-lost-tibet',
          duration: '18 Days',
          altitude: '5,320 m',
          price: '$2,150',
          badge: 'RESTRICTED TIBETAN',
          image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
          description: 'Hidden medieval Tibetan villages, sheer gorge canyons, and ancient Buddhist chortens behind Annapurna.',
        },
      ],
    },
    {
      id: 'manaslu',
      name: 'Manaslu Region',
      detail: 'Tsum Valley, Larkya La, Hidden Sanctuary',
      path: '/treks/manaslu-circuit-larkya-la',
      preview: {
        key: 'manaslu-region',
        badge: 'MANASLU WILDERNESS',
        title: 'Manaslu Circuit & Larkya La Pass',
        image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
        duration: '14 – 16 Days',
        altitude: '5,160 m',
        price: 'From $1,650',
        description: 'Restricted wild frontier circuit around the world’s eighth-highest mountain, rich in Tibetan border culture.',
        path: '/treks/manaslu-circuit-larkya-la',
      },
      treks: [
        {
          name: 'Manaslu Circuit & Larkya La',
          slug: 'manaslu-circuit-larkya-la',
          path: '/treks/manaslu-circuit-larkya-la',
          duration: '14 Days',
          altitude: '5,160 m',
          price: '$1,650',
          badge: 'WILD CIRCUIT',
          image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
          description: 'Traverse deep gorge trails along the Budhi Gandaki river before climbing over the majestic Larkya La pass.',
        },
        {
          name: 'Tsum Valley Sacred Sanctuary',
          slug: 'tsum-valley-hidden-sanctuary',
          path: '/treks/tsum-valley-hidden-sanctuary',
          duration: '16 Days',
          altitude: '3,700 m',
          price: '$1,780',
          badge: 'VALLEY OF HAPPINESS',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Non-violent sacred Beyul where Milarepa meditated, marked by ancient nunneries and stone villages.',
        },
        {
          name: 'Manaslu & Tsum Grand Circuit',
          slug: 'manaslu-circuit-larkya-la',
          path: '/treks/manaslu-circuit-larkya-la',
          duration: '22 Days',
          altitude: '5,160 m',
          price: '$2,390',
          badge: 'COMPLETE EXPEDITION',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'The ultimate 3-week odyssey combining the sacred spiritual valley of Tsum with the Larkya La pass.',
        },
        {
          name: 'Manaslu Rupina La Wild Traverse',
          slug: 'manaslu-circuit-larkya-la',
          path: '/treks/manaslu-circuit-larkya-la',
          duration: '18 Days',
          altitude: '4,720 m',
          price: '$2,100',
          badge: 'TRUE WILDERNESS',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'Camping style traverse across remote untracked passes under the south face of the Manaslu massif.',
        },
        {
          name: 'Manaslu Base Camp & Birendra Lake',
          slug: 'manaslu-circuit-larkya-la',
          path: '/treks/manaslu-circuit-larkya-la',
          duration: '12 Days',
          altitude: '4,800 m',
          price: '$1,450',
          badge: 'GLACIAL CRADLE',
          image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
          description: 'Trek to Sama Gaon, explore turquoise glacial Birendra Lake, and visit 8,163m expedition base camp.',
        },
      ],
    },
    {
      id: 'langtang',
      name: 'Langtang Region',
      detail: 'Langtang Valley, Gosainkunda Lakes',
      path: '/treks/langtang-valley-kyanjin-gompa',
      preview: {
        key: 'langtang-region',
        badge: 'LANGTANG VALLEY',
        title: 'Langtang Valley & Sacred Lakes',
        image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
        duration: '8 – 13 Days',
        altitude: '4,773 m',
        price: 'From $950',
        description: 'The valley of glaciers closest to Kathmandu, blessed with sacred holy lakes and rich Tamang heritage.',
        path: '/treks/langtang-valley-kyanjin-gompa',
      },
      treks: [
        {
          name: 'Langtang Valley & Kyanjin Ri',
          slug: 'langtang-valley-kyanjin-gompa',
          path: '/treks/langtang-valley-kyanjin-gompa',
          duration: '10 Days',
          altitude: '4,773 m',
          price: '$950',
          badge: 'VALLEY OF GLACIERS',
          image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
          description: 'Vibrant Tamang hospitality, local yak cheese dairies, and 360-degree views of Langtang Lirung from Kyanjin Ri.',
        },
        {
          name: 'Gosainkunda Sacred Alpine Lakes',
          slug: 'gosainkunda-sacred-alpine-lakes',
          path: '/treks/gosainkunda-sacred-alpine-lakes',
          duration: '8 Days',
          altitude: '4,610 m',
          price: '$850',
          badge: 'HOLY PILGRIMAGE',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'Sacred high-altitude lakes created by Lord Shiva, culminating at the dramatic Laurebina Pass.',
        },
        {
          name: 'Tamang Heritage Cultural Trail',
          slug: 'tamang-heritage-cultural-trail',
          path: '/treks/tamang-heritage-cultural-trail',
          duration: '9 Days',
          altitude: '3,870 m',
          price: '$790',
          badge: 'LIVING CULTURE',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Warm homestays, natural hot springs in Tatopani, and ancient Tibetan-influenced crafts in Briddhim.',
        },
        {
          name: 'Langtang & Helambu Circuit',
          slug: 'langtang-helambu-cultural-circuit',
          path: '/treks/langtang-helambu-cultural-circuit',
          duration: '14 Days',
          altitude: '4,610 m',
          price: '$1,290',
          badge: 'VALLEY TO RIDGE',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'Complete traverse combining glacial Langtang valley with sacred lakes and serene Helambu apple orchards.',
        },
        {
          name: 'Ganja La High Alpine Pass',
          slug: 'ganja-la-pass-alpine-traverse',
          path: '/treks/ganja-la-pass-alpine-traverse',
          duration: '14 Days',
          altitude: '5,130 m',
          price: '$1,690',
          badge: 'TECHNICAL PASS',
          image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
          description: 'Challenging snow-pass expedition with crampons and ice axes linking Langtang directly to Helambu.',
        },
      ],
    },
    {
      id: 'mustang',
      name: 'Mustang Region',
      detail: 'Upper Mustang, Lo Manthang, Caves',
      path: '/destinations/upper-mustang',
      preview: {
        key: 'mustang-region',
        badge: 'RESTRICTED KINGDOM',
        title: 'Upper Mustang Walled Kingdom',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
        duration: '14 Days',
        altitude: '3,840 m',
        price: 'From $2,490',
        description: 'Step into a 14th-century Buddhist kingdom preserved behind the Himalayan rain-shadow, featuring sacred sky caves.',
        path: '/destinations/upper-mustang',
      },
      treks: [
        {
          name: 'Upper Mustang Walled Kingdom of Lo',
          slug: 'upper-mustang-walled-kingdom',
          path: '/treks/upper-mustang-walled-kingdom',
          duration: '14 Days',
          altitude: '3,840 m',
          price: '$2,490',
          badge: 'ANCIENT REALM',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'Enter the royal walled city of Lo Manthang, preserved through centuries of isolation behind Annapurna.',
        },
        {
          name: 'Lo Manthang Tiji Festival Tour',
          slug: 'upper-mustang-walled-kingdom',
          path: '/treks/upper-mustang-walled-kingdom',
          duration: '15 Days',
          altitude: '3,840 m',
          price: '$2,750',
          badge: 'SACRED MASK DANCE',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Witness the 3-day masked exorcism dances inside the King’s palace courtyard celebrating Buddhist victory over evil.',
        },
        {
          name: 'Lower Mustang & Muktinath Pilgrimage',
          slug: 'lower-mustang-muktinath',
          path: '/destinations/upper-mustang',
          duration: '8 Days',
          altitude: '3,800 m',
          price: '$1,190',
          badge: 'SACRED FLAME',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'Sacred 108 water spouts and perpetual natural gas flames at Muktinath, meeting Kagbeni medieval gateway.',
        },
        {
          name: 'Damodar Kunda Sacred High Lakes',
          slug: 'damodar-kunda-pilgrimage',
          path: '/destinations/upper-mustang',
          duration: '16 Days',
          altitude: '4,890 m',
          price: '$2,890',
          badge: 'ORIGIN OF SALIGRAM',
          image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
          description: 'Expedition beyond Lo Manthang towards the Tibetan frontier to the glacial cradle of fossil ammonites.',
        },
        {
          name: 'Chhoser Sky Caves & Monasteries',
          slug: 'upper-mustang-walled-kingdom',
          path: '/treks/upper-mustang-walled-kingdom',
          duration: '12 Days',
          altitude: '3,840 m',
          price: '$2,350',
          badge: 'MYSTERY CAVES',
          image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
          description: 'Explore 3,000-year-old multi-story cave dwellings carved sheer into amber sandstone cliff walls.',
        },
      ],
    },
    {
      id: 'dolpo',
      name: 'Dolpo Region',
      detail: 'Shey Phoksundo, Crystal Mountain',
      path: '/destinations/upper-mustang',
      preview: {
        key: 'dolpo-region',
        badge: 'TRANS-HIMALAYAN DOLPO',
        title: 'Upper Dolpo & Shey Phoksundo',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
        duration: '24 Days',
        altitude: '5,350 m',
        price: 'From $3,650',
        description: 'Nepal’s ultimate deep wilderness adventure to turquoise Phoksundo Lake and timeless Bonpo monasteries.',
        path: '/destinations/upper-mustang',
      },
      treks: [
        {
          name: 'Upper Dolpo & Shey Phoksundo',
          slug: 'upper-dolpo-shey-phoksundo',
          path: '/treks/upper-dolpo-shey-phoksundo',
          duration: '24 Days',
          altitude: '5,350 m',
          price: '$3,650',
          badge: 'DEEP EXPEDITION',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
          description: 'Nepal’s ultimate trans-Himalayan wilderness adventure across Kang La pass into the secret land of Peter Matthiessen.',
        },
        {
          name: 'Lower Dolpo & Tarap Valley',
          slug: 'lower-dolpo-circuit',
          path: '/destinations/upper-mustang',
          duration: '18 Days',
          altitude: '5,115 m',
          price: '$2,890',
          badge: 'BON CULTURE',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85',
          description: 'Trek through the deep gorges of Tarap Chu and cross Numa La pass to turquoise Phoksundo lake.',
        },
        {
          name: 'Turquoise Phoksundo Lake Hike',
          slug: 'phoksundo-lake-wilderness',
          path: '/destinations/upper-mustang',
          duration: '12 Days',
          altitude: '3,611 m',
          price: '$1,980',
          badge: 'TURQUOISE JEWEL',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
          description: 'Venture to Nepal’s deepest and most hypnotically blue lake, meeting Ringmo village and Bonpo shrines.',
        },
        {
          name: 'Shey Gompa Crystal Mountain Kora',
          slug: 'crystal-mountain-kora',
          path: '/treks/upper-dolpo-shey-phoksundo',
          duration: '21 Days',
          altitude: '5,200 m',
          price: '$3,450',
          badge: 'SACRED KORA',
          image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=85',
          description: 'Sacred pilgrimage circuit around Crystal Mountain, visiting 11th-century Shey Gompa in the wild heart of Dolpo.',
        },
        {
          name: 'Dolpo to Mustang High Traverse',
          slug: 'upper-dolpo-shey-phoksundo',
          path: '/treks/upper-dolpo-shey-phoksundo',
          duration: '26 Days',
          altitude: '5,350 m',
          price: '$3,950',
          badge: 'GRAND EXPEDITION',
          image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=85',
          description: 'Epic expedition traversing untouched high passes from Shey Phoksundo Lake directly into Upper Mustang.',
        },
      ],
    },
  ];

  // Currently active region
  const activeRegion = majorRegions.find((r) => r.id === selectedRegionId) || majorRegions[0];

  const trekDurations = [
    { label: '7 – 10 Days (Short Escapes)', path: '/treks' },
    { label: '11 – 15 Days (Classic Circuits)', path: '/treks' },
    { label: '16 – 20 Days (High Passes)', path: '/treks' },
    { label: '21+ Days (Grand Traverse)', path: '/treks' },
  ];

  const handleRegionHover = (region: RegionItem) => {
    setSelectedRegionId(region.id);
    setPreview(region.preview);
  };

  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-7 items-stretch">
      {/* ── Column 1: Visual Hero Card (Left Image) ──────────────────── */}
      <div className="col-span-12 xl:col-span-3 rounded-2xl overflow-hidden relative min-h-[420px] flex flex-col justify-between p-6 sm:p-7 group">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80"
          alt="Trekking in Nepal"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#E85D2A] rounded-full" />
            <span className="font-simplon-mono text-[10px] tracking-[0.2em] font-bold text-white/90 uppercase">
              TREKKING IN NEPAL
            </span>
          </div>

          <h3 className="font-serif text-2xl lg:text-[26px] text-white font-normal leading-[1.18] tracking-tight">
            Iconic Trails.
            <br />
            Unforgettable
            <br />
            Journeys.
          </h3>

          <p className="font-sans text-xs text-white/80 leading-relaxed font-light line-clamp-3">
            From legendary peaks to hidden valleys, explore Nepal's most breathtaking treks with expert Sherpa guides and local support.
          </p>
        </div>

        <div className="relative z-10 pt-4">
          <Link
            to="/treks"
            onClick={onClose}
            className="inline-flex items-center gap-3 text-xs font-semibold text-white group/btn transition-colors hover:text-[#E85D2A]"
          >
            <div className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center text-white group-hover/btn:border-[#E85D2A] group-hover/btn:text-[#E85D2A] group-hover/btn:scale-105 transition-all bg-black/20 backdrop-blur-xs">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span className="tracking-wide">Watch Our Treks</span>
          </Link>
        </div>
      </div>

      {/* ── Column 2: Major Trekking Regions ─────────────────────────── */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col justify-between py-1 border-r border-[#F0EFEB]/80 pr-4">
        <div>
          <h4 className="font-simplon-mono text-[11px] font-bold tracking-[0.18em] text-[#17201D] uppercase mb-4 flex items-center justify-between">
            <span>MAJOR TREKKING REGIONS</span>
            <span className="text-[9.5px] font-mono text-[#E85D2A] font-semibold lowercase">hover to switch</span>
          </h4>

          <div className="space-y-2">
            {majorRegions.map((region) => {
              const isActive = selectedRegionId === region.id;
              return (
                <Link
                  key={region.id}
                  to={region.path}
                  onClick={onClose}
                  onMouseEnter={() => handleRegionHover(region)}
                  className={`group flex items-center justify-between p-2 -mx-1.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-[#F2F5F8] shadow-xs border-l-3 border-[#E85D2A] pl-2.5'
                      : 'hover:bg-[#F7F9FA]'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isActive ? 'bg-[#E85D2A] text-white' : 'bg-[#F2F5F8] text-[#183E63]'
                      }`}
                    >
                      <Mountain className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`font-sans text-[13px] font-semibold transition-colors block leading-tight truncate ${
                          isActive ? 'text-[#E85D2A]' : 'text-[#17201D] group-hover:text-[#E85D2A]'
                        }`}
                      >
                        {region.name}
                      </span>
                      <span className="font-sans text-[11px] text-[#718096] font-light block mt-0.5 truncate">
                        {region.detail}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-all shrink-0 ml-1.5 ${
                      isActive
                        ? 'text-[#E85D2A] translate-x-1 opacity-100'
                        : 'text-[#CBD5E0] opacity-0 group-hover:opacity-100 group-hover:text-[#E85D2A]'
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="pt-3 mt-2 border-t border-[#F0EFEB]">
          <Link
            to="/treks"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183E63] hover:text-[#E85D2A] transition-colors"
          >
            <span>View All 20+ Treks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Column 3: Dynamic Region Treks & Duration ────────────────── */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col justify-between py-1 border-r border-[#F0EFEB]/80 pr-4">
        <div>
          <div className="mb-3.5 pb-1.5 border-b border-[#E8E2D8]/70 flex items-center justify-between">
            <h4 className="font-simplon-mono text-[11px] font-bold tracking-[0.16em] text-[#17201D] uppercase truncate">
              {activeRegion.name.toUpperCase()} PACKAGES
            </h4>
            <span className="text-[9.5px] font-mono font-bold bg-[#E85D2A]/10 text-[#E85D2A] px-2 py-0.5 rounded shrink-0">
              {activeRegion.treks.length} Routes
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="space-y-1.5"
            >
              {activeRegion.treks.map((trek) => {
                const isHovered = preview.key === trek.slug;
                return (
                  <Link
                    key={trek.slug}
                    to={trek.path}
                    onClick={onClose}
                    onMouseEnter={() =>
                      setPreview({
                        key: trek.slug,
                        badge: trek.badge,
                        title: trek.name,
                        image: trek.image,
                        duration: trek.duration,
                        altitude: trek.altitude,
                        price: trek.price,
                        description: trek.description,
                        path: trek.path,
                      })
                    }
                    className={`group flex items-center justify-between p-1.5 -mx-1.5 rounded-lg transition-colors text-[12.5px] font-medium ${
                      isHovered ? 'bg-[#F2F5F8] text-[#E85D2A]' : 'text-[#4A5568] hover:bg-[#F7F9FA] hover:text-[#E85D2A]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Mountain
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isHovered ? 'text-[#E85D2A]' : 'text-[#A0AEC0] group-hover:text-[#E85D2A]'
                        }`}
                      />
                      <span className="truncate">{trek.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#A0AEC0] shrink-0">{trek.duration}</span>
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom: Trek Duration */}
        <div className="pt-3 mt-3 border-t border-[#F0EFEB]">
          <h4 className="font-simplon-mono text-[11px] font-bold tracking-[0.18em] text-[#17201D] uppercase mb-2">
            TREK DURATION
          </h4>

          <div className="space-y-1">
            {trekDurations.map((dur) => (
              <Link
                key={dur.label}
                to={dur.path}
                onClick={onClose}
                className="group flex items-center justify-between text-[12px] text-[#4A5568] hover:text-[#E85D2A] transition-colors py-0.5 font-medium"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#A0AEC0] group-hover:text-[#E85D2A] transition-colors shrink-0" />
                  <span>{dur.label}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-[#CBD5E0] group-hover:text-[#E85D2A] group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Column 4: Dynamic Featured Trek Card (Right Image) ───────── */}
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
                {/* Image Container with Badges */}
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

                {/* Info */}
                <div className="pt-3 px-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0284C7] bg-[#0284C7]/10 px-2 py-0.5 rounded">
                      VERIFIED ROUTE
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

              {/* Explore Button */}
              <div className="pt-3 px-1 border-t border-[#E8E2D8]/70 mt-2">
                <Link
                  to={preview.path}
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#E85D2A] hover:bg-[#D34D1E] text-white text-xs font-semibold tracking-wide shadow-xs hover:shadow-md transition-all group/btn"
                >
                  <span>Explore Route Details</span>
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
