import { Home, Activity, AlertTriangle, Stethoscope, MessageCircle } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function Navigation() {
  const { activeScreen, setActiveScreen, apiKey } = useAppContext();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'summary', icon: Activity, label: 'Summary' },
    { id: 'alert', icon: AlertTriangle, label: 'Alert' },
    { id: 'doctor', icon: Stethoscope, label: 'Doctor' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = activeScreen === item.id;
        const isDisabled = !apiKey && item.id !== 'home';

        return (
          <button
            key={item.id}
            onClick={() => { if (!isDisabled) setActiveScreen(item.id); }}
            disabled={isDisabled}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${
              isActive 
                ? 'text-brand-blue scale-110' 
                : isDisabled 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-blue-50' : ''}`} />
            <span className={`text-[10px] font-semibold ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
