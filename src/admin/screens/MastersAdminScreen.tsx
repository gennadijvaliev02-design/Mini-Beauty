import { useState } from 'react';
import { Star, Pencil, X, Check } from 'lucide-react';
import { masters as initialMasters } from '@/data/mockData';
import type { Master } from '@/types';

const weekDays = [
  { key: 'mon', label: 'Пн' },
  { key: 'tue', label: 'Вт' },
  { key: 'wed', label: 'Ср' },
  { key: 'thu', label: 'Чт' },
  { key: 'fri', label: 'Пт' },
  { key: 'sat', label: 'Сб' },
  { key: 'sun', label: 'Вс' },
];

export default function MastersAdminScreen() {
  const [masters, setMasters] = useState<Master[]>(initialMasters);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Master>>({});

  const startEdit = (master: Master) => {
    setEditingId(master.id);
    setEditForm({ ...master });
  };

  const saveEdit = () => {
    if (editingId && editForm) {
      setMasters(prev => prev.map(m => m.id === editingId ? { ...m, ...editForm } as Master : m));
    }
    setEditingId(null);
    setEditForm({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold">Мастера</h2>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">{masters.length} специалистов</p>
      </div>

      {/* Masters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {masters.map((master) => {
          const isEditing = editingId === master.id;
          return (
            <div
              key={master.id}
              className="rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] overflow-hidden card-hover"
            >
              {/* Card Header */}
              <div className="p-5 flex gap-4">
                <img
                  src={master.avatar}
                  alt={master.name}
                  className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--surface-2)] border border-white/[0.06] text-sm font-semibold focus:outline-none focus:border-emerald-500/50"
                    />
                  ) : (
                    <h3 className="text-lg font-bold">{master.name}</h3>
                  )}
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.specialization || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, specialization: e.target.value }))}
                      className="w-full mt-2 px-3 py-2 rounded-lg bg-[var(--surface-2)] border border-white/[0.06] text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  ) : (
                    <p className="text-sm text-[var(--text-secondary)] mt-0.5">{master.specialization}</p>
                  )}

                  <div className="flex items-center gap-1 mt-2">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm font-medium">{master.rating}</span>
                    <span className="text-xs text-[var(--text-muted)] ml-1">({master.reviewsCount} отзывов)</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEdit(master)}
                      className="w-8 h-8 rounded-lg bg-[var(--surface-2)] flex items-center justify-center hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Schedule */}
              <div className="px-5 pb-5">
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">График работы</p>
                <div className="grid grid-cols-7 gap-1.5">
                  {weekDays.map((day) => {
                    const schedule = master.schedule[day.key];
                    const isWorking = schedule !== null;
                    return (
                      <div
                        key={day.key}
                        className={`text-center py-2 rounded-lg ${
                          isWorking
                            ? 'bg-emerald-500/10 border border-emerald-500/20'
                            : 'bg-[var(--surface-2)] border border-white/[0.02]'
                        }`}
                      >
                        <p className={`text-[10px] font-medium ${isWorking ? 'text-emerald-400' : 'text-[var(--text-muted)]'}`}>
                          {day.label}
                        </p>
                        {isWorking && schedule && (
                          <p className="text-[9px] text-[var(--text-muted)] mt-0.5">
                            {schedule.start}-{schedule.end}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
