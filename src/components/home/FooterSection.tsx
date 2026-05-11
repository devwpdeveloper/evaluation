import { useState } from 'react'
import type { FormEvent } from 'react'
import { asset } from './asset'
import { footerGroups } from './homeData'

export function Footer() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [hasError, setHasError] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cleanEmail = email.trim().toLowerCase()
    if (!isValidEmail(cleanEmail)) {
      setHasError(true)
      setMessage('Enter a valid email address.')
      return
    }

    saveNewsletterEmail(cleanEmail)
    setEmail('')
    setHasError(false)
    setMessage('Thanks for subscribing.')
  }

  function updateEmail(value: string) {
    setEmail(value)
    setMessage('')
    setHasError(false)
  }

  return (
    <footer className="relative overflow-hidden bg-black px-5 pt-[180px] text-[#b3b3b3] sm:pt-[210px] lg:pt-[244px]">
      <img alt="" className="absolute inset-x-0 top-[-160px] h-[807px] w-full object-cover opacity-30 sm:top-[-223px]" src={asset('footer-bg.png')} />
      <img alt="5-hour ENERGY" className="absolute left-1/2 top-[31px] h-[112px] -translate-x-1/2 sm:h-[135px] lg:h-[155px]" src={asset('footer-logo.svg')} />

      <div className="relative z-10 mx-auto grid max-w-[1730px] gap-12 lg:grid-cols-[1fr_1fr_1fr_2.2fr]">
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-display text-[30px] uppercase text-white">{group.title}</h3>
            <ul className="mt-5 space-y-5 text-[20px] font-medium">
              {group.items.map((item) => (
                <li key={item.label}>
                  <a className="transition hover:text-white focus-visible:text-white focus-visible:outline-none" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-display text-[30px] uppercase text-white">stay informed</h3>
          <p className="mt-5 max-w-[724px] text-[20px] font-medium leading-[1.3]">
            Get the latest updates, new product information, emails, and targeted marketing from the Makers of 5-hour ENERGY, and information from other products and promotions that may be of interest to me.
          </p>

          <form className="mt-5 flex h-[55px] max-w-[574px] overflow-hidden rounded-full bg-white/25 backdrop-blur" onSubmit={handleSubmit} noValidate>
            <label className="sr-only" htmlFor="footer-email">
              Your Email
            </label>
            <input
              className="min-w-0 flex-1 bg-transparent px-[30px] text-[20px] text-white placeholder:text-white focus:outline-none"
              id="footer-email"
              onChange={(event) => updateEmail(event.target.value)}
              placeholder="Your Email"
              type="email"
              value={email}
            />
            <button
              aria-label="Submit email"
              className="grid w-[122px] cursor-pointer place-items-center rounded-full bg-[#fff000] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fff000]"
              type="submit"
            >
              <img alt="" className="size-7" src={asset('icon-send.svg')} />
            </button>
          </form>

          {message ? (
            <p className={`mt-3 text-[16px] font-bold ${hasError ? 'text-[#fff000]' : 'text-white'}`} role="status" aria-live="polite">
              {message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="relative z-10 mt-[70px] flex min-h-[93px] flex-col justify-center gap-4 border-t border-white/40 py-6 text-[16px] font-medium sm:flex-row sm:items-center sm:justify-between lg:text-[20px]">
        <p>Copyright 2024 Living Essentials Marketing, LLC. All rights reserved.</p>
        <p>Terms and Conditions | Privacy Policy</p>
      </div>
    </footer>
  )
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function saveNewsletterEmail(email: string) {
  const savedEmails = JSON.parse(window.localStorage.getItem('newsletterEmails') ?? '[]') as string[]
  const nextEmails = Array.from(new Set([...savedEmails, email]))

  window.localStorage.setItem('newsletterEmails', JSON.stringify(nextEmails))
}
