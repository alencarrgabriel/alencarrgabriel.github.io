#!/usr/bin/env node
/**
 * Cria um post novo já como rascunho.
 *
 *   npm run post                          → pergunta tipo e título
 *   npm run post -- til "SSH config"      → sem perguntas
 *
 * Tipos: writeup | leetcode | til | notes | log
 */
import fs from "node:fs"
import path from "node:path"
import readline from "node:readline/promises"
import { spawnSync } from "node:child_process"

const TYPES = ["writeup", "leetcode", "til", "notes", "log"]
const root = path.resolve(process.cwd(), "content")

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const today = () => {
  const d = new Date()
  const p = (n) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

let [, , type, ...titleParts] = process.argv
let title = titleParts.join(" ").trim()

if (!type || !title) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  if (!type) {
    console.log("Tipo do post:")
    TYPES.forEach((t, i) => console.log(`  ${i + 1}) ${t}`))
    const answer = (await rl.question("> ")).trim()
    type = TYPES[Number(answer) - 1] ?? answer
  }
  if (!TYPES.includes(type)) {
    console.error(`Tipo inválido "${type}". Use: ${TYPES.join(", ")}`)
    process.exit(1)
  }
  if (!title) title = (await rl.question("Título: ")).trim()
  rl.close()
}

if (!TYPES.includes(type)) {
  console.error(`Tipo inválido "${type}". Use: ${TYPES.join(", ")}`)
  process.exit(1)
}

const slug = slugify(title)
if (!slug) {
  console.error("Título vazio ou sem caracteres válidos.")
  process.exit(1)
}

const outPath = path.join(root, "log", `${slug}.md`)
if (fs.existsSync(outPath)) {
  console.error(`Já existe: ${outPath}`)
  process.exit(1)
}

const template = fs.readFileSync(path.join(root, "_templates", `${type}.md`), "utf8")
const content = template
  .replace(/^title: .*/m, `title: ${JSON.stringify(title)}`)
  .replace(/^date: .*/m, `date: ${today()}`)
  .replace(/^draft: .*/m, "draft: true")

fs.writeFileSync(outPath, content, "utf8")
console.log(`Criado (rascunho): content/log/${slug}.md`)
console.log("Publicar depois com: npm run ship")

// abre no VS Code se o comando `code` existir; ignora se não
spawnSync("code", [outPath], { shell: true, stdio: "ignore" })
