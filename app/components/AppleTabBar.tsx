import React from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useTheme } from "../utils/theme";

const { width } = Dimensions.get("window");

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export default function AppleTabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const isDark = theme.statusBar === "light-content";

  const tabBarHeight = Platform.OS === "ios" ? 50 + insets.bottom : 60;
  const tabWidth = width / state.routes.length;

  return (
    <View style={[styles.container, { height: tabBarHeight }]}>
      <View
        style={[
          styles.backgroundContainer,
          {
            backgroundColor: isDark ? "#0d1117" : "#ffffff",
            borderTopColor: isDark ? "#21262d" : "#dbdbdb",
          },
        ]}
      />

      {/* Tab Items */}
      <View style={styles.tabContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            // Add haptic feedback for iOS
            if (Platform.OS === "ios" && !isFocused) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }

            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            // Add stronger haptic feedback for long press
            if (Platform.OS === "ios") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }

            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabItem,
                {
                  width: tabWidth,
                },
              ]}
              activeOpacity={0.7}
            >
              {/* Tab Icon */}
              <View style={styles.iconContainer}>
                {options.tabBarIcon?.({
                  focused: isFocused,
                  color: isFocused
                    ? isDark
                      ? "#ffffff"
                      : "#000000"
                    : isDark
                      ? "#6e7681"
                      : "#8e8e93",
                  size: 30,
                })}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Bottom Safe Area */}
      <View
        style={[
          styles.safeArea,
          {
            height: insets.bottom,
            backgroundColor: "transparent",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 0.5,
  },
  tabContainer: {
    flexDirection: "row",
    paddingBottom: 30,
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: 50,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    width: "100%",
  },
});
