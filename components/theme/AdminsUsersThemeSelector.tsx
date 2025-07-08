"use client"

import { useAdminTheme } from "./AdminsUsersThemeProvider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function AdminsUsersThemeSelector() {
  const { theme, setTheme, availableThemes, themeConfig, sidebarDesign, setSidebarDesign, availableSidebarDesigns } =
    useAdminTheme()

  return (
    <div className="flex items-center gap-2">
      {/* Theme Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="relative overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-transparent"
            style={{
              borderColor: themeConfig.colors.primary,
              background: `linear-gradient(135deg, ${themeConfig.colors.primaryLight}, ${themeConfig.colors.accentLight})`,
              color: themeConfig.colors.foreground,
            }}
          >
            <span className="mr-2 text-lg">{themeConfig.icon}</span>
            <span className="font-medium">{themeConfig.label}</span>
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ background: themeConfig.gradient }}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-80 p-3 shadow-2xl backdrop-blur-lg border-2"
          style={{
            backgroundColor: themeConfig.colors.card,
            borderColor: themeConfig.colors.border,
          }}
        >
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2" style={{ color: themeConfig.colors.foreground }}>
              🎨 Choose Theme
            </h3>
            <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
              Select your preferred color scheme
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {Object.entries(availableThemes).map(([key, themeOption]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => setTheme(key)}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105",
                  "border-2 border-transparent hover:border-primary/30",
                  theme === key && "border-primary/50 shadow-lg scale-105",
                )}
                style={{
                  backgroundColor: theme === key ? `${themeOption.colors.primary}15` : "transparent",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl mb-2 flex items-center justify-center text-xl shadow-lg transition-transform duration-200 hover:scale-110"
                  style={{
                    background: themeOption.gradient,
                    color: "white",
                    boxShadow: themeOption.boxShadow,
                  }}
                >
                  {themeOption.icon}
                </div>
                <span className="text-xs font-medium text-center" style={{ color: themeConfig.colors.foreground }}>
                  {themeOption.label}
                </span>
                {theme === key && (
                  <Badge
                    className="mt-1 text-xs px-2 py-0.5"
                    style={{
                      backgroundColor: themeOption.colors.primary,
                      color: "white",
                    }}
                  >
                    Active
                  </Badge>
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sidebar Design Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="relative overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-transparent"
            style={{
              borderColor: themeConfig.colors.secondary,
              background: `linear-gradient(135deg, ${themeConfig.colors.secondary}15, ${themeConfig.colors.primary}10)`,
              color: themeConfig.colors.foreground,
            }}
          >
            <span className="mr-2 text-lg">{availableSidebarDesigns[sidebarDesign].icon}</span>
            <span className="font-medium">{availableSidebarDesigns[sidebarDesign].label}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 p-3 shadow-2xl backdrop-blur-lg border-2"
          style={{
            backgroundColor: themeConfig.colors.card,
            borderColor: themeConfig.colors.border,
          }}
        >
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2" style={{ color: themeConfig.colors.foreground }}>
              🎯 Sidebar Style
            </h3>
            <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
              Choose your sidebar design
            </p>
          </div>

          <div className="space-y-2">
            {Object.entries(availableSidebarDesigns).map(([key, designOption]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => setSidebarDesign(key)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02]",
                  "border-2 border-transparent hover:border-primary/30",
                  sidebarDesign === key && "border-primary/50 shadow-lg",
                )}
                style={{
                  backgroundColor: sidebarDesign === key ? `${themeConfig.colors.primary}15` : "transparent",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{designOption.icon}</span>
                  <div>
                    <span className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                      {designOption.label}
                    </span>
                    <p className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      {designOption.description}
                    </p>
                  </div>
                </div>
                {sidebarDesign === key && (
                  <Badge
                    className="text-xs px-2 py-0.5"
                    style={{
                      backgroundColor: themeConfig.colors.primary,
                      color: "white",
                    }}
                  >
                    Active
                  </Badge>
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
