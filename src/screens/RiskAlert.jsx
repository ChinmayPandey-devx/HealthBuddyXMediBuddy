import { AlertTriangle, Info, Calendar, ArrowRight, Activity, Leaf, ChevronRight } from 'lucide-react';
import { useAppContext } from '../AppContext';
import Typewriter from '../components/Typewriter';
import { HARDCODED_RESPONSES, AYURVEDIC_REMEDIES } from '../data';

export default function RiskAlert() {
  const { setActiveScreen, user, openMediBuddy } = useAppContext();

  const sections = [
    { icon: Info },
    { icon: AlertTriangle },
    { icon: Calendar },
  ];

  return (
    <div className="p-4 pb-24">
      
      <div className="mb-4">
        <button onClick={() => setActiveScreen('home')} className="text-brand-blue text-sm font-semibold hover:underline">
          &larr; Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-red-200 mb-6 overflow-hidden">
        <div className="bg-red-50 p-4 border-b border-red-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-red" />
            <h2 className="text-lg font-bold text-red-900">Elevated BP</h2>
          </div>
          <span className="bg-brand-red text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
            High Severity
          </span>
        </div>
        
        <div className="p-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">3-Day Trend</h4>
          <div className="flex justify-between items-center text-sm font-semibold text-gray-800 bg-gray-50 p-3 rounded-xl border border-gray-100">
            {user.trends.bloodPressure.map((trend, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-[10px] text-gray-400 font-medium">{trend.day}</span>
                <span className="flex items-center gap-1">
                  {trend.value}
                  {idx > 0 && <span className="text-brand-red text-xs">&uarr;</span>}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-4">
            {HARDCODED_RESPONSES.alert.map((section, i) => {
              const SectionUI = sections[i];
              return (
                <div key={i} className="flex gap-3">
                  <div className="mt-0.5 bg-blue-50 p-1.5 rounded-md shrink-0 h-fit">
                    <SectionUI.icon className="w-4 h-4 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">{section.title}</h4>
                    <Typewriter text={section.text} delay={1200 + (i * 200)} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ayurvedic Remedies Section */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-brand-green" />
          Natural remedies you can try
        </h3>
        <div className="space-y-3">
          {AYURVEDIC_REMEDIES.map((remedy, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-3">
                <div className="text-3xl shrink-0 bg-gray-50 p-2 rounded-xl border border-gray-100">{remedy.emoji}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm">{remedy.name}</h4>
                  <p className="text-xs font-semibold text-brand-green mt-0.5 mb-1">{remedy.helps}</p>
                  <p className="text-gray-600 text-[11px] leading-relaxed mb-3">{remedy.how}</p>
                  <button 
                    onClick={() => openMediBuddy(remedy)}
                    className="flex items-center justify-between w-full bg-brand-green/10 hover:bg-brand-green/20 text-brand-green px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                  >
                    <span>Buy on MediBuddy</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={() => openMediBuddy()}
        className="w-full bg-gray-900 hover:bg-black text-white p-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-md"
      >
        Book Doctor Consultation
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
