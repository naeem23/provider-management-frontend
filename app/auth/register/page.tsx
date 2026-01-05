'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address_line1: '',
    city: '',
    postal_code: '',
    country: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const validateForm = () => {
    const newErrors = {
        name: '',
        email: '',
        phone: ''
    }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required'
      isValid = false
    } else if (formData.name.length < 3) {
      newErrors.name = 'Company name must be at least 3 characters'
      isValid = false
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (formData.email.length < 6) {
      newErrors.email = 'Email must be a valid one'
      isValid = false
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone is required'
      isValid = false
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Phone must be at least 10 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    setApiError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setApiError('')

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/providers/providers/`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }
      )

      const data = await response.json()

      if (response.ok) {
        // Redirect to dashboard or home
        router.push(`/auth/register/admin?providerId=${data.id}`)
      } else {
        // Handle error response
        setApiError(data.detail || 'Registration failed.')
      }
    } catch (error) {
      setApiError('Network error. Please check your connection and try again.')
      console.error('Registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-gray-600">Register your company as a provider</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow">
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {apiError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                disabled={loading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                disabled={loading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                disabled={loading}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address_line1"
                type="text"
                value={formData.address_line1}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="postal_code">Postcode</Label>
              <Input
                id="postal_code"
                name="postal_code"
                type="text"
                value={formData.postal_code}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/auth/login" 
                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}