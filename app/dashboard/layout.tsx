'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Bell, User, LogOut } from 'lucide-react'
import { fetchWithAuth, logout } from '@/lib/auth'
import { UserData } from '@/types/user'


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [notificationCount, setNotificationCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
    fetchUnreadNotifCount()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/users/me`)

      if (response.ok) {
        const data = await response.json()
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
      } else {
        logout()
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const fetchUnreadNotifCount = async () => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/notifications/unread-count`)

      if (response.ok) {
        const data = await response.json()
        setNotificationCount(data.unread_count)
      } else {
        setNotificationCount(0)
      }
    } catch (error) {
      console.error('Failed to fetch notification count:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - User info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-800">{user.username}</span>
            </div>

            {/* Notifications */}
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 text-gray-600 hover:text-gray-800" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </div>
          </div>

          {/* Right side - User role and logout */}
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {user.role}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}