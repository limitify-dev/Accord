import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import {
  Bell,
  Lock,
  Palette,
  Globe,
  Question,
  SignOut,
  CaretRight,
  User as UserIcon,
  Shield,
  Info,
  ArrowLeft,
} from "react-native-phosphor";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme, fontFamilies, useIsDark } from "./utils/theme";

export default function Settings() {
  const router = useRouter();
  const theme = useTheme();
  const isDark = useIsDark();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.multiRemove([
              "userToken",
              "userEmail",
              "userName",
            ]);
            router.replace("/(auth)/sign-in");
          } catch (error) {
            console.error("Error signing out:", error);
          }
        },
      },
    ]);
  };

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    iconColor,
    showArrow = true,
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    iconColor?: string;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: isDark ? "#1e293b" : "#ffffff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: isDark ? "#334155" : "#e2e8f0",
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: `${iconColor || "#6366f1"}15`,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        <Icon color={iconColor || "#6366f1"} size={22} weight="bold" />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: theme.text,
            marginBottom: subtitle ? 2 : 0,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              fontSize: 13,
              color: isDark ? "#94a3b8" : "#64748b",
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {showArrow && (
        <CaretRight
          size={20}
          color={isDark ? "#64748b" : "#94a3b8"}
          weight="bold"
        />
      )}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text
      style={{
        fontSize: 13,
        fontWeight: "700",
        color: isDark ? "#94a3b8" : "#64748b",
        marginBottom: 12,
        marginTop: 8,
        marginLeft: 4,
        textTransform: "uppercase",
        letterSpacing: 0.5,
      }}
    >
      {title}
    </Text>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
      edges={["top", "left", "right"]}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 16 }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: theme.card,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
                borderWidth: 1,
                borderColor: theme.border,
              }}
            >
              <ArrowLeft color={theme.text} size={20} weight="bold" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 28,
                fontFamily: fontFamilies.bold,
                color: theme.text,
                flex: 1,
              }}
            >
              Settings
            </Text>
          </View>

          {/* Account Section */}
          <SectionHeader title="Account" />
          <SettingItem
            icon={UserIcon}
            title="Edit Profile"
            subtitle="Update your personal information"
            iconColor="#6366f1"
          />

          {/* Preferences Section */}
          <SectionHeader title="Preferences" />
          <SettingItem
            icon={Bell}
            title="Notifications"
            subtitle="Manage your notification settings"
            iconColor="#10b981"
          />
          <SettingItem
            icon={Palette}
            title="Appearance"
            subtitle="Customize the app theme"
            iconColor="#f59e0b"
          />
          <SettingItem
            icon={Globe}
            title="Language"
            subtitle="English"
            iconColor="#3b82f6"
          />

          {/* Privacy & Security Section */}
          <SectionHeader title="Privacy & Security" />
          <SettingItem
            icon={Lock}
            title="Privacy"
            subtitle="Manage your privacy settings"
            iconColor="#8b5cf6"
          />
          <SettingItem
            icon={Shield}
            title="Security"
            subtitle="Password and authentication"
            iconColor="#ec4899"
          />

          {/* Support Section */}
          <SectionHeader title="Support" />
          <SettingItem
            icon={Question}
            title="Help & Support"
            subtitle="Get help and contact support"
            iconColor="#14b8a6"
          />
          <SettingItem
            icon={Info}
            title="About"
            subtitle="Learn more about Accord"
            iconColor="#64748b"
          />

          {/* Sign Out */}
          <SectionHeader title="Account Actions" />
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              backgroundColor: isDark ? "#7f1d1d" : "#fef2f2",
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: isDark ? "#991b1b" : "#fecaca",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: isDark ? "#991b1b" : "#fee2e2",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <SignOut color="#ef4444" size={22} weight="bold" />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#ef4444",
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>

          {/* App Version */}
          <View style={{ alignItems: "center", marginTop: 32 }}>
            <Text
              style={{
                fontSize: 13,
                color: isDark ? "#64748b" : "#94a3b8",
              }}
            >
              Accord v1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
