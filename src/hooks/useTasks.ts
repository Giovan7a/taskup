import { useContext } from 'react';
import {
  TaskContext,
  type TaskContextValue,
} from '../context/taskContextObject';

export function useTasks(): TaskContextValue {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks deve ser utilizado dentro de um TaskProvider');
  }
  return context;
}
