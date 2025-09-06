"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GlasmorphismNavbar } from "@/components/glassmorphism-navbar"
import { GlasmorphismFooter } from "@/components/glassmorphism-footer"
import { UserMatchCard } from "@/components/user-match-card"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/components/auth-context"
import { Search, Filter, Users, Sparkles, Target, Zap } from "lucide-react"

// Mock user data for matchmaking
const MOCK_USERS = [
  {
    id: "2",
    firstName: "Marcus",
    lastName: "Johnson",
    university: "MIT",
    bio: "Computer Science student passionate about AI and machine learning. Looking to build innovative solutions that can make a real impact.",
    avatar: "/student-boy.png",
    skills: ["Python", "Machine Learning", "TensorFlow", "Data Science", "Backend Development"],
    interests: ["Artificial Intelligence", "Healthcare", "Research", "Open Source"],
    lookingFor: ["Frontend Developer", "UI/UX Designer", "Product Manager"],
    github: "https://github.com/marcusj",
    linkedin: "https://linkedin.com/in/marcusj",
    matchScore: 95,
    commonInterests: ["Artificial Intelligence", "Open Source"],
    complementarySkills: ["Frontend Development", "UI/UX Design"],
    isOnline: true,
    lastActive: "2 hours ago",
  },
  {
    id: "3",
    firstName: "Emily",
    lastName: "Rodriguez",
    university: "UC Berkeley",
    bio: "Design-focused developer with a passion for creating beautiful, user-friendly applications. Love working on social impact projects.",
    avatar: "/student-latina.jpg",
    skills: ["React", "UI/UX Design", "Figma", "JavaScript", "Frontend Development"],
    interests: ["Social Impact", "Education Technology", "Mobile Apps", "Sustainability"],
    lookingFor: ["Backend Developer", "Data Scientist", "Marketing Partner"],
    github: "https://github.com/emilyrod",
    linkedin: "https://linkedin.com/in/emilyrod",
    matchScore: 88,
    commonInterests: ["Social Impact", "Education Technology"],
    complementarySkills: ["Backend Development", "Data Science"],
    isOnline: false,
    lastActive: "1 day ago",
  },
  {
    id: "4",
    firstName: "David",
    lastName: "Kim",
    university: "Harvard University",
    bio: "Business and CS double major interested in fintech and entrepreneurship. Always looking for the next big opportunity.",
    avatar: "/student-asian-boy.jpg",
    skills: ["Business Strategy", "Finance", "Vue.js", "Project Management", "Analytics"],
    interests: ["Fintech", "Entrepreneurship", "Startups", "Blockchain"],
    lookingFor: ["Technical Partner", "Co-founder", "Marketing Partner"],
    github: "https://github.com/davidkim",
    linkedin: "https://linkedin.com/in/davidkim",
    matchScore: 82,
    commonInterests: ["Startups", "Entrepreneurship"],
    complementarySkills: ["Technical Development", "Marketing"],
    isOnline: true,
    lastActive: "30 minutes ago",
  },
  {
    id: "5",
    firstName: "Alex",
    lastName: "Thompson",
    university: "Carnegie Mellon",
    bio: "Full-stack developer with expertise in DevOps and cloud technologies. Passionate about building scalable solutions.",
    avatar: "/student-developer.jpg",
    skills: ["Node.js", "DevOps", "AWS", "Docker", "Full Stack Development"],
    interests: ["Cloud Computing", "Open Source", "DevTools", "Cybersecurity"],
    lookingFor: ["Frontend Developer", "Product Manager", "UI/UX Designer"],
    github: "https://github.com/alexthompson",
    linkedin: "https://linkedin.com/in/alexthompson",
    matchScore: 79,
    commonInterests: ["Open Source", "Cloud Computing"],
    complementarySkills: ["Frontend Development", "Design"],
    isOnline: true,
    lastActive: "1 hour ago",
  },
  {
    id: "6",
    firstName: "Sophia",
    lastName: "Chen",
    university: "Stanford University",
    bio: "Product design student with a focus on human-centered design. Love creating experiences that solve real problems.",
    avatar: "/student-designer.jpg",
    skills: ["Product Design", "User Research", "Prototyping", "Adobe Creative Suite", "Design Systems"],
    interests: ["Healthcare", "Education Technology", "AR/VR", "Innovation"],
    lookingFor: ["Frontend Developer", "Backend Developer", "Data Scientist"],
    github: "https://github.com/sophiachen",
    linkedin: "https://linkedin.com/in/sophiachen",
    matchScore: 91,
    commonInterests: ["Healthcare", "Innovation"],
    complementarySkills: ["Development", "Technical Implementation"],
    isOnline: false,
    lastActive: "3 hours ago",
  },
  {
    id: "7",
    firstName: "Jordan",
    lastName: "Williams",
    university: "University of Washington",
    bio: "Marketing and communications major with a passion for growth hacking and digital strategy. Love helping startups scale.",
    avatar: "/student-girl-2.jpg",
    skills: ["Digital Marketing", "Content Strategy", "Social Media", "Analytics", "Growth Hacking"],
    interests: ["Startups", "Social Media", "E-commerce", "Content Creation"],
    lookingFor: ["Technical Partner", "Product Manager", "Co-founder"],
    github: "",
    linkedin: "https://linkedin.com/in/jordanwilliams",
    matchScore: 76,
    commonInterests: ["Startups", "E-commerce"],
    complementarySkills: ["Technical Development", "Product Management"],
    isOnline: true,
    lastActive: "15 minutes ago",
  },
]

