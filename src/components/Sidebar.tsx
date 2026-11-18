import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Kanban,
  BarChart3,
  Sparkles,
  LogOut,
  Home,
  RotateCcw,
  X,
} from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

interface SidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ isOpenMobile, onCloseMobile }: SidebarProps) {
  const { stats, user, logout, restoreDemoData } = useTasks();
  const navigate = useNavigate();

  const navItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      to: '/tarefas',
      label: 'Minhas tarefas',
      icon: CheckSquare,
      badge: stats.pending,
    },
    {
      to: '/kanban',
      label: 'Quadro Kanban',
      icon: Kanban,
      badge: stats.inProgress,
    },
    {
      to: '/relatorios',
      label: 'Relatórios',
      icon: BarChart3,
    },
  ];

  const handleLogout = () => {
    logout();
    onCloseMobile();
    navigate('/login');
  };

  return (
    <>
      {isOpenMobile && (
        <div
          className="sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpenMobile ? 'sidebar--open' : ''}`}>
        <div className="sidebar__top">
          <div className="sidebar__brand">
            <NavLink
              to="/"
              className="sidebar__brand-link"
              onClick={onCloseMobile}
            >
              <div className="sidebar__logo-mark">
                <Sparkles size={18} strokeWidth={2.2} />
              </div>
              <div className="sidebar__brand-text">
                <span className="sidebar__brand-name">TaskUp</span>
                <span className="sidebar__brand-tag">
                  Organize. Priorize. Conclua.
                </span>
              </div>
            </NavLink>

            <button
              type="button"
              className="sidebar__mobile-close"
              onClick={onCloseMobile}
              aria-label="Fechar menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="sidebar__section-label">WORKSPACE</div>

          <nav className="sidebar__nav" aria-label="Navegação principal">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `sidebar__nav-item ${
                      isActive ? 'sidebar__nav-item--active' : ''
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="sidebar__nav-left">
                        <Icon
                          size={18}
                          strokeWidth={isActive ? 2.2 : 1.9}
                          className="sidebar__nav-icon"
                        />
                        <span className="sidebar__nav-label">{item.label}</span>
                      </span>

                      {item.badge !== undefined && (
                        <span
                          className={`sidebar__nav-badge ${
                            isActive ? 'sidebar__nav-badge--active' : ''
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="sidebar__section-label">ATALHOS</div>

          <div className="sidebar__nav">
            <NavLink
              to="/"
              onClick={onCloseMobile}
              className="sidebar__nav-item"
            >
              <span className="sidebar__nav-left">
                <Home size={17} className="sidebar__nav-icon" />
                <span className="sidebar__nav-label">Página Inicial</span>
              </span>
            </NavLink>

            <button
              type="button"
              className="sidebar__nav-item"
              onClick={() => {
                restoreDemoData();
                onCloseMobile();
              }}
              title="Restaurar conjunto de tarefas demonstrativas"
            >
              <span className="sidebar__nav-left">
                <RotateCcw size={17} className="sidebar__nav-icon" />
                <span className="sidebar__nav-label">Restaurar Demo</span>
              </span>
            </button>
          </div>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar__ai-banner">
            <div className="sidebar__ai-header">
              <Sparkles size={14} />
              <span>Produtividade da Sprint</span>
            </div>
            <p className="sidebar__ai-text">
              Você já concluiu <strong>{stats.productivityRate}%</strong> das
              suas tarefas cadastradas!
            </p>
          </div>

          <div className="sidebar__profile-row">
            <div className="sidebar__profile">
              <div className="sidebar__avatar">
                <span>{user.avatarInitials}</span>
                <span className="sidebar__status-dot" title="Online" />
              </div>
              <div className="sidebar__profile-info">
                <span className="sidebar__profile-name">{user.name}</span>
                <span className="sidebar__profile-role">{user.email}</span>
              </div>
            </div>

            <button
              type="button"
              className="sidebar__logout-btn"
              onClick={handleLogout}
              title="Sair da conta"
              aria-label="Sair da conta"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

