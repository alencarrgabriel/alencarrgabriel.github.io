import { notFound } from "next/navigation"
import { posts as allPosts } from "@/lib/content"
import { TerminalWindow } from "@/components/terminal/TerminalWindow"
import { Prompt } from "@/components/terminal/Prompt"
import { MDXContent } from "@/components/blog/MDXContent"
import { TOC } from "@/components/blog/TOC"
import { SeriesList } from "@/components/blog/SeriesList"
import { PostTypeBadge, DifficultyBadge } from "@/components/terminal/Badge"
import { getPublishedPosts, formatDate } from "@/lib/posts"
import type { Metadata } from "next"
import Link from "next/link"

export const dynamicParams = false

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // Drafts are already stripped from allPosts in production builds (see velite.config.ts).
  // Static export rejects an empty list; the placeholder renders notFound().
  return allPosts.length ? allPosts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} — alencar.log`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug)

  if (!post || (post.draft && process.env.NODE_ENV === "production")) {
    notFound()
  }

  const published = getPublishedPosts(allPosts)
  const idx = published.findIndex((p) => p.slug === slug)
  const prev = published[idx + 1] ?? null
  const next = published[idx - 1] ?? null

  const filename = slug.split("/").pop() + ".md"

  return (
    <main className="min-h-screen bg-[#09090B] font-mono">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 bg-[#09090B]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center gap-5">
          <Link href="/" className="text-sm select-none hover:opacity-80 transition-opacity">
            <span className="text-[#39FF14]">gabriel</span>
            <span className="text-zinc-700">@fiveone</span>
          </Link>
          <span className="text-zinc-800">/</span>
          <Link href="/log" className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs">log</Link>
          <span className="text-zinc-800">/</span>
          <span className="text-zinc-600 text-xs truncate">{filename}</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-5 pt-24 pb-24">
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
          {/* Main content */}
          <div>
            <TerminalWindow title={`gabriel@fiveone: ~/log`}>
              {/* Command line */}
              <div className="mb-6">
                <Prompt path="~/log" />
                <span className="text-zinc-300">cat {filename}</span>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-2 mb-4 text-[12px] text-zinc-500">
                <PostTypeBadge type={post.type} />
                {post.difficulty && <DifficultyBadge difficulty={post.difficulty} />}
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span>{post.readingTime} min de leitura</span>
                {post.platform && (
                  <>
                    <span>·</span>
                    <span className="text-zinc-600">{post.platform}</span>
                  </>
                )}
              </div>

              <h1 className="text-zinc-100 text-xl font-bold mb-2 leading-tight">{post.title}</h1>
              <p className="text-zinc-500 text-[13px] mb-6">{post.summary}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/log/tags/${tag}`}
                    className="text-[11px] text-zinc-600 hover:text-sky-400 transition-colors border border-zinc-800 px-1.5 py-0.5 rounded"
                  >
                    #{tag}
                  </Link>
                ))}
                {post.draft && (
                  <span className="text-[11px] text-yellow-500/80 border border-yellow-800/40 px-1.5 py-0.5 rounded">
                    draft
                  </span>
                )}
              </div>

              {/* Series */}
              {post.series && (
                <SeriesList series={post.series} posts={allPosts} currentSlug={post.slug} />
              )}

              {/* MDX body */}
              <MDXContent code={post.content} />
            </TerminalWindow>

            {/* Prev / Next */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-[12px]">
              {prev ? (
                <Link
                  href={`/log/${prev.slug}`}
                  className="group border border-zinc-800 rounded-lg p-3 hover:border-zinc-600 transition-colors"
                >
                  <div className="text-zinc-600 mb-1">← anterior</div>
                  <div className="text-zinc-300 group-hover:text-zinc-100 transition-colors line-clamp-2">
                    {prev.title}
                  </div>
                </Link>
              ) : <div />}
              {next && (
                <Link
                  href={`/log/${next.slug}`}
                  className="group border border-zinc-800 rounded-lg p-3 hover:border-zinc-600 transition-colors text-right"
                >
                  <div className="text-zinc-600 mb-1">próximo →</div>
                  <div className="text-zinc-300 group-hover:text-zinc-100 transition-colors line-clamp-2">
                    {next.title}
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar: TOC */}
          <aside className="hidden lg:block sticky top-20 self-start">
            <TOC rawHtml={post.raw} />
          </aside>
        </div>
      </div>
    </main>
  )
}
