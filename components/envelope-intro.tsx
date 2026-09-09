"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { wedding } from "@/lib/wedding-config"

type Phase = "closed" | "flap" | "lift" | "unfold" | "settle" | "leave" | "done"

// Timeline (ms from click):
// flap opens -> folded letter rises slowly out of the pocket -> letter unfolds
// from its middle -> letter settles to centre while the envelope drops away ->
// overlay fades to the main page -> unmount.
const TIMELINE: Array<[Phase, number]> = [
  ["lift", 900],
  ["unfold", 2700],
  ["settle", 4100],
  ["leave", 5600],
  ["done", 6500],
]

export function EnvelopeIntro({ onFinished }: { onFinished: () => void }) {
  const [phase, setPhase] = useState<Phase>("closed")
  const started = phase !== "closed"

  // Schedule the whole timeline once when the envelope is clicked; keying on
  // `started` (not `phase`) keeps later phase changes from clearing the timers.
  useEffect(() => {
    if (!started) return
    const timers = TIMELINE.map(([next, delay]) =>
      setTimeout(() => {
        setPhase(next)
        if (next === "leave") onFinished()
      }, delay),
    )
    return () => timers.forEach(clearTimeout)
  }, [started, onFinished])

  if (phase === "done") return null

  const order: Phase[] = ["closed", "flap", "lift", "unfold", "settle", "leave", "done"]
  const reached = (p: Phase) => order.indexOf(phase) >= order.indexOf(p)

  const flapOpen = started
  const letterLifted = reached("lift")
  const letterUnfolded = reached("unfold")
  const letterSettled = reached("settle")
  const leaving = phase === "leave"

  return (
    <div
      className={`envelope-overlay fixed inset-0 z-50 flex items-center justify-center bg-cream ${leaving ? "leave" : ""}`}
      style={{
        backgroundImage:
          "radial-gradient(60% 50% at 10% 0%, rgb(247 200 212 / 0.5), transparent 70%), radial-gradient(50% 45% at 95% 10%, rgb(216 204 241 / 0.55), transparent 70%), radial-gradient(55% 45% at 50% 100%, rgb(203 232 221 / 0.55), transparent 70%)",
      }}
    >
      <button
        type="button"
        onClick={() => phase === "closed" && setPhase("flap")}
        aria-label="Open the wedding invitation"
        disabled={started}
        className={`envelope-scene group relative mt-56 flex flex-col items-center gap-8 focus:outline-none sm:mt-64 ${started ? "" : "cursor-pointer"}`}
      >
        <div
          className={`relative h-[220px] w-[320px] sm:h-[270px] sm:w-[400px] ${started ? "" : "animate-float-soft"}`}
        >
          {/* Folded letter. The bottom half sits in the pocket; the top half is
              folded down over it and swings open once the letter is out. */}
          <div
            className={`envelope-letter absolute left-[6%] w-[88%] ${letterSettled ? "z-50" : "z-10"} ${letterLifted ? "lift" : ""} ${letterSettled ? "settle" : ""}`}
            style={{ top: "-34%", height: "84%" }}
          >
            {/* Top half: swings around the middle fold */}
            <div className={`envelope-letter-top absolute inset-x-0 top-0 h-1/2 ${letterUnfolded ? "open" : ""}`}>
              {/* Front face (inside of the letter) */}
              <div className="envelope-letter-face absolute inset-0 flex flex-col items-center justify-end rounded-t-md border border-b-0 border-blush/70 bg-white px-6 pb-2 text-center">
                <p className="text-lg font-serif font-medium tracking-[0.08em] leading-tight text-rose sm:text-xl">
                  ॐ गणेशाय नमः
                </p>
                <p className="mt-2 font-serif text-2xl font-medium tracking-[0.04em] text-plum sm:text-3xl">
                  A Sacred Beginning
                </p>
              </div>
              {/* Back face (outside of the letter, seen while folded) */}
              <div className="envelope-letter-face envelope-letter-back absolute inset-0 flex items-center justify-center rounded-b-md border border-t-0 border-blush/70 bg-white">
                <span className="font-script text-2xl text-rose/70 sm:text-3xl">
                  {wedding.bride.firstName} &amp; {wedding.groom.firstName}
                </span>
              </div>
            </div>

            {/* Bottom half */}
            <div className="absolute inset-x-0 bottom-0 flex h-1/2 flex-col items-center justify-start rounded-b-md border border-t-0 border-blush/70 bg-white px-6 pt-2 text-center shadow-[0_10px_30px_-10px_rgb(90_74_94_/_0.25)]">
              <div className="h-px w-16 bg-blush" />
              <p className="font-script mt-1 text-3xl leading-none text-rose sm:text-4xl">
                {wedding.bride.firstName} &amp; {wedding.groom.firstName}
              </p>
              <p className="mt-2 text-[10px] tracking-[0.12em] text-plum/80 sm:text-xs">
                With love, family &amp; blessings
              </p>
            </div>
          </div>

          {/* Envelope body */}
          <div
            className={`envelope-body absolute inset-0 z-20 overflow-hidden rounded-lg bg-[#e9d6ea] shadow-[0_25px_50px_-20px_rgb(90_74_94_/_0.45)] ${letterSettled ? "away" : ""}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f1dfe8] via-[#e4d3ee] to-[#d6c8ec]" />
            {/* Side and bottom folds */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom right, transparent 49.5%, rgb(255 255 255 / 0.22) 50%), linear-gradient(to bottom left, transparent 49.5%, rgb(255 255 255 / 0.22) 50%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[62%]"
              style={{
                clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
                background: "linear-gradient(to top, #dcc9ea, #e8d8ee)",
              }}
            />
          </div>

          {/* Flap with liner */}
          <div
            className={`envelope-flap envelope-body absolute left-0 right-0 top-0 h-[56%] ${flapOpen ? "open z-0" : "z-30"} ${letterSettled ? "away" : ""}`}
          >
            <div
              className="absolute inset-0 overflow-hidden [backface-visibility:hidden]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#efdfec] to-[#dccbe9]" />
            </div>
            {/* Back face (liner) visible once flipped */}
            <div
              className="absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateX(180deg)]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            >
              <Image
                src="/images/pastel-florals.png"
                alt=""
                fill
                sizes="400px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Wax seal */}
          <div
            className={`absolute left-1/2 top-[52%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose to-[#a86a74] text-white shadow-[inset_0_2px_6px_rgb(255_255_255_/_0.35),0_8px_18px_-6px_rgb(90_74_94_/_0.6)] transition-all duration-500 ${started ? "scale-0 opacity-0" : "pulse-ring group-hover:scale-105"}`}
          >
            <span className="font-script text-2xl leading-none">P&amp;S</span>
          </div>
        </div>

        <div
          className={`text-center transition-opacity duration-700 ${letterUnfolded ? "opacity-0" : "opacity-100"}`}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground sm:text-sm">
            {started ? "Opening your invitation" : "Click to open"}
          </p>
          <p className="font-script mt-2 text-3xl text-plum/80">
            You&apos;re invited
          </p>
        </div>
      </button>
    </div>
  )
}
