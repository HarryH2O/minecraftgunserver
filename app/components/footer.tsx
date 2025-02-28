"use client"
import Link from "next/link"
import { serverConfig } from "@/lib/config"
import { PenIcon as Gun } from "lucide-react"

export default function Footer() {
  // 从配置文件中获取页脚链接
  const footerLinks = serverConfig.footerLinks || [
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
        { name: "哔哩哔哩", href: serverConfig.socialLinks.bilibili },
        { name: "QQ群", href: serverConfig.socialLinks.qqGroup },
      ],
    },
  ]

  return (
    <footer className="w-full py-6 md:py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Gun className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">{serverConfig.serverName}</span>
            </Link>
            <p className="text-sm text-muted-foreground">{serverConfig.serverDescription}</p>
            <div className="text-sm">
              <p>服务器IP: {serverConfig.serverIp}</p>
              <p>版本: {serverConfig.minecraftVersion}</p>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-lg font-medium">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {serverConfig.serverName}. 保留所有权利。
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              隐私政策
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              服务条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

