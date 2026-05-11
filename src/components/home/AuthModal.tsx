import { AuthForm } from '../auth/AuthForm'
import type { AuthMode } from './types'

type AuthModalProps = {
  mode: AuthMode
  onClose: () => void
  onSwitchMode: (mode: AuthMode) => void
}

export function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const switchLabel = mode === 'login' ? 'Sign up' : 'Login'
  const helperText = mode === 'login' ? 'Need an account?' : 'Already have an account?'
  const nextMode = mode === 'login' ? 'signup' : 'login'

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-5 py-8 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-md">
        <button
          aria-label="Close auth popup"
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-[#f1f5f9] text-xl font-bold text-[#0f172a] transition hover:bg-[#e2e8f0]"
          onClick={onClose}
          type="button"
        >
          x
        </button>
        <AuthForm mode={mode} />
        <p className="mt-5 text-center text-sm font-medium text-white">
          {helperText}{' '}
          <button className="font-bold text-[#fff000]" onClick={() => onSwitchMode(nextMode)} type="button">
            {switchLabel}
          </button>
        </p>
      </div>
    </div>
  )
}
