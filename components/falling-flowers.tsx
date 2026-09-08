"use client"

import { useEffect, useRef } from "react"

type Petal = {
  x: number
  y: number
  size: number
  vx: number
  vy: number
  rot: number
  vr: number
  color: string
  kind: "flower" | "petal"
  life: number
  maxLife: number
  burst: boolean
}

const COLORS = ["#F7C8D4", "#F3A9BC", "#D8CCF1", "#C3B1EC", "#CBE8DD", "#FBE7B5", "#CFE2F3", "#FFD9E1"]

function drawFlower(ctx: CanvasRenderingContext2D, size: number, color: string) {
  ctx.fillStyle = color
  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.ellipse(0, -size * 0.55, size * 0.4, size * 0.62, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.rotate((Math.PI * 2) / 5)
  }
  ctx.fillStyle = "#FBE7B5"
  ctx.beginPath()
  ctx.arc(0, 0, size * 0.28, 0, Math.PI * 2)
  ctx.fill()
}

function drawPetal(ctx: CanvasRenderingContext2D, size: number, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.bezierCurveTo(size * 0.9, -size * 0.6, size * 0.9, size * 0.6, 0, size)
  ctx.bezierCurveTo(-size * 0.9, size * 0.6, -size * 0.9, -size * 0.6, 0, -size)
  ctx.fill()
}

export function FallingFlowers() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const petals: Petal[] = []
    const AMBIENT_COUNT = Math.min(38, Math.floor(width / 34))

    const random = (a: number, b: number) => a + Math.random() * (b - a)
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

    const spawnAmbient = (fromTop = false): Petal => ({
      x: random(0, width),
      y: fromTop ? random(-80, -10) : random(-height, height),
      size: random(6, 14),
      vx: random(-0.3, 0.3),
      vy: random(0.5, 1.4),
      rot: random(0, Math.PI * 2),
      vr: random(-0.02, 0.02),
      color: pick(COLORS),
      kind: Math.random() > 0.55 ? "flower" : "petal",
      life: 0,
      maxLife: Infinity,
      burst: false,
    })

    for (let i = 0; i < AMBIENT_COUNT; i++) petals.push(spawnAmbient())

    let lastMouse = { x: 0, y: 0, t: 0 }
    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - lastMouse.t < 40) return
      const dx = e.clientX - lastMouse.x
      const dy = e.clientY - lastMouse.y
      lastMouse = { x: e.clientX, y: e.clientY, t: now }
      const count = Math.min(3, 1 + Math.floor(Math.hypot(dx, dy) / 40))
      for (let i = 0; i < count; i++) {
        petals.push({
          x: e.clientX + random(-6, 6),
          y: e.clientY + random(-6, 6),
          size: random(4, 9),
          vx: random(-1.2, 1.2) + dx * 0.02,
          vy: random(0.4, 1.6) + dy * 0.02,
          rot: random(0, Math.PI * 2),
          vr: random(-0.08, 0.08),
          color: pick(COLORS),
          kind: Math.random() > 0.5 ? "flower" : "petal",
          life: 0,
          maxLife: random(70, 120),
          burst: true,
        })
      }
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("resize", onResize)

    let frame = 0
    let t = 0
    const tick = () => {
      t += 0.01
      ctx.clearRect(0, 0, width, height)
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i]
        p.life++
        p.x += p.vx + Math.sin(t * 2 + p.y * 0.01) * 0.35
        p.y += p.vy
        p.rot += p.vr
        if (p.burst) {
          p.vy += 0.02
          p.vx *= 0.98
        }

        const alpha = p.burst ? Math.max(0, 1 - p.life / p.maxLife) : 0.9
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        if (p.kind === "flower") drawFlower(ctx, p.size, p.color)
        else drawPetal(ctx, p.size, p.color)
        ctx.restore()

        if (p.burst && p.life >= p.maxLife) {
          petals.splice(i, 1)
        } else if (!p.burst && (p.y > height + 30 || p.x < -40 || p.x > width + 40)) {
          petals[i] = spawnAmbient(true)
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
    />
  )
}
