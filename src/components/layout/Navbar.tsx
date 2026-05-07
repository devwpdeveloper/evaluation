import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { Button } from '../ui/Button'

const publicLinks = [
  { label: 'Features', to: '/#features' },
  { label: 'Users', to: '/users' },
  { label: 'Tasks', to: '/dashboard' },
]

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-[#fff8c7] px-4 py-3">
      <div className="mx-auto flex min-h-14 max-w-[1760px] items-center justify-between rounded-[12px] bg-white px-5 shadow-[0_14px_42px_rgba(0,0,0,0.16)]">
        <Link to="/" className="font-display text-3xl text-black">
          ProspectRoute
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-bold uppercase tracking-[0.08em] text-black md:flex">
          {publicLinks.map((link) => (
            <NavLink key={link.label} to={link.to} className="transition hover:text-[#cc2fb8]">
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <Button type="button" onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
              <Link className="inline-flex min-h-11 items-center justify-center rounded-br-[22px] rounded-tl-[22px] px-5 text-sm font-bold text-black transition hover:bg-white" to="/login">
                Login
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-br-[22px] rounded-tl-[22px] bg-black px-5 text-sm font-bold text-[#fff000] shadow-[0_16px_34px_rgba(0,0,0,0.18)] transition hover:bg-[#4c4c4c]"
                to="/signup"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
