import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  let variantClass = 'cta-button border border-[#fff000] bg-[#fff000] text-black hover:text-[#fff000] shadow-[0_16px_34px_rgba(0,0,0,0.16)]'

  if (variant === 'secondary') {
    variantClass = 'border border-black/15 bg-white text-[#4c4c4c] hover:border-black hover:text-black'
  }

  if (variant === 'ghost') {
    variantClass = 'text-[#4c4c4c] hover:bg-[#fff000] hover:text-black'
  }

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-br-[22px] rounded-tl-[22px] px-5 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fff000] disabled:cursor-not-allowed disabled:opacity-60 ${variantClass} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}
