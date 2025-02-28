"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { serverConfig } from "@/lib/config"
import { MapIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ServerMap() {
  const [currentMap, setCurrentMap] = useState(0)
  const maps = serverConfig.maps

  const nextMap = () => {
    setCurrentMap((prev) => (prev + 1) % maps.length)
  }

  const prevMap = () => {
    setCurrentMap((prev) => (prev - 1 + maps.length) % maps.length)
  }

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">服务器地图</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              探索我们精心设计的战斗地图，每张地图都有其独特的战术机会
            </p>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMap}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <img
                src={maps[currentMap].image || "/placeholder.svg?height=720&width=1280"}
                alt={maps[currentMap].name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{maps[currentMap].name}</h3>
                <p className="text-gray-200 max-w-2xl">{maps[currentMap].description}</p>
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <MapIcon className="w-4 h-4" />
                    <span>{maps[currentMap].type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>推荐人数:</span>
                    <span>{maps[currentMap].players}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
            onClick={prevMap}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
            onClick={nextMap}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="flex justify-center gap-2 mt-4">
            {maps.map((_, index) => (
              <motion.button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentMap ? "bg-primary" : "bg-primary/20",
                )}
                onClick={() => setCurrentMap(index)}
                whileHover={{ scale: 1.2 }}
                animate={{
                  scale: index === currentMap ? 1.2 : 1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

