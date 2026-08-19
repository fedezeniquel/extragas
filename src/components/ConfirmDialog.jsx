import { TriangleAlert } from 'lucide-react'

export function ConfirmDialog({ mensaje, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-6"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-xs rounded-2xl border border-brand-border bg-brand-card p-5 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <TriangleAlert className="mx-auto mb-2 h-8 w-8 text-brand-green" />
        <p className="mb-4 text-sm text-white/80">{mensaje}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-11 flex-1 rounded-xl border border-brand-border font-semibold text-white active:bg-white/10"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-11 flex-1 rounded-xl bg-red-500 font-semibold text-white active:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
