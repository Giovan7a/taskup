import {
  Layers,
  Clock,
  Loader2,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import type { StatIndicator } from '../types/task';

interface StatCardProps {
  indicator: StatIndicator;
}

const iconByVariant = {
  total: Layers,
  pending: Clock,
  in_progress: Loader2,
  completed: CheckCircle2,
};

export function StatCard({ indicator }: StatCardProps) {
  const Icon = iconByVariant[indicator.variant];

  return (
    <article className={`stat-card stat-card--${indicator.variant}`}>
      <div className="stat-card__top">
        <span className="stat-card__label">{indicator.label}</span>
        <div className={`stat-card__icon stat-card__icon--${indicator.variant}`}>
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>

      <div className="stat-card__bottom">
        <strong className="stat-card__value">{indicator.value}</strong>
        <span
          className={`stat-card__trend ${
            indicator.trendPositive
              ? 'stat-card__trend--positive'
              : 'stat-card__trend--neutral'
          }`}
        >
          <ArrowUpRight size={13} />
          {indicator.trend}
        </span>
      </div>
    </article>
  );
}

