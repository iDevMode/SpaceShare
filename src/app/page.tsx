import Link from 'next/link'
import { Search } from 'lucide-react'

export default function Home() {
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
      <Link
        href="/search"
        className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
      >
        <Search className="h-5 w-5" />
        <span>Search Spaces</span>
      </Link>
    </div>
  )
}
