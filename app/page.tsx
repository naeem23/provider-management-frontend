'use client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        Provider Management Tool
      </h1>
      <Button onClick={() => router.push('/auth/login')} className="cursor-pointer">Get Started</Button>
    </main>
  );
}
