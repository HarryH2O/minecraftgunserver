"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { serverConfig } from "@/lib/config"
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Announcements() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const announcements = serverConfig.announcements

  const nextAnnouncement = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length)
  }, [announcements.length])

  const prevAnnouncement = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)
  }, [announcements.length])

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(nextAnnouncement, 5000)
    return () => clearInterval(timer)
  }, [nextAnnouncement])

  return (
    <section className="w-full py-8">
      <div className="container px-4 md:px-6">
        <Card className="relative overflow-hidden border-none bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Volume2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">服务器公告</h2>
            </div>

            <div className="relative h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <h3 className="text-lg font-semibold mb-2">{announcements[currentIndex].title}</h3>
                  <p className="text-muted-foreground">{announcements[currentIndex].content}</p>
                  <p className="text-sm text-muted-foreground mt-2">{announcements[currentIndex].date}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-1">
                {announcements.map((_, index) => (
                  <motion.div
                    key={index}
                    className={cn("w-2 h-2 rounded-full", index === currentIndex ? "bg-primary" : "bg-primary/20")}
                    animate={{
                      scale: index === currentIndex ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={prevAnnouncement} className="hover:bg-primary/10">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={nextAnnouncement} className="hover:bg-primary/10">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

