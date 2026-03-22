export type AppStatus = 'live' | 'beta' | 'coming-soon';
export type AppCategory = 'auth' | 'productivity' | 'finance' | 'tools';

export interface AppData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  benefit?: string;
  category: AppCategory;
  status: AppStatus;
  icon: string;          // emoji or icon name
  gradient: string;      // tailwind gradient classes
  tech: string[];
  features: string[];
  demoUrl?: string;
  sourceUrl?: string;
  docsUrl?: string;
  featured?: boolean;
}

export const apps: AppData[] = [
  {
    slug: 'auth-saas',
    name: 'AuthSaas',
    tagline: 'Production auth infrastructure — drop it in, ship faster',
    description:
      'A fully self-hosted, multi-tenant authentication service. Register as a developer, create an app, get a clientId, and your users can register and log in within minutes. Handles JWT rotation, RBAC, email verification, brute-force protection, audit logs, and session management — so you never have to build auth again.',
    benefit: 'Skip 2–4 weeks of auth boilerplate. Get secure, production-grade authentication with one API call — letting you focus on your actual product.',
    category: 'auth',
    status: 'beta',
    icon: '🔐',
    gradient: 'from-violet-500 to-purple-600',
    tech: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT', 'Nodemailer'],
    features: [
      'Multi-tenant: one platform, unlimited apps',
      'JWT + rotating refresh tokens',
      'Role-based access control (RBAC)',
      'Brute-force lockout + rate limiting',
      'Email verification & password reset',
      'Session management & revocation',
      'Immutable audit log per app',
      'Content Security Policy + security headers',
      'Developer dashboard & REST API',
      'JS SDK (C# coming soon)',
    ],
    demoUrl: 'https://auth-saas.royalda.com',
    docsUrl: 'https://auth-saas.royalda.com/docs/introduction',
    sourceUrl: 'https://github.com/Krisantha-VS/AuthSaaS',
    featured: true,
  },
  {
    slug: 'task-manager',
    name: 'TaskFlow',
    tagline: 'Kanban task manager with real-time updates',
    description:
      'A full-featured task management app with drag-and-drop kanban boards, team collaboration, and priority tracking.',
    category: 'productivity',
    status: 'beta',
    icon: '📋',
    gradient: 'from-blue-500 to-cyan-500',
    tech: ['Next.js', 'TypeScript', 'PHP', 'MySQL'],
    features: [
      'Drag-and-drop kanban',
      'Multiple boards',
      'Priority & due dates',
      'AuthSaas auth',
    ],
    demoUrl: '/apps/task-manager',
  },
  {
    slug: 'expense-tracker',
    name: 'LedgerLite',
    tagline: 'Personal finance tracker with smart insights',
    description:
      'Track income, expenses, and savings goals. Visual breakdowns with category analysis and monthly summaries.',
    category: 'finance',
    status: 'coming-soon',
    icon: '💰',
    gradient: 'from-green-500 to-emerald-500',
    tech: ['Next.js', 'TypeScript', 'PHP', 'MySQL'],
    features: [
      'Income & expense tracking',
      'Category breakdown charts',
      'Monthly summaries',
      'Savings goals',
    ],
  },
  {
    slug: 'blazor-demo',
    name: 'Blazor Showcase',
    tagline: 'C# running in the browser via WebAssembly',
    description:
      'A real-world Blazor WebAssembly app demonstrating enterprise C# patterns — same stack as VarioSystems intranet — running entirely client-side.',
    category: 'tools',
    status: 'beta',
    icon: '⚡',
    gradient: 'from-pink-500 to-rose-500',
    tech: ['Blazor WASM', 'C#', '.NET 9', 'PHP', 'MySQL'],
    features: [
      'WebAssembly C# frontend',
      'Clean architecture',
      'AuthSaas C# SDK',
      'PHP REST backend',
    ],
    demoUrl: '/apps/blazor-demo',
  },
];

export const categories: { key: AppCategory | 'all'; label: string }[] = [
  { key: 'all',          label: 'All' },
  { key: 'auth',         label: 'Auth' },
  { key: 'productivity', label: 'Productivity' },
  { key: 'finance',      label: 'Finance' },
  { key: 'tools',        label: 'Tools' },
];

export const statusConfig: Record<AppStatus, { label: string; classes: string }> = {
  live:         { label: 'Live',         classes: 'bg-green-500/10 text-green-400 border-green-500/20' },
  beta:         { label: 'Beta',         classes: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  'coming-soon':{ label: 'Coming Soon',  classes: 'bg-muted text-muted-foreground border-border' },
};
