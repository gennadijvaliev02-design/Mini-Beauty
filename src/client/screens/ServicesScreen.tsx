import { useState, useRef, useEffect } from 'react';
import { Clock, ChevronRight, Sparkles } from 'lucide-react';
import { promoBanners } from '@/data/mockData';
import type { Service } from '@/types';

interface ServicesScreenProps {
  services: Service[];
  onServiceSelect: (service: Service) => void;
}

export default function ServicesScreen({ services, onServiceSelect }: ServicesScreenProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const serviceCategories = ['All', ...Array.from(new Set(services.map(service => service.category)))];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  // Auto-scroll banners
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex(prev => (prev + 1) % promoBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.scrollTo({
        left: bannerIndex * bannerRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  }, [bannerIndex]);

  return (
    <div className="animate-fadeIn">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-40 glass-strong safe-top">
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">ServicePro</h1>
              <p className="text-[11px] text-[var(--text-muted)] -mt-0.5">Beauty Salon</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[var(--surface-3)] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </header>

      {/* ===== PROMO BANNERS ===== */}
      <section className="px-5 pt-4 pb-2">
        <div
          ref={bannerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {promoBanners.map((banner) => (
            <div
              key={banner.id}
              className={`flex-shrink-0 w-[85%] snap-center rounded-2xl bg-gradient-to-r ${banner.color} p-5 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <h3 className="text-white font-bold text-[15px] leading-tight">{banner.title}</h3>
                <p className="text-white/80 text-xs mt-1">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Banner dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {promoBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setBannerIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === bannerIndex ? 'w-5 bg-emerald-400' : 'w-1.5 bg-[var(--surface-3)]'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="px-5 pt-4 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x">
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 btn-press ${
                activeCategory === cat
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-[var(--surface-2)] text-[var(--text-secondary)] border border-transparent hover:bg-[var(--surface-3)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="px-5 pt-5 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Services</h2>
          <span className="text-xs text-[var(--text-muted)]">{filteredServices.length} services</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filteredServices.map((service) => (
            <button
              key={service.id}
              onClick={() => onServiceSelect(service)}
              className="text-left rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] overflow-hidden card-hover btn-press"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md rounded-lg px-2 py-1 flex items-center gap-1">
                  <Clock size={10} className="text-emerald-400" />
                  <span className="text-[10px] text-white font-medium">{service.duration} min</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-semibold text-sm leading-tight">{service.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-emerald-400 font-bold text-sm">{'$' + service.price.toLocaleString('en-US')}</span>
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <ChevronRight size={14} className="text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
