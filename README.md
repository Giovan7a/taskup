# 🚀 TASKUP — Gerenciador Inteligente de Tarefas

> **Slogan:** *Organize. Priorize. Conclua.*

Projeto final desenvolvido para a disciplina de **Front-end Frameworks**, apresentando uma plataforma web moderna, minimalista e responsiva para gerenciamento inteligente de tarefas, inspirada em produtos de referência como **Linear**, **Trello** e **Notion**.

Nome:Giovanna Rodrigues Oliveira - 01801509
---

## 📋 1. Descrição do Projeto

O **TaskUp** foi concebido para solucionar a desorganização no acompanhamento de demandas diárias e sprints acadêmicas ou corporativas. A aplicação oferece um fluxo integrado onde o usuário pode:
- Cadastrar, editar, concluir e excluir tarefas (**CRUD completo**);
- Classificar demandas por **Prioridade** (*Alta*, *Média*, *Baixa*), **Status** (*Pendente*, *Em andamento*, *Concluída*) e **Categoria**;
- Movimentar tarefas visualmente em um **Quadro Kanban interativo com Drag and Drop**;
- Acompanhar métricas consolidadas em tempo real nos painéis de **Dashboard** e **Relatórios**;
- Persistir automaticamente todas as alterações no navegador via **LocalStorage**.

---

## 🛠️ 2. Tecnologias Utilizadas

