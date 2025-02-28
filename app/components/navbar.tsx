"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { PenIcon as Gun, Menu, X } from "lucide-react"
import { serverConfig } from "@/lib/config"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }}>
            <Gun className="h-6 w-6 text-primary" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold"
          >
            {serverConfig.serverName}
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>首页</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>服务器信息</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  {serverConfig.serverFeatures.map((feature, index) => (
                    <li key={index}>
                      <NavigationMenuLink asChild>
                        <a
                          href={feature.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{feature.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {feature.description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/download" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>下载</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/rules" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>规则</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="default" size="sm" className="hidden md:inline-flex" asChild>
            <Link href={serverConfig.discordInviteLink}>加入Discord</Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background/95 backdrop-blur-md"
        >
          <div className="container py-4 space-y-4">
            <Link
              href="/"
              className="block px-4 py-2 hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              首页
            </Link>
            <Link
              href="/features"
              className="block px-4 py-2 hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              服务器特性
            </Link>
            <Link
              href="/download"
              className="block px-4 py-2 hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              下载
            </Link>
            <Link
              href="/rules"
              className="block px-4 py-2 hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              规则
            </Link>
            <Button variant="default" size="sm" className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link href={serverConfig.discordInviteLink}>加入Discord</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

