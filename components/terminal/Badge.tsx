type PostType = "writeup" | "til" | "leetcode" | "notes" | "log"
type ProjectStatus = "PROD" | "BETA" | "DONE" | "USED" | "WIP"
type Difficulty = "easy" | "medium" | "hard"

const POST_TYPE_STYLE: Record<PostType, string> = {
  writeup:  "text-[#39FF14] border-[#39FF14]/30",
  til:      "text-sky-400 border-sky-400/30",
  leetcode: "text-yellow-400 border-yellow-400/30",
  notes:    "text-purple-400 border-purple-400/30",
  log:      "text-zinc-400 border-zinc-600/40",
}

const PROJECT_STATUS_STYLE: Record<ProjectStatus, string> = {
  PROD: "text-[#39FF14] border-[#39FF14]/30",
  BETA: "text-yellow-400 border-yellow-400/30",
  DONE: "text-blue-400 border-blue-400/30",
  USED: "text-purple-400 border-purple-400/30",
  WIP:  "text-orange-400 border-orange-400/30",
}

const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  easy:   "text-[#39FF14] border-[#39FF14]/30",
  medium: "text-yellow-400 border-yellow-400/30",
  hard:   "text-red-400 border-red-400/30",
}

const ROADMAP_STATUS_STYLE: Record<"todo" | "wip" | "done", string> = {
  todo: "text-zinc-500 border-zinc-700/40",
  wip:  "text-yellow-400 border-yellow-400/30",
  done: "text-[#39FF14] border-[#39FF14]/30",
}

interface BadgeProps {
  label: string
  className?: string
}

function BadgeBase({ label, className }: BadgeProps) {
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${className}`}>
      {label}
    </span>
  )
}

export function PostTypeBadge({ type }: { type: PostType }) {
  return <BadgeBase label={type.toUpperCase()} className={POST_TYPE_STYLE[type]} />
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return <BadgeBase label={status} className={PROJECT_STATUS_STYLE[status]} />
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <BadgeBase label={difficulty} className={DIFFICULTY_STYLE[difficulty]} />
}

export function RoadmapStatusBadge({ status }: { status: "todo" | "wip" | "done" }) {
  const label = status === "todo" ? "TODO" : status === "wip" ? "WIP" : "DONE"
  return <BadgeBase label={label} className={ROADMAP_STATUS_STYLE[status]} />
}
