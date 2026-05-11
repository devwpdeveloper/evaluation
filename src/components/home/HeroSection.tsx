import { asset } from './asset'
import { CtaButton } from './CtaButton'
import { Header } from './Header'
import type { AuthMode } from './types'

export function HeroSection({ onOpenAuth }: { onOpenAuth: (mode: AuthMode) => void }) {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-black px-5 pb-16 pt-[138px] text-center text-white sm:min-h-[850px] lg:min-h-[1080px] lg:pb-20 lg:pt-[150px]">
      <Header onOpenAuth={onOpenAuth} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_10%_30%,rgba(255,240,0,0.12),transparent_24%),linear-gradient(180deg,#050505_0%,#000_70%)]" />
      <img
        alt=""
        className="pointer-events-none absolute left-1/2 top-[170px] w-[900px] max-w-[160vw] -translate-x-1/2 opacity-95 sm:top-[150px] sm:w-[1080px] lg:top-[120px] lg:w-[1233px]"
        src={asset('hero-energy-text.png')}
      />

      <div className="relative z-10 mx-auto mt-8 flex max-w-[1180px] items-end justify-center sm:mt-12 lg:mt-[88px]">
        <img
          alt="5-hour ENERGY Rocket Raspberry Gamer Shot bottle"
          className="relative z-20 h-[355px] w-auto shrink-0 drop-shadow-[0_32px_28px_rgba(0,0,0,0.85)] sm:h-[455px] md:h-[530px] lg:h-[610px]"
          src={asset('hero-rocket-bottle.png')}
        />
        <img
          alt="5-hour ENERGY Extra Strength Berry bottle"
          className="relative z-10 mb-[36px] -ml-[62px] w-[245px] max-w-[62vw] drop-shadow-[0_34px_30px_rgba(0,0,0,0.88)] sm:mb-[54px] sm:-ml-[88px] sm:w-[440px] md:w-[560px] lg:mb-[70px] lg:-ml-[110px] lg:w-[690px]"
          src={asset('hero-berry-bottle.png')}
        />
      </div>

      <div className="relative z-10 mx-auto mt-5 max-w-[883px] sm:mt-8 lg:mt-10">
        <p className="text-[20px] font-semibold leading-[1.3] text-white/90">
          Lorem ipsum dolor sit amet, conetur ading elit. Lorem ipsum dolor sit amet, conetur ading elit.
        </p>
        <CtaButton className="mt-[30px]">shop now</CtaButton>
      </div>
    </section>
  )
}
