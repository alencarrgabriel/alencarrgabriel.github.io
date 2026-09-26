"use client"

import * as runtime from "react/jsx-runtime"
import Link from "next/link"

function useMDXComponent(code: string) {
  // Velite compiles MDX to a function body that accepts the React JSX runtime
  // eslint-disable-next-line no-new-func
  const fn = new Function(code)
  return (fn({ ...runtime }) as { default: React.ComponentType<{ components?: Record<string, React.ComponentType> }> }).default
}

// ─── Custom components injected into MDX ─────────────────────────────────────

function Heading2({ id, children }: { id?: string; children?: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="group flex items-center gap-2 text-zinc-100 text-[1.1rem] font-bold mt-8 mb-3 scroll-mt-20"
    >
      <span className="text-[#39FF14] select-none" aria-hidden="true">##</span>
      <span>{children}</span>
      {id && (
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-60 text-zinc-500 hover:text-zinc-300 text-sm transition-opacity"
          aria-label="Link para esta seção"
        >
          #
        </a>
      )}
    </h2>
  )
}

function Heading3({ id, children }: { id?: string; children?: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="group flex items-center gap-2 text-zinc-200 text-[0.95rem] font-semibold mt-6 mb-2 scroll-mt-20"
    >
      <span className="text-sky-400 select-none" aria-hidden="true">###</span>
      <span>{children}</span>
      {id && (
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-60 text-zinc-500 hover:text-zinc-300 text-sm transition-opacity"
          aria-label="Link para esta seção"
        >
          #
        </a>
      )}
    </h3>
  )
}

function Callout({ type, children }: { type: "note" | "warning" | "tip"; children?: React.ReactNode }) {
  const config = {
    note:    { prefix: "[*]", cls: "border-sky-500/30 bg-sky-950/20 text-sky-300" },
    warning: { prefix: "[!]", cls: "border-yellow-500/30 bg-yellow-950/20 text-yellow-300" },
    tip:     { prefix: "[+]", cls: "border-[#39FF14]/30 bg-[#39FF14]/5 text-[#39FF14]" },
  }
  const { prefix, cls } = config[type]
  return (
    <div className={`my-4 border-l-2 pl-4 py-2 pr-2 rounded-r ${cls}`}>
      <span className="font-bold mr-2 select-none" aria-hidden="true">{prefix}</span>
      <span className="text-zinc-300">{children}</span>
    </div>
  )
}

// Transform GFM blockquotes with [!NOTE], [!WARNING], [!TIP] into callouts
function Blockquote({ children }: { children?: React.ReactNode }) {
  // Detect callout markers in the first child's text content
  const childArr = Array.isArray(children) ? children : [children]
  const firstChild = childArr[0]

  if (firstChild && typeof firstChild === "object" && "props" in (firstChild as { props?: unknown })) {
    const text = String((firstChild as { props: { children?: string } }).props?.children ?? "")
    if (text.startsWith("[!NOTE]")) {
      return <Callout type="note">{text.replace("[!NOTE]", "").trim()}</Callout>
    }
    if (text.startsWith("[!WARNING]")) {
      return <Callout type="warning">{text.replace("[!WARNING]", "").trim()}</Callout>
    }
    if (text.startsWith("[!TIP]")) {
      return <Callout type="tip">{text.replace("[!TIP]", "").trim()}</Callout>
    }
  }

  return (
    <blockquote className="border-l-2 border-zinc-700 pl-4 my-4 text-zinc-400 italic">
      {children}
    </blockquote>
  )
}

function Anchor({ href, children }: { href?: string; children?: React.ReactNode }) {
  const isExternal = href?.startsWith("http")
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-sky-400 hover:underline underline-offset-2"
      >
        {children}
        <span className="ml-0.5 text-[10px] text-zinc-500" aria-hidden="true">↗</span>
      </a>
    )
  }
  return (
    <Link href={href ?? "#"} className="text-sky-400 hover:underline underline-offset-2">
      {children}
    </Link>
  )
}

function InlineCode({ children }: { children?: React.ReactNode }) {
  return (
    <code className="bg-zinc-800/70 border border-zinc-700/50 text-[#39FF14] px-1.5 py-0.5 rounded text-[0.85em] font-mono">
      {children}
    </code>
  )
}

function Pre({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) {
  return (
    <div className="my-4 rounded-lg border border-zinc-800 overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 border-b border-zinc-800">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" aria-hidden="true" />
      </div>
      <pre
        {...props}
        className="overflow-x-auto p-4 text-[13px] leading-relaxed bg-[#0D0D0F] [&>code]:bg-transparent [&>code]:border-0 [&>code]:p-0 [&>code]:text-inherit"
      >
        {children}
      </pre>
    </div>
  )
}

function Table({ children }: { children?: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-[13px] border-collapse">{children}</table>
    </div>
  )
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th className="text-left px-3 py-2 border-b border-zinc-700 text-zinc-300 font-semibold">
      {children}
    </th>
  )
}

function Td({ children }: { children?: React.ReactNode }) {
  return (
    <td className="px-3 py-2 border-b border-zinc-800/60 text-zinc-400">
      {children}
    </td>
  )
}

function Img({ src, alt }: { src?: string; alt?: string }) {
  return (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt ?? ""} loading="lazy" className="rounded-lg border border-zinc-800 w-full" />
      {alt && <figcaption className="text-center text-zinc-600 text-[11px] mt-2">{alt}</figcaption>}
    </figure>
  )
}

// ─── MDX renderer ─────────────────────────────────────────────────────────────

const components = {
  h2: Heading2,
  h3: Heading3,
  blockquote: Blockquote,
  a: Anchor,
  code: InlineCode,
  pre: Pre,
  table: Table,
  th: Th,
  td: Td,
  img: Img,
}

interface Props {
  code: string
}

export function MDXContent({ code }: Props) {
  const Component = useMDXComponent(code)
  return (
    <div className="prose-content max-w-[70ch] space-y-0 text-zinc-300 leading-[1.8] text-[14px]">
      <Component components={components as Record<string, React.ComponentType>} />
    </div>
  )
}
