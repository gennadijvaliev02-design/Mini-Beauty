import { useState } from 'react';
import { Search, Filter, X, Calendar, Clock, User, Scissors, Phone } from 'lucide-react';
import { adminAppointments as initialAppointments } from '@/data/mockData';
import type { AdminAppointment } from '@/types';

type StatusFilter = 'all' | 'confirmed' | 'completed' | 'cancelled';

const statusOptions = [
  { key: 'all', label: 'Все статусы' },
  { key: 'confirmed', label: 'Подтверждено' },
  { key: 'completed', label: 'Завершено' },
  { key: 'cancelled', label: 'Отменено' },
];

const statusColors = {
  confirmed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  completed: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  cancelled: 'text-red-400 bg-red-500/10 border-red-500/20',
};

const statusLabels = {
  confirmed: 'Подтверждено',
  completed: 'Завершено',
  cancelled: 'Отменено',
};

export default function AppointmentsAdminScreen() {
  const [appointments] = useState<AdminAppointment[]>(initialAppointments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [masterFilter, setMasterFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = appointments.filter((apt) => {
    const matchesSearch =
      !searchQuery ||
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.clientPhone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesDate = !dateFilter || apt.date.includes(dateFilter);
    const matchesMaster = !masterFilter || apt.master.toLowerCase().includes(masterFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesDate && matchesMaster;
  });

  const activeFiltersCount = [
    statusFilter !== 'all',
    dateFilter !== '',
    masterFilter !== '',
  ].filter(Boolean).length;

  const clearFilters = () => {
    setStatusFilter('all');
    setDateFilter('');
    setMasterFilter('');
    setSearchQuery('');
  };

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold">Записи</h2>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">{filtered.length} из {appointments.length} записей</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Поиск по клиенту, услуге или телефону..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--surface-1)] border border-white/[0.06] text-sm placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-colors ${
            showFilters || activeFiltersCount > 0
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-[var(--surface-1)] border border-white/[0.06] text-[var(--text-secondary)] hover:bg-[var(--surface-2)]'
          }`}
        >
          <Filter size={16} />
          Фильтры
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-5 rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Фильтры</h3>
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                Сбросить все
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Статус</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="w-full px-3 py-2.5 rounded-xl bg-[var(--surface-2)] border border-white/[0.06] text-sm focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Дата</label>
              <input
                type="text"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                placeholder="Например, 25.06"
                className="w-full px-3 py-2.5 rounded-xl bg-[var(--surface-2)] border border-white/[0.06] text-sm placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Мастер</label>
              <input
                type="text"
                value={masterFilter}
                onChange={(e) => setMasterFilter(e.target.value)}
                placeholder="Имя мастера"
                className="w-full px-3 py-2.5 rounded-xl bg-[var(--surface-2)] border border-white/[0.06] text-sm placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {statusFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
              {statusLabels[statusFilter]}
              <button onClick={() => setStatusFilter('all')}><X size={12} /></button>
            </span>
          )}
          {dateFilter && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
              {dateFilter}
              <button onClick={() => setDateFilter('')}><X size={12} /></button>
            </span>
          )}
          {masterFilter && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
              {masterFilter}
              <button onClick={() => setMasterFilter('')}><X size={12} /></button>
            </span>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="text-left px-5 py-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Клиент</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Услуга</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Мастер</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Дата / Время</th>
                <th className="text-left px-5 py-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Статус</th>
                <th className="text-right px-5 py-4 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Сумма</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((apt) => (
                <tr key={apt.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[var(--surface-2)] flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-[var(--text-muted)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{apt.clientName}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Phone size={10} className="text-[var(--text-muted)]" />
                          <p className="text-xs text-[var(--text-muted)]">{apt.clientPhone}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Scissors size={14} className="text-[var(--text-muted)]" />
                      <span className="text-sm">{apt.service}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-[var(--text-secondary)]">{apt.master}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[var(--text-muted)]" />
                      <span className="text-sm">{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock size={14} className="text-[var(--text-muted)]" />
                      <span className="text-xs text-[var(--text-muted)]">{apt.time}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[apt.status]}`}>
                      {statusLabels[apt.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-semibold">{apt.price.toLocaleString('ru')} ₽</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
