import { useState, useCallback } from 'react';
import {
  LayoutDashboard,
  Scissors,
  Users,
  CalendarDays,
  ClipboardList,
  BarChart3,
  Settings,
  Sparkles,
  Menu,
  X,
  Bell,
} from 'lucide-react';
import DashboardScreen from './screens/DashboardScreen';
import ServicesAdminScreen from './screens/ServicesAdminScreen';
import MastersAdminScreen from './screens/MastersAdminScreen';
import ScheduleAdminScreen from './screens/ScheduleAdminScreen';
import AppointmentsAdminScreen from './screens/AppointmentsAdminScreen';
import SettingsAdminScreen from './screens/SettingsAdminScreen';

export type AdminScreen = 'dashboard' | 'services' | 'masters' | 'schedule' | 'appointments' | 'statistics' | 'settings';

const navItems: {
  screen: AdminScreen;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { screen: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
  { screen: 'services', label: 'Услуги', icon: Scissors },
  { screen: 'masters', label: 'Мастера', icon: Users },
  { screen: 'schedule', label: 'Расписание', icon: CalendarDays },
  { screen: 'appointments', label: 'Записи', icon: ClipboardList },
  { screen: 'statistics', label: 'Статистика', icon: BarChart3 },
  { screen: 'settings', label: 'Настройки', icon: Settings },
];

export default function AdminApp() {
  const [currentScreen, setCurrentScreen] = useState<AdminScreen>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useCallback((screen: AdminScreen) => {
    setCurrentScreen(screen);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'services':
        return <ServicesAdminScreen />;
      case 'masters':
        return <MastersAdminScreen />;
      case 'schedule':
        return <ScheduleAdminScreen />;
      case 'appointments':
        return <AppointmentsAdminScreen />;
      case 'statistics':
        return <DashboardScreen />;
      case 'settings':
        return <SettingsAdminScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  const currentLabel = navItems.find(n => n.screen === currentScreen)?.label || 'Дашборд';

  return (
    <div className="min-h-screen bg-[var(--surface-0)] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[260px] bg-[var(--surface-1)] border-r border-white/[0.04] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold">ServicePro</h1>
              <p className="text-[10px] text-[var(--text-muted)] -mt-0.5">Администрирование</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1">
            <X size={20} className="text-[var(--text-muted)]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            const Icon = item.icon;
            return (
              <button
                key={item.screen}
                onClick={() => navigate(item.screen)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                {item.label}
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/[0.04]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-2)]">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-emerald-400">А</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Администратор</p>
              <p className="text-[10px] text-[var(--text-muted)]">admin@servicepro.ru</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 glass-strong border-b border-white/[0.04]">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-9 h-9 rounded-lg bg-[var(--surface-2)] flex items-center justify-center"
              >
                <Menu size={18} />
              </button>
              <h2 className="text-lg font-bold">{currentLabel}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-9 h-9 rounded-lg bg-[var(--surface-2)] flex items-center justify-center hover:bg-[var(--surface-3)] transition-colors">
                <Bell size={18} className="text-[var(--text-secondary)]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
              </button>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-emerald-400">Онлайн</span>
              </div>
            </div>
          </div>
        </header>

        {/* Screen Content */}
        <div className="p-5 lg:p-8">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
}
