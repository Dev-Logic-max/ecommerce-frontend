// Theme configuration with enhanced RGBA color schemes and gradients
export interface ThemeColors {
  primary: string
  primaryHover: string
  secondary: string
  accent: string
  accentHover: string
  background: string
  foreground: string
  card: string
  cardHover: string
  muted: string
  border: string
  sidebar: string
  sidebarText: string
  sidebarBorder: string
  success: string
  warning: string
  danger: string
  info: string
}

export interface Theme {
  name: string
  label: string
  colors: ThemeColors
  gradient: string
  secondaryGradient: string
  textShadow: string
  icon: string
}

export interface SidebarDesign {
  name: string
  label: string
  icon: string
  className: string
}

export const sidebarDesigns: Record<string, SidebarDesign> = {
  modern: {
    name: "modern",
    label: "Modern",
    icon: "🎨",
    className: "sidebar-modern",
  },
  minimal: {
    name: "minimal",
    label: "Minimal",
    icon: "⚡",
    className: "sidebar-minimal",
  },
  glass: {
    name: "glass",
    label: "Glass",
    icon: "💎",
    className: "sidebar-glass",
  },
  icons: {
    name: "icons",
    label: "Icons",
    icon: "🖼️",
    className: "sidebar-icons",
  },
}

export const themes: Record<string, Theme> = {
  light: {
    name: "light",
    label: "Light",
    icon: "☀️",
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 1), rgba(168, 85, 247, 1), rgba(59, 130, 246, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(236, 72, 153, 1), rgba(251, 146, 60, 1))",
    textShadow: "0 2px 4px rgba(99, 102, 241, 0.3)",
    colors: {
      primary: "rgba(99, 102, 241, 1)",
      primaryHover: "rgba(99, 102, 241, 0.9)",
      secondary: "rgba(236, 72, 153, 1)",
      accent: "rgba(168, 85, 247, 1)",
      accentHover: "rgba(168, 85, 247, 0.9)",
      background: "rgba(255, 255, 255, 1)",
      foreground: "rgba(15, 23, 42, 1)",
      card: "rgba(255, 255, 255, 0.95)",
      cardHover: "rgba(248, 250, 252, 1)",
      muted: "rgba(248, 250, 252, 1)",
      border: "rgba(226, 232, 240, 1)",
      sidebar: "rgba(255, 255, 255, 0.98)",
      sidebarText: "rgba(15, 23, 42, 1)",
      sidebarBorder: "rgba(226, 232, 240, 0.5)",
      success: "rgba(34, 197, 94, 1)",
      warning: "rgba(251, 191, 36, 1)",
      danger: "rgba(239, 68, 68, 1)",
      info: "rgba(99, 102, 241, 1)",
    },
  },
  dark: {
    name: "dark",
    label: "Dark",
    icon: "🌙",
    gradient: "linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(59, 130, 246, 1), rgba(236, 72, 153, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(168, 85, 247, 1), rgba(59, 130, 246, 1))",
    textShadow: "0 2px 8px rgba(139, 92, 246, 0.5)",
    colors: {
      primary: "rgba(139, 92, 246, 1)",
      primaryHover: "rgba(139, 92, 246, 0.9)",
      secondary: "rgba(236, 72, 153, 1)",
      accent: "rgba(59, 130, 246, 1)",
      accentHover: "rgba(59, 130, 246, 0.9)",
      background: "rgba(3, 7, 18, 1)",
      foreground: "rgba(248, 250, 252, 1)",
      card: "rgba(15, 23, 42, 0.98)",
      cardHover: "rgba(30, 41, 59, 1)",
      muted: "rgba(30, 41, 59, 1)",
      border: "rgba(30, 41, 59, 0.8)",
      sidebar: "rgba(15, 23, 42, 0.98)",
      sidebarText: "rgba(248, 250, 252, 1)",
      sidebarBorder: "rgba(30, 41, 59, 0.5)",
      success: "rgba(34, 197, 94, 1)",
      warning: "rgba(251, 191, 36, 1)",
      danger: "rgba(239, 68, 68, 1)",
      info: "rgba(139, 92, 246, 1)",
    },
  },
  wooden: {
    name: "wooden",
    label: "Wooden",
    icon: "🌳",
    gradient: "linear-gradient(135deg, rgba(120, 53, 15, 1), rgba(194, 65, 12, 1), rgba(251, 146, 60, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(194, 65, 12, 1), rgba(251, 191, 36, 1))",
    textShadow: "0 2px 4px rgba(120, 53, 15, 0.4)",
    colors: {
      primary: "rgba(120, 53, 15, 1)",
      primaryHover: "rgba(120, 53, 15, 0.9)",
      secondary: "rgba(194, 65, 12, 1)",
      accent: "rgba(251, 146, 60, 1)",
      accentHover: "rgba(251, 146, 60, 0.9)",
      background: "rgba(245, 240, 230, 1)",
      foreground: "rgba(120, 53, 15, 1)",
      card: "rgba(235, 225, 210, 0.95)",
      cardHover: "rgba(245, 235, 220, 1)",
      muted: "rgba(245, 235, 220, 1)",
      border: "rgba(194, 154, 108, 0.5)",
      sidebar: "rgba(245, 240, 230, 0.98)",
      sidebarText: "rgba(120, 53, 15, 1)",
      sidebarBorder: "rgba(194, 154, 108, 0.3)",
      success: "rgba(34, 197, 94, 1)",
      warning: "rgba(251, 191, 36, 1)",
      danger: "rgba(239, 68, 68, 1)",
      info: "rgba(120, 53, 15, 1)",
    },
  },
  metallic: {
    name: "metallic",
    label: "Metallic",
    icon: "⚡",
    gradient: "linear-gradient(145deg, rgba(71, 85, 105, 1), rgba(100, 116, 139, 1), rgba(148, 163, 184, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(100, 116, 139, 1), rgba(148, 163, 184, 1))",
    textShadow: "0 2px 6px rgba(71, 85, 105, 0.6)",
    colors: {
      primary: "rgba(100, 116, 139, 1)",
      primaryHover: "rgba(100, 116, 139, 0.9)",
      secondary: "rgba(148, 163, 184, 1)",
      accent: "rgba(71, 85, 105, 1)",
      accentHover: "rgba(71, 85, 105, 0.9)",
      background: "rgba(30, 41, 59, 1)",
      foreground: "rgba(203, 213, 225, 1)",
      card: "rgba(51, 65, 85, 0.95)",
      cardHover: "rgba(40, 50, 70, 1)",
      muted: "rgba(40, 50, 70, 1)",
      border: "rgba(71, 85, 105, 0.6)",
      sidebar: "rgba(30, 41, 59, 0.98)",
      sidebarText: "rgba(203, 213, 225, 1)",
      sidebarBorder: "rgba(71, 85, 105, 0.5)",
      success: "rgba(34, 197, 94, 1)",
      warning: "rgba(251, 191, 36, 1)",
      danger: "rgba(239, 68, 68, 1)",
      info: "rgba(100, 116, 139, 1)",
    },
  },
  ice: {
    name: "ice",
    label: "Ice",
    icon: "❄️",
    gradient: "linear-gradient(135deg, rgba(14, 165, 233, 1), rgba(6, 182, 212, 1), rgba(125, 211, 252, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(6, 182, 212, 1), rgba(125, 211, 252, 1))",
    textShadow: "0 2px 6px rgba(14, 165, 233, 0.4)",
    colors: {
      primary: "rgba(14, 165, 233, 1)",
      primaryHover: "rgba(14, 165, 233, 0.9)",
      secondary: "rgba(125, 211, 252, 1)",
      accent: "rgba(6, 182, 212, 1)",
      accentHover: "rgba(6, 182, 212, 0.9)",
      background: "rgba(240, 249, 255, 1)",
      foreground: "rgba(14, 165, 233, 1)",
      card: "rgba(224, 242, 254, 0.95)",
      cardHover: "rgba(230, 245, 255, 1)",
      muted: "rgba(230, 245, 255, 1)",
      border: "rgba(125, 211, 252, 0.5)",
      sidebar: "rgba(240, 249, 255, 0.98)",
      sidebarText: "rgba(14, 165, 233, 1)",
      sidebarBorder: "rgba(125, 211, 252, 0.4)",
      success: "rgba(34, 197, 94, 1)",
      warning: "rgba(251, 191, 36, 1)",
      danger: "rgba(239, 68, 68, 1)",
      info: "rgba(14, 165, 233, 1)",
    },
  },
  sunset: {
    name: "sunset",
    label: "Sunset",
    icon: "🌅",
    gradient: "linear-gradient(135deg, rgba(251, 146, 60, 1), rgba(239, 68, 68, 1), rgba(236, 72, 153, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(239, 68, 68, 1), rgba(236, 72, 153, 1))",
    textShadow: "0 2px 6px rgba(251, 146, 60, 0.5)",
    colors: {
      primary: "rgba(251, 146, 60, 1)",
      primaryHover: "rgba(251, 146, 60, 0.9)",
      secondary: "rgba(236, 72, 153, 1)",
      accent: "rgba(239, 68, 68, 1)",
      accentHover: "rgba(239, 68, 68, 0.9)",
      background: "rgba(255, 251, 235, 1)",
      foreground: "rgba(124, 45, 18, 1)",
      card: "rgba(254, 243, 199, 0.95)",
      cardHover: "rgba(253, 230, 138, 1)",
      muted: "rgba(253, 230, 138, 1)",
      border: "rgba(251, 191, 36, 0.5)",
      sidebar: "rgba(255, 251, 235, 0.98)",
      sidebarText: "rgba(124, 45, 18, 1)",
      sidebarBorder: "rgba(251, 191, 36, 0.3)",
      success: "rgba(34, 197, 94, 1)",
      warning: "rgba(251, 191, 36, 1)",
      danger: "rgba(239, 68, 68, 1)",
      info: "rgba(251, 146, 60, 1)",
    },
  },
  ocean: {
    name: "ocean",
    label: "Ocean",
    icon: "🌊",
    gradient: "linear-gradient(135deg, rgba(6, 182, 212, 1), rgba(59, 130, 246, 1), rgba(139, 92, 246, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(59, 130, 246, 1), rgba(139, 92, 246, 1))",
    textShadow: "0 2px 6px rgba(6, 182, 212, 0.4)",
    colors: {
      primary: "rgba(6, 182, 212, 1)",
      primaryHover: "rgba(6, 182, 212, 0.9)",
      secondary: "rgba(139, 92, 246, 1)",
      accent: "rgba(59, 130, 246, 1)",
      accentHover: "rgba(59, 130, 246, 0.9)",
      background: "rgba(236, 254, 255, 1)",
      foreground: "rgba(22, 78, 99, 1)",
      card: "rgba(207, 250, 254, 0.95)",
      cardHover: "rgba(165, 243, 252, 1)",
      muted: "rgba(165, 243, 252, 1)",
      border: "rgba(103, 232, 249, 0.5)",
      sidebar: "rgba(236, 254, 255, 0.98)",
      sidebarText: "rgba(22, 78, 99, 1)",
      sidebarBorder: "rgba(103, 232, 249, 0.3)",
      success: "rgba(34, 197, 94, 1)",
      warning: "rgba(251, 191, 36, 1)",
      danger: "rgba(239, 68, 68, 1)",
      info: "rgba(6, 182, 212, 1)",
    },
  },
  forest: {
    name: "forest",
    label: "Forest",
    icon: "🌲",
    gradient: "linear-gradient(135deg, rgba(34, 197, 94, 1), rgba(22, 163, 74, 1), rgba(101, 163, 13, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(22, 163, 74, 1), rgba(101, 163, 13, 1))",
    textShadow: "0 2px 6px rgba(34, 197, 94, 0.4)",
    colors: {
      primary: "rgba(34, 197, 94, 1)",
      primaryHover: "rgba(34, 197, 94, 0.9)",
      secondary: "rgba(101, 163, 13, 1)",
      accent: "rgba(22, 163, 74, 1)",
      accentHover: "rgba(22, 163, 74, 0.9)",
      background: "rgba(240, 253, 244, 1)",
      foreground: "rgba(20, 83, 45, 1)",
      card: "rgba(220, 252, 231, 0.95)",
      cardHover: "rgba(187, 247, 208, 1)",
      muted: "rgba(187, 247, 208, 1)",
      border: "rgba(134, 239, 172, 0.5)",
      sidebar: "rgba(240, 253, 244, 0.98)",
      sidebarText: "rgba(20, 83, 45, 1)",
      sidebarBorder: "rgba(134, 239, 172, 0.3)",
      success: "rgba(34, 197, 94, 1)",
      warning: "rgba(251, 191, 36, 1)",
      danger: "rgba(239, 68, 68, 1)",
      info: "rgba(34, 197, 94, 1)",
    },
  },
  royal: {
    name: "royal",
    label: "Royal",
    icon: "👑",
    gradient: "linear-gradient(135deg, rgba(147, 51, 234, 1), rgba(126, 34, 206, 1), rgba(168, 85, 247, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(126, 34, 206, 1), rgba(168, 85, 247, 1))",
    textShadow: "0 2px 8px rgba(147, 51, 234, 0.5)",
    colors: {
      primary: "rgba(147, 51, 234, 1)",
      primaryHover: "rgba(147, 51, 234, 0.9)",
      secondary: "rgba(168, 85, 247, 1)",
      accent: "rgba(126, 34, 206, 1)",
      accentHover: "rgba(126, 34, 206, 0.9)",
      background: "rgba(250, 245, 255, 1)",
      foreground: "rgba(88, 28, 135, 1)",
      card: "rgba(243, 232, 255, 0.95)",
      cardHover: "rgba(233, 213, 255, 1)",
      muted: "rgba(233, 213, 255, 1)",
      border: "rgba(196, 181, 253, 0.5)",
      sidebar: "rgba(250, 245, 255, 0.98)",
      sidebarText: "rgba(88, 28, 135, 1)",
      sidebarBorder: "rgba(196, 181, 253, 0.3)",
      success: "rgba(34, 197, 94, 1)",
      warning: "rgba(251, 191, 36, 1)",
      danger: "rgba(239, 68, 68, 1)",
      info: "rgba(147, 51, 234, 1)",
    },
  },
}

export const defaultTheme = "light"
export const defaultSidebarDesign = "modern"
