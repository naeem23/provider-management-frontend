'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { fetchWithAuth } from '@/lib/auth'

interface FormData {
  username: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  role: string
}

interface FormErrors {
  username?: string
  password?: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  role?: string
}

export default function UpdateUserPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [fetchingUser, setFetchingUser] = useState(true)
  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchUserData()
  }, [userId])

  const fetchUserData = async () => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/users/${userId}/`)

      if (response.ok) {
        const data = await response.json()
        setFormData({
          username: data.username,
          password: '',
          confirmPassword: '',
          firstName: data.first_name,
          lastName: data.last_name,
          role: data.role,
        })
      } else {
        setApiError('Failed to load user data')
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setApiError('Network error. Please try again.')
    } finally {
      setFetchingUser(false)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
      isValid = false
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
      isValid = false
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores'
      isValid = false
    }

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
      isValid = false
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
      isValid = false
    }

    // Password validation (only if password is being changed)
    if (formData.password) {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
        isValid = false
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and number'
        isValid = false
      }

      // Confirm password validation
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
        isValid = false
      }
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select a role'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
    setApiError('')
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }))
    if (errors.role) {
      setErrors((prev) => ({
        ...prev,
        role: undefined,
      }))
    }
    setApiError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError('')
    setSuccessMessage('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const payload: any = {
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: formData.role,
      }

      // Only include password if it's being changed
      if (formData.password) {
        payload.password = formData.password
      }

      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/users/${userId}/`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSuccessMessage('User account updated successfully!')
        setTimeout(() => {
          router.push('/dashboard/users')
        }, 2000)
      } else {
        const errorData = await response.json()
        setApiError(errorData.detail || errorData.message || 'Failed to update user account')
      }
    } catch (error) {
      setApiError('Network error. Please check your connection and try again.')
      console.error('Update user error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (fetchingUser) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <p>Loading user data...</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
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
          <button
            onClick={() => router.push('/dashboard/users')}
            className="hover:text-gray-900 cursor-pointer"
          >
            Users
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">Update</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">Update User Account</h1>
        <p className="text-gray-600 mt-2">
          Edit user information and permissions
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-6">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {apiError}
          </div>
        )}

        {/* Username and Role in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className={`mt-1 ${errors.username ? 'border-red-500' : ''}`}
              disabled={loading}
              placeholder="e.g., john_doe"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Role *</Label>
            <Select onValueChange={handleRoleChange} value={formData.role} disabled={loading}>
              <SelectTrigger className={`mt-1 w-full ${errors.role ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SUPPLIER_REP">Supplier Representative</SelectItem>
                <SelectItem value="CONTRACT_COORDINATOR">Contract Coordinator</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>
        </div>

        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
              disabled={loading}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
              disabled={loading}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password (Optional) */}
            <div>
            <Label htmlFor="password">New Password (Leave blank to keep current)</Label>
            <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
                disabled={loading}
                placeholder="Minimum 8 characters"
            />
            {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            </div>

            {/* Confirm Password (Only show if password is entered) */}
            {formData.password && (
            <div>
                <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                disabled={loading}
                placeholder="Re-enter password"
                />
                {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
            </div>
            )}
        </div>

        {/* Submit Button */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/users')}
            disabled={loading}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update User'}
          </Button>
        </div>
      </form>
    </div>
  )
}