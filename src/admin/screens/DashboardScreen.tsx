import { TrendingUp, TrendingDown, Users, Scissors, Star, Wallet, Calendar, Clock } from 'lucide-react';
import { dashboardStats, revenueData, adminAppointments } from '@/data/mockData';

const statCards = [
  {
    label: 'Доход за сегодня',
    value: `${dashboardStats.todayRevenue.toLocaleString('ru')} ₽`,
    change: '+12%',
    up: true,
    icon: Wallet,
    color: 'from-emerald-500/20 to-teal-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    label: 'Записей сегодня',
    value: dashboardStats.todayAppointments.toString(),
    change: '+3',
    up: true,
    icon: Calendar,
    color: 'from-blue-500/20 to-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    label: 'Активных мастеров',
    value: dashboardStats.activeMasters.toString(),
    change: 'Все на месте',
    up: true,
    icon: Users,
    color: 'from-violet-500/20 to-violet-500/10',
    iconColor: 'text-violet-400',
  },
  {
    label: 'Средний рейтинг',
    value: dashboardStats.averageRating.toString(),
    change: '+0.2',
    up: true,
    icon: Star,
    color: 'from-amber-500/20 to-amber-500/10',
    iconColor: 'text-amber-400',
  },
];

// Simple SVG Line Chart
function RevenueChart() {
  const data = revenueData;
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const minRevenue = Math.min(...data.map(d => d.revenue));
  const range = maxRevenue - minRevenue;
  
  const width = 100;
  const height = 40;
  const padding = 5;
  
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((d.revenue - minRevenue) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${padding},${height} ${points} ${width - padding},${height}`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height + 15}`} className="w-full h-auto" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 1, 2].map(i => (
          <line
            key={i}
            x1={padding}
            y1={padding + (i / 2) * (height - 2 * padding)}
            x2={width - padding}
            y2={padding + (i / 2) * (height - 2 * padding)}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.3"
          />
        ))}
        
        {/* Area fill */}
        <polygon
          points={areaPoints}
          fill="url(#areaGradient)"
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#10b981"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {data.map((d, i) => {
          const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
          const y = height - padding - ((d.revenue - minRevenue) / range) * (height - 2 * padding);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="1.2" fill="#10b981" />
              <circle cx={x} cy={y} r="2.5" fill="none" stroke="#10b981" strokeWidth="0.4" opacity="0.5" />
            </g>
          );
        })}
        
        {/* X-axis labels */}
        {data.map((d, i) => {
          const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
          return (
            <text
              key={`label-${i}`}
              x={x}
              y={height + 10}
              textAnchor="middle"
              fill="#737373"
              fontSize="4"
              fontFamily="Inter, sans-serif"
            >
              {d.day}
            </text>
          );
        })}
        
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function DashboardScreen() {
  return (
    <div className="animate-fadeIn space-y-6 max-w-6xl mx-auto">
      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="relative overflow-hidden rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] p-5 card-hover"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} rounded-full -translate-y-1/2 translate-x-1/2`} />
              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl bg-[var(--surface-2)] flex items-center justify-center mb-3 ${card.iconColor}`}>
                  <Icon size={20} />
                </div>
                <p className="text-xs text-[var(--text-muted)] mb-1">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
                <div className={`flex items-center gap-1 mt-2 ${card.up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {card.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span className="text-xs font-medium">{card.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== REVENUE CHART ===== */}
      <div className="rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold">Доходы за неделю</h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Сравнение по дням</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-[var(--text-muted)]">Доход</span>
            </div>
          </div>
        </div>
        <RevenueChart />
        <div className="flex justify-between mt-4 pt-4 border-t border-white/[0.04]">
          {revenueData.map((d) => (
            <div key={d.day} className="text-center">
              <p className="text-sm font-bold">{d.revenue.toLocaleString('ru')} ₽</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{d.appointments} записей</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== RECENT APPOINTMENTS TABLE ===== */}
      <div className="rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] overflow-hidden">
        <div className="p-5 border-b border-white/[0.04] flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Последние записи</h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Сегодня, 25 июня</p>
          </div>
          <button className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
            Все записи →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Клиент</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Услуга</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider hidden md:table-cell">Мастер</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Время</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Статус</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Сумма</th>
              </tr>
            </thead>
            <tbody>
              {adminAppointments.slice(0, 6).map((apt) => {
                const statusColors = {
                  confirmed: 'text-emerald-400 bg-emerald-500/10',
                  completed: 'text-blue-400 bg-blue-500/10',
                  cancelled: 'text-red-400 bg-red-500/10',
                };
                return (
                  <tr
                    key={apt.id}
                    className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="text-sm font-medium">{apt.clientName}</p>
                        <p className="text-xs text-[var(--text-muted)]">{apt.clientPhone}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Scissors size={14} className="text-[var(--text-muted)]" />
                        <span className="text-sm">{apt.service}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-sm text-[var(--text-secondary)]">{apt.master}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[var(--text-muted)]" />
                        <span className="text-sm">{apt.time}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[apt.status]}`}>
                        {apt.status === 'confirmed' ? 'Подтверждено' : apt.status === 'completed' ? 'Завершено' : 'Отменено'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm font-semibold">{apt.price.toLocaleString('ru')} ₽</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
