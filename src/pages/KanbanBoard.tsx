import { useState, useMemo } from 'react';
import { Kanban, Plus, Sparkles } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { KanbanColumn } from '../components/KanbanColumn';
import type { TaskPriority, TaskStatus } from '../types/task';

export function KanbanBoard() {
  const {
    tasks,
    globalSearch,
    moveTaskStatus,
    openCreateModal,
    openEditModal,
    deleteTask,
  } = useTasks();

  const [priorityFilter, setPriorityFilter] = useState<'todas' | TaskPriority>(
    'todas'
  );

  const filteredTasks = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch =
        !q ||
        task.title.toLowerCase().includes(q) ||
        task.code.toLowerCase().includes(q) ||
        task.category.toLowerCase().includes(q);
      const matchesPriority =
        priorityFilter === 'todas' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, globalSearch, priorityFilter]);

  const columns = useMemo(
    () => [
      {
        status: 'pendente' as TaskStatus,
        title: 'Pendente',
        subtitle: 'Backlog priorizado pronto para iniciar',
        accentColor: '#8B5CF6',
        items: filteredTasks.filter((t) => t.status === 'pendente'),
      },
      {
        status: 'em_andamento' as TaskStatus,
        title: 'Em andamento',
        subtitle: 'Atividades em execução ativa na sprint',
        accentColor: '#3B82F6',
        items: filteredTasks.filter((t) => t.status === 'em_andamento'),
      },
      {
        status: 'concluida' as TaskStatus,
        title: 'Concluído',
        subtitle: 'Entregas validadas e finalizadas',
        accentColor: '#10B981',
        items: filteredTasks.filter((t) => t.status === 'concluida'),
      },
    ],
    [filteredTasks]
  );

  const handleDragStartTask = (
    e: React.DragEvent<HTMLElement>,
    taskId: string
  ) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDropTask = (taskId: string, newStatus: TaskStatus) => {
    const target = tasks.find((t) => t.id === taskId);
    if (!target || target.status === newStatus) return;
    moveTaskStatus(taskId, newStatus);
  };

  return (
    <div className="page-stack">
      <section className="page-hero-bar">
        <div>
          <div className="page-hero-bar__title-row">
            <Kanban size={20} className="page-hero-bar__icon" />
            <h2>Quadro Kanban</h2>
            <span className="kanban-drag-hint">
              <Sparkles size={13} />
              Arraste e solte os cards entre as colunas
            </span>
          </div>
          <p>
            Visualize o fluxo de trabalho em três etapas e movimente tarefas com
            Drag & Drop ou pelos botões rápidos.
          </p>
        </div>

        <div className="page-hero-bar__actions">
          <div className="filter-bar__select-wrap">
            <label htmlFor="kanban-priority">Prioridade:</label>
            <select
              id="kanban-priority"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value as 'todas' | TaskPriority)
              }
            >
              <option value="todas">Todas</option>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>

          <button
            type="button"
            className="btn-primary page-hero-bar__btn"
            onClick={() => openCreateModal('pendente')}
          >
            <Plus size={16} />
            <span>Nova Tarefa</span>
          </button>
        </div>
      </section>

      <div className="kanban-board-grid">
        {columns.map((col) => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            title={col.title}
            subtitle={col.subtitle}
            accentColor={col.accentColor}
            tasks={col.items}
            onDropTask={handleDropTask}
            onDragStartTask={handleDragStartTask}
            onAddTaskInColumn={openCreateModal}
            onEditTask={openEditModal}
            onDeleteTask={deleteTask}
            onMoveStatus={moveTaskStatus}
          />
        ))}
      </div>
    </div>
  );
}
