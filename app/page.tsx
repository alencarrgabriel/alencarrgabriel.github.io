"use client"

import { useState, useEffect, useCallback } from "react"
import type { IconType } from "react-icons"
import { useLang } from "@/lib/lang"
import { posts as allPosts } from "@/lib/content"
import { getPublishedPosts, formatDate } from "@/lib/posts"
import { PostTypeBadge } from "@/components/terminal/Badge"
import {
  SiTypescript, SiNodedotjs, SiExpress, SiPostgresql, SiRedis, SiDocker,
  SiPix, SiCaddy, SiSentry, SiNestjs, SiNextdotjs, SiPrisma, SiFlutter,
  SiDart, SiTypeorm, SiMinio, SiSocketdotio, SiFirebase, SiGithubactions,
  SiPython, SiQt, SiSqlite, SiTurborepo, SiN8N, SiWhatsapp, SiReact, SiVite,
  SiTailwindcss, SiFastapi, SiSupabase, SiStripe,
} from "react-icons/si"

// ─── Types ────────────────────────────────────────────────────────────────────

type Lang = "pt" | "en"

interface Project {
  dir: string
  status: "PROD" | "BETA" | "DONE" | "USED" | "WIP"
  desc: Record<Lang, string>
  highlights: Record<Lang, string[]>
  tags: string[]
  github: string
  live?: string
}

// ─── Tech icon map ────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, { icon: IconType; color: string }> = {
  "TypeScript":      { icon: SiTypescript,    color: "#3178C6" },
  "Node.js":         { icon: SiNodedotjs,     color: "#339933" },
  "Express":         { icon: SiExpress,       color: "#A0A0A0" },
  "PostgreSQL":      { icon: SiPostgresql,    color: "#4169E1" },
  "Redis":           { icon: SiRedis,         color: "#DC382D" },
  "Docker":          { icon: SiDocker,        color: "#2496ED" },
  "Z-API":           { icon: SiWhatsapp,      color: "#25D366" },
  "OpenPix":         { icon: SiPix,           color: "#77B6A8" },
  "Caddy":           { icon: SiCaddy,         color: "#1F88C0" },
  "Sentry":          { icon: SiSentry,        color: "#8B7CF6" },
  "NestJS":          { icon: SiNestjs,        color: "#E0234E" },
  "Next.js 15":      { icon: SiNextdotjs,     color: "#EDEDED" },
  "Prisma":          { icon: SiPrisma,        color: "#5A67D8" },
  "Flutter":         { icon: SiFlutter,       color: "#02569B" },
  "Dart":            { icon: SiDart,          color: "#0175C2" },
  "TypeORM":         { icon: SiTypeorm,       color: "#FE0902" },
  "MinIO":           { icon: SiMinio,         color: "#C72E49" },
  "PostGIS":         { icon: SiPostgresql,    color: "#4169E1" },
  "Socket.IO":       { icon: SiSocketdotio,   color: "#EDEDED" },
  "Firebase Auth":   { icon: SiFirebase,      color: "#FFCA28" },
  "GitHub Actions":  { icon: SiGithubactions, color: "#2088FF" },
  "Python":          { icon: SiPython,        color: "#3776AB" },
  "PySide6":         { icon: SiQt,            color: "#41CD52" },
  "Qt6":             { icon: SiQt,            color: "#41CD52" },
  "SQLite":          { icon: SiSqlite,        color: "#4E9CC4" },
  "Turborepo":       { icon: SiTurborepo,     color: "#EF4444" },
  "n8n":             { icon: SiN8N,           color: "#EA4B71" },
  "React":           { icon: SiReact,         color: "#61DAFB" },
  "Vite":            { icon: SiVite,          color: "#646CFF" },
  "Tailwind CSS":    { icon: SiTailwindcss,   color: "#38BDF8" },
  "FastAPI":         { icon: SiFastapi,       color: "#009688" },
  "Next.js 14":      { icon: SiNextdotjs,     color: "#EDEDED" },
  "Supabase":        { icon: SiSupabase,      color: "#3ECF8E" },
  "Stripe":          { icon: SiStripe,        color: "#635BFF" },
}

