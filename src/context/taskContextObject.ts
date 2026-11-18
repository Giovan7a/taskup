import { createContext } from 'react';
import type {
  Task,
  TaskFormData,
  TaskStatus,
  UserProfile,
  ToastMessage,
  WeeklyProductivityItem,
  ActivityProgressItem,
} from '../types/task';

export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  productivityRate: number;
  highPriorityCount: number;
  mediumPriorityCount: number;
  lowPriorityCount: number;
  highPriorityCompleted: number;
}

export interface TaskContextValue {
  tasks: Task[];
  user: UserProfile;
  isAuthenticated: boolean;
  stats: TaskStats;
  weeklyData: WeeklyProductivityItem[];
  categoryProgress: ActivityProgressItem[];
  globalSearch: string;
  setGlobalSearch: (query: string) => void;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  addTask: (data: TaskFormData) => void;
  updateTask: (id: string, data: TaskFormData) => void;
  deleteTask: (id: string) => void;
  moveTaskStatus: (id: string, status: TaskStatus) => void;
  cycleTaskStatus: (id: string) => void;
  restoreDemoData: () => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  openCreateModal: (initialStatus?: TaskStatus) => void;
  openEditModal: (task: Task) => void;
  closeTaskModal: () => void;
  isTaskModalOpen: boolean;
  editingTask: Task | null;
  modalDefaultStatus: TaskStatus;
}

export const TaskContext = createContext<TaskContextValue | undefined>(
  undefined
);
