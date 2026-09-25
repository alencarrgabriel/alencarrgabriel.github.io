import { roadmap, posts as allPosts } from "@/lib/content"
import { TerminalWindow } from "@/components/terminal/TerminalWindow"
import { Prompt } from "@/components/terminal/Prompt"
import { RoadmapStatusBadge } from "@/components/terminal/Badge"
import { asciiBar, getPublishedPosts, getAllTags } from "@/lib/posts"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Roadmap — Gabriel Alencar",
  description: "Plano de estudos: PortSwigger, HackTheBox, LeetCode Blind 75.",
}

export default function RoadmapPage() {
  const published = getPublishedPosts(allPosts)
  const allTags = getAllTags(published)

  return (
    <main className="min-h-screen bg-[#09090B] font-mono">
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 bg-[#09090B]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center gap-5">
          <Link href="/" className="text-sm select-none hover:opacity-80">
            <span className="text-[#39FF14]">gabriel</span>
            <span className="text-zinc-700">@fiveone</span>
          </Link>
          <span className="text-zinc-800">/</span>
          <span className="text-violet-400 text-xs">roadmap</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-5 pt-24 pb-24 space-y-6">
        <TerminalWindow title="gabriel@fiveone: ~/roadmap">
          <div className="mb-5">
            <Prompt path="~" />
            <span className="text-zinc-300">cat roadmap.yaml | ./render-progress.sh</span>
          </div>

          <h1 className="sr-only">Roadmap de estudos</h1>

          <div className="space-y-8">
            {roadmap.map((track) => {
              const total = track.items.length
              const done = track.items.filter((i) => i.status === "done").length
              const wip = track.items.filter((i) => i.status === "wip").length

              return (
                <div key={track.track}>
                  {/* Track header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#39FF14] text-[11px] select-none" aria-hidden="true">##</span>
                    <h2 className="text-zinc-200 text-[14px] font-semibold">{track.track}</h2>
                    <span className="text-zinc-700 text-[11px]">
                      {done}/{total} concluídos
                      {wip > 0 && ` · ${wip} em andamento`}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-2 pl-4 border-l border-zinc-800">
                    {track.items.map((item) => {
                      // Find posts with any of the item's tags
                      const relatedPosts = item.tags.length > 0
                        ? published.filter((p) =>
                            item.tags.some((t) => p.tags.includes(t))
                          )
                        : []

                      return (
                        <div
                          key={item.name}
                          className={`py-2 ${item.status === "wip" ? "text-zinc-200" : item.status === "done" ? "text-zinc-500" : "text-zinc-600"}`}
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <RoadmapStatusBadge status={item.status} />
                            <span className="text-[13px]">{item.name}</span>
                            {item.progress && (
                              <span className="text-zinc-600 text-[11px] font-mono tabular-nums">
                                {asciiBar(item.progress[0], item.progress[1])}
                              </span>
                            )}
                          </div>

                          {/* Related posts */}
                          {relatedPosts.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1.5 pl-12">
                              {relatedPosts.slice(0, 4).map((p) => (
                                <Link
                                  key={p.slug}
                                  href={`/log/${p.slug}`}
                                  className="text-[10px] text-sky-400/70 hover:text-sky-400 border border-sky-900/40 px-1.5 py-0.5 rounded transition-colors"
                                >
                                  ↗ {p.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </TerminalWindow>
      </div>
    </main>
  )
}
