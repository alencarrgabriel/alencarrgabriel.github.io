import { defineConfig, defineCollection, s } from "velite"
import rehypePrettyCode from "rehype-pretty-code"

const postSchema = s
  .object({
    title: s.string().min(1),
    date: s.isodate(),
    type: s.enum(["writeup", "til", "leetcode", "notes", "log"]),
    tags: s.array(s.string()).default([]),
    summary: s.string().min(1),
    cover: s.image().optional(),
    coverPosition: s.string().optional(),
    series: s.string().optional(),
    difficulty: s.enum(["easy", "medium", "hard"]).optional(),
    platform: s.enum(["htb", "thm", "portswigger", "leetcode", "overthewire", "beecrowd", "outro"]).optional(),
    draft: s.boolean().default(false),
    lang: s.enum(["pt", "en"]).default("pt"),
    slug: s.path(),
    raw: s.raw(),
    content: s.mdx(),
  })
  .transform((data) => ({
    ...data,
    readingTime: Math.max(1, Math.ceil(data.raw.split(/\s+/).length / 200)),
    // slug comes from the file path: content/log/my-post.md → "log/my-post"
    // strip the "log/" prefix to get just the post slug
    slug: data.slug.replace(/^log\//, ""),
  }))

const roadmapItemSchema = s.object({
  name: s.string(),
  status: s.enum(["todo", "wip", "done"]),
  progress: s.array(s.number()).length(2).optional(),
  tags: s.array(s.string()).default([]),
})

const roadmapTrackSchema = s.object({
  track: s.string(),
  items: s.array(roadmapItemSchema),
})

const posts = defineCollection({
  name: "Post",
  pattern: "log/**/*.{md,mdx}",
  schema: postSchema,
})

const roadmap = defineCollection({
  name: "RoadmapTrack",
  pattern: "roadmap.yaml",
  schema: roadmapTrackSchema,
})

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:8].[ext]",
    clean: true,
  },
  collections: { posts, roadmap },
  // Em produção, rascunhos não entram nos dados gerados, então não vão para o bundle nem para o site.
  prepare: ({ posts }) => {
    if (process.env.NODE_ENV !== "production") return
    for (let i = posts.length - 1; i >= 0; i--) {
      if (posts[i].draft) posts.splice(i, 1)
    }
  },
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "vitesse-dark",
            light: "vitesse-dark",
          },
          keepBackground: false,
          onVisitLine(node: { children: { type: string; value: string }[] }) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
          onVisitHighlightedLine(node: { properties: { className: string[] } }) {
            node.properties.className = ["line--highlighted"]
          },
          onVisitHighlightedChars(node: { properties: { className: string[] } }) {
            node.properties.className = ["word--highlighted"]
          },
        },
      ],
    ],
  },
})
