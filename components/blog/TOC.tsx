"use client"

import { useEffect, useState } from "react"

interface Heading {
  id: string
  text: string
  level: number
}

function extractHeadings(html: string): Heading[] {
  const matches = [...html.matchAll(/<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[23]>/gi)]
  return matches.map((m) => ({
    level: parseInt(m[1]),
    id: m[2],
    text: m[3].replace(/<[^>]+>/g, ""),
  }))
}

interface Props {
  rawHtml: string
}

export function TOC({ rawHtml }: Props) {
  const [active, setActive] = useState<string>("")
  const headings = extractHeadings(rawHtml)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [rawHtml]) // eslint-disable-line

  if (headings.length < 3) return null

  return (
    <nav aria-label="Índice do post" className="text-[12px]">
      <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">índice</div>
      <ul className="space-y-1">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={level === 3 ? "pl-3" : ""}>
            <a
              href={`#${id}`}
              className={`block transition-colors hover:text-[#39FF14] ${
                active === id ? "text-[#39FF14]" : "text-zinc-500"
              }`}
            >
              {level === 2 && <span className="text-zinc-700 mr-1" aria-hidden="true">##</span>}
              {level === 3 && <span className="text-zinc-700 mr-1" aria-hidden="true">###</span>}
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
