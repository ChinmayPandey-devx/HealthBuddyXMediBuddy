import { Heart, Moon, Activity, Droplets, AlertCircle, Sparkles, ChevronRight, BrainCircuit, Footprints } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { useEffect, useState } from 'react';

const CircularProgress = ({ value, max = 100 }) => {
  const [offset, setOffset] = useState(283);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = circumference - (value / max) * circumference;
    setTimeout(() => setOffset(progressOffset), 100);
  }, [value, max, circumference]);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="transform -rotate-90 w-32 h-32" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" className="stroke-gray-200" strokeWidth="8" fill="none" />
        <circle
          cx="50" cy="50" r="45"
          className="animate-stroke text-brand-amber stroke-current"
          strokeWidth="8" fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest">Score</span>
      </div>
    </div>
  );
};

export default function HomeDashboard() {
  const { user, setActiveScreen } = useAppContext();
  const { metrics } = user;

  const statCards = [
    { label: 'Heart Rate', value: '88 bpm', status: 'elevated', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Blood Pressure', value: '138/88', status: 'high', icon: Activity, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'SpO2', value: '97%', status: 'normal', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Sleep', value: '5.2 hrs', status: 'low', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Steps', value: '3,200', status: 'low', icon: Footprints, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Stress', value: 'High', status: 'high', icon: BrainCircuit, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const getStatusStyle = (status) => {
    switch(status) {
      case 'normal': return 'text-brand-green bg-green-50';
      case 'elevated': return 'text-amber-600 bg-amber-50';
      case 'high': return 'text-brand-red bg-red-50';
      case 'low': return 'text-indigo-600 bg-indigo-50';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="p-4 space-y-6">
      
      {/* Header & Health Score */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Hi {user.name},</h2>
          <p className="text-gray-500 text-sm">Your health score is fair.</p>
        </div>
        <CircularProgress value={metrics.healthScore} />
      </div>

      {/* Alert Banner */}
      <button 
        onClick={() => setActiveScreen('alert')}
        className="w-full bg-red-50 hover:bg-red-100 border border-red-200 p-4 rounded-2xl flex items-center gap-3 transition-colors text-left"
      >
        <div className="bg-red-100 p-2 rounded-full shrink-0">
          <AlertCircle className="w-5 h-5 text-brand-red" />
        </div>
        <div className="flex-1">
          <h4 className="text-red-900 font-bold text-sm">Blood pressure rising</h4>
          <p className="text-red-700 text-xs mt-0.5">3-day trend detected.</p>
        </div>
        <ChevronRight className="w-5 h-5 text-red-400" />
      </button>

      {/* AI Summary Preview */}
      <button 
        onClick={() => setActiveScreen('summary')}
        className="w-full bg-gradient-to-r from-brand-blue to-blue-500 text-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2.5 rounded-xl shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-sm">View Daily AI Summary</h4>
            <p className="text-blue-100 text-xs mt-0.5">Get personalized insights on your metrics.</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/70" />
      </button>

      {/* 6 Stat Cards Grid */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 text-sm">Today's Metrics</h3>
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${getStatusStyle(stat.status)}`}>
                  {stat.status}
                </span>
              </div>
              <p className="text-gray-500 text-xs font-medium mb-1">{stat.label}</p>
              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
