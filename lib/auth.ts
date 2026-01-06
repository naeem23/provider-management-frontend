const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Helper to set cookie properly
const setCookie = (name: string, value: string, days: number = 1) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

// Helper to delete cookie
const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token')
    
    if (!refreshToken) {
      return null
    }

    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refreshToken
      })
    })

    if (response.ok) {
      const data = await response.json()
      // Store new access token
      localStorage.setItem('access_token', data.access)
      setCookie('access_token', data.access, 1)
      return data.access
    } else {
      // Refresh token is invalid or expired
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      deleteCookie('access_token')
      return null
    }
  } catch (error) {
    console.error('Token refresh failed:', error)
    return null
  }
}

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  let token = localStorage.getItem('access_token')

  // First attempt with existing token
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })

  // If 401 (Unauthorized), try refreshing token
  if (response.status === 401) {
    const newToken = await refreshAccessToken()
    
    if (!newToken) {
      // Refresh failed, redirect to login
      window.location.href = '/auth/login'
      throw new Error('Authentication failed')
    }

    // Retry request with new token
    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${newToken}`,
        'Content-Type': 'application/json',
      }
    })
  }

  return response
}

export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user')
  document.cookie = 'access_token=; path=/; max-age=0'
  window.location.href = '/auth/login'
}