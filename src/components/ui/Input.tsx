import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Input({ label, error, id, className = '', ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <label className="block">
      <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#4c4c4c]">{label}</span>
      <input
        id={inputId}
        className={`mt-2 h-12 w-full rounded-[12px] border border-black/15 bg-white px-4 text-[#191919] outline-none transition placeholder:text-[#8a8a8a] focus:border-[#f89821] focus:ring-4 focus:ring-[#fff000]/30 ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${inputId}-error`} className="mt-2 block text-sm font-bold text-[#e84545]">
          {error}
        </span>
      ) : null}
    </label>
  )
}
