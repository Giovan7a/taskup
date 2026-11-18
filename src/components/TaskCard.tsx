import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock3,
  Edit3,
  Trash2,
  Tag,
  GripVertical,
  ArrowRight,
} from 'lucide-react';
import type { Task, TaskStatus } from '../types/task';
import { formatDueDate } from '../services/storageService';
import { PriorityBadge } from './PriorityBadge';

interface TaskCardProps {
  task: Task;
  variant?: 'row' | 'kanban';
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMoveStatus?: (id: string, status: TaskStatus) => void;
  onDragStart?: (e: React.DragEvent<HTMLElement>, taskId: string) => void;
}

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  pendente: {
    label: 'Pendente',
    className: 'status-pill--pending',
  },
  em_andamento: {
    label: 'Em andamento',
    className: 'status-pill--progress',
  },
  concluida: {
    label: 'Concluída',
    className: 'status-pill--completed',
  },
};

export function TaskCard({
  task,
  variant = 'row',
  onToggleStatus,
  onEdit,
  onDelete,
  onMoveStatus,
  onDragStart,
}: TaskCardProps) {
  const isCompleted = task.status === 'concluida';
  const statusInfo = statusConfig[task.status];

  if (variant === 'kanban') {
    return (
      <article
        className={`kanban-card ${isCompleted ? 'kanban-card--completed' : ''}`}
        draggable
        onDragStart={(e) => onDragStart?.(e, task.id)}
      >
        <div className="kanban-card__top">
          <div className="kanban-card__code-wrap">
            <GripVertical size={14} className="kanban-card__grip" />
            <span className="task-row__code">{task.code}</span>
          </div>
          <PriorityBadge priority={task.priority} size="sm" />
        </div>

        <h4 className="kanban-card__title">{task.title}</h4>

        {task.description && (
          <p className="kanban-card__desc">{task.description}</p>
        )}

        <div className="kanban-card__meta">
          <span className="kanban-card__category">
            <Tag size={11} />
            {task.category}
          </span>
          <span className="kanban-card__due">
            <Calendar size={12} />
            {formatDueDate(task.dueDate)}
          </span>
        </div>

        <div className="kanban-card__footer">
          <div className="kanban-card__quick-move">
            {task.status !== 'pendente' && onMoveStatus && (
              <button
                type="button"
                className="kanban-card__move-btn"
                onClick={() =>
                  onMoveStatus(
                    task.id,
                    task.status === 'concluida' ? 'em_andamento' : 'pendente'
                  )
                }
                title="Voltar etapa"
              >
                ← Voltar
              </button>
            )}
            {task.status !== 'concluida' && onMoveStatus && (
              <button
                type="button"
                className="kanban-card__move-btn kanban-card__move-btn--advance"
                onClick={() =>
                  onMoveStatus(
                    task.id,
                    task.status === 'pendente' ? 'em_andamento' : 'concluida'
                  )
                }
                title="Avançar etapa"
              >
                <span>Avançar</span>
                <ArrowRight size={12} />
              </button>
            )}
          </div>

          <div className="kanban-card__actions">
            <button
              type="button"
              className="icon-action-btn"
              onClick={() => onEdit(task)}
              title="Editar tarefa"
              aria-label={`Editar ${task.title}`}
            >
              <Edit3 size={14} />
            </button>
            <button
              type="button"
              className="icon-action-btn icon-action-btn--danger"
              onClick={() => onDelete(task.id)}
              title="Excluir tarefa"
              aria-label={`Excluir ${task.title}`}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`task-row ${isCompleted ? 'task-row--completed' : ''}`}>
      <div className="task-row__main">
        <button
          type="button"
          className={`task-row__check ${
            isCompleted
              ? 'task-row__check--done'
              : task.status === 'em_andamento'
              ? 'task-row__check--progress'
              : ''
          }`}
          onClick={() => onToggleStatus(task.id)}
          title="Alternar status da tarefa"
          aria-label={`Alternar status de ${task.title}`}
        >
          {isCompleted ? (
            <CheckCircle2 size={19} />
          ) : task.status === 'em_andamento' ? (
            <Clock3 size={18} />
          ) : (
            <Circle size={19} />
          )}
        </button>

        <span className="task-row__code">{task.code}</span>

        <div className="task-row__content">
          <span className="task-row__title">{task.title}</span>
          {task.description && (
            <p className="task-row__description">{task.description}</p>
          )}
          <div className="task-row__submeta">
            <span className="task-row__category">
              <Tag size={12} />
              {task.category}
            </span>
          </div>
        </div>
      </div>

      <div className="task-row__meta">
        <PriorityBadge priority={task.priority} />

        <span className={`status-pill ${statusInfo.className}`}>
          {statusInfo.label}
        </span>

        <div className="task-row__due" title="Prazo de entrega">
          <Calendar size={13} />
          <span>{formatDueDate(task.dueDate)}</span>
        </div>

        <div className="task-row__actions">
          <button
            type="button"
            className="icon-action-btn"
            onClick={() => onEdit(task)}
            title="Editar tarefa"
            aria-label={`Editar ${task.title}`}
          >
            <Edit3 size={15} />
          </button>
          <button
            type="button"
            className="icon-action-btn icon-action-btn--danger"
            onClick={() => onDelete(task.id)}
            title="Excluir tarefa"
            aria-label={`Excluir ${task.title}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
