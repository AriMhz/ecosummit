import type { Journey } from '../types';
import { treksData } from './treks';
import { toursData } from './tours';
import { expeditionsData } from './expeditions';

export const allJourneys: Journey[] = [
  ...treksData,
  ...toursData,
  ...expeditionsData,
];

export const getJourneyBySlug = (slug: string): Journey | undefined => {
  return allJourneys.find((j) => j.slug === slug);
};

export const getJourneysByCategory = (category: 'trek' | 'tour' | 'expedition'): Journey[] => {
  return allJourneys.filter((j) => j.category === category);
};

export const getFeaturedJourneys = (): Journey[] => {
  // 3 curated most-loved journeys as required by Section 12
  return [
    treksData[0], // Everest Base Camp & Kala Patthar
    treksData[1], // Annapurna Sanctuary & Base Camp
    treksData[2], // Manaslu Circuit & Larkya La Pass
  ];
};
