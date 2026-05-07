import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'

type AuthMode = 'login' | 'signup'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes('auth/invalid-credential')) return 'Email or password is incorrect.'
    if (error.message.includes('auth/email-already-in-use')) return 'An account already exists for this email.'
    if (error.message.includes('auth/weak-password')) return 'Password should be at least 6 characters.'
    return error.message
  }

  return 'Something went wrong. Please try again.'
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const navigate = useNavigate()
  const { login, signup } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({})
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: typeof errors = {}

    if (!email.trim()) nextErrors.email = 'Email is required.'
    else if (!isValidEmail(email)) nextErrors.email = 'Enter a valid email address.'
    if (!password) nextErrors.password = 'Password is required.'
    else if (password.length < 6) nextErrors.password = 'Password must be at least 6 characters.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setSubmitting(true)
    setErrors({})

    try {
      if (mode === 'login') await login(email, password)
      else await signup(email, password)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setErrors({ form: getAuthErrorMessage(error) })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-[#fff000] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.22)]">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f89821]">Firebase Access</p>
      <h1 className="mt-2 font-display text-5xl text-black">{mode === 'login' ? 'Login' : 'Create account'}</h1>
      <p className="mt-2 font-semibold text-[#4c4c4c]">Use Firebase Authentication to access your dashboard.</p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} error={errors.email} />
        <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} error={errors.password} />
        {errors.form ? <p className="rounded-[12px] border border-[#e84545]/30 bg-[#fff4f4] p-3 text-sm font-bold text-[#e84545]">{errors.form}</p> : null}
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign up'}
        </Button>
      </form>
    </Card>
  )
}
