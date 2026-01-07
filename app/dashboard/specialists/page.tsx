'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil, Trash2, UserPlus, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchWithAuth } from '@/lib/auth'

interface Specialist {
  id: number
  first_name: string
  last_name: string
  email: string
  role_name: string
  experience_level: string
  skills: string
  avg_daily_rate: number
  location: string
  status: string
  available_from: string
}

export default function SpecialistsPage() {
  const router = useRouter()
  const [specialists, setSpecialists] = useState<Specialist[]>([])
  const [filteredSpecialists, setFilteredSpecialists] = useState<Specialist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchSpecialists()
  }, [])

  useEffect(() => {
    handleSearch()
  }, [searchQuery, specialists])

  const fetchSpecialists = async () => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/specialists/specialists/`)

      if (response.ok) {
        const data = await response.json()
        setSpecialists(data)
        setFilteredSpecialists(data)
      } else {
        setError('Failed to fetch specialists')
      }
    } catch (error) {
      console.error('Failed to fetch specialists:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredSpecialists(specialists)
      setCurrentPage(1)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = specialists.filter(
      (specialist) =>
        specialist.first_name.toLowerCase().includes(query) ||
        specialist.last_name.toLowerCase().includes(query) ||
        specialist.email.toLowerCase().includes(query) ||
        specialist.role_name.toLowerCase().includes(query) ||
        specialist.skills.toLowerCase().includes(query) ||
        specialist.location.toLowerCase().includes(query)
    )
    setFilteredSpecialists(filtered)
    setCurrentPage(1)
  }

  const handleDelete = async (specialistId: number, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete specialist "${name}"? This action cannot be undone.`
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/specialists/specialists/${specialistId}/`,
        {
          method: 'DELETE',
        }
      )

      if (response.ok) {
        // Remove from local state instead of full reload
        setSpecialists(prev => prev.filter(s => s.id !== specialistId))
        setFilteredSpecialists(prev => prev.filter(s => s.id !== specialistId))
      } else {
        const errorData = await response.json()
        alert(errorData.detail || 'Failed to delete specialist')
      }
    } catch (error) {
      console.error('Delete specialist error:', error)
      alert('Network error. Please try again.')
    }
  }

  const handleEdit = (specialistId: number) => {
    router.push(`/dashboard/specialists/update/${specialistId}`)
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredSpecialists.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSpecialists = filteredSpecialists.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getExperienceBadgeColor = (level: string) => {
    switch (level) {
      case 'JUNIOR':
        return 'bg-green-100 text-green-800'
      case 'MID':
        return 'bg-blue-100 text-blue-800'
      case 'SENIOR':
        return 'bg-purple-100 text-purple-800'
      case 'LEAD':
        return 'bg-orange-100 text-orange-800'
      case 'EXPERT':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Inactive':
        return 'bg-gray-100 text-gray-800'
      case 'On_Leave':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p>Loading specialists...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header with Breadcrumbs */}
      <div className="mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="hover:text-gray-900 cursor-pointer"
          >
            Dashboard
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">Specialists</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Specialists</h1>
            <p className="text-gray-600 mt-2">
              {filteredSpecialists.length} specialist{filteredSpecialists.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <Button
            onClick={() => router.push('/dashboard/specialists/add')}
            className="cursor-pointer"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Specialist
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by name, email, role, skills, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Specialists Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentSpecialists.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    {searchQuery ? 'No specialists found matching your search.' : 'No specialists found. Create your first specialist to get started.'}
                  </td>
                </tr>
              ) : (
                currentSpecialists.map((specialist) => (
                  <tr key={specialist.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {specialist.first_name} {specialist.last_name}
                        </div>
                        <div className="text-sm text-gray-500">{specialist.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{specialist.role_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getExperienceBadgeColor(specialist.experience_level)}`}>
                        {specialist.experience_level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate" title={specialist.skills}>
                        {specialist.skills}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{specialist.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${specialist.avg_daily_rate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(specialist.status)}`}>
                        {specialist.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(specialist.id)}
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(specialist.id, `${specialist.first_name} ${specialist.last_name}`)}
                          className="cursor-pointer text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              <Button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredSpecialists.length)}</span> of{' '}
                  <span className="font-medium">{filteredSpecialists.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <Button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className="rounded-r-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          onClick={() => goToPage(page)}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          className="rounded-none"
                        >
                          {page}
                        </Button>
                      )
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-3 py-2 text-sm text-gray-700">
                          ...
                        </span>
                      )
                    }
                    return null
                  })}

                  <Button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className="rounded-l-none"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}