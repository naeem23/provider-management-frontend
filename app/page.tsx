import { Button } from "@/components/ui/button";


export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        Provider Management Tool
      </h1>
      <Button>Get Started</Button>
    </main>
  );
}
