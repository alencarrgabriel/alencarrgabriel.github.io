#!/usr/bin/env node
/**
 * Publica um rascunho: draft → false, data → hoje, valida, commit e push.
 *
 *   npm run ship            → lista os rascunhos e pergunta qual
 *   npm run ship -- slug    → publica direto
 */
import fs from "node:fs"
import path from "node:path"
import readline from "node:readline/promises"
import { execFileSync, spawnSync } from "node:child_process"

const logDir = path.resolve(process.cwd(), "content", "log")

const today = () => {
  const d = new Date()
  const p = (n) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

const frontmatter = (text) => text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ""
const field = (text, key) =>
  frontmatter(text).match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*(#.*)?$`, "m"))?.[1]

const drafts = fs
  .readdirSync(logDir)
  .filter((f) => /\.mdx?$/.test(f))
  .map((f) => {
    const text = fs.readFileSync(path.join(logDir, f), "utf8")
    return { file: f, slug: f.replace(/\.mdx?$/, ""), title: field(text, "title"), draft: field(text, "draft") === "true" }
  })
  .filter((p) => p.draft)

if (drafts.length === 0) {
  console.log("Nenhum rascunho. Crie um com: npm run post")
  process.exit(0)
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

let target = drafts.find((p) => p.slug === process.argv[2])
if (process.argv[2] && !target) {
  console.error(`Rascunho "${process.argv[2]}" não encontrado.`)
  process.exit(1)
}
if (!target) {
  console.log("Rascunhos:")
  drafts.forEach((p, i) => console.log(`  ${i + 1}) ${p.slug}  —  ${p.title}`))
  const n = Number((await rl.question("Publicar qual? > ")).trim())
  target = drafts[n - 1]
  if (!target) {
    console.error("Opção inválida.")
    process.exit(1)
  }
}

const filePath = path.join(logDir, target.file)
const original = fs.readFileSync(filePath, "utf8")
const updated = original
  .replace(/^draft: .*/m, "draft: false")
  .replace(/^date: .*/m, `date: ${today()}`)

// valida o frontmatter antes de publicar: o velite falha se algo estiver errado
fs.writeFileSync(filePath, updated, "utf8")
console.log("Validando...")
const check = spawnSync("npx", ["velite", "build"], { shell: true, stdio: "inherit" })
if (check.status !== 0) {
  fs.writeFileSync(filePath, original, "utf8")
  console.error("\nValidação falhou. Arquivo restaurado como rascunho. Corrija e tente de novo.")
  process.exit(1)
}

const relPath = path.join("content", "log", target.file)
execFileSync("git", ["add", relPath], { stdio: "inherit" })
// `-- <path>` commita só este arquivo, mesmo com outras coisas no stage
execFileSync("git", ["commit", "-m", `post: ${target.title ?? target.slug}`, "--", relPath], { stdio: "inherit" })

const answer = (await rl.question("Push agora (dispara o deploy)? [Y/n] ")).trim().toLowerCase()
rl.close()
if (answer === "" || answer === "y" || answer === "s") {
  execFileSync("git", ["push"], { stdio: "inherit" })
  console.log(`\nPublicado. Deploy em ~2 min: https://alencarrgabriel.github.io/log/${target.slug}`)
} else {
  console.log("Commit feito, push pendente. Rode: git push")
}
