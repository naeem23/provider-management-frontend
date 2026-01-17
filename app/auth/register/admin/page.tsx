import { Suspense } from 'react'
import RegistrationForm from '@/components/admin/registration-form'

export default function RegistrationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationForm />
    </Suspense>
  )
}