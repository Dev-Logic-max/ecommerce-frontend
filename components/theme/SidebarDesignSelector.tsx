"use client"
import { useTheme } from "./AdminsThemeProvider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function SidebarDesignSelector() {
  const { sidebarDesign, setSidebarDesign, availableSidebarDesigns, sidebarDesignConfig, themeConfig } = useTheme()

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
          <span className="mr-2 text-lg">{sidebarDesignConfig.icon}</span>
          <span className="font-medium">{sidebarDesignConfig.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 p-2 bg-card border-border shadow-2xl backdrop-blur-lg"
        style={{
          backgroundColor: themeConfig.colors.card,
          borderColor: themeConfig.colors.border,
        }}
      >
        <div className="space-y-1">
          {Object.entries(availableSidebarDesigns).map(([key, designOption]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => setSidebarDesign(key)}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105",
                "border-2 border-transparent hover:border-primary/30",
                sidebarDesign === key && "border-primary/50 shadow-lg",
              )}
              style={{
                backgroundColor:
                  sidebarDesign === key
                    ? `${designOption.name === key ? themeConfig.colors.primary : "transparent"}15`
                    : "transparent",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{designOption.icon}</span>
                <span className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                  {designOption.label}
                </span>
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
        <div className="mt-3 pt-3 border-t text-center" style={{ borderColor: themeConfig.colors.border }}>
          <p className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
            Choose sidebar design
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
