
import { HeroCardGrid } from "@/components/shared/cards"
import Hero from "@/components/shared/hero"
import { Button } from "@/components/ui/button"
import { toast, Toaster } from "sonner"

export default function Home() {
  return (
  <>
    <Toaster richColors position="top-center"/>
    <Hero/>
    {/* <HeroCardGrid/> */}
  </>
  )
}
