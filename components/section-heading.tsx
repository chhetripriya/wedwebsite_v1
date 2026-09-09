export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-rose">{eyebrow}</p>
      <h2 className="font-serif mt-3 text-5xl font-medium leading-none tracking-[-0.02em] text-plum sm:text-6xl">{title}</h2>
      <div className="mx-auto mt-4 flex items-center justify-center gap-2" aria-hidden="true">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-rose/70" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose/60" />
      </div>
      {description && (
        <p className="mt-4 text-balance text-lg leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
