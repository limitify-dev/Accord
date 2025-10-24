import { useColorScheme } from "react-native";

export interface ThemeColors {
  // Background colors
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;

  // Border colors
  border: string;
  borderSecondary: string;

  // Card colors
  card: string;
  cardBorder: string;

  // Input colors
  input: string;
  inputBorder: string;
  placeholder: string;

  // Brand colors (consistent across themes)
  primary: string;
  primaryDark: string;
  success: string;
  successDark: string;
  warning: string;
  danger: string;

  // Status bar
  statusBar: "light-content" | "dark-content" | "default";

  // Event type colors
  eventColors: {
    meeting: {
      background: string;
      text: string;
      border: string;
      light: string;
    };
    task: {
      background: string;
      text: string;
      border: string;
      light: string;
    };
    event: {
      background: string;
      text: string;
      border: string;
      light: string;
    };
  };
}

export const lightTheme: ThemeColors = {
  // Background colors
  background: "#ffffff",
  backgroundSecondary: "#f8fafc",
  backgroundTertiary: "#f1f5f9",

  // Text colors
  text: "#000000",
  textSecondary: "#374151",
  textTertiary: "#64748b",

  // Border colors
  border: "#e2e8f0",
  borderSecondary: "#d1d5db",

  // Card colors
  card: "#f9fafb",
  cardBorder: "#e5e7eb",

  // Input colors
  input: "#f9fafb",
  inputBorder: "#d1d5db",
  placeholder: "#9ca3af",

  // Brand colors
  primary: "#3b82f6",
  primaryDark: "#1d4ed8",
  success: "#10b981",
  successDark: "#059669",
  warning: "#f59e0b",
  danger: "#ef4444",

  // Status bar
  statusBar: "dark-content",

  // Event type colors
  eventColors: {
    meeting: {
      background: "#3b82f6",
      text: "#ffffff",
      border: "#2563eb",
      light: "rgba(59, 130, 246, 0.1)",
    },
    task: {
      background: "#10b981",
      text: "#ffffff",
      border: "#059669",
      light: "rgba(16, 185, 129, 0.1)",
    },
    event: {
      background: "#f59e0b",
      text: "#ffffff",
      border: "#d97706",
      light: "rgba(245, 158, 11, 0.1)",
    },
  },
};

export const darkTheme: ThemeColors = {
  // Background colors
  background: "#0d1117",
  backgroundSecondary: "#161b22",
  backgroundTertiary: "#21262d",

  // Text colors
  text: "#ffffff",
  textSecondary: "#f0f6fc",
  textTertiary: "#8b949e",

  // Border colors
  border: "#21262d",
  borderSecondary: "#30363d",

  // Card colors
  card: "#161b22",
  cardBorder: "#21262d",

  // Input colors
  input: "#161b22",
  inputBorder: "#21262d",
  placeholder: "#8b949e",

  // Brand colors (same as light theme)
  primary: "#3b82f6",
  primaryDark: "#1d4ed8",
  success: "#10b981",
  successDark: "#059669",
  warning: "#f59e0b",
  danger: "#ef4444",

  // Status bar
  statusBar: "light-content",

  // Event type colors (same as light theme for consistency)
  eventColors: {
    meeting: {
      background: "#3b82f6",
      text: "#ffffff",
      border: "#2563eb",
      light: "rgba(59, 130, 246, 0.15)",
    },
    task: {
      background: "#10b981",
      text: "#ffffff",
      border: "#059669",
      light: "rgba(16, 185, 129, 0.15)",
    },
    event: {
      background: "#f59e0b",
      text: "#ffffff",
      border: "#d97706",
      light: "rgba(245, 158, 11, 0.15)",
    },
  },
};

export function useTheme(): ThemeColors {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? darkTheme : lightTheme;
}

export function useIsDark(): boolean {
  const colorScheme = useColorScheme();
  return colorScheme === "dark";
}

// Font families for consistent typography
export const fontFamilies = {
  thin: "LeagueSpartan_100Thin",
  extraLight: "LeagueSpartan_200ExtraLight",
  light: "LeagueSpartan_300Light",
  regular: "LeagueSpartan_400Regular",
  medium: "LeagueSpartan_500Medium",
  semiBold: "LeagueSpartan_600SemiBold",
  bold: "LeagueSpartan_700Bold",
  extraBold: "LeagueSpartan_800ExtraBold",
  black: "LeagueSpartan_900Black",
};

// Common shadow styles
export const shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Spacing scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border radius scale
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Event type utility functions
export type EventType = "meeting" | "task" | "event";

export function getEventColor(theme: ThemeColors, eventType: EventType) {
  return theme.eventColors[eventType];
}

export function getEventTypeLabel(eventType: EventType): string {
  switch (eventType) {
    case "meeting":
      return "Meeting";
    case "task":
      return "Task";
    case "event":
      return "Event";
    default:
      return "Event";
  }
}

export function getEventTypeIcon(eventType: EventType): string {
  switch (eventType) {
    case "meeting":
      return "users";
    case "task":
      return "check-square";
    case "event":
      return "calendar";
    default:
      return "calendar";
  }
}
