import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Kanban,
  BarChart3,
  Zap,
  ShieldCheck,
  Layers,
  Clock,
} from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

export function Home() {
  const { stats } = useTasks();

  const benefits = [
    {
      icon: Layers,
      title: 'Gestão Centralizada estilo Linear',
      description:
        'Cadastre tarefas com código único, prazos, categorias e descrições claras em uma interface rápida e sem distrações.',
    },
    {
      icon: Kanban,
      title: 'Quadro Kanban com Drag & Drop',
      description:
        'Movimente atividades entre Pendente, Em andamento e Concluído arrastando os cards ou usando ações rápidas.',
    },
    {
      icon: Zap,
      title: 'Priorização Inteligente',
      description:
        'Destaque visual imediato para entregas de Alta, Média e Baixa prioridade, mantendo o foco no que gera resultado.',
    },
    {
      icon: BarChart3,
      title: 'Relatórios e Produtividade',
      description:
        'Acompanhe gráficos de evolução semanal, taxa de conclusão em tempo real e desempenho consolidado por frente.',
    },
    {
      icon: Clock,
      title: 'Atalhos e Busca Instantânea (⌘K)',
      description:
        'Encontre qualquer tarefa em milissegundos combinando pesquisa textual com filtros avançados de status e prioridade.',
    },
    {
      icon: ShieldCheck,
      title: 'Persistência Automática LocalStorage',
      description:
        'Seus dados permanecem salvos automaticamente no navegador, garantindo continuidade imediata entre sessões.',
    },
  ];

  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="landing-nav__container">
          <div className="sidebar__brand-link">
            <div className="sidebar__logo-mark">
              <Sparkles size={18} strokeWidth={2.2} />
            </div>
            <div className="sidebar__brand-text">
              <span className="sidebar__brand-name">TaskUp</span>
              <span className="sidebar__brand-tag">SaaS Workspace</span>
            </div>
          </div>

          <nav className="landing-nav__links">
            <a href="#beneficios" className="landing-nav__link">
              Benefícios
            </a>
            <a href="#arquitetura" className="landing-nav__link">
              Fluxo de Trabalho
            </a>
            <Link to="/login" className="landing-nav__link">
              Entrar
            </Link>
            <Link to="/dashboard" className="btn-primary landing-nav__cta">
              <span>Acessar Plataforma</span>
              <ArrowRight size={15} />
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero__badge">
            <Sparkles size={14} />
            <span>TaskUp 2.0 • Gerenciador Inteligente de Tarefas</span>
          </div>

          <h1 className="landing-hero__title">
            Organize. Priorize.{' '}
            <span className="landing-hero__gradient">Conclua.</span>
          </h1>

          <p className="landing-hero__subtitle">
            A plataforma moderna inspirada no Linear, Trello e Notion para
            equipes e profissionais que buscam clareza visual, execução ágil em
            Kanban e métricas reais de produtividade.
          </p>

          <div className="landing-hero__actions">
            <Link to="/dashboard" className="landing-btn-primary">
              <span>Começar Agora no Dashboard</span>
              <ArrowRight size={17} />
            </Link>
            <Link to="/login" className="landing-btn-secondary">
              <span>Acessar Conta Demo</span>
            </Link>
          </div>

          <div className="landing-preview">
            <div className="landing-preview__window">
              <div className="landing-preview__topbar">
                <div className="landing-preview__dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="landing-preview__url">
                  app.taskup.io/dashboard
                </span>
              </div>

              <div className="landing-preview__grid">
                <div className="landing-preview__stat">
                  <span>Total no Workspace</span>
                  <strong>{stats.total} tarefas</strong>
                  <small className="landing-preview__tag--blue">
                    Sincronizado
                  </small>
                </div>
                <div className="landing-preview__stat">
                  <span>Em Andamento</span>
                  <strong>{stats.inProgress} ativas</strong>
                  <small className="landing-preview__tag--lilac">
                    Sprint #14
                  </small>
                </div>
                <div className="landing-preview__stat">
                  <span>Concluídas</span>
                  <strong>{stats.completed} entregas</strong>
                  <small className="landing-preview__tag--green">
                    +{stats.productivityRate}% eficiência
                  </small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="landing-section">
          <div className="landing-section__header">
            <span className="landing-section__eyebrow">POR QUE O TASKUP?</span>
            <h2>Projetado para alta performance e foco</h2>
            <p>
              Todos os recursos essenciais de gestão de projetos reunidos em uma
              experiência limpa, rápida e responsiva.
            </p>
          </div>

          <div className="landing-benefits-grid">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="landing-benefit-card">
                  <div className="landing-benefit-card__icon">
                    <Icon size={20} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="arquitetura" className="landing-section landing-section--alt">
          <div className="landing-cta-box">
            <div>
              <span className="landing-section__eyebrow">
                PRONTO PARA PRODUZIR MAIS?
              </span>
              <h2>Experimente o fluxo completo do TaskUp agora mesmo</h2>
              <ul className="landing-checklist">
                <li>
                  <CheckCircle2 size={16} />
                  <span>CRUD completo de tarefas com validação</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span>Quadro Kanban interativo com Drag and Drop</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span>Relatórios analíticos de produtividade</span>
                </li>
              </ul>
            </div>

            <div className="landing-cta-box__actions">
              <Link to="/dashboard" className="landing-btn-primary">
                <span>Abrir Dashboard</span>
                <ArrowRight size={17} />
              </Link>
              <Link to="/kanban" className="landing-btn-secondary">
                <span>Ver Quadro Kanban</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer__inner">
          <div className="sidebar__brand-link">
            <div className="sidebar__logo-mark">
              <Sparkles size={15} />
            </div>
            <strong>TaskUp</strong>
            <span>— Organize. Priorize. Conclua.</span>
          </div>
          <p>
            Projeto Acadêmico • Disciplina de Front-end Frameworks (React +
            TypeScript)
          </p>
        </div>
      </footer>
    </div>
  );
}
