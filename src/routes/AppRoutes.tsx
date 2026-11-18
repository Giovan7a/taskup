import { Routes, Route, Navigate } from 'react-router-dom';
import { WorkspaceLayout } from '../components/WorkspaceLayout';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { MyTasks } from '../pages/MyTasks';
import { KanbanBoard } from '../pages/KanbanBoard';
import { Reports } from '../pages/Reports';

export function AppRoutes() {
  return (
    <Routes>
      {/* Páginas Públicas / Apresentação */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Workspace SaaS com Sidebar e Header */}
      <Route element={<WorkspaceLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tarefas" element={<MyTasks />} />
        <Route path="/kanban" element={<KanbanBoard />} />
        <Route path="/relatorios" element={<Reports />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
