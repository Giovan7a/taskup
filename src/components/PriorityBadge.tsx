import { Flag } from 'lucide-react';
import type { TaskPriority } from '../types/task';

interface PriorityBadgeProps {
  priority: TaskPriority;
  size?: 'sm' | 'md';
}

const priorityMap: Record<
  TaskPriority,
  { label: string; className: string }
> = {
  alta: {
    label: 'Alta',
    className: 'priority-badge--high',
  },
  media: {
    label: 'Média',
    className: 'priority-badge--medium',
  },
  baixa: {
    label: 'Baixa',
    className: 'priority-badge--low',
  },
};

export function PriorityBadge({ priority, size = 'md' }: PriorityBadgeProps) {
  const config = priorityMap[priority];

  return (
    <span
      className={`priority-badge ${config.className} ${
        size === 'sm' ? 'priority-badge--sm' : ''
      }`}
    >
      <Flag size={size === 'sm' ? 10 : 11} />
      <span>{config.label}</span>
    </span>
  );
}
