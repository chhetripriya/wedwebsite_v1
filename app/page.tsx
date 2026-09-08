import { Countdown } from "@/components/countdown"
import { Events } from "@/components/events"
import { Hero } from "@/components/hero"
import { Invitation } from "@/components/invitation"
import { Messages } from "@/components/messages"
import { Rsvp } from "@/components/rsvp"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { Venue } from "@/components/venue"

export default function Page() {
  return (
    <Invitation>
      <SiteNav />
      <main>
        <Hero />
        <Events />
        <Venue />
        <Countdown />
        <Messages />
        <Rsvp />
      </main>
      <SiteFooter />
    </Invitation>
  )
}
