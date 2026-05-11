export function CtaButton({ children, className = '' }: { children: string; className?: string }) {
  return (
    <a
      className={`cta-button inline-flex h-[50px] min-w-[145px] items-center justify-center rounded-br-[25px] rounded-tl-[25px] border border-[#fff000] bg-[#fff000] px-7 text-[20px] font-bold capitalize text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fff000] ${className}`}
      href="#products"
    >
      <span className="relative z-10">{children}</span>
    </a>
  )
}
