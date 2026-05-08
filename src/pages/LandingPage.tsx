import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, TransitionEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthForm } from '../components/auth/AuthForm'
import { useAuth } from '../context/useAuth'

const asset = (name: string) => `/figma-assets/${name}`

type AuthMode = 'login' | 'signup'

type Product = {
  badge: string
  badgeBg: string
  badgeColor: string
  name: string
  description: string
  price: string
  image: string
  imageClass: string
  accent: string
}

type FooterGroup = {
  title: string
  items: string[]
}

type Testimonial = {
  quote: string
  source: string
  name: string
}

type TickerIconName = 'bolt' | 'flame' | 'target' | 'gauge'

type TickerMark = {
  label: string
  icon: TickerIconName
  outline?: boolean
}

const navItems = [
  { label: 'Shop', dropdownItems: ['Energy Shots', 'Extra Strength', 'Gamer Shots', 'Merch'] },
  { label: 'Build A Bundle', dropdownItems: ['Starter Bundle', 'Variety Pack', 'Fan Favorites', 'Subscribe & Save'] },
  { label: 'Merch' },
  { label: 'Pre Workout' },
  { label: 'FAQs' },
  { label: 'Blogs' },
  { label: 'Store Locator' },
]

const products: Product[] = [
  {
    badge: 'Regular Strength',
    badgeBg: 'rgba(209,54,21,0.1)',
    badgeColor: '#d13615',
    name: 'Orange Flavor',
    description: 'Lorem ipsum dolor sit amet, etetur adipiscing elit.',
    price: '$32.99',
    image: 'hero-bottle-full.png',
    imageClass: 'h-[244px]',
    accent: '#f89821',
  },
  {
    badge: 'Gamer Shots',
    badgeBg: 'rgba(129,59,110,0.1)',
    badgeColor: '#813b6e',
    name: 'Rocket Raspberry',
    description: 'Lorem ipsum dolor sit amet, etetur adipiscing elit.',
    price: '$58.96',
    image: 'product-rocket-full.png',
    imageClass: 'h-[245px]',
    accent: '#cc2fb8',
  },
  {
    badge: 'Energy Drinks',
    badgeBg: 'rgba(231,20,44,0.1)',
    badgeColor: '#e7142c',
    name: 'Berry Punch Flavor',
    description: 'Lorem ipsum dolor sit amet, etetur adipiscing elit.',
    price: '$58.96',
    image: 'product-berry.png',
    imageClass: 'h-[260px]',
    accent: '#e84545',
  },
  {
    badge: 'Extra Strength',
    badgeBg: 'rgba(27,134,66,0.1)',
    badgeColor: '#1b8642',
    name: 'Fan Fuel',
    description: 'Lorem ipsum dolor sit amet, etetur adipiscing elit.',
    price: '$58.96',
    image: 'product-fan.png',
    imageClass: 'h-[256px]',
    accent: '#3178c6',
  },
]

const featuredFrames = [
  { src: 'featured-step-1.png', alt: 'Featured product stage one' },
  { src: 'featured-step-2.png', alt: 'Featured product stage two' },
  { src: 'featured-step-3.png', alt: 'Featured product stage three' },
  { src: 'featured-step-4.png', alt: 'Featured product stage four' },
]

const faqItems = [
  {
    question: 'What is a 5-hour ENERGY Shot?',
    answer:
      'It is a compact energy shot made for fast, convenient energy and focus support when you need a boost during the day.',
  },
  {
    question: 'How do you ensure code quality?',
    answer:
      'The project uses TypeScript, reusable React components, ESLint, and production builds to catch issues before delivery.',
  },
  {
    question: 'How do you manage project timelines?',
    answer:
      'Work is split into clear modules, verified incrementally, and prioritized around the required landing, auth, users, and tasks flows.',
  },
  {
    question: 'What makes your team unique?',
    answer:
      'The experience combines pixel-focused frontend implementation with practical app behavior such as authentication and local task management.',
  },
  {
    question: 'How do you test the software?',
    answer:
      'Core verification includes build checks, lint checks, route testing, form validation testing, and browser review across responsive widths.',
  },
]

