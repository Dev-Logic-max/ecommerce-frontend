// Enhanced theme configuration for admin users with ultra-attractive designs
export interface AdminThemeColors {
  primary: string
  primaryHover: string
  primaryLight: string
  primaryDark: string
  secondary: string
  secondaryHover: string
  accent: string
  accentHover: string
  accentLight: string
  background: string
  backgroundSecondary: string
  foreground: string
  foregroundSecondary: string
  card: string
  cardHover: string
  cardSecondary: string
  muted: string
  mutedHover: string
  border: string
  borderHover: string
  sidebar: string
  sidebarHover: string
  sidebarText: string
  sidebarBorder: string
  success: string
  successLight: string
  warning: string
  warningLight: string
  danger: string
  dangerLight: string
  info: string
  infoLight: string
  purple: string
  pink: string
  orange: string
  teal: string
  cyan: string
  emerald: string
  rose: string
  violet: string
}

export interface AdminTheme {
  name: string
  label: string
  colors: AdminThemeColors
  gradient: string
  secondaryGradient: string
  tertiaryGradient: string
  textShadow: string
  boxShadow: string
  icon: string
  category: "light" | "dark" | "colorful" | "nature" | "premium"
}

export interface AdminSidebarDesign {
  name: string
  label: string
  icon: string
  className: string
  description: string
}

export const adminSidebarDesigns: Record<string, AdminSidebarDesign> = {
  modern: {
    name: "modern",
    label: "Modern",
    icon: "🎨",
    className: "sidebar-modern",
    description: "Clean and contemporary design",
  },
  minimal: {
    name: "minimal",
    label: "Minimal",
    icon: "⚡",
    className: "sidebar-minimal",
    description: "Simple and focused layout",
  },
  glass: {
    name: "glass",
    label: "Glass",
    icon: "💎",
    className: "sidebar-glass",
    description: "Glassmorphism effect",
  },
  neon: {
    name: "neon",
    label: "Neon",
    icon: "🌟",
    className: "sidebar-neon",
    description: "Vibrant neon styling",
  },
  gradient: {
    name: "gradient",
    label: "Gradient",
    icon: "🌈",
    className: "sidebar-gradient",
    description: "Beautiful gradient backgrounds",
  },
  premium: {
    name: "premium",
    label: "Premium",
    icon: "👑",
    className: "sidebar-premium",
    description: "Luxury premium design",
  },
}

