"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { useToast } from "@/components/ui/use-toast"
import { serverConfig } from "@/lib/config"
import { Bot, Send, X } from "lucide-react"
import { useMediaQuery } from "@/lib/hooks"

// 消息类型定义
type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AiAssistant() {
  // 状态管理
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "你好！我是你的我的世界枪战服务器助手。有什么可以帮到你的吗？",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const inputRef = useRef<HTMLInputElement>(null)

  // 滚动到消息底部
  useEffect(() => {
    if (messagesEndRef.current && open) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [open])

  // 处理发送消息
  const handleSendMessage = async () => {
    if (!input.trim()) return

    // 添加用户消息
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // 在实际实现中，你会调用AI API
      // 这里使用模拟响应
      setTimeout(() => {
        const assistantMessage: Message = {
          role: "assistant",
          content: getSimulatedResponse(input),
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)

        // 聊天完成后，重新聚焦输入框
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 1000)
    } catch (error) {
      console.error("发送消息时出错:", error)
      toast({
        title: "发送消息失败",
        description: "请稍后再试",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // 模拟AI响应
  const getSimulatedResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("服务器ip") || input.includes("地址")) {
      return `我们的服务器IP是 ${serverConfig.serverIp}，支持的Minecraft版本是 ${serverConfig.minecraftVersion}。`
    } else if (input.includes("枪") || input.includes("武器")) {
      return "我们的服务器拥有超过50种精心设计的枪械，从手枪到狙击枪，每一把都有独特的手感和特性。你可以通过游戏内商店购买武器和配件。"
    } else if (input.includes("模式") || input.includes("玩法")) {
      return "我们提供多种游戏模式，包括团队死斗、占点模式、爆破模式和生存模式。每种模式都有其独特的游戏规则和战术要求。"
    } else if (input.includes("地图")) {
      return "服务器目前有12张精心设计的地图，包括城市、荒漠、丛林和工厂等不同环境。每张地图都经过精心设计，提供平衡的游戏体验。"
    } else {
      return "感谢你的提问！如果你想了解更多关于我们服务器的信息，可以询问关于武器系统、游戏模式、地图或者如何加入服务器等问题。"
    }
  }

  // 渲染消息
  const renderMessages = () => {
    return messages.map((message, index) => (
      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
        <div
          className={`max-w-[80%] rounded-lg p-3 ${
            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          <p className="text-sm">{message.content}</p>
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    ))
  }

  // 助手按钮组件
  const AssistantButton = () => (
    <motion.div
      className="fixed bottom-4 right-4 z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button
        size="lg"
        className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
        onClick={() => setOpen(true)}
      >
        <Bot className="w-6 h-6" />
      </Button>
    </motion.div>
  )

  // 助手内容组件
  const AssistantContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <h3 className="font-medium">服务器助手</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {renderMessages()}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            ref={inputRef}
            placeholder="输入你的问题..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
            onFocus={(e) => e.target.select()}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )

  // 根据设备类型渲染不同的UI
  if (isDesktop) {
    return (
      <>
        <AssistantButton />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>服务器助手</DialogTitle>
              <DialogDescription>有任何问题都可以向我咨询</DialogDescription>
            </DialogHeader>
            <div className="h-[400px]">
              <AssistantContent />
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <>
      <AssistantButton />
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>服务器助手</DrawerTitle>
            <DrawerDescription>有任何问题都可以向我咨询</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 h-[calc(85vh-80px)]">
            <AssistantContent />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

