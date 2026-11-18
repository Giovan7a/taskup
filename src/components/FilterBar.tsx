import { Filter, RotateCcw } from 'lucide-react';
import type { TaskPriority, TaskStatus } from '../types/task';

interface FilterBarProps {
  statusFilter: 'todas' | TaskStatus;
  priorityFilter: 'todas' | TaskPriority;
  categoryFilter: string;
  categories: string[];
  onStatusChange: (status: 'todas' | TaskStatus) => void;
  onPriorityChange: (priority: 'todas' | TaskPriority) => void;
  onCategoryChange: (category: string) => void;
  onReset: () => void;
  totalResults: number;
}

export function FilterBar({
  statusFilter,
  priorityFilter,
  categoryFilter,
  categories,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
  onReset,
  totalResults,
}: FilterBarProps) {
  const hasActiveFilters =
    statusFilter !== 'todas' ||
    priorityFilter !== 'todas' ||
    categoryFilter !== 'todas';

  return (
    <div className="filter-bar">
      <div className="filter-bar__group">
        <span className="filter-bar__label">
          <Filter size={14} />
          Status:
        </span>
        <div className="filter-bar__pills" role="tablist" aria-label="Filtro de status">
          {(
            [
              { id: 'todas', label: 'Todas' },
              { id: 'pendente', label: 'Pendentes' },
              { id: 'em_andamento', label: 'Em andamento' },
              { id: 'concluida', label: 'Concluídas' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              className={`filter-pill ${
                statusFilter === item.id ? 'filter-pill--active' : ''
              }`}
              onClick={() => onStatusChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-bar__controls">
        <div className="filter-bar__select-wrap">
          <label htmlFor="filter-priority">Prioridade:</label>
          <select
            id="filter-priority"
            value={priorityFilter}
            onChange={(e) =>
              onPriorityChange(e.target.value as 'todas' | TaskPriority)
            }
          >
            <option value="todas">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </div>

        <div className="filter-bar__select-wrap">
          <label htmlFor="filter-category">Categoria:</label>
          <select
            id="filter-category"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="todas">Todas</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="filter-bar__reset"
            onClick={onReset}
            title="Limpar todos os filtros"
          >
            <RotateCcw size={13} />
            <span>Limpar</span>
          </button>
        )}

        <span className="filter-bar__count">
          <strong>{totalResults}</strong>{' '}
          {totalResults === 1 ? 'tarefa' : 'tarefas'}
        </span>
      </div>
    </div>
  );
}
