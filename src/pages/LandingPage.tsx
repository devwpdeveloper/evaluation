import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthModal } from '../components/home/AuthModal'
import { FaqSection } from '../components/home/FaqSection'
import { FeaturedBottleSection } from '../components/home/FeaturedBottleSection'
import { Footer } from '../components/home/FooterSection'
import { Header } from '../components/home/Header'
import { HeroSection } from '../components/home/HeroSection'
import { ProductsSection } from '../components/home/ProductsSection'
import { PromotionsSection } from '../components/home/PromotionsSection'
import { TestimonialsSection } from '../components/home/TestimonialSection'
import { TickerSection } from '../components/home/TickerSection'
import type { AuthMode } from '../components/home/types'

export { Footer, Header }

export function LandingPage({ initialAuthMode }: { initialAuthMode?: AuthMode }) {
  const navigate = useNavigate()
  const [authMode, setAuthMode] = useState<AuthMode | null>(null)

  const visibleAuthMode = authMode ?? initialAuthMode ?? null

  function closeAuthModal() {
    setAuthMode(null)

    if (initialAuthMode) {
      navigate('/')
    }
  }

  return (
    <main className="min-h-screen bg-white font-sans text-[#4c4c4c]">
      <HeroSection onOpenAuth={setAuthMode} />
      <ProductsSection />
      <TickerSection />
      <FeaturedBottleSection />
      <PromotionsSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />

      {visibleAuthMode ? <AuthModal mode={visibleAuthMode} onClose={closeAuthModal} onSwitchMode={setAuthMode} /> : null}
    </main>
  )
}
