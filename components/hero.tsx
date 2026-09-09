import Image from "next/image"
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
          <div className="ganesh-blessing mx-auto flex flex-col items-center justify-center gap-4 text-[#9b1b30]">
            <div className="ganesh-medallion animate-soft-float">
              <Image
                src="/images/ganesh.png"
                alt="Lord Ganesha, invoked for an auspicious beginning"
                width={220}
                height={220}
                priority
                className="ganesh-image relative z-10 h-32 w-32 object-contain sm:h-40 sm:w-40"
              />
            </div>
            <p className="font-devanagari text-lg tracking-[0.12em] sm:text-xl">श्री गणेशाय नमः</p>
          </div>
        </div>

        <div className="mt-6 animate-gentle-bloom" style={{ animationDelay: "220ms" }}>
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
            floatDelay="0s"
          />
          <ParentCard
            name={wedding.groom.name}
            relation="Son of"
            father={wedding.groom.father}
            mother={wedding.groom.mother}
            floatDelay="-2.6s"
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
  floatDelay,
}: {
  name: string
  relation: string
  father: string
  mother: string
  floatDelay: string
}) {
  return (
    <div
      className="parent-card group relative rounded-[2rem] p-[1px] shadow-[0_24px_55px_-30px_rgb(90_74_94_/_0.5)]"
      style={{ animationDelay: floatDelay }}
    >
      <div className="parent-card-glow parent-card-glow-one" aria-hidden="true" />
      <div className="parent-card-glow parent-card-glow-two" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[172px] flex-col items-center justify-center overflow-hidden rounded-[calc(2rem-1px)] bg-white/82 px-5 pb-6 pt-10 text-center backdrop-blur-xl">
        <div className="parent-card-sheen" aria-hidden="true" />

        <div className="parent-bouquet parent-bouquet-left" aria-hidden="true">
          <Image
            src="/images/flower-bouquet.png"
            alt=""
            width={200}
            height={200}
            className="h-full w-full object-contain mix-blend-multiply"
          />
        </div>
        <div className="parent-bouquet parent-bouquet-right" aria-hidden="true">
          <Image
            src="/images/flower-bouquet.png"
            alt=""
            width={200}
            height={200}
            className="h-full w-full -scale-x-100 object-contain mix-blend-multiply"
          />
        </div>

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
