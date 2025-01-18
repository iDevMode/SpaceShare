'use client'

import { useState, useEffect } from 'react'
import { Star, Heart } from 'lucide-react'

interface Space {
  id: number
  title: string
  location: string
  type: string
  offer: boolean
  rating: number
  reviews: number
  price: number
  offices: number
  people: string
  imageUrl: string
  partTime: boolean
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [spaces, setSpaces] = useState<Space[]>([])

  // Mock data - in a real app, this would come from an API
  const allSpaces: Space[] = [
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
      partTime: true
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
      partTime: true
    },
  ]

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites)
      setFavorites(favoriteIds)
      // Filter spaces to only show favorites
      const favoriteSpaces = allSpaces.filter(space => favoriteIds.includes(space.id))
      setSpaces(favoriteSpaces)
    }
  }, [])

  const toggleFavorite = (spaceId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(id => id !== spaceId)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      // Update displayed spaces
      const favoriteSpaces = allSpaces.filter(space => newFavorites.includes(space.id))
      setSpaces(favoriteSpaces)
      return newFavorites
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-2xl font-bold text-slate-900">My Favorite Spaces</h1>
        
        {spaces.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
            <p className="text-lg text-slate-600">You haven't saved any spaces yet.</p>
            <p className="mt-2 text-slate-600">Click the heart icon on any space to save it to your favorites.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {spaces.map((space) => (
              <div key={space.id} className="group cursor-pointer overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
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
                    <Heart className="h-5 w-5 fill-blue-600 text-blue-600" />
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
        )}
      </div>
    </div>
  )
} 