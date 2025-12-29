
import React, { useState } from 'react';
import { UserBlueprint } from '../types';
import { INJURY_OPTIONS } from '../constants';

interface OnboardingProps {
  onComplete: (blueprint: UserBlueprint) => void;
}

const OnboardingWizard: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [blueprint, setBlueprint] = useState<UserBlueprint>({
    age: 30,
    gender: 'Other',
    goal: 'Functional Strength',
    availability: { daysPerWeek: 3, minsPerSession: 30 },
    injuries: [],
    maxExercises: 6
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const toggleInjury = (injury: string) => {
    setBlueprint(prev => ({
      ...prev,
      injuries: prev.injuries.includes(injury)
        ? prev.injuries.filter(i => i !== injury)
        : [...prev.injuries, injury]
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-800">Welcome to JimBro</h2>
            <p className="text-slate-500 mt-2">Let's build your personal blueprint.</p>
          </div>
          <div className="space-y-4">
            <label className="block">
              <span className="text-slate-700 font-medium">How old are you?</span>
              <input 
                type="number" 
                className="mt-1 block w-full rounded-xl border-slate-200 bg-white p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={blueprint.age}
                onChange={e => setBlueprint({...blueprint, age: parseInt(e.target.value) || 0})}
              />
            </label>
            <label className="block">
              <span className="text-slate-700 font-medium">Gender Preference</span>
              <select 
                className="mt-1 block w-full rounded-xl border-slate-200 bg-white p-4 shadow-sm"
                value={blueprint.gender}
                onChange={e => setBlueprint({...blueprint, gender: e.target.value})}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>
          </div>
          <button onClick={nextStep} className="w-full bg-slate-900 text-white p-5 rounded-2xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">What's your focus?</h2>
          <div className="grid gap-4">
            {(['Weight Loss', 'Muscle Gain', 'Functional Strength'] as const).map(goal => (
              <button
                key={goal}
                onClick={() => setBlueprint({...blueprint, goal})}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  blueprint.goal === goal ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white'
                }`}
              >
                <span className="font-bold text-lg">{goal}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <button onClick={prevStep} className="flex-1 bg-slate-200 p-5 rounded-2xl font-bold">Back</button>
            <button onClick={nextStep} className="flex-1 bg-slate-900 text-white p-5 rounded-2xl font-bold">Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Commitment & Safety</h2>
          <div className="space-y-4">
            <label className="block">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-700 font-medium">Workout Duration</span>
                <span className="font-bold text-indigo-600">{blueprint.availability.minsPerSession} mins</span>
              </div>
              <input 
                type="range" min="15" max="120" step="5"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                value={blueprint.availability.minsPerSession}
                onChange={e => setBlueprint({...blueprint, availability: {...blueprint.availability, minsPerSession: parseInt(e.target.value)}})}
              />
            </label>

            <label className="block">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-700 font-medium">Max Exercises per Session</span>
                <span className="font-bold text-indigo-600">{blueprint.maxExercises}</span>
              </div>
              <input 
                type="range" min="3" max="12" step="1"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                value={blueprint.maxExercises}
                onChange={e => setBlueprint({...blueprint, maxExercises: parseInt(e.target.value)})}
              />
            </label>
            
            <div className="pt-4">
              <span className="text-slate-700 font-medium mb-3 block">Any existing injuries or pain?</span>
              <div className="grid grid-cols-2 gap-2">
                {INJURY_OPTIONS.map(injury => (
                  <button
                    key={injury}
                    onClick={() => toggleInjury(injury)}
                    className={`p-3 rounded-xl border text-sm transition-all ${
                      blueprint.injuries.includes(injury) ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    {injury}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={prevStep} className="flex-1 bg-slate-200 p-5 rounded-2xl font-bold">Back</button>
            <button onClick={() => onComplete(blueprint)} className="flex-1 bg-indigo-600 text-white p-5 rounded-2xl font-bold shadow-lg">Finish</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingWizard;
