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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function OnboardingStep3() {
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

  const handleFinish = async () => {
    try {
      await AsyncStorage.setItem("hasSeenWelcome", "true");
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Error saving welcome status:", error);
      router.replace("/(auth)/sign-in");
    }
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
          <View style={{ width: 40 }} />
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
                backgroundColor: "#3b82f6",
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
                borderColor: "#f59e0b",
              }}
            >
              <Text style={{ fontSize: 80, color: "#f59e0b" }}>🔒</Text>
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
              Secure & Private
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#94a3b8",
                textAlign: "center",
                lineHeight: 26,
              }}
            >
              Your data and conversations are protected with enterprise-grade
              security. Privacy and trust are at the core of everything we do.
            </Text>
          </View>

          {/* Features */}
          <View style={{ paddingHorizontal: 20, marginBottom: 60 }}>
            {[
              "End-to-end encryption",
              "Secure data storage",
              "Privacy controls",
              "Compliance ready",
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
                    backgroundColor: "#f59e0b",
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

          {/* Ready Message */}
          <View
            style={{
              alignItems: "center",
              marginBottom: 40,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#1e293b",
                paddingVertical: 20,
                paddingHorizontal: 24,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#334155",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#ffffff",
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                You're all set! 🎉
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#94a3b8",
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                Ready to start your journey with Accord? Let's dive in and
                explore what's possible.
              </Text>
            </View>
          </View>

          {/* CTA Button */}
          <View style={{ marginTop: "auto", paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={handleFinish}
              style={{
                backgroundColor: "#f59e0b",
                paddingVertical: 16,
                borderRadius: 12,
                shadowColor: "#f59e0b",
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
                Continue to Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
