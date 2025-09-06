"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProtectedRoute } from "@/components/protected-route"
import { GlasmorphismNavbar } from "@/components/glassmorphism-navbar"
import { ArrowLeft, Plus, X, Upload, Github, ExternalLink, Save } from "lucide-react"
import Link from "next/link"

const AVAILABLE_TAGS = [
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C++",
  "Swift",
  "Kotlin",
  "Flutter",
  "React Native",
  "UI/UX Design",
  "Figma",
  "Adobe Creative Suite",
  "Machine Learning",
  "AI",
  "Data Science",
  "Blockchain",
  "Web Development",
  "Mobile Development",
  "Game Development",
  "DevOps",
  "Cloud Computing",
  "Cybersecurity",
  "IoT",
  "AR/VR",
  "Fintech",
  "Healthcare",
  "Education",
  "Social Impact",
  "Sustainability",
  "E-commerce",
  "Open Source",
]

export default function CreateProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [] as string[],
    status: "",
    teamSize: 1,
    githubUrl: "",
    liveUrl: "",
    isOpenSource: false,
    lookingForContributors: false,
    contributorRoles: [] as string[],
    image: null as File | null,
  })

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  const handleRoleToggle = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      contributorRoles: prev.contributorRoles.includes(role)
        ? prev.contributorRoles.filter((r) => r !== role)
        : [...prev.contributorRoles, role],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement project creation API call
      console.log("Creating project:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/projects")
    } catch (error) {
      console.error("Failed to create project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const contributorRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Product Manager",
    "Data Scientist",
    "DevOps Engineer",
    "Marketing Specialist",
    "Content Writer",
    "QA Tester",
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <GlasmorphismNavbar />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" size="sm" asChild className="bg-transparent">
                <Link href="/projects">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Projects
                </Link>
              </Button>
              <h1 className="font-serif font-bold text-3xl">Share Your Project</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter your project title..."
                      className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your project, its purpose, and what makes it special..."
                      className="min-h-32 bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Project Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger className="bg-input/50 border-border/50">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planning">Planning</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Beta">Beta</SelectItem>
                          <SelectItem value="Live">Live</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Team Size</Label>
                      <Input
                        id="teamSize"
                        type="number"
                        min="1"
                        max="20"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: Number.parseInt(e.target.value) || 1 })}
                        className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Image */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Project Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label htmlFor="image">Upload Project Screenshot or Logo</Label>
                    <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      <Label htmlFor="image" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">
                          {formData.image ? formData.image.name : "Click to upload an image"}
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Technologies & Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="default"
                        className="gradient-primary text-white cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {AVAILABLE_TAGS.filter((tag) => !formData.tags.includes(tag)).map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="justify-start bg-transparent hover:bg-primary/10 hover:border-primary/50 transition-colors"
                        onClick={() => handleTagToggle(tag)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {tag}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Links */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Project Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub Repository (Optional)</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="githubUrl"
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="https://github.com/username/repository"
                        className="pl-10 bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="liveUrl">Live Demo URL (Optional)</Label>
                    <div className="relative">
                      <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="liveUrl"
                        type="url"
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        placeholder="https://your-project-demo.com"
                        className="pl-10 bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Open Source & Collaboration */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Collaboration Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isOpenSource"
                      checked={formData.isOpenSource}
                      onCheckedChange={(checked) => setFormData({ ...formData, isOpenSource: checked as boolean })}
                    />
                    <Label
                      htmlFor="isOpenSource"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      This is an open source project
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lookingForContributors"
                      checked={formData.lookingForContributors}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, lookingForContributors: checked as boolean })
                      }
                    />
                    <Label
                      htmlFor="lookingForContributors"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Looking for contributors
                    </Label>
                  </div>

                  {formData.lookingForContributors && (
                    <div className="space-y-4 pl-6 border-l-2 border-primary/20">
                      <Label className="text-sm font-medium">What roles are you looking for?</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.contributorRoles.map((role) => (
                          <Badge
                            key={role}
                            variant="default"
                            className="gradient-secondary text-white cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleRoleToggle(role)}
                          >
                            {role}
                            <X className="w-3 h-3 ml-1" />
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {contributorRoles
                          .filter((role) => !formData.contributorRoles.includes(role))
                          .map((role) => (
                            <Button
                              key={role}
                              type="button"
                              variant="outline"
                              size="sm"
                              className="justify-start bg-transparent hover:bg-secondary/10 hover:border-secondary/50 transition-colors"
                              onClick={() => handleRoleToggle(role)}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              {role}
                            </Button>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="gradient-primary text-white border-0 hover:opacity-90 transition-opacity px-8"
                >
                  {isLoading ? "Publishing..." : "Publish Project"}
                  <Save className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
