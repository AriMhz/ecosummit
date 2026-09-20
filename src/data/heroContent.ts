export interface HeroCorridor {
  label: string;
  path: string;
}

export interface HeroSlide {
  id: string;
  tag: string;
  title: string;
  tagline: string;
  link: string;
  desktopImage: string;
  mobileImage: string;
  location: string;
  elevation: string;
  alt: string;
}

export interface HeroContentData {
  slides: HeroSlide[];
}

export const heroContent: HeroContentData = {
  slides: [
    {
      id: 'annapurna',
      tag: 'ANNAPURNA SANCTUARY',
      title: 'Annapurna',
      tagline: 'Walk into the 360° glacial amphitheater',
      link: '/treks/annapurna-sanctuary-abc',
      desktopImage:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2560&q=90',
      mobileImage:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85',
      location: 'Annapurna Base Camp',
      elevation: '4,130m',
      alt: 'Spectacular glaciated mountain amphitheater of the Annapurna Sanctuary in Nepal',
    },
    {
      id: 'everest',
      tag: 'ROOF OF THE WORLD',
      title: 'Everest Khumbu',
      tagline: 'Trek to the legendary foot of Mount Everest',
      link: '/treks/everest-base-camp-kala-patthar',
      desktopImage:
        'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=2560&q=90',
      mobileImage:
        'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=85',
      location: 'Khumbu Ridgelines',
      elevation: '5,364m',
      alt: 'Solitary trekker on high Himalayan ridge walking towards colossal snowy summits',
    },
    {
      id: 'kathmandu',
      tag: 'LIVING HERITAGE',
      title: 'Kathmandu',
      tagline: 'Discover ancient Newari courtyards & sacred stupas',
      link: '/tours/nepal-panoramic-luxury-journey',
      desktopImage:
        'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=2560&q=90',
      mobileImage:
        'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1200&q=85',
      location: 'Boudhanath & Patan',
      elevation: '1,400m',
      alt: 'Traditional prayer flags and historic stupa overlooking the sacred Kathmandu Valley',
    },
    {
      id: 'machapuchare',
      tag: 'SACRED PEAKS',
      title: 'Machapuchare',
      tagline: 'Gaze upon the revered, unclimbed Fishtail pinnacle',
      link: '/destinations/pokhara-valley',
      desktopImage:
        'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=2560&q=90',
      mobileImage:
        'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=85',
      location: 'Pokhara Foothills',
      elevation: '6,993m',
      alt: 'The sacred, unclimbed pyramid of Machapuchare peak at twilight in Nepal',
    },
    {
      id: 'manaslu',
      tag: 'REMOTE WILDERNESS',
      title: 'Manaslu Circuit',
      tagline: 'Traverse untouched high-altitude glaciated passes',
      link: '/treks/manaslu-circuit-larkya-la',
      desktopImage:
        'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=2560&q=90',
      mobileImage:
        'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=85',
      location: 'Larkya La Pass',
      elevation: '5,160m',
      alt: 'Golden alpenglow crowning dramatic razor-sharp Himalayan mountain peaks',
    },
  ],
};
