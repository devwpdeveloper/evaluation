import { useEffect, useRef, useState } from 'react'
import { asset } from './asset'
import { featuredFrames } from './homeData'

export function FeaturedBottleSection() {
  const [activeStep, setActiveStep] = useState(0)
  const stepTrackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const stepTrack = stepTrackRef.current
    if (!stepTrack) return undefined

    const stepElements = Array.from(stepTrack.querySelectorAll<HTMLElement>('[data-feature-step]'))
    if (!stepElements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleStep = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visibleStep) return

        const stepIndex = Number(visibleStep.target.getAttribute('data-feature-step'))
        if (!Number.isNaN(stepIndex)) setActiveStep(stepIndex)
      },
      {
        threshold: [0.35, 0.6, 0.8],
        rootMargin: '-15% 0px -20% 0px',
      },
    )

    stepElements.forEach((stepElement) => observer.observe(stepElement))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#ffffff] px-0 py-0">
      <div className="mx-auto max-w-[1920px] lg:hidden">
        <img
          alt="Featured products sequence final state"
          className="h-auto w-full object-contain"
          src={asset(featuredFrames[featuredFrames.length - 1].src)}
        />
      </div>

      <div className="featured-frame-shell relative mx-auto hidden max-w-[1920px] lg:block">
        <div className="featured-frame-sticky">
          <div className="featured-frame-stage">
            {featuredFrames.map((frame, index) => (
              <img
                alt={frame.alt}
                className={`featured-frame-image ${index === activeStep ? 'is-active' : ''}`}
                key={frame.src}
                src={asset(frame.src)}
              />
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="featured-frame-step-track" ref={stepTrackRef}>
          {featuredFrames.map((frame, index) => (
            <div className="featured-frame-step" data-feature-step={index} key={`${frame.src}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
