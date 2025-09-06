"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { GlasmorphismNavbar } from "@/components/glassmorphism-navbar"
import { KanbanBoard } from "@/components/kanban-board"
import { TeamChat } from "@/components/team-chat"
import { ProjectProgress } from "@/components/project-progress"
import { TeamMembers } from "@/components/team-members"
import { ArrowLeft, MessageSquare, Kanban, TrendingUp, Users, Settings } from "lucide-react"

// Mock project data
const MOCK_PROJECT = {
  id: "1",
  title: "EcoTrack - Sustainability Dashboard",
  description:
    "A comprehensive web application that helps students track their carbon footprint and discover eco-friendly alternatives.",
  status: "In Progress",
  progress: 75,
  dueDate: "2024-02-15",
  createdDate: "2024-01-01",
  team: [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "/diverse-student-girl.png",
      role: "Lead Developer",
      email: "sarah@example.com",
      isOnline: true,
    },
    {
      id: "2",
      name: "Mike Rodriguez",
      avatar: "/student-boy.png",
      role: "Backend Developer",
      email: "mike@example.com",
      isOnline: false,
    },
    {
      id: "3",
      name: "Lisa Wang",
      avatar: "/student-designer.jpg",
      role: "UI/UX Designer",
      email: "lisa@example.com",
      isOnline: true,
    },
  ],
  milestones: [
    { id: "1", title: "Project Setup", completed: true, dueDate: "2024-01-05" },
    { id: "2", title: "Backend API", completed: true, dueDate: "2024-01-15" },
    { id: "3", title: "Frontend Development", completed: false, dueDate: "2024-02-01" },
    { id: "4", title: "Testing & Deployment", completed: false, dueDate: "2024-02-15" },
  ],
  tasks: {
    todo: [
      {
        id: "1",
        title: "Implement user authentication",
        description: "Add login and registration functionality",
        assignee: "Sarah Chen",
        priority: "High",
        dueDate: "2024-01-25",
      },
      {
        id: "2",
        title: "Design dashboard wireframes",
        description: "Create wireframes for the main dashboard",
        assignee: "Lisa Wang",
        priority: "Medium",
        dueDate: "2024-01-28",
      },
    ],
    inProgress: [
      {
        id: "3",
        title: "Carbon footprint calculator",
        description: "Build the core calculation engine",
        assignee: "Mike Rodriguez",
        priority: "High",
        dueDate: "2024-01-30",
      },
      {
        id: "4",
        title: "Database schema design",
        description: "Design and implement the database structure",
        assignee: "Mike Rodriguez",
        priority: "Medium",
        dueDate: "2024-01-26",
      },
    ],
    review: [
      {
        id: "5",
        title: "API documentation",
        description: "Document all API endpoints",
        assignee: "Sarah Chen",
        priority: "Low",
        dueDate: "2024-01-24",
      },
    ],
    done: [
      {
        id: "6",
        title: "Project initialization",
        description: "Set up the project structure and dependencies",
        assignee: "Sarah Chen",
        priority: "High",
        dueDate: "2024-01-05",
      },
      {
        id: "7",
        title: "Environment setup",
        description: "Configure development and production environments",
        assignee: "Mike Rodriguez",
        priority: "Medium",
        dueDate: "2024-01-08",
      },
    ],
  },
}

export default function ProjectCollaborationPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  const project = MOCK_PROJECT // In a real app, fetch based on params.id

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <GlasmorphismNavbar />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" size="sm" asChild className="bg-transparent">
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex-1">
                <h1 className="font-serif font-bold text-3xl mb-2">{project.title}</h1>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Project Settings
              </Button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="glass border-border/50 bg-transparent p-1">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="kanban" className="flex items-center gap-2">
                  <Kanban className="w-4 h-4" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Team
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <ProjectProgress project={project} />
                  </div>
                  <div>
                    <TeamMembers team={project.team} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="kanban">
                <KanbanBoard tasks={project.tasks} />
              </TabsContent>

              <TabsContent value="chat">
                <TeamChat projectId={project.id} team={project.team} />
              </TabsContent>

              <TabsContent value="team">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <TeamMembers team={project.team} detailed />
                  <Card className="glass border-border/50 shadow-lg">
                    <CardHeader>
                      <CardTitle>Team Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Sarah Chen completed "API documentation"</p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Mike Rodriguez started "Carbon footprint calculator"</p>
                            <p className="text-xs text-muted-foreground">4 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Lisa Wang uploaded new design mockups</p>
                            <p className="text-xs text-muted-foreground">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
