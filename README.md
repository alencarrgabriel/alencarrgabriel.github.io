# alencarrgabriel.github.io

Personal portfolio and technical blog (alencar.log) built with Next.js 15 and deployed to GitHub Pages.

## Stack

- **Next.js 15** — static export (`output: "export"`)
- **Velite** — content layer, compiles Markdown/MDX with typed frontmatter
- **Tailwind CSS v4**
- **rehype-pretty-code + Shiki** — build-time syntax highlighting (theme: `vitesse-dark`)

---

## Writing a post

### Quick start

```bash
npm run new-post -- <type> <slug>
# e.g.
npm run new-post -- writeup htb-machine-name
npm run new-post -- til ssh-tunneling
npm run new-post -- leetcode two-sum
```

This creates `content/log/<slug>.md` pre-filled with the correct frontmatter for that type.

### Types

| Type | Use for |
|------|---------|
| `writeup` | CTF writeups (HTB, TryHackMe, PortSwigger) |
| `leetcode` | LeetCode solutions |
| `til` | Today I Learned — short notes |
| `notes` | Study notes, longer-form content |
| `log` | General dev log / journal entries |

### Frontmatter reference

```yaml
---
title: "Post Title"
date: "2026-01-15"          # YYYY-MM-DD
type: writeup               # writeup | til | leetcode | notes | log
tags: [htb, linux, privesc]
summary: "One-line summary shown in listing."
draft: true                 # omit or set false to publish

# Optional
series: "htb-starting-point"
difficulty: easy            # easy | medium | hard
platform: htb               # htb | thm | portswigger | leetcode | outro
lang: pt                    # pt | en (default: pt)
---
```

### Drafts

- Posts with `draft: true` are **visible in `npm run dev`** but **excluded from production builds**.
- To publish, remove `draft: true` (or set it to `false`) and push.

### MDX features

**Code blocks** render as terminal-style windows with syntax highlighting:

````md
```python title="exploit.py"
# highlighted line
print("hello")  # [!code highlight]
```
````

**Callouts** via blockquote syntax:

```md
> [!NOTE]
> This is a note.

> [!WARNING]
> This is a warning.

> [!TIP]
> This is a tip.
```

**Series** — link multiple posts together by giving them the same `series` slug in frontmatter. A navigation list appears at the top of each post.

---

## Roadmap

Edit `content/roadmap.yaml` to update the study plan. Each item can have:

```yaml
- name: "Topic Name"
  status: wip               # todo | wip | done
  progress: [12, 18]        # [done, total]
  tags: [web, portswigger]
```

The first `wip` item is shown as "now" on `/log` and the home page.

---

## Development

```bash
npm run dev       # start dev server (drafts visible)
npm run build     # production build to out/
npm run new-post  # scaffold a new post
```

The site deploys automatically to GitHub Pages on push to `main`.
