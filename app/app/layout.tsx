import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { headers } from "next/headers"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "我的世界枪战服务器 | GunWar MC",
  description: "最佳的我的世界枪战体验，加入我们的服务器，体验刺激的枪战玩法！",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 检查当前路径是否为404页面
  const headersList = headers()
  const pathname = headersList.get("x-pathname") || ""
  const isNotFoundPage = pathname === "/not-found"

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            {!isNotFoundPage && <Navbar />}
            <div className="flex-1">{children}</div>
            {!isNotFoundPage && <Footer />}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'