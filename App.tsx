
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import OnboardingWizard from './components/OnboardingWizard';
import VibeCheck from './components/VibeCheck';
import BodyFocusSelector from './components/BodyFocusSelector';
import EquipmentFilter from './components/EquipmentFilter';
import WorkoutPlayer from './components/WorkoutPlayer';
import { AppView, UserBlueprint, UserVibe, Exercise, BodyFocus } from './types';
import { VIBE_CONFIG } from './constants';
import { generateWorkout } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.ONBOARDING);
  const [blueprint, setBlueprint] = useState<UserBlueprint | null>(null);
  const [vibe, setVibe] = useState<UserVibe | null>(null);
  const [bodyFocus, setBodyFocus] = useState<BodyFocus | null>(null);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [workout, setWorkout] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState('');

  // Persist Onboarding
  useEffect(() => {
    const saved = localStorage.getItem('jimbro_blueprint');
    if (saved) {
      setBlueprint(JSON.parse(saved));
      setView(AppView.VIBE_CHECK);
    }
  }, []);

  const handleOnboardingComplete = (data: UserBlueprint) => {
    setBlueprint(data);
    localStorage.setItem('jimbro_blueprint', JSON.stringify(data));
    setView(AppView.VIBE_CHECK);
  };

  const handleVibeSelect = (v: UserVibe) => {
    setVibe(v);
    setQuote(VIBE_CONFIG[v].quote);
    setView(AppView.BODY_FOCUS);
  };

  const handleFocusSelect = (f: BodyFocus) => {
    setBodyFocus(f);
    setView(AppView.EQUIPMENT);
  };

  const handleEquipmentComplete = async (eq: string[]) => {
    setEquipment(eq);
    setLoading(true);
    try {
      if (blueprint && vibe && bodyFocus) {
        const generated = await generateWorkout(blueprint, vibe, eq, bodyFocus);
        setWorkout(generated);
        setView(AppView.WORKOUT);
      }
    } catch (err) {
      alert("Something went wrong generating your workout. Let's try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = async (id: string) => {
    // Note: A true swap would re-call the API, but for responsiveness 
    // we use a placeholder logic here. Ideally, this should trigger a specific swap API call.
    const newWorkout = workout.map(ex => {
      if (ex.id === id) {
        return {
          ...ex,
          name: `${ex.name} (Alternative)`,
          thumbnailUrl: `https://picsum.photos/seed/${Math.random()}/400/225`,
          // Keep the youtubeUrl for form safety, or in a real app, regenerate this specific exercise.
        };
      }
      return ex;
    });
    setWorkout(newWorkout);
  };

  const handleWorkoutFinish = () => {
    alert("Incredible work! Session logged.");
    setView(AppView.VIBE_CHECK);
    setVibe(null);
    setBodyFocus(null);
    setWorkout([]);
  };

  const getBgColor = () => {
    if (!vibe || view === AppView.ONBOARDING) return 'bg-slate-50';
    return VIBE_CONFIG[vibe].color;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-10 text-center">
        <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-3xl font-black text-white mb-4">Building Your Session...</h2>
        <p className="text-slate-400 italic">"Good things come to those who show up."</p>
      </div>
    );
  }

  return (
    <Layout 
      headerTitle={view === AppView.WORKOUT ? 'Active Session' : 'JimBro'} 
      bgColor={getBgColor()}
      onBack={
        view === AppView.BODY_FOCUS ? () => setView(AppView.VIBE_CHECK) :
        view === AppView.EQUIPMENT ? () => setView(AppView.BODY_FOCUS) :
        undefined
      }
    >
      {view === AppView.ONBOARDING && <OnboardingWizard onComplete={handleOnboardingComplete} />}
      
      {view === AppView.VIBE_CHECK && <VibeCheck onSelect={handleVibeSelect} />}

      {view === AppView.BODY_FOCUS && <BodyFocusSelector onSelect={handleFocusSelect} />}

      {view === AppView.EQUIPMENT && (
        <div className="space-y-6">
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl text-white border border-white/20">
            <div className="flex justify-between items-start">
              <span className="text-3xl mb-2 block">{vibe ? VIBE_CONFIG[vibe].emoji : ''}</span>
              <span className="bg-white/30 px-3 py-1 rounded-full text-[10px] font-black uppercase">{bodyFocus}</span>
            </div>
            <p className="text-lg font-bold leading-tight">{quote}</p>
          </div>
          <EquipmentFilter onComplete={handleEquipmentComplete} onBack={() => setView(AppView.BODY_FOCUS)} />
        </div>
      )}

      {view === AppView.WORKOUT && (
        <WorkoutPlayer 
          exercises={workout} 
          onFinish={handleWorkoutFinish}
          onSwap={handleSwap}
        />
      )}
    </Layout>
  );
};

export default App;
