import type { Task, UserProfile } from '../types/task';

const TASKS_STORAGE_KEY = '@taskup:tasks-v1';
const USER_STORAGE_KEY = '@taskup:user-v1';

export const initialDemoTasks: Task[] = [
  {
    id: 'tsk-1',
    code: 'TSK-101',
    title: 'Definir arquitetura visual e tokens do Design System',
    description:
      'Padronizar paleta de cores azul e lilás, tipografia Inter, espaçamentos e estados de foco para todos os componentes SaaS.',
    category: 'Design System',
    priority: 'alta',
    status: 'em_andamento',
    dueDate: '2026-11-18',
    createdAt: '2026-11-12',
    assignee: 'Giovanna',
  },
  {
    id: 'tsk-2',
    code: 'TSK-102',
    title: 'Implementar quadro Kanban interativo com Drag and Drop',
    description:
      'Construir as colunas Pendente, Em andamento e Concluído permitindo arrastar cards e atualizar indicadores automaticamente.',
    category: 'Frontend App',
    priority: 'alta',
    status: 'em_andamento',
    dueDate: '2026-11-19',
    createdAt: '2026-11-13',
    assignee: 'Giovanna',
  },
  {
    id: 'tsk-3',
    code: 'TSK-103',
    title: 'Revisar protótipo navegável com equipe de produto',
    description:
      'Validar fluxos de criação rápida de tarefas, atalhos de teclado e usabilidade mobile com stakeholders.',
    category: 'Pesquisa UX',
    priority: 'media',
    status: 'concluida',
    dueDate: '2026-11-16',
    createdAt: '2026-11-10',
    completedAt: '2026-11-16',
    assignee: 'Giovanna',
  },
  {
    id: 'tsk-4',
    code: 'TSK-104',
    title: 'Configurar persistência inteligente com LocalStorage',
    description:
      'Garantir que todas as operações de CRUD e movimentações do Kanban sejam salvas instantaneamente no navegador.',
    category: 'Arquitetura',
    priority: 'alta',
    status: 'concluida',
    dueDate: '2026-11-15',
    createdAt: '2026-11-11',
    completedAt: '2026-11-15',
    assignee: 'Giovanna',
  },
  {
    id: 'tsk-5',
    code: 'TSK-105',
    title: 'Criar relatórios gerenciais e métricas de produtividade',
    description:
      'Exibir taxa de conclusão semanal, distribuição por prioridade e evolução das entregas por categoria.',
    category: 'Gestão & Produto',
    priority: 'media',
    status: 'pendente',
    dueDate: '2026-11-20',
    createdAt: '2026-11-14',
    assignee: 'Giovanna',
  },
  {
    id: 'tsk-6',
    code: 'TSK-106',
    title: 'Otimizar acessibilidade e navegação por teclado (⌘K)',
    description:
      'Adicionar foco direto na barra de pesquisa via useRef, aria-labels nos botões e contraste adequado.',
    category: 'Frontend App',
    priority: 'media',
    status: 'concluida',
    dueDate: '2026-11-17',
    createdAt: '2026-11-12',
    completedAt: '2026-11-17',
    assignee: 'Giovanna',
  },
  {
    id: 'tsk-7',
    code: 'TSK-107',
    title: 'Preparar documentação acadêmica e README do projeto',
    description:
      'Detalhar tecnologias, arquitetura de pastas, lista dos 10 componentes e explicação prática dos 5 React Hooks.',
    category: 'Documentação',
    priority: 'alta',
    status: 'pendente',
    dueDate: '2026-11-21',
    createdAt: '2026-11-15',
    assignee: 'Giovanna',
  },
  {
    id: 'tsk-8',
    code: 'TSK-108',
    title: 'Mapear micro-interações e estados vazios das listagens',
    description:
      'Desenhar ilustrações minimalistas e botões de ação rápida quando filtros não retornarem tarefas.',
    category: 'Design System',
    priority: 'baixa',
    status: 'pendente',
    dueDate: '2026-11-23',
    createdAt: '2026-11-15',
    assignee: 'Giovanna',
  },
  {
    id: 'tsk-9',
    code: 'TSK-109',
    title: 'Refinar responsividade para tablets e smartphones',
    description:
      'Testar menu retrátil lateral, grids adaptativos e visualização horizontal das colunas do Kanban.',
    category: 'Frontend App',
    priority: 'baixa',
    status: 'concluida',
    dueDate: '2026-11-16',
    createdAt: '2026-11-11',
    completedAt: '2026-11-16',
    assignee: 'Giovanna',
  },
];

export const defaultDemoUser: UserProfile = {
  name: 'Giovanna',
  email: 'giovanna@taskup.app',
  role: 'Product Lead • Pro Workspace',
  avatarInitials: 'GV',
};

export function formatDueDate(dateStr: string): string {
  if (!dateStr) return 'Sem prazo';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

  const [year, month, day] = dateStr.split('-').map(Number);
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  return `${String(day).padStart(2, '0')} ${months[(month - 1) % 12]} ${year}`;
}

export const storageService = {
  getTasks(): Task[] {
    try {
      const raw = localStorage.getItem(TASKS_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(initialDemoTasks));
        return initialDemoTasks;
      }
      const parsed = JSON.parse(raw) as Task[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return initialDemoTasks;
      }
      return parsed;
    } catch {
      return initialDemoTasks;
    }
  },

  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Ignora erros de quota em modo privado
    }
  },

  resetDemoTasks(): Task[] {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(initialDemoTasks));
    return initialDemoTasks;
  },

  getUser(): UserProfile | null {
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY);
      if (!raw) return defaultDemoUser;
      return JSON.parse(raw) as UserProfile;
    } catch {
      return defaultDemoUser;
    }
  },

  saveUser(user: UserProfile | null): void {
    try {
      if (!user) {
        localStorage.removeItem(USER_STORAGE_KEY);
      } else {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
    } catch {
      // Ignora erros de armazenamento
    }
  },
};
