'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { cn } from '@/lib/utils'
import { Building2, Calendar, Heart, Search, Settings, User } from 'lucide-react'

const mainNavItems = [
  {
    title: 'Search Spaces',
    href: '/search',
    icon: Search
  },
  {
    title: 'My Bookings',
    href: '/dashboard/user/bookings',
    icon: Calendar,
    role: 'user'
  },
  {
    title: 'Favorites',
    href: '/dashboard/user/favorites',
    icon: Heart,
    role: 'user'
  },
  {
    title: 'My Spaces',
    href: '/dashboard/host/spaces',
    icon: Building2,
    role: 'host'
  },
  {
    title: 'Host Bookings',
    href: '/dashboard/host/bookings',
    icon: Calendar,
    role: 'host'
  },
  {
    title: 'Settings',
    href: '/dashboard/user/settings',
    icon: Settings
  }
]

interface MainNavProps {
  userRole?: 'user' | 'host'
}

export function MainNav({ userRole }: MainNavProps) {
  const pathname = usePathname()

  const filteredNavItems = mainNavItems.filter(item => {
    if (!item.role) return true
    return item.role === userRole
  })

  return (
    <NavigationMenu.Root className="relative flex w-full justify-between bg-white shadow-sm">
      <div className="flex max-w-screen-xl flex-1 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Building2 className="h-6 w-6" />
          <span className="font-bold">SpaceShare</span>
        </Link>

        <NavigationMenu.List className="flex items-center space-x-4">
          {filteredNavItems.map((item) => (
            <NavigationMenu.Item key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100',
                  pathname === item.href
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            </NavigationMenu.Item>
          ))}

          <NavigationMenu.Item>
            <Link
              href="/dashboard/user"
              className="flex items-center space-x-1 rounded-md p-2 hover:bg-slate-100"
            >
              <User className="h-5 w-5" />
            </Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </div>
    </NavigationMenu.Root>
  )
} 