import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HomeDashboard from './screens/HomeDashboard';
import HealthSummary from './screens/HealthSummary';
import RiskAlert from './screens/RiskAlert';
import DoctorRecommendation from './screens/DoctorRecommendation';
import ChatAssistant from './screens/ChatAssistant';
import { getApiKey, setApiKey } from './api';
import { Key } from 'lucide-react';

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);

  useEffect(() => {
    if (getApiKey()) {
      setIsKeySet(true);
    }
  }, []);

  const saveKey = (e) => {
    e.preventDefault();
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setIsKeySet(true);
    }
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home': return <HomeDashboard setActiveScreen={setActiveScreen} />;
      case 'summary': return <HealthSummary />;
      case 'alert': return <RiskAlert setActiveScreen={setActiveScreen} />;
      case 'doctor': return <DoctorRecommendation />;
      case 'chat': return <ChatAssistant />;
      default: return <HomeDashboard setActiveScreen={setActiveScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar / Bottom Nav */}
      <Navigation activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        {!isKeySet && (
          <div className="max-w-4xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 shadow-sm">
            <h3 className="font-bold text-amber-900 flex items-center gap-2 mb-2">
              <Key className="w-5 h-5" />
              Anthropic API Key Required
            </h3>
            <p className="text-amber-800 text-sm mb-4">
              To power the AI features of HealthBuddy, please enter your Claude API key. 
              This is stored locally in your browser and used only for direct API calls.
            </p>
            <form onSubmit={saveKey} className="flex gap-2">
              <input 
                type="password" 
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="sk-ant-api03-..." 
                className="flex-1 max-w-sm px-4 py-2 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
              <button 
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                Save Key
              </button>
            </form>
          </div>
        )}

        <div className="w-full h-full relative">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
}

export default App;
