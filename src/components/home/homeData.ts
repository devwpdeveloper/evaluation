import type { FooterGroup, Product, Testimonial, TickerMark } from './types'

export const navItems = [
  { label: 'Shop', dropdownItems: ['Energy Shots', 'Extra Strength', 'Gamer Shots', 'Merch'] },
  { label: 'Build A Bundle', dropdownItems: ['Starter Bundle', 'Variety Pack', 'Fan Favorites', 'Subscribe & Save'] },
  { label: 'Merch' },
  { label: 'Pre Workout' },
  { label: 'FAQs' },
  { label: 'Blogs' },
  { label: 'Store Locator' },
]

export const products: Product[] = [
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

export const featuredFrames = [
  { src: 'featured-step-1.png', alt: 'Featured product stage one' },
  { src: 'featured-step-2.png', alt: 'Featured product stage two' },
  { src: 'featured-step-3.png', alt: 'Featured product stage three' },
  { src: 'featured-step-4.png', alt: 'Featured product stage four' },
]

export const faqItems = [
  {
    question: 'What is a 5-hour ENERGY Shot?',
    answer: 'It is a compact energy shot made for fast, convenient energy and focus support when you need a boost during the day.',
  },
  {
    question: 'How do you ensure code quality?',
    answer: 'The project uses TypeScript, reusable React components, ESLint, and production builds to catch issues before delivery.',
  },
  {
    question: 'How do you manage project timelines?',
    answer: 'Work is split into clear modules, verified incrementally, and prioritized around the required landing, auth, users, and tasks flows.',
  },
  {
    question: 'What makes your team unique?',
    answer: 'The experience combines pixel-focused frontend implementation with practical app behavior such as authentication and local task management.',
  },
  {
    question: 'How do you test the software?',
    answer: 'Core verification includes build checks, lint checks, route testing, form validation testing, and browser review across responsive widths.',
  },
]

export const testimonials: Testimonial[] = [
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

export const tickerMarks: TickerMark[] = [
  { label: 'power', icon: 'bolt' },
  { label: 'energy', icon: 'flame', outline: true },
  { label: 'focus', icon: 'target' },
  { label: 'speed', icon: 'gauge', outline: true },
]

export const footerGroups: FooterGroup[] = [
  {
    title: 'contact',
    items: [
      { label: 'SI Online, LLC', href: '#' },
      { label: '38955 Hills Tech Dr.', href: 'https://maps.google.com/?q=38955+Hills+Tech+Dr.+Farmington+Hills+MI+48331' },
      { label: 'Farmington Hills, MI 48331', href: 'https://maps.google.com/?q=38955+Hills+Tech+Dr.+Farmington+Hills+MI+48331' },
      { label: '888-960-9495', href: 'tel:8889609495' },
      { label: 'Or fill out this form', href: '#' },
    ],
  },
  {
    title: 'social',
    items: [
      { label: 'Facebook', href: 'https://www.facebook.com/5hourenergy' },
      { label: 'Instagram', href: 'https://www.instagram.com/5hourenergy' },
      { label: 'Youtube', href: 'https://www.youtube.com/user/5hourenergy' },
      { label: 'Twitter', href: 'https://twitter.com/5hourenergy' },
      { label: 'Tiktok', href: 'https://www.tiktok.com/@5hourenergy' },
    ],
  },
  {
    title: 'company',
    items: [
      { label: 'Search', href: '#' },
      { label: 'Return Policy', href: '#' },
      { label: 'Shipping Policy', href: '#' },
      { label: 'Subscription Terms', href: '#' },
      { label: 'Patents', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  },
]
