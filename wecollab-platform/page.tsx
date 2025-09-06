import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GlasmorphismNavbar } from "@/components/glassmorphism-navbar"
import { GlasmorphismFooter } from "@/components/glassmorphism-footer"
import { Users, Zap, Target, ArrowRight, Code, Palette, Megaphone, TrendingUp, Heart, Github } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <GlasmorphismNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-900/10 to-purple-900/20"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-sans font-bold text-5xl md:text-7xl text-balance mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
            Where Students
            <br />
            Create Together
          </h1>
          <p className="text-xl md:text-2xl text-white text-balance mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Connect with like-minded students on WeCollab, find your perfect project partners, and build amazing things
            together. Your next breakthrough collaboration starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="gradient-primary text-white border-0 hover:opacity-90 transition-all duration-300 text-lg px-8 py-6 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105"
              asChild
            >
              <Link href="/signup">
                Join & Collaborate
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-slate-800/60 border-slate-600/50 text-white hover:bg-slate-700/70 hover:border-slate-500/60 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              asChild
            >
              <Link href="/discover">Explore Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-balance mb-4 text-white drop-shadow-lg">
              Everything You Need to Collaborate
            </h2>
            <p className="text-xl text-white/80 text-balance max-w-2xl mx-auto drop-shadow-sm">
              From finding the perfect teammate to managing your project, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass hover:shadow-2xl transition-all duration-500 group hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-sans font-semibold text-2xl mb-4 text-white">Smart Matchmaking</h3>
                <p className="text-white/90 leading-relaxed">
                  Our AI-powered system connects you with students who have complementary skills and shared interests.
                </p>
              </CardContent>
            </Card>

            <Card className="glass hover:shadow-2xl transition-all duration-500 group hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-sans font-semibold text-2xl mb-4 text-white">Collaboration Tools</h3>
                <p className="text-white/90 leading-relaxed">
                  Built-in chat, Kanban boards, and progress tracking to keep your team organized and productive.
                </p>
              </CardContent>
            </Card>

            <Card className="glass hover:shadow-2xl transition-all duration-500 group hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-sans font-semibold text-2xl mb-4 text-white">Project Showcase</h3>
                <p className="text-white/90 leading-relaxed">
                  Share your work, get feedback, and discover amazing projects from the student community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-slate-900/10 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-balance mb-4 text-white drop-shadow-lg">
              Find Your Perfect Match
            </h2>
            <p className="text-xl text-white/80 text-balance max-w-2xl mx-auto drop-shadow-sm">
              Whether you're a developer, designer, marketer, or visionary, find teammates who complement your skills.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Code, label: "Developers", color: "bg-gradient-to-br from-blue-500 to-blue-600" },
              { icon: Palette, label: "Designers", color: "bg-gradient-to-br from-purple-500 to-purple-600" },
              { icon: Megaphone, label: "Marketers", color: "bg-gradient-to-br from-green-500 to-green-600" },
              { icon: TrendingUp, label: "Business", color: "bg-gradient-to-br from-orange-500 to-orange-600" },
            ].map((skill, index) => (
              <Card
                key={index}
                className="glass hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 ${skill.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <skill.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-white">{skill.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-3xl p-12 text-center hover:shadow-2xl transition-all duration-500">
            <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Github className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-balance mb-6 text-white drop-shadow-lg">
              Start Your Open Source Journey
            </h2>
            <p className="text-xl text-white/90 text-balance max-w-3xl mx-auto mb-8 leading-relaxed drop-shadow-sm">
              Contribute to student projects, build your portfolio, and make meaningful connections. Every project can
              become an open source opportunity.
            </p>
            <Button
              size="lg"
              className="gradient-secondary text-white border-0 hover:opacity-90 transition-all duration-300 text-lg px-8 py-6 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105"
              asChild
            >
              <Link href="/projects">
                Explore Open Source Projects
                <Heart className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-balance mb-6 text-white drop-shadow-lg">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-white/90 text-balance mb-8 leading-relaxed drop-shadow-sm">
            Join thousands of students who are already collaborating, learning, and creating together on WeCollab.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="gradient-primary text-white border-0 hover:opacity-90 transition-all duration-300 text-lg px-8 py-6 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105"
              asChild
            >
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <p className="text-sm text-white/70 drop-shadow-sm">No credit card required • Join in 30 seconds</p>
          </div>
        </div>
      </section>

      <GlasmorphismFooter />
    </div>
  )
}
