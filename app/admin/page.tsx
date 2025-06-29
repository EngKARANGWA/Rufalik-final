"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FileText,
  MessageSquare,
  HelpCircle,
  BarChart3,
  Settings,
  Plus,
  Eye,
  TrendingUp,
  Clock,
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminPage() {
  const stats = [
    {
      title: "Amakuru Yose",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Abaturage Binjiye",
      value: "156",
      change: "+23%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Ibitekerezo",
      value: "12",
      change: "+5%",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Ubufasha Bwasabwe",
      value: "8",
      change: "Bishya",
      icon: HelpCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "news",
      title: "Amakuru mashya y'ubuzima yashyizweho",
      time: "2 amasaha ashize",
      status: "published",
      user: "Admin",
    },
    {
      id: 2,
      type: "help",
      title: "Ubufasha bwasabwe mu ishami ry'ubutaka",
      time: "4 amasaha ashize",
      status: "pending",
      user: "Jean Baptiste",
    },
    {
      id: 3,
      type: "feedback",
      title: "Igitekerezo gishya cyatanzwe",
      time: "6 amasaha ashize",
      status: "new",
      user: "Marie Claire",
    },
    {
      id: 4,
      type: "news",
      title: "Amakuru y'ubukungu yahinduwe",
      time: "1 ukwezi ushize",
      status: "updated",
      user: "Admin",
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Murakaza neza ku rubuga rw'ubuyobozi rwa Rugalika</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-xs text-green-600">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Ibikorwa Byihuse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Ongeraho Amakuru Mashya
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Reba Ubufasha Bwasabwe
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Kuyobora Ibitekerezo
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Reba Imibare
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Ibikorwa Bya Vuba
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">na {activity.user}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        activity.status === "published"
                          ? "default"
                          : activity.status === "pending"
                            ? "secondary"
                            : activity.status === "updated"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {activity.status === "published"
                        ? "Byatangajwe"
                        : activity.status === "pending"
                          ? "Bitegereje"
                          : activity.status === "updated"
                            ? "Byahinduwe"
                            : "Bishya"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
