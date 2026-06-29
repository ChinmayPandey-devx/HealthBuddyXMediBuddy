import { useState } from 'react';
import Navigation from './components/Navigation';
import HomeDashboard from './screens/HomeDashboard';
import HealthSummary from './screens/HealthSummary';
import RiskAlert from './screens/RiskAlert';
import DoctorRecommendation from './screens/DoctorRecommendation';
import ChatAssistant from './screens/ChatAssistant';
import { useAppContext } from './AppContext';
import { Key, CheckCircle2 } from 'lucide-react';

export default function App() {
  const { apiKey, setApiKey, activeScreen, setActiveScreen } = useAppContext();
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState('');

  const handleSaveKey = (e) => {
    e.preventDefault();
    const val = keyInput.trim();
    if (!val.startsWith('sk-')) {
      setError('Invalid key format. API key must start with "sk-".');
      return;
    }
    setError('');
    setApiKey(val);
  };

  const renderScreen = () => {
    // Lock AI screens if no API key
    if (!apiKey && activeScreen !== 'home') {
      return (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-red-50 text-brand-red p-4 rounded-xl mb-4 border border-red-100">
            <Key className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-bold">API Key Required</h3>
            <p className="text-sm mt-1">Please enter your OpenAI API key at the top to access AI features.</p>
          </div>
          <button 
            onClick={() => setActiveScreen('home')}
            className="text-brand-blue font-semibold hover:underline"
          >
            Return to Home
          </button>
        </div>
      );
    }

    switch (activeScreen) {
      case 'home': return <HomeDashboard />;
      case 'summary': return <HealthSummary />;
      case 'alert': return <RiskAlert />;
      case 'doctor': return <DoctorRecommendation />;
      case 'chat': return <ChatAssistant />;
      default: return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center text-sm md:text-base">
      <div className="w-full max-w-[480px] bg-white min-h-screen shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* Top Status Bar */}
        <div className="bg-white border-b border-gray-100 p-3 sticky top-0 z-50 flex justify-between items-center shadow-sm shrink-0">
          <h1 className="font-bold text-gray-900 text-lg">HealthBuddy</h1>
          {apiKey ? (
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-brand-green font-medium bg-green-50 px-2 py-1 rounded-full border border-green-100">
                <CheckCircle2 className="w-3.5 h-3.5" /> GPT-4o Connected
              </span>
              <button 
                onClick={() => { setApiKey(''); setKeyInput(''); }} 
                className="text-gray-500 hover:text-gray-900 font-semibold transition-colors"
              >
                Change Key
              </button>
            </div>
          ) : (
            <span className="text-xs text-brand-red font-medium bg-red-50 px-2 py-1 rounded-full border border-red-100 flex items-center gap-1">
              <Key className="w-3.5 h-3.5" /> Not Connected
            </span>
          )}
        </div>

        {/* API Key Input Banner */}
        {!apiKey && (
          <div className="bg-amber-50 p-4 border-b border-amber-100 shrink-0">
            <p className="text-amber-800 text-xs font-semibold mb-2">
              Enter OpenAI GPT-4o API Key to unlock AI features. (Starts with "sk-")
            </p>
            <form onSubmit={handleSaveKey} className="flex gap-2">
              <input 
                type="password"
                value={keyInput}
                onChange={(e) => {
                  setKeyInput(e.target.value);
                  setError('');
                }}
                placeholder="sk-..."
                className="flex-1 px-3 py-2 bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-amber/50 text-sm"
              />
              <button 
                type="submit"
                className="bg-brand-amber hover:bg-amber-600 text-white font-bold px-4 rounded-lg transition-colors shadow-sm text-sm"
              >
                Save
              </button>
            </form>
            {error && <p className="text-brand-red text-xs mt-1.5 font-medium">{error}</p>}
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-20 relative bg-gray-50 h-full">
          {renderScreen()}
        </main>

        {/* Bottom Navigation */}
        <Navigation />

      </div>
    </div>
  );
}