const UNIVERSITIES = [
  "All Universities",
  "MIT",
  "Stanford University",
  "Harvard University",
  "UC Berkeley",
  "Carnegie Mellon",
  "University of Washington",
  "Caltech",
  "Princeton University",
  "Yale University",
]

const SKILLS_FILTER = [
  "All Skills",
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "UI/UX Design",
  "Machine Learning",
  "Data Science",
  "Business Strategy",
  "Marketing",
  "Product Management",
]

const LOOKING_FOR_FILTER = [
  "All Roles",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Product Manager",
  "Data Scientist",
  "Marketing Partner",
  "Co-founder",
  "Technical Partner",
]

export default function MatchmakingPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [universityFilter, setUniversityFilter] = useState("All Universities")
  const [skillFilter, setSkillFilter] = useState("All Skills")
  const [lookingForFilter, setLookingForFilter] = useState("All Roles")
  const [sortBy, setSortBy] = useState("match-score")
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter((matchUser) => {
      // Don't show current user
      if (user && matchUser.id === user.id) return false

      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        matchUser.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        matchUser.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        matchUser.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        matchUser.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        matchUser.interests.some((interest) => interest.toLowerCase().includes(searchQuery.toLowerCase()))

      // University filter
      const matchesUniversity = universityFilter === "All Universities" || matchUser.university === universityFilter

      // Skills filter
      const matchesSkill =
        skillFilter === "All Skills" ||
        matchUser.skills.some((skill) => skill.toLowerCase().includes(skillFilter.toLowerCase()))

      // Looking for filter
      const matchesLookingFor =
        lookingForFilter === "All Roles" ||
        matchUser.lookingFor.some((role) => role.toLowerCase().includes(lookingForFilter.toLowerCase()))

      // Online filter
      const matchesOnline = !showOnlineOnly || matchUser.isOnline

      return matchesSearch && matchesUniversity && matchesSkill && matchesLookingFor && matchesOnline
    }).sort((a, b) => {
      switch (sortBy) {
        case "match-score":
          return b.matchScore - a.matchScore
        case "name":
          return a.firstName.localeCompare(b.firstName)
        case "university":
          return a.university.localeCompare(b.university)
        case "online":
          return b.isOnline ? 1 : -1
        default:
          return 0
      }
    })
  }, [searchQuery, universityFilter, skillFilter, lookingForFilter, sortBy, showOnlineOnly, user])

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <GlasmorphismNavbar />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-serif font-bold text-4xl md:text-5xl text-balance mb-4">
                Find Your Perfect Collaboration Partner
              </h1>
              <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
                Discover talented students with complementary skills and shared interests. Our smart matching algorithm
                helps you find the ideal teammates for your next project.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-2xl">{filteredUsers.length}</p>
                  <p className="text-sm text-muted-foreground">Available Partners</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-2xl">{filteredUsers.filter((u) => u.matchScore >= 85).length}</p>
                  <p className="text-sm text-muted-foreground">High Matches</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-2xl">{filteredUsers.filter((u) => u.isOnline).length}</p>
                  <p className="text-sm text-muted-foreground">Online Now</p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <Card className="glass border-border/50 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Find Your Match
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by name, skills, interests, or bio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>

                {/* Filter Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Select value={universityFilter} onValueChange={setUniversityFilter}>
                    <SelectTrigger className="bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {UNIVERSITIES.map((university) => (
                        <SelectItem key={university} value={university}>
                          {university}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={skillFilter} onValueChange={setSkillFilter}>
                    <SelectTrigger className="bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SKILLS_FILTER.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={lookingForFilter} onValueChange={setLookingForFilter}>
                    <SelectTrigger className="bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LOOKING_FOR_FILTER.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match-score">Best Match</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="online">Online Status</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Filters */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant={showOnlineOnly ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowOnlineOnly(!showOnlineOnly)}
                    className={
                      showOnlineOnly
                        ? "gradient-primary text-white border-0"
                        : "bg-transparent hover:bg-primary/10 hover:border-primary/50"
                    }
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Online Only
                  </Button>

                  {(searchQuery ||
                    universityFilter !== "All Universities" ||
                    skillFilter !== "All Skills" ||
                    lookingForFilter !== "All Roles" ||
                    showOnlineOnly) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("")
                        setUniversityFilter("All Universities")
                        setSkillFilter("All Skills")
                        setLookingForFilter("All Roles")
                        setShowOnlineOnly(false)
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredUsers.map((matchUser) => (
                  <UserMatchCard key={matchUser.id} user={matchUser} />
                ))}
              </div>
            ) : (
              <Card className="glass border-border/50 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif font-semibold text-2xl mb-4">No Matches Found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Try adjusting your search criteria or filters to discover more potential collaboration partners.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setUniversityFilter("All Universities")
                      setSkillFilter("All Skills")
                      setLookingForFilter("All Roles")
                      setShowOnlineOnly(false)
                    }}
                    className="bg-transparent"
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <GlasmorphismFooter />
      </div>
    </ProtectedRoute>
  )
}
