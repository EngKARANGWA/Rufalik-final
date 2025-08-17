"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bell,
  Search,
  Settings,
  LogOut,
  Menu,
  User,
} from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminHeaderProps {
  onToggleSidebar?: () => void
  sidebarCollapsed?: boolean
}

export function AdminHeader({ onToggleSidebar, sidebarCollapsed }: AdminHeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        {/* Menu button - always visible */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="flex hover:bg-gray-100"
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </Button>
        
        {/* Logo and title - only show when sidebar is collapsed on desktop */}
        {sidebarCollapsed && (
          <div className="hidden md:flex items-center space-x-2">
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

        {/* Search bar */}
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-3">
              <div className="h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.username?.charAt(0) || 'A'}
                </span>
              </div>
                             <div className="hidden lg:block text-left">
                 <p className="text-sm font-medium">{user?.username || 'Admin'}</p>
                 <p className="text-xs text-muted-foreground">Umuyobozi</p>
               </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Umwirondoro
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Igenamiterere
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Gusohoka
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
