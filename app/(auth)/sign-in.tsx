import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppleLogo, Eye, EyeSlash, GoogleLogo } from "react-native-phosphor";

const { width, height } = Dimensions.get("window");

export default function SignInScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

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
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(async () => {
      try {
        // For now, we'll simulate a successful login
        // In a real app, you'd make an API call here
        await AsyncStorage.setItem("userToken", "demo-token");
        await AsyncStorage.setItem("userEmail", email);

        setIsLoading(false);
        router.replace("/(tabs)");
      } catch (error) {
        setIsLoading(false);
        Alert.alert("Error", "Sign in failed. Please try again.");
      }
    }, 2000);
  };

  const handleSignUp = () => {
    router.push("/(auth)/sign-up");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: isDark ? "#0f172a" : "#ffffff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: 80,
            paddingBottom: 40,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Logo and Title */}
          <Animated.View
            style={{
              alignItems: "center",
              marginBottom: 60,
              transform: [{ scale: logoScale }],
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: isDark ? 0.3 : 0.2,
                shadowRadius: 10,
                elevation: 10,
              }}
            >
              <Image
                source={require("../../assets/icon.png")}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
            </View>

            <Text
              style={{
                fontSize: 28,
                fontFamily: "LeagueSpartan_700Bold",
                color: isDark ? "#ffffff" : "#000000",
                marginBottom: 8,
              }}
            >
              Welcome Back
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "LeagueSpartan_400Regular",
                color: isDark ? "#94a3b8" : "#64748b",
                textAlign: "center",
              }}
            >
              Sign in to your account to continue
            </Text>
          </Animated.View>

          {/* Sign In Form */}
          <View style={{ marginBottom: 40 }}>
            {/* Email Input */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "LeagueSpartan_600SemiBold",
                  color: isDark ? "#e2e8f0" : "#374151",
                  marginBottom: 8,
                }}
              >
                Email Address
              </Text>
              <TextInput
                style={{
                  backgroundColor: isDark ? "#1e293b" : "#f9fafb",
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  fontSize: 16,
                  color: isDark ? "#ffffff" : "#000000",
                  borderWidth: 1,
                  borderColor: isDark ? "#334155" : "#d1d5db",
                }}
                placeholder="Enter your email"
                placeholderTextColor={isDark ? "#64748b" : "#9ca3af"}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "LeagueSpartan_600SemiBold",
                  color: isDark ? "#e2e8f0" : "#374151",
                  marginBottom: 8,
                }}
              >
                Password
              </Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  style={{
                    backgroundColor: isDark ? "#1e293b" : "#f9fafb",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    paddingRight: 50,
                    fontSize: 16,
                    color: isDark ? "#ffffff" : "#000000",
                    borderWidth: 1,
                    borderColor: isDark ? "#334155" : "#d1d5db",
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor={isDark ? "#64748b" : "#9ca3af"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 16,
                    top: 0,
                    bottom: 0,
                    justifyContent: "center",
                  }}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlash
                      color={isDark ? "#64748b" : "#9ca3af"}
                      size={20}
                    />
                  ) : (
                    <Eye color={isDark ? "#64748b" : "#9ca3af"} size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              style={{ alignSelf: "flex-end", marginBottom: 32 }}
              onPress={() =>
                Alert.alert(
                  "Info",
                  "Forgot password functionality coming soon!",
                )
              }
            >
              <Text
                style={{
                  color: "#7544FC",
                  fontSize: 14,
                  fontFamily: "LeagueSpartan_400Regular",
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleSignIn}
              disabled={isLoading}
              style={{
                backgroundColor: isLoading ? "#5B2ED4" : "#7544FC",
                paddingVertical: 16,
                borderRadius: 12,
                marginBottom: 20,
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
                  fontFamily: "LeagueSpartan_600SemiBold",
                  textAlign: "center",
                }}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 24,
              }}
            >
              <View
                style={{ flex: 1, height: 1, backgroundColor: "#334155" }}
              />
              <Text
                style={{
                  color: "#64748b",
                  marginHorizontal: 16,
                  fontSize: 14,
                  fontFamily: "LeagueSpartan_400Regular",
                }}
              >
                Or continue with
              </Text>
              <View
                style={{ flex: 1, height: 1, backgroundColor: "#334155" }}
              />
            </View>

            {/* Social Login Options */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 32,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  paddingVertical: 14,
                  borderRadius: 12,
                  marginRight: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  flexDirection: "row",
                  shadowOffset: { width: 0, height: 2 },
                  shadowColor: "#000",
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={() =>
                  Alert.alert("Info", "Google sign-in coming soon!")
                }
              >
                <GoogleLogo
                  color={isDark ? "#ffffff" : "#1e293b"}
                  weight="regular"
                />
                <Text
                  style={{
                    color: isDark ? "#ffffff" : "#1e293b",
                    fontSize: 16,
                    fontFamily: "LeagueSpartan_500Medium",
                  }}
                >
                  Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  paddingVertical: 14,
                  borderRadius: 12,
                  marginRight: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  flexDirection: "row",
                  shadowOffset: { width: 0, height: 2 },
                  shadowColor: "#000",
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={() =>
                  Alert.alert("Info", "Apple sign-in coming soon!")
                }
              >
                <AppleLogo
                  color={isDark ? "#ffffff" : "#000"}
                  weight="regular"
                />
                <Text
                  style={{
                    color: isDark ? "#ffffff" : "#000",
                    fontSize: 16,
                    fontFamily: "LeagueSpartan_500Medium",
                  }}
                >
                  Apple
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Link */}
          <View
            style={{
              alignItems: "center",
              marginTop: "auto",
            }}
          >
            <Text
              style={{
                color: isDark ? "#94a3b8" : "#64748b",
                fontSize: 16,
                fontFamily: "LeagueSpartan_400Regular",
              }}
            >
              Don't have an account?{" "}
              <Text
                style={{
                  color: "#7544FC",
                  fontFamily: "LeagueSpartan_600SemiBold",
                }}
                onPress={handleSignUp}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
