"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/components/auth-context"
import { GlasmorphismNavbar } from "@/components/glassmorphism-navbar"
import { ArrowRight, ArrowLeft, CheckCircle, Plus, X, User, Target, Lightbulb } from "lucide-react"

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

export default function OnboardingPage() {
  const router = useRouter()
  const { user, updateProfile } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    bio: "",
    skills: [] as string[],
    interests: [] as string[],
    lookingFor: [] as string[],
    github: "",
    linkedin: "",
    portfolio: "",
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

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

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    try {
      await updateProfile(formData)
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-serif font-bold text-2xl mb-2">Tell us about yourself</h2>
              <p className="text-muted-foreground">
                Help others understand who you are and what you're passionate about
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Write a brief bio about yourself, your background, and what drives you..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="min-h-32 bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github" className="text-sm font-medium">
                    GitHub (Optional)
                  </Label>
                  <Input
                    id="github"
                    type="url"
                    placeholder="https://github.com/yourusername"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-sm font-medium">
                    LinkedIn (Optional)
                  </Label>
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/yourusername"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio" className="text-sm font-medium">
                  Portfolio Website (Optional)
                </Label>
                <Input
                  id="portfolio"
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-serif font-bold text-2xl mb-2">What are your skills?</h2>
              <p className="text-muted-foreground">
                Select the skills you have or are learning. This helps us match you with the right collaborators.
              </p>
            </div>

            <div className="space-y-4">
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
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-serif font-bold text-2xl mb-2">What interests you?</h2>
              <p className="text-muted-foreground">
                Choose areas you're passionate about or want to explore in your projects.
              </p>
            </div>

            <div className="space-y-4">
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
                {AVAILABLE_INTERESTS.filter((interest) => !formData.interests.includes(interest)).map((interest) => (
                  <Button
                    key={interest}
                    variant="outline"
                    size="sm"
                    className="justify-start bg-transparent hover:bg-secondary/10 hover:border-secondary/50 transition-colors"
                    onClick={() => handleInterestToggle(interest)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {interest}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-serif font-bold text-2xl mb-2">What are you looking for?</h2>
              <p className="text-muted-foreground">
                Let others know what kind of collaboration or partnership you're seeking.
              </p>
            </div>

            <div className="space-y-4">
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
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <GlasmorphismNavbar />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-serif font-bold text-3xl">Complete Your Profile</h1>
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card className="glass border-border/50 shadow-xl">
              <CardContent className="p-8">
                {renderStep()}

                <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep === totalSteps ? (
                    <Button
                      onClick={handleComplete}
                      className="gradient-primary text-white border-0 hover:opacity-90 transition-opacity"
                    >
                      Complete Setup
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="gradient-primary text-white border-0 hover:opacity-90 transition-opacity"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
