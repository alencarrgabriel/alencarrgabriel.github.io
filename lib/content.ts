export interface Post {
  title: string
  date: string
  type: "writeup" | "til" | "leetcode" | "notes" | "log"
  tags: string[]
  summary: string
  cover?: { src: string; width: number; height: number; blurDataURL?: string }
  series?: string
  difficulty?: "easy" | "medium" | "hard"
  platform?: "htb" | "thm" | "portswigger" | "leetcode" | "overthewire" | "beecrowd" | "outro"
  draft: boolean
  lang: "pt" | "en"
  slug: string
  raw: string
  content: string
  readingTime: number
}

export interface RoadmapItem {
  name: string
  status: "todo" | "wip" | "done"
  progress?: [number, number]
  tags: string[]
}

export interface RoadmapTrack {
  track: string
  items: RoadmapItem[]
}

// Direct JSON imports — bypass .velite/index.js which uses `with { type: 'json' }`
// syntax that webpack (bundled in Next.js 15) does not handle in server component builds.
import postsJson from "@/.velite/posts.json"
import roadmapJson from "@/.velite/roadmap.json"

export const posts = postsJson as unknown as Post[]
export const roadmap = roadmapJson as unknown as RoadmapTrack[]