interface TerminalLine {
  text: string
  type: "cmd" | "response" | "highlight" | "sub" | "blank"
  pauseAfter: number
  speed: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    dir: "mao-na-roda/",
    status: "PROD",
    desc: {
      pt: "Chatbot WhatsApp com funil de pagamento PIX. Gerando receita recorrente.",
      en: "WhatsApp chatbot with PIX payment funnel. Generating recurring revenue.",
    },
    highlights: {
      pt: [
        "Integração com Z-API para automação total do atendimento no WhatsApp",
        "Cobranças PIX via OpenPix com webhook de confirmação em tempo real",
        "Fila de jobs em Redis para retries e processamento assíncrono",
        "Deploy em VPS com Docker + Caddy (HTTPS automático) e observabilidade via Sentry",
      ],
      en: [
        "Z-API integration for fully automated WhatsApp support flow",
        "PIX charges via OpenPix with real-time confirmation webhooks",
        "Redis-backed job queue for retries and async processing",
        "Dockerized VPS deploy behind Caddy (auto HTTPS) with Sentry observability",
      ],
    },
    tags: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Redis", "Docker", "Z-API", "OpenPix", "Caddy", "Sentry"],
    github: "https://github.com/alencarrgabriel/mao-na-roda-bot-ts",
  },
  {
    dir: "lunna/",
    status: "BETA",
    desc: {
      pt: "SaaS de agendamentos multi-tenant. Em fase final de desenvolvimento.",
      en: "Multi-tenant scheduling SaaS. Final development stage.",
    },
    highlights: {
      pt: [
        "Arquitetura multi-tenant com isolamento de dados por cliente",
        "API modular em NestJS com Prisma ORM sobre PostgreSQL",
        "Frontend em Next.js 15 (App Router) com renderização no servidor",
        "Ambiente containerizado com Docker para dev e produção",
      ],
      en: [
        "Multi-tenant architecture with per-client data isolation",
        "Modular NestJS API using Prisma ORM over PostgreSQL",
        "Next.js 15 (App Router) frontend with server-side rendering",
        "Dockerized environment for both dev and production",
      ],
    },
    tags: ["NestJS", "Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "Docker"],
    github: "",
    live: "https://app.lunnaapp.tech/",
  },
  {
    dir: "intera-edu/",
    status: "DONE",
    desc: {
      pt: "Rede social acadêmica com verificação institucional. Flutter + NestJS.",
      en: "Academic social network with institutional verification. Flutter + NestJS.",
    },
    highlights: {
      pt: [
        "Verificação institucional de usuários por e-mail acadêmico",
        "App mobile em Flutter com arquitetura escalável e testável",
        "API REST em NestJS 10 com TypeORM",
        "Armazenamento de mídia via MinIO (compatível com S3)",
      ],
      en: [
        "Institutional user verification via academic email",
        "Flutter mobile app with a scalable, testable architecture",
        "NestJS 10 REST API using TypeORM",
        "Media storage via MinIO (S3-compatible)",
      ],
    },
    tags: ["Flutter", "Dart", "NestJS 10", "TypeORM", "MinIO", "PostgreSQL", "Docker"],
    github: "https://github.com/alencarrgabriel/intera_edu",
  },
  {
    dir: "feliz-no-simples/",
    status: "DONE",
    desc: {
      pt: "App mobile + API com geolocalização, chat real-time e CI/CD.",
      en: "Mobile app + API with geolocation, real-time chat and CI/CD.",
    },
    highlights: {
      pt: [
        "Busca por proximidade com geolocalização via PostGIS",
        "Chat em tempo real entre usuários com Socket.IO",
        "Autenticação de usuários com Firebase Auth",
        "Pipeline de CI/CD automatizado com GitHub Actions",
      ],
      en: [
        "Proximity search powered by PostGIS geolocation",
        "Real-time chat between users via Socket.IO",
        "User authentication with Firebase Auth",
        "Automated CI/CD pipeline with GitHub Actions",
      ],
    },
    tags: ["Flutter", "NestJS", "PostGIS", "Socket.IO", "Firebase Auth", "GitHub Actions"],
    github: "https://github.com/alencarrgabriel",
  },
  {
    dir: "gerador-recibos/",
    status: "USED",
    desc: {
      pt: "App desktop de recibos PDF. Usado operacionalmente por uma empresa.",
      en: "PDF receipt desktop app. Used operationally by a real company.",
    },
    highlights: {
      pt: [
        "Interface desktop nativa construída com PySide6 (Qt6)",
        "Geração de PDFs formatados com ReportLab",
        "Banco de dados local em SQLite, sem dependência de servidor",
        "Em uso operacional real, no dia a dia de uma empresa",
      ],
      en: [
        "Native desktop UI built with PySide6 (Qt6)",
        "Formatted PDF generation with ReportLab",
        "Local SQLite database, no server dependency",
        "In real day-to-day operational use by a company",
      ],
    },
    tags: ["Python", "PySide6", "Qt6", "ReportLab", "SQLite"],
    github: "https://github.com/alencarrgabriel/GeradorRecibos",
  },
  {
    dir: "fiveone-platform/",
    status: "WIP",
    desc: {
      pt: "SaaS de dispositivos NFC/QR com analytics e automações. Monorepo.",
      en: "NFC/QR device management SaaS with analytics. Monorepo.",
    },
    highlights: {
      pt: [
        "Monorepo gerenciado com Turborepo (apps e libs compartilhadas)",
        "Automações de fluxo de trabalho com n8n",
        "API em NestJS + painel em Next.js 15 com Prisma",
        "Analytics de leituras NFC/QR em tempo real",
      ],
      en: [
        "Turborepo-managed monorepo (apps + shared libs)",
        "Workflow automation with n8n",
        "NestJS API + Next.js 15 dashboard with Prisma",
        "Real-time NFC/QR scan analytics",
      ],
    },
    tags: ["NestJS", "Next.js 15", "Turborepo", "Prisma", "n8n", "Docker"],
    github: "https://github.com/fiveonesolutions/platform",
  },
  {
    dir: "margemreal/",
    status: "BETA",
    desc: {
      pt: "SaaS B2B de Landed Cost para importação China → Brasil. Em produção, pré-receita.",
      en: "B2B Landed Cost SaaS for China → Brazil imports. In production, pre-revenue.",
    },
    highlights: {
      pt: [
        "Motor tributário determinístico (II→IPI→PIS→COFINS→ICMS) com Decimal puro e câmbio PTAX do Bacen",
        "Arquitetura em camadas (api/application/domain/infra) com snapshots imutáveis e auditáveis",
        "Sourcing integrado com busca de fornecedores no Alibaba (Trade Assurance, score de confiança)",
        "Backend FastAPI (Railway) + frontend Next.js 14 (Vercel), Supabase (Postgres + Auth) e Redis",
      ],
      en: [
        "Deterministic tax engine (II→IPI→PIS→COFINS→ICMS) using pure Decimal and BACEN PTAX exchange rates",
        "Layered architecture (api/application/domain/infra) with immutable, auditable snapshots",
        "Integrated sourcing with Alibaba supplier search (Trade Assurance, trust score)",
        "FastAPI backend (Railway) + Next.js 14 frontend (Vercel), Supabase (Postgres + Auth) and Redis",
      ],
    },
    tags: ["Python", "FastAPI", "Next.js 14", "Supabase", "PostgreSQL", "Redis", "Docker", "Stripe"],
    github: "",
    live: "https://margemreal.vercel.app/",
  },
  {
    dir: "star-acessoria/",
    status: "USED",
    desc: {
      pt: "Landing page para corretora de seguros. Cotação de planos de saúde via WhatsApp.",
      en: "Landing page for an insurance brokerage. Health plan quotes via WhatsApp.",
    },
    highlights: {
      pt: [
        "Página de captação de leads com CTA direto para cotação no WhatsApp",
        "SEO on-page com Google Tag Manager e Analytics configurados",
        "Design responsivo focado em conversão",
      ],
      en: [
        "Lead-capture page with a direct WhatsApp quote CTA",
        "On-page SEO with Google Tag Manager and Analytics configured",
        "Responsive, conversion-focused design",
      ],
    },
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    github: "",
    live: "https://www.staracessoria.com.br/",
  },
  {
    dir: "fisiocorpus/",
    status: "USED",
    desc: {
      pt: "Landing page para clínica de fisioterapia em Brasília. Agendamento via WhatsApp.",
      en: "Landing page for a physiotherapy clinic in Brasília. WhatsApp appointment booking.",
    },
    highlights: {
      pt: [
        "Dados estruturados (Schema.org) para SEO local de negócio",
        "Catálogo de serviços e especialidades da clínica",
        "Integração com WhatsApp para agendamento de consultas",
      ],
      en: [
        "Structured data (Schema.org) for local business SEO",
        "Service and specialty catalog for the clinic",
        "WhatsApp integration for appointment booking",
      ],
    },
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    github: "",
    live: "https://www.fisiocorpusdf.com.br/",
  },
]

