import { asset } from './asset'
import { CtaButton } from './CtaButton'
import { tickerMarks } from './homeData'
import { TickerIcon } from './TickerSection'

export function PromotionsSection() {
  const marqueeItems = [...tickerMarks, ...tickerMarks, ...tickerMarks]

  return (
    <section className="bg-white px-5 py-[120px]">
      <div className="mx-auto grid max-w-[1760px] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <article className="promo-figma-card promo-figma-card-left">
          <img alt="" aria-hidden="true" className="promo-bundle-bg" src={asset('promo-bundle-bg.png')} />
          <img alt="5-hour ENERGY bundle packs" className="promo-bundle-packs" src={asset('promo-bundle-packs.png')} />
          <div className="promo-figma-overlay promo-figma-overlay-bundle" />
          <div className="promo-figma-content">
            <h3 className="promo-figma-title">
              Build A <span>Bundle</span>
            </h3>
            <CtaButton className="promo-figma-button">Build Now</CtaButton>
          </div>
        </article>

        <div className="grid gap-8">
          <article className="promo-figma-card promo-figma-card-top">
            <img alt="5-hour ENERGY merch products" className="promo-merch-products" src={asset('promo-merch-products.png')} />
            <div className="promo-figma-content">
              <h3 className="promo-figma-title">
                See Our <span>Merch</span>
              </h3>
              <CtaButton className="promo-figma-button">View All</CtaButton>
            </div>
          </article>

          <article className="promo-figma-card promo-figma-card-bottom">
            <img alt="Revitalize and nourish card visual" className="promo-figma-image" src={asset('promo-revitalize-figma.png')} />
            <div className="promo-figma-overlay promo-figma-overlay-bottom-top" />
            <div className="promo-figma-content promo-figma-content-bottom">
              <h3 className="promo-figma-title promo-figma-title-bottom">
                Revitalize Your Day, <span>Nourish Yourself</span>
              </h3>
            </div>
            <div className="promo-figma-strip-mask" aria-hidden="true" />
            <div className="promo-figma-marquee" aria-hidden="true">
              <div className="promo-figma-marquee-track">
                {marqueeItems.map((item, index) => (
                  <div className="promo-figma-marquee-item" key={`${item.label}-${index}`}>
                    <span className={item.outline ? 'promo-figma-marquee-word promo-figma-marquee-word-outline' : 'promo-figma-marquee-word'}>
                      {item.label}
                    </span>
                    <TickerIcon icon={item.icon} />
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
