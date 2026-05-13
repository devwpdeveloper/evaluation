import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Footer as HomeFooter, Header as HomeHeader } from './LandingPage'

type ApiUser = {
  id: number
  firstName?: string
  lastName?: string
  name?: string
  email: string
  phone?: string
  username?: string
  image?: string
  company?: {
    name?: string
    title?: string
  }
  address?: {
    address?: string
    city?: string
    state?: string
    country?: string
  }
}

type UsersResponse = {
  users: ApiUser[]
}

type SortOrder = 'az' | 'za'

export function UsersPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<ApiUser[]>([])
  const [selectedUser, setSelectedUser] = useState<ApiUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<SortOrder>('az')
  const [page, setPage] = useState(1)
  const pageSize = 8

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch('https://dummyjson.com/users?limit=40', { signal: controller.signal })
        if (!response.ok) throw new Error('Unable to fetch users.')
        const data = (await response.json()) as UsersResponse
        setUsers(data.users)
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
    return () => controller.abort()
  }, [])

  const searchText = query.trim().toLowerCase()
  const filteredUsers = users
    .filter((user) => {
      const name = getUserName(user).toLowerCase()
      return name.includes(searchText) || user.email.toLowerCase().includes(searchText)
    })
    .sort((first, second) => {
      const firstName = getUserName(first)
      const secondName = getUserName(second)
      return sortOrder === 'az' ? firstName.localeCompare(secondName) : secondName.localeCompare(firstName)
    })

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize))
  const pagedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="min-h-screen bg-[#fff8c7]">
      <HomeHeader onOpenAuth={(mode) => navigate(`/${mode}`)} />
      <main>
        <section className="relative overflow-hidden bg-black px-5 pb-10 pt-32 text-white md:pb-14 md:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_18%,rgba(255,240,0,0.14),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0)_72%,rgba(0,0,0,0.9)_100%)]" />
          <div className="relative z-20 mx-auto flex max-w-[1760px] flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#fff000]">Users Module</p>
              <h1 className="mt-3 font-display text-7xl leading-none text-white sm:text-8xl">Users</h1>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/75">
                API users from DummyJSON with search, sorting, pagination, and quick details in a popup.
              </p>
            </div>
            <div className="grid w-full max-w-md grid-cols-2 overflow-hidden rounded-[12px] border border-white/15 bg-white/10">
              <Stat label="Loaded" value={users.length} />
              <Stat label="Matches" value={filteredUsers.length} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1760px] px-5 py-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#cc2fb8]">API Directory</p>
              <h2 className="mt-2 font-display text-5xl text-black">Customer Users</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                label="Search users"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setPage(1)
                }}
                placeholder="Name or email"
              />
              <label className="block min-w-[180px]">
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#4c4c4c]">Sort</span>
                <select
                  className="mt-2 h-12 w-full rounded-[12px] border border-black/15 bg-white px-4 text-[#191919] outline-none focus:border-[#f89821] focus:ring-4 focus:ring-[#fff000]/30"
                  value={sortOrder}
                  onChange={(event) => {
                    setSortOrder(event.target.value as SortOrder)
                    setPage(1)
                  }}
                >
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </label>
            </div>
          </div>

          <Card className="mt-8 overflow-hidden">
            {loading ? <p className="p-6 font-semibold text-[#4c4c4c]">Loading users...</p> : null}
            {error ? <p className="p-6 font-bold text-[#e84545]">{error}</p> : null}
            {!loading && !error ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-left">
                  <thead className="bg-black text-sm uppercase tracking-wide text-[#fff000]">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Phone</th>
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {pagedUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {user.image ? <img alt="" className="size-10 rounded-full bg-[#fff8c7] object-cover" src={user.image} /> : null}
                            <span className="font-bold text-black">{getUserName(user)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#4c4c4c]">{user.email}</td>
                        <td className="px-6 py-4 font-semibold text-[#4c4c4c]">{user.phone ?? 'Not available'}</td>
                        <td className="px-6 py-4 font-semibold text-[#4c4c4c]">{user.company?.name ?? 'Not available'}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="font-bold text-[#cc2fb8] transition hover:text-black" onClick={() => setSelectedUser(user)} type="button">
                            View details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {pagedUsers.length === 0 ? <p className="p-6 font-semibold text-[#4c4c4c]">No users match your search.</p> : null}
              </div>
            ) : null}
          </Card>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-bold text-[#4c4c4c]">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-3">
              <Button type="button" variant="secondary" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>
                Previous
              </Button>
              <Button type="button" variant="secondary" disabled={page === totalPages} onClick={() => setPage((current) => current + 1)}>
                Next
              </Button>
            </div>
          </div>
        </section>
      </main>

      {selectedUser ? <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} /> : null}
      <HomeFooter />
    </div>
  )
}

function UserDetailsModal({ user, onClose }: { user: ApiUser; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-5 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="user-detail-title">
      <div className="w-full max-w-3xl rounded-[12px] border border-[#fff000] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {user.image ? <img alt="" className="size-16 rounded-full bg-[#fff8c7] object-cover" src={user.image} /> : null}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#cc2fb8]">User Details</p>
              <h2 className="mt-2 font-display text-5xl leading-none text-black" id="user-detail-title">
                {getUserName(user)}
              </h2>
            </div>
          </div>
          <button className="grid size-10 shrink-0 place-items-center rounded-full bg-[#fff000] text-xl font-bold text-black transition hover:bg-black hover:text-[#fff000]" type="button" onClick={onClose}>
            x
          </button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <DetailItem label="Email" value={user.email} />
          <DetailItem label="Username" value={user.username} />
          <DetailItem label="Phone" value={user.phone} />
          <DetailItem label="Company" value={user.company?.name} />
          <DetailItem label="Role" value={user.company?.title} />
          <DetailItem
            label="Address"
            value={[user.address?.address, user.address?.city, user.address?.state, user.address?.country].filter(Boolean).join(', ')}
          />
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#cc2fb8]">{label}</p>
      <p className="mt-2 text-lg font-bold text-black">{value || 'Not available'}</p>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border-r border-white/15 p-4 last:border-r-0">
      <p className="font-display text-5xl leading-none text-[#fff000]">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/65">{label}</p>
    </div>
  )
}

function getUserName(user: ApiUser) {
  return user.name ?? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
}