const ASCII_FIRST = `                __         _      __
   ____ _____ _/ /_  _____(_)__  / /
  / __ \`/ __ \`/ __ \\/ ___/ / _ \\/ /
 / /_/ / /_/ / /_/ / /  / /  __/ /
 \\__, /\\__,_/_.___/_/  /_/\\___/_/
/____/`

const ASCII_LAST = `         __
  ____ _/ /__  ____  _________ ______
 / __ \`/ / _ \\/ __ \\/ ___/ __ \`/ ___/
/ /_/ / /  __/ / / / /__/ /_/ / /
\\__,_/_/\\___/_/ /_/\\___/\\__,_/_/`

const ABOUT: { bio: Record<Lang, string[]>; now: Record<Lang, { role: string; org: string }[]> } = {
  bio: {
    pt: [
      "Sou o Gabriel, desenvolvedor de software. Construo aplicações web, mobile e desktop, do backend ao deploy, e o que mais me interessa é fazer software que resolve problema de verdade.",
      "Estou em transição de área: quero trabalhar com hacking, pentest e bug bounty. Hoje estudo segurança do zero, com OverTheWire, PortSwigger e TryHackMe, e documento tudo em público no meu blog, em formato de relatório.",
      "Estou concluindo a graduação em Análise e Desenvolvimento de Sistemas e trabalho como assistente de T.I.",
      "Fora do código, sou hiperfocado em filosofia, história e política. Uso o blog também para treinar a escrita e a memória sobre o que eu leio.",
      "Acredito que um bom desenvolvedor entrega software que resolve problemas reais, não apenas código bem escrito.",
    ],
    en: [
      "I'm Gabriel, a software developer. I build web, mobile and desktop applications, from backend to deploy, and what interests me most is making software that solves real problems.",
      "I'm changing fields: I want to work in hacking, pentesting and bug bounty. Right now I'm learning security from scratch with OverTheWire, PortSwigger and TryHackMe, and documenting everything in public on my blog, as reports.",
      "I'm finishing my degree in Systems Analysis and Development and work as an IT assistant.",
      "Outside of code, I hyperfocus on philosophy, history and politics. I also use the blog to train my writing and my memory of what I read.",
      "I believe a good developer delivers software that solves real problems, not just well-written code.",
    ],
  },
  now: {
    pt: [
      { role: "Estudando Cybersecurity", org: "OverTheWire · PortSwigger · TryHackMe" },
      { role: "Concluindo ADS", org: "Análise e Desenvolvimento de Sistemas" },
      { role: "Assistente de T.I", org: "Mercado formal" },
      { role: "Co-founder & Dev", org: "FiveOne Solutions" },
    ],
    en: [
      { role: "Studying Cybersecurity", org: "OverTheWire · PortSwigger · TryHackMe" },
      { role: "Finishing degree", org: "Systems Analysis and Development" },
      { role: "IT Assistant", org: "Formal job" },
      { role: "Co-founder & Dev", org: "FiveOne Solutions" },
    ],
  },
}

