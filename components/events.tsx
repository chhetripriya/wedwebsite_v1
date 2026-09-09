import { CalendarDays, Clock, MapPin, Palette } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { events, type WeddingEvent } from "@/lib/wedding-config"

export function Events() {
  return (
    <section id="events" className="px-4 py-24">
      <SectionHeading
        eyebrow="The celebrations"
        title="A little celebration of love"
        description="A few beautiful celebrations, each filled with love, laughter, family and little moments we hope you’ll cherish with us."
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </section>
  )
}

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const tbd = event.date.startsWith("To be")
  return (
    <article
      className={`group animate-gentle-bloom relative flex flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_50px_-28px_rgb(90_74_94_/_0.45)] backdrop-blur elegant-card transition-transform duration-500 hover:-translate-y-1 ${index === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-60 blur-2xl transition-opacity group-hover:opacity-90"
        style={{ backgroundColor: event.accent }}
        aria-hidden="true"
      />
      <div className="relative">
        <p className="text-xs uppercase tracking-[0.35em] text-rose">0{index + 1}</p>
        <h3 className="font-serif mt-2 text-4xl font-medium leading-tight tracking-[-0.02em] text-plum">{event.name}</h3>
        <p className="mt-2 text-base italic text-muted-foreground">{event.tagline}</p>

        <dl className="mt-6 space-y-3 text-base text-plum/90">
          <Row icon={CalendarDays} label="Date" value={event.date} muted={tbd} />
          <Row icon={Clock} label="Time" value={event.time} muted={tbd} />
          <Row icon={MapPin} label="Venue" value={event.venue} />
        </dl>

        <div className="mt-6 border-t border-border pt-5">
          {event.id === "mehendi" || event.id === "haldi" ? (
            <>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <Palette className="h-3.5 w-3.5" aria-hidden="true" />
                Colour mood
              </div>
              <p className="mt-1 text-lg font-medium text-plum">{event.themeName}</p>
              <ul className="mt-3 flex gap-2" aria-label={`${event.themeName} colour palette`}>
                {event.colors.map((color) => (
                  <li
                    key={color}
                    title={color}
                    className="h-9 flex-1 rounded-full border border-white shadow-[inset_0_1px_2px_rgb(255_255_255_/_0.6),0_4px_10px_-4px_rgb(90_74_94_/_0.4)] transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                  >
                    <span className="sr-only">{color}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">A little note</p>
              <p className="mt-2 text-base italic leading-relaxed text-plum/80">
                {event.id === "sangeet"
                  ? "Bring your brightest smile, your best dance moves, and let the music take care of the rest."
                  : event.id === "wedding"
                    ? "Come with happy hearts, warm blessings, and join us as we begin this beautiful new chapter."
                    : "Come as you are, bring your brightest smile, and spend a lovely afternoon celebrating love and togetherness with us."}
              </p>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

function Row({
  icon: Icon,
  label,
  value,
  muted,
}: {
  icon: typeof CalendarDays
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-1 h-4 w-4 shrink-0 text-rose" aria-hidden="true" />
      <div className="flex flex-col">
        <dt className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</dt>
        <dd className={muted ? "italic text-muted-foreground" : ""}>{value}</dd>
      </div>
    </div>
  )
}
