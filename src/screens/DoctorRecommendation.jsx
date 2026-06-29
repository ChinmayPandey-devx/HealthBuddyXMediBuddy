import { useState, useEffect } from 'react';
import { Stethoscope, ClipboardList, CheckCircle2, Video, Loader2 } from 'lucide-react';
import { useAppContext } from '../AppContext';

const Skeleton = () => (
  <div className="space-y-3 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-full"></div>
    <div className="h-3 bg-gray-200 rounded w-full"></div>
    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
  </div>
);

export default function DoctorRecommendation() {
  const { callOpenAI } = useAppContext();
  const [prepSummary, setPrepSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const fetchPrep = async () => {
      try {
        const prompt = "Generate a pre-consultation summary for Raj — exactly 4 short bullet points: 1. Main concern, 2. Key data points, 3. Two questions to ask the doctor, 4. Urgency level. Do not use markdown headers, return plain text separated by newlines.";
        const response = await callOpenAI(prompt);
        const parts = response.split(/\n+/).filter(p => p.trim().length > 0);
        setPrepSummary(parts);
      } catch (err) {
        setError(err.message || "Failed to load preparation details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrep();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConsent(false);
      alert("Mock: Connection to MediBuddy simulated.");
    }, 2000);
  };

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-3">
          <Stethoscope className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Consult a Doctor</h2>
        <p className="text-gray-500 text-xs mt-1">Recommended within 48 hours.</p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-5">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
          <ClipboardList className="w-4 h-4 text-brand-blue" />
          Pre-Consultation Summary
        </h3>
        
        {loading ? (
          <Skeleton />
        ) : error ? (
          <p className="text-brand-red text-sm bg-red-50 p-3 rounded-lg">{error}</p>
        ) : (
          <div className="space-y-3 text-sm text-gray-700">
            {prepSummary && prepSummary.map((item, i) => (
              <div key={i} className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <p className="leading-tight">{item.replace(/^[-*•]\s*/, '')}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <label className="flex items-start gap-3 cursor-pointer select-none group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input 
              type="checkbox" 
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="peer appearance-none w-5 h-5 rounded border-2 border-gray-300 checked:bg-brand-blue checked:border-brand-blue transition-colors cursor-pointer"
            />
            <CheckCircle2 className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
          <span className="text-xs text-gray-600 leading-snug group-hover:text-gray-800 transition-colors">
            I agree to share my health metrics and AI summary securely for this consultation.
          </span>
        </label>
      </div>

      <button 
        disabled={!consent || connecting}
        onClick={handleConnect}
        className={`w-full p-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 text-sm
          ${consent 
            ? 'bg-[#1D9E75] hover:bg-[#158562] shadow-md hover:shadow-lg' 
            : 'bg-gray-300 cursor-not-allowed shadow-none'}`}
      >
        {connecting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Video className="w-5 h-5" />
            Connect via MediBuddy
          </>
        )}
      </button>
    </div>
  );
}
