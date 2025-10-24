import React from "react";
import { StatusBar, useColorScheme, Platform } from "react-native";

interface AdaptiveStatusBarProps {
  backgroundColor?: {
    light: string;
    dark: string;
  };
  barStyle?: {
    light: "light-content" | "dark-content" | "default";
    dark: "light-content" | "dark-content" | "default";
  };
  translucent?: boolean;
}

export const AdaptiveStatusBar: React.FC<AdaptiveStatusBarProps> = ({
  backgroundColor = {
    light: "#ffffff",
    dark: "#0f172a", // slate-900
  },
  barStyle = {
    light: "dark-content",
    dark: "light-content",
  },
  translucent = false,
}) => {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  const currentBackgroundColor = isDark
    ? backgroundColor.dark
    : backgroundColor.light;
  const currentBarStyle = isDark ? barStyle.dark : barStyle.light;

  return (
    <StatusBar
      backgroundColor={
        Platform.OS === "android" ? currentBackgroundColor : "transparent"
      }
      barStyle={currentBarStyle}
      translucent={translucent}
      animated={true}
      hidden={false}
    />
  );
};

export default AdaptiveStatusBar;
