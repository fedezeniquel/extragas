import Dexie from 'dexie'

export const TIPO_INICIAL = 'INICIAL'
export const TIPO_VENTA = 'VENTA'

export const db = new Dexie('extragas')

db.version(1).stores({
  movimientos: '++id, fecha, hora, tipo, g10, g15, g45, nota',
})

export default db
