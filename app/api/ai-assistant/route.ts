import { NextResponse } from "next/server"
import { serverConfig } from "@/lib/config"

// 这里可以导入你选择的AI SDK
// import { OpenAI } from "openai"
// import { Anthropic } from "@anthropic-ai/sdk"
// import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: Request) {
  try {
    const { messages, apiKey } = await request.json()

    // 验证请求
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request: messages array is required" }, { status: 400 })
    }

    // 如果没有提供API密钥，使用模拟响应
    if (!apiKey) {
      return simulatedResponse(messages)
    }

    // 在实际实现中，你会在这里调用AI API
    // 例如使用OpenAI:
    /*
    const openai = new OpenAI({ apiKey })
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: serverConfig.aiAssistant.systemPrompt },
        ...messages
      ],
    })
    
    return NextResponse.json({
      content: response.choices[0].message.content,
    })
    */

    // 由于这是一个演示，我们使用模拟响应
    return simulatedResponse(messages)
  } catch (error) {
    console.error("Error in AI assistant API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// 模拟AI响应的函数
async function simulatedResponse(messages: any[]) {
  // 获取用户的最后一条消息
  const lastUserMessage =
    messages
      .slice()
      .reverse()
      .find((msg) => msg.role === "user")?.content || ""

  // 根据用户消息内容生成模拟响应
  let responseContent = ""

  const input = lastUserMessage.toLowerCase()

  if (input.includes("服务器ip") || input.includes("地址")) {
    responseContent = `我们的服务器IP是 ${serverConfig.serverIp}，支持的Minecraft版本是 ${serverConfig.minecraftVersion}。`
  } else if (input.includes("枪") || input.includes("武器")) {
    responseContent =
      "我们的服务器拥有超过50种精心设计的枪械，从手枪到狙击枪，每一把都有独特的手感和特性。你可以通过游戏内商店购买武器和配件。"
  } else if (input.includes("模式") || input.includes("玩法")) {
    responseContent =
      "我们提供多种游戏模式，包括团队死斗、占点模式、爆破模式和生存模式。每种模式都有其独特的游戏规则和战术要求。"
  } else if (input.includes("地图")) {
    responseContent =
      "服务器目前有12张精心设计的地图，包括城市、荒漠、丛林和工厂等不同环境。每张地图都经过精心设计，提供平衡的游戏体验。"
  } else {
    responseContent =
      "感谢你的提问！如果你想了解更多关于我们服务器的信息，可以询问关于武器系统、游戏模式、地图或者如何加入服务器等问题。"
  }

  // 模拟API延迟
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    content: responseContent,
  })
}

