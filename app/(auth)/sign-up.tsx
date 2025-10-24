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

export default function SignUpScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

  const validateForm = () => {
    if (!fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return false;
    }

    if (!email || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    if (!password || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }

    if (!agreedToTerms) {
      Alert.alert(
        "Error",
        "Please agree to the Terms of Service and Privacy Policy",
      );
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(async () => {
      try {
        // For now, we'll simulate a successful signup
        // In a real app, you'd make an API call here
        await AsyncStorage.setItem("userToken", "demo-token");
        await AsyncStorage.setItem("userEmail", email);
        await AsyncStorage.setItem("userName", fullName);

        setIsLoading(false);
        Alert.alert("Success!", "Your account has been created successfully.", [
          {
            text: "OK",
            onPress: () => router.replace("/(tabs)"),
          },
        ]);
      } catch (error) {
        setIsLoading(false);
        Alert.alert("Error", "Sign up failed. Please try again.");
      }
    }, 2000);
  };

  const handleSignIn = () => {
    router.back();
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
            paddingTop: 60,
            paddingBottom: 40,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            onPress={() => router.back()}
          >
            <Text
              style={{
                color: "#94a3b8",
                fontSize: 16,
                fontFamily: "LeagueSpartan_400Regular",
              }}
            >
              ← Back
            </Text>
          </TouchableOpacity>

          {/* Logo and Title */}
          <Animated.View
            style={{
              alignItems: "center",
              marginBottom: 40,
              transform: [{ scale: logoScale }],
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#10b981",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
                shadowColor: "#10b981",
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
                fontWeight: "bold",
                color: isDark ? "#ffffff" : "#000000",
                fontFamily: "LeagueSpartan_700Bold",
                marginBottom: 8,
              }}
            >
              Create Account
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: isDark ? "#94a3b8" : "#64748b",
                fontFamily: "LeagueSpartan_400Regular",
                textAlign: "center",
              }}
            >
              Join Accord and start collaborating
            </Text>
          </Animated.View>

          {/* Sign Up Form */}
          <View style={{ marginBottom: 32 }}>
            {/* Full Name Input */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: isDark ? "#e2e8f0" : "#374151",
                  marginBottom: 8,
                  fontFamily: "LeagueSpartan_600SemiBold",
                }}
              >
                Full Name
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
                placeholder="Enter your full name"
                placeholderTextColor={isDark ? "#64748b" : "#9ca3af"}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoComplete="name"
              />
            </View>

            {/* Email Input */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: isDark ? "#e2e8f0" : "#374151",
                  marginBottom: 8,
                  fontFamily: "LeagueSpartan_600SemiBold",
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
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: isDark ? "#e2e8f0" : "#374151",
                  marginBottom: 8,
                  fontFamily: "LeagueSpartan_600SemiBold",
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
                  placeholder="Create a password"
                  placeholderTextColor={isDark ? "#64748b" : "#9ca3af"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="new-password"
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

            {/* Confirm Password Input */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: isDark ? "#e2e8f0" : "#374151",
                  marginBottom: 8,
                  fontFamily: "LeagueSpartan_600SemiBold",
                }}
              >
                Confirm Password
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
                  placeholder="Confirm your password"
                  placeholderTextColor={isDark ? "#64748b" : "#9ca3af"}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoComplete="new-password"
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 16,
                    top: 0,
                    bottom: 0,
                    justifyContent: "center",
                  }}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
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

            {/* Terms and Conditions */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 32,
              }}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: agreedToTerms ? "#7544FC" : "#7544FC",
                  backgroundColor: agreedToTerms ? "#7544FC" : "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                {agreedToTerms && (
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 16,
                      fontWeight: "500",
                      fontFamily: "LeagueSpartan_400Regular",
                    }}
                  >
                    ✓
                  </Text>
                )}
              </View>
              <Text
                style={{
                  color: isDark ? "#94a3b8" : "#64748b",
                  fontSize: 14,
                  flex: 1,
                  lineHeight: 20,
                  fontFamily: "LeagueSpartan_400Regular",
                }}
              >
                I agree to the{" "}
                <Text style={{ color: "#7544FC", fontWeight: "500" }}>
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text style={{ color: "#7544FC", fontWeight: "500" }}>
                  Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
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
                {isLoading ? "Creating Account..." : "Create Account"}
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
                  Alert.alert("Info", "Google sign-up coming soon!")
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
                  Alert.alert("Info", "Apple sign-up coming soon!")
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

          {/* Sign In Link */}
          <View
            style={{
              alignItems: "center",
              marginTop: "auto",
            }}
          >
            <Text
              style={{
                color: "#94a3b8",
                fontSize: 16,
                fontFamily: "LeagueSpartan_500Medium",
              }}
            >
              Already have an account?{" "}
              <Text
                style={{ color: "#7544FC", fontWeight: "600" }}
                onPress={handleSignIn}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
