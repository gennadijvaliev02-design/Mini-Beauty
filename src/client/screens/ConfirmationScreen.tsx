import { useState } from 'react';
import { Check, Calendar, Clock, User, Sparkles, ArrowRight, Shield } from 'lucide-react';
import type { BookingData } from '../App';

interface ConfirmationScreenProps {
  booking: BookingData;
  onConfirm: () => void;
  onHome: () => void;
}

export default function ConfirmationScreen({ booking, onConfirm, onHome }: ConfirmationScreenProps) {
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      onConfirm();
    }, 2000);
  };

  if (isPaid) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-8 animate-scaleIn">
        {/* Success Animation */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center animate-pulse-glow">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check size={24} className="text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center">
            <Sparkles size={12} className="text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center">Запись подтверждена!</h1>
        <p className="text-[var(--text-secondary)] text-sm text-center mt-2">
          Ждём вас {booking.date} в {booking.time}
        </p>

        {/* Booking Summary Card */}
        <div className="w-full mt-8 p-5 rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Sparkles size={14} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">Услуга</p>
              <p className="text-sm font-medium">{booking.service?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <User size={14} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">Мастер</p>
              <p className="text-sm font-medium">{booking.master?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Calendar size={14} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">Дата</p>
              <p className="text-sm font-medium">{booking.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Clock size={14} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">Время</p>
              <p className="text-sm font-medium">{booking.time}</p>
            </div>
          </div>
          <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
            <span className="text-sm text-[var(--text-muted)]">Итого</span>
            <span className="text-lg font-bold text-emerald-400">{booking.service?.price.toLocaleString('ru')} ₽</span>
          </div>
        </div>

        <button
          onClick={onHome}
          className="w-full mt-8 py-4 rounded-2xl bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 btn-press hover:bg-emerald-600 transition-colors"
        >
          Вернуться к услугам
        </button>
      </div>
    );
  }

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
              <p className="text-sm font-semibold">{booking.date}</p>
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

      {/* ===== PAYMENT BUTTON ===== */}
      <div className="px-5 pt-6 space-y-3">
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-200 btn-press flex items-center justify-center gap-2 ${
            isProcessing
              ? 'bg-[var(--surface-3)] text-[var(--text-disabled)]'
              : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Обработка оплаты...
            </>
          ) : (
            <>
              <Shield size={18} />
              Оплатить через CryptoBot
              <ArrowRight size={16} />
            </>
          )}
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
