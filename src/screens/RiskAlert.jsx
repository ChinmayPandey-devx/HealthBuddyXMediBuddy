import { useState, useEffect } from 'react';
import { AlertTriangle, Info, Calendar, ArrowRight } from 'lucide-react';
import { callClaude } from '../api';

const Skeleton = () => (
  <div className="space-y-4 animate-pulse mt-6">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

export default function RiskAlert({ setActiveScreen }) {
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExplanation = async () => {
      try {
        const prompt = "The user has an alert: 'High Blood Pressure trend detected (135/86 → 137/87 → 138/88)'. Explain what this means, why it matters, and what the user should do today, in 2-3 sentences each. Use plain, non-alarming language. Do not use markdown headers or bolding. Separate the 3 sections with double newlines.";
        
        const response = await callClaude(prompt);
        const parts = response.split(/\n+/).filter(p => p.trim().length > 0).slice(0, 3);
        setExplanation(parts);
      } catch (err) {
        setError(err.message || "Failed to load explanation.");
      } finally {
        setLoading(false);
      }
    };

    fetchExplanation();
  }, []);

  const sections = [
    { title: "What this means", icon: Info },
    { title: "Why it matters", icon: AlertTriangle },
    { title: "What you should do", icon: Calendar },
  ];

  return (
    <div className="max-w-2xl mx-auto pb-24 md:pb-8">
      
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => setActiveScreen('home')} className="text-brand-blue font-medium hover:underline">
          &larr; Back
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-200 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Elevated Blood Pressure
          </h2>
          <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            High Severity
          </span>
        </div>
        <p className="text-gray-600 font-medium">Trend: 135/86 → 137/87 → 138/88 (Rising)</p>
        
        <div className="mt-6 border-t border-gray-100 pt-6">
          {loading ? (
            <Skeleton />
          ) : error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : (
            <div className="space-y-6">
              {explanation.map((text, i) => {
                const SectionIcon = sections[i]?.icon || Info;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 bg-blue-50 p-2 rounded-lg shrink-0">
                      <SectionIcon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{sections[i]?.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={() => setActiveScreen('doctor')}
        className="w-full bg-gray-900 hover:bg-black text-white p-4 rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2 group"
      >
        Book Doctor Consultation
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
