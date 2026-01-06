'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Bell, User, LogOut, Users, UserPlus, Settings } from 'lucide-react'
import { fetchWithAuth, logout } from '@/lib/auth'
import { UserData } from '@/types/user'


export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [notificationCount, setNotificationCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
    fetchUnreadNotification()
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

  const fetchUnreadNotification = async () => {
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

  const isProviderAdmin = user.role === 'PROVIDER_ADMIN'

  return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Admin Actions - Only for PROVIDER_Admin */}
        {isProviderAdmin && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Admin Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ActionCard
                icon={<UserPlus className="w-6 h-6" />}
                title="Add Specialist"
                description="Create new specialist account"
                onClick={() => router.push('/dashboard/specialists/add')}
              />
              <ActionCard
                icon={<Users className="w-6 h-6" />}
                title="Manage Specialists"
                description="View and edit specialists"
                onClick={() => router.push('/dashboard/specialists')}
              />
              <ActionCard
                icon={<UserPlus className="w-6 h-6" />}
                title="Create User Account"
                description="Add Supplier Rep or Contract Coordinator"
                onClick={() => router.push('/dashboard/users/create')}
              />
              <ActionCard
                icon={<Users className="w-6 h-6" />}
                title="Manage Users"
                description="View and manage all user accounts"
                onClick={() => router.push('/dashboard/users')}
              />
            </div>
          </div>
        )}

        {/* Common Actions - Available to all users */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">My Account</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActionCard
              icon={<Settings className="w-6 h-6" />}
              title="Account Settings"
              description="Manage your account information"
              onClick={() => router.push('/dashboard/settings')}
            />
            <ActionCard
              icon={<User className="w-6 h-6" />}
              title="Profile"
              description="View and edit your profile"
              onClick={() => router.push('/dashboard/profile')}
            />
          </div>
        </div>
      </div>
  )
}

interface ActionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}

function ActionCard({ icon, title, description, onClick }: ActionCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  )
}