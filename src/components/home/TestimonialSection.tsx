import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { testimonials } from './homeData'
import { ArrowLeftIcon, ArrowRightIcon } from './icons'
import type { Testimonial } from './types'

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const previousIndex = getPreviousIndex(activeIndex)
  const nextIndex = getNextIndex(activeIndex)

  useEffect(() => {
    const intervalId = window.setInterval(showNext, 4500)
    return () => window.clearInterval(intervalId)
  }, [activeIndex])

  function showPrevious() {
    setActiveIndex(getPreviousIndex)
  }

  function showNext() {
    setActiveIndex(getNextIndex)
  }

  return (
    <section className="overflow-hidden bg-white px-5 py-20 text-center lg:h-[975px] lg:py-0">
      <div className="mx-auto flex max-w-[1037px] flex-col items-center gap-[15px] lg:pt-[120px]">
        <h2 className="font-display text-[54px] uppercase leading-none text-[#4c4c4c] sm:text-[68px] lg:text-[80px]">
          View <span className="text-[#e0d000]">Testimonials</span> From Our Customers
        </h2>
        <p className="text-[18px] font-medium leading-normal text-[#747474] sm:text-[20px]">
          Lorem ipsum dolor sit amet, conetur ading elit. Lorem ipsum dolor sit amet, conetur ading elit.
        </p>
      </div>

      <div className="testimonials-stage mx-auto mt-[60px] max-w-[1920px]">
        <button
          aria-label="Previous testimonial"
          className="absolute left-5 top-1/2 z-20 hidden size-12 -translate-y-1/2 rounded-br-[24px] rounded-tl-[24px] border border-[#fff000] bg-[#fff000] text-black transition hover:bg-black hover:text-[#fff000] md:grid md:place-items-center"
          onClick={showPrevious}
          type="button"
        >
          <ArrowLeftIcon />
        </button>

        <div className="testimonials-track">
          <TestimonialCard active={false} testimonial={testimonials[previousIndex]} />
          <TestimonialCard active testimonial={testimonials[activeIndex]} />
          <TestimonialCard active={false} testimonial={testimonials[nextIndex]} />
        </div>

        <button
          aria-label="Next testimonial"
          className="absolute right-5 top-1/2 z-20 hidden size-12 -translate-y-1/2 rounded-br-[24px] rounded-tl-[24px] border border-[#fff000] bg-[#fff000] text-black transition hover:bg-black hover:text-[#fff000] md:grid md:place-items-center"
          onClick={showNext}
          type="button"
        >
          <ArrowRightIcon />
        </button>
      </div>

      <div className="mt-[60px] flex justify-center gap-[7px] lg:mt-[60px]">
        {testimonials.map((item, index) => (
          <button
            aria-label={`Show testimonial ${index + 1}`}
            className={`h-3 rounded-full transition-all ${index === activeIndex ? 'w-[67px] bg-[#fff000]' : 'w-3 bg-[#e7e7e7] hover:bg-[#d6d6d6]'}`}
            key={`${item.name}-${index}`}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  )
}

function TestimonialCard({ active, testimonial }: { active: boolean; testimonial: Testimonial }) {
  const cardWidth = active ? 1216 : 823

  return (
    <article
      aria-hidden={!active}
      className="testimonial-card"
      data-active={active}
      style={{ '--testimonial-card-width': `${cardWidth}px` } as CSSProperties}
    >
      <p className="testimonial-quote-mark">&ldquo;</p>
      <p className="testimonial-copy">{testimonial.quote}</p>
      <div className="testimonial-person">
        <p className="testimonial-source">{testimonial.source}</p>
        <p className="testimonial-name">{testimonial.name}</p>
      </div>
    </article>
  )
}

function getPreviousIndex(currentIndex: number) {
  return currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
}

function getNextIndex(currentIndex: number) {
  return currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
}
