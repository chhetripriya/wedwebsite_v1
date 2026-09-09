"use client"

import { useState, type FormEvent } from "react"
import { MessageCircle } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { events, wedding } from "@/lib/wedding-config"

export function Rsvp() {
  const [name, setName] = useState("")
  const [attending, setAttending] = useState<"yes" | "no">("yes")
  const [guests, setGuests] = useState(1)
  const [selected, setSelected] = useState<string[]>(events.map((e) => e.id))
  const [note, setNote] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [whatsappOpened, setWhatsappOpened] = useState(false)

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed.length < 2) {
      setError("Please tell us your name.")
      return
    }
    setError(null)

    const eventNames = events.filter((ev) => selected.includes(ev.id)).map((ev) => ev.name)
    const lines = [
      `RSVP for ${wedding.bride.firstName} & ${wedding.groom.firstName}'s wedding`,
      `Name: ${trimmed}`,
      `Attending: ${attending === "yes" ? "Yes, joyfully!" : "Regretfully, no"}`,
    ]
    if (attending === "yes") {
      lines.push(`Guests: ${guests}`)
      lines.push(`Events: ${eventNames.length ? eventNames.join(", ") : "None selected"}`)
    }
    if (note.trim()) lines.push(`Message: ${note.trim()}`)

    const url = `https://web.whatsapp.com/send?phone=${wedding.rsvpWhatsApp}&text=${encodeURIComponent(lines.join("\n"))}`
    const whatsappWindow = window.open(url, "_blank", "noopener,noreferrer")
    if (whatsappWindow) {
      setWhatsappOpened(true)
    } else {
      // Popup blockers may prevent the new tab; keep the invitation page intact
      // and provide a fallback link below.
      setError("Please allow pop-ups for this site to open WhatsApp in a new tab.")
    }
  }

  return (
    <section id="rsvp" className="px-4 py-24">
      <SectionHeading
        eyebrow="Kindly respond"
        title="RSVP"
        description="Your presence is the greatest gift. Let us know if you can join us so we can save you a seat and a plate of sweets."
      />

      <form
        onSubmit={onSubmit}
        className="mx-auto mt-14 max-w-2xl space-y-8 rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_50px_-28px_rgb(90_74_94_/_0.45)] backdrop-blur sm:p-10"
      >
        <Field label="Your name" htmlFor="rsvp-name">
          <input
            id="rsvp-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            autoComplete="name"
            required
            className="w-full rounded-xl border border-input bg-white px-4 py-3 text-lg text-plum outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/30"
          />
        </Field>

        <fieldset>
          <legend className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Will you be joining us?</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(
              [
                { v: "yes", label: "Joyfully accept" },
                { v: "no", label: "Regretfully decline" },
              ] as const
            ).map((opt) => (
              <label
                key={opt.v}
                className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-center text-base transition ${
                  attending === opt.v
                    ? "border-rose bg-blush/50 text-plum shadow-[0_10px_24px_-14px_rgb(201_139_147_/_0.9)]"
                    : "border-input bg-white text-muted-foreground hover:border-rose/50"
                }`}
              >
                <input
                  type="radio"
                  name="attending"
                  value={opt.v}
                  checked={attending === opt.v}
                  onChange={() => setAttending(opt.v)}
                  className="sr-only"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        {attending === "yes" && (
          <>
            <Field label="Number of guests (including you)" htmlFor="rsvp-guests">
              <input
                id="rsvp-guests"
                type="number"
                min={1}
                max={10}
                value={guests}
                onChange={(e) => setGuests(Math.min(10, Math.max(1, Number(e.target.value) || 1)))}
                className="w-full rounded-xl border border-input bg-white px-4 py-3 text-lg text-plum outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/30"
              />
            </Field>

            <fieldset>
              <legend className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Which celebrations will you attend?
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {events.map((ev) => {
                  const on = selected.includes(ev.id)
                  return (
                    <label
                      key={ev.id}
                      className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-base transition ${
                        on ? "border-transparent text-plum" : "border-input bg-white text-muted-foreground"
                      }`}
                      style={on ? { backgroundColor: ev.accent } : undefined}
                    >
                      <input type="checkbox" checked={on} onChange={() => toggle(ev.id)} className="sr-only" />
                      {ev.name}
                    </label>
                  )
                })}
              </div>
            </fieldset>
          </>
        )}

        <Field label="A note for the couple (optional)" htmlFor="rsvp-note">
          <textarea
            id="rsvp-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Blessings, dietary needs, or a song request for the sangeet..."
            className="w-full resize-none rounded-xl border border-input bg-white px-4 py-3 text-lg text-plum outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/30"
          />
        </Field>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-6 py-4 text-sm uppercase tracking-[0.25em] text-white shadow-[0_14px_30px_-12px_rgb(201_139_147_/_0.9)] soft-button transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Send RSVP on WhatsApp
        </button>
        <p className="text-center text-sm text-muted-foreground">
          WhatsApp opens in a new tab with your response pre-filled. Keep this invitation tab open so you can return after sending.
        </p>
        {whatsappOpened && (
          <p role="status" className="text-center text-sm text-plum/80">
            WhatsApp is open in a new tab. After sending, close that tab to return here.
          </p>
        )}
      </form>
    </section>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </label>
      <div className="mt-3">{children}</div>
    </div>
  )
}
