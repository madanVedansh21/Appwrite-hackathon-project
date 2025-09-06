"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { GlasmorphismNavbar } from "@/components/glassmorphism-navbar"
import { GlasmorphismFooter } from "@/components/glassmorphism-footer"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Github,
  ExternalLink,
  Users,
  Calendar,
  GitBranch,
  Send,
  Share2,
} from "lucide-react"

// Mock project data (in a real app, this would come from an API)
const MOCK_PROJECT = {
  id: "1",
  title: "EcoTrack - Sustainability Dashboard",
  description:
    "A comprehensive web application that helps students track their carbon footprint and discover eco-friendly alternatives. Built with React, Node.js, and MongoDB. The platform features real-time data visualization, personalized recommendations, and community challenges to promote sustainable living among university students.",
  longDescription: `EcoTrack is more than just a carbon footprint calculator - it's a comprehensive platform designed to make sustainability accessible and engaging for students. 

The application features:
- Real-time carbon footprint tracking across multiple categories (transportation, food, energy, etc.)
- Personalized recommendations based on user behavior and location
- Community challenges and leaderboards to gamify sustainable practices
- Integration with campus sustainability initiatives
- Educational resources and tips for reducing environmental impact
- Social features to connect with like-minded students

Our goal is to empower the next generation to make informed decisions about their environmental impact while building a community of environmentally conscious students.`,
  author: {
    id: "1",
    name: "Sarah Chen",
    avatar: "/diverse-student-girl.png",
    university: "Stanford University",
    bio: "Computer Science major passionate about environmental technology and sustainable development.",
  },
  tags: ["React", "Node.js", "MongoDB", "Sustainability", "Web Development", "Data Visualization"],
  upvotes: 127,
  comments: 23,
  createdAt: "2024-01-15",
  updatedAt: "2024-01-20",
  githubUrl: "https://github.com/sarahchen/ecotrack",
  liveUrl: "https://ecotrack-demo.vercel.app",
  isOpenSource: true,
  status: "In Progress",
  teamSize: 3,
  lookingForContributors: true,
  contributorRoles: ["Frontend Developer", "UI/UX Designer", "Data Scientist"],
  image: "/sustainability-dashboard.png",
  teamMembers: [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Full Stack Developer",
      avatar: "/diverse-student-girl.png",
    },
    {
      id: "2",
      name: "Mike Rodriguez",
      role: "Backend Developer",
      avatar: "/student-boy.png",
    },
    {
      id: "3",
      name: "Lisa Wang",
      role: "UI/UX Designer",
      avatar: "/student-designer.jpg",
    },
  ],
}

