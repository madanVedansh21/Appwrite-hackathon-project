"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GlasmorphismNavbar } from "@/components/glassmorphism-navbar"
import { GlasmorphismFooter } from "@/components/glassmorphism-footer"
import {
  ArrowLeft,
  Github,
  Linkedin,
  Globe,
  MapPin,
  Users,
  Target,
  Lightbulb,
  MessageCircle,
  Clock,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

// Mock user data (in a real app, this would be fetched based on the ID)
const MOCK_USER_PROFILE = {
  id: "2",
  firstName: "Marcus",
  lastName: "Johnson",
  university: "MIT",
  bio: "Computer Science student passionate about AI and machine learning. Looking to build innovative solutions that can make a real impact on healthcare and education. I love collaborating with diverse teams and learning from different perspectives.",
  avatar: "/student-boy.png",
  skills: ["Python", "Machine Learning", "TensorFlow", "Data Science", "Backend Development", "AI Research"],
  interests: ["Artificial Intelligence", "Healthcare", "Research", "Open Source", "Education Technology"],
  lookingFor: ["Frontend Developer", "UI/UX Designer", "Product Manager", "Research Partner"],
  github: "https://github.com/marcusj",
  linkedin: "https://linkedin.com/in/marcusj",
  portfolio: "https://marcusjohnson.dev",
  isOnline: true,
  lastActive: "2 hours ago",
  joinedDate: "2023-09-15",
  projectsCount: 8,
  collaborationsCount: 12,
  matchScore: 95,
  mutualConnections: 3,
}

export default function UserProfilePage() {
  const params = useParams()
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const user = MOCK_USER_PROFILE // In a real app, fetch based on params.id

  const handleConnect = async () => {
    setIsConnecting(true)
    // TODO: Implement connection request API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsConnected(true)
    setIsConnecting(false)
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen">
      <GlasmorphismNavbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="outline" size="sm" asChild className="bg-transparent">
              <Link href="/matchmaking">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Matchmaking
              </Link>
            </Button>
          </div>

          {/* Profile Header */}
          <Card className="glass border-border/50 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback className="text-2xl font-semibold bg-gradient-primary text-white">
                      {getInitials(user.firstName, user.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  {user.isOnline && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="font-serif font-bold text-3xl mb-2">
                      {user.firstName} {user.lastName}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{user.university}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{user.isOnline ? "Online now" : `Last active ${user.lastActive}`}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{user.mutualConnections} mutual connections</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-foreground leading-relaxed">{user.bio}</p>

                  <div className="flex flex-wrap gap-3">
                    {user.github && (
                      <Button variant="outline" size="sm" asChild className="bg-transparent">
                        <Link href={user.github} target="_blank">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </Link>
                      </Button>
                    )}
                    {user.linkedin && (
                      <Button variant="outline" size="sm" asChild className="bg-transparent">
                        <Link href={user.linkedin} target="_blank">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </Link>
                      </Button>
                    )}
                    {user.portfolio && (
                      <Button variant="outline" size="sm" asChild className="bg-transparent">
                        <Link href={user.portfolio} target="_blank">
                          <Globe className="w-4 h-4 mr-2" />
                          Portfolio
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Match Score */}
                  <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="text-3xl font-bold text-primary mb-1">{user.matchScore}%</div>
                    <div className="text-xs text-muted-foreground">Match Score</div>
                  </div>

                  {/* Action Buttons */}
                  {isConnected ? (
                    <Button className="bg-green-500 hover:bg-green-600 text-white border-0" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Connected
                    </Button>
                  ) : (
                    <Button
                      onClick={handleConnect}
                      disabled={isConnecting}
                      className="gradient-primary text-white border-0 hover:opacity-90 transition-opacity"
                    >
                      {isConnecting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Connect
                        </>
                      )}
                    </Button>
                  )}

                  <Button variant="outline" className="bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Skills */}
            <Card className="glass border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="glass border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  Interests & Passions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="secondary"
                      className="bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Looking For */}
            <Card className="glass border-border/50 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  Looking for Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.lookingFor.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="border-primary/50 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="glass border-border/50 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle>Activity & Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{user.projectsCount}</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-1">{user.collaborationsCount}</div>
                    <div className="text-sm text-muted-foreground">Collaborations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{user.mutualConnections}</div>
                    <div className="text-sm text-muted-foreground">Mutual Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{formatDate(user.joinedDate)}</div>
                    <div className="text-sm text-muted-foreground">Member Since</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <GlasmorphismFooter />
    </div>
  )
}