export const adminThemes: Record<string, AdminTheme> = {
  light: {
    name: "light",
    label: "Light",
    icon: "☀️",
    category: "light",
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 1), rgba(168, 85, 247, 1), rgba(59, 130, 246, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(236, 72, 153, 1), rgba(251, 146, 60, 1))",
    tertiaryGradient: "linear-gradient(90deg, rgba(34, 197, 94, 1), rgba(59, 130, 246, 1))",
    textShadow: "0 2px 4px rgba(99, 102, 241, 0.3)",
    boxShadow: "0 10px 25px rgba(99, 102, 241, 0.15)",
    colors: {
      primary: "rgba(99, 102, 241, 1)",
      primaryHover: "rgba(99, 102, 241, 0.9)",
      primaryLight: "rgba(99, 102, 241, 0.1)",
      primaryDark: "rgba(79, 70, 229, 1)",
      secondary: "rgba(236, 72, 153, 1)",
      secondaryHover: "rgba(236, 72, 153, 0.9)",
      accent: "rgba(168, 85, 247, 1)",
      accentHover: "rgba(168, 85, 247, 0.9)",
      accentLight: "rgba(168, 85, 247, 0.1)",
      background: "rgba(255, 255, 255, 1)",
      backgroundSecondary: "rgba(248, 250, 252, 1)",
      foreground: "rgba(15, 23, 42, 1)",
      foregroundSecondary: "rgba(51, 65, 85, 1)",
      card: "rgba(255, 255, 255, 0.95)",
      cardHover: "rgba(248, 250, 252, 1)",
      cardSecondary: "rgba(241, 245, 249, 1)",
      muted: "rgba(248, 250, 252, 1)",
      mutedHover: "rgba(241, 245, 249, 1)",
      border: "rgba(226, 232, 240, 1)",
      borderHover: "rgba(203, 213, 225, 1)",
      sidebar: "rgba(255, 255, 255, 0.98)",
      sidebarHover: "rgba(248, 250, 252, 1)",
      sidebarText: "rgba(15, 23, 42, 1)",
      sidebarBorder: "rgba(226, 232, 240, 0.5)",
      success: "rgba(34, 197, 94, 1)",
      successLight: "rgba(34, 197, 94, 0.1)",
      warning: "rgba(251, 191, 36, 1)",
      warningLight: "rgba(251, 191, 36, 0.1)",
      danger: "rgba(239, 68, 68, 1)",
      dangerLight: "rgba(239, 68, 68, 0.1)",
      info: "rgba(99, 102, 241, 1)",
      infoLight: "rgba(99, 102, 241, 0.1)",
      purple: "rgba(147, 51, 234, 1)",
      pink: "rgba(236, 72, 153, 1)",
      orange: "rgba(251, 146, 60, 1)",
      teal: "rgba(20, 184, 166, 1)",
      cyan: "rgba(6, 182, 212, 1)",
      emerald: "rgba(16, 185, 129, 1)",
      rose: "rgba(244, 63, 94, 1)",
      violet: "rgba(139, 92, 246, 1)",
    },
  },
  dark: {
    name: "dark",
    label: "Dark",
    icon: "🌙",
    category: "dark",
    gradient: "linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(59, 130, 246, 1), rgba(236, 72, 153, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(168, 85, 247, 1), rgba(59, 130, 246, 1))",
    tertiaryGradient: "linear-gradient(90deg, rgba(34, 197, 94, 1), rgba(139, 92, 246, 1))",
    textShadow: "0 2px 8px rgba(139, 92, 246, 0.5)",
    boxShadow: "0 10px 25px rgba(139, 92, 246, 0.25)",
    colors: {
      primary: "rgba(139, 92, 246, 1)",
      primaryHover: "rgba(139, 92, 246, 0.9)",
      primaryLight: "rgba(139, 92, 246, 0.1)",
      primaryDark: "rgba(124, 58, 237, 1)",
      secondary: "rgba(236, 72, 153, 1)",
      secondaryHover: "rgba(236, 72, 153, 0.9)",
      accent: "rgba(59, 130, 246, 1)",
      accentHover: "rgba(59, 130, 246, 0.9)",
      accentLight: "rgba(59, 130, 246, 0.1)",
      background: "rgba(3, 7, 18, 1)",
      backgroundSecondary: "rgba(15, 23, 42, 1)",
      foreground: "rgba(248, 250, 252, 1)",
      foregroundSecondary: "rgba(203, 213, 225, 1)",
      card: "rgba(15, 23, 42, 0.98)",
      cardHover: "rgba(30, 41, 59, 1)",
      cardSecondary: "rgba(51, 65, 85, 1)",
      muted: "rgba(30, 41, 59, 1)",
      mutedHover: "rgba(51, 65, 85, 1)",
      border: "rgba(30, 41, 59, 0.8)",
      borderHover: "rgba(51, 65, 85, 1)",
      sidebar: "rgba(15, 23, 42, 0.98)",
      sidebarHover: "rgba(30, 41, 59, 1)",
      sidebarText: "rgba(248, 250, 252, 1)",
      sidebarBorder: "rgba(30, 41, 59, 0.5)",
      success: "rgba(34, 197, 94, 1)",
      successLight: "rgba(34, 197, 94, 0.1)",
      warning: "rgba(251, 191, 36, 1)",
      warningLight: "rgba(251, 191, 36, 0.1)",
      danger: "rgba(239, 68, 68, 1)",
      dangerLight: "rgba(239, 68, 68, 0.1)",
      info: "rgba(139, 92, 246, 1)",
      infoLight: "rgba(139, 92, 246, 0.1)",
      purple: "rgba(147, 51, 234, 1)",
      pink: "rgba(236, 72, 153, 1)",
      orange: "rgba(251, 146, 60, 1)",
      teal: "rgba(20, 184, 166, 1)",
      cyan: "rgba(6, 182, 212, 1)",
      emerald: "rgba(16, 185, 129, 1)",
      rose: "rgba(244, 63, 94, 1)",
      violet: "rgba(139, 92, 246, 1)",
    },
  },
  neon: {
    name: "neon",
    label: "Neon",
    icon: "🌟",
    category: "colorful",
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 1), rgba(168, 85, 247, 1), rgba(59, 130, 246, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(251, 146, 60, 1), rgba(236, 72, 153, 1))",
    tertiaryGradient: "linear-gradient(90deg, rgba(139, 92, 246, 1), rgba(236, 72, 153, 1))",
    textShadow: "0 0 10px rgba(236, 72, 153, 0.8)",
    boxShadow: "0 0 30px rgba(236, 72, 153, 0.3)",
    colors: {
      primary: "rgba(236, 72, 153, 1)",
      primaryHover: "rgba(236, 72, 153, 0.9)",
      primaryLight: "rgba(236, 72, 153, 0.1)",
      primaryDark: "rgba(219, 39, 119, 1)",
      secondary: "rgba(168, 85, 247, 1)",
      secondaryHover: "rgba(168, 85, 247, 0.9)",
      accent: "rgba(59, 130, 246, 1)",
      accentHover: "rgba(59, 130, 246, 0.9)",
      accentLight: "rgba(59, 130, 246, 0.1)",
      background: "rgba(3, 7, 18, 1)",
      backgroundSecondary: "rgba(15, 23, 42, 1)",
      foreground: "rgba(248, 250, 252, 1)",
      foregroundSecondary: "rgba(203, 213, 225, 1)",
      card: "rgba(15, 23, 42, 0.95)",
      cardHover: "rgba(30, 41, 59, 1)",
      cardSecondary: "rgba(51, 65, 85, 1)",
      muted: "rgba(30, 41, 59, 1)",
      mutedHover: "rgba(51, 65, 85, 1)",
      border: "rgba(236, 72, 153, 0.3)",
      borderHover: "rgba(236, 72, 153, 0.5)",
      sidebar: "rgba(15, 23, 42, 0.98)",
      sidebarHover: "rgba(30, 41, 59, 1)",
      sidebarText: "rgba(248, 250, 252, 1)",
      sidebarBorder: "rgba(236, 72, 153, 0.3)",
      success: "rgba(34, 197, 94, 1)",
      successLight: "rgba(34, 197, 94, 0.1)",
      warning: "rgba(251, 191, 36, 1)",
      warningLight: "rgba(251, 191, 36, 0.1)",
      danger: "rgba(239, 68, 68, 1)",
      dangerLight: "rgba(239, 68, 68, 0.1)",
      info: "rgba(236, 72, 153, 1)",
      infoLight: "rgba(236, 72, 153, 0.1)",
      purple: "rgba(147, 51, 234, 1)",
      pink: "rgba(236, 72, 153, 1)",
      orange: "rgba(251, 146, 60, 1)",
      teal: "rgba(20, 184, 166, 1)",
      cyan: "rgba(6, 182, 212, 1)",
      emerald: "rgba(16, 185, 129, 1)",
      rose: "rgba(244, 63, 94, 1)",
      violet: "rgba(139, 92, 246, 1)",
    },
  },
  ocean: {
    name: "ocean",
    label: "Ocean",
    icon: "🌊",
    category: "nature",
    gradient: "linear-gradient(135deg, rgba(6, 182, 212, 1), rgba(59, 130, 246, 1), rgba(139, 92, 246, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(20, 184, 166, 1), rgba(6, 182, 212, 1))",
    tertiaryGradient: "linear-gradient(90deg, rgba(59, 130, 246, 1), rgba(6, 182, 212, 1))",
    textShadow: "0 2px 6px rgba(6, 182, 212, 0.4)",
    boxShadow: "0 10px 25px rgba(6, 182, 212, 0.2)",
    colors: {
      primary: "rgba(6, 182, 212, 1)",
      primaryHover: "rgba(6, 182, 212, 0.9)",
      primaryLight: "rgba(6, 182, 212, 0.1)",
      primaryDark: "rgba(8, 145, 178, 1)",
      secondary: "rgba(139, 92, 246, 1)",
      secondaryHover: "rgba(139, 92, 246, 0.9)",
      accent: "rgba(59, 130, 246, 1)",
      accentHover: "rgba(59, 130, 246, 0.9)",
      accentLight: "rgba(59, 130, 246, 0.1)",
      background: "rgba(236, 254, 255, 1)",
      backgroundSecondary: "rgba(207, 250, 254, 1)",
      foreground: "rgba(22, 78, 99, 1)",
      foregroundSecondary: "rgba(14, 116, 144, 1)",
      card: "rgba(207, 250, 254, 0.95)",
      cardHover: "rgba(165, 243, 252, 1)",
      cardSecondary: "rgba(103, 232, 249, 0.3)",
      muted: "rgba(165, 243, 252, 1)",
      mutedHover: "rgba(103, 232, 249, 1)",
      border: "rgba(103, 232, 249, 0.5)",
      borderHover: "rgba(6, 182, 212, 0.5)",
      sidebar: "rgba(236, 254, 255, 0.98)",
      sidebarHover: "rgba(207, 250, 254, 1)",
      sidebarText: "rgba(22, 78, 99, 1)",
      sidebarBorder: "rgba(103, 232, 249, 0.3)",
      success: "rgba(34, 197, 94, 1)",
      successLight: "rgba(34, 197, 94, 0.1)",
      warning: "rgba(251, 191, 36, 1)",
      warningLight: "rgba(251, 191, 36, 0.1)",
      danger: "rgba(239, 68, 68, 1)",
      dangerLight: "rgba(239, 68, 68, 0.1)",
      info: "rgba(6, 182, 212, 1)",
      infoLight: "rgba(6, 182, 212, 0.1)",
      purple: "rgba(147, 51, 234, 1)",
      pink: "rgba(236, 72, 153, 1)",
      orange: "rgba(251, 146, 60, 1)",
      teal: "rgba(20, 184, 166, 1)",
      cyan: "rgba(6, 182, 212, 1)",
      emerald: "rgba(16, 185, 129, 1)",
      rose: "rgba(244, 63, 94, 1)",
      violet: "rgba(139, 92, 246, 1)",
    },
  },
  sunset: {
    name: "sunset",
    label: "Sunset",
    icon: "🌅",
    category: "nature",
    gradient: "linear-gradient(135deg, rgba(251, 146, 60, 1), rgba(239, 68, 68, 1), rgba(236, 72, 153, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(239, 68, 68, 1), rgba(236, 72, 153, 1))",
    tertiaryGradient: "linear-gradient(90deg, rgba(251, 146, 60, 1), rgba(239, 68, 68, 1))",
    textShadow: "0 2px 6px rgba(251, 146, 60, 0.5)",
    boxShadow: "0 10px 25px rgba(251, 146, 60, 0.2)",
    colors: {
      primary: "rgba(251, 146, 60, 1)",
      primaryHover: "rgba(251, 146, 60, 0.9)",
      primaryLight: "rgba(251, 146, 60, 0.1)",
      primaryDark: "rgba(234, 88, 12, 1)",
      secondary: "rgba(236, 72, 153, 1)",
      secondaryHover: "rgba(236, 72, 153, 0.9)",
      accent: "rgba(239, 68, 68, 1)",
      accentHover: "rgba(239, 68, 68, 0.9)",
      accentLight: "rgba(239, 68, 68, 0.1)",
      background: "rgba(255, 251, 235, 1)",
      backgroundSecondary: "rgba(254, 243, 199, 1)",
      foreground: "rgba(124, 45, 18, 1)",
      foregroundSecondary: "rgba(154, 52, 18, 1)",
      card: "rgba(254, 243, 199, 0.95)",
      cardHover: "rgba(253, 230, 138, 1)",
      cardSecondary: "rgba(252, 211, 77, 0.3)",
      muted: "rgba(253, 230, 138, 1)",
      mutedHover: "rgba(252, 211, 77, 1)",
      border: "rgba(251, 191, 36, 0.5)",
      borderHover: "rgba(251, 146, 60, 0.5)",
      sidebar: "rgba(255, 251, 235, 0.98)",
      sidebarHover: "rgba(254, 243, 199, 1)",
      sidebarText: "rgba(124, 45, 18, 1)",
      sidebarBorder: "rgba(251, 191, 36, 0.3)",
      success: "rgba(34, 197, 94, 1)",
      successLight: "rgba(34, 197, 94, 0.1)",
      warning: "rgba(251, 191, 36, 1)",
      warningLight: "rgba(251, 191, 36, 0.1)",
      danger: "rgba(239, 68, 68, 1)",
      dangerLight: "rgba(239, 68, 68, 0.1)",
      info: "rgba(251, 146, 60, 1)",
      infoLight: "rgba(251, 146, 60, 0.1)",
      purple: "rgba(147, 51, 234, 1)",
      pink: "rgba(236, 72, 153, 1)",
      orange: "rgba(251, 146, 60, 1)",
      teal: "rgba(20, 184, 166, 1)",
      cyan: "rgba(6, 182, 212, 1)",
      emerald: "rgba(16, 185, 129, 1)",
      rose: "rgba(244, 63, 94, 1)",
      violet: "rgba(139, 92, 246, 1)",
    },
  },
  royal: {
    name: "royal",
    label: "Royal",
    icon: "👑",
    category: "premium",
    gradient: "linear-gradient(135deg, rgba(147, 51, 234, 1), rgba(126, 34, 206, 1), rgba(168, 85, 247, 1))",
    secondaryGradient: "linear-gradient(45deg, rgba(126, 34, 206, 1), rgba(168, 85, 247, 1))",
    tertiaryGradient: "linear-gradient(90deg, rgba(147, 51, 234, 1), rgba(168, 85, 247, 1))",
    textShadow: "0 2px 8px rgba(147, 51, 234, 0.5)",
    boxShadow: "0 10px 25px rgba(147, 51, 234, 0.25)",
    colors: {
      primary: "rgba(147, 51, 234, 1)",
      primaryHover: "rgba(147, 51, 234, 0.9)",
      primaryLight: "rgba(147, 51, 234, 0.1)",
      primaryDark: "rgba(126, 34, 206, 1)",
      secondary: "rgba(168, 85, 247, 1)",
      secondaryHover: "rgba(168, 85, 247, 0.9)",
      accent: "rgba(126, 34, 206, 1)",
      accentHover: "rgba(126, 34, 206, 0.9)",
      accentLight: "rgba(126, 34, 206, 0.1)",
      background: "rgba(250, 245, 255, 1)",
      backgroundSecondary: "rgba(243, 232, 255, 1)",
      foreground: "rgba(88, 28, 135, 1)",
      foregroundSecondary: "rgba(107, 33, 168, 1)",
      card: "rgba(243, 232, 255, 0.95)",
      cardHover: "rgba(233, 213, 255, 1)",
      cardSecondary: "rgba(221, 214, 254, 0.5)",
      muted: "rgba(233, 213, 255, 1)",
      mutedHover: "rgba(221, 214, 254, 1)",
      border: "rgba(196, 181, 253, 0.5)",
      borderHover: "rgba(147, 51, 234, 0.3)",
      sidebar: "rgba(250, 245, 255, 0.98)",
      sidebarHover: "rgba(243, 232, 255, 1)",
      sidebarText: "rgba(88, 28, 135, 1)",
      sidebarBorder: "rgba(196, 181, 253, 0.3)",
      success: "rgba(34, 197, 94, 1)",
      successLight: "rgba(34, 197, 94, 0.1)",
      warning: "rgba(251, 191, 36, 1)",
      warningLight: "rgba(251, 191, 36, 0.1)",
      danger: "rgba(239, 68, 68, 1)",
      dangerLight: "rgba(239, 68, 68, 0.1)",
      info: "rgba(147, 51, 234, 1)",
      infoLight: "rgba(147, 51, 234, 0.1)",
      purple: "rgba(147, 51, 234, 1)",
      pink: "rgba(236, 72, 153, 1)",
      orange: "rgba(251, 146, 60, 1)",
      teal: "rgba(20, 184, 166, 1)",
      cyan: "rgba(6, 182, 212, 1)",
      emerald: "rgba(16, 185, 129, 1)",
      rose: "rgba(244, 63, 94, 1)",
      violet: "rgba(139, 92, 246, 1)",
    },
  },
}

export const defaultAdminTheme = "light"
export const defaultAdminSidebarDesign = "modern"