const testimonials: Testimonial[] = [
  {
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    source: 'Wellness Wonderland',
    name: 'Anna Perkins',
  },
  {
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    source: 'Wellness Wonderland',
    name: 'Anna Perkins',
  },
  {
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    source: 'Wellness Wonderland',
    name: 'Anna Perkins',
  },
  {
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    source: 'Wellness Wonderland',
    name: 'Anna Perkins',
  },
]

const footerGroups: FooterGroup[] = [
  {
    title: 'contact',
    items: ['SI Online, LLC', '38955 Hills Tech Dr.', 'Farmington Hills, MI 48331', '888-960-9495', 'Or fill out this form'],
  },
  {
    title: 'social',
    items: ['Facebook', 'Instagram', 'Youtube', 'Twitter', 'Tiktok'],
  },
  {
    title: 'company',
    items: ['Search', 'Return Policy', 'Shipping Policy', 'Subscription Terms', 'Patents', 'Accessibility'],
  },
]

function CtaButton({ children, className = '' }: { children: string; className?: string }) {
  return (
    <a
      className={`cta-button inline-flex h-[50px] min-w-[145px] items-center justify-center rounded-br-[25px] rounded-tl-[25px] border border-[#fff000] bg-[#fff000] px-7 text-[20px] font-bold capitalize text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fff000] ${className}`}
      href="#products"
    >
      <span className="relative z-10">{children}</span>
    </a>
  )
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12.25a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-7.5 8.5c0-3.59 3.36-6.5 7.5-6.5s7.5 2.91 7.5 6.5a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75Z" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 7a4 4 0 0 1 8 0h1.25a2 2 0 0 1 1.98 1.72l1.16 8A4 4 0 0 1 16.43 21H7.57a4 4 0 0 1-3.96-4.28l1.16-8A2 2 0 0 1 6.75 7H8Zm2 0h4a2 2 0 1 0-4 0Z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path d="m20 20-4.2-4.2m1.2-5.3a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 24 24">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      )}
    </svg>
  )
}

