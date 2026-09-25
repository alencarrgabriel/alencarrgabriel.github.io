#!/usr/bin/env node
/**
 * Usage: npm run new-post -- <type> <slug>
 *
 * Types: writeup | leetcode | til | notes | log
 * Example: npm run new-post -- writeup htb-busqueda
 */
import fs from "node:fs"
import path from "node:path"

const TYPES = ["writeup", "leetcode", "til", "notes", "log"]

const [, , type, slug] = process.argv

if (!type || !slug) {
  console.error("Usage: npm run new-post -- <type> <slug>")
  console.error(`Types: ${TYPES.join(" | ")}`)
  process.exit(1)
}

if (!TYPES.includes(type)) {
  console.error(`Unknown type "${type}". Valid types: ${TYPES.join(", ")}`)
  process.exit(1)
}

const today = new Date().toISOString().slice(0, 10)
const root = path.resolve(process.cwd(), "content")
const templatePath = path.join(root, "_templates", `${type}.md`)
const outPath = path.join(root, "log", `${today}-${slug}.md`)

if (!fs.existsSync(templatePath)) {
  console.error(`Template not found: ${templatePath}`)
  process.exit(1)
}

if (fs.existsSync(outPath)) {
  console.error(`File already exists: ${outPath}`)
  process.exit(1)
}

let template = fs.readFileSync(templatePath, "utf8")
template = template.replace(/^date: .*/m, `date: ${today}`)

fs.writeFileSync(outPath, template, "utf8")
console.log(`Created: ${outPath}`)
