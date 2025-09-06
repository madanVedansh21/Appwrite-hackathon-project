"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Search, MessageCircle, Phone, Video, MoreVertical } from "lucide-react"

interface Message {
  id: string
  content: string
  timestamp: string
  senderId: string
  senderName: string
}

interface Conversation {
  id: string
  user: {
    name: string
    avatar: string
    isOnline: boolean
  }
  lastMessage: string
  timestamp: string
  unreadCount: number
  messages: Message[]
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      avatar: "/diverse-student-girl.png",
      isOnline: true,
    },
    lastMessage: "Great work on the AI project! Would love to collaborate.",
    timestamp: "2 min ago",
    unreadCount: 2,
    messages: [
      {
        id: "1",
        content: "Hey! I saw your AI Learning Assistant project. It's amazing!",
        timestamp: "10:30 AM",
        senderId: "sarah",
        senderName: "Sarah Chen",
      },
      {
        id: "2",
        content: "Great work on the AI project! Would love to collaborate.",
        timestamp: "10:32 AM",
        senderId: "sarah",
        senderName: "Sarah Chen",
      },
    ],
  },
  {
    id: "2",
    user: {
      name: "Marcus Johnson",
      avatar: "/student-boy.png",
      isOnline: false,
    },
    lastMessage: "Thanks for the feedback on my ML model!",
    timestamp: "1 hour ago",
    unreadCount: 0,
    messages: [
      {
        id: "1",
        content: "Thanks for the feedback on my ML model!",
        timestamp: "9:15 AM",
        senderId: "marcus",
        senderName: "Marcus Johnson",
      },
    ],
  },
  {
    id: "3",
    user: {
      name: "Elena Rodriguez",
      avatar: "/student-latina.jpg",
      isOnline: true,
    },
    lastMessage: "The design mockups are ready for review",
    timestamp: "3 hours ago",
    unreadCount: 1,
    messages: [
      {
        id: "1",
        content: "The design mockups are ready for review",
        timestamp: "7:45 AM",
        senderId: "elena",
        senderName: "Elena Rodriguez",
      },
    ],
  },
]

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        senderId: "me",
        senderName: "You",
      }

      const updatedConversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, message],
        lastMessage: newMessage,
        timestamp: "now",
      }

      setConversations(conversations.map((c) => (c.id === selectedConversation.id ? updatedConversation : c)))
      setSelectedConversation(updatedConversation)
      setNewMessage("")
    }
  }

  const filteredConversations = conversations.filter((c) =>
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white font-playfair mb-8">Messages</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white font-playfair flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`flex items-center space-x-3 p-3 rounded-2xl cursor-pointer transition-all ${
                    selectedConversation?.id === conversation.id
                      ? "bg-white/20 border border-white/30"
                      : "hover:bg-white/10"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {conversation.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-gray-900" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white truncate">{conversation.user.name}</h4>
                      <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-300 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <Badge className="bg-red-500 text-white">{conversation.unreadCount}</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={selectedConversation.user.avatar || "/placeholder.svg"}
                        alt={selectedConversation.user.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {selectedConversation.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">{selectedConversation.user.name}</h3>
                      <p className="text-sm text-gray-400">
                        {selectedConversation.user.isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.senderId === "me"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                <div className="p-4 border-t border-white/20">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                    <Button
                      onClick={sendMessage}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
                  <p className="text-gray-400">Choose a conversation to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
