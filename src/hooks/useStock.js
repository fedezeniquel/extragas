import { useMemo } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, TIPO_INICIAL, TIPO_VENTA } from '../db'

function fechaHoy() {
  return new Date().toISOString().slice(0, 10)
}

export function useStock() {
  const fecha = fechaHoy()

  const movimientos = useLiveQuery(async () => {
    const rows = await db.movimientos.where('fecha').equals(fecha).toArray()
    return rows.sort((a, b) => b.id - a.id)
  }, [fecha])

  const stock = useMemo(() => {
    const totales = { g10: 0, g15: 0, g45: 0 }
    for (const mov of movimientos ?? []) {
      const signo = mov.tipo === TIPO_INICIAL ? 1 : mov.tipo === TIPO_VENTA ? -1 : 0
      totales.g10 += signo * (mov.g10 || 0)
      totales.g15 += signo * (mov.g15 || 0)
      totales.g45 += signo * (mov.g45 || 0)
    }
    return totales
  }, [movimientos])

  async function agregarMovimiento({ tipo, g10 = 0, g15 = 0, g45 = 0, nota = '' }) {
    const ahora = new Date()
    return db.movimientos.add({
      fecha: fechaHoy(),
      hora: ahora.toTimeString().slice(0, 5),
      tipo,
      g10,
      g15,
      g45,
      nota,
    })
  }

  async function eliminarMovimiento(id) {
    return db.movimientos.delete(id)
  }

  return {
    fecha,
    movimientos: movimientos ?? [],
    cargando: movimientos === undefined,
    stock,
    agregarMovimiento,
    eliminarMovimiento,
  }
}
