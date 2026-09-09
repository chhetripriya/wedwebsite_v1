import { Heart } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { wedding } from "@/lib/wedding-config"

export function Messages() {
  return (
    <section id="messages" className="px-4 py-24">
      <SectionHeading eyebrow="A little note from the family" title="From our hearts" />

      <div className="mx-auto mt-14 max-w-3xl">
        <Note
          name="Priya’s family"
          role="From the bride’s family"
          message={wedding.bride.message}
          tint="from-blush/60 via-white to-lavender/50"
        />
      </div>
    </section>
  )
}

function Note({ name, role, message, tint }: { name: string; role: string; message: string; tint: string }) {
  return (
    <figure
      className={`elegant-card relative rounded-3xl bg-gradient-to-br ${tint} p-8 shadow-[0_24px_50px_-28px_rgb(90_74_94_/_0.45)] sm:p-10`}
    >
      <Heart className="absolute right-8 top-8 h-5 w-5 text-rose/60" aria-hidden="true" fill="currentColor" />
      <p className="text-xs uppercase tracking-[0.35em] text-rose">{role}</p>
      <blockquote className="mt-5 text-2xl italic leading-relaxed text-plum">&ldquo;{message}&rdquo;</blockquote>
      <figcaption className="font-script mt-6 text-4xl text-plum/80">{name}</figcaption>
    </figure>
  )
}
