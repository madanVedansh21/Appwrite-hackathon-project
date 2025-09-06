"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/components/auth-context"
import { GlasmorphismNavbar } from "@/components/glassmorphism-navbar"
import { GlasmorphismFooter } from "@/components/glassmorphism-footer"
import { Edit, Github, Linkedin, Globe, MapPin, Users, Target, Lightbulb, Mail } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) return null

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <GlasmorphismNavbar />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <Card className="glass border-border/50 shadow-xl mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback className="text-2xl font-semibold bg-gradient-primary text-white">
                      {getInitials(user.firstName, user.lastName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="font-serif font-bold text-3xl mb-2">
                        {user.firstName} {user.lastName}
                      </h1>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{user.university}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>

                    {user.bio && <p className="text-foreground leading-relaxed max-w-2xl">{user.bio}</p>}

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

                  <Button className="gradient-primary text-white border-0 hover:opacity-90 transition-opacity" asChild>
                    <Link href="/profile/edit">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
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
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.skills && user.skills.length > 0 ? (
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
                  ) : (
                    <p className="text-muted-foreground">No skills added yet.</p>
                  )}
                </CardContent>
              </Card>

              {/* Interests */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.interests && user.interests.length > 0 ? (
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
                  ) : (
                    <p className="text-muted-foreground">No interests added yet.</p>
                  )}
                </CardContent>
              </Card>

              {/* Looking For */}
              <Card className="glass border-border/50 shadow-lg lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    Looking For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.lookingFor && user.lookingFor.length > 0 ? (
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
                  ) : (
                    <p className="text-muted-foreground">No collaboration preferences set yet.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <Card className="glass border-border/50 shadow-lg mt-8">
              <CardContent className="p-8 text-center">
                <h3 className="font-serif font-semibold text-2xl mb-4">Ready to Start Collaborating?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Your profile is set up! Now you can discover amazing projects, find perfect teammates, and start
                  building something incredible together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="gradient-primary text-white border-0 hover:opacity-90 transition-opacity" asChild>
                    <Link href="/discover">Discover Projects</Link>
                  </Button>
                  <Button variant="outline" className="bg-transparent" asChild>
                    <Link href="/matchmaking">Find Partners</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <GlasmorphismFooter />
      </div>
    </ProtectedRoute>
  )
}
