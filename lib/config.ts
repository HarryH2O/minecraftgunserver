/**
 * 服务器配置文件
 *
 * 这个文件包含了网站上显示的所有可配置信息
 * 修改这个文件来更新网站上的内容
 */

export const serverConfig = {
  // 服务器基本信息
  serverName: "GunWar MC", // 服务器名称
  serverDescription: "最佳的我的世界枪战体验，加入我们的服务器，体验刺激的枪战玩法！", // 服务器描述
  serverIp: "play.gunwar-mc.com", // 服务器IP地址
  minecraftVersion: "1.19.2", // 支持的Minecraft版本

  // 英雄区域内容
  heroTitle: "最真实的我的世界枪战体验", // 英雄区标题
  heroSubtitle:
    "加入我们的服务器，体验超过50种精心设计的枪械，多种游戏模式和精美地图，与全球玩家一起享受刺激的枪战乐趣！", // 英雄区副标题
  heroBackgroundVideo: "/videos/hero-background.mp4", // 英雄区背景视频
  heroPosterImage: "/placeholder.svg?height=1080&width=1920", // 英雄区背景图片（视频加载前显示）
  heroSideImage: "/placeholder.svg?height=600&width=600", // 英雄区侧边图片

  // 服务器公告
  announcements: [
    {
      title: "新版本更新公告", // 公告标题
      content: "我们很高兴地宣布，服务器已更新至最新版本！新增5把全新武器和2张全新地图，修复了已知bug。", // 公告内容
      date: "2024-02-28", // 公告日期
      type: "update", // 公告类型：update-更新, event-活动, notice-通知, maintenance-维护
    },
    {
      title: "春节活动开启",
      content: "春节活动现已开启！参与活动可获得限定武器皮肤和角色装扮，还有更多精美奖励等你来拿！",
      date: "2024-02-10",
      type: "event",
    },
    {
      title: "服务器维护通知",
      content: "服务器将于本周日凌晨2点-4点进行例行维护，期间服务器将暂时关闭。给您带来的不便敬请谅解。",
      date: "2024-02-25",
      type: "maintenance",
    },
  ],

  // 服务器特性
  serverFeatures: [
    {
      title: "武器系统",
      description: "超过50种精心设计的枪械，从手枪到狙击枪，每一把都有独特的手感和特性",
      href: "#features",
    },
    {
      title: "游戏模式",
      description: "多种刺激的游戏模式，满足不同玩家的需求，从团队死斗到占点模式应有尽有",
      href: "#features",
    },
    {
      title: "精美地图",
      description: "精心设计的战斗地图，从城市街道到荒漠基地，每张地图都有独特的战术机会",
      href: "#features",
    },
    {
      title: "排名系统",
      description: "完善的排名系统，记录你的战绩和进步，与全服玩家一较高下",
      href: "#features",
    },
  ],

  // 特性图片
  featureImages: {
    weapons: "/placeholder.svg?height=600&width=800", // 武器系统特性图片
    modes: "/placeholder.svg?height=600&width=800", // 游戏模式特性图片
    maps: "/placeholder.svg?height=600&width=800", // 地图特性图片
    ranks: "/placeholder.svg?height=600&width=800", // 排名系统特性图片
  },

  // 服务器地图
  maps: [
    {
      name: "废弃工厂", // 地图名称
      description: "这是一个废弃的工业区，密集的建筑群和复杂的地形为近距离作战提供了绝佳环境。", // 地图描述
      type: "中距离作战", // 地图类型
      players: "5v5", // 推荐人数
      image: "/placeholder.svg?height=720&width=1280", // 地图预览图
      features: ["多层建筑", "复杂地形", "适合突袭"], // 地图特点
    },
    {
      name: "沙漠前哨",
      description: "广阔的沙漠地形和稀疏的掩体，适合狙击手和长距离交火。注意随时可能出现的沙尘暴！",
      type: "长距离作战",
      players: "6v6",
      image: "/placeholder.svg?height=720&width=1280",
      features: ["开阔地形", "天气效果", "制高点"],
    },
    {
      name: "丛林遗迹",
      description: "被热带丛林包围的古代遗迹，茂密的植被提供了绝佳的隐蔽机会，适合伏击战术。",
      type: "近距离作战",
      players: "4v4",
      image: "/placeholder.svg?height=720&width=1280",
      features: ["密集植被", "地下通道", "遗迹建筑"],
    },
  ],

  // 社交链接
  socialLinks: {
    bilibili: "https://space.bilibili.com/你的ID", // B站链接
    qqGroup: "https://qm.qq.com/你的QQ群加群链接", // QQ群链接
    qqGroupNumber: "123456789", // QQ群号
  },

  // 社区图标和颜色
  socialIcons: {
    bilibili: {
      icon: "/icons/bilibili.svg", // B站图标
      color: "bg-[#00AEEC] hover:bg-[#00a0d8]", // B站主题色
    },
    qqGroup: {
      icon: "/icons/qq.svg", // QQ图标
      color: "bg-[#12B7F5] hover:bg-[#0ca4db]", // QQ主题色
    },
  },

  // AI助手设置
  aiAssistant: {
    systemPrompt:
      "你是一个我的世界枪战服务器的助手，你了解服务器的所有信息，包括武器系统、游戏模式、地图和服务器规则等。你的任务是帮助玩家解答问题，提供游戏指导，并确保他们有最佳的游戏体验。", // AI助手系统提示词
    apiKey: "your-api-key-here", // API密钥（仅在服务器端使用）
  },

  // 页脚链接
  footerLinks: [
    {
      title: "服务器",
      links: [
        { name: "关于我们", href: "/about" },
        { name: "服务器规则", href: "/rules" },
        { name: "常见问题", href: "/faq" },
        { name: "联系我们", href: "/contact" },
      ],
    },
    {
      title: "资源",
      links: [
        { name: "下载客户端", href: "/download" },
        { name: "服务器状态", href: "/#status" },
        { name: "更新日志", href: "/changelog" },
        { name: "Wiki", href: "/wiki" },
      ],
    },
    {
      title: "社区",
      links: [
        { name: "哔哩哔哩", href: "社交链接.bilibili" },
        { name: "QQ群", href: "社交链接.qqGroup" },
      ],
    },
  ],

  // 自定义颜色主题
  theme: {
    primary: "#3B82F6", // 主色调
    secondary: "#10B981", // 次要色调
    accent: "#8B5CF6", // 强调色
    background: "#FFFFFF", // 背景色
    darkBackground: "#1F2937", // 暗色模式背景色
  },
}

