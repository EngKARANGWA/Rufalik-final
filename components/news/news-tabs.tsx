"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"

export function NewsTabs() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    { value: "/", label: "Byose", icon: "📰" },
    { value: "/uburezi", label: "Uburezi", icon: "📚" },
    { value: "/ubukungu", label: "Ubukungu", icon: "💼" },
    { value: "/ubuzima", label: "Ubuzima", icon: "🏥" },
  ]

  return (
    <div className="w-full bg-muted/30 py-4">
      <div className="container">
        <Tabs value={pathname} onValueChange={(value) => router.push(value)}>
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
