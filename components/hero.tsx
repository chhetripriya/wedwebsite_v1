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

      <div className="relative w-full max-w-3xl">
        <div className="animate-rise-in">
          <p className="text-xs uppercase tracking-[0.4em] text-rose sm:text-sm">
            Together with their families
          </p>
          <p className="mt-6 text-lg uppercase tracking-[0.3em] text-plum/80 sm:text-xl">
            Please join us for the wedding of
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 animate-rise-in [animation-delay:150ms]">
          <h1 className="sr-only">
            {wedding.bride.name} and {wedding.groom.name} are getting married on {wedding.weddingDateLong}
          </h1>
          <p aria-hidden="true" className="font-script text-7xl leading-none text-plum sm:text-8xl md:text-9xl">
            {wedding.bride.firstName}
          </p>
          <p aria-hidden="true" className="font-script text-5xl leading-none text-rose sm:text-6xl">
            &amp;
          </p>
          <p aria-hidden="true" className="font-script text-7xl leading-none text-plum sm:text-8xl md:text-9xl">
            {wedding.groom.firstName}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl gap-6 sm:grid-cols-2 animate-rise-in [animation-delay:300ms]">
          <ParentCard
            name={wedding.bride.name}
            relation="Daughter of"
            father={wedding.bride.father}
            mother={wedding.bride.mother}
            tint="from-blush/70 to-lavender/60"
          />
          <ParentCard
            name={wedding.groom.name}
            relation="Son of"
            father={wedding.groom.father}
            mother={wedding.groom.mother}
            tint="from-sky/70 to-mint/60"
          />
        </div>

        <div className="mt-12 animate-rise-in [animation-delay:450ms]">
          <ScratchCard />
        </div>

        <p className="mt-10 text-sm uppercase tracking-[0.3em] text-muted-foreground animate-rise-in [animation-delay:600ms]">
          {wedding.venue.name} · {wedding.hashtag}
        </p>
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
  tint,
}: {
  name: string
  relation: string
  father: string
  mother: string
  tint: string
}) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${tint} p-px shadow-[0_18px_40px_-24px_rgb(90_74_94_/_0.4)]`}>
      <div className="h-full rounded-[calc(1rem-1px)] bg-white/85 px-5 py-5 backdrop-blur">
        <p className="text-xl font-semibold text-plum">{name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-rose">{relation}</p>
        <p className="mt-2 text-base text-plum/85">{father}</p>
        <p className="text-base text-plum/85">&amp; {mother}</p>
      </div>
    </div>
  )
}
