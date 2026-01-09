import { Terminal, Bot, Cpu, Code, Database, GitBranch, Send, Github, MessageSquare, Cloud, HardDrive } from 'lucide-react';
import type { NavLink, Project, SkillCategory, SocialLink, SectionId, TerminalText, TerminalProjectLink, StackItem } from './types';

export const navLinks: NavLink[] = [
  { name: 'Обо мне', href: '#about' },
  { name: 'Навыки', href: '#skills' },
  { name: 'Проекты', href: '#projects' },
  { name: 'Стек', href: '#stack' },
  { name: 'Контакты', href: '#contact' },
];

export const terminalProjects: TerminalProjectLink[] = [
  {
    id: 'nano-crm',
    label: 'nano-crm (Telegram CRM)',
    asciiIcon: `  [nano-crm]
     ┌─────────────┐
     │ clients.db  │
     │ tasks.log   │
     │ tg://chat   │
     └─────────────┘`,
    href: 'https://t.me/nano_crmbot'
  },
  {
    id: 'delivery-bot',
    label: 'delivery-bot (бот расчёта доставки)',
    asciiIcon: `  [delivery-bot]
     ┌─────────────┐
     │ city -> ETA │
     │ price map   │
     │ /compare    │
     └─────────────┘`,
    href: 'https://t.me/skladnoydeliverybot'
  },
  {
    id: 'meta-prompt-bot',
    label: 'meta-prompt-bot',
    asciiIcon: `  [meta-prompt-bot]
     ┌─────────────┐
     │ /prompt     │
     │ /refactor   │
     │ /idea       │
     └─────────────┘`,
    href: 'https://t.me/botmetapromptbot'
  },
  {
    id: 'this-landing',
    label: 'this-landing (recursive entry)',
    asciiIcon: `  [this-landing]
     ┌─────────────┐
     │ terminal UI │
     │ matrix bg   │
     │ prompt-led  │
     └─────────────┘`,
    href: '/'
  }
];

export const contactLink = {
  label: 'Связаться со мной',
  handle: '@savviest',
  href: 'https://t.me/savviest',
  asciiIcon: `[contact]
   ┌─────────────┐
   │ @savviest   │
   │ open chat   │
   └─────────────┘`
};


export const terminalTexts: Record<SectionId, TerminalText> = {
  hero: {
    command: "> nano intro.txt",
    lines: ["Архитектор решений, автоматизирую рутинные задачи, превращаю хаос в систему, оптимизирую логику, снижаю количество ударов по клавиатуре =)", "// coded with cursor + gemini"]
  },
  about: {
    command: "> cat about_me.md",
    lines: [
      "Специализируюсь на Python, создании Telegram-ботов, ИИ-агентов и интеграции со сторонними API.",
      "Мой основной фокус — автоматизация бизнес-процессов.",
      "Написал себе для работы: CRM в Telegram, интеграцию с транспортными компаниями для быстрого расчета стоимости доставки, создал метапромпт-бота (пишет промпты для тебя)."
    ]
  },
  skills: {
    command: "> ls skills/",
    lines: [
      "system-thinking/",
      "python/",
      "telegram-bots/",
      "ai-agents/",
      "api-integrations/",
      "prompt-engineering/",
      "vibe-coding/",
      "yandex-cloud/",
      "raspberry-pi/"
    ]
  },
  projects: {
    command: "> ls -l projects/",
    lines: [] // This is now handled by the special case in the terminal component
  },
  stack: {
    command: "> cat stack.txt",
    lines: [
      "Python, Telegram Bot API, AI APIs",
      "HTML, CSS, JavaScript, Yandex Cloud, Raspberry Pi",
      "SQL, Docker, Git",
      "Интеграция со сторонними сервисами и API"
    ]
  },
  contact: {
    command: "> whoami && how_to_reach",
    lines: [
      "Telegram: @savviest",
      "Готов обсудить задачу, если ты любишь автоматизацию так же, как я."
    ]
  }
};


export const about = {
  title: 'Обо мне',
  description: [
    "Специализируюсь на Python, создании Telegram-ботов, ИИ-агентов и интеграции со сторонними API.",
    "Автоматизирую бизнес-процессы, строю решения, которые уменьшают ручной труд.",
    "Написал CRM в Telegram, интеграцию с транспортными компаниями для расчета доставки и метапромпт‑бота, который пишет промпты за пользователя."
  ],
  quote: 'Системно мыслю, говорю с ИИ на одном языке, промпт‑инженер от кванта.'
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Core / Engineering',
    skills: [
      'Python',
      'Telegram‑боты',
      'AI‑агенты',
      'Интеграция со сторонними сервисами и API',
      'System thinking (системное мышление)',
    ],
  },
  {
    name: 'Tools & Infra',
    skills: [
      'HTML / CSS / JavaScript',
      'SQL',
      'Docker',
      'Git',
      'Yandex Cloud',
      'Raspberry Pi',
      'Prompt‑engineering',
      'Vibe‑coding'
    ],
  },
];

export const projects: Project[] = [
  {
    title: 'nano-crm (Telegram CRM)',
    description: 'Личная CRM в Telegram для ведения задач, клиентов и сделок.',
    tags: ['Python', 'Telegram Bot API', 'SQL', 'Docker', 'Raspberry Pi'],
    url: 'https://t.me/nano_crmbot',
  },
  {
    title: 'delivery-integrator',
    description: 'Сервис для быстрого расчета стоимости доставки по API транспортных компаний (СДЭК, Деловые Линии, Яндекс Доставка).',
    tags: ['Python', 'API', 'JSON', 'Docker'],
    url: 'https://t.me/skladnoydeliverybot'
  },
  {
    title: 'meta-prompt-bot',
    description: 'Метапромпт‑бот, который пишет промпты для пользователя, помогая в работе с ИИ-моделями.',
    tags: ['Python', 'Telegram Bot API', 'LLM API', 'Prompt-engineering', 'Docker'],
    url: 'https://t.me/botmetapromptbot',
  },
  {
    title: 'this-landing',
    description: 'Этот самый лендинг. Одностраничный терминальный сайт с матричным фоном и интеграцией Telegram-ботов.',
    tags: ['Next.js', 'Tailwind CSS', 'Firebase Studio', 'Matrix UI', 'Prompt-engineering'],
    url: '/',
  },
];

export const stack: StackItem[] = [
  { name: 'Python', icon: Code },
  { name: 'Telegram Bot API', icon: Send },
  { name: 'AI / LLM APIs', icon: Cpu },
  { name: 'HTML, CSS, JS', icon: Code },
  { name: 'SQL', icon: Database },
  { name: 'Docker', icon: Terminal },
  { name: 'Git', icon: GitBranch },
  { name: 'Yandex Cloud', icon: Cloud },
  { name: 'Raspberry Pi', icon: HardDrive },
  { name: 'API Integrations', icon: Code },
  { name: 'Prompt-engineering', icon: MessageSquare },
];

export const contact = {
  title: 'Контакты',
  description: 'Если хочешь превратить хаос процессов в систему — пиши.',
  telegramUrl: 'https.t.me/savviest',
}

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: '#', icon: Github },
];

export const footerText = '© {year} nano.dev. Turning chaos into system.';
