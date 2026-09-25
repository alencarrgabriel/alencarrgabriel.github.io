"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface SearchEntry {
  slug: string
  title: string
  summary: string
  tags: string[]
  type: string
}

interface Props {
  index: SearchEntry[]
}

export function SearchBox({ index }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchEntry[]>([])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = query.toLowerCase()
    setResults(
      index
        .filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.summary.toLowerCase().includes(q) ||
            e.tags.some((t) => t.toLowerCase().includes(q))
        )
        .slice(0, 8)
    )
  }, [query, index])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div ref={ref} className="relative w-full sm:w-72">
      <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-900/60 rounded px-3 py-1.5 text-[12px]">
        <span className="text-zinc-600 shrink-0" aria-hidden="true">$</span>
        <span className="text-zinc-600 shrink-0">grep -r</span>
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="buscar posts..."
          className="bg-transparent outline-none text-zinc-300 placeholder-zinc-700 w-full"
          aria-label="Buscar posts"
          aria-expanded={open && results.length > 0}
          role="combobox"
          aria-autocomplete="list"
        />
      </div>

      {open && results.length > 0 && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded shadow-xl z-50"
        >
          {results.map((r) => (
            <Link
              key={r.slug}
              href={`/log/${r.slug}`}
              role="option"
              aria-selected={false}
              onClick={() => { setOpen(false); setQuery("") }}
              className="block px-3 py-2.5 hover:bg-zinc-800/60 transition-colors border-b border-zinc-800/50 last:border-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-600 font-bold">{r.type.toUpperCase()}</span>
                <span className="text-zinc-200 text-[12px] truncate">{r.title}</span>
              </div>
              <p className="text-zinc-600 text-[11px] truncate mt-0.5">{r.summary}</p>
            </Link>
          ))}
        </div>
      )}

      {open && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-zinc-600 text-[12px] z-50">
          nenhum resultado para &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  )
}
