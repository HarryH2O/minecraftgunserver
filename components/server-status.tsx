"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { serverConfig } from "@/lib/config"
import { useAnimate } from "@/lib/animation"
import { Users, Clock } from "lucide-react"

export default function ServerStatus() {
  const [status, setStatus] = useState({
    online: false,
    players: 0,
    maxPlayers: 100,
    uptime: "0天",
    lastUpdated: new Date(),
  })
  const { fadeIn, slideUp } = useAnimate()
  const [isInView, setIsInView] = useState(false)

  // Simulate fetching server status
  useEffect(() => {
    // In a real implementation, you would fetch the actual server status
    // For demo purposes, we'll just set some dummy data
    const timer = setTimeout(() => {
      setStatus({
        online: true,
        players: 42,
        maxPlayers: 100,
        uptime: "7天",
        lastUpdated: new Date(),
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="w-full py-12 md:py-24" id="status">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          onViewportEnter={() => setIsInView(true)}
        >
          <motion.div className="space-y-2" variants={slideUp} custom={0}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">服务器状态</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              实时监控我们的服务器状态，随时了解在线人数和服务器健康状况
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.div variants={slideUp} custom={1}>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-4 h-4 rounded-full ${status.online ? "bg-green-500" : "bg-red-500"} mb-2`} />
                  <h3 className="text-xl font-bold">服务器状态</h3>
                  <p className="text-3xl font-bold text-primary">{status.online ? "在线" : "离线"}</p>
                  <p className="text-sm text-muted-foreground">IP: {serverConfig.serverIp}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={slideUp} custom={2}>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-2">
                  <Users className="w-8 h-8 mb-2 text-primary" />
                  <h3 className="text-xl font-bold">在线玩家</h3>
                  <p className="text-3xl font-bold text-primary">
                    {status.players}/{status.maxPlayers}
                  </p>
                  <Progress value={(status.players / status.maxPlayers) * 100} className="w-full mt-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={slideUp} custom={3}>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-2">
                  <Clock className="w-8 h-8 mb-2 text-primary" />
                  <h3 className="text-xl font-bold">运行时间</h3>
                  <p className="text-3xl font-bold text-primary">{status.uptime}</p>
                  <p className="text-sm text-muted-foreground">
                    最后更新:{" "}
                    {status.lastUpdated.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

