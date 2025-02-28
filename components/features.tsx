"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { serverConfig } from "@/lib/config"
import { useAnimate } from "@/lib/animation"
import { PenIcon as Gun, Swords, Map, Crosshair, Trophy } from "lucide-react"

export default function Features() {
  const { fadeIn, slideUp } = useAnimate()
  const [activeTab, setActiveTab] = useState("weapons")

  const features = [
    {
      id: "weapons",
      title: "武器系统",
      icon: <Gun className="w-10 h-10 text-primary" />,
      description: "超过50种精心设计的枪械，从手枪到狙击枪，每一把都有独特的手感和特性。",
      items: ["逼真的后坐力和弹道系统", "可自定义的武器配件", "独特的武器皮肤系统", "平衡的武器伤害设计"],
      image: serverConfig.featureImages.weapons,
    },
    {
      id: "modes",
      title: "游戏模式",
      icon: <Swords className="w-10 h-10 text-primary" />,
      description: "多种刺激的游戏模式，满足不同玩家的需求，从团队死斗到占点模式应有尽有。",
      items: [
        "团队死斗 - 经典的团队对抗",
        "占点模式 - 战略性的区域控制",
        "爆破模式 - 一方攻击，一方防守",
        "生存模式 - 最后一人存活获胜",
      ],
      image: serverConfig.featureImages.modes,
    },
    {
      id: "maps",
      title: "精美地图",
      icon: <Map className="w-10 h-10 text-primary" />,
      description: "精心设计的战斗地图，从城市街道到荒漠基地，每张地图都有独特的战术机会。",
      items: [
        "城市 - 密集的建筑和狭窄的街道",
        "荒漠 - 开阔的视野和长距离交火",
        "丛林 - 茂密的植被提供绝佳掩护",
        "工厂 - 复杂的室内结构和多层次战斗",
      ],
      image: serverConfig.featureImages.maps,
    },
    {
      id: "ranks",
      title: "排名系统",
      icon: <Trophy className="w-10 h-10 text-primary" />,
      description: "完善的排名系统，记录你的战绩和进步，与全服玩家一较高下。",
      items: ["详细的个人数据统计", "季度排名赛和奖励", "技能匹配系统", "公平的排名算法"],
      image: serverConfig.featureImages.ranks,
    },
  ]

  const currentFeature = features.find((f) => f.id === activeTab) || features[0]

  return (
    <section className="w-full py-12 md:py-24 bg-muted/50" id="features">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.div className="space-y-2" variants={slideUp} custom={0}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">服务器特性</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              我们的服务器拥有最先进的枪战系统和丰富的游戏内容
            </p>
          </motion.div>
        </motion.div>

        <div className="mx-auto max-w-5xl py-12">
          <Tabs defaultValue="weapons" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              {features.map((feature) => (
                <TabsTrigger key={feature.id} value={feature.id} className="flex items-center gap-2">
                  {feature.icon}
                  <span className="hidden md:inline">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value={activeTab} className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          {currentFeature.icon}
                          <h3 className="text-2xl font-bold">{currentFeature.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{currentFeature.description}</p>
                        <ul className="space-y-2">
                          {currentFeature.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Crosshair className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <img
                          src={currentFeature.image || "/placeholder.svg"}
                          alt={currentFeature.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