export function Header({ onOpenAuth }: { onOpenAuth: (mode: AuthMode) => void }) {
  const { user, logout } = useAuth()
  const [accountOpen, setAccountOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState('')
  const [openMobileDropdown, setOpenMobileDropdown] = useState('')

  function openAuth(mode: AuthMode) {
    setAccountOpen(false)
    setMobileOpen(false)
    onOpenAuth(mode)
  }

  const accountPanel = (
    <div className="rounded-[12px] border border-black/10 bg-white p-3 text-left shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      {user ? (
        <>
          <Link className="header-dropdown-link" to="/dashboard">
            Dashboard
          </Link>
          <button className="header-dropdown-link w-full" onClick={logout} type="button">
            Logout
          </button>
        </>
      ) : (
        <>
          <button className="header-dropdown-link w-full" onClick={() => openAuth('login')} type="button">
            Login
          </button>
          <button className="header-dropdown-link w-full" onClick={() => openAuth('signup')} type="button">
            Sign up
          </button>
        </>
      )}
    </div>
  )

  const accountMenu = accountOpen ? <div className="absolute right-0 top-full z-50 w-[220px] pt-3">{accountPanel}</div> : null

  return (
    <header className="absolute left-5 right-5 top-5 z-40 max-w-[1760px] lg:left-20 lg:right-20 2xl:left-1/2 2xl:right-auto 2xl:w-[calc(100%-160px)] 2xl:-translate-x-1/2">
      <div className="relative flex h-[56px] items-center justify-between rounded-[12px] bg-white px-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] xl:h-[64px] xl:px-5">
        <a aria-label="5-hour ENERGY home" className="shrink-0 rounded-lg p-1 transition hover:bg-[#fff000]/25 focus-visible:bg-[#fff000]/25 focus-visible:outline-none" href="#">
          <img alt="5-hour ENERGY" className="aspect-[115/67.44] w-[68px] object-contain sm:w-[76px] xl:w-[88px]" src={asset('logo.svg')} />
        </a>

        <div className="ml-auto hidden items-center justify-end gap-[48px] xl:flex">
          <nav className="flex items-center gap-[38px] text-[16px] font-semibold text-[#3f3f3f]">
            {navItems.map((item) => (
              <div
                className="relative"
                key={item.label}
                onMouseEnter={() => item.dropdownItems && setOpenDropdown(item.label)}
                onMouseLeave={() => item.dropdownItems && setOpenDropdown('')}
              >
                {item.dropdownItems ? (
                  <button
                    aria-expanded={openDropdown === item.label}
                    className={`header-menu-link ${openDropdown === item.label ? 'is-active' : ''}`}
                    onClick={() => setOpenDropdown((current) => (current === item.label ? '' : item.label))}
                    type="button"
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon />
                  </button>
                ) : (
                  <a className="header-menu-link" href="#">
                    {item.label}
                  </a>
                )}
                {item.dropdownItems && openDropdown === item.label ? (
                  <div className="absolute left-0 top-full z-50 w-[210px] pt-3">
                    <div className="rounded-[12px] border border-black/10 bg-white p-3 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a className="header-dropdown-link text-[15px]" href="#" key={dropdownItem}>
                          {dropdownItem}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="relative flex w-[112px] items-center justify-between text-[#666666]">
            <div className="relative" onMouseEnter={() => setAccountOpen(true)} onMouseLeave={() => setAccountOpen(false)}>
              <button
                aria-expanded={accountOpen}
                aria-label="Open account menu"
                className={`header-icon-button size-6 ${accountOpen ? 'is-active' : ''}`}
                onFocus={() => setAccountOpen(true)}
                type="button"
              >
                <UserIcon />
              </button>
              {accountMenu}
            </div>
            <a aria-label="Cart" className="header-icon-button size-6" href="#">
              <BagIcon />
            </a>
            <button aria-label="Search" className="header-icon-button size-6" type="button">
              <SearchIcon />
            </button>
          </div>
        </div>

        <div className="relative flex items-center gap-3 text-[#666666] sm:gap-4 xl:hidden">
          <div className="relative">
            <button
              aria-expanded={accountOpen}
              aria-label="Open account menu"
              className={`header-icon-button size-8 ${accountOpen ? 'is-active' : ''}`}
              onClick={() => setAccountOpen((open) => !open)}
              type="button"
            >
              <UserIcon />
            </button>
            {accountMenu}
          </div>
          <a aria-label="Cart" className="header-icon-button size-8" href="#">
            <BagIcon />
          </a>
          <button aria-label="Search" className="header-icon-button size-8" type="button">
            <SearchIcon />
          </button>
          <button
            aria-expanded={mobileOpen}
            aria-label="Open menu"
            className="header-icon-button size-8 xl:hidden"
            onClick={() => {
              setMobileOpen((open) => !open)
              setOpenMobileDropdown('')
            }}
            type="button"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="mt-3 rounded-[12px] bg-white p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] xl:hidden">
          <nav className="grid gap-1 text-[18px] font-semibold text-[#3f3f3f]">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.dropdownItems ? (
                  <button
                    aria-expanded={openMobileDropdown === item.label}
                    className={`header-mobile-link ${openMobileDropdown === item.label ? 'is-active' : ''}`}
                    onClick={() => setOpenMobileDropdown((current) => (current === item.label ? '' : item.label))}
                    type="button"
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon />
                  </button>
                ) : (
                  <a className="header-mobile-link" href="#">
                    <span>{item.label}</span>
                  </a>
                )}
                {item.dropdownItems && openMobileDropdown === item.label ? (
                  <div className="grid gap-1 border-l border-black/10 pl-3 text-left text-[15px] font-medium text-[#666666]">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a className="header-dropdown-link text-[15px]" href="#" key={dropdownItem}>
                        {dropdownItem}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function Hero({ onOpenAuth }: { onOpenAuth: (mode: AuthMode) => void }) {
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

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex min-h-[663px] flex-col gap-[29px] overflow-hidden rounded-[25px] bg-white p-6 text-left shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
      <div className="relative h-[342px] shrink-0 overflow-hidden rounded-[10px] bg-[#11110f]">
        <div
          className="absolute left-1/2 top-0 h-[328px] w-[244px] -translate-x-1/2 rounded-full opacity-75 blur-[42px]"
          style={{ background: `radial-gradient(circle, ${product.accent} 0%, rgba(17,17,15,0) 68%)` }}
        />
        <img
          alt={product.name}
          className={`absolute left-1/2 top-6 z-10 w-auto -translate-x-1/2 object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.32)] ${product.imageClass}`}
          src={asset(product.image)}
        />
        <img
          alt=""
          aria-hidden="true"
          className={`product-card-reflection absolute left-1/2 top-[278px] w-auto -translate-x-1/2 -scale-y-100 object-contain opacity-35 ${product.imageClass}`}
          src={asset(product.image)}
        />
        <button
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-2.5 right-2.5 z-20 grid size-[50px] place-items-center rounded-br-[10px] rounded-tl-[10px] border border-[#b9b9b9] bg-white transition hover:border-[#fff000] hover:bg-[#fff000]"
          type="button"
        >
          <img alt="" className="size-6" src={asset('icon-cart.svg')} />
        </button>
      </div>
      <p className="inline-flex h-9 w-fit items-center rounded-full px-[15px] text-[20px] font-medium" style={{ backgroundColor: product.badgeBg, color: product.badgeColor }}>
        {product.badge}
      </p>
      <div className="w-[327px] max-w-full">
        <h3 className="font-display text-[40px] uppercase leading-none text-[#4c4c4c]">{product.name}</h3>
        <p className="text-[20px] font-medium leading-[1.3] text-[#747474]">{product.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-4">
        <p className="font-display text-[30px] uppercase leading-normal text-[#4c4c4c]">{product.price}</p>
        <CtaButton>shop now</CtaButton>
      </div>
    </article>
  )
}

function Products() {
  return (
    <section className="relative z-10 h-auto overflow-visible bg-black px-5 pb-16 pt-[120px] lg:h-[875px] lg:pb-0" id="products">
      <div className="mx-auto flex max-w-[1162px] flex-col items-center gap-[15px] text-center">
        <h2 className="font-display text-[44px] uppercase leading-[1.2] text-white sm:text-[64px] lg:text-[80px]">
          Explore Our Range Of <span className="text-[#fff000]">Energy-Boosting Shots</span> For Every Need
        </h2>
        <p className="text-[18px] font-medium leading-[1.3] text-[#b3b3b3] sm:text-[20px]">
          Boost your energy and focus with 5-hour ENERGY shots, crafted for fast results. Choose from a variety of strengths and flavors to fuel your day without the crash.
        </p>
      </div>
      <div className="mt-[30px] text-center lg:mt-[30px]">
        <CtaButton>view all products</CtaButton>
      </div>
      <div className="mx-auto mt-[50px] grid max-w-[1760px] gap-8 md:grid-cols-2 xl:grid-cols-4 lg:absolute lg:left-1/2 lg:top-[509px] lg:mt-0 lg:w-[calc(100%-160px)] lg:-translate-x-1/2 2xl:w-[1760px]">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  )
}

const tickerMarks: TickerMark[] = [
  { label: 'power', icon: 'bolt' },
  { label: 'energy', icon: 'flame', outline: true },
  { label: 'focus', icon: 'target' },
  { label: 'speed', icon: 'gauge', outline: true },
]

function TickerIcon({ icon }: { icon: TickerIconName }) {
  if (icon === 'bolt') {
    return (
      <svg aria-hidden="true" className="ticker-icon ticker-icon-bolt" viewBox="0 0 52 76">
        <path d="M50.4 0 17.8 35.8h20.6L1.6 76l10.9-39.2H0L50.4 0Z" fill="#ffc61a" />
      </svg>
    )
  }

  if (icon === 'flame') {
    return (
      <svg aria-hidden="true" className="ticker-icon ticker-icon-flame" viewBox="0 0 64 76">
        <path
          d="M33.7 74.1c16.4-5.6 25.5-15.4 25.5-29.2 0-9.2-5.1-17.3-14.4-24.9-1.1 9-4.8 13.8-10.7 17.4C36.4 23.3 31.2 11.5 18.5 0c1.7 14.7-4.1 23.1-10.3 31.1C2.8 38.1.6 44.1.6 51.4c0 12.6 9 20.9 22.4 22.9-4.2-3.7-6.1-8.1-5.4-13.2.7-5.5 4.3-10.2 11-14.4-.1 8.6 2.6 14 8.1 16.1 1.7-5 4.1-8.6 7.2-10.9.1 9.3-3.4 16.7-10.2 22.2Z"
          fill="#f28a23"
        />
      </svg>
    )
  }

  if (icon === 'target') {
    return (
      <svg aria-hidden="true" className="ticker-icon ticker-icon-target" viewBox="0 0 82 82">
        <path
          d="M28 2H8a6 6 0 0 0-6 6v20M54 2h20a6 6 0 0 1 6 6v20M80 54v20a6 6 0 0 1-6 6H54M28 80H8a6 6 0 0 1-6-6V54"
          fill="none"
          stroke="#ff4a58"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path d="M41 18v13M41 51v13M18 41h13M51 41h13" fill="none" stroke="#ff4a58" strokeLinecap="round" strokeWidth="4" />
        <circle cx="41" cy="41" fill="none" r="19" stroke="#ff4a58" strokeWidth="5" />
        <circle cx="41" cy="41" fill="#ff4a58" r="6" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" className="ticker-icon ticker-icon-gauge" viewBox="0 0 96 64">
      <path d="M14 53a38 38 0 0 1 68 0" fill="none" stroke="#4c4c4c" strokeLinecap="round" strokeWidth="8" />
      <path d="M18 53a34 34 0 0 1 16-28" fill="none" stroke="#eb3f31" strokeLinecap="round" strokeWidth="8" />
      <path d="M34 25a34 34 0 0 1 30-2" fill="none" stroke="#ffc61a" strokeLinecap="round" strokeWidth="8" />
      <path d="M64 23a34 34 0 0 1 14 30" fill="none" stroke="#179d61" strokeLinecap="round" strokeWidth="8" />
      <path d="M48 49 73 26" fill="none" stroke="#4c4c4c" strokeLinecap="round" strokeWidth="6" />
      <circle cx="48" cy="52" fill="#4c4c4c" r="6" />
    </svg>
  )
}

function TickerItem({ index, mark }: { index: number; mark: TickerMark }) {
  return (
    <div className="ticker-item" key={`${mark.label}-${index}`}>
      <span className={mark.outline ? 'ticker-word ticker-word-outline' : 'ticker-word'}>{mark.label}</span>
      <TickerIcon icon={mark.icon} />
    </div>
  )
}

function Ticker() {
  return (
    <section aria-label="Energy benefits" className="relative z-0 overflow-hidden bg-white pb-[70px] pt-[150px] lg:pt-[430px]">
      <div className="ticker-track">
        {[...tickerMarks, ...tickerMarks, ...tickerMarks].map((mark, index) => (
          <TickerItem index={index} key={`${mark.label}-${index}`} mark={mark} />
        ))}
      </div>
    </section>
  )
}

function FeaturedBottle() {
  const [activeStep, setActiveStep] = useState(0)
  const stepTrackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const stepTrack = stepTrackRef.current
    if (!stepTrack) return undefined

    const stepElements = Array.from(stepTrack.querySelectorAll<HTMLElement>('[data-feature-step]'))
    if (!stepElements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleStep = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visibleStep) return

        const stepIndex = Number(visibleStep.target.getAttribute('data-feature-step'))
        if (!Number.isNaN(stepIndex)) {
          setActiveStep(stepIndex)
        }
      },
      {
        threshold: [0.35, 0.6, 0.8],
        rootMargin: '-15% 0px -20% 0px',
      },
    )

    stepElements.forEach((stepElement) => observer.observe(stepElement))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#ffffff] px-0 py-0">
      <div className="mx-auto max-w-[1920px] lg:hidden">
        <img
          alt="Featured products sequence final state"
          className="h-auto w-full object-contain"
          src={asset(featuredFrames[featuredFrames.length - 1].src)}
        />
      </div>

      <div className="featured-frame-shell relative mx-auto hidden max-w-[1920px] lg:block">
        <div className="featured-frame-sticky">
          <div className="featured-frame-stage">
            {featuredFrames.map((frame, index) => (
              <img
                alt={frame.alt}
                className={`featured-frame-image ${index === activeStep ? 'is-active' : ''}`}
                key={frame.src}
                src={asset(frame.src)}
              />
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="featured-frame-step-track" ref={stepTrackRef}>
          {featuredFrames.map((frame, index) => (
            <div className="featured-frame-step" data-feature-step={index} key={`${frame.src}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Promotions() {
  const marqueeItems = [...tickerMarks, ...tickerMarks, ...tickerMarks]

  return (
    <section className="bg-white px-5 py-[120px]">
      <div className="mx-auto grid max-w-[1760px] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <article className="promo-figma-card promo-figma-card-left">
          <img alt="" aria-hidden="true" className="promo-bundle-bg" src={asset('promo-bundle-bg.png')} />
          <img alt="5-hour ENERGY bundle packs" className="promo-bundle-packs" src={asset('promo-bundle-packs.png')} />
          <div className="promo-figma-overlay promo-figma-overlay-bundle" />
          <div className="promo-figma-content">
            <h3 className="promo-figma-title">
              Build A <span>Bundle</span>
            </h3>
            <CtaButton className="promo-figma-button">Build Now</CtaButton>
          </div>
        </article>

        <div className="grid gap-8">
          <article className="promo-figma-card promo-figma-card-top">
            <img alt="5-hour ENERGY merch products" className="promo-merch-products" src={asset('promo-merch-products.png')} />
            <div className="promo-figma-content">
              <h3 className="promo-figma-title">
                See Our <span>Merch</span>
              </h3>
              <CtaButton className="promo-figma-button">View All</CtaButton>
            </div>
          </article>

          <article className="promo-figma-card promo-figma-card-bottom">
            <img alt="Revitalize and nourish card visual" className="promo-figma-image" src={asset('promo-revitalize-figma.png')} />
            <div className="promo-figma-overlay promo-figma-overlay-bottom-top" />
            <div className="promo-figma-content promo-figma-content-bottom">
              <h3 className="promo-figma-title promo-figma-title-bottom">
                Revitalize Your Day, <span>Nourish Yourself</span>
              </h3>
            </div>
            <div className="promo-figma-strip-mask" aria-hidden="true" />
            <div className="promo-figma-marquee" aria-hidden="true">
              <div className="promo-figma-marquee-track">
                {marqueeItems.map((item, index) => (
                  <div className="promo-figma-marquee-item" key={`${item.label}-${index}`}>
                    <span className={item.outline ? 'promo-figma-marquee-word promo-figma-marquee-word-outline' : 'promo-figma-marquee-word'}>
                      {item.label}
                    </span>
                    <TickerIcon icon={item.icon} />
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [trackIndex, setTrackIndex] = useState(2)
  const [isResettingTrack, setIsResettingTrack] = useState(false)
  const slideItems = [
    testimonials[testimonials.length - 2],
    testimonials[testimonials.length - 1],
    ...testimonials,
    testimonials[0],
    testimonials[1],
  ]
  const trackOffset = getTestimonialTrackOffset(trackIndex, slideItems.length)
  const activeIndex = getActiveTestimonialIndex(trackIndex, testimonials.length)

  useEffect(() => {
    if (isResettingTrack) return undefined

    const intervalId = window.setInterval(() => {
      setTrackIndex((current) => current + 1)
    }, 4500)

    return () => window.clearInterval(intervalId)
  }, [isResettingTrack])

  function goToPrevious() {
    if (isResettingTrack) return
    setTrackIndex((current) => current - 1)
  }

  function goToNext() {
    if (isResettingTrack) return
    setTrackIndex((current) => current + 1)
  }

  function handleTrackTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return

    if (trackIndex === testimonials.length + 2) {
      resetTrackTo(2)
    }

    if (trackIndex === 1) {
      resetTrackTo(testimonials.length + 1)
    }
  }

  function resetTrackTo(nextIndex: number) {
    setIsResettingTrack(true)
    setTrackIndex(nextIndex)
    window.setTimeout(() => setIsResettingTrack(false), 30)
  }

  return (
    <section className="overflow-hidden bg-white px-5 py-20 text-center lg:h-[975px] lg:py-0">
      <div className="mx-auto flex max-w-[1037px] flex-col items-center gap-[15px] lg:pt-[120px]">
        <h2 className="font-display text-[54px] uppercase leading-none text-[#4c4c4c] sm:text-[68px] lg:text-[80px]">
          View <span className="text-[#e0d000]">Testimonials</span> From Our Customers
        </h2>
        <p className="text-[18px] font-medium leading-normal text-[#747474] sm:text-[20px]">
          Lorem ipsum dolor sit amet, conetur ading elit. Lorem ipsum dolor sit amet, conetur ading elit.
        </p>
      </div>
      <div className="testimonials-stage mx-auto mt-[60px] max-w-[1920px]">
        <button
          aria-label="Previous testimonial"
          className="absolute left-5 top-1/2 z-20 hidden size-12 -translate-y-1/2 rounded-br-[24px] rounded-tl-[24px] border border-[#fff000] bg-[#fff000] text-[22px] font-bold text-black transition hover:bg-black hover:text-[#fff000] md:grid md:place-items-center"
          onClick={goToPrevious}
          type="button"
        >
          &lt;
        </button>
        <div
          className="testimonials-track"
          data-resetting={isResettingTrack}
          onTransitionEnd={handleTrackTransitionEnd}
          style={{
            '--testimonial-track-offset': `${trackOffset}px`,
          } as CSSProperties}
        >
          {slideItems.map((item, index) => {
            const originalIndex = (index - 1 + testimonials.length) % testimonials.length
            const isActive = index === trackIndex
            const isSide = Math.abs(index - trackIndex) === 1

            return (
              <article
                aria-hidden={!isActive}
                className="testimonial-card"
                data-active={isActive}
                data-side={isSide}
                style={{
                  '--testimonial-card-width': `${isActive ? 1216 : 823}px`,
                } as CSSProperties}
                key={`${item.name}-${index}`}
              >
                <p className="testimonial-quote-mark">&ldquo;</p>
                <p className="testimonial-copy">{item.quote}</p>
                <div className="testimonial-person">
                  <p className="testimonial-source">{item.source}</p>
                  <p className="testimonial-name">{item.name}</p>
                </div>
                <span className="sr-only">Slide {originalIndex + 1}</span>
              </article>
            )
          })}
        </div>
        <button
          aria-label="Next testimonial"
          className="absolute right-5 top-1/2 z-20 hidden size-12 -translate-y-1/2 rounded-br-[24px] rounded-tl-[24px] border border-[#fff000] bg-[#fff000] text-[22px] font-bold text-black transition hover:bg-black hover:text-[#fff000] md:grid md:place-items-center"
          onClick={goToNext}
          type="button"
        >
          &gt;
        </button>
      </div>
      <div className="mt-[60px] flex justify-center gap-[7px] lg:mt-[60px]">
        {testimonials.map((item, index) => (
          <button
            aria-label={`Show testimonial ${index + 1}`}
            className={`h-3 rounded-full transition-all ${index === activeIndex ? 'w-[67px] bg-[#fff000]' : 'w-3 bg-[#e7e7e7] hover:bg-[#d6d6d6]'}`}
            key={`${item.name}-${index}`}
            onClick={() => setTrackIndex(index + 2)}
            type="button"
          />
        ))}
      </div>
    </section>
  )
}

function getActiveTestimonialIndex(trackIndex: number, total: number) {
  if (trackIndex < 2) return total - (2 - trackIndex)
  if (trackIndex >= total + 2) return trackIndex - (total + 2)
  return trackIndex - 2
}

function getTestimonialTrackOffset(activeTrackIndex: number, totalSlides: number) {
  const sideWidth = 823
  const activeWidth = 1216
  const gap = 16
  let offset = 0

  for (let index = 0; index < activeTrackIndex; index += 1) {
    offset += (index === activeTrackIndex ? activeWidth : sideWidth) + gap
  }

  const activeCenter = offset + activeWidth / 2
  const totalWidth = (totalSlides - 1) * (sideWidth + gap) + activeWidth
  return Math.min(Math.max(activeCenter, activeWidth / 2), totalWidth - activeWidth / 2)
}

function Faq() {
  const [openQuestion, setOpenQuestion] = useState('')

  return (
    <section className="bg-[#fbfcff] px-5 py-16 lg:min-h-[820px] lg:py-[120px]">
      <div className="mx-auto grid max-w-[1760px] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
        <div className="max-w-[864px]">
          <h2 className="font-display text-[54px] uppercase leading-[1.2] text-[#4c4c4c] sm:text-[68px] lg:text-[80px]">
            Frequently Asked Questions
          </h2>
          <p className="mt-[15px] max-w-[864px] text-[18px] font-medium leading-[1.3] text-[#747474] sm:text-[20px]">
            Boost your energy and focus with 5-hour ENERGY shots, crafted for fast results. Choose from a variety of strengths and flavors to fuel your day without the crash.
          </p>
          <CtaButton className="mt-6 lg:mt-[30px]">view all</CtaButton>
        </div>
        <div className="max-w-[864px] lg:justify-self-end">
          {faqItems.map((item) => (
            <div className="border-b border-[#dfdfdf]" key={item.question}>
              <button
                aria-expanded={openQuestion === item.question}
                className="faq-question flex min-h-[116px] w-full items-center justify-between gap-6 py-10 text-left text-[30px] uppercase leading-none text-[#4c4c4c] transition hover:text-black sm:text-[34px] lg:text-[36px]"
                onClick={() => setOpenQuestion((current) => (current === item.question ? '' : item.question))}
                type="button"
              >
                <span className="pr-3">{item.question}</span>
                <span className="font-sans text-[42px] font-light leading-none text-[#4c4c4c]">{openQuestion === item.question ? '^' : 'v'}</span>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ${openQuestion === item.question ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <p className="pb-10 pr-16 text-[18px] font-medium leading-[1.6] text-[#747474] sm:text-[20px]">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black px-5 pt-[244px] text-[#b3b3b3]">
      <img alt="" className="absolute inset-x-0 top-[-223px] h-[807px] w-full object-cover opacity-30" src={asset('footer-bg.png')} />
      <img alt="5-hour ENERGY" className="absolute left-1/2 top-[31px] h-[155px] -translate-x-1/2" src={asset('footer-logo.svg')} />
      <div className="relative z-10 mx-auto grid max-w-[1730px] gap-12 lg:grid-cols-[1fr_1fr_1fr_2.2fr]">
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-display text-[30px] uppercase text-white">{group.title}</h3>
            <ul className="mt-5 space-y-5 text-[20px] font-medium">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="font-display text-[30px] uppercase text-white">stay informed</h3>
          <p className="mt-5 max-w-[724px] text-[20px] font-medium leading-[1.3]">
            Get the latest updates, new product information, emails, and targeted marketing from the Makers of 5-hour ENERGY, and information from other products and promotions that may be of interest to me.
          </p>
          <form className="mt-5 flex h-[55px] max-w-[574px] overflow-hidden rounded-full bg-white/25 backdrop-blur">
            <label className="sr-only" htmlFor="footer-email">
              Your Email
            </label>
            <input
              className="min-w-0 flex-1 bg-transparent px-[30px] text-[20px] text-white placeholder:text-white focus:outline-none"
              id="footer-email"
              placeholder="Your Email"
              type="email"
            />
            <button aria-label="Submit email" className="grid w-[122px] place-items-center rounded-full bg-[#fff000]" type="submit">
              <img alt="" className="size-7" src={asset('icon-send.svg')} />
            </button>
          </form>
        </div>
      </div>
      <div className="relative z-10 mt-[70px] flex min-h-[93px] flex-col justify-center gap-4 border-t border-white/40 py-6 text-[16px] font-medium sm:flex-row sm:items-center sm:justify-between lg:text-[20px]">
        <p>Copyright 2024 Living Essentials Marketing, LLC. All rights reserved.</p>
        <p>Terms and Conditions | Privacy Policy</p>
      </div>
    </footer>
  )
}

function AuthModal({
  mode,
  onClose,
  onSwitchMode,
}: {
  mode: AuthMode
  onClose: () => void
  onSwitchMode: (mode: AuthMode) => void
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-5 py-8 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-md">
        <button
          aria-label="Close auth popup"
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-[#f1f5f9] text-xl font-bold text-[#0f172a] transition hover:bg-[#e2e8f0]"
          onClick={onClose}
          type="button"
        >
          x
        </button>
        <AuthForm mode={mode} />
        <p className="mt-5 text-center text-sm font-medium text-white">
          {mode === 'login' ? 'Need an account?' : 'Already have an account?'}{' '}
          <button className="font-bold text-[#fff000]" onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')} type="button">
            {mode === 'login' ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

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
      <Hero onOpenAuth={setAuthMode} />
      <Products />
      <Ticker />
      <FeaturedBottle />
      <Promotions />
      <Testimonials />
      <Faq />
      <Footer />
      {visibleAuthMode ? <AuthModal mode={visibleAuthMode} onClose={closeAuthModal} onSwitchMode={setAuthMode} /> : null}
    </main>
  )
}