const STACK = {
  backend:  ["NestJS", "PostgreSQL", "Redis", "Prisma"],
  mobile:   ["Flutter", "Dart", "BLoC", "Firebase"],
  frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
  desktop:  ["Python", "PySide6", "ReportLab"],
  devops:   ["Docker", "Caddy", "GitHub Actions", "Coolify"],
  extras:   ["Socket.IO", "PostGIS"],
  learning: ["Cybersecurity", "Pentest", "OverTheWire", "PortSwigger"],
}

const STATUS_STYLE: Record<string, string> = {
  PROD: "text-[#39FF14] border-[#39FF14]/30",
  BETA: "text-yellow-400 border-yellow-400/30",
  DONE: "text-blue-400 border-blue-400/30",
  USED: "text-purple-400 border-purple-400/30",
  WIP:  "text-orange-400 border-orange-400/30",
}

// ─── Terminal Sequence ─────────────────────────────────────────────────────────

function buildSequence(lang: Lang): TerminalLine[] {
  const available = lang === "pt"
    ? "● disponível para trabalho remoto"
    : "● available for remote work"

  return [
    { text: "whoami",                                          type: "cmd",       pauseAfter: 350, speed: 75 },
    { text: "Gabriel Alencar",                                 type: "response",  pauseAfter: 80,  speed: 40 },
    { text: "Software Developer  ·  Web · Mobile · Desktop",  type: "sub",       pauseAfter: 600, speed: 22 },
    { text: "cat status.txt",                                  type: "cmd",       pauseAfter: 300, speed: 75 },
    { text: available,                                         type: "highlight", pauseAfter: 9999,speed: 35 },
  ]
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useTerminalSequence(lang: Lang) {
  const [lineIndex, setLineIndex] = useState(0)
  const [typed, setTyped] = useState("")
  const [completed, setCompleted] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const sequence = buildSequence(lang)

  const advance = useCallback(() => {
    const line = sequence[lineIndex]
    if (!line) { setDone(true); return }

    let i = 0
    setTyped("")

    const timer = setInterval(() => {
      i++
      setTyped(line.text.slice(0, i))
      if (i >= line.text.length) {
        clearInterval(timer)
        setTimeout(() => {
          setCompleted(prev => [...prev, line.text])
          setTyped("")
          if (lineIndex < sequence.length - 1) {
            setLineIndex(idx => idx + 1)
          } else {
            setDone(true)
          }
        }, line.pauseAfter)
      }
    }, line.speed)

    return () => clearInterval(timer)
  }, [lineIndex, lang]) // eslint-disable-line

  useEffect(() => {
    const cleanup = advance()
    return cleanup
  }, [lineIndex]) // eslint-disable-line

  // reset on lang change
  useEffect(() => {
    setLineIndex(0)
    setTyped("")
    setCompleted([])
    setDone(false)
  }, [lang])

  const sequence_ = buildSequence(lang)

  return { completed, typed, currentType: sequence_[lineIndex]?.type ?? "response", done }
}

// ─── Components ───────────────────────────────────────────────────────────────

function BlinkCursor() {
  return (
    <span className="inline-block w-[7px] h-[14px] bg-[#39FF14] ml-px align-middle animate-blink" />
  )
}

function Prompt({ path = "~" }: { path?: string }) {
  return (
    <span className="select-none shrink-0">
      <span className="text-[#39FF14]">gabriel</span>
      <span className="text-zinc-600">@</span>
      <span className="text-sky-400">alencar</span>
      <span className="text-zinc-600">:</span>
      <span className="text-violet-400">{path}</span>
      <span className="text-zinc-400">$ </span>
    </span>
  )
}

function TerminalWindow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-800/80 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800/80">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[11px] text-zinc-500 font-mono tracking-wide">{title}</span>
      </div>
      {/* Body */}
      <div className="bg-[#0D0D0F] p-5 font-mono text-[13px] leading-relaxed">
        {children}
      </div>
    </div>
  )
}

