# alencarrgabriel.github.io

Personal portfolio and technical blog (alencar.log) built with Next.js 15 and deployed to GitHub Pages.

## Stack

- **Next.js 15** — static export (`output: "export"`)
- **Velite** — content layer, compiles Markdown/MDX with typed frontmatter
- **Tailwind CSS v3**
- **rehype-pretty-code + Shiki** — build-time syntax highlighting (theme: `vitesse-dark`)

---

## Writing a post

```bash
npm run post                      # asks type + title
npm run post -- til "SSH config"  # or pass them directly
```

Creates `content/log/<slug>.md` as a **draft** (`draft: true`), dated today, and opens it in VS Code.
Write it, preview with `npm run dev` (drafts are visible there), then:

```bash
npm run ship                      # lists drafts, asks which one
npm run ship -- ssh-config        # or pass the slug
```

`ship` sets `draft: false` and the date to today, validates the frontmatter (Velite),
commits only that file and asks before pushing. The push triggers the GitHub Pages deploy (~2 min).
If validation fails, the file goes back to draft and nothing is committed.

Manual alternative (e.g. from the phone via github.dev): copy a template from `content/_templates/`
into `content/log/`, set `draft: false`, commit to `main`.

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

### Images

Put image files in `content/log/img/` (download them — don't hotlink Pinterest/CDN URLs, they break).
Keep them light (JPG/WebP, ~1600px wide, under ~300 KB).

```md
---
cover: ./img/bandit.jpg        # optional: banner on the post + thumbnail in the list
coverPosition: "50% 20%"       # optional: crop anchor (x y); "50% 0%" = top
---

## Any section

![Legenda que aparece embaixo da imagem](./img/minha-imagem.jpg)
```

Velite copies the files to `public/static/` with a hash and rewrites the paths at build time.
The image alt text is rendered as the caption, so use it to credit the author when it isn't yours.

### Drafts

- Posts with `draft: true` are **visible in `npm run dev`** but stripped from the generated data in production builds (they never reach the site or the JS bundle).
- Publish with `npm run ship`, or set `draft: false` by hand and push.

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

A post shows up under a roadmap item when it shares at least one of the item's `tags`
(e.g. tag a post `bandit-0-10` to link it to the "Níveis 0–10" item). Keep at most 3 tracks in `wip`.

---

## Development

```bash
npm run dev       # start dev server (drafts visible)
npm run build     # production build to out/
npm run post      # scaffold a new draft
npm run ship      # publish a draft (validate + commit + push)
```

The site deploys automatically to GitHub Pages on push to `main`.
