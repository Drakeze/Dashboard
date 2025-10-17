import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Lock, Palette } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Manage your account preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center gap-3">
            <User className="h-5 w-5 text-gray-400" />
            <CardTitle className="text-white">Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-400">
                Username
              </Label>
              <Input
                id="username"
                placeholder="@username"
                className="bg-black border-gray-800 text-white placeholder:text-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-400">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="bg-black border-gray-800 text-white placeholder:text-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-400">
                Bio
              </Label>
              <Input
                id="bio"
                placeholder="Tell us about yourself"
                className="bg-black border-gray-800 text-white placeholder:text-gray-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center gap-3">
            <Bell className="h-5 w-5 text-gray-400" />
            <CardTitle className="text-white">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-gray-400 text-sm">Receive updates via email</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-gray-400 text-sm">Get notified about new activity</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Weekly Reports</p>
                <p className="text-gray-400 text-sm">Receive weekly analytics summary</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center gap-3">
            <Lock className="h-5 w-5 text-gray-400" />
            <CardTitle className="text-white">Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Private Account</p>
                <p className="text-gray-400 text-sm">Only approved followers can see your posts</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-gray-400 text-sm">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
            <div className="pt-2">
              <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-900">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center gap-3">
            <Palette className="h-5 w-5 text-gray-400" />
            <CardTitle className="text-white">Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-gray-400 text-sm">Currently enabled</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="bg-white text-black hover:bg-gray-200">Save Changes</Button>
          <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-900">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
