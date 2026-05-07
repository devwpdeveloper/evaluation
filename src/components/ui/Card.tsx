import type { HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-[12px] border border-black/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] ${className}`} {...props} />
}
