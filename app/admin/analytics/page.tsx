"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Eye, FileText, MessageSquare, Calendar, Globe } from "lucide-react"

export default function AnalyticsPage() {
  const stats = [
    {
      title: "Abasura Bose",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Amakuru Yasomwe",
      value: "1,234",
      change: "+8.2%",
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Ibitekerezo Bishya",
      value: "45",
      change: "+15.3%",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Ubufasha Bwasabwe",
      value: "23",
      change: "+5.1%",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const topNews = [
    { title: "Inyubako nshya z'ibiro by'umurenge", views: 245, category: "AMATANGAZO" },
    { title: "Serivisi z'ubuzima ku bana", views: 189, category: "UBUZIMA" },
    { title: "Isoko rishya ry'imbuto", views: 156, category: "UBUKUNGU" },
    { title: "Umushinga w'amashuri", views: 134, category: "UBUREZI" },
  ]

  const categoryStats = [
    { name: "UBUZIMA", percentage: 35, count: 8 },
    { name: "UBUKUNGU", percentage: 28, count: 6 },
    { name: "UBUREZI", percentage: 22, count: 5 },
    { name: "AMATANGAZO", percentage: 15, count: 5 },
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Imibare n'Isesengura</h1>
          <p className="text-muted-foreground">Reba imibare y'ibikorwa by'urubuga</p>
        </div>

        {/* Main Stats */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top News */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Amakuru Asomwa Cyane
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topNews.map((news, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{news.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {news.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{news.views} abasomye</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{news.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Ibice by'Amakuru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryStats.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {category.count} amakuru ({category.percentage}%)
                      </span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Ibikorwa Bya Vuba
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 border rounded">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Amakuru mashya yashyizweho</p>
                    <p className="text-xs text-muted-foreground">2 amasaha ashize</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 border rounded">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Umuturage mushya winjiye</p>
                    <p className="text-xs text-muted-foreground">4 amasaha ashize</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 border rounded">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Igitekerezo gishya cyatanzwe</p>
                    <p className="text-xs text-muted-foreground">6 amasaha ashize</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Engagement */}
          <Card>
            <CardHeader>
              <CardTitle>Ubwiyunge bw'Abaturage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Abasura Buri Munsi</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Igihe Bamara ku Rubuga</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Abasubiza Ibitekerezo</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Imikorere ya Sisitemu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Umuvuduko w'Urubuga</span>
                  <Badge variant="default">Mwiza</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ukoresha kwa Server</span>
                  <Badge variant="secondary">45%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ububiko bw'Amakuru</span>
                  <Badge variant="outline">78%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Umutekano</span>
                  <Badge variant="default">Mwiza</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
