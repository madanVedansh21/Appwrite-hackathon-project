"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/components/auth-context"
import { GlasmorphismNavbar } from "@/components/glassmorphism-navbar"
import {
  Plus,
  Users,
  MessageCircle,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  Settings,
} from "lucide-react"

// Mock dashboard data
const MOCK_PROJECTS = [
  {
    id: "1",
    title: "EcoTrack - Sustainability Dashboard",
    description: "Carbon footprint tracking app for students",
    status: "In Progress",
    progress: 75,
    dueDate: "2024-02-15",
    team: [
      { id: "1", name: "Sarah Chen", avatar: "/diverse-student-girl.png", role: "Lead Developer" },
      { id: "2", name: "Mike Rodriguez", avatar: "/student-boy.png", role: "Backend Developer" },
      { id: "3", name: "Lisa Wang", avatar: "/student-designer.jpg", role: "UI/UX Designer" },
    ],
    unreadMessages: 3,
    tasksCompleted: 12,
    totalTasks: 16,
    lastActivity: "2 hours ago",
    priority: "High",
  },
  {
    id: "2",
    title: "StudyBuddy AI Assistant",
    description: "AI-powered personalized learning platform",
    status: "Planning",
    progress: 25,
    dueDate: "2024-03-01",
    team: [
      { id: "1", name: "Sarah Chen", avatar: "/diverse-student-girl.png", role: "Product Manager" },
      { id: "4", name: "Alex Thompson", avatar: "/student-developer.jpg", role: "AI Engineer" },
    ],
    unreadMessages: 1,
    tasksCompleted: 4,
    totalTasks: 20,
    lastActivity: "1 day ago",
    priority: "Medium",
  },
  {
    id: "3",
    title: "Campus Event Organizer",
    description: "Platform for organizing and discovering campus events",
    status: "Review",
    progress: 90,
    dueDate: "2024-01-30",
    team: [
      { id: "1", name: "Sarah Chen", avatar: "/diverse-student-girl.png", role: "Full Stack Developer" },
      { id: "5", name: "Jordan Williams", avatar: "/student-girl-2.jpg", role: "Marketing Lead" },
      { id: "6", name: "David Kim", avatar: "/student-asian-boy.jpg", role: "Business Analyst" },
    ],
    unreadMessages: 0,
    tasksCompleted: 18,
    totalTasks: 20,
    lastActivity: "30 minutes ago",
    priority: "High",
  },
]

