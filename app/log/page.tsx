"use client"

import { useState, useMemo } from "react"
import { posts as allPosts, roadmap } from "@/lib/content"
import { TerminalWindow } from "@/components/terminal/TerminalWindow"
import { Prompt } from "@/components/terminal/Prompt"
import { BlinkCursor } from "@/components/terminal/BlinkCursor"
import { PostCard } from "@/components/blog/PostCard"
import { SearchBox } from "@/components/blog/SearchBox"
import {
  getPublishedPosts,
  groupPostsByMonth,
  getAllTags,
  buildSearchIndex,
  computeBlogStats,
} from "@/lib/posts"
import { useLang } from "@/lib/lang"
import Link from "next/link"

const BANNER = `              __                             __
       ____ _/ /__  ____  _________ ______  / /___  ____ _
      / __ \`/ / _ \\/ __ \\/ ___/ __ \`/ ___/ / / __ \\/ __ \`/
     / /_/ / /  __/ / / / /__/ /_/ / /  _ / / /_/ / /_/ /
     \\__,_/_/\\___/_/ /_/\\___/\\__,_/_/  (_)_/\\____/\\__, /
                                                 /____/   `

type PostType = "writeup" | "til" | "leetcode" | "notes" | "log" | "all"

const TYPE_LABELS: PostType[] = ["all", "writeup", "til", "leetcode", "notes", "log"]

const TYPE_FLAGS: Record<PostType, string> = {
  all:      "--all",
  writeup:  "--type=writeup",
  til:      "--type=til",
  leetcode: "--type=leetcode",
  notes:    "--type=notes",
  log:      "--type=log",
}

export default function LogPage() {
  const { lang } = useLang()
  const [filter, setFilter] = useState<PostType>("all")

  const published = useMemo(() => getPublishedPosts(allPosts), [])
  const stats = useMemo(() => computeBlogStats(allPosts, roadmap), [])
  const searchIndex = useMemo(() => buildSearchIndex(published), [published])

  const filtered = filter === "all"
    ? published
    : published.filter((p) => p.type === filter)

  const grouped = groupPostsByMonth(filtered)
  const tags = getAllTags(published)

  const lastUpdate = new Date(stats.lastUpdate).toLocaleDateString("pt-BR", {
    year: "numeric", month: "2-digit", day: "2-digit",
  })

  return (
    <main className="min-h-screen bg-[#09090B] font-mono">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 bg-[#09090B]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm select-none hover:opacity-80 transition-opacity">
            <span className="text-[#39FF14]">gabriel</span>
            <span className="text-zinc-700">@fiveone</span>
            <span className="text-zinc-600">:~/log</span>
          </Link>
          <div className="flex items-center gap-5 text-xs">
            <Link href="/" className="text-zinc-600 hover:text-zinc-300 transition-colors hidden sm:block">home</Link>
            <Link href="/roadmap" className="text-zinc-600 hover:text-zinc-300 transition-colors hidden sm:block">roadmap</Link>
            <Link href="/log/tags" className="text-zinc-600 hover:text-zinc-300 transition-colors hidden sm:block">tags</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-5 pt-24 pb-24">
        {/* Banner */}
        <TerminalWindow title="gabriel@fiveone: ~/log">
          <div className="mb-4">
            <Prompt path="~" />
            <span className="text-zinc-300">./alencar.log --status</span>
          </div>

          <h1 className="sr-only">alencar.log</h1>

          <pre
            aria-hidden="true"
            className="text-[#39FF14] overflow-x-auto leading-tight mb-4"
            style={{ fontSize: "clamp(5px, 1.5vw, 11px)" }}
          >
            {BANNER}
          </pre>

          <div className="space-y-1 text-[13px]">
            <div className="text-sky-400">
              [*] {stats.total} posts · {stats.writeups} writeups · {stats.leetcodeDone}/{stats.leetcodeTarget} blind75
            </div>
            <div className="text-sky-400">
              [*] last update: {lastUpdate}
            </div>
            {stats.nowTrack && (
              <div className="text-[#39FF14]">
                [+] now: {stats.nowTrack}
              </div>
            )}
          </div>

          <div className="flex items-center pt-4">
            <Prompt />
            <BlinkCursor />
          </div>
        </TerminalWindow>

        {/* Filter + Search */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-1.5">
            {TYPE_LABELS.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`text-[11px] px-2 py-1 rounded border transition-all ${
                  filter === t
                    ? "border-[#39FF14]/50 text-[#39FF14] bg-[#39FF14]/10"
                    : "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
                }`}
              >
                {TYPE_FLAGS[t]}
              </button>
            ))}
          </div>
          <SearchBox index={searchIndex} />
        </div>

        {/* Tag cloud */}
        <div className="mt-4 mb-8 flex flex-wrap gap-1.5">
          {Object.entries(tags).slice(0, 20).map(([tag, count]) => (
            <Link
              key={tag}
              href={`/log/tags/${tag}`}
              className="text-[11px] text-zinc-600 hover:text-sky-400 transition-colors"
            >
              #{tag}
              <span className="text-zinc-800 ml-0.5 text-[10px]">({count})</span>
            </Link>
          ))}
          {Object.keys(tags).length > 20 && (
            <Link href="/log/tags" className="text-[11px] text-zinc-700 hover:text-sky-400 transition-colors">
              +{Object.keys(tags).length - 20} mais →
            </Link>
          )}
        </div>

        {/* Posts grouped by month */}
        {Object.entries(grouped).map(([month, monthPosts]) => (
          <div key={month} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-zinc-600 text-[11px] select-none" aria-hidden="true">##</span>
              <h2 className="text-zinc-400 text-[13px] uppercase tracking-wider">{month}</h2>
              <div className="flex-1 border-t border-zinc-800/60" />
            </div>
            <div className="space-y-0 divide-y divide-zinc-900">
              {monthPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-zinc-600 text-[13px] py-8">
            <span className="text-zinc-700">$</span> nenhum post encontrado para{" "}
            <span className="text-zinc-400">{TYPE_FLAGS[filter]}</span>
          </div>
        )}

        {lang === "en" && (
          <p className="text-zinc-700 text-[11px] mt-8">
            Posts are written in Portuguese unless marked otherwise.
          </p>
        )}
      </div>
    </main>
  )
}
