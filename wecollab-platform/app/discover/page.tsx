"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { GlasmorphismNavbar } from "@/components/glassmorphism-navbar"
import { GlasmorphismFooter } from "@/components/glassmorphism-footer"
import { Search, Users, Lightbulb, Target, ArrowRight, Sparkles } from "lucide-react"

const DISCOVERY_CATEGORIES = [
  {
    id: "developers",
    title: "Developers",
    description: "Find talented programmers and technical experts",
    icon: "💻",
    count: 234,
    color: "bg-blue-500",
    skills: ["JavaScript", "Python", "React", "Node.js", "Mobile Development"],
  },
  {
    id: "designers",
    title: "Designers",
    description: "Connect with creative minds and visual storytellers",
    icon: "🎨",
    count: 156,
    color: "bg-purple-500",
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", "Branding"],
  },
  {
    id: "business",
    title: "Business Minds",
    description: "Partner with strategic thinkers and entrepreneurs",
    icon: "📊",
    count: 189,
    color: "bg-green-500",
    skills: ["Business Strategy", "Marketing", "Finance", "Project Management", "Analytics"],
  },
  {
    id: "researchers",
    title: "Researchers",
    description: "Collaborate with data scientists and academics",
    icon: "🔬",
    count: 98,
    color: "bg-orange-500",
    skills: ["Data Science", "Machine Learning", "Research", "Statistics", "Academic Writing"],
  },
]

const TRENDING_SKILLS = [
  { name: "Artificial Intelligence", count: 89, trend: "+12%" },
  { name: "React", count: 156, trend: "+8%" },
  { name: "UI/UX Design", count: 134, trend: "+15%" },
  { name: "Python", count: 178, trend: "+6%" },
  { name: "Machine Learning", count: 67, trend: "+22%" },
  { name: "Blockchain", count: 45, trend: "+18%" },
  { name: "Mobile Development", count: 123, trend: "+9%" },
  { name: "Data Science", count: 89, trend: "+14%" },
]

const FEATURED_COLLABORATIONS = [
  {
    title: "AI-Powered Study Assistant",
    description:
      "Looking for frontend developers to build an intuitive interface for our ML-powered learning platform.",
    skills: ["React", "TypeScript", "UI/UX Design"],
    team: "2 members",
    university: "MIT",
  },
  {
    title: "Sustainable Campus Initiative",
    description: "Seeking marketing and business partners to scale our campus sustainability tracking app.",
    skills: ["Marketing", "Business Strategy", "Growth Hacking"],
    team: "3 members",
    university: "Stanford",
  },
  {
    title: "Healthcare Data Platform",
    description: "Need data scientists and backend developers for our healthcare analytics startup.",
    skills: ["Data Science", "Python", "Healthcare", "Backend"],
    team: "4 members",
    university: "Harvard",
  },
]

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen">
      <GlasmorphismNavbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-balance mb-4">
              Discover Your Next Collaboration
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
              Explore talented students, trending skills, and exciting collaboration opportunities. Find the perfect
              match for your next big project.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search for skills, interests, or collaboration opportunities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
                <Button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 gradient-primary text-white border-0 hover:opacity-90 transition-opacity"
                  size="sm"
                >
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="gradient-primary text-white border-0 hover:opacity-90 transition-opacity"
                size="lg"
                asChild
              >
                <Link href="/matchmaking">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Smart Matchmaking
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent" asChild>
                <Link href="/projects">Browse Projects</Link>
              </Button>
            </div>
          </div>

          {/* Discovery Categories */}
          <section className="mb-16">
            <h2 className="font-serif font-bold text-3xl text-center mb-8">Explore by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DISCOVERY_CATEGORIES.map((category) => (
                <Card
                  key={category.id}
                  className="glass border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-serif font-semibold text-xl mb-2">{category.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{category.description}</p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{category.count} students</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {category.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs bg-muted/50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent group-hover:bg-primary/10 group-hover:border-primary/50 transition-colors"
                      asChild
                    >
                      <Link href={`/matchmaking?category=${category.id}`}>
                        Explore
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Trending Skills */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif font-bold text-3xl">Trending Skills</h2>
              <Button variant="outline" className="bg-transparent" asChild>
                <Link href="/matchmaking">View All Skills</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TRENDING_SKILLS.map((skill) => (
                <Card
                  key={skill.name}
                  className="glass border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600">
                        {skill.trend}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground">{skill.count} students</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Featured Collaboration Opportunities */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif font-bold text-3xl">Featured Opportunities</h2>
              <Button variant="outline" className="bg-transparent" asChild>
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {FEATURED_COLLABORATIONS.map((collab, index) => (
                <Card
                  key={index}
                  className="glass border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{collab.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{collab.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {collab.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs bg-primary/10 text-primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{collab.team}</span>
                      </div>
                      <span>{collab.university}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent group-hover:bg-primary/10 group-hover:border-primary/50 transition-colors"
                    >
                      Learn More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <Card className="glass border-border/50 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-serif font-bold text-3xl mb-4">Ready to Find Your Perfect Match?</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-8">
                Our smart matchmaking algorithm analyzes your skills, interests, and goals to connect you with the ideal
                collaboration partners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="gradient-primary text-white border-0 hover:opacity-90 transition-opacity"
                  size="lg"
                  asChild
                >
                  <Link href="/matchmaking">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Matchmaking
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent" asChild>
                  <Link href="/onboarding">Complete Your Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <GlasmorphismFooter />
    </div>
  )
}
