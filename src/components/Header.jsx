import { Flame } from 'lucide-react'

export function Header() {
  const fecha = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-brand-border bg-brand-dark/95 px-4 py-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <Flame className="h-6 w-6 text-brand-purple" />
        <span className="text-lg font-black">Extragas</span>
      </div>
      <span className="text-xs capitalize text-white/50">{fecha}</span>
    </header>
  )
}
