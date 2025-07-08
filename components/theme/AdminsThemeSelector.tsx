"use client"
import { useTheme } from "./AdminsThemeProvider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function AdminsThemeSelector() {
  const { theme, setTheme, availableThemes, themeConfig } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-transparent"
          style={{
            borderColor: themeConfig.colors.primary,
            background: `linear-gradient(135deg, ${themeConfig.colors.primary}15, ${themeConfig.colors.accent}10)`,
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
        className="w-64 p-2 bg-card border-border shadow-2xl backdrop-blur-lg"
        style={{
          backgroundColor: themeConfig.colors.card,
          borderColor: themeConfig.colors.border,
        }}
      >
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(availableThemes).map(([key, themeOption]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => setTheme(key)}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105",
                "border-2 border-transparent hover:border-primary/30",
                theme === key && "border-primary/50 shadow-lg",
              )}
              style={{
                backgroundColor: theme === key ? `${themeOption.colors.primary}15` : "transparent",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center text-lg shadow-md transition-transform duration-200 hover:scale-110"
                style={{
                  background: themeOption.gradient,
                  color: "white",
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
        <div className="mt-3 pt-3 border-t text-center" style={{ borderColor: themeConfig.colors.border }}>
          <p className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
            Choose your preferred theme
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
