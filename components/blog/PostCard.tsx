import Link from "next/link"
import { PostTypeBadge, DifficultyBadge } from "@/components/terminal/Badge"
import { formatDate } from "@/lib/posts"
import type { Post } from "@/lib/content"

interface Props {
  post: Post
}

export function PostCard({ post }: Props) {
  return (
    <div className="flex items-start gap-3 py-2 group">
      <span className="text-zinc-600 text-[11px] tabular-nums shrink-0 mt-0.5 w-20 hidden sm:block">
        {formatDate(post.date)}
      </span>
      <PostTypeBadge type={post.type} />
      {post.difficulty && <DifficultyBadge difficulty={post.difficulty} />}
      <div className="min-w-0">
        <Link
          href={`/log/${post.slug}`}
          className="text-zinc-200 hover:text-[#39FF14] transition-colors text-[13px] group-hover:underline underline-offset-2"
        >
          {post.title}
        </Link>
        <p className="text-zinc-600 text-[11px] mt-0.5 truncate">{post.summary}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/log/tags/${tag}`}
              className="text-[10px] text-zinc-600 hover:text-sky-400 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
      {post.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover.src}
          alt=""
          loading="lazy"
          className="ml-auto shrink-0 w-14 h-14 sm:w-20 sm:h-14 object-contain bg-zinc-950 rounded border border-zinc-800"
        />
      )}
    </div>
  )
}
