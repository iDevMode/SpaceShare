'use client'

import Link from 'next/link'
import { Building2 } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xl font-semibold text-slate-900 hover:text-blue-600"
        >
          <Building2 className="h-6 w-6" />
          <span>SpaceShare</span>
        </Link>
      </div>
    </header>
  )
} 