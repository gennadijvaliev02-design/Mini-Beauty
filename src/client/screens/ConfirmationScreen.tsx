import { Check, Calendar, Clock, User, Sparkles, ArrowRight } from 'lucide-react';
import type { BookingData } from '../App';

interface ConfirmationScreenProps {
  booking: BookingData;
  onConfirm: () => void;
  onHome: () => void;
}

export default function ConfirmationScreen({ booking, onConfirm, onHome }: ConfirmationScreenProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="animate-slideInRight pb-8">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-40 glass-strong safe-top">
        <div className="px-5 py-4 flex items-center gap-3">
          <h1 className="text-base font-bold">Подтверждение записи</h1>
        </div>
      </header>

      {/* ===== SERVICE IMAGE ===== */}
      <div className="px-5 pt-4">
        <div className="relative aspect-video rounded-2xl overflow-hidden">
          <img
            src={booking.service?.image}
            alt={booking.service?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h2 className="text-white font-bold text-lg">{booking.service?.name}</h2>
          </div>
        </div>
      </div>

      {/* ===== BOOKING DETAILS ===== */}
      <div className="px-5 pt-5">
        <div className="p-5 rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <User size={18} className="text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[var(--text-muted)]">Мастер</p>
              <p className="text-sm font-semibold">{booking.master?.name}</p>
            </div>
            <img
              src={booking.master?.avatar}
              alt={booking.master?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Calendar size={18} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">Дата</p>
              <p className="text-sm font-semibold">{booking.dateLabel || booking.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Clock size={18} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">Время</p>
              <p className="text-sm font-semibold">{booking.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Sparkles size={18} className="text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[var(--text-muted)]">Длительность</p>
              <p className="text-sm font-semibold">{booking.service?.duration} минут</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
            <span className="text-[var(--text-secondary)]">Стоимость услуги</span>
            <span className="text-xl font-bold">{booking.service?.price.toLocaleString('ru')} ₽</span>
          </div>
        </div>
      </div>

      {/* ===== CONFIRM BUTTON ===== */}
      <div className="px-5 pt-6 space-y-3">
        <button
          onClick={handleConfirm}
          className="w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-200 btn-press flex items-center justify-center gap-2 bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600"
        >
          <Check size={18} />
          Подтвердить запись
          <ArrowRight size={16} />
        </button>

        <button
          onClick={onHome}
          className="w-full py-3 rounded-2xl text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          Отменить
        </button>
      </div>
    </div>
  );
}
