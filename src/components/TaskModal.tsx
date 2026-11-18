import { useState, useEffect, useRef } from 'react';
import { X, PlusCircle, Edit3, AlertCircle } from 'lucide-react';
import type {
  Task,
  TaskFormData,
  TaskPriority,
  TaskStatus,
} from '../types/task';

interface TaskModalProps {
  isOpen: boolean;
  editingTask: Task | null;
  defaultStatus?: TaskStatus;
  onClose: () => void;
  onSave: (data: TaskFormData, editingId?: string) => void;
}

export function TaskModal({
  isOpen,
  editingTask,
  defaultStatus = 'pendente',
  onClose,
  onSave,
}: TaskModalProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(() => editingTask?.title ?? '');
  const [description, setDescription] = useState(
    () => editingTask?.description ?? ''
  );
  const [category, setCategory] = useState(
    () => editingTask?.category ?? 'Frontend App'
  );
  const [priority, setPriority] = useState<TaskPriority>(
    () => editingTask?.priority ?? 'media'
  );
  const [status, setStatus] = useState<TaskStatus>(
    () => editingTask?.status ?? defaultStatus
  );
  const [dueDate, setDueDate] = useState(
    () =>
      editingTask?.dueDate ??
      new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10)
  );
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      titleInputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      setError('O título da tarefa deve ter pelo menos 3 caracteres.');
      titleInputRef.current?.focus();
      return;
    }

    if (!dueDate.trim()) {
      setError('Informe um prazo válido para a tarefa.');
      return;
    }

    onSave(
      {
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
        status,
        dueDate,
      },
      editingTask?.id
    );
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <div className="modal-card__header">
          <div className="modal-card__title-wrap">
            {editingTask ? (
              <Edit3 size={18} className="modal-card__icon" />
            ) : (
              <PlusCircle size={18} className="modal-card__icon" />
            )}
            <h3 id="task-modal-title">
              {editingTask ? `Editar ${editingTask.code}` : 'Nova Tarefa'}
            </h3>
          </div>
          <button
            type="button"
            className="modal-card__close"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          {error && (
            <div className="form-alert" role="alert">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <div className="modal-form__field">
            <label htmlFor="modal-task-title">Título da tarefa *</label>
            <input
              ref={titleInputRef}
              id="modal-task-title"
              type="text"
              placeholder="Ex: Implementar autenticação e validação..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              required
            />
          </div>

          <div className="modal-form__field">
            <label htmlFor="modal-task-desc">Descrição detalhada</label>
            <textarea
              id="modal-task-desc"
              rows={3}
              placeholder="Contexto, critérios de aceitação ou subtarefas..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="modal-form__row">
            <div className="modal-form__field">
              <label htmlFor="modal-task-category">Categoria / Frente</label>
              <select
                id="modal-task-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Design System">Design System</option>
                <option value="Frontend App">Frontend App</option>
                <option value="Pesquisa UX">Pesquisa UX</option>
                <option value="Arquitetura">Arquitetura</option>
                <option value="Gestão & Produto">Gestão & Produto</option>
                <option value="Documentação">Documentação</option>
              </select>
            </div>

            <div className="modal-form__field">
              <label htmlFor="modal-task-due">Prazo de entrega *</label>
              <input
                id="modal-task-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-form__row">
            <div className="modal-form__field">
              <label htmlFor="modal-task-priority">Prioridade</label>
              <select
                id="modal-task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
              >
                <option value="alta">Alta prioridade</option>
                <option value="media">Média prioridade</option>
                <option value="baixa">Baixa prioridade</option>
              </select>
            </div>

            <div className="modal-form__field">
              <label htmlFor="modal-task-status">Status atual</label>
              <select
                id="modal-task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                <option value="pendente">Pendente</option>
                <option value="em_andamento">Em andamento</option>
                <option value="concluida">Concluída</option>
              </select>
            </div>
          </div>

          <div className="modal-form__actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {editingTask ? 'Salvar alterações' : 'Criar tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
