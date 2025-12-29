
export enum AppView {
  ONBOARDING = 'ONBOARDING',
  VIBE_CHECK = 'VIBE_CHECK',
  BODY_FOCUS = 'BODY_FOCUS',
  EQUIPMENT = 'EQUIPMENT',
  WORKOUT = 'WORKOUT',
  DASHBOARD = 'DASHBOARD'
}

export enum UserVibe {
  LOW = 'LOW',
  STEADY = 'STEADY',
  STRONG = 'STRONG'
}

export type BodyFocus = 'Full Body' | 'Upper Body' | 'Lower Body' | 'Core';

export interface UserBlueprint {
  age: number;
  gender: string;
  goal: 'Weight Loss' | 'Muscle Gain' | 'Functional Strength';
  availability: {
    daysPerWeek: number;
    minsPerSession: number;
  };
  injuries: string[];
  maxExercises: number;
}

export interface Equipment {
  id: string;
  name: string;
  icon: string;
  isCustom?: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  reps: string;
  sets: number;
  suggestedWeight: string;
  tips: string[];
  thumbnailUrl: string;
  youtubeUrl: string;
  category: 'Warm-up' | 'Main' | 'Cool-down';
  completed?: boolean;
}

export interface WorkoutSession {
  date: string;
  vibe: UserVibe;
  exercises: Exercise[];
}
