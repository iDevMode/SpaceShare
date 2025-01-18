'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface Space {
  id: number
  title: string
  location: string
  price: number
  imageUrl: string
  coordinates?: {
    lat: number
    lng: number
  }
}

interface GoogleMapProps {
  spaces: Space[]
  onMarkerClick?: (spaceId: number) => void
}

export default function GoogleMap({ spaces, onMarkerClick }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])

  useEffect(() => {
    // Initialize Google Maps
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['places']
    })

    loader.load().then(() => {
      if (mapRef.current) {
        // Center on Manchester by default
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 53.4808, lng: -2.2426 },
          zoom: 13,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        })

        setMap(mapInstance)

        // Add markers for each space
        const newMarkers = spaces
          .filter(space => space.coordinates)
          .map(space => {
            const marker = new google.maps.Marker({
              position: space.coordinates,
              map: mapInstance,
              title: space.title,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#2563eb',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2
              }
            })

            // Create info window content
            const content = `
              <div class="p-2 min-w-[200px]">
                <div class="font-medium text-slate-900">${space.title}</div>
                <div class="text-sm text-slate-600">${space.location}</div>
                <div class="mt-1 font-medium text-slate-900">£${space.price}/month</div>
              </div>
            `

            const infoWindow = new google.maps.InfoWindow({
              content,
              pixelOffset: new google.maps.Size(0, -10)
            })

            // Add click listener
            marker.addListener('click', () => {
              // Close all other info windows
              markers.forEach(m => m.infoWindow?.close())
              infoWindow.open({
                anchor: marker,
                map: mapInstance
              })
              onMarkerClick?.(space.id)
            })

            // Store info window with marker
            marker.infoWindow = infoWindow

            return marker
          })

        setMarkers(newMarkers)
      }
    })

    return () => {
      // Cleanup markers
      markers.forEach(marker => {
        marker.setMap(null)
        if (marker.infoWindow) {
          marker.infoWindow.close()
        }
      })
    }
  }, [spaces, onMarkerClick])

  return <div ref={mapRef} className="h-full w-full" />
} 