function HeroTerminal({ lang }: { lang: Lang }) {
  const { completed, typed, currentType, done } = useTerminalSequence(lang)
  const sequence = buildSequence(lang)

  // Map completed lines to their original type
  const completedWithType = completed.map((text, i) => ({
    text,
    type: sequence[i]?.type ?? "response",
  }))

  const renderLine = (text: string, type: string, index: number) => {
    if (type === "cmd") {
      return (
        <div key={index} className="flex items-start gap-0 animate-fade-in">
          <Prompt />
          <span className="text-zinc-200">{text}</span>
        </div>
      )
    }
    if (type === "highlight") {
      return <div key={index} className="text-[#39FF14] animate-fade-in">{text}</div>
    }
    if (type === "sub") {
      return <div key={index} className="text-zinc-500 animate-fade-in">{text}</div>
    }
    return <div key={index} className="text-zinc-100 animate-fade-in">{text}</div>
  }

  return (
    <TerminalWindow title="gabriel@alencar: ~">
      <div className="space-y-0.5 min-h-[120px]">
        {completedWithType.map((l, i) => renderLine(l.text, l.type, i))}

        {/* Current typing line */}
        {!done && (
          <div className="flex items-start gap-0">
            {currentType === "cmd" && <Prompt />}
            <span className={
              currentType === "highlight" ? "text-[#39FF14]" :
              currentType === "sub" ? "text-zinc-500" :
              currentType === "cmd" ? "text-zinc-200" :
              "text-zinc-100"
            }>
              {typed}
            </span>
            <BlinkCursor />
          </div>
        )}

        {/* Final blinking cursor */}
        {done && (
          <div className="flex items-center pt-1">
            <Prompt />
            <BlinkCursor />
          </div>
        )}
      </div>
    </TerminalWindow>
  )
}

