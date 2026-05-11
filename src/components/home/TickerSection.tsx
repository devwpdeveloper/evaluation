import { tickerMarks } from './homeData'
import type { TickerIconName, TickerMark } from './types'

export function TickerSection() {
  const repeatedMarks = [...tickerMarks, ...tickerMarks, ...tickerMarks]

  return (
    <section aria-label="Energy benefits" className="relative z-0 overflow-hidden bg-white pb-[70px] pt-[150px] lg:pt-[430px]">
      <div className="ticker-track">
        {repeatedMarks.map((mark, index) => (
          <TickerItem index={index} key={`${mark.label}-${index}`} mark={mark} />
        ))}
      </div>
    </section>
  )
}

export function TickerIcon({ icon }: { icon: TickerIconName }) {
  if (icon === 'bolt') {
    return (
      <svg aria-hidden="true" className="ticker-icon ticker-icon-bolt" viewBox="0 0 52 76">
        <path d="M50.4 0 17.8 35.8h20.6L1.6 76l10.9-39.2H0L50.4 0Z" fill="#ffc61a" />
      </svg>
    )
  }

  if (icon === 'flame') {
    return (
      <svg aria-hidden="true" className="ticker-icon ticker-icon-flame" viewBox="0 0 64 76">
        <path
          d="M33.7 74.1c16.4-5.6 25.5-15.4 25.5-29.2 0-9.2-5.1-17.3-14.4-24.9-1.1 9-4.8 13.8-10.7 17.4C36.4 23.3 31.2 11.5 18.5 0c1.7 14.7-4.1 23.1-10.3 31.1C2.8 38.1.6 44.1.6 51.4c0 12.6 9 20.9 22.4 22.9-4.2-3.7-6.1-8.1-5.4-13.2.7-5.5 4.3-10.2 11-14.4-.1 8.6 2.6 14 8.1 16.1 1.7-5 4.1-8.6 7.2-10.9.1 9.3-3.4 16.7-10.2 22.2Z"
          fill="#f28a23"
        />
      </svg>
    )
  }

  if (icon === 'target') {
    return (
      <svg aria-hidden="true" className="ticker-icon ticker-icon-target" viewBox="0 0 82 82">
        <path
          d="M28 2H8a6 6 0 0 0-6 6v20M54 2h20a6 6 0 0 1 6 6v20M80 54v20a6 6 0 0 1-6 6H54M28 80H8a6 6 0 0 1-6-6V54"
          fill="none"
          stroke="#ff4a58"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path d="M41 18v13M41 51v13M18 41h13M51 41h13" fill="none" stroke="#ff4a58" strokeLinecap="round" strokeWidth="4" />
        <circle cx="41" cy="41" fill="none" r="19" stroke="#ff4a58" strokeWidth="5" />
        <circle cx="41" cy="41" fill="#ff4a58" r="6" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" className="ticker-icon ticker-icon-gauge" viewBox="0 0 96 64">
      <path d="M14 53a38 38 0 0 1 68 0" fill="none" stroke="#4c4c4c" strokeLinecap="round" strokeWidth="8" />
      <path d="M18 53a34 34 0 0 1 16-28" fill="none" stroke="#eb3f31" strokeLinecap="round" strokeWidth="8" />
      <path d="M34 25a34 34 0 0 1 30-2" fill="none" stroke="#ffc61a" strokeLinecap="round" strokeWidth="8" />
      <path d="M64 23a34 34 0 0 1 14 30" fill="none" stroke="#179d61" strokeLinecap="round" strokeWidth="8" />
      <path d="M48 49 73 26" fill="none" stroke="#4c4c4c" strokeLinecap="round" strokeWidth="6" />
      <circle cx="48" cy="52" fill="#4c4c4c" r="6" />
    </svg>
  )
}

function TickerItem({ index, mark }: { index: number; mark: TickerMark }) {
  return (
    <div className="ticker-item" key={`${mark.label}-${index}`}>
      <span className={mark.outline ? 'ticker-word ticker-word-outline' : 'ticker-word'}>{mark.label}</span>
      <TickerIcon icon={mark.icon} />
    </div>
  )
}
