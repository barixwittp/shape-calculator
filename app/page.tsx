import ShapeCalculator from "@/components/shape-calculator"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="shape-calculator-theme">
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Advanced Shape Calculator</h1>
        <ShapeCalculator />
      </main>
    </ThemeProvider>
  )
}

