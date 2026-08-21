import { useMemo, useState } from 'react'
import { useStock } from './hooks/useStock'
import { TIPO_INICIAL, TIPO_VENTA } from './firebase'
import { Header } from './components/Header'
import { StockRing } from './components/StockRing'
import { GasCardGrid } from './components/GasCardGrid'
import { MovimientoModal } from './components/MovimientoModal'
import { ConfirmDialog } from './components/ConfirmDialog'
import { Historial } from './components/Historial'
import { Toast } from './components/Toast'

function App() {
  const { movimientos, stock, agregarMovimiento, eliminarMovimiento } = useStock()
  const [modalTipo, setModalTipo] = useState(null)
  const [idAEliminar, setIdAEliminar] = useState(null)
  const [aviso, setAviso] = useState(null)

  const totalInicial = useMemo(
    () =>
      movimientos
        .filter((m) => m.tipo === TIPO_INICIAL)
        .reduce((acc, m) => acc + m.g10 + m.g15 + m.g45, 0),
    [movimientos],
  )
  const totalActual = stock.g10 + stock.g15 + stock.g45
  const porcentaje = totalInicial > 0 ? (totalActual / totalInicial) * 100 : 0

  async function handleGuardar(datos) {
    await agregarMovimiento({ tipo: modalTipo, ...datos })
    const fueVenta = modalTipo === TIPO_VENTA
    setModalTipo(null)
    if (fueVenta) setAviso('Venta registrada')
  }

  async function confirmarEliminar() {
    await eliminarMovimiento(idAEliminar)
    setIdAEliminar(null)
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col">
      <Header />

      <main className="flex flex-1 flex-col gap-6 px-4 py-6">
        <StockRing porcentaje={porcentaje} totalActual={totalActual} />

        <GasCardGrid stock={stock} />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setModalTipo(TIPO_INICIAL)}
            className="h-12 flex-1 rounded-xl border border-brand-purple font-bold text-brand-purple active:bg-brand-purple/10"
          >
            Cargar Stock
          </button>
          <button
            type="button"
            onClick={() => setModalTipo(TIPO_VENTA)}
            className="h-12 flex-1 rounded-xl bg-brand-green font-bold text-black active:brightness-95"
          >
            Nueva Venta
          </button>
        </div>

        <section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-white/50">Historial de la semana</h2>
          <Historial movimientos={movimientos} onEliminar={setIdAEliminar} />
        </section>
      </main>

      {modalTipo && (
        <MovimientoModal
          tipo={modalTipo}
          stock={stock}
          onClose={() => setModalTipo(null)}
          onGuardar={handleGuardar}
        />
      )}

      {idAEliminar != null && (
        <ConfirmDialog
          mensaje="¿Eliminar este movimiento? Esta acción no se puede deshacer."
          onCancel={() => setIdAEliminar(null)}
          onConfirm={confirmarEliminar}
        />
      )}

      {aviso && <Toast mensaje={aviso} onDone={() => setAviso(null)} />}
    </div>
  )
}

export default App
