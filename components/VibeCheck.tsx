
import React from 'react';
import { UserVibe } from '../types';
import { VIBE_CONFIG } from '../constants';

interface VibeCheckProps {
  onSelect: (vibe: UserVibe) => void;
}

const VibeCheck: React.FC<VibeCheckProps> = ({ onSelect }) => {
  const options: { label: string; value: UserVibe; emoji: string; desc: string }[] = [
    { label: 'Low', value: UserVibe.LOW, emoji: '😴', desc: 'Just showing up' },
    { label: 'Steady', value: UserVibe.STEADY, emoji: '🙂', desc: 'Feeling balanced' },
    { label: 'Strong', value: UserVibe.STRONG, emoji: '💪', desc: 'Ready to push' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn pt-10">
      <div className="text-center">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">How's the vibe today?</h2>
        <p className="text-slate-500 mt-3 text-lg">We'll adjust your session based on your energy.</p>
      </div>

      <div className="grid gap-4">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="group relative overflow-hidden bg-white p-8 rounded-[2rem] border-2 border-slate-100 hover:border-slate-300 hover:shadow-xl transition-all flex items-center gap-6 text-left active:scale-[0.98]"
          >
            <span className="text-6xl group-hover:scale-110 transition-transform">{opt.emoji}</span>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{opt.label}</h3>
              <p className="text-slate-500">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VibeCheck;
