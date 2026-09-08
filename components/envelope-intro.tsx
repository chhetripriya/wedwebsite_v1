"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { wedding } from "@/lib/wedding-config"

type Phase = "closed" | "opening" | "done"

export function EnvelopeIntro({ onFinished }: { onFinished: () => void }) {
  const [phase, setPhase] = useState<Phase>("closed")

  useEffect(() => {
    if (phase !== "opening") return
    const timer = setTimeout(() => {
      setPhase("done")
      onFinished()
    }, 3700)
    return () => clearTimeout(timer)
  }, [phase, onFinished])

  if (phase === "done") return null

  const opening = phase === "opening"

  return (
    <div
      className={`envelope-overlay fixed inset-0 z-50 flex items-center justify-center bg-cream ${opening ? "leave" : ""}`}
      style={{
        backgroundImage:
          "radial-gradient(60% 50% at 10% 0%, rgb(247 200 212 / 0.5), transparent 70%), radial-gradient(50% 45% at 95% 10%, rgb(216 204 241 / 0.55), transparent 70%), radial-gradient(55% 45% at 50% 100%, rgb(203 232 221 / 0.55), transparent 70%)",
      }}
    >
      <button
        type="button"
        onClick={() => phase === "closed" && setPhase("opening")}
        aria-label="Open the wedding invitation"
        className={`envelope-scene envelope-wrap group relative flex flex-col items-center gap-8 focus:outline-none ${opening ? "leave" : "cursor-pointer"}`}
      >
        <div className="relative h-[220px] w-[320px] sm:h-[270px] sm:w-[400px] animate-float-soft">
          {/* Card inside */}
          <div
            className={`envelope-card absolute left-[6%] top-[8%] z-10 flex h-[84%] w-[88%] flex-col items-center justify-center rounded-md border border-blush/70 bg-white px-6 text-center shadow-[0_10px_30px_-10px_rgb(90_74_94_/_0.25)] ${opening ? "out" : ""}`}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-xs">
              Save the date
            </p>
            <p className="font-script mt-1 text-4xl leading-none text-rose sm:text-5xl">
              {wedding.bride.firstName} &amp; {wedding.groom.firstName}
            </p>
            <p className="mt-2 text-sm tracking-[0.2em] text-plum sm:text-base">
              {wedding.weddingDateLabel}
            </p>
          </div>

          {/* Envelope body */}
          <div className="absolute inset-0 z-20 overflow-hidden rounded-lg bg-[#e9d6ea] shadow-[0_25px_50px_-20px_rgb(90_74_94_/_0.45)]">
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
            className={`envelope-flap absolute left-0 right-0 top-0 h-[56%] ${opening ? "open z-0" : "z-30"}`}
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
            className={`absolute left-1/2 top-[52%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose to-[#a86a74] text-white shadow-[inset_0_2px_6px_rgb(255_255_255_/_0.35),0_8px_18px_-6px_rgb(90_74_94_/_0.6)] transition-all duration-500 ${opening ? "scale-0 opacity-0" : "pulse-ring group-hover:scale-105"}`}
          >
            <span className="font-script text-2xl leading-none">P&amp;S</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground sm:text-sm">
            {opening ? "Opening your invitation" : "Click to open"}
          </p>
          <p className="font-script mt-2 text-3xl text-plum/80">
            You&apos;re invited
          </p>
        </div>
      </button>
    </div>
  )
}
