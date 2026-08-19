import { Trash2 } from 'lucide-react'
import { TIPO_VENTA } from '../db'
import { cn } from '../lib/cn'

function resumenCantidades(m) {
  return [
    m.g10 ? `${m.g10}×10kg` : null,
    m.g15 ? `${m.g15}×15kg` : null,
    m.g45 ? `${m.g45}×45kg` : null,
  ]
    .filter(Boolean)
    .join(' · ')
}

export function Historial({ movimientos, onEliminar }) {
  if (movimientos.length === 0) {
    return <p className="py-8 text-center text-sm text-white/40">Todavía no hay movimientos hoy.</p>
  }

  return (
    <ul className="flex flex-col gap-2 pb-4">
      {movimientos.map((m) => (
        <li
          key={m.id}
          className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-card px-4 py-3"
        >
          <div className="flex flex-col">
            <span
              className={cn(
                'text-xs font-bold uppercase tracking-wide',
                m.tipo === TIPO_VENTA ? 'text-brand-green' : 'text-brand-purple',
              )}
            >
              {m.tipo} · {m.hora}
            </span>
            <span className="text-sm text-white/70">{resumenCantidades(m)}</span>
            {m.nota && <span className="text-xs text-white/40">{m.nota}</span>}
          </div>
          <button
            type="button"
            aria-label="Eliminar movimiento"
            onClick={() => onEliminar(m.id)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/40 active:bg-white/10 active:text-red-400"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </li>
      ))}
    </ul>
  )
}
