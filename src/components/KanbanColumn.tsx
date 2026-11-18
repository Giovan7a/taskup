import { useState } from 'react';
import { Plus, Inbox } from 'lucide-react';
import type { Task, TaskStatus } from '../types/task';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  subtitle: string;
  accentColor: string;
  tasks: Task[];
  onDropTask: (taskId: string, newStatus: TaskStatus) => void;
  onDragStartTask: (e: React.DragEvent<HTMLElement>, taskId: string) => void;
  onAddTaskInColumn: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onMoveStatus: (id: string, status: TaskStatus) => void;
}

export function KanbanColumn({
  status,
  title,
  subtitle,
  accentColor,
  tasks,
  onDropTask,
  onDragStartTask,
  onAddTaskInColumn,
  onEditTask,
  onDeleteTask,
  onMoveStatus,
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDropTask(taskId, status);
    }
  };

  return (
    <section
      className={`kanban-column ${isDragOver ? 'kanban-column--dragover' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label={`Coluna ${title}`}
    >
      <header className="kanban-column__header">
        <div className="kanban-column__title-row">
          <span
            className="kanban-column__dot"
            style={{ backgroundColor: accentColor }}
          />
          <h3 className="kanban-column__title">{title}</h3>
          <span className="kanban-column__count">{tasks.length}</span>
        </div>

        <button
          type="button"
          className="kanban-column__add-btn"
          onClick={() => onAddTaskInColumn(status)}
          title={`Nova tarefa em ${title}`}
          aria-label={`Nova tarefa em ${title}`}
        >
          <Plus size={16} />
        </button>
      </header>

      <p className="kanban-column__subtitle">{subtitle}</p>

      <div className="kanban-column__list">
        {tasks.length === 0 ? (
          <div className="kanban-column__empty">
            <Inbox size={22} />
            <p>Nenhuma tarefa nesta etapa</p>
            <span>Arraste um card para cá ou clique em +</span>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              variant="kanban"
              onToggleStatus={() => {}}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onMoveStatus={onMoveStatus}
              onDragStart={onDragStartTask}
            />
          ))
        )}
      </div>
    </section>
  );
}
