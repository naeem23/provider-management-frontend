'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { ArrowLeft } from 'lucide-react'
import { fetchWithAuth } from '@/lib/auth'
import { getUserFromStorage } from '@/lib/utils'

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

export default function CreateUserPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: '',
  })
  const [errors, setErrors] = useState<FormErrors>({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: ''
  })
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const user = getUserFromStorage()
  

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

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
      isValid = false
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
      isValid = false
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
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
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
    setApiError('')
    setSuccessMessage('')
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }))
    if (errors.role) {
      setErrors((prev) => ({
        ...prev,
        role: '',
      }))
    }
    setApiError('')
    setSuccessMessage('')
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
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/users/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: formData.role,
            provider_id: user?.provider_id
          })
        }
      )

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage('User account created successfully!')
        // Reset form
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          role: '',
        })
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/dashboard/users')
        }, 500)
      } else {
        if (data.username) {
          setApiError(data.username[0] || 'Username already exists')
        } else if (data.detail) {
          setApiError(data.detail)
        } else if (data.error) {
          setApiError(data.error)
        } else {
          setApiError('Failed to create user account. Please try again.')
        }
      }
    } catch (error) {
      setApiError('Network error. Please check your connection and try again.')
      console.error('Create user error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
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
          <span className="text-gray-900 font-medium">Create</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">Create User Account</h1>
        <p className="text-gray-600 mt-2">
          Add a new Supplier Representative or Contract Coordinator
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
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
          
          {/* Role */}
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

        {/* Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="password">Password *</Label>
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

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
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
        </div>

        {/* Submit Button */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard')}
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
            {loading ? 'Creating...' : 'Create User Account'}
          </Button>
        </div>
      </form>
    </div>
  )
}