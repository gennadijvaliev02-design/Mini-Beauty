import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, X, Clock, Upload } from 'lucide-react';
import { services as initialServices } from '@/data/mockData';
import type { Service } from '@/types';

export default function ServicesAdminScreen() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'Волосы',
  });

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      setServices(prev => prev.map(s =>
        s.id === editingService.id
          ? { ...s, ...formData, price: Number(formData.price), duration: Number(formData.duration) }
          : s
      ));
    } else {
      const newService: Service = {
        id: `s${Date.now()}`,
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        duration: Number(formData.duration),
        category: formData.category,
        image: '/assets/service-haircut.jpg',
      };
      setServices(prev => [newService, ...prev]);
    }
    closeForm();
  };

  const openForm = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price.toString(),
        duration: service.duration.toString(),
        category: service.category,
      });
    } else {
      setEditingService(null);
      setFormData({ name: '', description: '', price: '', duration: '', category: 'Волосы' });
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingService(null);
  };

  const handleDelete = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Услуги</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">{services.length} услуг в каталоге</p>
        </div>
        <button
          onClick={() => openForm()}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25 btn-press"
        >
          <Plus size={18} />
          Добавить услугу
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Поиск по названию или категории..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--surface-1)] border border-white/[0.06] text-sm placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-emerald-500/50 transition-colors"
        />
      </div>

      {/* Services Table */}
      <div className="rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Услуга</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider hidden md:table-cell">Категория</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Длительность</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Цена</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((service) => (
                <tr key={service.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm font-medium">{service.name}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1 max-w-[200px]">{service.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--surface-2)] text-[var(--text-secondary)]">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[var(--text-muted)]" />
                      <span className="text-sm">{service.duration} мин</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-semibold">{service.price.toLocaleString('ru')} ₽</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openForm(service)}
                        className="w-8 h-8 rounded-lg bg-[var(--surface-2)] flex items-center justify-center hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="w-8 h-8 rounded-lg bg-[var(--surface-2)] flex items-center justify-center hover:bg-red-500/10 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeForm} />
          <div className="relative w-full max-w-lg bg-[var(--surface-1)] rounded-2xl border border-white/[0.06] p-6 animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">
                {editingService ? 'Редактировать услугу' : 'Новая услуга'}
              </h3>
              <button onClick={closeForm} className="w-8 h-8 rounded-lg bg-[var(--surface-2)] flex items-center justify-center">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div className="border-2 border-dashed border-white/[0.08] rounded-xl p-8 text-center hover:border-emerald-500/30 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                  <Upload size={20} className="text-emerald-400" />
                </div>
                <p className="text-sm text-[var(--text-secondary)]">Перетащите фото или нажмите для загрузки</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">PNG, JPG до 5 МБ</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Название</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Например, Женская стрижка"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-white/[0.06] text-sm placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Описание услуги..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-white/[0.06] text-sm placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Цена (₽)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="2500"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-white/[0.06] text-sm placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Длительность (мин)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="60"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-white/[0.06] text-sm placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Категория</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-white/[0.06] text-sm focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none"
                >
                  <option>Волосы</option>
                  <option>Ногти</option>
                  <option>Брови и ресницы</option>
                  <option>Уход</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25 btn-press mt-2"
              >
                {editingService ? 'Сохранить изменения' : 'Добавить услугу'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
