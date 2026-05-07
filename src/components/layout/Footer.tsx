export function Footer() {
  return (
    <footer className="border-t-4 border-[#fff000] bg-black text-white">
      <div className="mx-auto grid max-w-[1760px] gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl text-[#fff000]">ProspectRoute</p>
          <p className="mt-4 max-w-md text-sm font-semibold leading-6 text-white/75">
            A focused CRM starter for managing prospects, users, and daily tasks from one responsive workspace.
          </p>
        </div>
        <div>
          <p className="font-display text-2xl text-[#fff000]">Product</p>
          <ul className="mt-4 space-y-3 text-sm font-semibold text-white/75">
            <li>Landing page</li>
            <li>Users module</li>
            <li>Tasks dashboard</li>
          </ul>
        </div>
        <div>
          <p className="font-display text-2xl text-[#fff000]">Support</p>
          <ul className="mt-4 space-y-3 text-sm font-semibold text-white/75">
            <li>Documentation</li>
            <li>Setup guide</li>
            <li>Deployment notes</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
