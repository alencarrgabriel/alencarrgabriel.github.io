import Link from "next/link"
import type { Post } from "@/lib/content"

interface Props {
  series: string
  posts: Post[]
  currentSlug: string
}

export function SeriesList({ series, posts, currentSlug }: Props) {
  const seriesPosts = posts
    .filter((p) => p.series === series)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  if (seriesPosts.length < 2) return null

  return (
    <div className="border border-zinc-800 rounded-lg p-4 my-6">
      <div className="text-[10px] uppercase tracking-widest text-[#39FF14] mb-3">
        série · {series}
      </div>
      <ol className="space-y-1.5">
        {seriesPosts.map((p, i) => {
          const isCurrent = p.slug === currentSlug
          return (
            <li key={p.slug} className="flex items-start gap-2 text-[12px]">
              <span className="text-zinc-700 shrink-0 tabular-nums w-5">{i + 1}.</span>
              {isCurrent ? (
                <span className="text-zinc-100 font-medium">
                  {p.title}
                  <span className="ml-2 text-[#39FF14] text-[10px]">← você está aqui</span>
                </span>
              ) : (
                <Link
                  href={`/log/${p.slug}`}
                  className="text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  {p.title}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
