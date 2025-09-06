"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Heart, MessageCircle, UserPlus, Star, GitBranch, Trophy } from "lucide-react"

interface ActivityItem {
  id: string
  type: "like" | "comment" | "follow" | "project" | "github" | "achievement"
  user: {
    name: string
    avatar: string
  }
  action: string
  target?: string
  timestamp: string
  metadata?: any
}

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "like",
    user: { name: "Sarah Chen", avatar: "/diverse-student-girl.png" },
    action: "liked your project",
    target: "AI Learning Assistant",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    type: "comment",
    user: { name: "Marcus Johnson", avatar: "/student-boy.png" },
    action: "commented on",
    target: "Sustainability Dashboard",
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    type: "follow",
    user: { name: "Elena Rodriguez", avatar: "/student-latina.jpg" },
    action: "started following you",
    timestamp: "3 hours ago",
  },
  {
    id: "4",
    type: "project",
    user: { name: "Alex Kim", avatar: "/placeholder.svg?height=40&width=40" },
    action: "created a new project",
    target: "Campus Event Planner",
    timestamp: "1 day ago",
  },
  {
    id: "5",
    type: "github",
    user: { name: "You", avatar: "/placeholder.svg?height=40&width=40" },
    action: "pushed commits to",
    target: "open-source-project",
    timestamp: "2 days ago",
  },
  {
    id: "6",
    type: "achievement",
    user: { name: "You", avatar: "/placeholder.svg?height=40&width=40" },
    action: "earned the",
    target: "Collaboration Master badge",
    timestamp: "3 days ago",
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="h-4 w-4 text-red-500" />
    case "comment":
      return <MessageCircle className="h-4 w-4 text-blue-500" />
    case "follow":
      return <UserPlus className="h-4 w-4 text-green-500" />
    case "project":
      return <Star className="h-4 w-4 text-yellow-500" />
    case "github":
      return <GitBranch className="h-4 w-4 text-purple-500" />
    case "achievement":
      return <Trophy className="h-4 w-4 text-amber-500" />
    default:
      return <Activity className="h-4 w-4 text-gray-500" />
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "like":
      return "border-red-500/30 bg-red-500/10"
    case "comment":
      return "border-blue-500/30 bg-blue-500/10"
    case "follow":
      return "border-green-500/30 bg-green-500/10"
    case "project":
      return "border-yellow-500/30 bg-yellow-500/10"
    case "github":
      return "border-purple-500/30 bg-purple-500/10"
    case "achievement":
      return "border-amber-500/30 bg-amber-500/10"
    default:
      return "border-gray-500/30 bg-gray-500/10"
  }
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivity)
  const [filter, setFilter] = useState<string>("all")

  const filteredActivities = activities.filter((activity) => filter === "all" || activity.type === filter)

  const stats = {
    totalLikes: activities.filter((a) => a.type === "like").length,
    totalComments: activities.filter((a) => a.type === "comment").length,
    totalFollowers: activities.filter((a) => a.type === "follow").length,
    totalProjects: activities.filter((a) => a.type === "project").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white font-playfair mb-2">Activity Feed</h1>
          <p className="text-gray-300">Stay updated with your collaboration network</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalLikes}</p>
                  <p className="text-sm text-gray-400">Likes Received</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalComments}</p>
                  <p className="text-sm text-gray-400">Comments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <UserPlus className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalFollowers}</p>
                  <p className="text-sm text-gray-400">New Followers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalProjects}</p>
                  <p className="text-sm text-gray-400">Projects Created</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white font-playfair flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <Tabs value={filter} onValueChange={setFilter} className="w-full">
              <TabsList className="bg-white/10 border-white/20">
                <TabsTrigger value="all" className="data-[state=active]:bg-white/20">
                  All
                </TabsTrigger>
                <TabsTrigger value="like" className="data-[state=active]:bg-white/20">
                  Likes
                </TabsTrigger>
                <TabsTrigger value="comment" className="data-[state=active]:bg-white/20">
                  Comments
                </TabsTrigger>
                <TabsTrigger value="follow" className="data-[state=active]:bg-white/20">
                  Follows
                </TabsTrigger>
                <TabsTrigger value="project" className="data-[state=active]:bg-white/20">
                  Projects
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-start space-x-4 p-4 rounded-2xl border transition-all hover:bg-white/5 ${getActivityColor(activity.type)}`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    {activity.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {getActivityIcon(activity.type)}
                    <p className="text-white">
                      <span className="font-semibold">{activity.user.name}</span> {activity.action}
                      {activity.target && <span className="font-semibold text-blue-300"> {activity.target}</span>}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
