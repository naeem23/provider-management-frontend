// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuthStore } from '@/store/authStore'

// export const useAuth = (requiredRoles?: string[]) => {
//   const router = useRouter()
//   const { isAuthenticated, user } = useAuthStore()

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/login')
//       return
//     }

//     if (requiredRoles && user && !requiredRoles.includes(user.role)) {
//       router.push('/unauthorized')
//     }
//   }, [isAuthenticated, user, requiredRoles, router])

//   return { isAuthenticated, user }
// }