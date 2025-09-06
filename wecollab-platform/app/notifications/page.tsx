"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Check, Heart, MessageCircle, UserPlus, GitBranch, Star } from "lucide-react"

interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "collaboration" | "github" | "mention"
  title: string
  message: string
  user: {
    name: string
    avatar: string
  }
  timestamp: string
  read: boolean
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    title: "New Like",
    message: "Sarah Chen liked your project 'AI Learning Assistant'",
    user: { name: "Sarah Chen", avatar: "/diverse-student-girl.png" },
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    title: "New Comment",
    message: "Marcus Johnson commented on your project",
    user: { name: "Marcus Johnson", avatar: "/student-boy.png" },
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "follow",
    title: "New Follower",
    message: "Elena Rodriguez started following you",
    user: { name: "Elena Rodriguez", avatar: "/student-latina.jpg" },
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "collaboration",
    title: "Collaboration Request",
    message: "Alex Kim wants to collaborate on 'Sustainability Dashboard'",
    user: { name: "Alex Kim", avatar: "/placeholder.svg?height=40&width=40" },
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "5",
    type: "github",
    title: "GitHub Activity",
    message: "Your pull request was merged in 'open-source-project'",
    user: { name: "GitHub", avatar: "/placeholder.svg?height=40&width=40" },
    timestamp: "2 days ago",
    read: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="h-4 w-4 text-red-500" />
    case "comment":
      return <MessageCircle className="h-4 w-4 text-blue-500" />
    case "follow":
      return <UserPlus className="h-4 w-4 text-green-500" />
    case "collaboration":
      return <Star className="h-4 w-4 text-yellow-500" />
    case "github":
      return <GitBranch className="h-4 w-4 text-purple-500" />
    default:
      return <Bell className="h-4 w-4 text-gray-500" />
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white font-playfair mb-2">Notifications</h1>
            <p className="text-gray-300">Stay updated with your collaboration activities</p>
          </div>
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white font-playfair flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Recent Activity
              {unreadCount > 0 && <Badge className="ml-2 bg-red-500 text-white">{unreadCount} new</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 p-4 rounded-2xl border transition-all hover:bg-white/5 ${
                  notification.read ? "bg-white/5 border-white/10" : "bg-white/10 border-white/20"
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    {notification.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {getNotificationIcon(notification.type)}
                    <h4 className="font-semibold text-white">{notification.title}</h4>
                    {!notification.read && <div className="h-2 w-2 bg-blue-500 rounded-full" />}
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                  <p className="text-gray-500 text-xs">{notification.timestamp}</p>
                </div>
                {!notification.read && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => markAsRead(notification.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
