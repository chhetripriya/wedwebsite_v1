"use client"

import { useEffect, useState } from "react"
import { wedding } from "@/lib/wedding-config"

function getParts(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown() {
  const [parts, setParts] = useState<ReturnType<typeof getParts> | null>(null)

  useEffect(() => {
    setParts(getParts(wedding.weddingDate))
    const id = setInterval(() => setParts(getParts(wedding.weddingDate)), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: "Days", value: parts?.days },
    { label: "Hours", value: parts?.hours },
    { label: "Minutes", value: parts?.minutes },
    { label: "Seconds", value: parts?.seconds },
  ]

  return (
    <section id="countdown" className="px-4 py-24">
      <div className="relative mx-auto max-w-4xl animate-gentle-bloom overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-plum via-[#6b5a72] to-[#8a6f80] px-6 py-16 text-center text-white shadow-[0_40px_80px_-40px_rgb(90_74_94_/_0.8)]">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blush/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-lavender/30 blur-3xl" />

        <p className="relative text-xs uppercase tracking-[0.4em] text-blush">Counting the moments</p>
        <h2 className="font-serif relative mt-3 text-5xl font-medium leading-none tracking-[-0.02em] sm:text-6xl">See you soon</h2>

        <div className="relative mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4" role="timer" aria-live="off">
          {units.map((u) => (
            <div key={u.label} className="rounded-2xl border border-white/15 bg-white/10 px-3 py-5 backdrop-blur">
              <p className="text-5xl font-light tabular-nums leading-none sm:text-6xl">
                {u.value === undefined ? "--" : String(u.value).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/70">{u.label}</p>
            </div>
          ))}
        </div>

        <p className="relative mt-8 text-lg italic text-white/80">
          until {wedding.bride.firstName} &amp; {wedding.groom.firstName} say &ldquo;I do&rdquo; on {wedding.weddingDateLong}
        </p>
      </div>
    </section>
  )
}