| Tecnologia | Finalidade no Projeto |
| :--- | :--- |
| **React.js (v19)** | Biblioteca principal para construção da interface baseada em componentes e hooks. |
| **TypeScript** | Tipagem estática rigorosa de dados, contratos de componentes (`Props`) e estados do contexto. |
| **Vite** | Bundler e servidor de desenvolvimento ultrarrápido com suporte nativo a ES Modules e HMR. |
| **React Router DOM (v7)** | Roteamento SPA declarativo entre as 6 páginas da aplicação (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Outlet`). |
| **CSS3 Moderno** | Estilização modular com Custom Properties (variáveis CSS), Flexbox, CSS Grid e responsividade mobile-first. |
| **Lucide React** | Biblioteca de ícones vetoriais minimalistas consistentes com a identidade SaaS. |
| **LocalStorage API** | Persistência local automática de tarefas e sessão do usuário no navegador. |

---

## ⚙️ 3. Instruções para Instalação e Execução

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes padrão)

### Passo a passo

```bash
# 1. Acesse o diretório da aplicação
cd taskup

# 2. Instale as dependências do projeto
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Para gerar a versão otimizada de produção (verifica tipos TypeScript + build)
npm run build
```

Após iniciar com `npm run dev`, abra o navegador no endereço exibido no terminal (por padrão `http://localhost:5173` ou `http://localhost:5174`).

---

## 🗂️ 4. Arquitetura e Organização de Pastas

```text
taskup/
└── src/
    ├── components/         # 11 Componentes funcionais reutilizáveis e tipados
    │   ├── FilterBar.tsx
    │   ├── Header.tsx
    │   ├── KanbanColumn.tsx
    │   ├── PriorityBadge.tsx
    │   ├── ProgressChart.tsx
    │   ├── SearchBar.tsx
    │   ├── Sidebar.tsx
    │   ├── StatCard.tsx
    │   ├── TaskCard.tsx
    │   ├── TaskModal.tsx
    │   └── WorkspaceLayout.tsx
    ├── context/            # Gerenciamento de estado global da aplicação
    │   └── TaskContext.tsx
    ├── hooks/              # Hooks customizados para consumo do contexto
    │   └── useTasks.ts
    ├── pages/              # As 6 páginas obrigatórias da aplicação
    │   ├── Home.tsx
    │   ├── Login.tsx
    │   ├── Dashboard.tsx
    │   ├── MyTasks.tsx
    │   ├── KanbanBoard.tsx
    │   └── Reports.tsx
    ├── routes/             # Configuração de rotas com React Router DOM
    │   └── AppRoutes.tsx
    ├── services/           # Serviço de persistência em LocalStorage e dados demo
    │   └── storageService.ts
    ├── styles/             # Folhas de estilo organizadas do Design System
    │   └── dashboard.css
    └── types/              # Interfaces e tipos TypeScript globais
        └── task.ts
```

---

## 🧩 5. Lista dos Componentes Funcionais

1. **`Sidebar` (`src/components/Sidebar.tsx`)**: Menu de navegação lateral responsivo com links ativos (`NavLink`), contadores dinâmicos de tarefas pendentes/em andamento, atalho para restaurar dados demonstrativos e perfil do usuário no rodapé.
2. **`Header` (`src/components/Header.tsx`)**: Barra superior com saudação personalizada, resumo da sprint, barra de pesquisa global, botão de criação rápida de tarefa e popover interativo de notificações.
3. **`TaskCard` (`src/components/TaskCard.tsx`)**: Componente versátil com variantes para lista (`row`) e quadro (`kanban`), exibindo código, título, descrição, categoria, prazo formatado, `PriorityBadge`, ações de editar/excluir e suporte a eventos de *Drag & Drop*.
4. **`TaskModal` (`src/components/TaskModal.tsx`)**: Modal de criação e edição de tarefas com validação de campos obrigatórios, seleção de prioridade, status, categoria e prazo.
5. **`PriorityBadge` (`src/components/PriorityBadge.tsx`)**: Badge semântico reutilizável que identifica visualmente prioridades *Alta* (vermelho), *Média* (lilás) e *Baixa* (azul).
6. **`KanbanColumn` (`src/components/KanbanColumn.tsx`)**: Coluna interativa do quadro Kanban com suporte a eventos `onDragOver` e `onDrop`, destaque visual durante o arraste, contador de itens e estado vazio.
7. **`StatCard` (`src/components/StatCard.tsx`)**: Card de indicador numérico (KPI) com ícone temático, valor principal e indicador de tendência.
8. **`ProgressChart` (`src/components/ProgressChart.tsx`)**: Componente gráfico com modo de produtividade semanal (barras comparativas planejadas vs. concluídas) e modo de progresso geral (anel SVG gradiente + barras por categoria).
9. **`SearchBar` (`src/components/SearchBar.tsx`)**: Campo de busca reutilizável com atalho global de teclado (`⌘K` / `Ctrl+K`) e limpeza rápida.
10. **`FilterBar` (`src/components/FilterBar.tsx`)**: Barra de filtragem combinada por status, prioridade e categoria, com contador de resultados e botão para resetar filtros.
11. **`WorkspaceLayout` (`src/components/WorkspaceLayout.tsx`)**: Layout estrutural que integra `Sidebar`, `Header`, `Outlet` das rotas internas, `TaskModal` global e pilha de notificações *Toast*.

---

## 🪝 6. Explicação dos Hooks Utilizados

Todos os 5 hooks obrigatórios do React foram empregados de maneira real e funcional:

- **`useState`**:
  - Gerencia a lista principal de tarefas, perfil do usuário, busca global, notificações *Toast* e estado de abertura do modal em `TaskContext.tsx`.
  - Controla os campos e mensagens de validação dos formulários em `TaskModal.tsx` e `Login.tsx`.
  - Controla os filtros ativos em `MyTasks.tsx` e `KanbanBoard.tsx`, além do destaque de *drag-over* em `KanbanColumn.tsx`.
- **`useEffect`**:
  - Sincroniza automaticamente a lista de tarefas e os dados do usuário com o `localStorage` sempre que ocorrem alterações (`TaskContext.tsx`).
  - Registra o *listener* global de teclado para o atalho `Ctrl+K` / `⌘K` em `SearchBar.tsx`.
  - Preenche os dados de edição e aplica foco automático no campo principal ao abrir `TaskModal.tsx` e `Login.tsx`.
- **`useContext`**:
  - Compartilha o estado global de tarefas, estatísticas e métodos de CRUD para todas as páginas e componentes através do hook customizado `useTasks()` (`src/hooks/useTasks.ts`), evitando *prop drilling*.
- **`useMemo`**:
  - Calcula em tempo real os indicadores de produtividade (`total`, `pending`, `inProgress`, `completed`, `productivityRate`), o progresso por categoria e a evolução semanal em `TaskContext.tsx`.
  - Otimiza a filtragem combinada de tarefas e o agrupamento das colunas em `Dashboard.tsx`, `MyTasks.tsx`, `KanbanBoard.tsx` e `Reports.tsx`.
- **`useRef`**:
  - Manipula diretamente a referência DOM do input de busca em `SearchBar.tsx` para focar e selecionar o texto ao pressionar `⌘K` ou limpar a busca.
  - Aplica foco automático no input de título em `TaskModal.tsx` e no campo de e-mail em `Login.tsx` quando há erro de validação ou abertura de tela.

---

## 👥 7. Identificação dos Integrantes e Divisão de Responsabilidades

> *(Campos editáveis — preencha com os dados finais da equipe)*

| Nome Completo | Matrícula / RA | Papel / Responsabilidade Principal |

| **Giovanna Rodrigues** | `[01801509]` | Arquitetura React/TypeScript, Dashboard, Context API e Design System, Páginas Minhas Tarefas, Modal de CRUD, Validação de Formulários e Filtros, Quadro Kanban (Drag & Drop), Relatórios Analíticos, Rotas e Documentação |

### Divisão Detalhada das Entregas
1. **Arquitetura e Estado Global**: Modelagem TypeScript (`types/task.ts`), persistência (`services/storageService.ts`) e Contexto (`context/TaskContext.tsx`).
2. **Interface Pública e Autenticação**: Desenvolvimento da `Home` (Landing Page) e `Login` com validação de credenciais e modo demonstração.
3. **Gestão Operacional e Visual**: Construção do `Dashboard`, `MyTasks` (CRUD + filtros) e `KanbanBoard` (Drag & Drop entre colunas).
4. **Métricas e Qualidade**: Desenvolvimento da página `Reports`, gráficos de prioridade/produtividade e revisão de responsividade.

---

## 🖼️ 8. Prints das Telas Principais


1. **Página Inicial (Home — `/`)**
   - `![Tela Home](<img width="1360" height="616" alt="WhatsApp Image 2026-11-19 at 23 15 41" src="https://github.com/user-attachments/assets/9eea5af9-4b25-4c5a-9377-d9fec290d31c" />
 )`
2. **Tela de Login (`/login`)**
   - `![Tela Login(<img width="1357" height="614" alt="WhatsApp Image 2026-11-19 at 23 02 28" src="https://github.com/user-attachments/assets/6ed38471-3865-4897-9d74-e83e3ab45395" />)`
3. **Dashboard Principal (`/dashboard`)**
   - `![Tela Dashboard](<img width="1360" height="617" alt="WhatsApp Image 2026-11-19 at 22 56 52" src="https://github.com/user-attachments/assets/96f424b3-5a1b-4f23-ba20-7291980ffb2e" />
 )`
4. **Minhas Tarefas — CRUD e Filtros (`/tarefas`)**
   - `![Tela Minhas Tarefas](<img width="1362" height="615" alt="WhatsApp Image 2026-11-19 at 22 57 28" src="https://github.com/user-attachments/assets/d6f67bcf-337e-4107-8d30-93f5c43152dc" />)`
5. **Quadro Kanban com Drag & Drop (`/kanban`)**
   - `![Tela Quadro Kanban](<img width="1364" height="612" alt="WhatsApp Image 2026-11-19 at 23 01 00" src="https://github.com/user-attachments/assets/fbdda2dc-6574-4ac1-863e-e856b6557b67" />
)`
6. **Relatórios e Produtividade (`/relatorios`)**
   - `![Tela Relatórios](<img width="1363" height="611" alt="WhatsApp Image 2026-11-19 at 23 01 35" src="https://github.com/user-attachments/assets/6df019f8-fda0-4b90-bad8-e99f33ca5814" />
)`

---


Desenvolvido com foco em excelência visual e engenharia de software para a disciplina de **Front-end Frameworks**.
