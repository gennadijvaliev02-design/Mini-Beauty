import { Scissors, Calendar } from 'lucide-react';
import type { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const tabs: { screen: Screen; label: string; icon: typeof Scissors }[] = [
    { screen: 'services', label: 'Services', icon: Scissors },
    { screen: 'myAppointments', label: 'My appointments', icon: Calendar },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 glass-strong border-t border-white/[0.06]">
      <div className="flex items-center justify-around py-2 safe-bottom">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.screen;
          const Icon = tab.icon;
          return (
            <button
              key={tab.screen}
              onClick={() => onNavigate(tab.screen)}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200 btn-press ${
                isActive
                  ? 'text-emerald-400'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.5}
                className={isActive ? 'drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]' : ''}
              />
              <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-8 h-0.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
