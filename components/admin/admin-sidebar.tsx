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
import {
  Select,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

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
      { title: "Ongeraho", href: "/admin/news?add=1", icon: Plus },
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

interface AdminSidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function AdminSidebar({ collapsed = false, onToggleCollapse, isMobileOpen = false, onMobileClose }: AdminSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    // Close mobile sidebar after navigation
    if (onMobileClose) {
      onMobileClose()
    }
  }

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`
          bg-card border-r transition-all duration-300 flex flex-col h-screen z-50
          md:relative md:translate-x-0
          ${isMobileOpen ? 'fixed translate-x-0' : 'fixed -translate-x-full md:translate-x-0'}
          ${collapsed ? "md:w-16" : "md:w-64"}
          w-64
        `}
      >
      {/* Header with Logo */}
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
          {collapsed && (
            <div className="flex justify-center w-full">
              <Image
                src="/images/rugalika-logo.png"
                alt="Rugalika Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          )}
          {/* Mobile close button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMobileClose}
            className="h-8 w-8 md:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {/* Desktop toggle button */}
          {onToggleCollapse && (
            <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="h-8 w-8 ml-auto hidden md:flex">
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.title}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={`w-full justify-start h-10 ${collapsed ? "px-2" : "px-3"} mb-1`}
                onClick={() => {
                  if (item.submenu) {
                    toggleExpanded(item.title)
                  } else {
                    handleNavigation(item.href)
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
                <div className="ml-8 mt-1 space-y-1 pb-2">
                  {item.submenu.map((subItem) => (
                    <Button
                      key={subItem.href}
                      variant={pathname === subItem.href ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start h-8 text-sm"
                      onClick={() => handleNavigation(subItem.href)}
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

      {/* User Info & Footer */}
      <div className="p-4 border-t bg-muted/30">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center">
            <span className="text-white text-sm font-medium">{user?.username?.charAt(0) || 'N'}</span>
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.username || 'Admin'}</p>
              <p className="text-xs text-muted-foreground">Umuyobozi</p>
            </div>
          )}
        </div>
        
        {/* Logout Button */}
        <Button
          variant="ghost"
          className={`w-full justify-start h-10 text-red-600 hover:text-red-700 hover:bg-red-50 ${collapsed ? "px-2" : "px-3"}`}
          onClick={handleLogout}
        >
          <LogOut className={`h-4 w-4 ${collapsed ? "" : "mr-2"}`} />
          {!collapsed && "Gusohoka"}
        </Button>
      </div>
      </div>
    </>
  )
}
