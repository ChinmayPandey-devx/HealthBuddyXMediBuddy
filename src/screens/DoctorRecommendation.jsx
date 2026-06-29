import { useState, useEffect } from 'react';
import { Stethoscope, ClipboardList, CheckCircle2, Video } from 'lucide-react';
import { callClaude } from '../api';

const Skeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="h-3 bg-gray-200 rounded w-full"></div>
    <div className="h-3 bg-gray-200 rounded w-full"></div>
    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
  </div>
);

export default function DoctorRecommendation() {
  const [prepSummary, setPrepSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrep = async () => {
      try {
        const prompt = "The user is about to consult a doctor for elevated blood pressure (138/88 rising trend). Generate a brief pre-consultation prep sheet. Include exactly 3 points separated by newlines: 1. Urgency level (Low/Medium/High) with a brief reason. 2. What data to share with the doctor. 3. Two questions the user should ask the doctor. Do not use markdown formatting, just plain text.";
        
        const response = await callClaude(prompt);
        const parts = response.split(/\n+/).filter(p => p.trim().length > 0).slice(0, 3);
        setPrepSummary(parts);
      } catch (err) {
        setError(err.message || "Failed to load preparation details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrep();
  }, []);

  return (
    <div className="max-w-2xl mx-auto pb-24 md:pb-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
          <Stethoscope className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Doctor Consultation</h2>
        <p className="text-gray-500 mt-2">Get professional medical advice for your elevated BP.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-brand-blue" />
          Pre-Consultation Prep
        </h3>
        
        {loading ? (
          <Skeleton />
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : (
          <div className="space-y-4 text-sm text-gray-700">
            {prepSummary.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input 
            type="checkbox" 
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
          />
          <span className="text-sm text-gray-600">
            I agree to share my health data securely with the doctor for this consultation.
          </span>
        </label>
      </div>

      <button 
        disabled={!consent}
        className={`w-full p-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
          ${consent 
            ? 'bg-[#1D9E75] hover:bg-[#158562]' 
            : 'bg-gray-300 cursor-not-allowed shadow-none'}`}
      >
        <Video className="w-5 h-5" />
        Connect via MediBuddy
      </button>
    </div>
  );
}
