import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  Image,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const backgroundOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    // Logo animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),
      // Text fade in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        delay: 300,
        useNativeDriver: true,
      }),
      // Hold for a moment
      Animated.delay(1000),
      // Fade out and navigate
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      checkFirstTimeUser();
    });
  };

  const checkFirstTimeUser = async () => {
    try {
      const hasSeenWelcome = await AsyncStorage.getItem("hasSeenWelcome");
      const userToken = await AsyncStorage.getItem("userToken");

      if (hasSeenWelcome === null) {
        // First time user - show welcome flow
        router.replace("/(onboarding)/welcome");
      } else if (userToken) {
        // Returning user with auth token - go to main app
        router.replace("/(tabs)");
      } else {
        // Returning user without auth token - show sign in
        router.replace("/(auth)/sign-in");
      }
    } catch (error) {
      console.error("Error checking first time user:", error);
      // Default to showing welcome on error
      router.replace("/(onboarding)/welcome");
    }
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#0f172a" : "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        opacity: backgroundOpacity,
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale: logoScale }],
          opacity: logoOpacity,
          marginBottom: 30,
        }}
      >
        {/* Logo placeholder - replace with your actual logo */}
        <View
          style={{
            width: 120,
            height: 120,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#3b82f6",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: isDark ? 0.5 : 0.3,
            shadowRadius: 20,
            elevation: 20,
          }}
        >
          <Image
            source={require("../assets/icon.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>
      </Animated.View>

      <Animated.Text
        style={{
          fontSize: 32,
          fontFamily: "LeagueSpartan_700Bold",
          color: isDark ? "#ffffff" : "#000000",
          opacity: textOpacity,
          marginBottom: 8,
        }}
      >
        Accord
      </Animated.Text>

      <Animated.Text
        style={{
          fontSize: 16,
          fontFamily: "LeagueSpartan_400Regular",
          color: isDark ? "#94a3b8" : "#64748b",
          opacity: textOpacity,
        }}
      >
        Connect. Collaborate. Create.
      </Animated.Text>

      {/* Animated loading indicator */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 80,
          opacity: textOpacity,
        }}
      >
        <LoadingDots />
      </Animated.View>
    </Animated.View>
  );
}

// Simple loading dots component
function LoadingDots() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dot1, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot1, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => animateDots());
    };

    animateDots();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {[dot1, dot2, dot3].map((dot, index) => (
        <Animated.View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#7544FC",
            marginHorizontal: 4,
            opacity: dot,
          }}
        />
      ))}
    </View>
  );
}
