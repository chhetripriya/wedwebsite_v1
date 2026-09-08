"use client"

import { useEffect, useRef, useState } from "react"
import { wedding } from "@/lib/wedding-config"

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [started, setStarted] = useState(false)
  const drawing = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const paint = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.scale(dpr, dpr)

      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height)
      grad.addColorStop(0, "#F7C8D4")
      grad.addColorStop(0.5, "#D8CCF1")
      grad.addColorStop(1, "#CBE8DD")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, rect.width, rect.height)

      // subtle sparkle dots
      ctx.fillStyle = "rgba(255,255,255,0.55)"
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * rect.width
        const y = Math.random() * rect.height
        ctx.beginPath()
        ctx.arc(x, y, Math.random() * 1.6 + 0.4, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.fillStyle = "#5A4A5E"
      ctx.font = "500 13px var(--font-serif), Georgia, serif"
      ctx.textAlign = "center"
      ctx.letterSpacing = "4px"
      ctx.fillText("SCRATCH TO REVEAL THE DATE", rect.width / 2, rect.height / 2 + 5)
    }

    paint()
  }, [])

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas || revealed) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, 26, 0, Math.PI * 2)
    ctx.fill()
    checkProgress(ctx, canvas)
  }

  const checkProgress = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let cleared = 0
    const step = 32
    for (let i = 3; i < data.length; i += 4 * step) {
      if (data[i] === 0) cleared++
    }
    const ratio = cleared / (data.length / (4 * step))
    if (ratio > 0.5) setRevealed(true)
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div
        ref={wrapRef}
        className="relative h-32 select-none overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_20px_40px_-20px_rgb(90_74_94_/_0.35)]"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white via-white to-butter/40">
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            We&apos;re getting married
          </p>
          <p className="shimmer-text mt-1 text-4xl font-semibold tracking-[0.15em] sm:text-5xl">
            {wedding.weddingDateLabel}
          </p>
          <p className="mt-1 text-sm italic text-muted-foreground">
            Saturday, {wedding.weddingDateLong}
          </p>
        </div>

        <canvas
          ref={canvasRef}
          role="button"
          tabIndex={0}
          aria-label="Scratch to reveal the wedding date"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setRevealed(true)
          }}
          onPointerDown={(e) => {
            drawing.current = true
            setStarted(true)
            e.currentTarget.setPointerCapture(e.pointerId)
            scratchAt(e.clientX, e.clientY)
          }}
          onPointerMove={(e) => drawing.current && scratchAt(e.clientX, e.clientY)}
          onPointerUp={() => (drawing.current = false)}
          onPointerLeave={() => (drawing.current = false)}
          className={`absolute inset-0 h-full w-full cursor-grab touch-none transition-opacity duration-700 active:cursor-grabbing ${revealed ? "pointer-events-none opacity-0" : "opacity-100"}`}
        />
      </div>
      <p className="mt-3 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {revealed ? "Mark your calendars" : started ? "Keep going..." : "Rub the card with your finger or mouse"}
      </p>
    </div>
  )
}