const RECENT_ACTIVITY = [
  {
    id: "1",
    type: "task_completed",
    message: "Mike Rodriguez completed 'API Integration' in EcoTrack",
    time: "2 hours ago",
    project: "EcoTrack",
  },
  {
    id: "2",
    type: "message",
    message: "New message in StudyBuddy AI Assistant team chat",
    time: "4 hours ago",
    project: "StudyBuddy AI",
  },
  {
    id: "3",
    type: "milestone",
    message: "Campus Event Organizer reached 90% completion",
    time: "1 day ago",
    project: "Campus Events",
  },
  {
    id: "4",
    type: "team_join",
    message: "Alex Thompson joined StudyBuddy AI Assistant team",
    time: "2 days ago",
    project: "StudyBuddy AI",
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [projects] = useState(MOCK_PROJECTS)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "Planning":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Review":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      case "Completed":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task_completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "message":
        return <MessageCircle className="w-4 h-4 text-blue-600" />
      case "milestone":
        return <Target className="w-4 h-4 text-purple-600" />
      case "team_join":
        return <Users className="w-4 h-4 text-orange-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const totalTasks = projects.reduce((sum, project) => sum + project.totalTasks, 0)
  const completedTasks = projects.reduce((sum, project) => sum + project.tasksCompleted, 0)
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <GlasmorphismNavbar />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="font-serif font-bold text-3xl md:text-4xl mb-2">Welcome back, {user?.firstName}!</h1>
                <p className="text-muted-foreground text-lg">
                  Manage your projects, collaborate with your team, and track your progress.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="bg-transparent" asChild>
                  <Link href="/projects/create">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Link>
                </Button>
                <Button className="gradient-primary text-white border-0 hover:opacity-90 transition-opacity" asChild>
                  <Link href="/matchmaking">
                    <Users className="w-4 h-4 mr-2" />
                    Find Partners
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="glass border-border/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
                      <p className="text-2xl font-bold">{projects.length}</p>
                    </div>
                    <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tasks Completed</p>
                      <p className="text-2xl font-bold">
                        {completedTasks}/{totalTasks}
                      </p>
                    </div>
                    <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Overall Progress</p>
                      <p className="text-2xl font-bold">{overallProgress}%</p>
                    </div>
                    <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Team Members</p>
                      <p className="text-2xl font-bold">
                        {projects.reduce((sum, project) => sum + project.team.length, 0)}
                      </p>
                    </div>
                    <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Projects */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif font-bold text-2xl">Your Projects</h2>
                  <Button variant="outline" size="sm" className="bg-transparent" asChild>
                    <Link href="/projects">View All</Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {projects.map((project) => (
                    <Card
                      key={project.id}
                      className="glass border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Link href={`/dashboard/projects/${project.id}`}>
                                <h3 className="font-serif font-semibold text-xl hover:text-primary transition-colors cursor-pointer">
                                  {project.title}
                                </h3>
                              </Link>
                              <Badge className={`${getStatusColor(project.status)} border text-xs`}>
                                {project.status}
                              </Badge>
                              <div className={`text-xs font-medium ${getPriorityColor(project.priority)}`}>
                                {project.priority} Priority
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm mb-3">{project.description}</p>

                            {/* Progress */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Progress</span>
                                <span className="text-sm text-muted-foreground">{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>

                            {/* Team and Stats */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex -space-x-2">
                                  {project.team.slice(0, 3).map((member) => (
                                    <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
                                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                      <AvatarFallback className="text-xs">
                                        {member.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                  ))}
                                  {project.team.length > 3 && (
                                    <div className="w-8 h-8 bg-muted rounded-full border-2 border-white flex items-center justify-center">
                                      <span className="text-xs font-medium">+{project.team.length - 3}</span>
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>
                                      {project.tasksCompleted}/{project.totalTasks}
                                    </span>
                                  </div>
                                  {project.unreadMessages > 0 && (
                                    <div className="flex items-center gap-1">
                                      <MessageCircle className="w-4 h-4 text-blue-600" />
                                      <span className="text-blue-600">{project.unreadMessages} new</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{project.lastActivity}</span>
                                  </div>
                                </div>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-transparent group-hover:bg-primary/10 group-hover:border-primary/50 transition-colors"
                                asChild
                              >
                                <Link href={`/dashboard/projects/${project.id}`}>
                                  Open
                                  <ArrowRight className="w-3 h-3 ml-1" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <Card className="glass border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {RECENT_ACTIVITY.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="mt-1">{getActivityIcon(activity.type)}</div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{activity.message}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                            <span className="text-xs text-primary">{activity.project}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="glass border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent hover:bg-primary/10 hover:border-primary/50"
                      asChild
                    >
                      <Link href="/projects/create">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Project
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent hover:bg-primary/10 hover:border-primary/50"
                      asChild
                    >
                      <Link href="/matchmaking">
                        <Users className="w-4 h-4 mr-2" />
                        Find Team Members
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent hover:bg-primary/10 hover:border-primary/50"
                      asChild
                    >
                      <Link href="/profile">
                        <Settings className="w-4 h-4 mr-2" />
                        Update Profile
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Upcoming Deadlines */}
                <Card className="glass border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Upcoming Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {projects
                      .filter((project) => new Date(project.dueDate) > new Date())
                      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                      .slice(0, 3)
                      .map((project) => (
                        <div key={project.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{project.title}</p>
                            <p className="text-xs text-muted-foreground">
                              Due {new Date(project.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              new Date(project.dueDate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000
                                ? "border-red-500/50 text-red-600"
                                : "border-yellow-500/50 text-yellow-600"
                            }`}
                          >
                            {Math.ceil(
                              (new Date(project.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                            )}{" "}
                            days
                          </Badge>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
