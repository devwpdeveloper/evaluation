import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'

type ApiUser = {
  id: number
  firstName?: string
  lastName?: string
  name?: string
  email: string
}

type UsersResponse = {
  users: ApiUser[]
}

type SortOrder = 'az' | 'za'

export function UsersPage() {
  const [users, setUsers] = useState<ApiUser[]>([])
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
      <Navbar />
      <main className="mx-auto max-w-[1760px] px-5 py-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#cc2fb8]">Users Module</p>
            <h1 className="mt-3 font-display text-6xl text-black">Users</h1>
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
              <table className="w-full min-w-[640px] text-left">
                <thead className="bg-black text-sm uppercase tracking-wide text-[#fff000]">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {pagedUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 font-bold text-black">{getUserName(user)}</td>
                      <td className="px-6 py-4 font-semibold text-[#4c4c4c]">{user.email}</td>
                      <td className="px-6 py-4 text-right">
                        <Link className="font-bold text-[#cc2fb8] hover:text-black" to={`/users/${user.id}`}>
                          View details
                        </Link>
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
      </main>
      <Footer />
    </div>
  )
}

function getUserName(user: ApiUser) {
  return user.name ?? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
}
