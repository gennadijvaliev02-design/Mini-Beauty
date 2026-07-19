import { ArrowLeft, Clock, Star, ChevronRight } from 'lucide-react';
import type { Service, Master } from '@/types';

interface ServiceDetailScreenProps {
  service: Service;
  masters: Master[];
  onBack: () => void;
  onMasterSelect: (master: Master) => void;
}

export default function ServiceDetailScreen({ service, masters, onBack, onMasterSelect }: ServiceDetailScreenProps) {
  return (
    <div className="animate-slideInRight">
      {/* ===== HERO IMAGE ===== */}
      <div className="relative aspect-[4/5] w-full">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-0)] via-[var(--surface-0)]/30 to-transparent" />
        
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full glass flex items-center justify-center btn-press z-10"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
            {service.category}
          </span>
          <h1 className="text-2xl font-bold">{service.name}</h1>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-emerald-400" />
              <span className="text-sm text-[var(--text-secondary)]">{service.duration} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold text-lg">{'</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== DESCRIPTION ===== */}
      <div className="px-5 pt-4 pb-6">
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* ===== DIVIDER ===== */}
      <div className="h-2 bg-[var(--surface-1)]" />

      {/* ===== MASTER SELECTION ===== */}
      <div className="px-5 pt-5 pb-8">
        <h2 className="text-lg font-bold mb-4">Choose a professional</h2>
        <div className="space-y-3">
          {masters.length === 0 ? (
            <div className="p-5 rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] text-sm text-[var(--text-secondary)]">
              No professionals are available for this service yet.
            </div>
          ) : masters.map((master) => (
            <button
              key={master.id}
              onClick={() => onMasterSelect(master)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] card-hover btn-press text-left"
            >
              <img
                src={master.avatar}
                alt={master.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--surface-3)]"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{master.name}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{master.specialization}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-medium">{master.rating}</span>
                  <span className="text-xs text-[var(--text-muted)]">({master.reviewsCount} reviews)</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-[var(--text-muted)] flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
 + service.price.toLocaleString('en-US')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== DESCRIPTION ===== */}
      <div className="px-5 pt-4 pb-6">
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* ===== DIVIDER ===== */}
      <div className="h-2 bg-[var(--surface-1)]" />

      {/* ===== MASTER SELECTION ===== */}
      <div className="px-5 pt-5 pb-8">
        <h2 className="text-lg font-bold mb-4">Choose a professional</h2>
        <div className="space-y-3">
          {masters.length === 0 ? (
            <div className="p-5 rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] text-sm text-[var(--text-secondary)]">
              No professionals are available for this service yet.
            </div>
          ) : masters.map((master) => (
            <button
              key={master.id}
              onClick={() => onMasterSelect(master)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[var(--surface-1)] border border-white/[0.04] card-hover btn-press text-left"
            >
              <img
                src={master.avatar}
                alt={master.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--surface-3)]"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{master.name}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{master.specialization}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-medium">{master.rating}</span>
                  <span className="text-xs text-[var(--text-muted)]">({master.reviewsCount} reviews)</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-[var(--text-muted)] flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
