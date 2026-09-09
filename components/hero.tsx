import Image from "next/image"
import { Flower2 } from "lucide-react"
import { ScratchCard } from "@/components/scratch-card"
import { wedding } from "@/lib/wedding-config"

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
    >
      <Image
        src="/images/pastel-florals.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover opacity-30 mix-blend-multiply"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream" />

      <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden" aria-hidden="true">
        <div className="toran mx-auto flex max-w-5xl items-start justify-center gap-1 px-4 pt-3 text-[15px] tracking-[0.18em] text-[#b77b2c] sm:text-lg">
          <span>🌼</span><span>•</span><span>🌼</span><span>•</span><span>🌼</span><span>•</span><span>🌼</span><span>•</span><span>🌼</span><span>•</span><span>🌼</span>
        </div>
      </div>

      <div className="relative w-full max-w-3xl">
        <div className="animate-gentle-bloom" style={{ animationDelay: "100ms" }}>
          <div className="ganesh-blessing mx-auto flex items-center justify-center gap-2 text-[#9b1b30]">
            <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" aria-hidden="true">
              <path d="M15 19c-4-5-7-4-8-2 3 0 5 2 6 5-3-1-5 0-6 2 4-1 7 1 9 4 1 2 2 4 6 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M33 19c4-5 7-4 8-2-3 0-5 2-6 5 3-1 5 0 6 2-4-1-7 1-9 4-1 2-2 4-6 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 18c0-6 4-10 6-10s6 4 6 10v7c0 3-2 6-6 6s-6-3-6-6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M24 19c3 3 3 7 0 10-1 1-1 3 1 4 2 1 4 0 5-2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="22" cy="18" r="0.9" fill="currentColor"/>
              <circle cx="26" cy="18" r="0.9" fill="currentColor"/>
              <path d="M18 36c2 3 4 4 6 4s4-1 6-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <p className="font-serif text-sm font-medium tracking-[0.18em] sm:text-base">ॐ गणेशाय नमः</p>
          </div>
        </div>

        <div className="mt-5 animate-gentle-bloom" style={{ animationDelay: "220ms" }}>
          <p className="text-xs uppercase tracking-[0.32em] text-rose sm:text-sm">
            Together with their families
          </p>
          <p className="mt-5 text-base uppercase tracking-[0.22em] text-plum/80 sm:text-lg">
            Please join us in celebrating the wedding of
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 animate-gentle-bloom" style={{ animationDelay: "340ms" }}>
          <h1 className="sr-only">
            {wedding.bride.name} and {wedding.groom.name} are getting married on {wedding.weddingDateLong}
          </h1>
          <p aria-hidden="true" className="font-script text-7xl leading-[0.85] text-plum sm:text-8xl md:text-9xl">
            {wedding.bride.firstName}
          </p>
          <p aria-hidden="true" className="font-serif text-2xl italic leading-none text-rose sm:text-3xl">
            &amp;
          </p>
          <p aria-hidden="true" className="font-script text-7xl leading-[0.85] text-plum sm:text-8xl md:text-9xl">
            {wedding.groom.firstName}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl gap-6 sm:grid-cols-2 animate-gentle-bloom" style={{ animationDelay: "480ms" }}>
          <ParentCard
            name={wedding.bride.name}
            relation="Daughter of"
            father={wedding.bride.father}
            mother={wedding.bride.mother}
          />
          <ParentCard
            name={wedding.groom.name}
            relation="Son of"
            father={wedding.groom.father}
            mother={wedding.groom.mother}
          />
        </div>

        <div className="mt-12 animate-gentle-bloom" style={{ animationDelay: "620ms" }}>
          <ScratchCard />
        </div>

        <div className="mt-10 animate-gentle-bloom" style={{ animationDelay: "760ms" }}>
          <p className="font-serif text-sm italic tracking-[0.12em] text-[#9b1b30]">
            With love, family &amp; blessings
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.28em] text-muted-foreground">
            {wedding.venue.name} · {wedding.hashtag}
          </p>
        </div>
      </div>

      <a
        href="#events"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-rose"
      >
        Scroll
        <span className="block h-8 w-px bg-gradient-to-b from-rose/70 to-transparent" aria-hidden="true" />
      </a>
    </section>
  )
}

function ParentCard({
  name,
  relation,
  father,
  mother,
}: {
  name: string
  relation: string
  father: string
  mother: string
}) {
  return (
    <div className="parent-card group relative rounded-[2rem] p-[1px] shadow-[0_24px_55px_-30px_rgb(90_74_94_/_0.5)]">
      <div className="parent-card-glow parent-card-glow-one" aria-hidden="true" />
      <div className="parent-card-glow parent-card-glow-two" aria-hidden="true" />
      <div className="parent-flower parent-flower-left" aria-hidden="true"><Flower2 className="h-6 w-6" /></div>
      <div className="parent-flower parent-flower-right" aria-hidden="true"><Flower2 className="h-5 w-5" /></div>

      <div className="relative z-10 flex min-h-[156px] flex-col items-center justify-center overflow-hidden rounded-[calc(2rem-1px)] bg-white/82 px-5 py-6 text-center backdrop-blur-xl">
        <div className="parent-card-sheen" aria-hidden="true" />
        <div className="mb-3 flex items-center gap-2" aria-hidden="true">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose/45" />
          <span className="h-1.5 w-1.5 rounded-full bg-rose/55" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose/45" />
        </div>

        <p className="relative font-serif text-[1.5rem] font-medium leading-none tracking-[-0.02em] text-plum">{name}</p>
        <p className="relative mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] leading-relaxed text-plum/72 sm:text-xs">
          <span className="uppercase tracking-[0.3em] text-rose">{relation}</span>
          <span>{father}</span>
          <span className="text-rose/65">&amp;</span>
          <span>{mother}</span>
        </p>

        <div className="relative mt-4 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-1 w-1 rounded-full bg-blush" />
          <span className="h-1.5 w-1.5 rounded-full bg-lavender" />
          <span className="h-1 w-1 rounded-full bg-mint" />
        </div>
      </div>
    </div>
  )
}
