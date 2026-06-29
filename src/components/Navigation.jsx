import { Home, Activity, AlertTriangle, Stethoscope, MessageCircle } from 'lucide-react';

export default function Navigation({ activeScreen, setActiveScreen }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'summary', icon: Activity, label: 'Summary' },
    { id: 'alert', icon: AlertTriangle, label: 'Alert' },
    { id: 'doctor', icon: Stethoscope, label: 'Doctor' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveScreen(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeScreen === item.id ? 'text-brand-blue' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 py-8 px-4 z-50">
        <div className="flex items-center gap-2 px-4 mb-8">
          <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">HealthBuddy</h1>
        </div>
        
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeScreen === item.id 
                  ? 'bg-blue-50 text-brand-blue font-semibold shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeScreen === item.id ? 'text-brand-blue' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
