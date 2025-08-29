"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"
import { Home, GraduationCap, Briefcase, Heart } from "lucide-react"

export function NewsTabs() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    { value: "/", label: "Byose", icon: Home },
    { value: "/uburezi", label: "Uburezi", icon: GraduationCap },
    { value: "/ubukungu", label: "Ubukungu", icon: Briefcase },
    { value: "/ubuzima", label: "Ubuzima", icon: Heart },
  ]

  return (
    <div className="w-full bg-muted/30 py-4">
      <div className="container">
        <Tabs value={pathname} onValueChange={(value) => router.push(value)}>
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
