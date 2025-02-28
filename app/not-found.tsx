import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">页面未找到</p>
      <Button asChild>
        <Link href="/" className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          返回主页
        </Link>
      </Button>
    </div>
  )
}

