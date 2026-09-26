import { posts as allPosts } from "@/lib/content"
import { TerminalWindow } from "@/components/terminal/TerminalWindow"
import { Prompt } from "@/components/terminal/Prompt"
import { getAllTags, getPublishedPosts } from "@/lib/posts"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tags — alencar.log",
  description: "Todas as tags do blog.",
}

export default function TagsPage() {
  const published = getPublishedPosts(allPosts)
  const tags = getAllTags(published)
  const sorted = Object.entries(tags)

  return (
    <main className="min-h-screen bg-[#09090B] font-mono">
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 bg-[#09090B]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center gap-5">
          <Link href="/" className="text-sm select-none hover:opacity-80">
            <span className="text-[#39FF14]">gabriel</span>
            <span className="text-zinc-700">@alencar</span>
          </Link>
          <span className="text-zinc-800">/</span>
          <Link href="/log" className="text-zinc-500 hover:text-zinc-300 text-xs">log</Link>
          <span className="text-zinc-800">/</span>
          <span className="text-zinc-600 text-xs">tags</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-5 pt-24 pb-24">
        <TerminalWindow title="gabriel@alencar: ~/log/tags">
          <div className="mb-5">
            <Prompt path="~/log" />
            <span className="text-zinc-300">ls -1 tags/ | sort -t: -k2 -rn</span>
          </div>

          <h1 className="sr-only">Todas as tags</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {sorted.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/log/tags/${tag}`}
                className="flex items-center justify-between px-3 py-2 border border-zinc-800 rounded hover:border-zinc-600 hover:bg-zinc-900/50 transition-all group"
              >
                <span className="text-sky-400 group-hover:text-sky-300 text-[12px]">#{tag}</span>
                <span className="text-zinc-600 text-[11px] tabular-nums">{count}</span>
              </Link>
            ))}
          </div>
        </TerminalWindow>
      </div>
    </main>
  )
}
