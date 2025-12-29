
import React from 'react';

export const INJURY_OPTIONS = ['Lower Back', 'Knee', 'Shoulder', 'Neck', 'Wrist', 'Ankle'];

export const EQUIPMENT_PRESETS = [
  { id: 'bodyweight', name: 'Bodyweight', icon: '🏃' },
  { id: 'dumbbells', name: 'Dumbbells', icon: '🏋️' },
  { id: 'kettlebell', name: 'Kettlebell', icon: '🔔' },
  { id: 'bands', name: 'Resistance Bands', icon: '🎗️' },
  { id: 'chair', name: 'Chair', icon: '🪑' },
  { id: 'pullup', name: 'Pull-up Bar', icon: '🪜' },
];

export const VIBE_CONFIG = {
  LOW: {
    color: 'bg-sky-500',
    header: 'bg-sky-600',
    quote: "A 5-minute movement is a 100% improvement over standing still.",
    emoji: '🧘'
  },
  STEADY: {
    color: 'bg-emerald-500',
    header: 'bg-emerald-600',
    quote: "Consistent exercise can increase daily energy levels by up to 20%.",
    emoji: '⚖️'
  },
  STRONG: {
    color: 'bg-orange-500',
    header: 'bg-orange-600',
    quote: "You're built for this. Let's find your new limit today.",
    emoji: '🔥'
  }
};
