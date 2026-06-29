import { Heart, Moon, Activity, Droplets, AlertCircle, ChevronRight, MessageCircle } from 'lucide-react';
import { MOCK_USER } from '../data';
import { useEffect, useState } from 'react';

const CircularProgress = ({ value, max = 100 }) => {
  const [offset, setOffset] = useState(283);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = circumference - (value / max) * circumference;
    // Add a slight delay for animation
    setTimeout(() => setOffset(progressOffset), 100);
  }, [value, max, circumference]);

  let color = "text-brand-green";
  if (value < 50) color = "text-red-500";
  else if (value < 75) color = "text-amber-500";

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="transform -rotate-90 w-32 h-32" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          className="stroke-gray-200"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          className={`animate-stroke ${color} stroke-current`}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Score</span>
      </div>
    </div>
  );
};

export default function HomeDashboard({ setActiveScreen }) {
  const { metrics } = MOCK_USER;

  const statCards = [
    { label: 'Heart Rate', value: `${metrics.heartRate} bpm`, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Blood Pressure', value: metrics.bloodPressure, icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50', alert: true },
    { label: 'SpO2', value: `${metrics.spO2}%`, icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Sleep', value: `${metrics.sleep}h`, icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-8">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Hello, {MOCK_USER.name}</h2>
          <p className="text-gray-500 mt-1">Here is your daily health overview.</p>
        </div>
        <div className="hidden md:block">
          <CircularProgress value={metrics.healthScore} />
        </div>
      </div>

      {/* Mobile Health Score */}
      <div className="md:hidden bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">Overall Health</h3>
          <p className="text-gray-500 text-sm mt-1">Fair condition today.</p>
        </div>
        <CircularProgress value={metrics.healthScore} />
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-4">
        <div className="bg-red-100 p-2 rounded-full shrink-0">
          <AlertCircle className="w-5 h-5 text-red-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-red-900 font-semibold">Action Required: Elevated BP</h4>
          <p className="text-red-700 text-sm mt-1">Your blood pressure has been rising over the last 3 days.</p>
        </div>
        <button 
          onClick={() => setActiveScreen('alert')}
          className="text-sm font-semibold text-red-700 hover:text-red-800 bg-red-100/50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors shrink-0"
        >
          View Details
        </button>
      </div>

      {/* Key Metrics */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          Today's Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                {stat.alert && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ask HealthBuddy CTA */}
      <button 
        onClick={() => setActiveScreen('chat')}
        className="w-full bg-gradient-to-r from-brand-blue to-blue-500 text-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-lg">Ask HealthBuddy</h4>
            <p className="text-blue-100 text-sm">Have a question? Chat with your AI assistant.</p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
      </button>

    </div>
  );
}
