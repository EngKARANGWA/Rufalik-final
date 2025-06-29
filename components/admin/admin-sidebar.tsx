"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  FileText,
  Users,
  HelpCircle,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  BarChart3,
  Plus,
  Eye,
  Edit,
} from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Amakuru",
    href: "/admin/news",
    icon: FileText,
    submenu: [
      { title: "Byose", href: "/admin/news", icon: Eye },
      { title: "Ongeraho", href: "/admin/news/add", icon: Plus },
      { title: "Kuyobora", href: "/admin/news/manage", icon: Edit },
    ],
  },
  {
    title: "Abaturage",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Ubufasha",
    href: "/admin/help-requests",
    icon: HelpCircle,
  },
  {
    title: "Ibitekerezo",
    href: "/admin/feedback",
    icon: MessageSquare,
  },
  {
    title: "Imibare",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Igenamiterere",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <div
      className={`bg-card border-r transition-all duration-300 ${collapsed ? "w-16" : "w-64"} flex flex-col h-screen`}
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Image
                src="/images/rugalika-logo.png"
                alt="Rugalika Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm">Rugalika Admin</span>
                <span className="text-xs text-muted-foreground">Kuyobora Sisitemu</span>
              </div>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">{user?.username.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.username}</p>
              <p className="text-xs text-muted-foreground">Umuyobozi</p>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Bell className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.title}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={`w-full justify-start ${collapsed ? "px-2" : "px-3"}`}
                onClick={() => {
                  if (item.submenu) {
                    toggleExpanded(item.title)
                  } else {
                    router.push(item.href)
                  }
                }}
              >
                <item.icon className={`h-4 w-4 ${collapsed ? "" : "mr-2"}`} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.submenu && (
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          expandedItems.includes(item.title) ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </>
                )}
              </Button>

              {/* Submenu */}
              {item.submenu && !collapsed && expandedItems.includes(item.title) && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Button
                      key={subItem.href}
                      variant={pathname === subItem.href ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => router.push(subItem.href)}
                    >
                      <subItem.icon className="h-3 w-3 mr-2" />
                      {subItem.title}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t">
        <Button
          variant="ghost"
          className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 ${collapsed ? "px-2" : "px-3"}`}
          onClick={handleLogout}
        >
          <LogOut className={`h-4 w-4 ${collapsed ? "" : "mr-2"}`} />
          {!collapsed && "Gusohoka"}
        </Button>
      </div>
    </div>
  )
}
