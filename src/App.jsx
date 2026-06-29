import Navigation from './components/Navigation';
import HomeDashboard from './screens/HomeDashboard';
import HealthSummary from './screens/HealthSummary';
import RiskAlert from './screens/RiskAlert';
import DoctorRecommendation from './screens/DoctorRecommendation';
import ChatAssistant from './screens/ChatAssistant';
import MediBuddyModal from './components/MediBuddyModal';
import { useAppContext } from './AppContext';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const { activeScreen } = useAppContext();

  const renderScreen = () => {
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
        <div className="bg-white border-b border-gray-100 p-3 sticky top-0 z-40 flex justify-between items-center shadow-sm shrink-0">
          <h1 className="font-bold text-gray-900 text-lg">HealthBuddy</h1>
          <span className="flex items-center gap-1 text-gray-500 font-medium bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-green" /> Data Secured
          </span>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-20 relative bg-gray-50 h-full">
          {renderScreen()}
        </main>

        {/* Bottom Navigation */}
        <Navigation />

        {/* Modals */}
        <MediBuddyModal />
      </div>
    </div>
  );
}
