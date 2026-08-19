import { Cylinder } from 'lucide-react'

const TIPOS = [
  { key: 'g10', label: '10 kg' },
  { key: 'g15', label: '15 kg' },
  { key: 'g45', label: '45 kg' },
]

function GasCard({ label, cantidad }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-brand-border bg-brand-card p-4">
      <Cylinder className="h-6 w-6 text-brand-purple" />
      <span className="text-3xl font-black leading-none text-white">{cantidad}</span>
      <span className="text-xs text-white/50">{label}</span>
    </div>
  )
}

export function GasCardGrid({ stock }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {TIPOS.map(({ key, label }) => (
        <GasCard key={key} label={label} cantidad={stock[key]} />
      ))}
    </div>
  )
}
