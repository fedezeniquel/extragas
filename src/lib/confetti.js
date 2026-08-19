import { create } from 'canvas-confetti'

let dispararImpl = null

function getDisparador() {
  if (dispararImpl) return dispararImpl

  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.inset = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.zIndex = '100'
  canvas.style.pointerEvents = 'none'
  document.body.appendChild(canvas)

  dispararImpl = create(canvas, { resize: true, useWorker: true })
  return dispararImpl
}

export function dispararConfetti() {
  const disparar = getDisparador()
  disparar({
    particleCount: 60,
    spread: 70,
    startVelocity: 35,
    origin: { y: 0.7 },
    colors: ['#00C853', '#6D28D9', '#ffffff'],
  })
}
