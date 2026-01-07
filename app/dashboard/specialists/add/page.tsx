'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { fetchWithAuth } from '@/lib/auth'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  roleName: string
  experienceLevel: string
  skills: string
  certifications: string
  specialization: string
  avgDailyRate: string
  status: string
  availableFromDate: string
  availableUntilDate: string
  maxWeeklyHours: string
  location: string
  workMode: string
  languagesSpoken: string
  notes: string
}

interface FormErrors {
  [key: string]: string
}

export default function CreateSpecialistPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    roleName: '',
    experienceLevel: '',
    skills: '',
    certifications: '',
    specialization: '',
    avgDailyRate: '',
    status: 'Active',
    availableFromDate: '',
    availableUntilDate: '',
    maxWeeklyHours: '40',
    location: '',
    workMode: 'Remote',
    languagesSpoken: '',
    notes: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    // Required fields validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
      isValid = false
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
      isValid = false
    }

    if (!formData.roleName.trim()) {
      newErrors.roleName = 'Role name is required'
      isValid = false
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Experience level is required'
      isValid = false
    }

    if (!formData.skills.trim()) {
      newErrors.skills = 'Skills are required'
      isValid = false
    }

    if (!formData.avgDailyRate) {
      newErrors.avgDailyRate = 'Average daily rate is required'
      isValid = false
    } else if (parseFloat(formData.avgDailyRate) < 0) {
      newErrors.avgDailyRate = 'Rate must be a positive number'
      isValid = false
    }

    if (!formData.availableFromDate) {
      newErrors.availableFromDate = 'Available from date is required'
      isValid = false
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
      isValid = false
    }

    if (!formData.languagesSpoken.trim()) {
      newErrors.languagesSpoken = 'Languages spoken is required'
      isValid = false
    }

    if (!formData.status) {
      newErrors.status = 'Status is required'
      isValid = false
    }

    if (formData.maxWeeklyHours) {
      const hours = parseInt(formData.maxWeeklyHours)
      if (hours < 1 || hours > 168) {
        newErrors.maxWeeklyHours = 'Must be between 1 and 168'
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
    setApiError('')
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
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
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phoneNumber || null,
        role_name: formData.roleName,
        experience_level: formData.experienceLevel,
        skills: formData.skills,
        certifications: formData.certifications || null,
        specialization: formData.specialization || null,
        avg_daily_rate: parseFloat(formData.avgDailyRate),
        available_from: formData.availableFromDate,
        available_until: formData.availableUntilDate || null,
        max_weekly_hours: parseInt(formData.maxWeeklyHours),
        location: formData.location,
        work_mode: formData.workMode,
        languages_spoken: formData.languagesSpoken,
        status: formData.status,
        notes: formData.notes || null,
      }

      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/specialists/specialists/`, 
        {
            method: 'POST',
            body: JSON.stringify(payload),
        }
      )

      if (response.ok) {
        setSuccessMessage('Specialist created successfully!')
        setTimeout(() => {
          router.push('/dashboard/specialists')
        }, 500)
      } else {
        const errorData = await response.json()
        setApiError(errorData.detail || errorData.message || 'Failed to create specialist')
      }
    } catch (error) {
      setApiError('Network error. Please check your connection and try again.')
      console.error('Create specialist error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
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
            onClick={() => router.push('/dashboard/specialists')}
            className="hover:text-gray-900 cursor-pointer"
          >
            Specialists
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">Create</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">Create Specialist</h1>
        <p className="text-gray-600 mt-2">Add a new specialist to your provider pool</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-8">
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

        {/* Personal Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
                disabled={loading}
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
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
                disabled={loading}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
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
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1"
                disabled={loading}
                placeholder="+1-555-0123"
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="roleName">Role Name *</Label>
              <Input
                id="roleName"
                name="roleName"
                value={formData.roleName}
                onChange={handleChange}
                className={`mt-1 ${errors.roleName ? 'border-red-500' : ''}`}
                disabled={loading}
                placeholder="e.g., Software Engineer"
              />
              {errors.roleName && (
                <p className="mt-1 text-sm text-red-600">{errors.roleName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="experienceLevel">Experience Level *</Label>
              <Select
                onValueChange={(value) => handleSelectChange('experienceLevel', value)}
                value={formData.experienceLevel}
                disabled={loading}
              >
                <SelectTrigger className={`mt-1 w-full ${errors.experienceLevel ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JUNIOR">Junior (0-2 years)</SelectItem>
                  <SelectItem value="MID">Mid-Level (3-5 years)</SelectItem>
                  <SelectItem value="SENIOR">Senior (6-10 years)</SelectItem>
                  <SelectItem value="LEAD">Lead (10+ years)</SelectItem>
                  <SelectItem value="EXPERT">Expert/Architect (15+ years)</SelectItem>
                </SelectContent>
              </Select>
              {errors.experienceLevel && (
                <p className="mt-1 text-sm text-red-600">{errors.experienceLevel}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="skills">Skills * (comma-separated)</Label>
              <Textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className={`mt-1 ${errors.skills ? 'border-red-500' : ''}`}
                disabled={loading}
                placeholder="Python, Django, React, AWS, Docker"
                rows={2}
              />
              {errors.skills && (
                <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="certifications">Certifications (comma-separated)</Label>
              <Textarea
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                className="mt-1"
                disabled={loading}
                placeholder="AWS Certified, PMP, Scrum Master"
                rows={2}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="mt-1"
                disabled={loading}
                placeholder="e.g., Full-stack Development"
              />
            </div>
          </div>
        </div>

        {/* Financial & Availability */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Financial & Availability</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="avgDailyRate">Average Daily Rate *</Label>
              <Input
                id="avgDailyRate"
                name="avgDailyRate"
                type="number"
                step="0.01"
                value={formData.avgDailyRate}
                onChange={handleChange}
                className={`mt-1 ${errors.avgDailyRate ? 'border-red-500' : ''}`}
                disabled={loading}
                placeholder="850.00"
              />
              {errors.avgDailyRate && (
                <p className="mt-1 text-sm text-red-600">{errors.avgDailyRate}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                onValueChange={(value) => handleSelectChange('status', value)}
                value={formData.status}
                disabled={loading}
              >
                <SelectTrigger className={`mt-1 w-full ${errors.status ? 'border-red-500' : ''}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="On_Leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
              )}
            </div>

            <div>
              <Label htmlFor="availableFromDate">Available From Date *</Label>
              <Input
                id="availableFromDate"
                name="availableFromDate"
                type="date"
                value={formData.availableFromDate}
                onChange={handleChange}
                className={`mt-1 ${errors.availableFromDate ? 'border-red-500' : ''}`}
                disabled={loading}
              />
              {errors.availableFromDate && (
                <p className="mt-1 text-sm text-red-600">{errors.availableFromDate}</p>
              )}
            </div>

            <div>
              <Label htmlFor="availableUntilDate">Available Until Date</Label>
              <Input
                id="availableUntilDate"
                name="availableUntilDate"
                type="date"
                value={formData.availableUntilDate}
                onChange={handleChange}
                className="mt-1"
                disabled={loading}
              />
              <small className='text-xs'>Leave blank if indefinite</small>
            </div>

            <div>
              <Label htmlFor="maxWeeklyHours">Max Weekly Hours</Label>
              <Input
                id="maxWeeklyHours"
                name="maxWeeklyHours"
                type="number"
                value={formData.maxWeeklyHours}
                onChange={handleChange}
                className={`mt-1 ${errors.maxWeeklyHours ? 'border-red-500' : ''}`}
                disabled={loading}
                min="1"
                max="168"
              />
              {errors.maxWeeklyHours && (
                <p className="mt-1 text-sm text-red-600">{errors.maxWeeklyHours}</p>
              )}
            </div>
          </div>
        </div>

        {/* Location & Work Preferences */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Location & Work Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location * (City, Country)</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`mt-1 ${errors.location ? 'border-red-500' : ''}`}
                disabled={loading}
                placeholder="New York, USA"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            <div>
              <Label htmlFor="workMode">Work Mode</Label>
              <Select
                onValueChange={(value) => handleSelectChange('workMode', value)}
                value={formData.workMode}
                disabled={loading}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="On-site">On-site</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="languagesSpoken">Languages Spoken * (comma-separated)</Label>
              <Input
                id="languagesSpoken"
                name="languagesSpoken"
                value={formData.languagesSpoken}
                onChange={handleChange}
                className={`mt-1 ${errors.languagesSpoken ? 'border-red-500' : ''}`}
                disabled={loading}
                placeholder="English, Spanish, French"
              />
              {errors.languagesSpoken && (
                <p className="mt-1 text-sm text-red-600">{errors.languagesSpoken}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="notes">Notes (Internal)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="mt-1"
                disabled={loading}
                placeholder="Internal notes about the specialist"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/specialists')}
            disabled={loading}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button type="submit" className="cursor-pointer" disabled={loading}>
            {loading ? 'Creating...' : 'Create Specialist'}
          </Button>
        </div>
      </form>
    </div>
  )
}