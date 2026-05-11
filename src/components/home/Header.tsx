import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { asset } from './asset'
import { navItems } from './homeData'
import { BagIcon, ChevronDownIcon, MenuIcon, SearchIcon, UserIcon } from './icons'
import type { AuthMode } from './types'

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
          <DesktopNav openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
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
        <MobileNav openMobileDropdown={openMobileDropdown} setOpenMobileDropdown={setOpenMobileDropdown} />
      ) : null}
    </header>
  )
}

function DesktopNav({
  openDropdown,
  setOpenDropdown,
}: {
  openDropdown: string
  setOpenDropdown: (value: string | ((current: string) => string)) => void
}) {
  return (
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
  )
}

function MobileNav({
  openMobileDropdown,
  setOpenMobileDropdown,
}: {
  openMobileDropdown: string
  setOpenMobileDropdown: (value: string | ((current: string) => string)) => void
}) {
  return (
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
  )
}
