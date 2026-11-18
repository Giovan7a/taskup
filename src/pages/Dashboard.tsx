import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  Plus,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { StatCard } from '../components/StatCard';
import { TaskCard } from '../components/TaskCard';
import { formatDueDate } from '../services/storageService';
import { ProgressChart } from '../components/ProgressChart';
import { PriorityBadge } from '../components/PriorityBadge';
import type { StatIndicator } from '../types/task';

export function Dashboard() {
  const {
    tasks,
    stats,
    weeklyData,
    categoryProgress,
    globalSearch,
    cycleTaskStatus,
    openCreateModal,
    openEditModal,
    deleteTask,
  } = useTasks();

  const indicators = useMemo<StatIndicator[]>(
    () => [
      {
        id: 'ind-total',
        label: 'Total de tarefas',
        value: stats.total,
        trend: `${stats.productivityRate}% concluído`,
        trendPositive: true,
        variant: 'total',
      },
      {
        id: 'ind-pending',
        label: 'Pendentes',
        value: stats.pending,
        trend: 'Aguardando início',
        trendPositive: false,
        variant: 'pending',
      },
      {
        id: 'ind-progress',
        label: 'Em andamento',
        value: stats.inProgress,
        trend: 'Foco da sprint',
        trendPositive: true,
        variant: 'in_progress',
      },
      {
        id: 'ind-completed',
        label: 'Concluídas',
        value: stats.completed,
        trend: '+18% produtividade',
        trendPositive: true,
        variant: 'completed',
      },
    ],
    [stats]
  );

  // Tarefas recentes filtradas pela pesquisa global
  const recentTasks = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();
    const list = query
      ? tasks.filter(
          (t) =>
            t.title.toLowerCase().includes(query) ||
            t.category.toLowerCase().includes(query) ||
            t.code.toLowerCase().includes(query)
        )
      : tasks;
    return list.slice(0, 6);
  }, [tasks, globalSearch]);

  // Tarefas prioritárias (Alta prioridade não concluídas)
  const priorityTasks = useMemo(() => {
    return tasks.filter(
      (t) => t.priority === 'alta' && t.status !== 'concluida'
    );
  }, [tasks]);

  return (
    <div className="page-stack">
      {/* Indicadores Principais */}
      <section className="indicators-grid" aria-label="Indicadores de tarefas">
        {indicators.map((indicator) => (
          <StatCard key={indicator.id} indicator={indicator} />
        ))}
      </section>

      {/* Área Principal do Dashboard */}
      <div className="dashboard-main-grid">
        <div className="dashboard-main-left">
          {/* Atividades Recentes */}
          <section className="panel">
            <div className="panel__header">
              <div>
                <div className="panel__title-group">
                  <h2 className="panel__title">Atividades Recentes</h2>
                  <span className="panel__counter">{recentTasks.length}</span>
                </div>
                <p className="panel__subtitle">
                  Clique no ícone de status para avançar ou gerencie cada
                  entrega
                </p>
              </div>

              <div className="panel__actions">
                <Link to="/tarefas" className="btn-link-subtle">
                  <span>Ver todas</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="task-list">
              {recentTasks.length === 0 ? (
                <div className="task-list__empty">
                  <p>Nenhuma tarefa encontrada para "{globalSearch}".</p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => openCreateModal('pendente')}
                  >
                    <Plus size={15} />
                    <span>Criar primeira tarefa</span>
                  </button>
                </div>
              ) : (
                recentTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    variant="row"
                    onToggleStatus={cycleTaskStatus}
                    onEdit={openEditModal}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </div>
          </section>

          {/* Gráfico de Produtividade Semanal */}
          <ProgressChart mode="weekly" weeklyData={weeklyData} />
        </div>

        <div className="dashboard-main-right">
          {/* Painel de Tarefas Prioritárias */}
          <section className="panel priority-focus-panel">
            <div className="panel__header">
              <div>
                <div className="panel__title-group">
                  <h2 className="panel__title">Tarefas Prioritárias</h2>
                  <span className="priority-badge priority-badge--high">
                    {priorityTasks.length} críticas
                  </span>
                </div>
                <p className="panel__subtitle">
                  Entregas de alta prioridade pendentes ou em execução
                </p>
              </div>
              <div className="panel__icon-badge panel__icon-badge--danger">
                <Flame size={17} />
              </div>
            </div>

            <div className="priority-focus-list">
              {priorityTasks.length === 0 ? (
                <div className="priority-focus-empty">
                  <CheckCircle2 size={22} />
                  <p>Todas as tarefas de alta prioridade foram concluídas!</p>
                </div>
              ) : (
                priorityTasks.map((task) => (
                  <div key={task.id} className="priority-focus-item">
                    <div className="priority-focus-item__top">
                      <span className="task-row__code">{task.code}</span>
                      <PriorityBadge priority={task.priority} size="sm" />
                    </div>
                    <h4 className="priority-focus-item__title">{task.title}</h4>
                    <div className="priority-focus-item__bottom">
                      <span className="priority-focus-item__due">
                        <Calendar size={12} />
                        {formatDueDate(task.dueDate)}
                      </span>
                      <button
                        type="button"
                        className="priority-focus-item__btn"
                        onClick={() => cycleTaskStatus(task.id)}
                      >
                        {task.status === 'pendente'
                          ? 'Iniciar agora →'
                          : 'Concluir ✓'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Progresso Geral das Atividades */}
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
