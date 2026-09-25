import { posts as allPosts } from "@/lib/content"
import { getPublishedPosts } from "@/lib/posts"

export const dynamic = "force-static"

export async function GET() {
  const published = getPublishedPosts(allPosts).slice(0, 20)

  const baseUrl = "https://alencarrgabriel.github.io"

  const items = published
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${baseUrl}/log/${p.slug}</link>
      <guid>${baseUrl}/log/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.summary}]]></description>
      <category>${p.type}</category>
      ${p.tags.map((t) => `<category>${t}</category>`).join("\n      ")}
    </item>`
    )
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>alencar.log</title>
    <link>${baseUrl}/log</link>
    <description>Blog técnico de Gabriel Alencar — writeups, leetcode, TIL e notas de estudo.</description>
    <language>pt-BR</language>
    <atom:link href="${baseUrl}/log/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
