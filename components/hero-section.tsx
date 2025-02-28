"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { serverConfig } from "@/lib/config"
import { useAnimate } from "@/lib/animation"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { fadeIn, slideUp } = useAnimate()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video or Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" style={{ backdropFilter: "blur(2px)" }} />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster={serverConfig.heroPosterImage}
        >
          <source src={serverConfig.heroBackgroundVideo} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white"
                variants={slideUp}
                custom={0}
              >
                {serverConfig.heroTitle}
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl text-gray-300"
                variants={slideUp}
                custom={1}
              >
                {serverConfig.heroSubtitle}
              </motion.p>
            </div>
            <motion.div className="flex flex-col gap-2 min-[400px]:flex-row" variants={slideUp} custom={2}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href={serverConfig.serverIp}>立即加入服务器</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/20 bg-background/20 backdrop-blur-sm text-white hover:bg-background/30"
                asChild
              >
                <a href="#features">了解更多</a>
              </Button>
            </motion.div>
            <motion.div className="pt-4 text-sm text-gray-400" variants={slideUp} custom={3}>
              <p>服务器IP: {serverConfig.serverIp}</p>
              <p>版本: {serverConfig.minecraftVersion}</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl border border-primary/20 backdrop-blur-sm bg-background/10">
              <img
                src={serverConfig.heroSideImage || "/placeholder.svg"}
                alt="服务器截图"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-sm mb-2">向下滚动</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

