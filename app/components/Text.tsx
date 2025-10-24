import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";

interface CustomTextProps extends TextProps {
  variant?:
    | "thin"
    | "extralight"
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
}

export const Text: React.FC<CustomTextProps> = ({
  style,
  variant = "regular",
  children,
  ...props
}) => {
  const getFontFamily = () => {
    switch (variant) {
      case "thin":
        return "LeagueSpartan_100Thin";
      case "extralight":
        return "LeagueSpartan_200ExtraLight";
      case "light":
        return "LeagueSpartan_300Light";
      case "regular":
        return "LeagueSpartan_400Regular";
      case "medium":
        return "LeagueSpartan_500Medium";
      case "semibold":
        return "LeagueSpartan_600SemiBold";
      case "bold":
        return "LeagueSpartan_700Bold";
      case "extrabold":
        return "LeagueSpartan_800ExtraBold";
      case "black":
        return "LeagueSpartan_900Black";
      default:
        return "LeagueSpartan_400Regular";
    }
  };

  return (
    <RNText
      style={[
        {
          fontFamily: getFontFamily(),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
