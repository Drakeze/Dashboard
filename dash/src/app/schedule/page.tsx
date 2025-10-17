import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, ImageIcon, Send } from "lucide-react"

export default function SchedulePage() {
  const scheduledPosts = [
    { content: "Check out our latest product launch!", date: "2024-01-20", time: "10:00 AM", platform: "Twitter" },
    { content: "Behind the scenes of our team meeting", date: "2024-01-21", time: "2:30 PM", platform: "Instagram" },
    { content: "New blog post is live!", date: "2024-01-22", time: "9:00 AM", platform: "LinkedIn" },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Schedule Post</h1>
          <p className="text-gray-400 mt-1">Plan and schedule your social media content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Post */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Create New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content" className="text-gray-400">
                  Post Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="What's on your mind?"
                  rows={6}
                  className="bg-black border-gray-800 text-white placeholder:text-gray-600 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform" className="text-gray-400">
                  Platform
                </Label>
                <Input
                  id="platform"
                  placeholder="Select platform"
                  className="bg-black border-gray-800 text-white placeholder:text-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-gray-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date
                  </Label>
                  <Input id="date" type="date" className="bg-black border-gray-800 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-gray-400 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time
                  </Label>
                  <Input id="time" type="time" className="bg-black border-gray-800 text-white" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="bg-transparent border-gray-700 text-white hover:bg-gray-900 flex items-center gap-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  Add Media
                </Button>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="bg-white text-black hover:bg-gray-200 flex items-center gap-2 flex-1">
                  <Send className="h-4 w-4" />
                  Schedule Post
                </Button>
                <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-900">
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Posts */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Scheduled Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledPosts.map((post, index) => (
                  <div key={index} className="p-4 bg-black border border-gray-800 rounded-lg space-y-2">
                    <p className="text-white font-medium">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.time}
                      </span>
                      <span className="text-gray-500">{post.platform}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-gray-700 text-white hover:bg-gray-900 text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-gray-700 text-white hover:bg-gray-900 text-xs"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-900">
            View Calendar
          </Button>
          <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-900">
            Analytics
          </Button>
          <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-900">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
