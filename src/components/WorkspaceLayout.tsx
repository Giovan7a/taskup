import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CheckCircle2, Info, Trash2, X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { TaskModal } from './TaskModal';
import { useTasks } from '../hooks/useTasks';
import type { TaskFormData } from '../types/task';

export function WorkspaceLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const {
    isTaskModalOpen,
    editingTask,
    modalDefaultStatus,
    closeTaskModal,
    addTask,
    updateTask,
    toasts,
    dismissToast,
  } = useTasks();

  const handleSaveTask = (data: TaskFormData, editingId?: string) => {
    if (editingId) {
      updateTask(editingId, data);
    } else {
      addTask(data);
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="dashboard-workspace">
        <Header onOpenMobileMenu={() => setIsMobileSidebarOpen(true)} />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>

      <TaskModal
        key={`${editingTask?.id ?? 'new'}-${modalDefaultStatus}-${String(isTaskModalOpen)}`}
        isOpen={isTaskModalOpen}
        editingTask={editingTask}
        defaultStatus={modalDefaultStatus}
        onClose={closeTaskModal}
        onSave={handleSaveTask}
      />

      {toasts.length > 0 && (
        <div className="toast-stack" aria-live="polite">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast-item toast-item--${toast.type}`}
            >
              {toast.type === 'success' && <CheckCircle2 size={16} />}
              {toast.type === 'info' && <Info size={16} />}
              {toast.type === 'danger' && <Trash2 size={16} />}
              <span>{toast.text}</span>
              <button
                type="button"
                className="toast-item__close"
                onClick={() => dismissToast(toast.id)}
                aria-label="Fechar aviso"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
