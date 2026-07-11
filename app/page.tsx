import { TimeCounterSection } from "@/components/time-counter-section"
import { MilestoneSection } from "@/components/milestone-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <TimeCounterSection />
      <MilestoneSection />
    </main>
  )
}
