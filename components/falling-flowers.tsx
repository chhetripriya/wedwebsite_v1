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

    // With "reduce motion" on we keep a calmer, slower drift instead of
    // removing the effect entirely, so the page never looks broken.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const speed = reduceMotion ? 0.8 : 1.35

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const fitCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    fitCanvas()

    const petals: Petal[] = []
    const AMBIENT_COUNT = Math.min(reduceMotion ? 14 : 24, Math.floor(width / 46))

    const random = (a: number, b: number) => a + Math.random() * (b - a)
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

    const spawnAmbient = (fromTop = false): Petal => ({
      x: random(0, width),
      y: fromTop ? random(-80, -10) : random(-height, height),
      size: random(5, 10),
      vx: random(-0.3, 0.3),
      vy: random(0.8, 1.8),
      rot: random(0, Math.PI * 2),
      vr: random(-0.02, 0.02),
      color: pick(COLORS),
      kind: Math.random() > 0.55 ? "flower" : "petal",
      life: 0,
      maxLife: Infinity,
      burst: false,
    })

    for (let i = 0; i < AMBIENT_COUNT; i++) petals.push(spawnAmbient())

    const burstAt = (x: number, y: number, power = 1) => {
      const count = Math.round(11 * power)
      for (let i = 0; i < count; i++) {
        const angle = random(0, Math.PI * 2)
        const velocity = random(1.2, 3.8) * power
        petals.push({
          x: x + random(-8, 8),
          y: y + random(-8, 8),
          size: random(3.5, 7) * power,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - random(0.2, 1.1),
          rot: random(0, Math.PI * 2),
          vr: random(-0.07, 0.07),
          color: pick(COLORS),
          kind: Math.random() > 0.48 ? "flower" : "petal",
          life: 0,
          maxLife: random(42, 78),
          burst: true,
        })
      }
    }

    let lastMouse = { x: -9999, y: -9999, t: 0 }
    let lastTrail = 0

    const addTrailFlower = (x: number, y: number, dx: number, dy: number) => {
      const angle = Math.atan2(dy, dx)
      const speed = Math.min(1.8, Math.max(0.35, Math.hypot(dx, dy) * 0.02))
      petals.push({
        x: x + random(-3, 3),
        y: y + random(-3, 3),
        size: random(4, 7.5),
        vx: -Math.cos(angle) * speed * 0.65 + random(-0.22, 0.22),
        vy: -Math.sin(angle) * speed * 0.4 + random(0.15, 0.55),
        rot: random(0, Math.PI * 2),
        vr: random(-0.07, 0.07),
        color: pick(COLORS),
        kind: Math.random() > 0.7 ? "flower" : "petal",
        life: 0,
        maxLife: random(34, 62),
        burst: true,
      })
    }

    const onMove = (e: MouseEvent | PointerEvent) => {
      if ("pointerType" in e && e.pointerType && e.pointerType !== "mouse") return
      const now = performance.now()
      if (lastMouse.t && now - lastMouse.t < 16) return

      const dx = e.clientX - lastMouse.x
      const dy = e.clientY - lastMouse.y
      const distance = lastMouse.t ? Math.hypot(dx, dy) : 0
      lastMouse = { x: e.clientX, y: e.clientY, t: now }
      if (!distance) return

      // Leave a clearly visible floral trail while the mouse moves.
      // The spacing is distance-based, so slow and fast movement both work.
      const spacing = 55
      const amount = Math.min(2, Math.max(1, Math.ceil(distance / spacing)))
      for (let i = 0; i < amount; i++) {
        const ratio = (i + 1) / amount
        const x = e.clientX - dx * (1 - ratio)
        const y = e.clientY - dy * (1 - ratio)
        addTrailFlower(x, y, dx, dy)
      }

      // Add a tiny extra sparkle at the current cursor position, throttled.
      if (now - lastTrail > 180) {
        lastTrail = now
        burstAt(e.clientX, e.clientY, 0.07)
      }
    }

    const onClick = (e: MouseEvent) => {
      burstAt(e.clientX, e.clientY, 1.15)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("click", onClick)
    window.addEventListener("resize", fitCanvas)

    let frame = 0
    let t = 0
    let last = performance.now()
    let running = true

    const tick = (now: number) => {
      if (!running) return
      // Frame-rate independent step, clamped so a throttled/background tab
      // doesn't make everything jump when it wakes up.
      const step = Math.min(2, (now - last) / (1000 / 60)) * speed
      last = now
      t += 0.01 * step
      ctx.clearRect(0, 0, width, height)
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i]
        p.life += step
        p.x += (p.vx + Math.sin(t * 2 + p.y * 0.01) * 0.35) * step
        p.y += p.vy * step
        p.rot += p.vr * step
        if (p.burst) {
          p.vy += 0.02 * step
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

    const start = () => {
      cancelAnimationFrame(frame)
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }

    // Restart the loop when the tab becomes visible again so it can never
    // stay frozen after being backgrounded.
    const onVisibility = () => {
      if (document.visibilityState === "visible") start()
    }
    document.addEventListener("visibilitychange", onVisibility)
    start()

    return () => {
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("click", onClick)
      window.removeEventListener("resize", fitCanvas)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
      style={{ width: "100vw", height: "100vh" }}
    />
  )
}
