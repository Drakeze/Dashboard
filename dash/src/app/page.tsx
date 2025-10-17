import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ArrowDownIcon, Users, Heart, MessageCircle, Share2 } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Followers",
      value: "24,583",
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Engagement Rate",
      value: "8.2%",
      change: "+2.1%",
      trend: "up",
      icon: Heart,
    },
    {
      title: "Total Posts",
      value: "342",
      change: "-3.2%",
      trend: "down",
      icon: MessageCircle,
    },
    {
      title: "Shares",
      value: "1,429",
      change: "+18.7%",
      trend: "up",
      icon: Share2,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-gray-400 mt-1">Track your social media performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-900">
              Export
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200">Refresh Data</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trend === "up" ? (
                      <ArrowUpIcon className="h-4 w-4 text-white" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={`text-sm ${stat.trend === "up" ? "text-white" : "text-gray-400"}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New follower", user: "@johndoe", time: "2 minutes ago" },
                { action: "Post liked", user: "@janedoe", time: "15 minutes ago" },
                { action: "Comment received", user: "@alexsmith", time: "1 hour ago" },
                { action: "Post shared", user: "@sarahj", time: "3 hours ago" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
                >
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.user}</p>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-900">
            View Reports
          </Button>
          <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-900">
            Schedule Post
          </Button>
          <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-900">
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
