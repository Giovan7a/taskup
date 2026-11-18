import { TrendingUp, Sparkles, Target, CheckCircle, ArrowUpRight } from 'lucide-react';
import type {
  WeeklyProductivityItem,
  ActivityProgressItem,
} from '../types/task';

interface ProgressChartProps {
  mode?: 'weekly' | 'overall';
  weeklyData?: WeeklyProductivityItem[];
  categoryItems?: ActivityProgressItem[];
  completionPercentage?: number;
  completedCount?: number;
  inProgressCount?: number;
  pendingCount?: number;
}

export function ProgressChart({
  mode = 'weekly',
  weeklyData = [],
  categoryItems = [],
  completionPercentage = 0,
  completedCount = 0,
  inProgressCount = 0,
  pendingCount = 0,
}: ProgressChartProps) {
  if (mode === 'overall') {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (completionPercentage / 100) * circumference;

    return (
      <section className="panel overall-progress-panel">
        <div className="panel__header">
          <div>
            <div className="panel__title-group">
              <h2 className="panel__title">Progresso Geral</h2>
            </div>
            <p className="panel__subtitle">
              Desempenho consolidado das atividades por frente
            </p>
          </div>
          <div className="panel__icon-badge" aria-hidden="true">
            <Target size={17} />
          </div>
        </div>

        <div className="progress-overview">
          <div className="progress-ring-wrapper">
            <svg
              className="progress-ring"
              width="132"
              height="132"
              viewBox="0 0 132 132"
            >
              <defs>
                <linearGradient
                  id="taskupRingGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <circle
                className="progress-ring__bg"
                cx="66"
                cy="66"
                r={radius}
                strokeWidth="11"
              />
              <circle
                className="progress-ring__fill"
                cx="66"
                cy="66"
                r={radius}
                strokeWidth="11"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                stroke="url(#taskupRingGradient)"
              />
            </svg>
            <div className="progress-ring__center">
              <strong className="progress-ring__percent">
                {completionPercentage}%
              </strong>
              <span className="progress-ring__caption">Concluído</span>
            </div>
          </div>

          <div className="progress-mini-stats">
            <div className="progress-mini-stat">
              <span className="progress-mini-stat__dot progress-mini-stat__dot--done" />
              <div>
                <span className="progress-mini-stat__label">Concluídas</span>
                <strong className="progress-mini-stat__val">
                  {completedCount}
                </strong>
              </div>
            </div>
            <div className="progress-mini-stat">
              <span className="progress-mini-stat__dot progress-mini-stat__dot--progress" />
              <div>
                <span className="progress-mini-stat__label">Em andamento</span>
                <strong className="progress-mini-stat__val">
                  {inProgressCount}
                </strong>
              </div>
            </div>
            <div className="progress-mini-stat">
              <span className="progress-mini-stat__dot progress-mini-stat__dot--pending" />
              <div>
                <span className="progress-mini-stat__label">Pendentes</span>
                <strong className="progress-mini-stat__val">
                  {pendingCount}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="category-progress-list">
          <div className="category-progress-list__title">
            <span>Progresso por categoria</span>
            <span className="category-progress-list__hint">
              <ArrowUpRight size={13} />
              Sprint Atual
            </span>
          </div>

          {categoryItems.map((item) => {
            const percent =
              item.total > 0
                ? Math.round((item.completed / item.total) * 100)
                : 0;
            return (
              <div key={item.id} className="category-progress-item">
                <div className="category-progress-item__header">
                  <span className="category-progress-item__name">
                    {item.name}
                  </span>
                  <span className="category-progress-item__meta">
                    <strong>
                      {item.completed}/{item.total}
                    </strong>{' '}
                    ({percent}%)
                  </span>
                </div>
                <div className="category-progress-bar">
                  <div
                    className="category-progress-bar__fill"
                    style={{
                      width: `${percent}%`,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="overall-progress__cta">
          <CheckCircle size={15} className="overall-progress__cta-icon" />
          <span>
            Indicadores sincronizados em tempo real com suas tarefas.
          </span>
        </div>
      </section>
    );
  }

  const maxVal = Math.max(
    ...weeklyData.map((d) => Math.max(d.completed, d.planned)),
    6
  );

  const totalCompletedWeek = weeklyData.reduce(
    (acc, item) => acc + item.completed,
    0
  );
  const totalPlannedWeek = weeklyData.reduce(
    (acc, item) => acc + item.planned,
    0
  );
  const efficiency =
    totalPlannedWeek > 0
      ? Math.round((totalCompletedWeek / totalPlannedWeek) * 100)
      : 0;

  return (
    <section className="panel weekly-chart-panel">
      <div className="panel__header">
        <div>
          <div className="panel__title-group">
            <h2 className="panel__title">Gráfico de Produtividade Semanal</h2>
            <span className="chart-efficiency-pill">
              <TrendingUp size={13} />
              {efficiency}% eficiência
            </span>
          </div>
          <p className="panel__subtitle">
            Comparativo entre tarefas planejadas e concluídas nos últimos 7 dias
          </p>
        </div>

        <div className="chart-legend">
          <span className="chart-legend__item">
            <span className="chart-legend__dot chart-legend__dot--completed" />
            Concluídas
          </span>
          <span className="chart-legend__item">
            <span className="chart-legend__dot chart-legend__dot--planned" />
            Planejadas
          </span>
        </div>
      </div>

      <div className="weekly-chart">
        <div className="weekly-chart__grid">
          {weeklyData.map((item) => {
            const completedHeight = Math.round((item.completed / maxVal) * 100);
            const plannedHeight = Math.round((item.planned / maxVal) * 100);

            return (
              <div key={item.day} className="weekly-chart__col">
                <div className="weekly-chart__bars">
                  <div
                    className="weekly-chart__bar weekly-chart__bar--planned"
                    style={{ height: `${plannedHeight}%` }}
                    title={`${item.day} — Planejadas: ${item.planned}`}
                  >
                    <span className="weekly-chart__tooltip">{item.planned}</span>
                  </div>
                  <div
                    className="weekly-chart__bar weekly-chart__bar--completed"
                    style={{ height: `${completedHeight}%` }}
                    title={`${item.day} — Concluídas: ${item.completed}`}
                  >
                    <span className="weekly-chart__tooltip">
                      {item.completed}
                    </span>
                  </div>
                </div>
                <span className="weekly-chart__day">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="weekly-chart__footer">
        <div className="weekly-chart__summary-item">
          <span className="weekly-chart__summary-label">Entregas na semana</span>
          <strong className="weekly-chart__summary-value">
            {totalCompletedWeek} de {totalPlannedWeek} tarefas concluídas
          </strong>
        </div>
        <div className="weekly-chart__insight">
          <Sparkles size={14} />
          <span>Ritmo constante de entregas durante a sprint!</span>
        </div>
      </div>
    </section>
  );
}
