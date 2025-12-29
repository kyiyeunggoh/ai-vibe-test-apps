
import React, { useState } from 'react';
import { Exercise } from '../types';

interface WorkoutPlayerProps {
  exercises: Exercise[];
  onFinish: () => void;
  onSwap: (id: string) => void;
}

const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ exercises, onFinish, onSwap }) => {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const toggleComplete = (id: string) => {
    const next = new Set(completedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCompletedIds(next);
  };

  const isAllDone = completedIds.size === exercises.length;

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur py-3 px-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
        <div className="flex-1 h-3 bg-slate-100 rounded-full mr-4 overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-500" 
            style={{ width: `${(completedIds.size / exercises.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-slate-600 whitespace-nowrap">
          {completedIds.size} / {exercises.length} Done
        </span>
      </div>

      {/* Safety Disclaimer */}
      <div className="bg-slate-800 text-slate-300 p-4 rounded-2xl text-[11px] leading-relaxed shadow-lg">
        <p className="font-bold text-slate-100 mb-1 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Professional Video Form Guides
        </p>
        Safety is our priority. Instead of looping images, we provide links to expert video tutorials. Watching a professional demonstrate the full range of motion is the best way to prevent injury.
      </div>

      <div className="space-y-8">
        {exercises.map((ex, idx) => {
          const isDone = completedIds.has(ex.id);
          return (
            <div 
              key={ex.id} 
              className={`p-6 rounded-[2.5rem] border-2 transition-all duration-300 ${
                isDone ? 'bg-slate-100 border-slate-200 opacity-60' : 'bg-white border-slate-100 shadow-xl'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-4">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 mb-2">
                    {ex.category}
                  </span>
                  <h3 className={`text-2xl font-black leading-tight ${isDone ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {ex.name}
                  </h3>
                </div>
                <button 
                  onClick={() => toggleComplete(ex.id)}
                  className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                    isDone ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-300'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {!isDone && (
                <>
                  <div className="group relative rounded-3xl overflow-hidden mb-6 bg-slate-900 aspect-video flex items-center justify-center border-4 border-slate-50">
                    <img 
                      src={ex.thumbnailUrl} 
                      alt={ex.name} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${ex.name.replace(/\s/g, '')}/400/225`;
                      }}
                    />
                    <a 
                      href={ex.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 group-hover:scale-110 transition-transform"
                    >
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="text-white font-black text-xs uppercase tracking-widest drop-shadow-lg bg-black/40 px-3 py-1 rounded-full">Watch Form Guide</span>
                    </a>
                    <div className="absolute bottom-4 left-4 pointer-events-none">
                      <p className="text-white font-black text-lg drop-shadow-md">{ex.sets} Sets × {ex.reps}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 bg-indigo-50 p-3 rounded-2xl border border-indigo-100">
                        <p className="text-indigo-700 font-bold text-xs flex items-center gap-2">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                          </svg>
                          Weight: {ex.suggestedWeight}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Expert Form Cues</h4>
                      <ul className="space-y-3">
                        {ex.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 text-sm leading-snug">
                            <span className="mt-1 w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0"></span> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-slate-50">
                      <button 
                        onClick={() => onSwap(ex.id)}
                        className="flex-1 py-3 text-slate-400 text-[10px] font-black uppercase tracking-wider hover:text-indigo-500 transition-colors"
                      >
                        Swap Exercise
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-10 sticky bottom-4 z-50">
        <button 
          onClick={onFinish}
          disabled={!isAllDone}
          className={`w-full p-6 rounded-[2.5rem] font-black text-xl shadow-2xl transition-all active:scale-95 border-4 border-white ${
            isAllDone ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'
          }`}
        >
          {isAllDone ? 'Workout Complete! 🚀' : 'Finish Session'}
        </button>
      </div>
    </div>
  );
};

export default WorkoutPlayer;
