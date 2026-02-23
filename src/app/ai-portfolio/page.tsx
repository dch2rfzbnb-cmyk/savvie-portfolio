'use client';

import { type ReactNode } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FadeIn } from '@/components/fade-in';
import { Github, Download } from 'lucide-react';
import Link from 'next/link';

const accordionSections: Array<{
  id: string;
  title: string;
  content: ReactNode;
}> = [
  {
    id: 'resume',
    title: 'Resume',
    content: (
      <div className="space-y-4">
        <p>
          Python / AI‑разработчик с бэкграундом в управлении колл‑центром и e‑commerce. Построил и внедрил собственную CRM на Microsoft Access (VBA + SQL), IP‑телефонию и систему видеоконтроля, автоматизировал расчёт зарплат и документооборот в D&D Group. В Skladnoystol.ru отвечаю за техническое развитие: сайт на Joomla, сквозная аналитика, автоматизация складских остатков и заказов, разработка Telegram‑CRM с расчётом доставки (CDEK, Yandex Delivery). Имею фундамент по ИИ и ML (несколько курсов по нейронным сетям и машинному обучению, Python‑курс для начинающих и продвинутых) и фокус на прикладных AI‑решениях и автоматизации бизнес‑процессов.
        </p>
        <div>
          <Link
            href="/cv-savvie.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            <Download className="h-4 w-4" />
            Скачать резюме (PDF)
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: 'github',
    title: 'GitHub / Code',
    content: (
      <div className="space-y-4">
        <p>
          Основной код и проекты находятся на GitHub. Там можно найти исходный код всех описанных проектов, примеры интеграций, скрипты автоматизации и документацию.
        </p>
        <div>
          <Link
            href="https://github.com/dch2rfzbnb-cmyk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            <Github className="h-4 w-4" />
            github.com/dch2rfzbnb-cmyk
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: 'ai-projects',
    title: 'AI / Automation Projects',
    content: (
      <div className="space-y-3">
        <p>Портфолио реализованных ИИ-проектов (описание архитектуры, стек, моя роль).</p>
        <p>В рамках pet‑ и боевых проектов разработал несколько ИИ‑решений: Telegram‑ассистентов, LLM‑агентов и сервисы умного роутинга запросов. Основные направления:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>AI‑боты и ассистенты в Telegram (Metaprompt Bot) на Python + FastAPI + aiogram с интеграцией YandexGPT и OpenAI API;</li>
          <li>CRM‑боты и бизнес‑автоматизация (Nano CRM, Telegram‑CRM для e‑commerce): управление заказами, статусы, напоминания, отчёты, расчёт доставки;</li>
          <li>ETL‑скрипты и инструменты для маркетинга и e‑commerce (обработка кампаний Яндекс.Директ, конвертация CSV‑каталогов, парсинг чатов WhatsApp).</li>
        </ul>
        <p>
          Во всех проектах я отвечал за архитектуру, выбор стека, реализацию и развёртывание в Docker, а также за увязку ИИ‑логики с реальными бизнес‑процессами.
        </p>
        <div>
          <Link
            href="https://github.com/dch2rfzbnb-cmyk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            <Github className="h-4 w-4" />
            https://github.com/dch2rfzbnb-cmyk
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: 'live-demos',
    title: 'Live Demos',
    content: (
      <div className="space-y-4">
        <ul className="space-y-4">
          <li>
            <div className="space-y-1">
              <Link
                href="https://t.me/botmetapromptbot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
              >
                Metaprompt Bot
              </Link>
              <div>
                <Link
                  href="https://github.com/dch2rfzbnb-cmyk/Metaprompt-bot/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary/80 hover:underline transition-colors"
                >
                  README на GitHub
                </Link>
              </div>
            </div>
          </li>
          <li>
            <div className="space-y-1">
              <Link
                href="https://t.me/nano_crmbot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
              >
                Nano CRM Bot
              </Link>
              <div>
                <Link
                  href="https://github.com/dch2rfzbnb-cmyk/nano-crm/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary/80 hover:underline transition-colors"
                >
                  README на GitHub
                </Link>
              </div>
            </div>
          </li>
          <li>
            <div className="space-y-1">
              <Link
                href="https://site-neon-nine-46.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
              >
                Savvie Portfolio
              </Link>
              <div>
                <Link
                  href="https://github.com/dch2rfzbnb-cmyk/savvie-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary/80 hover:underline transition-colors"
                >
                  Репозиторий на GitHub
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'crm-automation',
    title: 'CRM & Business Automation',
    content: (
      <div className="space-y-4">
        <p>Примеры интеграций с CRM-системами или автоматизации бизнес-процессов.</p>
        <ul className="space-y-4">
          <li>
            <strong className="font-semibold">Nano CRM Telegram Bot.</strong> Управление заказами через Telegram: создание, поиск, изменение статусов, напоминания и ежедневные отчёты в Excel. Бот заменяет часть функций классической CRM и Excel для малого бизнеса, работает поверх SQLite и Docker.
          </li>
          <li>
            <strong className="font-semibold">Telegram‑CRM и расчёт доставки (Skladnoystol.ru).</strong> Лёгкая CRM в формате Telegram‑бота для менеджеров интернет‑магазина: заказы, статусы, комментарии и расчёт доставки в одном интерфейсе. Интеграция с внутренними данными магазина и внешними API CDEK / Yandex Delivery для автоматического подбора вариантов доставки.
          </li>
          <li>
            <strong className="font-semibold">CRM на Microsoft Access + IP‑телефония (D&D Group).</strong> Собственная CRM на MS Access с VBA и SQL, интегрированная с SIP‑телефонией и системой IP‑камер для контроля качества съемочной группы. Автоматизирован расчёт зарплаты менеджеров и отчётность, убран ручной расчёт KPI.
          </li>
          <li>
            <strong className="font-semibold">ETL для Яндекс.Директ (Yandex Direct Campaign Processor).</strong> Скрипты на Python + pandas/openpyxl для подготовки и проверки Excel‑файлов рекламных кампаний: валидация колонок, корректировка цен, очистка фраз. Это снизило количество ручных правок и ошибок при загрузке кампаний в Яндекс.Директ.
          </li>
          <li>
            <strong className="font-semibold">CSV‑конвертеры для e‑commerce (CSV Converter for E‑commerce).</strong> Автоматическая конвертация и миграция каталогов между форматами Phoca/VirtueMart и HikaShop (категории, изображения, атрибуты). Упростила перенос данных между CMS и обновление ассортимента без ручной работы.
          </li>
          <li>
            <strong className="font-semibold">Парсер чатов WhatsApp (WhatsApp Chat Parser).</strong> Парсинг экспортированных чатов WhatsApp в структурированный CSV для дальнейшей обработки заказов и анализа коммуникаций. Используются регулярные выражения и стандартизированный формат для последующего ETL.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'llm-experience',
    title: 'LLM Experience',
    content: (
      <div className="space-y-4">
        <p>
          Работаю с LLM в продакшн‑задачах: использую YandexGPT и OpenAI API для построения ассистентов, интеллектуальных ботов и систем роутинга запросов. В проектах Metaprompt Router Bot и AI‑ботах для автоматизации реализовал промпт‑инжинирию, классификацию задач через LLM и трёхуровневую архитектуру промптов (роль, тип мышления, техника). Использую LLM не только как «генератор текста», но и как часть бизнес‑логики: для маршрутизации запросов, нормализации данных, генерации ответов под конкретные сценарии и домены.
        </p>
        <p>
          Понимаю ограничения моделей (галлюцинации, чувствительность к формулировкам, стоимость, латентность) и решаю их через явные схемы промптинга, валидацию данных (Pydantic), пост‑обработку и логи/мониторинг. Сейчас развиваю стек вокруг FastAPI + Docker + Telegram Bot API для создания LLM‑агентов и интеграции их с внешними сервисами (CRM, службы доставки, внутренние базы).
        </p>
      </div>
    ),
  },
  {
    id: 'professional-links',
    title: 'Professional Profile / Links',
    content: (
      <div className="space-y-3">
        <div>
          <span className="font-medium">Portfolio site: </span>
          <Link
            href="https://site-neon-nine-46.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            https://site-neon-nine-46.vercel.app/
          </Link>
        </div>
        <div>
          <span className="font-medium">GitHub: </span>
          <Link
            href="https://github.com/dch2rfzbnb-cmyk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            https://github.com/dch2rfzbnb-cmyk
          </Link>
        </div>
        <div>
          <span className="font-medium">Telegram: </span>
          <Link
            href="https://t.me/savviest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            @savviest
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: 'complex-projects',
    title: 'Complex Projects',
    content: (
      <div className="space-y-4">
        <div>
          <strong className="font-semibold">Metaprompt Router Bot (LLM‑роутер промптов).</strong>
          <p className="mt-1">
            Построил систему, которая маршрутизирует задачи пользователей к оптимальным промптам и «ролям» вместо одного универсального запроса. Архитектура: Telegram‑бот + FastAPI‑backend, трёхуровневая модель промптов (роль, тип мышления, техника), YandexGPT как движок классификации и генерации, хранение промптов в CSV через Pydantic‑модели, всё в Docker. Сложность была в проектировании схемы ролей/метапромптов и устойчивых промптов под LLM, а также в увязке этого с бизнес‑логикой и API.
          </p>
        </div>
        <div>
          <strong className="font-semibold">Nano CRM Telegram Bot.</strong>
          <p className="mt-1">
            Реализовал CRM как Telegram‑бот для малого бизнеса: заказы, статусы, напоминания, ежедневные Excel‑отчёты, всё в одном интерфейсе. Архитектура: Python + aiogram, aiosqlite, openpyxl, асинхронные планировщики задач, Docker. Сложность — в корректной работе асинхронных задач (напоминания/отчёты), согласованности операций с БД и устойчивости бота под рост количества заказов.
          </p>
        </div>
        <div>
          <strong className="font-semibold">Savvie Portfolio (Next.js‑портфолио с интерактивным UI).</strong>
          <p className="mt-1">
            Сделал персональный сайт‑портфолио с упором на визуал и удобную навигацию по проектам и стеку. Архитектура: Next.js 15 (App Router) + React + TypeScript, Tailwind CSS и shadcn/ui, анимации и матричный фон через Canvas API, деплой на Vercel. Сложность была в сочетании анимированного интерфейса с хорошей читаемостью контента, оптимизации производительности и адаптивности под разные устройства.
          </p>
        </div>
      </div>
    ),
  },
];

export default function AIPortfolio() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-28 md:pt-0">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <FadeIn>
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                  AI / Automation Portfolio
                </h1>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Коллекция проектов по автоматизации и работе с искусственным интеллектом.
                  <br />
                  Решения для бизнеса, интеграции и AI-агенты.
                </p>
              </FadeIn>
              <FadeIn delay={400}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    asChild
                    variant="default"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href="https://github.com/dch2rfzbnb-cmyk"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-5 w-5" />
                      View GitHub
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary/10 hover:text-primary"
                  >
                    <Link href="/cv-savvie.pdf" target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" />
                      Download CV (PDF)
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Accordion Section */}
        <section className="w-full py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <FadeIn>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {accordionSections.map((section, index) => (
                    <AccordionItem
                      key={section.id}
                      value={section.id}
                      className="border border-primary/20 rounded-lg px-4 bg-black/40 backdrop-blur-md"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                        {section.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {section.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

