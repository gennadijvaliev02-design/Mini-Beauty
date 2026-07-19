import { useState } from 'react';
import { Calendar, Clock, Star, CheckCircle, XCircle, MessageSquare, Send } from 'lucide-react';
import type { Appointment } from '@/types';

interface MyAppointmentsScreenProps {
  appointments: Appointment[];
  onAddReview: (appointmentId: string, rating: number, review: string) => void;
}

type FilterStatus = 'all' | 'confirmed' | 'completed' | 'cancelled';

const statusConfig = {
  confirmed: { label: 'Confirmed', color: 'text-emerald-400 bg-emerald-500/10', icon: CheckCircle },
  completed: { label: 'Completed', color: 'text-blue-400 bg-blue-500/10', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-400 bg-red-500/10', icon: XCircle },
};

export default function MyAppointmentsScreen({ appointments, onAddReview }: MyAppointmentsScreenProps) {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [reviewModal, setReviewModal] = useState<{ open: boolean; appointment: Appointment | null }>({
    open: false,
    appointment: null,
  });
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const filtered = filter === 'all'
    ? appointments
    : appointments.filter(a => a.status === filter);

  const handleOpenReview = (appointment: Appointment) => {
    setReviewModal({ open: true, appointment });
    setRating(appointment.rating || 0);
    setReviewText(appointment.review || '');
  };

  const handleSubmitReview = () => {
    if (reviewModal.appointment && rating > 0) {
      onAddReview(reviewModal.appointment.id, rating, reviewText);
      setReviewModal({ open: false, appointment: null });
      setRating(0);
      setReviewText('');
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-40 glass-strong safe-top">
        <div className="px-5 py-4">
          <h1 className="text-lg font-bold">My appointments</h1>
          <p className="text-xs text-[var(--text-muted)]">{appointments.length} appointments</p>
        </div>
      </header>

      {/* ===== FILTERS ===== */}
      <div className="px-5 pt-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {([
            { key: 'all', label: 'All' },
            { key: 'confirmed', label: 'Upcoming' },
            { key: 'completed', label: 'Completed' },
            { key: 'cancelled', label: 'Cancelled' },
          ] as const).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 btn-press ${
                filter === f.key
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-[var(--surface-2)] text-[var(--text-secondary)] border border-transparent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== APPOINTMENTS LIST ===== */}
      <div className="px-5 pt-5 pb-8 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--surface-2)] flex items-center justify-center mb-4">
              <Calendar size={28} className="text-[var(--text-muted)]" />
            </div>
            <p className="text-[var(--text-secondary)] text-sm">No appointments yet</p>
            <p className="text-[var(--text-muted)] text-xs mt-1">Choose a service and book an appointment</p>
          </div>
        ) : (
          filtered.map((appointment) => {
            const status = statusConfig[appointment.status];
            const StatusIcon = status.icon;
            return (
              <div
                key={appointment.id}
                className="rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] overflow-hidden"
              >
                {/* Card Header */}
                <div className="flex gap-4 p-4">
                  <img
                    src={appointment.serviceImage}
                    alt={appointment.serviceName}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm truncate">{appointment.serviceName}</h3>
                      <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${status.color}`}>
                        <StatusIcon size={10} />
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <img
                        src={appointment.masterAvatar}
                        alt={appointment.masterName}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-xs text-[var(--text-secondary)]">{appointment.masterName}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-[var(--text-muted)]" />
                        <span className="text-xs text-[var(--text-muted)]">{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-[var(--text-muted)]" />
                        <span className="text-xs text-[var(--text-muted)]">{appointment.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-emerald-400 font-bold text-sm">{appointment.price.toLocaleString('en-US')} ₽</span>
                      {appointment.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < appointment.rating! ? 'text-amber-400 fill-amber-400' : 'text-[var(--surface-3)]'}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Review Section */}
                {appointment.review && (
                  <div className="px-4 pb-3">
                    <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-white/[0.03]">
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{appointment.review}</p>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {appointment.status === 'completed' && !appointment.review && (
                  <button
                    onClick={() => handleOpenReview(appointment)}
                    className="w-full py-3 border-t border-white/[0.04] flex items-center justify-center gap-2 text-sm text-emerald-400 hover:bg-emerald-500/5 transition-colors"
                  >
                    <MessageSquare size={16} />
                    Leave a review
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ===== REVIEW MODAL ===== */}
      {reviewModal.open && reviewModal.appointment && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center animate-fadeIn">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setReviewModal({ open: false, appointment: null })} />
          <div className="relative w-full max-w-[430px] bg-[var(--surface-1)] rounded-t-3xl p-6 animate-slideInRight">
            <div className="w-10 h-1 rounded-full bg-[var(--surface-3)] mx-auto mb-6" />
            
            <div className="flex items-center gap-3 mb-6">
              <img
                src={reviewModal.appointment.masterAvatar}
                alt={reviewModal.appointment.masterName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{reviewModal.appointment.serviceName}</h3>
                <p className="text-xs text-[var(--text-muted)]">{reviewModal.appointment.masterName}</p>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 btn-press transition-transform"
                >
                  <Star
                    size={32}
                    className={`transition-colors duration-150 ${
                      star <= rating ? 'text-amber-400 fill-amber-400' : 'text-[var(--surface-3)]'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Review Text */}
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full h-28 p-4 rounded-2xl bg-[var(--surface-2)] border border-white/[0.06] text-sm resize-none placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-emerald-500/50 transition-colors"
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmitReview}
              disabled={rating === 0}
              className={`w-full mt-4 py-4 rounded-2xl font-semibold text-sm transition-all btn-press flex items-center justify-center gap-2 ${
                rating > 0
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-[var(--surface-3)] text-[var(--text-disabled)] cursor-not-allowed'
              }`}
            >
              <Send size={16} />
              Submit review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
