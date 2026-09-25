import { notFound } from "next/navigation"
import { posts as allPosts } from "@/lib/content"
import { TerminalWindow } from "@/components/terminal/TerminalWindow"
import { Prompt } from "@/components/terminal/Prompt"
import { PostCard } from "@/components/blog/PostCard"
import { getAllTags, getPublishedPosts } from "@/lib/posts"
import type { Metadata } from "next"
import Link from "next/link"

export const dynamicParams = false

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  // Use ALL posts (including drafts) so tags always exist for static export.
  const tags = Object.keys(getAllTags(allPosts))
  return tags.map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  return {
    title: `#${tag} — alencar.log`,
    description: `Posts marcados com #${tag}.`,
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const published = getPublishedPosts(allPosts)
  const tagged = published.filter((p) => p.tags.includes(tag))

  if (tagged.length === 0) notFound()

  return (
    <main className="min-h-screen bg-[#09090B] font-mono">
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 bg-[#09090B]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center gap-5">
          <Link href="/" className="text-sm select-none hover:opacity-80">
            <span className="text-[#39FF14]">gabriel</span>
            <span className="text-zinc-700">@fiveone</span>
          </Link>
          <span className="text-zinc-800">/</span>
          <Link href="/log" className="text-zinc-500 hover:text-zinc-300 text-xs">log</Link>
          <span className="text-zinc-800">/</span>
          <Link href="/log/tags" className="text-zinc-500 hover:text-zinc-300 text-xs">tags</Link>
          <span className="text-zinc-800">/</span>
          <span className="text-sky-400 text-xs">#{tag}</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-5 pt-24 pb-24">
        <TerminalWindow title={`gabriel@fiveone: ~/log/tags/${tag}`}>
          <div className="mb-5">
            <Prompt path="~/log" />
            <span className="text-zinc-300">grep -rl &quot;{tag}&quot; . | head -50</span>
          </div>

          <h1 className="sr-only">Posts com #{tag}</h1>

          <div className="text-zinc-500 text-[12px] mb-5">
            {tagged.length} {tagged.length === 1 ? "post" : "posts"} marcados com{" "}
            <span className="text-sky-400">#{tag}</span>
          </div>

          <div className="space-y-0 divide-y divide-zinc-900">
            {tagged.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </TerminalWindow>
      </div>
    </main>
  )
}
