'use client'

import { Search, Calendar, Star, Heart, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import GoogleMap from '@/components/map/GoogleMap'
import Header from '@/components/layout/Header'

interface FilterState {
  size: string | null
  price: string | null
  type: string | null
  minTerm: string | null
}

type SortOption = 'recommended' | 'price_low_high' | 'price_high_low' | 'rating'

export default function SearchPage() {
  const [showMap, setShowMap] = useState(true)
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedSpaceId, setSelectedSpaceId] = useState<number | null>(null)
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    size: null,
    price: null,
    type: null,
    minTerm: null
  })
  const [sortBy, setSortBy] = useState<SortOption>('recommended')

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (spaceId: number) => {
    setFavorites(prev => {
      if (prev.includes(spaceId)) {
        return prev.filter(id => id !== spaceId)
      } else {
        return [...prev, spaceId]
      }
    })
  }

  // Mock data for testing layout
  const spaces = [
    {
      id: 1,
      title: "WorkLife - Manchester",
      location: "Central Business District",
      type: "ALL INCLUSIVE",
      offer: true,
      rating: 4.8,
      reviews: 124,
      price: 780,
      offices: 2,
      people: "2-6",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
      partTime: true,
      coordinates: {
        lat: 53.4808,
        lng: -2.2426
      },
      size: "SMALL",
      minTerm: "1 MONTH"
    },
    {
      id: 2,
      title: "Un.titled Studio",
      location: "Arts District",
      type: "SELF-MANAGED",
      offer: true,
      rating: 4.6,
      reviews: 89,
      price: 650,
      offices: 2,
      people: "5-10",
      imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80",
      partTime: true,
      coordinates: {
        lat: 53.4861,
        lng: -2.2384
      },
      size: "MEDIUM",
      minTerm: "3 MONTHS"
    },
    {
      id: 3,
      title: "The Hive - Northern Quarter",
      location: "Northern Quarter",
      type: "ALL INCLUSIVE",
      offer: false,
      rating: 4.9,
      reviews: 156,
      price: 950,
      offices: 4,
      people: "10-20",
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
      partTime: false,
      coordinates: {
        lat: 53.4847,
        lng: -2.2343
      },
      size: "LARGE",
      minTerm: "6 MONTHS"
    },
    {
      id: 4,
      title: "Spinningfields Hub",
      location: "Spinningfields",
      type: "SELF-MANAGED",
      offer: true,
      rating: 4.7,
      reviews: 92,
      price: 850,
      offices: 3,
      people: "8-15",
      imageUrl: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80",
      partTime: true,
      coordinates: {
        lat: 53.4793,
        lng: -2.2511
      },
      size: "MEDIUM",
      minTerm: "1 MONTH"
    },
    {
      id: 5,
      title: "Ancoats Works",
      location: "Ancoats",
      type: "ALL INCLUSIVE",
      offer: false,
      rating: 4.5,
      reviews: 78,
      price: 550,
      offices: 1,
      people: "1-4",
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
      partTime: true,
      coordinates: {
        lat: 53.4839,
        lng: -2.2271
      },
      size: "SMALL",
      minTerm: "1 MONTH"
    },
    {
      id: 6,
      title: "MediaCity Workspace",
      location: "Salford Quays",
      type: "ALL INCLUSIVE",
      offer: true,
      rating: 4.8,
      reviews: 143,
      price: 1200,
      offices: 5,
      people: "15-30",
      imageUrl: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80",
      partTime: false,
      coordinates: {
        lat: 53.4725,
        lng: -2.2936
      },
      size: "LARGE",
      minTerm: "12 MONTHS"
    }
  ]

  const handleMarkerClick = (spaceId: number) => {
    setSelectedSpaceId(spaceId)
    const element = document.getElementById(`space-${spaceId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }))
  }

  const filteredSpaces = spaces.filter(space => {
    if (activeFilters.size && space.size !== activeFilters.size) return false
    if (activeFilters.type && space.type !== activeFilters.type) return false
    if (activeFilters.minTerm && space.minTerm !== activeFilters.minTerm) return false
    if (activeFilters.price) {
      switch (activeFilters.price) {
        case 'UNDER_600':
          if (space.price >= 600) return false
          break
        case '600_1000':
          if (space.price < 600 || space.price > 1000) return false
          break
        case 'OVER_1000':
          if (space.price <= 1000) return false
          break
      }
    }
    return true
  })

  const sortSpaces = (spaces: typeof filteredSpaces) => {
    switch (sortBy) {
      case 'price_low_high':
        return [...spaces].sort((a, b) => a.price - b.price)
      case 'price_high_low':
        return [...spaces].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...spaces].sort((a, b) => b.rating - a.rating)
      default:
        // For 'recommended', we'll sort by a combination of rating and reviews
        return [...spaces].sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
    }
  }

  const sortedSpaces = sortSpaces(filteredSpaces)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {/* Search Header */}
      <div className="sticky top-16 z-10 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by city or country"
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-12 pr-4 text-base shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
            <button className="rounded-lg bg-blue-600 px-6 py-2 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10">
              Search
            </button>
          </div>

          {/* Filter Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button 
              onClick={() => toggleFilter('type', 'ALL INCLUSIVE')}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilters.type === 'ALL INCLUSIVE'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              All Inclusive
            </button>
            <button 
              onClick={() => toggleFilter('size', 'SMALL')}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilters.size === 'SMALL'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              Small (1-6)
            </button>
            <button 
              onClick={() => toggleFilter('size', 'MEDIUM')}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilters.size === 'MEDIUM'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              Medium (7-15)
            </button>
            <button 
              onClick={() => toggleFilter('size', 'LARGE')}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilters.size === 'LARGE'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              Large (15+)
            </button>
            <button 
              onClick={() => toggleFilter('price', 'UNDER_600')}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilters.price === 'UNDER_600'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              Under £600
            </button>
            <button 
              onClick={() => toggleFilter('price', '600_1000')}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilters.price === '600_1000'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              £600 - £1000
            </button>
            <button 
              onClick={() => toggleFilter('price', 'OVER_1000')}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilters.price === 'OVER_1000'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              Over £1000
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Results List */}
        <div className="flex-1 px-4 py-6">
          {/* Breadcrumb and Results Count */}
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-600">
              <span>United Kingdom</span>
              <span>›</span>
              <span>Manchester</span>
              {Object.entries(activeFilters).map(([key, value]) => 
                value && (
                  <span key={key}>
                    <span>›</span>
                    <span className="text-blue-600">{value.replace('_', ' - ')}</span>
                  </span>
                )
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Manchester - <span className="font-normal text-slate-600">Office Space - {filteredSpaces.length} results</span>
            </h1>
          </div>

          {/* Sort Controls */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Sorted by</span>
              <select 
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="recommended">Recommended</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <button 
              onClick={() => setShowMap(!showMap)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            >
              <MapPin className="h-4 w-4" />
              {showMap ? 'Hide map' : 'Show map'}
            </button>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {sortedSpaces.map((space) => (
              <div 
                key={space.id} 
                id={`space-${space.id}`}
                className={`group cursor-pointer overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md ${
                  selectedSpaceId === space.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute left-4 top-4 z-10 flex gap-2">
                    <span className="rounded bg-slate-900/80 px-2 py-1 text-xs font-medium text-white">
                      {space.type}
                    </span>
                    {space.offer && (
                      <span className="rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                        OFFER
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(space.id)
                    }}
                    className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm hover:bg-white"
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        favorites.includes(space.id) 
                          ? 'fill-blue-600 text-blue-600' 
                          : 'text-slate-600'
                      }`} 
                    />
                  </button>
                  <img 
                    src={space.imageUrl} 
                    alt={space.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="text-lg font-medium text-slate-900">{space.title}</h3>
                    <p className="text-sm text-slate-600">{space.location}</p>
                  </div>
                  <div className="mb-4 flex items-center gap-4 text-sm text-slate-600">
                    <span>{space.offices} offices</span>
                    <span>{space.people} people</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-slate-900">{space.rating}</span>
                      <span className="text-sm text-slate-600">({space.reviews})</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-slate-900">£{space.price}</p>
                      <p className="text-sm text-slate-600">/month</p>
                    </div>
                  </div>
                  {space.partTime && (
                    <p className="mt-2 text-sm text-slate-600">Also available part-time</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        {showMap && (
          <div className="sticky top-[137px] h-[calc(100vh-137px)] w-[45%] bg-slate-100">
            <div className="absolute right-4 top-4 z-10">
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
                <input type="checkbox" className="rounded border-slate-300" />
                Search as I move the map
              </label>
            </div>
            <GoogleMap spaces={sortedSpaces} onMarkerClick={handleMarkerClick} />
          </div>
        )}
      </div>
    </div>
  )
} 