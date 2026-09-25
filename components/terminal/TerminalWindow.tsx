import React from "react"

interface Props {
  title: string
  children: React.ReactNode
}

export function TerminalWindow({ title, children }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800/80 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800/80">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" aria-hidden="true" />
        <span className="ml-3 text-[11px] text-zinc-500 font-mono tracking-wide">{title}</span>
      </div>
      <div className="bg-[#0D0D0F] p-5 font-mono text-[13px] leading-relaxed">
        {children}
      </div>
    </div>
  )
}
