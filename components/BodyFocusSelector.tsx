
import React from 'react';
import { BodyFocus } from '../types';

interface BodyFocusSelectorProps {
  onSelect: (focus: BodyFocus) => void;
}

const BodyFocusSelector: React.FC<BodyFocusSelectorProps> = ({ onSelect }) => {
  const options: { label: BodyFocus; emoji: string; desc: string }[] = [
    { label: 'Full Body', emoji: '🌟', desc: 'Balanced head-to-toe session' },
    { label: 'Upper Body', emoji: '💪', desc: 'Chest, back, shoulders, and arms' },
    { label: 'Lower Body', emoji: '🦵', desc: 'Glutes, quads, and hamstrings' },
    { label: 'Core', emoji: '🧱', desc: 'Abs, obliques, and stability' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn pt-6">
      <div className="text-center">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Focus area?</h2>
        <p className="text-slate-500 mt-2">What are we hitting today?</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {options.map(opt => (
          <button
            key={opt.label}
            onClick={() => onSelect(opt.label)}
            className="group bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-indigo-500 hover:shadow-lg transition-all flex items-center gap-5 text-left active:scale-[0.98]"
          >
            <span className="text-4xl">{opt.emoji}</span>
            <div>
              <h3 className="text-xl font-bold text-slate-800">{opt.label}</h3>
              <p className="text-slate-400 text-sm">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BodyFocusSelector;
