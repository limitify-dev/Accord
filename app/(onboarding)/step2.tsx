import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

export default function OnboardingStep2() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const imageScale = useRef(new Animated.Value(0.8)).current;
  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNext = () => {
    router.push("/(onboarding)/step3");
  };

  const handleSkip = () => {
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#0f172a",
          paddingHorizontal: 24,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: "#94a3b8", fontSize: 16, fontWeight: "500" }}>
              ← Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={{ color: "#94a3b8", fontSize: 16, fontWeight: "500" }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 60,
            paddingHorizontal: 20,
          }}
        >
          {[1, 2, 3].map((step, index) => (
            <View
              key={step}
              style={{
                flex: 1,
                height: 3,
                backgroundColor: index <= 1 ? "#3b82f6" : "#1e293b",
                marginHorizontal: 2,
                borderRadius: 2,
              }}
            />
          ))}
        </View>

        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Illustration */}
          <Animated.View
            style={{
              alignItems: "center",
              marginBottom: 60,
              transform: [{ scale: imageScale }],
            }}
          >
            <View
              style={{
                width: 200,
                height: 200,
                backgroundColor: "#1e293b",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
                borderWidth: 2,
                borderColor: "#10b981",
              }}
            >
              <Text style={{ fontSize: 80, color: "#10b981" }}>🚀</Text>
            </View>
          </Animated.View>

          {/* Content */}
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 20,
              marginBottom: 60,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#ffffff",
                textAlign: "center",
                marginBottom: 16,
                lineHeight: 36,
              }}
            >
              Boost Productivity
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#94a3b8",
                textAlign: "center",
                lineHeight: 26,
              }}
            >
              Streamline your workflow with powerful tools designed to help you
              and your team accomplish more in less time.
            </Text>
          </View>

          {/* Features */}
          <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
            {[
              "Smart task management",
              "Project organization",
              "Time tracking & analytics",
              "Automated workflows",
            ].map((feature, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: "#10b981",
                    borderRadius: 3,
                    marginRight: 12,
                  }}
                />
                <Text style={{ fontSize: 16, color: "#e2e8f0", flex: 1 }}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          {/* CTA Button */}
          <View style={{ marginTop: "auto", paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={handleNext}
              style={{
                backgroundColor: "#10b981",
                paddingVertical: 16,
                borderRadius: 12,
                shadowColor: "#10b981",
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
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
