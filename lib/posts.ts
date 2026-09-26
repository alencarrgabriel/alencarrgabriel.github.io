import type { Post, RoadmapTrack } from "@/lib/content"

export type { Post }

const isDev = process.env.NODE_ENV !== "production"

export function getPublishedPosts(all: Post[]): Post[] {
  return all
    .filter((p) => isDev || !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function groupPostsByMonth(posts: Post[]): Record<string, Post[]> {
  const groups: Record<string, Post[]> = {}
  for (const post of posts) {
    const d = new Date(post.date)
    const key = `${d.getFullYear()} · ${d.toLocaleString("pt-BR", { month: "long" })}`
    if (!groups[key]) groups[key] = []
    groups[key].push(post)
  }
  return groups
}

export function getAllTags(posts: Post[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const post of posts) {
    for (const tag of post.tags) {
      counts[tag] = (counts[tag] ?? 0) + 1
    }
  }
  return Object.fromEntries(
    Object.entries(counts).sort((a, b) => b[1] - a[1])
  )
}

export function buildSearchIndex(posts: Post[]) {
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    tags: p.tags,
    type: p.type,
  }))
}

export interface BlogStats {
  total: number
  writeups: number
  progressDone: number
  progressTotal: number
  lastUpdate: string
  nowTrack: string | null
}

export function computeBlogStats(posts: Post[], roadmap: RoadmapTrack[]): BlogStats {
  const published = getPublishedPosts(posts)
  const writeups = published.filter((p) => p.type === "writeup").length

  const items = roadmap.flatMap((t) => t.items)
  const progressDone = items.reduce((sum, i) => sum + (i.progress?.[0] ?? 0), 0)
  const progressTotal = items.reduce((sum, i) => sum + (i.progress?.[1] ?? 0), 0)

  const lastUpdate = published[0]?.date ?? new Date().toISOString().slice(0, 10)

  const wipItem = roadmap
    .flatMap((t) => t.items.map((i) => ({ ...i, track: t.track })))
    .find((i) => i.status === "wip")

  const nowTrack = wipItem
    ? `${wipItem.track} — ${wipItem.name}${wipItem.progress ? ` (${wipItem.progress[0]}/${wipItem.progress[1]})` : ""}`
    : null

  return { total: published.length, writeups, progressDone, progressTotal, lastUpdate, nowTrack }
}

export function formatDate(iso: string, locale = "pt-BR"): string {
  return new Date(iso).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

export function asciiBar(done: number, total: number, width = 10): string {
  if (total === 0) return `[${"·".repeat(width)}] 0/0`
  const filled = Math.round((done / total) * width)
  return `[${"#".repeat(filled)}${"·".repeat(width - filled)}] ${done}/${total}`
}
