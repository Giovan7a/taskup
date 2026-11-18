import { useMemo } from 'react';
import {
  BarChart3,
  CheckCircle2,
  Award,
  TrendingUp,
  Flag,
  Calendar,
} from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { StatCard } from '../components/StatCard';
import { ProgressChart } from '../components/ProgressChart';
import { PriorityBadge } from '../components/PriorityBadge';
import type { StatIndicator } from '../types/task';

export function Reports() {
  const { tasks, stats, weeklyData, categoryProgress } = useTasks();

  const reportIndicators = useMemo<StatIndicator[]>(
    () => [
      {
        id: 'rep-completed',
        label: 'Tarefas Concluídas',
        value: stats.completed,
        trend: `De ${stats.total} tarefas totais`,
        trendPositive: true,
        variant: 'completed',
      },
      {
        id: 'rep-rate',
        label: 'Percentual de Produtividade',
        value: `${stats.productivityRate}%`,
        trend: 'Taxa global de entrega',
        trendPositive: true,
        variant: 'total',
      },
      {
        id: 'rep-high',
        label: 'Alta Prioridade Resolvidas',
        value: `${stats.highPriorityCompleted}/${stats.highPriorityCount}`,
        trend: 'Entregas críticas',
        trendPositive: true,
        variant: 'in_progress',
      },
      {
        id: 'rep-active',
        label: 'Backlog Restante',
        value: stats.pending + stats.inProgress,
        trend: `${stats.inProgress} em execução`,
        trendPositive: false,
        variant: 'pending',
      },
    ],
    [stats]
  );

  // Dados para o Gráfico de Tarefas por Prioridade
  const priorityDistribution = useMemo(() => {
    const total = Math.max(tasks.length, 1);

    const highTasks = tasks.filter((t) => t.priority === 'alta');
    const medTasks = tasks.filter((t) => t.priority === 'media');
    const lowTasks = tasks.filter((t) => t.priority === 'baixa');

    return [
      {
        priority: 'alta' as const,
        label: 'Prioridade Alta',
        total: highTasks.length,
        completed: highTasks.filter((t) => t.status === 'concluida').length,
        share: Math.round((highTasks.length / total) * 100),
        barGradient: 'linear-gradient(90deg, #EF4444 0%, #F43F5E 100%)',
      },
      {
        priority: 'media' as const,
        label: 'Prioridade Média',
        total: medTasks.length,
        completed: medTasks.filter((t) => t.status === 'concluida').length,
        share: Math.round((medTasks.length / total) * 100),
        barGradient: 'linear-gradient(90deg, #7C3AED 0%, #8B5CF6 100%)',
      },
      {
        priority: 'baixa' as const,
        label: 'Prioridade Baixa',
        total: lowTasks.length,
        completed: lowTasks.filter((t) => t.status === 'concluida').length,
        share: Math.round((lowTasks.length / total) * 100),
        barGradient: 'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)',
      },
    ];
  }, [tasks]);

  const weeklySummary = useMemo(() => {
    const totalPlanned = weeklyData.reduce((acc, d) => acc + d.planned, 0);
    const totalDone = weeklyData.reduce((acc, d) => acc + d.completed, 0);
    const bestDay = [...weeklyData].sort((a, b) => b.completed - a.completed)[0];

    return {
      totalPlanned,
      totalDone,
      efficiency:
        totalPlanned > 0 ? Math.round((totalDone / totalPlanned) * 100) : 0,
      bestDay: bestDay?.day ?? 'Qui',
      bestDayCount: bestDay?.completed ?? 5,
    };
  }, [weeklyData]);

  return (
    <div className="page-stack">
      <section className="page-hero-bar">
        <div>
          <div className="page-hero-bar__title-row">
            <BarChart3 size={20} className="page-hero-bar__icon" />
            <h2>Relatórios e Métricas de Produtividade</h2>
          </div>
          <p>
            Análise detalhada de entregas, distribuição por prioridade, evolução
            das atividades e resumo semanal.
          </p>
        </div>
      </section>

      {/* Indicadores de Relatórios */}
      <section className="indicators-grid" aria-label="Indicadores de relatórios">
        {reportIndicators.map((ind) => (
          <StatCard key={ind.id} indicator={ind} />
        ))}
      </section>

      <div className="dashboard-main-grid">
        <div className="dashboard-main-left">
          {/* Gráfico de Tarefas por Prioridade */}
          <section className="panel">
            <div className="panel__header">
              <div>
                <div className="panel__title-group">
                  <h2 className="panel__title">
                    Gráfico de Tarefas por Prioridade
                  </h2>
                </div>
                <p className="panel__subtitle">
                  Distribuição do volume de demandas e taxa de resolução por
                  nível de criticidade
                </p>
              </div>
              <div className="panel__icon-badge">
                <Flag size={17} />
              </div>
            </div>

            <div className="priority-chart-list">
              {priorityDistribution.map((item) => {
                const resolutionRate =
                  item.total > 0
                    ? Math.round((item.completed / item.total) * 100)
                    : 0;

                return (
                  <div key={item.priority} className="priority-chart-row">
                    <div className="priority-chart-row__header">
                      <div className="priority-chart-row__left">
                        <PriorityBadge priority={item.priority} />
                        <span className="priority-chart-row__title">
                          {item.label}
                        </span>
                      </div>

                      <div className="priority-chart-row__stats">
                        <span>
                          <strong>{item.total}</strong> tarefas ({item.share}% do
                          total)
                        </span>
                        <span className="priority-chart-row__resolved">
                          {item.completed} concluídas ({resolutionRate}%)
                        </span>
                      </div>
                    </div>

                    <div className="priority-chart-bar">
                      <div
                        className="priority-chart-bar__fill"
                        style={{
                          width: `${Math.max(item.share, 6)}%`,
                          background: item.barGradient,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Evolução das Atividades */}
          <ProgressChart mode="weekly" weeklyData={weeklyData} />
        </div>

        <div className="dashboard-main-right">
          {/* Resumo Semanal */}
          <section className="panel">
            <div className="panel__header">
              <div>
                <div className="panel__title-group">
                  <h2 className="panel__title">Resumo Semanal</h2>
                </div>
                <p className="panel__subtitle">
                  Balanço consolidado de performance da sprint
                </p>
              </div>
              <div className="panel__icon-badge">
                <Award size={17} />
              </div>
            </div>

            <div className="weekly-summary-cards">
              <div className="weekly-summary-card">
                <div className="weekly-summary-card__icon">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <span>Volume Concluído na Semana</span>
                  <strong>
                    {weeklySummary.totalDone} de {weeklySummary.totalPlanned}{' '}
                    atividades planejadas
                  </strong>
                </div>
              </div>

              <div className="weekly-summary-card">
                <div className="weekly-summary-card__icon">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <span>Índice de Eficiência Semanal</span>
                  <strong>
                    {weeklySummary.efficiency}% de cumprimento de metas
                  </strong>
                </div>
              </div>

              <div className="weekly-summary-card">
                <div className="weekly-summary-card__icon">
                  <Calendar size={18} />
                </div>
                <div>
                  <span>Pico de Produtividade</span>
                  <strong>
                    {weeklySummary.bestDay} ({weeklySummary.bestDayCount}{' '}
                    entregas finalizadas)
                  </strong>
                </div>
              </div>
            </div>
          </section>

          {/* Progresso Consolidado por Categoria */}
          <ProgressChart
            mode="overall"
            categoryItems={categoryProgress}
            completionPercentage={stats.productivityRate}
            completedCount={stats.completed}
            inProgressCount={stats.inProgress}
            pendingCount={stats.pending}
          />
        </div>
      </div>
    </div>
  );
}