const MOCK_COMMENTS = [
  {
    id: "1",
    author: {
      name: "Alex Thompson",
      avatar: "/student-developer.jpg",
      university: "MIT",
    },
    content:
      "This is such an important project! I love how you've gamified sustainability. Would love to contribute to the data visualization components.",
    createdAt: "2024-01-18",
    upvotes: 12,
  },
  {
    id: "2",
    author: {
      name: "Emma Davis",
      avatar: "/student-girl-2.jpg",
      university: "UC Berkeley",
    },
    content:
      "Amazing work! Our campus sustainability office would be very interested in this. Have you considered adding integration with campus dining services for food tracking?",
    createdAt: "2024-01-17",
    upvotes: 8,
  },
  {
    id: "3",
    author: {
      name: "Jordan Kim",
      avatar: "/student-asian.jpg",
      university: "Carnegie Mellon",
    },
    content:
      "The UI looks fantastic! I'm working on a similar project for waste tracking. Would you be interested in collaborating or sharing some insights?",
    createdAt: "2024-01-16",
    upvotes: 5,
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(MOCK_COMMENTS)

  const project = MOCK_PROJECT // In a real app, fetch based on params.id

  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: Date.now().toString(),
      author: {
        name: "Current User", // This would come from auth context
        avatar: "/current-user.jpg",
        university: "Your University",
      },
      content: newComment,
      createdAt: new Date().toISOString().split("T")[0],
      upvotes: 0,
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Beta":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "In Progress":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen">
      <GlasmorphismNavbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="outline" size="sm" asChild className="bg-transparent">
              <Link href="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
          </div>

          {/* Project Header */}
          <Card className="glass border-border/50 shadow-xl mb-8">
            <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`${getStatusColor(project.status)} border`}>{project.status}</Badge>
                  {project.isOpenSource && (
                    <Badge className="bg-primary/10 text-primary border-primary/20 border">
                      <Github className="w-3 h-3 mr-1" />
                      Open Source
                    </Badge>
                  )}
                  {project.lookingForContributors && (
                    <Badge className="bg-secondary/10 text-secondary border-secondary/20 border">
                      <Users className="w-3 h-3 mr-1" />
                      Looking for Contributors
                    </Badge>
                  )}
                </div>
                <h1 className="font-serif font-bold text-3xl md:text-4xl text-white mb-2">{project.title}</h1>
                <p className="text-white/90 text-lg">{project.description}</p>
              </div>
            </div>

            <CardContent className="p-8">
              {/* Author and Actions */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={project.author.avatar || "/placeholder.svg"} alt={project.author.name} />
                    <AvatarFallback>
                      {project.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{project.author.name}</h3>
                    <p className="text-muted-foreground">{project.author.university}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Created {formatDate(project.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {project.teamSize} member{project.teamSize !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={handleUpvote}
                    className={`hover:bg-red-50 hover:text-red-600 transition-colors ${
                      isUpvoted ? "text-red-600 bg-red-50" : "text-muted-foreground"
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isUpvoted ? "fill-current" : ""}`} />
                    {project.upvotes + (isUpvoted ? 1 : 0)}
                  </Button>

                  <Button variant="ghost" className="text-muted-foreground hover:bg-blue-50 hover:text-blue-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {comments.length}
                  </Button>

                  <Button variant="ghost" className="text-muted-foreground hover:bg-gray-50">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Project Links */}
              <div className="flex flex-wrap gap-4 mb-8">
                {project.githubUrl && (
                  <Button variant="outline" asChild className="bg-transparent">
                    <Link href={project.githubUrl} target="_blank">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Link>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button variant="outline" asChild className="bg-transparent">
                    <Link href={project.liveUrl} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                )}
                {project.githubUrl && project.lookingForContributors && (
                  <Button
                    className="gradient-secondary text-white border-0 hover:opacity-90 transition-opacity"
                    asChild
                  >
                    <Link href={project.githubUrl} target="_blank">
                      <GitBranch className="w-4 h-4 mr-2" />
                      Contribute Open Source
                    </Link>
                  </Button>
                )}
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Detailed Description */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">About This Project</h3>
                <div className="prose prose-gray max-w-none">
                  {project.longDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Team Members */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="glass border-border/50 shadow-lg" id="comments">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Comments ({comments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add Comment */}
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts, ask questions, or offer to collaborate..."
                      className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="gradient-primary text-white border-0 hover:opacity-90 transition-opacity"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border-l-2 border-primary/20 pl-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                            <AvatarFallback className="text-xs">
                              {comment.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-sm">{comment.author.name}</p>
                              <p className="text-xs text-muted-foreground">{comment.author.university}</p>
                              <p className="text-xs text-muted-foreground">•</p>
                              <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-2">{comment.content}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-muted-foreground hover:text-red-600"
                            >
                              <Heart className="w-3 h-3 mr-1" />
                              {comment.upvotes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Looking for Contributors */}
              {project.lookingForContributors && (
                <Card className="glass border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Looking for Contributors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      This project is actively seeking contributors in the following roles:
                    </p>
                    <div className="space-y-2">
                      {project.contributorRoles.map((role) => (
                        <Badge key={role} variant="outline" className="block text-center py-2">
                          {role}
                        </Badge>
                      ))}
                    </div>
                    {project.githubUrl && (
                      <Button
                        className="w-full mt-4 gradient-secondary text-white border-0 hover:opacity-90 transition-opacity"
                        asChild
                      >
                        <Link href={project.githubUrl} target="_blank">
                          <GitBranch className="w-4 h-4 mr-2" />
                          Start Contributing
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Project Stats */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Project Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Upvotes</span>
                    <span className="font-semibold">{project.upvotes + (isUpvoted ? 1 : 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Comments</span>
                    <span className="font-semibold">{comments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team Size</span>
                    <span className="font-semibold">{project.teamSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-semibold text-sm">{formatDate(project.updatedAt)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <GlasmorphismFooter />
    </div>
  )
}
