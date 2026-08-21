import { useEffect, useMemo, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db, listoAuth, TIPO_INICIAL, TIPO_VENTA } from '../firebase'
import { fechaLocal, semanaIdActual } from '../lib/fecha'

export function useStock() {
  const semanaId = semanaIdActual()
  const [movimientos, setMovimientos] = useState(undefined)

  useEffect(() => {
    let cancelado = false
    let unsubscribe = () => {}

    listoAuth.then(() => {
      if (cancelado) return
      const q = query(
        collection(db, 'movimientos'),
        where('semanaId', '==', semanaId),
        orderBy('ts', 'desc'),
      )
      unsubscribe = onSnapshot(q, (snapshot) => {
        setMovimientos(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
      })
    })

    return () => {
      cancelado = true
      unsubscribe()
    }
  }, [semanaId])

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
    await listoAuth
    const ahora = new Date()
    return addDoc(collection(db, 'movimientos'), {
      fecha: fechaLocal(ahora),
      semanaId: semanaIdActual(ahora),
      hora: ahora.toTimeString().slice(0, 5),
      tipo,
      g10,
      g15,
      g45,
      nota,
      ts: Date.now(),
    })
  }

  async function eliminarMovimiento(id) {
    await listoAuth
    return deleteDoc(doc(db, 'movimientos', id))
  }

  return {
    semanaId,
    movimientos: movimientos ?? [],
    cargando: movimientos === undefined,
    stock,
    agregarMovimiento,
    eliminarMovimiento,
  }
}
