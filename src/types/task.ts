export type TaskPriority = 'alta' | 'media' | 'baixa';

export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida';

export interface Task {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  completedAt?: string;
  assignee: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
}

export interface StatIndicator {
  id: string;
  label: string;
  value: number | string;
  trend: string;
  trendPositive?: boolean;
  variant: 'total' | 'pending' | 'in_progress' | 'completed';
}

export interface WeeklyProductivityItem {
  day: string;
  completed: number;
  planned: number;
}

export interface ActivityProgressItem {
  id: string;
  name: string;
  completed: number;
  total: number;
  color: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'danger';
}

export interface TaskFilters {
  search: string;
  status: 'todas' | TaskStatus;
  priority: 'todas' | TaskPriority;
  category: string;
}

