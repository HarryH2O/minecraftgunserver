"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { serverConfig } from "@/lib/config"
import { useAnimate } from "@/lib/animation"
import Image from "next/image"

export default function JoinCommunity() {
  const { fadeIn, slideUp } = useAnimate()

  // 社交链接数组，只包含B站和QQ群
  const socialLinks = [
    {
      name: "哔哩哔哩",
      icon: serverConfig.socialIcons.bilibili.icon || "/placeholder.svg?height=40&width=40",
      url: serverConfig.socialLinks.bilibili,
      color: serverConfig.socialIcons.bilibili.color,
      description: "关注我们的B站账号获取最新视频和教程",
    },
    {
      name: "QQ群",
      icon: serverConfig.socialIcons.qqGroup.icon || "/placeholder.svg?height=40&width=40",
      url: serverConfig.socialLinks.qqGroup,
      color: serverConfig.socialIcons.qqGroup.color,
      description: `加入我们的QQ群 ${serverConfig.socialLinks.qqGroupNumber} 与其他玩家交流`,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24" id="community">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.div className="space-y-2" variants={slideUp} custom={0}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">加入我们的社区</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              与数千名玩家一起交流，分享游戏经验，参与社区活动
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-3xl gap-6 py-12 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          {socialLinks.map((link, index) => (
            <motion.div key={link.name} variants={slideUp} custom={index + 1}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md border border-border/50">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                    <div
                      className={`w-16 h-16 rounded-full ${link.color} flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110`}
                    >
                      {link.icon.endsWith(".svg") ? (
                        <Image
                          src={link.icon || "/placeholder.svg"}
                          alt={link.name}
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      ) : (
                        <img src={link.icon || "/placeholder.svg"} alt={link.name} className="w-6 h-6" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold">{link.name}</h3>
                    <p className="text-muted-foreground mt-2 text-center">{link.description}</p>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 md:p-10">
              <motion.h3 className="text-2xl font-bold mb-4" variants={slideUp} custom={0}>
                准备好加入战斗了吗？
              </motion.h3>
              <motion.p className="text-muted-foreground mb-6" variants={slideUp} custom={1}>
                现在就加入我们的服务器，体验最刺激的我的世界枪战玩法！
              </motion.p>
              <motion.div variants={slideUp} custom={2}>
                <Button size="lg" asChild>
                  <a href={`minecraft://${serverConfig.serverIp}`}>立即加入服务器</a>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

