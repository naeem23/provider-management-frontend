'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegistrationForm() {
  const searchParams = useSearchParams()
  const providerId = searchParams.get('providerId')
  const router = useRouter()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirm_password: '',
  })

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const validateForm = () => {
    const newErrors = {
      username: '',
      password: '',
      confirm_password: ''
    }
    let isValid = true

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
      isValid = false
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
      isValid = false
    }
    
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Password not matched'
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/providers/providers/register-admin/`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password,
                provider_id: providerId
            }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        // Store JWT tokens
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
        
        // Redirect to dashboard or home
        router.push('/dashboard')
      } else {
        // Handle error response
        if (data?.username) {
            setApiError(data?.username?.[0] || 'Username already exists.')
        } else if (data?.provider_id) {
            setApiError(data?.provider_id?.[0] || 'Provider admin already exists.')
        } else if (data?.password) {
            setApiError(data?.password?.[0] || 'Password validation failed.')
        } else {
            setApiError('Signup failed. Please try again.')
        }
      }
    } catch (error) {
      setApiError('Network error. Please check your connection and try again.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Provider Admin</h2>
          <p className="mt-2 text-gray-600">Register as a provider admin</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow">
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {apiError}
            </div>
          )}

          <div className="space-y-4">
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
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

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
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirm_password">Confirm Password *</Label>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleChange}
                className={`mt-1 ${errors.confirm_password ? 'border-red-500' : ''}`}
                disabled={loading}
              />
              {errors.confirm_password && (
                <p className="mt-1 text-sm text-red-600">{errors.confirm_password}</p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
      </div>
    </div>
  )
}