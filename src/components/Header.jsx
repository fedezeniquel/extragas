import { Flame } from 'lucide-react'
import { lunesDeSemana } from '../lib/fecha'

function formatearRangoSemana(lunes) {
  const domingo = new Date(lunes)
  domingo.setDate(domingo.getDate() + 6)

  const diaLunes = lunes.getDate()
  const diaDomingo = domingo.getDate()
  const mesDomingo = domingo.toLocaleDateString('es-AR', { month: 'long' })

  if (lunes.getMonth() === domingo.getMonth()) {
    return `Semana del ${diaLunes} al ${diaDomingo} de ${mesDomingo}`
  }
  const mesLunes = lunes.toLocaleDateString('es-AR', { month: 'long' })
  return `Semana del ${diaLunes} de ${mesLunes} al ${diaDomingo} de ${mesDomingo}`
}

export function Header() {
  const rango = formatearRangoSemana(lunesDeSemana())

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-brand-border bg-brand-dark/95 px-4 py-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <Flame className="h-6 w-6 text-brand-purple" />
        <span className="text-lg font-black">Extragas</span>
      </div>
      <span className="text-xs text-white/50">{rango}</span>
    </header>
  )
}
