import { Building2 } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-8">
      <Link href="/" className="mb-8 flex items-center space-x-2">
        <Building2 className="h-8 w-8" />
        <span className="text-2xl font-bold">SpaceShare</span>
      </Link>
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        {children}
      </div>
    </div>
  )
} 