'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Calendar } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  const handleSearch = () => {
    router.push('/search')
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
        Find Your Perfect
        <span className="text-blue-600"> Workspace</span>
      </h1>
      <p className="mb-8 max-w-2xl text-lg text-slate-600">
        Book professional co-working spaces by the hour, day, week, or month.
        No long-term commitments. Just flexible workspace solutions.
      </p>
      <div className="relative w-full max-w-2xl space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Find your space..."
              className="w-full rounded-lg border border-slate-200 bg-white py-4 pl-12 pr-4 text-lg shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
          <button 
            onClick={handleSearch}
            className="rounded-lg bg-blue-600 px-6 py-4 text-lg font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
          >
            Search
          </button>
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              className="w-full rounded-lg border border-slate-200 bg-white py-4 pl-12 pr-4 text-lg shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
          <div className="relative flex-1">
            <input
              type="time"
              className="w-full rounded-lg border border-slate-200 bg-white py-4 px-4 text-lg shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-600">
          <span>Popular:</span>
          <button className="rounded-full bg-slate-100 px-3 py-1 hover:bg-slate-200">Meeting Rooms</button>
          <button className="rounded-full bg-slate-100 px-3 py-1 hover:bg-slate-200">Private Offices</button>
          <button className="rounded-full bg-slate-100 px-3 py-1 hover:bg-slate-200">Hot Desks</button>
        </div>
      </div>
    </div>
  )
}
