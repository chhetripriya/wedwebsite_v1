"use client"

import { useCallback, useState, type ReactNode } from "react"
import { EnvelopeIntro } from "@/components/envelope-intro"
import { FallingFlowers } from "@/components/falling-flowers"

export function Invitation({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false)
  const onFinished = useCallback(() => setOpened(true), [])

  return (
    <>
      <EnvelopeIntro onFinished={onFinished} />
      <FallingFlowers />
      <div
        className={`transition-opacity duration-1000 ${opened ? "opacity-100" : "opacity-0"}`}
        aria-hidden={!opened}
      >
        {children}
      </div>
    </>
  )
}
