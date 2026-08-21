import { useState } from 'react'
import { ChevronDown, Trash2 } from 'lucide-react'
import { TIPO_INICIAL, TIPO_VENTA } from '../firebase'
import { fechaLocal } from '../lib/fecha'
import { cn } from '../lib/cn'

function resumenCantidades({ g10, g15, g45 }) {
  return (
    [g10 ? `${g10}×10kg` : null, g15 ? `${g15}×15kg` : null, g45 ? `${g45}×45kg` : null]
      .filter(Boolean)
      .join(' · ') || '—'
  )
}

function agruparPorDia(movimientos) {
  const grupos = new Map()
  for (const m of movimientos) {
    if (!grupos.has(m.fecha)) grupos.set(m.fecha, [])
    grupos.get(m.fecha).push(m)
  }
  return [...grupos.entries()].sort(([a], [b]) => (a < b ? 1 : -1))
}

function totalesDelDia(movs) {
  const cargado = { g10: 0, g15: 0, g45: 0 }
  const vendido = { g10: 0, g15: 0, g45: 0 }
  for (const m of movs) {
    const destino = m.tipo === TIPO_INICIAL ? cargado : m.tipo === TIPO_VENTA ? vendido : null
    if (!destino) continue
    destino.g10 += m.g10 || 0
    destino.g15 += m.g15 || 0
    destino.g45 += m.g45 || 0
  }
  return { cargado, vendido }
}

function formatearDia(fechaStr, hoyStr) {
  const [y, m, d] = fechaStr.split('-').map(Number)
  const fecha = new Date(y, m - 1, d)
  const nombre = fecha.toLocaleDateString('es-AR', { weekday: 'long' })
  const corta = fecha.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })
  const nombreCapitalizado = nombre.charAt(0).toUpperCase() + nombre.slice(1)
  return fechaStr === hoyStr ? `Hoy · ${nombreCapitalizado} ${corta}` : `${nombreCapitalizado} ${corta}`
}

export function Historial({ movimientos, onEliminar }) {
  const hoy = fechaLocal()
  const [expandidos, setExpandidos] = useState(() => new Set([hoy]))

  if (movimientos.length === 0) {
    return <p className="py-8 text-center text-sm text-white/40">Todavía no hay movimientos esta semana.</p>
  }

  function toggle(dia) {
    setExpandidos((prev) => {
      const next = new Set(prev)
      next.has(dia) ? next.delete(dia) : next.add(dia)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-3 pb-4">
      {agruparPorDia(movimientos).map(([dia, movs]) => {
        const { cargado, vendido } = totalesDelDia(movs)
        const abierto = expandidos.has(dia)

        return (
          <div key={dia} className="overflow-hidden rounded-xl border border-brand-border bg-brand-card">
            <button
              type="button"
              onClick={() => toggle(dia)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left active:bg-white/5"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-white">{formatearDia(dia, hoy)}</span>
                <span className="text-xs text-white/60">
                  <span className="text-brand-purple">Cargado: {resumenCantidades(cargado)}</span>
                  {'   '}
                  <span className="text-brand-green">Vendido: {resumenCantidades(vendido)}</span>
                </span>
              </div>
              <ChevronDown
                className={cn('h-5 w-5 shrink-0 text-white/40 transition-transform', abierto && 'rotate-180')}
              />
            </button>

            {abierto && (
              <ul className="flex flex-col gap-2 border-t border-brand-border p-3 pt-2">
                {movs.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center justify-between rounded-lg bg-brand-dark px-3 py-2"
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
            )}
          </div>
        )
      })}
    </div>
  )
}
