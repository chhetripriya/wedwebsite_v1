const links = [
  { href: "#events", label: "Events" },
  { href: "#venue", label: "Venue" },
  { href: "#countdown", label: "Countdown" },
  { href: "#rsvp", label: "RSVP" },
]

export function SiteNav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/70 bg-white/70 px-2 py-1.5 shadow-[0_12px_30px_-18px_rgb(90_74_94_/_0.5)] backdrop-blur"
      >
        <a href="#home" className="font-script px-3 text-2xl leading-none text-rose">
          P&amp;S
        </a>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-plum/80 transition-colors hover:bg-blush/50 hover:text-plum"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
