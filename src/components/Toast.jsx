import { useEffect } from 'react'
import { CircleCheck } from 'lucide-react'

export function Toast({ mensaje, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[calc(4.5rem+env(safe-area-inset-top))] z-[70] flex justify-center px-4">
      <div className="flex items-center gap-2 rounded-xl border border-brand-green bg-brand-card px-4 py-3 shadow-lg">
        <CircleCheck className="h-5 w-5 shrink-0 text-brand-green" />
        <span className="text-sm font-semibold text-white">{mensaje}</span>
      </div>
    </div>
  )
}
