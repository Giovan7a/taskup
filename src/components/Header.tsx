import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Plus, Menu, Calendar, CheckCheck } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const {
    user,
    stats,
    globalSearch,
    setGlobalSearch,
    openCreateModal,
  } = useTasks();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (value: string) => {
    setGlobalSearch(value);
    if (
      value.trim().length > 0 &&
      location.pathname !== '/tarefas' &&
      location.pathname !== '/kanban' &&
      location.pathname !== '/dashboard'
    ) {
      navigate('/tarefas');
    }
  };

  const unreadCount = notificationsRead ? 0 : stats.highPriorityCount;

  return (
    <header className="header">
      <div className="header__left">
        <button
          type="button"
          className="header__menu-btn"
          onClick={onOpenMobileMenu}
          aria-label="Abrir menu lateral"
        >
          <Menu size={20} />
        </button>

        <div className="header__greeting">
          <div className="header__title-row">
            <h1 className="header__title">Olá, {user.name}!</h1>
            <span className="header__date-pill">
              <Calendar size={13} />
              <span>Sprint Ativa</span>
            </span>
          </div>
          <p className="header__subtitle">
            Organize. Priorize. Conclua. — Você tem{' '}
            <strong>{stats.pending}</strong> tarefas pendentes e{' '}
            <strong>{stats.inProgress}</strong> em andamento.
          </p>
        </div>
      </div>

      <div className="header__right">
        <div className="header__search-container">
          <SearchBar
            value={globalSearch}
            onChange={handleSearchChange}
            placeholder="Pesquisar tarefas (⌘K)..."
          />
        </div>

        <button
          type="button"
          className="header__new-btn"
          onClick={() => openCreateModal('pendente')}
        >
          <Plus size={16} strokeWidth={2.4} />
          <span>Nova tarefa</span>
        </button>

        <div className="header__notif-wrapper">
          <button
            type="button"
            className="header__icon-btn"
            onClick={() => setShowNotifications((prev) => !prev)}
            aria-label="Notificações"
            title="Notificações"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="header__notification-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notif-popover">
              <div className="notif-popover__header">
                <strong>Notificações</strong>
                <button
                  type="button"
                  className="notif-popover__mark"
                  onClick={() => setNotificationsRead(true)}
                >
                  <CheckCheck size={14} />
                  <span>Marcar lidas</span>
                </button>
              </div>
              <div className="notif-popover__list">
                <div className="notif-popover__item">
                  <span className="notif-popover__dot notif-popover__dot--high" />
                  <div>
                    <p>
                      Você possui{' '}
                      <strong>{stats.highPriorityCount} tarefas</strong> de alta
                      prioridade na sprint.
                    </p>
                    <span>Atualizado agora</span>
                  </div>
                </div>
                <div className="notif-popover__item">
                  <span className="notif-popover__dot notif-popover__dot--blue" />
                  <div>
                    <p>
                      Taxa de produtividade atingiu{' '}
                      <strong>{stats.productivityRate}%</strong>.
                    </p>
                    <span>Sincronizado via LocalStorage</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="header__user" title={`${user.name} (${user.email})`}>
          <div className="header__avatar">{user.avatarInitials}</div>
        </div>
      </div>
    </header>
  );
}

