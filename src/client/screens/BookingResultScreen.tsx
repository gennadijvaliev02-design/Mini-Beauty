import { AlertTriangle, CalendarCheck } from 'lucide-react';

interface BookingResultScreenProps {
  status: 'success' | 'error';
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
  secondaryLabel: string;
  onSecondaryAction: () => void;
}

export default function BookingResultScreen({
  status,
  title,
  message,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
}: BookingResultScreenProps) {
  const isSuccess = status === 'success';
  const Icon = isSuccess ? CalendarCheck : AlertTriangle;

  return (
    <div className="min-h-[var(--tg-viewport-height,100dvh)] px-5 py-8 flex items-center justify-center animate-fadeIn">
      <div className="w-full rounded-3xl bg-[var(--surface-1)] border border-white/[0.05] p-6 text-center">
        <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center ${
          isSuccess ? 'bg-emerald-500/12 text-emerald-400' : 'bg-red-500/12 text-red-400'
        }`}>
          <Icon size={30} />
        </div>
        <h1 className="mt-5 text-xl font-bold">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{message}</p>

        <div className="mt-6 space-y-3">
          <button
            onClick={onAction}
            className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-200 btn-press ${
              isSuccess
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600'
                : 'bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600'
            }`}
          >
            {actionLabel}
          </button>
          <button
            onClick={onSecondaryAction}
            className="w-full py-3 rounded-2xl text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
