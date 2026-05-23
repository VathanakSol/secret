import { TimeCounterSection } from "@/components/time-counter-section"
import { Celebration200Section } from "@/components/celebration-200-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <TimeCounterSection />
      <Celebration200Section />
    </main>
  )
}
