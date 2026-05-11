import { asset } from './asset'
import { CtaButton } from './CtaButton'
import { products } from './homeData'
import type { Product } from './types'

export function ProductsSection() {
  return (
    <section className="relative z-10 h-auto overflow-visible bg-black px-5 pb-16 pt-[120px] lg:h-[875px] lg:pb-0" id="products">
      <div className="mx-auto flex max-w-[1162px] flex-col items-center gap-[15px] text-center">
        <h2 className="font-display text-[44px] uppercase leading-[1.2] text-white sm:text-[64px] lg:text-[80px]">
          Explore Our Range Of <span className="text-[#fff000]">Energy-Boosting Shots</span> For Every Need
        </h2>
        <p className="text-[18px] font-medium leading-[1.3] text-[#b3b3b3] sm:text-[20px]">
          Boost your energy and focus with 5-hour ENERGY shots, crafted for fast results. Choose from a variety of strengths and flavors to fuel your day without the crash.
        </p>
      </div>

      <div className="mt-[30px] text-center lg:mt-[30px]">
        <CtaButton>view all products</CtaButton>
      </div>

      <div className="mx-auto mt-[50px] grid max-w-[1760px] gap-8 md:grid-cols-2 xl:grid-cols-4 lg:absolute lg:left-1/2 lg:top-[509px] lg:mt-0 lg:w-[calc(100%-160px)] lg:-translate-x-1/2 2xl:w-[1760px]">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex min-h-[663px] flex-col gap-[29px] overflow-hidden rounded-[25px] bg-white p-6 text-left shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
      <div className="relative h-[342px] shrink-0 overflow-hidden rounded-[10px] bg-[#11110f]">
        <div
          className="absolute left-1/2 top-0 h-[328px] w-[244px] -translate-x-1/2 rounded-full opacity-75 blur-[42px]"
          style={{ background: `radial-gradient(circle, ${product.accent} 0%, rgba(17,17,15,0) 68%)` }}
        />
        <img
          alt={product.name}
          className={`absolute left-1/2 top-6 z-10 w-auto -translate-x-1/2 object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.32)] ${product.imageClass}`}
          src={asset(product.image)}
        />
        <img
          alt=""
          aria-hidden="true"
          className={`product-card-reflection absolute left-1/2 top-[278px] w-auto -translate-x-1/2 -scale-y-100 object-contain opacity-35 ${product.imageClass}`}
          src={asset(product.image)}
        />
        <button
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-2.5 right-2.5 z-20 grid size-[50px] place-items-center rounded-br-[10px] rounded-tl-[10px] border border-[#b9b9b9] bg-white transition hover:border-[#fff000] hover:bg-[#fff000]"
          type="button"
        >
          <img alt="" className="size-6" src={asset('icon-cart.svg')} />
        </button>
      </div>

      <p className="inline-flex h-9 w-fit items-center rounded-full px-[15px] text-[20px] font-medium" style={{ backgroundColor: product.badgeBg, color: product.badgeColor }}>
        {product.badge}
      </p>
      <div className="w-[327px] max-w-full">
        <h3 className="font-display text-[40px] uppercase leading-none text-[#4c4c4c]">{product.name}</h3>
        <p className="text-[20px] font-medium leading-[1.3] text-[#747474]">{product.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-4">
        <p className="font-display text-[30px] uppercase leading-normal text-[#4c4c4c]">{product.price}</p>
        <CtaButton>shop now</CtaButton>
      </div>
    </article>
  )
}
