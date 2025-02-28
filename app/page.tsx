import HeroSection from "@/components/hero-section"
import Announcements from "@/components/announcements"
import ServerStatus from "@/components/server-status"
import Features from "@/components/features"
import ServerMap from "@/components/server-map"
import JoinCommunity from "@/components/join-community"
import AiAssistant from "@/components/ai-assistant"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <HeroSection />
      <Announcements />
      <ServerStatus />
      <Features />
      <ServerMap />
      <JoinCommunity />
      <AiAssistant />
    </main>
  )
}

