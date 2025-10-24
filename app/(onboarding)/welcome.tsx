import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Image,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleGetStarted = () => {
    router.push("/(onboarding)/step1");
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem("hasSeenWelcome", "true");
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error saving welcome status:", error);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: isDark ? "#0f172a" : "#ffffff" }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 60,
          paddingBottom: 40,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        }}
      >
        {/* Header */}
        <View style={{ alignItems: "flex-end", marginBottom: 40 }}>
          <TouchableOpacity onPress={handleSkip}>
            <Text
              style={{
                color: isDark ? "#94a3b8" : "#64748b",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logo and Title */}
        <View style={{ alignItems: "center", marginBottom: 60 }}>
          <View
            style={{
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 24,
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 15,
              elevation: 15,
            }}
          >
            <Image
              source={require("../../assets/icon.png")}
              style={{
                width: 70,
                height: 70,
              }}
            />
          </View>

          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: isDark ? "#ffffff" : "#000000",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Welcome to Accord
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: isDark ? "#94a3b8" : "#64748b",
              textAlign: "center",
              lineHeight: 26,
            }}
          >
            The ultimate platform for seamless collaboration and connection
          </Text>
        </View>

        {/* Features List */}
        <View style={{ marginBottom: 60 }}>
          {[
            {
              icon: "💬",
              title: "Real-time Communication",
              description:
                "Chat, share, and collaborate in real-time with your team",
            },
            {
              icon: "🚀",
              title: "Boost Productivity",
              description: "Streamlined workflows to help you get more done",
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              description:
                "Your data is protected with enterprise-grade security",
            },
          ].map((feature, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
                paddingHorizontal: 12,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: isDark ? "#1e293b" : "#f3f4f6",
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 16,
                  borderWidth: 1,
                  borderColor: isDark ? "#334155" : "#d1d5db",
                }}
              >
                <Text style={{ fontSize: 24 }}>{feature.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: isDark ? "#ffffff" : "#000000",
                    marginBottom: 4,
                  }}
                >
                  {feature.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: isDark ? "#94a3b8" : "#64748b",
                    lineHeight: 20,
                  }}
                >
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA Buttons */}
        <View style={{ marginTop: "auto" }}>
          <TouchableOpacity
            onPress={handleGetStarted}
            style={{
              backgroundColor: "#3b82f6",
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 12,
              marginBottom: 16,
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSkip}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 32,
            }}
            activeOpacity={0.7}
          >
            <Text
              style={{
                color: isDark ? "#94a3b8" : "#64748b",
                fontSize: 16,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Continue without tour
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
