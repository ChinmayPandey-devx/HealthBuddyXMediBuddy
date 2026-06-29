import { useState, useEffect } from 'react';
import { AlertTriangle, Info, Calendar, ArrowRight, Activity } from 'lucide-react';
import { useAppContext } from '../AppContext';

const Skeleton = () => (
  <div className="space-y-4 animate-pulse mt-4">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-3 bg-gray-200 rounded w-full"></div>
    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
  </div>
);

export default function RiskAlert() {
  const { callOpenAI, setActiveScreen, user } = useAppContext();
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExplanation = async () => {
      try {
        const prompt = "Explain what 138/88 mmHg means for Raj, why rising BP + poor sleep + high stress is concerning, and what he should do today. Exactly 3 sections, exactly 2 sentences each. Do not use markdown headers, separate paragraphs with double newlines.";
        const response = await callOpenAI(prompt);
        const parts = response.split(/\n+/).filter(p => p.trim().length > 0).slice(0, 3);
        setExplanation(parts);
      } catch (err) {
        setError(err.message || "Failed to load alert details.");
      } finally {
        setLoading(false);
      }
    };

    fetchExplanation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sections = [
    { title: "What this means", icon: Info },
    { title: "Why it matters", icon: AlertTriangle },
    { title: "What you should do", icon: Calendar },
  ];

  return (
    <div className="p-4">
      
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
                <span>{trend.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-5">
            {loading ? (
              <Skeleton />
            ) : error ? (
              <p className="text-brand-red text-sm bg-red-50 p-3 rounded-lg">{error}</p>
            ) : (
              <div className="space-y-4">
                {explanation && explanation.map((text, i) => {
                  const Section = sections[i] || sections[0];
                  return (
                    <div key={i} className="flex gap-3">
                      <div className="mt-0.5 bg-blue-50 p-1.5 rounded-md shrink-0 h-fit">
                        <Section.icon className="w-4 h-4 text-brand-blue" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-0.5">{Section.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{text.replace(/^(what this means|why it matters|what you should do):/i, '').trim()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <button 
        onClick={() => setActiveScreen('doctor')}
        className="w-full bg-gray-900 hover:bg-black text-white p-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-md"
      >
        Book Doctor Consultation
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
