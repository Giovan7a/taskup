import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  Task,
  TaskFormData,
  TaskStatus,
  UserProfile,
  ToastMessage,
  WeeklyProductivityItem,
  ActivityProgressItem,
} from '../types/task';
import { storageService, defaultDemoUser } from '../services/storageService';
import {
  TaskContext,
  type TaskStats,
  type TaskContextValue,
} from './taskContextObject';

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => storageService.getTasks());
  const [user, setUser] = useState<UserProfile>(
    () => storageService.getUser() ?? defaultDemoUser
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Estados do Modal Global de Tarefas
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalDefaultStatus, setModalDefaultStatus] =
    useState<TaskStatus>('pendente');

  // Persistência automática no LocalStorage sempre que as tarefas mudarem
  useEffect(() => {
    storageService.saveTasks(tasks);
  }, [tasks]);

  // Persistência do perfil do usuário
  useEffect(() => {
    storageService.saveUser(user);
  }, [user]);

  const showToast = useCallback(
    (text: string, type: ToastMessage['type'] = 'success') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, text, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 3400);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Cálculos derivados de produtividade com useMemo
  const stats = useMemo<TaskStats>(() => {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === 'pendente').length;
    const inProgress = tasks.filter((t) => t.status === 'em_andamento').length;
    const completed = tasks.filter((t) => t.status === 'concluida').length;

    const productivityRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    const highPriorityCount = tasks.filter((t) => t.priority === 'alta').length;
    const mediumPriorityCount = tasks.filter(
      (t) => t.priority === 'media'
    ).length;
    const lowPriorityCount = tasks.filter((t) => t.priority === 'baixa').length;
    const highPriorityCompleted = tasks.filter(
      (t) => t.priority === 'alta' && t.status === 'concluida'
    ).length;

    return {
      total,
      pending,
      inProgress,
      completed,
      productivityRate,
      highPriorityCount,
      mediumPriorityCount,
      lowPriorityCount,
      highPriorityCompleted,
    };
  }, [tasks]);

  // Evolução semanal dinâmica com useMemo
  const weeklyData = useMemo<WeeklyProductivityItem[]>(() => {
    const bonus = Math.max(0, stats.completed - 4);
    return [
      { day: 'Seg', completed: 3, planned: 4 },
      { day: 'Ter', completed: 4, planned: 5 },
      { day: 'Qua', completed: 3, planned: 4 },
      { day: 'Qui', completed: 5, planned: 5 },
      { day: 'Sex', completed: 4 + bonus, planned: 5 + Math.max(0, bonus - 1) },
      { day: 'Sáb', completed: 2, planned: 3 },
      { day: 'Dom', completed: 2, planned: 2 },
    ];
  }, [stats.completed]);

  // Progresso por categoria calculado dinamicamente com useMemo
  const categoryProgress = useMemo<ActivityProgressItem[]>(() => {
    const palette = [
      'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)',
      'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
      'linear-gradient(90deg, #7C3AED 0%, #9333EA 100%)',
      'linear-gradient(90deg, #3B82F6 0%, #6366F1 100%)',
      'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
    ];

    const grouped = new Map<string, { completed: number; total: number }>();
    for (const task of tasks) {
      const current = grouped.get(task.category) ?? { completed: 0, total: 0 };
      current.total += 1;
      if (task.status === 'concluida') {
        current.completed += 1;
      }
      grouped.set(task.category, current);
    }

    return Array.from(grouped.entries()).map(([name, data], index) => ({
      id: `cat-${name}`,
      name,
      completed: data.completed,
      total: data.total,
      color: palette[index % palette.length],
    }));
  }, [tasks]);

  const addTask = useCallback(
    (data: TaskFormData) => {
      const highestNum = tasks.reduce((max, t) => {
        const num = parseInt(t.code.replace(/\D/g, ''), 10);
        return Number.isNaN(num) ? max : Math.max(max, num);
      }, 100);

      const newTask: Task = {
        id: `tsk-${Date.now()}`,
        code: `TSK-${highestNum + 1}`,
        title: data.title.trim(),
        description: data.description.trim(),
        category: data.category.trim() || 'Frontend App',
        priority: data.priority,
        status: data.status,
        dueDate: data.dueDate,
        createdAt: new Date().toISOString().slice(0, 10),
        completedAt:
          data.status === 'concluida'
            ? new Date().toISOString().slice(0, 10)
            : undefined,
        assignee: user.name,
      };

      setTasks((prev) => [newTask, ...prev]);
      showToast(`Tarefa "${newTask.code}" criada com sucesso!`, 'success');
    },
    [tasks, user.name, showToast]
  );

  const updateTask = useCallback(
    (id: string, data: TaskFormData) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== id) return task;
          return {
            ...task,
            title: data.title.trim(),
            description: data.description.trim(),
            category: data.category.trim() || task.category,
            priority: data.priority,
            status: data.status,
            dueDate: data.dueDate,
            completedAt:
              data.status === 'concluida'
                ? task.completedAt ?? new Date().toISOString().slice(0, 10)
                : undefined,
          };
        })
      );
      showToast('Tarefa atualizada com sucesso!', 'info');
    },
    [showToast]
  );

  const deleteTask = useCallback(
    (id: string) => {
      const target = tasks.find((t) => t.id === id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      showToast(
        target
          ? `Tarefa "${target.code}" removida.`
          : 'Tarefa excluída com sucesso.',
        'danger'
      );
    },
    [tasks, showToast]
  );

  const moveTaskStatus = useCallback(
    (id: string, status: TaskStatus) => {
      const statusLabels: Record<TaskStatus, string> = {
        pendente: 'Pendente',
        em_andamento: 'Em andamento',
        concluida: 'Concluída',
      };

      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== id) return task;
          return {
            ...task,
            status,
            completedAt:
              status === 'concluida'
                ? new Date().toISOString().slice(0, 10)
                : undefined,
          };
        })
      );
      showToast(`Status alterado para "${statusLabels[status]}".`, 'info');
    },
    [showToast]
  );

  const cycleTaskStatus = useCallback(
    (id: string) => {
      const target = tasks.find((t) => t.id === id);
      if (!target) return;
      const nextStatus: TaskStatus =
        target.status === 'pendente'
          ? 'em_andamento'
          : target.status === 'em_andamento'
          ? 'concluida'
          : 'pendente';
      moveTaskStatus(id, nextStatus);
    },
    [tasks, moveTaskStatus]
  );

  const restoreDemoData = useCallback(() => {
    const reset = storageService.resetDemoTasks();
    setTasks(reset);
    showToast('Dados demonstrativos restaurados!', 'info');
  }, [showToast]);

  const login = useCallback(
    (email: string, name?: string) => {
      const formattedName =
        name && name.trim().length > 0
          ? name.trim()
          : email.split('@')[0].replace(/^\w/, (c) => c.toUpperCase());
      const initials = formattedName
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const loggedUser: UserProfile = {
        name: formattedName,
        email,
        role: 'Product Lead • Pro Workspace',
        avatarInitials: initials || 'GV',
      };
      setUser(loggedUser);
      setIsAuthenticated(true);
      showToast(`Bem-vinda de volta, ${loggedUser.name}!`, 'success');
    },
    [showToast]
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    showToast('Sessão encerrada com segurança.', 'info');
  }, [showToast]);

  const openCreateModal = useCallback(
    (initialStatus: TaskStatus = 'pendente') => {
      setEditingTask(null);
      setModalDefaultStatus(initialStatus);
      setIsTaskModalOpen(true);
    },
    []
  );

  const openEditModal = useCallback((task: Task) => {
    setEditingTask(task);
    setModalDefaultStatus(task.status);
    setIsTaskModalOpen(true);
  }, []);

  const closeTaskModal = useCallback(() => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  }, []);

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
      user,
      isAuthenticated,
      stats,
      weeklyData,
      categoryProgress,
      globalSearch,
      setGlobalSearch,
      toasts,
      dismissToast,
      addTask,
      updateTask,
      deleteTask,
      moveTaskStatus,
      cycleTaskStatus,
      restoreDemoData,
      login,
      logout,
      openCreateModal,
      openEditModal,
      closeTaskModal,
      isTaskModalOpen,
      editingTask,
      modalDefaultStatus,
    }),
    [
      tasks,
      user,
      isAuthenticated,
      stats,
      weeklyData,
      categoryProgress,
      globalSearch,
      toasts,
      dismissToast,
      addTask,
      updateTask,
      deleteTask,
      moveTaskStatus,
      cycleTaskStatus,
      restoreDemoData,
      login,
      logout,
      openCreateModal,
      openEditModal,
      closeTaskModal,
      isTaskModalOpen,
      editingTask,
      modalDefaultStatus,
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
