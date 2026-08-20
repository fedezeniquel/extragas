import { useState } from 'react'
import { TIPO_VENTA } from '../firebase'
import { cn } from '../lib/cn'
import { Modal } from './Modal'
import { Stepper } from './Stepper'

const LABELS = { g10: '10 kg', g15: '15 kg', g45: '45 kg' }

export function MovimientoModal({ tipo, onClose, onGuardar }) {
  const [cantidades, setCantidades] = useState({ g10: 0, g15: 0, g45: 0 })
  const [nota, setNota] = useState('')
  const [guardando, setGuardando] = useState(false)

  const total = cantidades.g10 + cantidades.g15 + cantidades.g45
  const esVenta = tipo === TIPO_VENTA

  function delta(key, d) {
    setCantidades((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + d) }))
  }

  async function guardar() {
    if (total === 0 || guardando) return
    setGuardando(true)
    await onGuardar({ ...cantidades, nota: nota.trim() })
  }

  return (
    <Modal title={esVenta ? 'Nueva Venta' : 'Cargar Stock Inicial'} onClose={onClose}>
      <div className="flex flex-col gap-4">
        {Object.entries(LABELS).map(([key, label]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="font-semibold text-white/80">{label}</span>
            <Stepper value={cantidades[key]} onDelta={(d) => delta(key, d)} nombre={label} />
          </div>
        ))}

        <textarea
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Nota (opcional)"
          className="min-h-16 rounded-xl border border-brand-border bg-brand-dark p-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-purple"
        />

        <button
          type="button"
          disabled={total === 0 || guardando}
          onClick={guardar}
          className={cn(
            'flex h-12 items-center justify-center rounded-xl text-base font-bold disabled:opacity-40',
            esVenta ? 'bg-brand-green text-black' : 'bg-brand-purple text-white',
          )}
        >
          {esVenta ? `Registrar venta (${total})` : `Cargar stock (${total})`}
        </button>
      </div>
    </Modal>
  )
}
