import { useState } from 'react'
import { CtaButton } from './CtaButton'
import { faqItems } from './homeData'
import { FaqArrowIcon } from './icons'

export function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState('')

  return (
    <section className="bg-[#fbfcff] px-5 py-16 lg:min-h-[820px] lg:py-[120px]">
      <div className="mx-auto grid max-w-[1760px] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
        <div className="max-w-[864px]">
          <h2 className="font-display text-[54px] uppercase leading-[1.2] text-[#4c4c4c] sm:text-[68px] lg:text-[80px]">
            Frequently Asked Questions
          </h2>
          <p className="mt-[15px] max-w-[864px] text-[18px] font-medium leading-[1.3] text-[#747474] sm:text-[20px]">
            Boost your energy and focus with 5-hour ENERGY shots, crafted for fast results. Choose from a variety of strengths and flavors to fuel your day without the crash.
          </p>
          <CtaButton className="mt-6 lg:mt-[30px]">view all</CtaButton>
        </div>

        <div className="max-w-[864px] lg:justify-self-end">
          {faqItems.map((item) => {
            const isOpen = openQuestion === item.question

            return (
              <div className="border-b border-[#dfdfdf]" key={item.question}>
                <button
                  aria-expanded={isOpen}
                  className="faq-question flex min-h-[116px] w-full items-center justify-between gap-6 py-10 text-left uppercase text-[#4c4c4c] transition hover:text-black"
                  onClick={() => setOpenQuestion(isOpen ? '' : item.question)}
                  type="button"
                >
                  <span className="pr-3">{item.question}</span>
                  <span className="inline-flex shrink-0 items-center justify-center text-[#4c4c4c]">
                    <FaqArrowIcon open={isOpen} />
                  </span>
                </button>

                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="pb-10 pr-16 text-[18px] font-medium leading-[1.6] text-[#747474] sm:text-[20px]">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
