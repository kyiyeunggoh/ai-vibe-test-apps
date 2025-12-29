
import React, { useState, useRef } from 'react';
import { EQUIPMENT_PRESETS } from '../constants';
import { scanRoomForEquipment } from '../services/geminiService';

interface EquipmentFilterProps {
  onComplete: (equipment: string[]) => void;
  onBack: () => void;
}

const EquipmentFilter: React.FC<EquipmentFilterProps> = ({ onComplete, onBack }) => {
  const [selected, setSelected] = useState<string[]>(['bodyweight']);
  const [customItem, setCustomItem] = useState('');
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleItem = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (customItem.trim()) {
      setSelected(prev => [...prev, customItem.trim()]);
      setCustomItem('');
    }
  };

  const handleScanClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const items = await scanRoomForEquipment(base64);
        setSelected(prev => Array.from(new Set([...prev, ...items])));
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      alert("Failed to scan. Try manual selection.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">What's around you?</h2>
        <button 
          onClick={handleScanClick}
          disabled={scanning}
          className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold text-sm hover:bg-indigo-200 transition-colors disabled:opacity-50"
        >
          {scanning ? (
            <span className="flex items-center gap-2">
               <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
               Scanning...
            </span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              AI Room Scan
            </>
          )}
        </button>
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {EQUIPMENT_PRESETS.map(item => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${
              selected.includes(item.id) ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 bg-white'
            }`}
          >
            <span className="text-4xl">{item.icon}</span>
            <span className="font-bold text-slate-700">{item.name}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Custom Items (e.g. Backpack, Water Jug)</label>
        <form onSubmit={handleCustomAdd} className="flex gap-2">
          <input 
            type="text"
            className="flex-1 p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none transition-all"
            placeholder="Add custom gear..."
            value={customItem}
            onChange={e => setCustomItem(e.target.value)}
          />
          <button type="submit" className="bg-slate-800 text-white px-6 rounded-2xl font-bold">+</button>
        </form>
        <div className="flex flex-wrap gap-2">
          {selected.filter(id => !EQUIPMENT_PRESETS.find(p => p.id === id)).map(id => (
            <span key={id} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              {id}
              <button onClick={() => toggleItem(id)} className="text-slate-400 hover:text-red-500">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <button 
          onClick={() => onComplete(selected)} 
          disabled={selected.length === 0}
          className="w-full bg-indigo-600 text-white p-6 rounded-[2rem] font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
        >
          Generate Workout
        </button>
      </div>
    </div>
  );
};

export default EquipmentFilter;
