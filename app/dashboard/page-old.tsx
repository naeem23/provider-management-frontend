'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Bell, User } from 'lucide-react'
import { isAuthenticated, getUserFromToken } from '@/lib/auth'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login')
      return
    }

    const userData = getUserFromToken()
    setUser(userData)
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          
          <h1 className="font-semibold text-lg">
            Provider Management Tool
          </h1>

          <div className="flex items-center gap-6 text-sm">
            <div className="relative">
              <Bell size={20} />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                3
              </span>
            </div>

            <div>
                <User size={20} className='mr-2'/>
                {user.username}
            </div>

            <div className="text-gray-500 font-medium">
              Role: {user.role}
            </div>
          </div>

        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">

        <h2 className="text-xl font-semibold">
          Dashboard
        </h2>

        {/* PROVIDER ADMIN ACTIONS */}
        {user.role === 'PROVIDER_ADMIN' && (
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h3 className="font-semibold text-lg">
              Provider Administration
            </h3>

            <div className="flex flex-wrap gap-4">
              <Button onClick={() => router.push('/specialists')}>
                Manage Specialists
              </Button>

              <Button onClick={() => router.push('/users')}>
                Manage Users
              </Button>

              <Button onClick={() => router.push('/account')}>
                My Account
              </Button>
            </div>
          </div>
        )}

        {/* COMMON SECTION */}
        <div className="bg-white p-6 rounded shadow space-y-4">
          <h3 className="font-semibold text-lg">
            Operations
          </h3>

          <div className="flex flex-wrap gap-4">
            <Button onClick={() => router.push('/service-requests')}>
              Service Requests
            </Button>

            <Button onClick={() => router.push('/contracts')}>
              Contracts
            </Button>

            <Button onClick={() => router.push('/tasks')}>
              Task Inbox
            </Button>
          </div>
        </div>

      </main>
    </div>
  )
}
