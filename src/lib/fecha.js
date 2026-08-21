// Todas estas funciones trabajan en hora LOCAL a propósito (no UTC),
// porque Date#toISOString() usa UTC y en Argentina (UTC-3) eso corre la
// fecha al día siguiente a partir de las ~21hs, rompiendo el corte diario
// y semanal justo en las horas de más venta.

export function fechaLocal(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dia}`
}

// Lunes (00:00 local) de la semana a la que pertenece `d`.
export function lunesDeSemana(d = new Date()) {
  const copia = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const dia = copia.getDay() // 0 = domingo ... 6 = sábado
  const diff = dia === 0 ? -6 : 1 - dia
  copia.setDate(copia.getDate() + diff)
  return copia
}

// Id de semana usado para agrupar en Firestore: la fecha (YYYY-MM-DD) del
// lunes de esa semana. El stock se reinicia solo porque este id cambia.
export function semanaIdActual(d = new Date()) {
  return fechaLocal(lunesDeSemana(d))
}
