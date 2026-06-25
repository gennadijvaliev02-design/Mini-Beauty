import { useState } from 'react';
import {
  Store,
  Clock,
  Bell,
  Shield,
  CreditCard,
  Save,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

interface SettingSection {
  id: string;
  title: string;
  icon: typeof Store;
  items: {
    id: string;
    label: string;
    description: string;
    type: 'toggle' | 'input' | 'select';
    value: string | boolean;
    options?: string[];
  }[];
}

const settingsData: SettingSection[] = [
  {
    id: 'salon',
    title: 'Салон',
    icon: Store,
    items: [
      { id: 'name', label: 'Название салона', description: 'Отображается в Mini App', type: 'input', value: 'ServicePro Beauty' },
      { id: 'phone', label: 'Телефон', description: 'Контактный номер', type: 'input', value: '+7 (999) 123-45-67' },
      { id: 'address', label: 'Адрес', description: 'Адрес салона', type: 'input', value: 'ул. Пушкина, д. 10, Москва' },
    ],
  },
  {
    id: 'schedule',
    title: 'Расписание',
    icon: Clock,
    items: [
      { id: 'workStart', label: 'Начало рабочего дня', description: 'Время открытия', type: 'input', value: '09:00' },
      { id: 'workEnd', label: 'Конец рабочего дня', description: 'Время закрытия', type: 'input', value: '21:00' },
      { id: 'slotDuration', label: 'Длительность слота', description: 'Интервал записи', type: 'select', value: '30', options: ['15', '30', '45', '60'] },
    ],
  },
  {
    id: 'notifications',
    title: 'Уведомления',
    icon: Bell,
    items: [
      { id: 'smsReminder', label: 'SMS-напоминания', description: 'За 2 часа до записи', type: 'toggle', value: true },
      { id: 'newBooking', label: 'Новые записи', description: 'Уведомлять о новых бронированиях', type: 'toggle', value: true },
      { id: 'cancellation', label: 'Отмены', description: 'Уведомлять об отменах', type: 'toggle', value: true },
    ],
  },
  {
    id: 'payment',
    title: 'Оплата',
    icon: CreditCard,
    items: [
      { id: 'cryptoBot', label: 'CryptoBot', description: 'Приём оплаты через CryptoBot', type: 'toggle', value: true },
      { id: 'prepayment', label: 'Предоплата', description: 'Требовать предоплату', type: 'toggle', value: false },
      { id: 'prepayPercent', label: 'Процент предоплаты', description: 'Сколько % оплатить заранее', type: 'select', value: '50', options: ['10', '25', '50', '100'] },
    ],
  },
  {
    id: 'security',
    title: 'Безопасность',
    icon: Shield,
    items: [
      { id: 'pinCode', label: 'PIN-код', description: 'Защита входа в админку', type: 'toggle', value: true },
      { id: 'sessionTimeout', label: 'Таймаут сессии', description: 'Автовыход через (мин)', type: 'select', value: '30', options: ['15', '30', '60', '120'] },
    ],
  },
];

export default function SettingsAdminScreen() {
  const [settings, setSettings] = useState(settingsData);
  const [saved, setSaved] = useState(false);

  const updateValue = (sectionId: string, itemId: string, newValue: string | boolean) => {
    setSettings(prev =>
      prev.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, value: newValue } : item
              ),
            }
          : section
      )
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="animate-fadeIn max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Настройки</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Управление параметрами системы</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all btn-press ${
            saved
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25'
          }`}
        >
          {saved ? (
            <>
              <Save size={16} />
              Сохранено!
            </>
          ) : (
            <>
              <Save size={16} />
              Сохранить изменения
            </>
          )}
        </button>
      </div>

      {/* Settings Sections */}
      {settings.map((section) => {
        const Icon = section.icon;
        return (
          <div
            key={section.id}
            className="rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] overflow-hidden"
          >
            {/* Section Header */}
            <div className="px-5 py-4 border-b border-white/[0.04] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Icon size={18} className="text-emerald-400" />
              </div>
              <h3 className="text-base font-semibold">{section.title}</h3>
            </div>

            {/* Section Items */}
            <div className="divide-y divide-white/[0.02]">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="px-5 py-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.description}</p>
                  </div>

                  {item.type === 'toggle' && (
                    <button
                      onClick={() => updateValue(section.id, item.id, !item.value)}
                      className="flex-shrink-0"
                    >
                      {item.value ? (
                        <ToggleRight size={28} className="text-emerald-400" />
                      ) : (
                        <ToggleLeft size={28} className="text-[var(--surface-3)]" />
                      )}
                    </button>
                  )}

                  {item.type === 'input' && (
                    <input
                      type="text"
                      value={item.value as string}
                      onChange={(e) => updateValue(section.id, item.id, e.target.value)}
                      className="flex-shrink-0 w-48 px-3 py-2 rounded-lg bg-[var(--surface-2)] border border-white/[0.06] text-sm text-right focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  )}

                  {item.type === 'select' && item.options && (
                    <select
                      value={item.value as string}
                      onChange={(e) => updateValue(section.id, item.id, e.target.value)}
                      className="flex-shrink-0 px-3 py-2 rounded-lg bg-[var(--surface-2)] border border-white/[0.06] text-sm focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none"
                    >
                      {item.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}{item.id === 'prepayPercent' ? '%' : item.id === 'slotDuration' ? ' мин' : ' мин'}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
