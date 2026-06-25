import { useState, useMemo } from 'react';
import { ArrowLeft, Clock, CalendarDays, Star } from 'lucide-react';
import { weekDays, generateTimeSlots } from '@/data/mockData';
import type { Service, Master } from '@/types';

interface TimeSelectionScreenProps {
  service: Service;
  master: Master;
  onBack: () => void;
  onConfirm: (date: string, time: string) => void;
}

export default function TimeSelectionScreen({ service, master, onBack, onConfirm }: TimeSelectionScreenProps) {
  const [selectedDay, setSelectedDay] = useState(2); // Today (Wednesday)
  const [selectedTime, setSelectedTime] = useState<string>('');

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const selectedDate = weekDays[selectedDay].date;

  const handleConfirm = () => {
    if (selectedTime) {
      onConfirm(selectedDate, selectedTime);
    }
  };

  return (
    <div className="animate-slideInRight pb-28">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-40 glass-strong safe-top">
        <div className="px-5 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[var(--surface-3)] flex items-center justify-center btn-press flex-shrink-0"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold truncate">{service.name}</h1>
            <p className="text-xs text-[var(--text-muted)]">{master.name}</p>
          </div>
        </div>
      </header>

      {/* ===== MASTER INFO CARD ===== */}
      <div className="px-5 pt-4">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--surface-1)] border border-white/[0.04]">
          <img
            src={master.avatar}
            alt={master.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{master.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-medium">{master.rating}</span>
              <span className="text-xs text-[var(--text-muted)]">· {master.specialization}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-emerald-400">
              <Clock size={14} />
              <span className="text-sm font-bold">{service.duration} мин</span>
            </div>
            <span className="text-xs text-[var(--text-muted)]">{service.price.toLocaleString('ru')} ₽</span>
          </div>
        </div>
      </div>

      {/* ===== CALENDAR ===== */}
      <div className="px-5 pt-6">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays size={18} className="text-emerald-400" />
          <h2 className="text-base font-bold">Выберите дату</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {weekDays.map((day, index) => {
            const isSelected = selectedDay === index;
            return (
              <button
                key={day.short}
                onClick={() => {
                  setSelectedDay(index);
                  setSelectedTime('');
                }}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-20 rounded-2xl transition-all duration-200 btn-press ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-[var(--surface-1)] border border-white/[0.04] text-[var(--text-secondary)]'
                }`}
              >
                <span className={`text-[10px] font-medium ${isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                  {day.short}
                </span>
                <span className={`text-lg font-bold mt-1 ${isSelected ? 'text-white' : ''}`}>
                  {day.date.split('.')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== TIME SLOTS ===== */}
      <div className="px-5 pt-6">
        <h2 className="text-base font-bold mb-3">Доступное время</h2>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((slot) => {
            const isSelected = selectedTime === slot.time;
            return (
              <button
                key={slot.time}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 btn-press ${
                  !slot.available
                    ? 'bg-[var(--surface-1)] text-[var(--text-disabled)] cursor-not-allowed border border-white/[0.02]'
                    : isSelected
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-[var(--surface-2)] text-[var(--text-primary)] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-emerald-500/5'
                }`}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== CONFIRM BUTTON ===== */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 p-5 glass-strong border-t border-white/[0.06]">
        <button
          onClick={handleConfirm}
          disabled={!selectedTime}
          className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-200 btn-press ${
            selectedTime
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600'
              : 'bg-[var(--surface-3)] text-[var(--text-disabled)] cursor-not-allowed'
          }`}
        >
          {selectedTime ? `Подтвердить запись · ${service.price.toLocaleString('ru')} ₽` : 'Выберите время'}
        </button>
      </div>
    </div>
  );
}
