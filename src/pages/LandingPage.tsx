import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthForm } from '../components/auth/AuthForm'
import { useAuth } from '../context/useAuth'

const asset = (name: string) => `/figma-assets/${name}`

type AuthMode = 'login' | 'signup'

type Product = {
  badge: string
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
    name: 'Orange Flavor',
    description: 'Lorem ipsum dolor sit amet, etetur adipiscing elit.',
    price: '$32.99',
    image: 'hero-bottle-full.png',
    imageClass: 'max-h-[292px]',
    accent: '#f89821',
  },
  {
    badge: 'Gamer Shots',
    name: 'Rocket Raspberry',
    description: 'Lorem ipsum dolor sit amet, etetur adipiscing elit.',
    price: '$58.96',
    image: 'product-rocket-full.png',
    imageClass: 'max-h-[292px]',
    accent: '#cc2fb8',
  },
  {
    badge: 'Energy Drinks',
    name: 'Berry Punch Flavor',
    description: 'Lorem ipsum dolor sit amet, etetur adipiscing elit.',
    price: '$58.96',
    image: 'product-berry.png',
    imageClass: 'max-h-[305px]',
    accent: '#e84545',
  },
  {
    badge: 'Extra Strength',
    name: 'Fan Fuel',
    description: 'Lorem ipsum dolor sit amet, etetur adipiscing elit.',
    price: '$58.96',
    image: 'product-fan.png',
    imageClass: 'max-h-[292px]',
    accent: '#3178c6',
  },
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
          <Link className="block rounded-lg px-3 py-2 text-[16px] font-semibold text-[#4c4c4c] hover:bg-[#f5f5f5] hover:text-[#e0d000]" to="/dashboard">
            Dashboard
          </Link>
          <button className="block w-full rounded-lg px-3 py-2 text-left text-[16px] font-semibold text-[#4c4c4c] hover:bg-[#f5f5f5] hover:text-[#e0d000]" onClick={logout} type="button">
            Logout
          </button>
        </>
      ) : (
        <>
          <button className="block w-full rounded-lg px-3 py-2 text-left text-[16px] font-semibold text-[#4c4c4c] hover:bg-[#f5f5f5] hover:text-[#e0d000]" onClick={() => openAuth('login')} type="button">
            Login
          </button>
          <button className="block w-full rounded-lg px-3 py-2 text-left text-[16px] font-semibold text-[#4c4c4c] hover:bg-[#f5f5f5] hover:text-[#e0d000]" onClick={() => openAuth('signup')} type="button">
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
        <a aria-label="5-hour ENERGY home" className="shrink-0" href="#">
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
                    className={`flex items-center gap-3 whitespace-nowrap transition hover:text-[#e0d000] ${openDropdown === item.label ? 'text-[#e0d000]' : ''}`}
                    onClick={() => setOpenDropdown((current) => (current === item.label ? '' : item.label))}
                    type="button"
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon />
                  </button>
                ) : (
                  <a className="flex items-center gap-3 whitespace-nowrap transition hover:text-[#e0d000]" href="#">
                    {item.label}
                  </a>
                )}
                {item.dropdownItems && openDropdown === item.label ? (
                  <div className="absolute left-0 top-full z-50 w-[210px] pt-3">
                    <div className="rounded-[12px] border border-black/10 bg-white p-3 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a className="block rounded-lg px-3 py-2 text-left text-[15px] font-semibold text-[#4c4c4c] hover:bg-[#f5f5f5] hover:text-[#e0d000]" href="#" key={dropdownItem}>
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
                className={`grid size-6 place-items-center transition hover:text-[#e0d000] ${accountOpen ? 'text-[#e0d000]' : ''}`}
                onFocus={() => setAccountOpen(true)}
                type="button"
              >
                <UserIcon />
              </button>
              {accountMenu}
            </div>
            <a aria-label="Cart" className="grid size-6 place-items-center transition hover:text-[#e0d000]" href="#">
              <BagIcon />
            </a>
            <button aria-label="Search" className="grid size-6 place-items-center transition hover:text-[#e0d000]" type="button">
              <SearchIcon />
            </button>
          </div>
        </div>

        <div className="relative flex items-center gap-3 text-[#666666] sm:gap-4 xl:hidden">
          <div className="relative">
            <button
              aria-expanded={accountOpen}
              aria-label="Open account menu"
              className={`grid size-8 place-items-center transition hover:text-[#e0d000] ${accountOpen ? 'text-[#e0d000]' : ''}`}
              onClick={() => setAccountOpen((open) => !open)}
              type="button"
            >
              <UserIcon />
            </button>
            {accountMenu}
          </div>
          <a aria-label="Cart" className="grid size-8 place-items-center transition hover:text-[#e0d000]" href="#">
            <BagIcon />
          </a>
          <button aria-label="Search" className="grid size-8 place-items-center transition hover:text-[#e0d000]" type="button">
            <SearchIcon />
          </button>
          <button
            aria-expanded={mobileOpen}
            aria-label="Open menu"
            className="grid size-8 place-items-center transition hover:text-[#e0d000] xl:hidden"
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
                    className={`flex min-h-12 w-full items-center justify-between rounded-lg px-3 text-left hover:bg-[#f5f5f5] hover:text-[#e0d000] ${openMobileDropdown === item.label ? 'text-[#e0d000]' : ''}`}
                    onClick={() => setOpenMobileDropdown((current) => (current === item.label ? '' : item.label))}
                    type="button"
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon />
                  </button>
                ) : (
                  <a className="flex min-h-12 items-center justify-between rounded-lg px-3 hover:bg-[#f5f5f5] hover:text-[#e0d000]" href="#">
                    <span>{item.label}</span>
                  </a>
                )}
                {item.dropdownItems && openMobileDropdown === item.label ? (
                  <div className="grid gap-1 border-l border-black/10 pl-3 text-left text-[15px] font-medium text-[#666666]">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a className="rounded-lg px-3 py-2 text-left hover:bg-[#f5f5f5] hover:text-[#e0d000]" href="#" key={dropdownItem}>
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
    <section className="relative min-h-[760px] overflow-hidden bg-black px-5 pb-16 pt-[138px] text-center text-white sm:min-h-[850px] lg:min-h-[980px] lg:pb-20 lg:pt-[150px]">
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

function SectionHeading({
  before,
  highlight,
  after,
  copy,
  align = 'center',
}: {
  before: string
  highlight?: string
  after?: string
  copy: string
  align?: 'center' | 'left'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-[1162px] text-center' : 'max-w-[864px] text-left'}>
      <h2 className="font-display text-[44px] uppercase leading-none text-[#4c4c4c] sm:text-[64px] lg:text-[80px]">
        {before}
        {highlight ? <span className="text-[#e0d000]"> {highlight}</span> : null}
        {after ? ` ${after}` : null}
      </h2>
      <p className={`mt-[15px] text-[18px] font-medium leading-[1.3] text-[#747474] sm:text-[20px] ${align === 'center' ? 'mx-auto max-w-[1162px]' : ''}`}>
        {copy}
      </p>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-[20px] bg-white p-6 text-left shadow-[0_0_0_1px_#dfdfdf,0_20px_55px_rgba(0,0,0,0.08)]">
      <div className="relative grid h-[342px] place-items-center overflow-hidden rounded-[12px] bg-[#f8f8f8]">
        <div className="absolute h-[328px] w-[244px] rounded-full opacity-35 blur-sm" style={{ backgroundColor: product.accent }} />
        <img alt={product.name} className={`relative z-10 h-auto w-auto object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.18)] ${product.imageClass}`} src={asset(product.image)} />
        <button
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-[34px] right-[34px] grid size-[50px] place-items-center rounded-full bg-[#fff000] transition hover:bg-black"
          type="button"
        >
          <img alt="" className="size-6" src={asset('icon-cart.svg')} />
        </button>
      </div>
      <p className="mt-[29px] inline-flex h-9 items-center rounded-full bg-[#f2f2f2] px-[15px] text-[20px] font-semibold text-[#4c4c4c]">
        {product.badge}
      </p>
      <h3 className="mt-[29px] font-display text-[40px] uppercase leading-none text-[#4c4c4c]">{product.name}</h3>
      <p className="mt-2 text-[20px] font-medium leading-[1.3] text-[#747474]">{product.description}</p>
      <div className="mt-[29px] flex items-center justify-between gap-4">
        <p className="text-[30px] font-bold text-[#4c4c4c]">{product.price}</p>
        <CtaButton>shop now</CtaButton>
      </div>
    </article>
  )
}

function Products() {
  return (
    <section className="bg-white px-5 py-[120px]" id="products">
      <SectionHeading
        after="for Every Need"
        before="Explore Our Range Of"
        copy="Boost your energy and focus with 5-hour ENERGY shots, crafted for fast results. Choose from a variety of strengths and flavors to fuel your day without the crash."
        highlight="Energy-Boosting Shots"
      />
      <div className="mt-[30px] text-center">
        <CtaButton>view all products</CtaButton>
      </div>
      <div className="mx-auto mt-[50px] grid max-w-[1760px] gap-8 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  )
}

function Ticker() {
  const items = ['power', 'energy', 'focus', 'speed']

  return (
    <section aria-label="Energy benefits" className="overflow-hidden bg-white py-[60px]">
      <div className="flex w-max animate-[energyTicker_24s_linear_infinite] items-center gap-[90px] whitespace-nowrap">
        {[...items, ...items, ...items].map((item, index) => (
          <span className="font-display text-[74px] uppercase leading-none text-[#464646] sm:text-[97px]" key={`${item}-${index}`}>
            {item}
            <span className="ml-5 text-[#fff000]">*</span>
          </span>
        ))}
      </div>
    </section>
  )
}

function FeaturedBottle() {
  return (
    <section className="relative grid min-h-[880px] place-items-center overflow-hidden bg-white px-5 py-24 text-center">
      <div className="absolute top-[12%] size-[438px] rounded-full border border-[#e0d000]" />
      <div className="absolute top-[12%] max-w-[480px] text-center">
        <SectionHeading
          before="Explore our"
          copy="Discover our premium selection of 5-hour ENERGY shots, crafted to deliver long-lasting energy and mental clarity."
          highlight="featured products"
        />
      </div>
      <img
        alt="Featured 5-hour ENERGY regular strength bottle"
        className="relative z-10 h-[500px] w-auto object-contain drop-shadow-[0_36px_35px_rgba(0,0,0,0.18)] sm:h-[560px]"
        src={asset('feature-bottle.png')}
      />
    </section>
  )
}

function PromoCard({
  title,
  highlight,
  image,
  children,
}: {
  title: string
  highlight?: string
  image?: string
  children?: import('react').ReactNode
}) {
  return (
    <article className="relative min-h-[355px] overflow-hidden rounded-[20px] bg-[#969eb1] p-[30px] text-left">
      {image ? <img alt="" className="absolute inset-0 size-full object-cover" src={asset(image)} /> : null}
      <h3 className="relative z-10 font-display text-[44px] uppercase leading-none text-white sm:text-[60px]">
        {title}
        {highlight ? <span className="text-[#e0d000]"> {highlight}</span> : null}
      </h3>
      <CtaButton className="relative z-10 mt-5">build now</CtaButton>
      {children}
    </article>
  )
}

function Promotions() {
  return (
    <section className="bg-white px-5 py-[120px]">
      <div className="mx-auto grid max-w-[1720px] gap-8 lg:grid-cols-2">
        <PromoCard image="bundle.png" title="Build a Bundle" />
        <div className="grid gap-8">
          <PromoCard highlight="merch" title="See our">
            <div className="absolute bottom-[-20px] right-[-12px] flex items-end">
              <img alt="5-hour ENERGY shirt" className="h-[260px] object-contain sm:h-[300px]" src={asset('merch-shirt.png')} />
              <img alt="5-hour ENERGY hoodie" className="-ml-16 h-[260px] object-contain sm:h-[300px]" src={asset('merch-hoodie.png')} />
              <img alt="5-hour ENERGY cap" className="-ml-14 h-[220px] object-contain sm:h-[260px]" src={asset('merch-cap.png')} />
            </div>
          </PromoCard>
          <PromoCard title="Revitalize your day, nourish yourself">
            <div className="absolute bottom-[-28px] left-8 right-8 flex justify-center">
              {products.map((product) => (
                <img alt="" className="-mx-2 h-[210px] w-auto object-contain sm:h-[240px]" key={product.image} src={asset(product.image)} />
              ))}
            </div>
          </PromoCard>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="overflow-hidden bg-white px-5 py-[120px] text-center">
      <SectionHeading
        before="View Testimonials"
        copy="Lorem ipsum dolor sit amet, conetur ading elit. Lorem ipsum dolor sit amet, conetur ading elit."
        highlight="From Our Customers"
      />
      <div className="mx-auto mt-[60px] grid max-w-[1400px] gap-8 lg:grid-cols-[0.75fr_1.1fr_0.75fr] lg:items-center">
        {[0, 1, 2].map((item) => (
          <article
            className={`rounded-[14px] bg-white px-6 py-10 shadow-[0_3px_12px_rgba(0,0,0,0.11)] ${item === 1 ? 'lg:min-h-[450px] lg:px-10 lg:py-16' : 'opacity-50 lg:min-h-[304px]'}`}
            key={item}
          >
            <p className="font-display text-[86px] leading-none text-[#fff000]">"</p>
            <p className={`${item === 1 ? 'text-[30px]' : 'text-[20px]'} mx-auto max-w-[900px] font-medium italic leading-[1.3] text-[#747474]`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="mt-8 text-[22px] text-[#4c4c4c]">Wellness Wonderland</p>
            <p className={`${item === 1 ? 'text-[30px]' : 'text-[20px]'} font-semibold capitalize text-[#4c4c4c]`}>Anna Perkins</p>
          </article>
        ))}
      </div>
      <div className="mt-[60px] flex justify-center gap-[7px]">
        <span className="h-3 w-[67px] rounded-full bg-[#fff000]" />
        <span className="size-3 rounded-full bg-[#e7e7e7]" />
        <span className="size-3 rounded-full bg-[#e7e7e7]" />
        <span className="size-3 rounded-full bg-[#e7e7e7]" />
      </div>
    </section>
  )
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