function ProjectsTerminal({ lang, projects }: { lang: Lang; projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <TerminalWindow title={lang === "pt" ? "gabriel@alencar: ~/projetos" : "gabriel@alencar: ~/projects"}>
      {/* ls command */}
      <div className="mb-3">
        <Prompt path={lang === "pt" ? "~/projetos" : "~/projects"} />
        <span className="text-zinc-300">ls -la</span>
      </div>

      <div className="space-y-0.5">
        {projects.map((proj, i) => (
          <div key={proj.dir}>
            {/* Directory row */}
            <button
              onClick={() => setActive(active === i ? null : i)}
              className={`w-full text-left flex items-center gap-3 py-1.5 px-2 -mx-2 rounded transition-all duration-150 ${
                active === i
                  ? "bg-zinc-800/70 text-zinc-100"
                  : "hover:bg-zinc-900/80 text-zinc-300"
              }`}
            >
              {/* Perms — decorative */}
              <span className="text-zinc-700 text-[11px] hidden lg:block shrink-0 select-none">drwxr-xr-x</span>
              {/* Status badge */}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${STATUS_STYLE[proj.status]}`}>
                {proj.status}
              </span>
              {/* Dir name */}
              <span className="text-sky-400 shrink-0">{proj.dir}</span>
              {/* Short desc (desktop) */}
              <span className="text-zinc-600 text-[12px] truncate hidden md:block">
                {proj.desc[lang]}
              </span>
              {/* Tech icon preview */}
              <span className="ml-auto items-center gap-1.5 shrink-0 hidden sm:flex">
                {proj.tags.slice(0, 4).flatMap(tag => {
                  const entry = ICON_MAP[tag]
                  if (!entry) return []
                  const Icon = entry.icon
                  return [<Icon key={tag} size={13} style={{ color: entry.color }} />]
                })}
              </span>
              {/* Expand indicator */}
              <span className={`text-zinc-700 text-[10px] transition-transform shrink-0 ${active === i ? "rotate-90" : ""}`}>
                ▶
              </span>
            </button>

            {/* Expanded panel */}
            {active === i && (
              <div className="ml-4 mt-1 mb-2 pl-4 border-l border-zinc-800 space-y-3 py-2 animate-slide-in">
                {/* Full description (mobile) */}
                <p className="text-zinc-400 text-[12px] md:hidden">{proj.desc[lang]}</p>
                {/* Highlights */}
                <ul className="space-y-1">
                  {proj.highlights[lang].map(h => (
                    <li key={h} className="flex items-start gap-2 text-[12px] text-zinc-400">
                      <span className="text-[#39FF14] shrink-0 select-none">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map(tag => {
                    const entry = ICON_MAP[tag]
                    const Icon = entry?.icon
                    return (
                      <span key={tag} className="inline-flex items-center gap-1.5 text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                        {Icon && <Icon size={12} style={{ color: entry.color }} />}
                        {tag}
                      </span>
                    )
                  })}
                </div>
                {/* Links */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] text-[#39FF14] hover:underline"
                    >
                      <span className="text-zinc-600">live</span>
                      ↗ {proj.live.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  )}
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] text-sky-400 hover:underline"
                    >
                      <span className="text-zinc-600">code</span>
                      ↗ {proj.github.replace("https://", "")}
                    </a>
                  )}
                  {!proj.live && !proj.github && (
                    <span className="text-[12px] text-zinc-600 italic">
                      {lang === "pt" ? "repositório privado" : "private repository"}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </TerminalWindow>
  )
}

const STACK_LABEL: Record<Lang, Record<string, string>> = {
  pt: {
    backend: "backend", mobile: "mobile", frontend: "frontend",
    desktop: "desktop", devops: "devops", extras: "extras", learning: "estudando",
  },
  en: {
    backend: "backend", mobile: "mobile", frontend: "frontend",
    desktop: "desktop", devops: "devops", extras: "extras", learning: "learning",
  },
}

function StackTerminal({ lang }: { lang: Lang }) {
  const cmd = lang === "pt" ? "cat stack.json" : "cat stack.json"
  const entries = Object.entries(STACK)

  return (
    <TerminalWindow title="gabriel@alencar: ~">
      <div className="mb-3">
        <Prompt />
        <span className="text-zinc-300">{cmd}</span>
      </div>

      <div className="text-[13px] leading-6">
        <div className="text-zinc-500">{"{"}</div>
        {entries.map(([key, vals], i) => (
          <div key={key} className="ml-2">
            <span className="text-[#39FF14]">&quot;{key}&quot;</span>
            <span className="text-zinc-500">: [</span>
            {vals.map((v, j) => (
              <span key={v}>
                <span className="text-amber-300">&quot;{v}&quot;</span>
                {j < vals.length - 1 && <span className="text-zinc-500">, </span>}
              </span>
            ))}
            <span className="text-zinc-500">]{i < entries.length - 1 ? "," : ""}</span>
          </div>
        ))}
        <div className="text-zinc-500">{"}"}</div>
      </div>

      {/* Icon render */}
      <div className="mt-4 pt-4 border-t border-zinc-800/80">
        <Prompt />
        <span className="text-zinc-300">./render-icons.sh</span>
      </div>
      <div className="mt-3 space-y-3">
        {entries.map(([key, vals]) => (
          <div key={key}>
            <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1.5">
              {STACK_LABEL[lang][key] ?? key}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {vals.map(v => {
                const entry = ICON_MAP[v]
                const Icon = entry?.icon
                return (
                  <span key={v} className="inline-flex items-center gap-1.5 text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-1 rounded">
                    {Icon && <Icon size={12} style={{ color: entry.color }} />}
                    {v}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </TerminalWindow>
  )
}

function AboutTerminal({ lang }: { lang: Lang }) {
  const cmd = lang === "pt" ? "cat sobre.txt" : "cat about.txt"
  const nowCmd = "cat now.json"
  const nowLabel = lang === "pt" ? "atualmente" : "currently"
  const bio = ABOUT.bio[lang]
  const now = ABOUT.now[lang]

  return (
    <TerminalWindow title={lang === "pt" ? "gabriel@alencar: ~/sobre" : "gabriel@alencar: ~/about"}>
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8">
        {/* Bio */}
        <div>
          <div className="mb-3">
            <Prompt />
            <span className="text-zinc-300">{cmd}</span>
          </div>
          <div className="space-y-3">
            {bio.map(p => (
              <p key={p} className="text-zinc-400 text-[13px] leading-relaxed">{p}</p>
            ))}
          </div>
        </div>

        {/* Now */}
        <div>
          <div className="mb-3">
            <Prompt />
            <span className="text-zinc-300">{nowCmd}</span>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
            <div className="text-[10px] uppercase tracking-widest text-[#39FF14] mb-3">{nowLabel}</div>
            <div className="space-y-3">
              {now.map((item, i) => (
                <div key={item.role} className={i > 0 ? "pt-3 border-t border-zinc-800/80" : ""}>
                  <div className="text-[13px] text-zinc-200 font-medium">{item.role}</div>
                  <div className="text-[12px] text-zinc-500">{item.org}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TerminalWindow>
  )
}

function ContactTerminal({ lang }: { lang: Lang }) {
  const line = lang === "pt"
    ? "Aberto a oportunidades remotas e projetos freelance."
    : "Open to remote opportunities and freelance projects."

  return (
    <TerminalWindow title="gabriel@alencar: ~">
      <div className="space-y-1 text-[13px]">
        <div>
          <Prompt />
          <span className="text-zinc-300">cat contact.txt</span>
        </div>
        <div className="pt-1 space-y-3">
          <p className="text-zinc-400">{line}</p>
          <div className="space-y-1">
            <div className="flex gap-4">
              <span className="text-zinc-600 w-16 shrink-0">email</span>
              <a href="mailto:gabrielalencardearaujo04@gmail.com" className="text-[#39FF14] hover:underline">
                gabrielalencardearaujo04@gmail.com
              </a>
            </div>
            <div className="flex gap-4">
              <span className="text-zinc-600 w-16 shrink-0">phone</span>
              <a href="tel:+5561991929098" className="text-sky-400 hover:underline">
                +55 61 99192-9098
              </a>
            </div>
            <div className="flex gap-4">
              <span className="text-zinc-600 w-16 shrink-0">github</span>
              <a href="https://github.com/alencarrgabriel" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                github.com/alencarrgabriel
              </a>
            </div>
            <div className="flex gap-4">
              <span className="text-zinc-600 w-16 shrink-0">linkedin</span>
              <a href="https://www.linkedin.com/in/gabriel-alencar-dev/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                linkedin.com/in/gabriel-alencar-dev
              </a>
            </div>
          </div>
        </div>
        <div className="pt-3">
          <Prompt />
          <BlinkCursor />
        </div>
      </div>
    </TerminalWindow>
  )
}

// ─── Recent Posts ─────────────────────────────────────────────────────────────

function RecentPosts({ lang }: { lang: Lang }) {
  const published = getPublishedPosts(allPosts).slice(0, 3)
  if (published.length === 0) return null

  const cmd = lang === "pt"
    ? "ls -lt ~/log | head -3"
    : "ls -lt ~/log | head -3"

  const linkLabel = lang === "pt" ? "ver todos os posts →" : "see all posts →"

  return (
    <section className="max-w-5xl mx-auto px-5 pb-24 scroll-mt-16">
      <TerminalWindow title="gabriel@alencar: ~/log">
        <div className="mb-4">
          <Prompt path="~" />
          <span className="text-zinc-300">{cmd}</span>
        </div>

        <div className="space-y-0 divide-y divide-zinc-800/60">
          {published.map((post) => (
            <div key={post.slug} className="flex items-start gap-3 py-2.5">
              <span className="text-zinc-700 text-[11px] tabular-nums shrink-0 mt-0.5 hidden sm:block w-20">
                {formatDate(post.date)}
              </span>
              <PostTypeBadge type={post.type as "writeup" | "til" | "leetcode" | "notes" | "log"} />
              <div className="min-w-0">
                <a
                  href={`/log/${post.slug}`}
                  className="text-zinc-200 hover:text-[#39FF14] transition-colors text-[13px]"
                >
                  {post.title}
                </a>
                <p className="text-zinc-600 text-[11px] mt-0.5 truncate">{post.summary}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800/60">
          <Prompt />
          <a href="/log" className="text-[#39FF14] hover:underline text-[13px]">
            {linkLabel}
          </a>
        </div>
      </TerminalWindow>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const { lang, setLang } = useLang()

  const available = lang === "pt" ? "disponível para trabalho remoto" : "available for remote work"
  const aboutLabel = lang === "pt" ? "sobre" : "about"
  const projectsLabel = lang === "pt" ? "projetos" : "projects"
  const stackLabel = "stack"
  const contactLabel = lang === "pt" ? "contato" : "contact"

  return (
    <main className="min-h-screen bg-[#09090B] font-mono">
      {/* ── Nav ────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 bg-[#09090B]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <span className="text-sm select-none">
            <span className="text-[#39FF14]">gabriel</span>
            <span className="text-zinc-700 hidden sm:inline">@alencar</span>
            <span className="text-zinc-600">:~</span>
          </span>

          <div className="flex items-center gap-3 sm:gap-5">
            <a href="#about" className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors hidden sm:block">
              {aboutLabel}
            </a>
            <a href="#projects" className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors hidden sm:block">
              {projectsLabel}
            </a>
            <a href="#stack" className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors hidden sm:block">
              {stackLabel}
            </a>
            <a href="#contact" className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors hidden sm:block">
              {contactLabel}
            </a>
            <a href="/log" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
              log
            </a>
            <a href="/roadmap" className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors">
              roadmap
            </a>

            {/* Language toggle */}
            <div className="flex border border-zinc-800 rounded overflow-hidden text-xs">
              <button
                onClick={() => setLang("pt")}
                className={`px-3 py-1.5 transition-all ${lang === "pt" ? "bg-[#39FF14] text-black font-bold" : "text-zinc-500 hover:text-zinc-200"}`}
              >
                PT
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 transition-all ${lang === "en" ? "bg-[#39FF14] text-black font-bold" : "text-zinc-500 hover:text-zinc-200"}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: identity */}
          <div>
            <div className="flex items-center gap-2 text-xs text-[#39FF14] mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
              {available}
            </div>

            <h1 className="sr-only">Gabriel Alencar</h1>
            <div
              aria-hidden="true"
              className="font-mono leading-[1.15] select-none overflow-x-auto"
              style={{ fontSize: "clamp(10px, 3.4vw, 17px)" }}
            >
              <pre className="text-zinc-200">{ASCII_FIRST}</pre>
              <pre className="text-[#39FF14] mt-2">{ASCII_LAST}</pre>
            </div>

            <p className="font-sans text-zinc-400 text-lg mt-3 mb-1">Software Developer</p>
            <p className="font-sans text-zinc-600 text-sm mb-8">Web · Mobile · Desktop</p>

            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com/alencarrgabriel"
                target="_blank"
                rel="noreferrer"
                className="text-xs px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all"
              >
                github →
              </a>
              <a
                href="https://www.linkedin.com/in/gabriel-alencar-dev/"
                target="_blank"
                rel="noreferrer"
                className="text-xs px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all"
              >
                linkedin →
              </a>
              <a
                href="mailto:gabrielalencardearaujo04@gmail.com"
                className="text-xs px-3.5 py-2 bg-[#39FF14]/10 border border-[#39FF14]/25 rounded-lg text-[#39FF14] hover:bg-[#39FF14]/20 transition-all"
              >
                email →
              </a>
            </div>
          </div>

          {/* Right: terminal */}
          <HeroTerminal lang={lang} />
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section id="about" className="max-w-5xl mx-auto px-5 pb-16 scroll-mt-16">
        <AboutTerminal lang={lang} />
      </section>

      {/* ── Projects ───────────────────────────────────────────────────── */}
      <section id="projects" className="max-w-5xl mx-auto px-5 pb-16 scroll-mt-16">
        <ProjectsTerminal lang={lang} projects={PROJECTS} />
      </section>

      {/* ── Stack ──────────────────────────────────────────────────────── */}
      <section id="stack" className="max-w-5xl mx-auto px-5 pb-16 scroll-mt-16">
        <StackTerminal lang={lang} />
      </section>

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section id="contact" className="max-w-5xl mx-auto px-5 pb-16 scroll-mt-16">
        <ContactTerminal lang={lang} />
      </section>

      {/* ── Recent log posts ───────────────────────────────────────────── */}
      <RecentPosts lang={lang} />

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-900 py-6 text-center text-[11px] text-zinc-700">
        gabriel alencar · {new Date().getFullYear()}
      </footer>
    </main>
  )
}
