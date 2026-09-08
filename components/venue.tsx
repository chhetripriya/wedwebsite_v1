import { MapPin, Navigation } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { wedding } from "@/lib/wedding-config"

export function Venue() {
  return (
    <section id="venue" className="px-4 py-24">
      <SectionHeading eyebrow="Where to find us" title="The venue" />

      <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_24px_50px_-28px_rgb(90_74_94_/_0.45)] backdrop-blur md:grid md:grid-cols-5">
        <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-mint via-sky to-lavender md:col-span-2">
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,white_1.5px,transparent_1.5px)] [background-size:22px_22px]" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/90 shadow-[0_20px_40px_-15px_rgb(90_74_94_/_0.5)]">
            <MapPin className="h-10 w-10 text-rose" aria-hidden="true" />
            <span className="absolute inset-0 animate-ping rounded-full border-2 border-white/80 [animation-duration:2.5s]" />
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 md:col-span-3 md:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-rose">All events</p>
          <h3 className="mt-2 text-4xl font-semibold text-plum">{wedding.venue.name}</h3>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{wedding.venue.note}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={wedding.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-sm uppercase tracking-[0.2em] text-white shadow-[0_14px_30px_-12px_rgb(201_139_147_/_0.9)] transition-transform hover:-translate-y-0.5"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Open in Google Maps
            </a>
            <a
              href="#rsvp"
              className="inline-flex items-center gap-2 rounded-full border border-rose/40 bg-white px-6 py-3 text-sm uppercase tracking-[0.2em] text-plum transition-colors hover:bg-blush/40"
            >
              RSVP now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
