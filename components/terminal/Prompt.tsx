interface Props {
  path?: string
}

export function Prompt({ path = "~" }: Props) {
  return (
    <span className="select-none shrink-0" aria-hidden="true">
      <span className="text-[#39FF14]">gabriel</span>
      <span className="text-zinc-600">@</span>
      <span className="text-sky-400">fiveone</span>
      <span className="text-zinc-600">:</span>
      <span className="text-violet-400">{path}</span>
      <span className="text-zinc-400">$ </span>
    </span>
  )
}
