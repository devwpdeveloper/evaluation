export type AuthMode = 'login' | 'signup'

export type Product = {
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

export type FooterLink = {
  label: string
  href: string
}

export type FooterGroup = {
  title: string
  items: FooterLink[]
}

export type Testimonial = {
  quote: string
  source: string
  name: string
}

export type TickerIconName = 'bolt' | 'flame' | 'target' | 'gauge'

export type TickerMark = {
  label: string
  icon: TickerIconName
  outline?: boolean
}
