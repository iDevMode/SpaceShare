'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/common/Input'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role')
      })
    })

    setIsLoading(false)

    if (response.ok) {
      router.push('/login')
    } else {
      const data = await response.json()
      setError(data.error || 'Something went wrong')
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-slate-600">
          Enter your details to create your account
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="John Doe"
          required
          disabled={isLoading}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          disabled={isLoading}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          required
          disabled={isLoading}
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Account Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="user"
                defaultChecked
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm">User</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="host"
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm">Host</span>
            </label>
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  )
} 