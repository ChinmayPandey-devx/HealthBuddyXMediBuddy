import { useState } from 'react';
import { Stethoscope, ClipboardList, CheckCircle2, Video } from 'lucide-react';
import { useAppContext } from '../AppContext';
import Typewriter from '../components/Typewriter';
import { HARDCODED_RESPONSES } from '../data';

export default function DoctorRecommendation() {
  const { openMediBuddy } = useAppContext();
  const [consent, setConsent] = useState(false);

  const sections = [
    { title: "Main concern", text: HARDCODED_RESPONSES.doctor[0] },
    { title: "Key data to share with your doctor", text: HARDCODED_RESPONSES.doctor[1] },
    { title: "Questions to ask your doctor", text: HARDCODED_RESPONSES.doctor[2] },
    { title: "Urgency", text: HARDCODED_RESPONSES.doctor[3] },
  ];

  return (
    <div className="p-4 pb-24">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-3">
          <Stethoscope className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Consult a Doctor</h2>
        <p className="text-gray-500 text-xs mt-1">Recommended within 48 hours.</p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-5">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm border-b border-gray-100 pb-3">
          <ClipboardList className="w-4 h-4 text-brand-blue" />
          Pre-Consultation Summary
        </h3>
        
        <div className="space-y-4">
          {sections.map((sec, i) => (
            <div key={i}>
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-1">{sec.title}</h4>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-gray-700">
                <Typewriter text={sec.text} delay={1200 + (i * 300)} />
              </div>
            </div>
          ))}
        </div>
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
        disabled={!consent}
        onClick={() => openMediBuddy()}
        className={`w-full p-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 text-sm
          ${consent 
            ? 'bg-[#1D9E75] hover:bg-[#158562] shadow-md hover:shadow-lg' 
            : 'bg-gray-300 cursor-not-allowed shadow-none'}`}
      >
        <Video className="w-5 h-5" />
        Connect via MediBuddy
      </button>
    </div>
  );
}
