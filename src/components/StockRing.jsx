const RADIUS = 80
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function StockRing({ porcentaje, totalActual }) {
  const pctClamp = Math.min(100, Math.max(0, porcentaje))
  const offset = CIRCUMFERENCE - (pctClamp / 100) * CIRCUMFERENCE

  return (
    <div className="relative mx-auto flex h-52 w-52 items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="#243257" strokeWidth="16" />
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          stroke="#00C853"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-black text-white">{Math.round(pctClamp)}%</span>
        <span className="text-sm text-white/50">{totalActual} u. disponibles</span>
      </div>
    </div>
  )
}
