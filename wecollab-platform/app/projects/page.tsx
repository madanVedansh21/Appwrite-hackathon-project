"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GlasmorphismNavbar } from "@/components/glassmorphism-navbar"
import { GlasmorphismFooter } from "@/components/glassmorphism-footer"
import { ProjectCard } from "@/components/project-card"
import { Plus, Search, Filter, TrendingUp } from "lucide-react"

// Mock project data
const MOCK_PROJECTS = [
  {
    id: "1",
    title: "EcoTrack - Sustainability Dashboard",
    description:
      "A comprehensive web application that helps students track their carbon footprint and discover eco-friendly alternatives. Built with React, Node.js, and MongoDB.",
    author: {
      id: "1",
      name: "Sarah Chen",
      avatar: "/diverse-student-girl.png",
      university: "Stanford University",
    },
    tags: ["React", "Node.js", "MongoDB", "Sustainability", "Web Development"],
    upvotes: 127,
    comments: 23,
    createdAt: "2024-01-15",
    githubUrl: "https://github.com/sarahchen/ecotrack",
    isOpenSource: true,
    status: "In Progress",
    teamSize: 3,
    lookingForContributors: true,
    image: "/sustainability-dashboard.png",
  },
  {
    id: "2",
    title: "StudyBuddy AI - Personalized Learning Assistant",
    description:
      "An AI-powered study companion that creates personalized learning paths, generates quizzes, and provides intelligent tutoring for various subjects.",
    author: {
      id: "2",
      name: "Marcus Johnson",
      avatar: "/student-boy.png",
      university: "MIT",
    },
    tags: ["Python", "Machine Learning", "AI", "Education", "Flask"],
    upvotes: 89,
    comments: 15,
    createdAt: "2024-01-12",
    githubUrl: "https://github.com/marcusj/studybuddy-ai",
    isOpenSource: true,
    status: "Beta",
    teamSize: 2,
    lookingForContributors: true,
    image: "/ai-learning-assistant.png",
  },
  {
    id: "3",
    title: "CampusConnect - University Social Network",
    description:
      "A social platform designed specifically for university students to connect, share resources, and organize events within their campus community.",
    author: {
      id: "3",
      name: "Emily Rodriguez",
      avatar: "/student-latina.jpg",
      university: "UC Berkeley",
    },
    tags: ["React Native", "Firebase", "Social Media", "Mobile Development"],
    upvotes: 156,
    comments: 31,
    createdAt: "2024-01-10",
    githubUrl: "https://github.com/emilyrod/campusconnect",
    isOpenSource: false,
    status: "Live",
    teamSize: 4,
    lookingForContributors: false,
    image: "/social-network-mobile.jpg",
  },
  {
    id: "4",
    title: "FinanceFlow - Student Budget Tracker",
    description:
      "A comprehensive financial management app tailored for students, featuring expense tracking, budget planning, and financial literacy resources.",
    author: {
      id: "4",
      name: "David Kim",
      avatar: "/student-asian-boy.jpg",
      university: "Harvard University",
    },
    tags: ["Vue.js", "Express", "PostgreSQL", "Finance", "PWA"],
    upvotes: 73,
    comments: 12,
    createdAt: "2024-01-08",
    githubUrl: "https://github.com/davidkim/financeflow",
    isOpenSource: true,
    status: "In Progress",
    teamSize: 2,
    lookingForContributors: true,
    image: "/budget-tracker-app.jpg",
  },
  {
    id: "5",
    title: "CodeReview Bot - Automated Code Analysis",
    description:
      "An intelligent bot that provides automated code reviews, suggests improvements, and helps maintain code quality standards for student projects.",
    author: {
      id: "5",
      name: "Alex Thompson",
      avatar: "/student-developer.jpg",
      university: "Carnegie Mellon",
    },
    tags: ["Python", "NLP", "GitHub API", "DevTools", "Machine Learning"],
    upvotes: 94,
    comments: 18,
    createdAt: "2024-01-05",
    githubUrl: "https://github.com/alexthompson/codereview-bot",
    isOpenSource: true,
    status: "Beta",
    teamSize: 1,
    lookingForContributors: true,
    image: "/code-review-automation.jpg",
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState(MOCK_PROJECTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("upvotes")
  const [filterBy, setFilterBy] = useState("all")

  const handleUpvote = (projectId: string) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === projectId ? { ...project, upvotes: project.upvotes + 1 } : project)),
    )
  }

  const filteredAndSortedProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "open-source" && project.isOpenSource) ||
        (filterBy === "looking-for-contributors" && project.lookingForContributors) ||
        (filterBy === "in-progress" && project.status === "In Progress") ||
        (filterBy === "live" && project.status === "Live")

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "upvotes":
          return b.upvotes - a.upvotes
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "comments":
          return b.comments - a.comments
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen">
      <GlasmorphismNavbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-balance mb-4">
              Discover Amazing Student Projects
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
              Explore innovative projects from students worldwide. Upvote your favorites, contribute to open source, and
              get inspired for your next collaboration.
            </p>
            <Button className="gradient-primary text-white border-0 hover:opacity-90 transition-opacity" asChild>
              <Link href="/projects/create">
                <Plus className="w-4 h-4 mr-2" />
                Share Your Project
              </Link>
            </Button>
          </div>

          {/* Filters and Search */}
          <Card className="glass border-border/50 shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search projects, technologies, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 bg-input/50 border-border/50">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upvotes">Most Upvoted</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="comments">Most Discussed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-48 bg-input/50 border-border/50">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="open-source">Open Source</SelectItem>
                      <SelectItem value="looking-for-contributors">Looking for Contributors</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="live">Live Projects</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredAndSortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onUpvote={handleUpvote} />
            ))}
          </div>

          {filteredAndSortedProjects.length === 0 && (
            <Card className="glass border-border/50 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif font-semibold text-2xl mb-4">No Projects Found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or filters to discover more projects.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")} className="bg-transparent">
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <GlasmorphismFooter />
    </div>
  )
}
