"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/components/auth-context"
import { GlasmorphismNavbar } from "@/components/glassmorphism-navbar"
import { Save, ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

const AVAILABLE_SKILLS = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "TypeScript",
  "Java",
  "C++",
  "Swift",
  "UI/UX Design",
  "Graphic Design",
  "Figma",
  "Adobe Creative Suite",
  "Sketch",
  "Digital Marketing",
  "Content Writing",
  "Social Media",
  "SEO",
  "Analytics",
  "Project Management",
  "Business Strategy",
  "Finance",
  "Entrepreneurship",
  "Data Science",
  "Machine Learning",
  "AI",
  "Blockchain",
  "Cybersecurity",
  "Mobile Development",
  "Web Development",
  "DevOps",
  "Cloud Computing",
]

const AVAILABLE_INTERESTS = [
  "Artificial Intelligence",
  "Web Development",
  "Mobile Apps",
  "Gaming",
  "E-commerce",
  "Social Impact",
  "Education Technology",
  "Healthcare",
  "Fintech",
  "Climate Tech",
  "Blockchain",
  "AR/VR",
  "IoT",
  "Robotics",
  "Data Analytics",
  "Cybersecurity",
  "Open Source",
  "Startups",
  "Research",
  "Innovation",
  "Sustainability",
]

const LOOKING_FOR_OPTIONS = [
  "Co-founder",
  "Technical Partner",
  "Design Partner",
  "Marketing Partner",
  "Business Partner",
  "Mentor",
  "Team Member",
  "Project Collaborator",
  "Research Partner",
  "Study Buddy",
  "Hackathon Team",
  "Startup Team",
]

export default function EditProfilePage() {
  const router = useRouter()
  const { user, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    university: "",
    skills: [] as string[],
    interests: [] as string[],
    lookingFor: [] as string[],
    github: "",
    linkedin: "",
    portfolio: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
        university: user.university || "",
        skills: user.skills || [],
        interests: user.interests || [],
        lookingFor: user.lookingFor || [],
        github: user.github || "",
        linkedin: user.linkedin || "",
        portfolio: user.portfolio || "",
      })
    }
  }, [user])

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleLookingForToggle = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(option)
        ? prev.lookingFor.filter((o) => o !== option)
        : [...prev.lookingFor, option],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateProfile(formData)
      router.push("/profile")
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <GlasmorphismNavbar />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" size="sm" asChild className="bg-transparent">
                <Link href="/profile">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Profile
                </Link>
              </Button>
              <h1 className="font-serif font-bold text-3xl">Edit Profile</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="min-h-24 bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none"
                      placeholder="Tell others about yourself..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      placeholder="https://linkedin.com/in/yourusername"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio</Label>
                    <Input
                      id="portfolio"
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="default"
                        className="gradient-primary text-white cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {AVAILABLE_SKILLS.filter((skill) => !formData.skills.includes(skill)).map((skill) => (
                      <Button
                        key={skill}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="justify-start bg-transparent hover:bg-primary/10 hover:border-primary/50 transition-colors"
                        onClick={() => handleSkillToggle(skill)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {skill}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Interests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="default"
                        className="gradient-secondary text-white cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {interest}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {AVAILABLE_INTERESTS.filter((interest) => !formData.interests.includes(interest)).map(
                      (interest) => (
                        <Button
                          key={interest}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="justify-start bg-transparent hover:bg-secondary/10 hover:border-secondary/50 transition-colors"
                          onClick={() => handleInterestToggle(interest)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          {interest}
                        </Button>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Looking For */}
              <Card className="glass border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Looking For</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.lookingFor.map((option) => (
                      <Badge
                        key={option}
                        variant="default"
                        className="gradient-primary text-white cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleLookingForToggle(option)}
                      >
                        {option}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {LOOKING_FOR_OPTIONS.filter((option) => !formData.lookingFor.includes(option)).map((option) => (
                      <Button
                        key={option}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="justify-start bg-transparent hover:bg-primary/10 hover:border-primary/50 transition-colors"
                        onClick={() => handleLookingForToggle(option)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="gradient-primary text-white border-0 hover:opacity-90 transition-opacity px-8"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
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
