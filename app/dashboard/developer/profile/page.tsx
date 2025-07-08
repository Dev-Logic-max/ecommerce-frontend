"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  FiCamera,
  FiEdit2,
  FiLock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiUser,
  FiShield,
  FiKey,
  FiSettings,
  FiEyeOff,
  FiEye,
  FiX,
} from "react-icons/fi"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/theme/AdminsThemeProvider"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { toast } from "react-toastify"
import authApi from "@/lib/api/auth"
import { useAuth } from "@/app/hooks/useAuth"

interface User {
  id: number;
  username: string;
  email: string | null;
  phone: string | null;
  profilePicturePath: string | null;
  role: { id: number; name: string };
  profile: Profile | null;
  createdAt: string;
  stats?: {
    projectsCompleted: number;
    codeCommits: number;
    bugsFixed: number;
    uptime: number;
  };
}

interface Profile {
  id: number;
  userId: number;
  name: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ProfileDto {
  name?: string;
  address?: string;
  city?: string;
  country?: string;
}

interface UpdateUserDto {
  username?: string;
  email?: string;
  phone?: string;
  profile?: ProfileDto;
}

// Mock user data
const mockUser = {
  id: 1,
  username: "admin",
  email: "admin@example.com",
  phone: "+1 (555) 123-4567",
  profilePicture: null,
  role: { id: 1, name: "Developer" },
  profile: {
    name: "Admin User",
    address: "123 Tech Street",
    city: "San Francisco",
    country: "USA",
  },
  createdAt: "2023-01-01",
  stats: {
    projectsCompleted: 47,
    codeCommits: 1234,
    bugsFixed: 89,
    uptime: 99.8,
  },
}

export default function ProfilePage() {
  const [developerUser, setDeveloperUser] = useState<User | null>(null)
  const [users, setUser] = useState(mockUser)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: developerUser?.profile?.name || "",
    email: developerUser?.email || "",
    phone: developerUser?.phone || "",
    address: developerUser?.profile?.address || "",
    city: developerUser?.profile?.city || "",
    country: developerUser?.profile?.country || "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [preferences, setPreferences] = useState([
    { title: "Email Notifications", description: "Receive email updates", enabled: true },
    { title: "Push Notifications", description: "Browser notifications", enabled: true },
    { title: "Dark Mode", description: "Use dark theme", enabled: false },
    { title: "Auto Save", description: "Automatically save changes", enabled: false },
  ]);

  const { themeConfig } = useTheme()

  const { user } = useAuth()
  console.log("Hello this is user", user)
  const userId = user?.id
  const id = userId
  console.log("ID:", id)

  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for resetting file input

  useEffect(() => {
    if (user?.id) {
      fetchDeveloperUser(user.id);
    }
  }, [user])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (developerUser) {
      setFormData({
        name: developerUser.profile?.name || "",
        email: developerUser.email || "",
        phone: developerUser.phone || "",
        address: developerUser.profile?.address || "",
        city: developerUser.profile?.city || "",
        country: developerUser.profile?.country || "",
      });
    }
  }, [developerUser]);

  console.log("Developer User", developerUser)

  const fetchDeveloperUser = async (id: number) => {
    try {
      if (!id) throw new Error('User ID is undefined');
      if (!id) console.log('User ID is undefined', id);
      console.log("User ID", id)
      const response = await authApi.getDeveloperUser(id);
      setDeveloperUser(response.data || null);
    } catch (error) {
      toast.error('Failed to fetch developer User profile!');
      setDeveloperUser(null);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSaveProfile = async () => {
    try {
      const updateDto: UpdateUserDto = {
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        profile: {
          name: formData.name || undefined,
          address: formData.address || undefined,
          city: formData.city || undefined,
          country: formData.country || undefined,
        },
      };
      const response = await authApi.updateUser(updateDto);
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        fetchDeveloperUser(userId!);
        setEditMode(false);
      }
    } catch (error) {
      toast.error("Failed to update profile!");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    try {
      const response = await authApi.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setEditMode(false);
      }
    } catch (error) {
      toast.error("Failed to update password! Check current password.");
    }
  }

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 10 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        toast.error("File size exceeds 10MB limit!");
        return;
      }
      const formData = new FormData();
      formData.append('profilePicture', file); // Matches 'profilePicture' in FileInterceptor
      try {
        const response = await authApi.uploadAvatar(formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.status === 200) {
          toast.success("Avatar updated successfully!");
          fetchDeveloperUser(userId!);
          setEditMode(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset input for subsequent uploads
          }
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to update avatar!");
      }
    }
  };

  const togglePasswordVisibility = (fieldId: string) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId as keyof typeof prev],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 space-y-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="md:col-span-2 h-96 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <h1
            className="text-4xl font-bold tracking-tight text-shadow gradient-text"
            style={{
              textShadow: themeConfig.textShadow,
            }}
          >
            My Profile
          </h1>
          <p className="text-lg opacity-80" style={{ color: themeConfig.colors.foreground }}>
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {!editMode ? (
            <Button
              onClick={() => setEditMode(true)}
              size="lg"
              className="transition-all duration-300 hover:scale-105 hover:shadow-lg bg-transparent"
              style={{
                borderColor: themeConfig.colors.border,
                color: themeConfig.colors.foreground,
              }}
              variant="outline"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.primary}15, ${themeConfig.colors.accent}10)`
                e.currentTarget.style.borderColor = themeConfig.colors.primary
                e.currentTarget.style.color = themeConfig.colors.primary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.borderColor = themeConfig.colors.border
                e.currentTarget.style.color = themeConfig.colors.foreground
              }}
            >
              <FiEdit2 className="mr-2 h-5 w-5" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSaveProfile}
                size="lg"
                className="transition-all duration-300 hover:scale-105 hover:shadow-xl text-white font-semibold btn-gradient"
                style={{
                  background: themeConfig.gradient,
                }}
              >
                <FiSave className="mr-2 h-5 w-5" />
                Save Changes
              </Button>
              <Button
                onClick={() => setEditMode(false)}
                size="lg"
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg bg-transparent"
                style={{
                  borderColor: themeConfig.colors.danger,
                  color: themeConfig.colors.danger,
                }}
                variant="outline"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.danger}15, ${themeConfig.colors.danger}10)`;
                  e.currentTarget.style.borderColor = themeConfig.colors.danger;
                  e.currentTarget.style.color = themeConfig.colors.foreground;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = themeConfig.colors.danger;
                  e.currentTarget.style.color = themeConfig.colors.danger;
                }}
              >
                <FiX className="mr-2 h-5 w-5" />
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card
          className="shadow-xl border-2 card-hover"
          style={{
            backgroundColor: themeConfig.colors.card,
            borderColor: themeConfig.colors.border,
            background: `linear-gradient(135deg, ${themeConfig.colors.card}, ${themeConfig.colors.cardHover})`,
          }}
        >
          <CardHeader className="text-center">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4" style={{ borderColor: themeConfig.colors.primary }}>
                  <AvatarImage
                    // src={
                    //   developerUser?.profilePicturePath ||
                    //   `/placeholder.svg?height=96&width=96&text=${developerUser?.username.charAt(0).toUpperCase()}`
                    // }
                    className="debug-image" // Temporary for debugging
                    // e.g., http://localhost:3030/uploads/avatars/...
                    src={
                      developerUser?.profilePicturePath
                        ? `${process.env.NEXT_PUBLIC_AVATAR_URL}${developerUser.profilePicturePath}`
                        : `/placeholder.svg?height=96&width=96&text=${developerUser?.username.charAt(0).toUpperCase()}`
                    }
                    alt={developerUser?.username || "User"}
                  />
                  <AvatarFallback
                    className="text-2xl font-bold"
                    style={{
                      background: themeConfig.gradient,
                      color: "white",
                    }}
                  >
                    {developerUser?.username.charAt(0).toUpperCase() || "-"}
                  </AvatarFallback>
                </Avatar>
                {editMode && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadAvatar}
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full opacity-0 cursor-pointer"
                      id="avatar-upload"
                    />
                  </>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-lg bg-transparent"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.primary,
                  }}
                  disabled={!editMode}
                  onClick={() => document.getElementById("avatar-upload")?.click()}
                >
                  <FiCamera className="h-4 w-4" style={{ color: themeConfig.colors.primary }} />
                </Button>
              </div>
            </div>
            <CardTitle
              className="mt-4 text-shadow"
              style={{ color: themeConfig.colors.foreground, textShadow: themeConfig.textShadow }}
            >
              {developerUser?.profile?.name || "------"}
            </CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
              <Badge
                className="font-bold"
                style={{
                  background: themeConfig.gradient,
                  color: "white",
                }}
              >
                {developerUser?.role?.name}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { icon: FiUser, label: "Username", value: developerUser?.username || "------" },
                { icon: FiMail, label: "Email", value: developerUser?.email || "------" },
                { icon: FiPhone, label: "Phone", value: developerUser?.phone || "------" },
                { icon: FiMapPin, label: "Location", value: `${developerUser?.profile?.city || "---"}, ${developerUser?.profile?.country || "---"}` },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center h-10 w-10 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.primary}20, ${themeConfig.colors.accent}15)`,
                    }}
                  >
                    <item.icon className="h-5 w-5" style={{ color: themeConfig.colors.primary }} />
                  </div>
                  <div>
                    <div className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      {item.label}
                    </div>
                    <div className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-6 pt-6 border-t" style={{ borderColor: themeConfig.colors.border }}>
              <h4 className="font-semibold mb-4 text-shadow" style={{ color: themeConfig.colors.foreground }}>
                Developer Stats
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Projects", value: users.stats.projectsCompleted, icon: "🚀" },
                  { label: "Commits", value: users.stats.codeCommits, icon: "💻" },
                  { label: "Bugs Fixed", value: users.stats.bugsFixed, icon: "🐛" },
                  { label: "Uptime", value: `${users.stats.uptime}%`, icon: "⚡" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-3 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.primary}10, ${themeConfig.colors.accent}05)`,
                    }}
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-lg font-bold" style={{ color: themeConfig.colors.foreground }}>
                      {stat.value}
                    </div>
                    <div className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-xs opacity-70 w-full text-center" style={{ color: themeConfig.colors.foreground }}>
              Member since {new Date(developerUser?.createdAt || "------").toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>

        {/* Profile Details */}
        <Card
          className="shadow-xl md:col-span-2 border-2"
          style={{
            backgroundColor: themeConfig.colors.card,
            borderColor: themeConfig.colors.border,
          }}
        >
          <CardHeader>
            <CardTitle
              className="text-shadow"
              style={{ color: themeConfig.colors.foreground, textShadow: themeConfig.textShadow }}
            >
              Account Settings
            </CardTitle>
            <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
              Manage your account information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="space-y-4">
              <TabsList
                className="grid w-full grid-cols-3 p-1 rounded-xl"
                style={{
                  backgroundColor: themeConfig.colors.muted,
                }}
              >
                {[
                  { value: "profile", label: "Profile", icon: FiUser },
                  { value: "security", label: "Security", icon: FiLock },
                  { value: "preferences", label: "Preferences", icon: FiSettings },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="transition-all duration-300 rounded-lg font-medium tab-hover data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]"
                  >
                    <tab.icon className="mr-2 h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="profile">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "name", label: "Full Name", name: "name", type: "text" },
                      { id: "email", label: "Email", name: "email", type: "email" },
                      { id: "phone", label: "Phone", name: "phone", type: "tel" },
                      { id: "address", label: "Address", name: "address", type: "text" },
                      { id: "city", label: "City", name: "city", type: "text" },
                      { id: "country", label: "Country", name: "country", type: "text" },
                    ].map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id} style={{ color: themeConfig.colors.foreground }}>
                          {field.label}
                        </Label>
                        <Input
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className={cn("transition-all duration-200 border-2", !editMode && "opacity-70")}
                          style={{
                            backgroundColor: editMode ? themeConfig.colors.background : themeConfig.colors.muted,
                            borderColor: themeConfig.colors.border,
                            color: themeConfig.colors.foreground,
                          }}
                          onFocus={(e) => {
                            if (editMode) {
                              e.target.style.borderColor = themeConfig.colors.primary
                              e.target.style.boxShadow = `0 0 0 3px ${themeConfig.colors.primary}20`
                            }
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = themeConfig.colors.border
                            e.target.style.boxShadow = "none"
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Activity Progress */}
                  <div className="mt-8">
                    <h4 className="font-semibold mb-4 text-shadow" style={{ color: themeConfig.colors.foreground }}>
                      Profile Completion
                    </h4>
                    <div className="space-y-3">
                      {[
                        { label: "Basic Information", progress: formData.name ? 100 : 0 },
                        { label: "Contact Details", progress: (formData.email || formData.phone) ? 100 : 85 },
                        { label: "Security Settings", progress: (formData.address || formData.city || formData.country) ? 100 : 70 },
                        { label: "Preferences", progress: 45 },
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span style={{ color: themeConfig.colors.foreground }}>{item.label}</span>
                            <span style={{ color: themeConfig.colors.foreground }}>{item.progress}%</span>
                          </div>
                          <Progress
                            value={item.progress}
                            className="h-2"
                            style={{
                              backgroundColor: `${themeConfig.colors.muted}50`,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-shadow" style={{ color: themeConfig.colors.foreground }}>
                      Change Password
                    </h3>
                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      Update your password to keep your account secure
                    </p>
                  </div>

                  <Separator style={{ backgroundColor: themeConfig.colors.border }} />

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    {[
                      { id: "currentPassword", label: "Current Password", type: "password" },
                      { id: "newPassword", label: "New Password", type: "password" },
                      { id: "confirmPassword", label: "Confirm New Password", type: "password" },
                    ].map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id} style={{ color: themeConfig.colors.foreground }}>
                          {field.label}
                        </Label>
                        <div className="flex items-center">
                          <Input
                            id={field.id}
                            name={field.id}
                            type={passwordVisible[field.id as keyof typeof passwordVisible] ? "text" : "password"}
                            value={passwordData[field.id as keyof typeof passwordData] || ""}
                            onChange={handlePasswordChange}
                            required
                            disabled={!editMode}
                            className="border-2"
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.foreground,
                            }}
                            onFocus={(e) => {
                              if (editMode) {
                                e.target.style.borderColor = themeConfig.colors.primary;
                                e.target.style.boxShadow = `0 0 0 3px ${themeConfig.colors.primary}20`;
                              }
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = themeConfig.colors.border;
                              e.target.style.boxShadow = "none";
                            }}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="ml-2 h-10 w-10"
                            onClick={() => togglePasswordVisibility(field.id)}
                            style={{ color: themeConfig.colors.foreground }}
                          >
                            {passwordVisible[field.id as keyof typeof passwordVisible] ? (
                              <FiEye className="h-5 w-5" />
                            ) : (
                              <FiEyeOff className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="submit"
                      className="btn-gradient"
                      style={{
                        background: themeConfig.gradient,
                        color: "white",
                      }}
                      disabled={!editMode}
                    >
                      <FiKey className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </form>

                  <Separator style={{ backgroundColor: themeConfig.colors.border }} />

                  <div>
                    <h3 className="text-lg font-medium text-shadow" style={{ color: themeConfig.colors.foreground }}>
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      Add an extra layer of security to your account
                    </p>

                    <div className="mt-4 flex gap-3">
                      <Button
                        variant="outline"
                        className="transition-all duration-200 bg-transparent"
                        style={{
                          borderColor: themeConfig.colors.border,
                          color: themeConfig.colors.foreground,
                        }}
                      // disabled={!editMode}
                      >
                        <FiShield className="mr-2 h-4 w-4" />
                        Enable 2FA
                      </Button>
                      <Button
                        variant="outline"
                        className="transition-all duration-200 bg-transparent"
                        style={{
                          borderColor: themeConfig.colors.border,
                          color: themeConfig.colors.foreground,
                        }}
                      // disabled={!editMode}
                      >
                        <FiKey className="mr-2 h-4 w-4" />
                        Backup Codes
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preferences">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-shadow" style={{ color: themeConfig.colors.foreground }}>
                      Application Preferences
                    </h3>
                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      Customize your dashboard experience
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {
                    // [
                    //   { title: "Email Notifications", description: "Receive email updates", enabled: true },
                    //   { title: "Push Notifications", description: "Browser notifications", enabled: false },
                    //   { title: "Dark Mode", description: "Use dark theme", enabled: false },
                    //   { title: "Auto Save", description: "Automatically save changes", enabled: true },
                    // ]
                    preferences.map((pref, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-lg"
                        style={{
                          backgroundColor: themeConfig.colors.card,
                          borderColor: themeConfig.colors.border,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                              {pref.title}
                            </h4>
                            <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                              {pref.description}
                            </p>
                          </div>
                          <div
                            className={cn(
                              "w-12 h-6 rounded-full transition-all duration-200 cursor-pointer",
                              pref.enabled ? "bg-primary" : "bg-muted",
                            )}
                            style={{
                              backgroundColor: pref.enabled ? themeConfig.colors.primary : themeConfig.colors.muted,
                            }}
                            onClick={() => {
                              // Toggle the enabled state (simulated for now, update backend/API as needed)
                              const updatedPrefs = [...preferences]; // Assume preferences state
                              updatedPrefs[index].enabled = !pref.enabled;
                              setPreferences(updatedPrefs); // Update state
                              // Add API call here to save preference (e.g., authApi.updatePreferences(updatedPrefs))
                            }}
                          >
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full bg-white transition-all duration-200 mt-0.5",
                                pref.enabled ? "ml-6" : "ml-0.5",
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div >
    </div >
  )
}
