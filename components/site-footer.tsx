import { wedding } from "@/lib/wedding-config"

export function SiteFooter() {
  return (
    <footer className="px-4 pb-16 pt-8 text-center">
      <div className="mx-auto flex items-center justify-center gap-2" aria-hidden="true">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-rose/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-rose/70" />
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-rose/60" />
      </div>
      <p className="font-script mt-6 text-6xl text-plum">
        {wedding.bride.firstName} &amp; {wedding.groom.firstName}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.35em] text-muted-foreground">
        {wedding.weddingDateLong} · {wedding.venue.name}
      </p>
      <p className="mt-6 text-base italic text-muted-foreground">
        With love, we look forward to celebrating with you.
      </p>
    </footer>
  )
}
