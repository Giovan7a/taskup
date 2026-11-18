import { useState, useMemo } from 'react';
import { Plus, CheckSquare, Inbox } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { TaskCard } from '../components/TaskCard';
import type { TaskPriority, TaskStatus } from '../types/task';

export function MyTasks() {
  const {
    tasks,
    globalSearch,
    setGlobalSearch,
    cycleTaskStatus,
    openCreateModal,
    openEditModal,
    deleteTask,
  } = useTasks();

  const [statusFilter, setStatusFilter] = useState<'todas' | TaskStatus>(
    'todas'
  );
  const [priorityFilter, setPriorityFilter] = useState<'todas' | TaskPriority>(
    'todas'
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');

  const categories = useMemo(() => {
    const set = new Set<string>(tasks.map((t) => t.category));
    return Array.from(set);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !q ||
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q) ||
        task.code.toLowerCase().includes(q) ||
        task.category.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'todas' || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'todas' || task.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === 'todas' || task.category === categoryFilter;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesCategory
      );
    });
  }, [tasks, globalSearch, statusFilter, priorityFilter, categoryFilter]);

  const handleResetFilters = () => {
    setGlobalSearch('');
    setStatusFilter('todas');
    setPriorityFilter('todas');
    setCategoryFilter('todas');
  };

  return (
    <div className="page-stack">
      <section className="page-hero-bar">
        <div>
          <div className="page-hero-bar__title-row">
            <CheckSquare size={20} className="page-hero-bar__icon" />
            <h2>Minhas Tarefas</h2>
          </div>
          <p>
            Gerencie todo o ciclo de vida das suas atividades: crie, edite,
            priorize e acompanhe prazos.
          </p>
        </div>

        <div className="page-hero-bar__actions">
          <SearchBar
            value={globalSearch}
            onChange={setGlobalSearch}
            placeholder="Filtrar por título, descrição ou código..."
            enableShortcut={false}
          />
          <button
            type="button"
            className="btn-primary page-hero-bar__btn"
            onClick={() => openCreateModal('pendente')}
          >
            <Plus size={16} />
            <span>Adicionar Tarefa</span>
          </button>
        </div>
      </section>

      <FilterBar
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        categoryFilter={categoryFilter}
        categories={categories}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onCategoryChange={setCategoryFilter}
        onReset={handleResetFilters}
        totalResults={filteredTasks.length}
      />

      <section className="panel">
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">
                <Inbox size={26} />
              </div>
              <h3>Nenhuma tarefa encontrada</h3>
              <p>
                Não encontramos tarefas com os filtros atuais. Limpe os filtros
                ou cadastre uma nova atividade.
              </p>
              <div className="empty-state__actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleResetFilters}
                >
                  Limpar filtros
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => openCreateModal('pendente')}
                >
                  <Plus size={15} />
                  <span>Nova tarefa</span>
                </button>
              </div>
            </div>
          ) : (
            filteredTasks.map((task) => (
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
    </div>
  );
}
