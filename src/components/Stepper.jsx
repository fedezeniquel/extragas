import { useEffect, useRef } from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '../lib/cn'

export function Stepper({ value, onDelta, nombre, max = Infinity }) {
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)
  const alTope = value >= max

  function stop() {
    clearTimeout(timeoutRef.current)
    clearInterval(intervalRef.current)
  }

  function start(delta) {
    onDelta(delta)
    timeoutRef.current = setTimeout(() => {
      let ticks = 0
      intervalRef.current = setInterval(() => {
        ticks += 1
        onDelta(delta * (ticks > 12 ? 5 : 1))
      }, 90)
    }, 400)
  }

  useEffect(() => stop, [])

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label={nombre ? `Restar ${nombre}` : 'Restar'}
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl border border-brand-border bg-brand-dark',
          'active:scale-95 active:bg-brand-border',
        )}
        onPointerDown={() => start(-1)}
        onPointerUp={stop}
        onPointerLeave={stop}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Minus className="h-5 w-5 text-white" />
      </button>
      <span className="w-10 text-center text-xl font-black tabular-nums text-white">{value}</span>
      <button
        type="button"
        aria-label={nombre ? `Sumar ${nombre}` : 'Sumar'}
        disabled={alTope}
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple',
          'active:scale-95 active:brightness-110 disabled:opacity-30',
        )}
        onPointerDown={() => start(1)}
        onPointerUp={stop}
        onPointerLeave={stop}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Plus className="h-5 w-5 text-white" />
      </button>
    </div>
  )
}
