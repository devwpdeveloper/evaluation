import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

type UserDetails = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  username?: string
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

export function UserDetailsPage() {
  const { userId } = useParams()
  const [user, setUser] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadUser() {
      if (!userId) {
        setError('User id is missing.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')
        const response = await fetch(`https://dummyjson.com/users/${userId}`, { signal: controller.signal })
        if (!response.ok) throw new Error('Unable to fetch user details.')
        setUser((await response.json()) as UserDetails)
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        setLoading(false)
      }
    }

    loadUser()
    return () => controller.abort()
  }, [userId])

  return (
    <div className="min-h-screen bg-[#fff8c7]">
      <Navbar />
      <main className="mx-auto max-w-[1760px] px-5 py-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#cc2fb8]">Users Module</p>
            <h1 className="mt-3 font-display text-6xl text-black">User Details</h1>
          </div>
          <Link to="/users">
            <Button type="button" variant="secondary">
              Back to Users
            </Button>
          </Link>
        </div>

        <Card className="mt-8 max-w-4xl p-6">
          {loading ? <p className="font-semibold text-[#4c4c4c]">Loading user details...</p> : null}
          {error ? <p className="font-bold text-[#e84545]">{error}</p> : null}
          {!loading && !error && user ? (
            <div className="grid gap-6 md:grid-cols-2">
              <DetailItem label="Name" value={`${user.firstName} ${user.lastName}`} />
              <DetailItem label="Email" value={user.email} />
              <DetailItem label="Username" value={user.username} />
              <DetailItem label="Phone" value={user.phone} />
              <DetailItem label="Company" value={user.company?.name} />
              <DetailItem label="Role" value={user.company?.title} />
              <div className="md:col-span-2">
                <DetailItem
                  label="Address"
                  value={[user.address?.address, user.address?.city, user.address?.state, user.address?.country].filter(Boolean).join(', ')}
                />
              </div>
            </div>
          ) : null}
        </Card>
      </main>
      <Footer />
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
