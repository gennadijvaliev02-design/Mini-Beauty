import { useState } from 'react';
import { Clock, Pencil, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { masters } from '@/data/mockData';

const weekDays = [
  { key: 'mon', label: 'Понедельник', short: 'Пн' },
  { key: 'tue', label: 'Вторник', short: 'Вт' },
  { key: 'wed', label: 'Среда', short: 'Ср' },
  { key: 'thu', label: 'Четверг', short: 'Чт' },
  { key: 'fri', label: 'Пятница', short: 'Пт' },
  { key: 'sat', label: 'Суббота', short: 'Сб' },
  { key: 'sun', label: 'Воскресенье', short: 'Вс' },
];

export default function ScheduleAdminScreen() {
  const [editCell, setEditCell] = useState<{ masterId: string; day: string } | null>(null);
  const [editValue, setEditValue] = useState({ start: '', end: '' });
  const [scheduleData, setScheduleData] = useState(
    masters.map(m => ({ ...m }))
  );

  const startEdit = (masterId: string, day: string) => {
    const master = scheduleData.find(m => m.id === masterId);
    const schedule = master?.schedule[day];
    setEditCell({ masterId, day });
    setEditValue({
      start: schedule?.start || '09:00',
      end: schedule?.end || '18:00',
    });
  };

  const saveEdit = () => {
    if (editCell) {
      setScheduleData(prev => prev.map(m => {
        if (m.id === editCell.masterId) {
          return {
            ...m,
            schedule: {
              ...m.schedule,
              [editCell.day]: editValue.start && editValue.end
                ? { start: editValue.start, end: editValue.end }
                : null,
            },
          };
        }
        return m;
      }));
    }
    setEditCell(null);
  };

  const cancelEdit = () => {
    setEditCell(null);
  };

  const isDayOff = (schedule: { start: string; end: string } | null | undefined) => {
    return !schedule;
  };

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Расписание</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Недельный график работы мастеров</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-lg bg-[var(--surface-2)] flex items-center justify-center hover:bg-[var(--surface-3)] transition-colors">
            <ChevronLeft size={18} />
          </button>
          <span className="px-4 py-2 rounded-lg bg-[var(--surface-1)] border border-white/[0.06] text-sm font-medium">
            23 — 29 июня 2026
          </span>
          <button className="w-9 h-9 rounded-lg bg-[var(--surface-2)] flex items-center justify-center hover:bg-[var(--surface-3)] transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="text-left px-5 py-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider w-48">
                  Мастер
                </th>
                {weekDays.map((day) => (
                  <th key={day.key} className="text-center px-3 py-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                    <div>{day.short}</div>
                    <div className="text-[10px] font-normal normal-case mt-0.5">{day.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((master) => (
                <tr key={master.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={master.avatar}
                        alt={master.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{master.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{master.specialization}</p>
                      </div>
                    </div>
                  </td>
                  {weekDays.map((day) => {
                    const schedule = master.schedule[day.key];
                    const isEditing = editCell?.masterId === master.id && editCell?.day === day.key;
                    const dayOff = isDayOff(schedule);

                    return (
                      <td key={day.key} className="px-2 py-3 text-center">
                        {isEditing ? (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1">
                              <Clock size={10} className="text-emerald-400 flex-shrink-0" />
                              <input
                                type="time"
                                value={editValue.start}
                                onChange={(e) => setEditValue(prev => ({ ...prev, start: e.target.value }))}
                                className="w-full px-1.5 py-1 rounded bg-[var(--surface-2)] border border-white/[0.06] text-[11px] focus:outline-none focus:border-emerald-500/50"
                              />
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={10} className="text-red-400 flex-shrink-0" />
                              <input
                                type="time"
                                value={editValue.end}
                                onChange={(e) => setEditValue(prev => ({ ...prev, end: e.target.value }))}
                                className="w-full px-1.5 py-1 rounded bg-[var(--surface-2)] border border-white/[0.06] text-[11px] focus:outline-none focus:border-emerald-500/50"
                              />
                            </div>
                            <div className="flex items-center justify-center gap-1 mt-1">
                              <button
                                onClick={saveEdit}
                                className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20"
                              >
                                <Check size={12} />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="w-6 h-6 rounded bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEdit(master.id, day.key)}
                            className={`w-full py-2 px-1 rounded-lg transition-all ${
                              dayOff
                                ? 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:bg-red-500/5 hover:text-red-400'
                                : 'bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10'
                            }`}
                          >
                            {dayOff ? (
                              <span className="text-[11px]">Вых.</span>
                            ) : (
                              <div>
                                <div className="text-[11px] font-medium">{schedule?.start}</div>
                                <div className="text-[10px] text-[var(--text-muted)]">{schedule?.end}</div>
                              </div>
                            )}
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-500/5 border border-emerald-500/20" />
          <span>Рабочий день</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--surface-2)]" />
          <span>Выходной</span>
        </div>
        <div className="flex items-center gap-2">
          <Pencil size={12} className="text-[var(--text-muted)]" />
          <span>Нажмите на ячейку для редактирования</span>
        </div>
      </div>
    </div>
  );
}
