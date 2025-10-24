import { Text, View, TouchableOpacity, Animated } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRef, useState, useCallback } from "react";
import { useTheme, fontFamilies, useIsDark } from "../utils/theme";
import { Bell, ChatCircleDots } from "react-native-phosphor";
import MeetingBox from "../components/MeetingBox";
import TaskBox from "../components/TaskBox";
import EventBox from "../components/EventBox";

export default function App() {
  const theme = useTheme();
  const isDark = useIsDark();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollDirection = useRef("down"); // 'up' or 'down'
  const lastScrollY = useRef(0);
  const insets = useSafeAreaInsets();

  // Track scroll direction with state for re-renders
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  // Header opacity: fades out when scrolling down, appears immediately when scrolling up
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, isScrollingUp ? 1 : 0], // Always show when scrolling up
    extrapolate: "clamp",
  });

  // Header translateY: moves with scroll but snaps back when scrolling up
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, isScrollingUp ? 0 : -80], // Stay in place when scrolling up
    extrapolate: "clamp",
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: useCallback((event: any) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const scrollDiff = currentScrollY - lastScrollY.current;

        // Determine scroll direction with threshold to prevent flickering
        if (Math.abs(scrollDiff) > 2) {
          // 2px threshold to reduce noise
          const direction = scrollDiff > 0 ? "down" : "up";

          if (direction !== scrollDirection.current) {
            scrollDirection.current = direction;
            setIsScrollingUp(direction === "up");
          }
        }

        lastScrollY.current = currentScrollY;
      }, []),
    }
  );

  // Reset to visible when near top
  const handleMomentumScrollEnd = useCallback((event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY < 10) {
      scrollY.setValue(0);
      setIsScrollingUp(false);
      scrollDirection.current = "down";
    }
  }, []);

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.background,
        }}
        edges={["top", "left", "right"]}
      >
        {/* Animated Top Bar */}
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: theme.background,
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }],
            position: "absolute",
            top: insets.top,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          {/* Logo/Title */}
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
              color: theme.text,
              fontFamily: fontFamilies.bold || fontFamilies.regular,
            }}
          >
            Accord
          </Text>

          {/* Right Icons */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            {/* Notifications */}
            <TouchableOpacity
              style={{
                padding: 4,
              }}
              onPress={() => console.log("Notifications pressed")}
            >
              <Bell size={26} color={isDark ? "#ffffff" : "#000000"} />
            </TouchableOpacity>

            {/* Messages */}
            <TouchableOpacity
              style={{
                padding: 4,
              }}
              onPress={() => console.log("Messages pressed")}
            >
              <ChatCircleDots
                size={26}
                color={isDark ? "#ffffff" : "#000000"}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Main Content with Scroll */}
        <Animated.ScrollView
          style={{
            flex: 1,
            backgroundColor: theme.background,
            paddingHorizontal: 18,
          }}
          contentContainerStyle={{
            paddingTop: 80,
            paddingBottom: 100, // Space for bottom tab bar
          }}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleMomentumScrollEnd}
        >
          <MeetingBox hasMeetings={false} />
          <TaskBox hasTasks={false} />
          <EventBox hasEvents={false} />
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
}
