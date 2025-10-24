// Profile.tsx
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import {
  User,
  Envelope,
  Calendar,
  MapPin,
  Gear,
  Phone,
  Buildings,
} from "react-native-phosphor";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme, fontFamilies, useIsDark } from "../utils/theme";

export default function Profile() {
  const router = useRouter();
  const theme = useTheme();
  const isDark = useIsDark();

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
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 24,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: theme.text,
              fontFamily: fontFamilies.bold || fontFamilies.regular,
            }}
          >
            johndoe
          </Text>
          <TouchableOpacity
            onPress={() => router.push("../settings")}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: isDark ? "#1e293b" : "#f1f5f9",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Gear size={24} color={theme.text} weight="bold" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View
          style={{
            paddingHorizontal: 16,
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          {/* Profile Picture - Centered */}
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: isDark ? "#4338ca" : "#6366f1",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: "700",
                color: "#ffffff",
              }}
            >
              JD
            </Text>
          </View>

          {/* Name and Role - Centered */}
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: theme.text,
                marginBottom: 4,
              }}
            >
              John Doe
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: isDark ? "#94a3b8" : "#64748b",
              }}
            >
              Elder
            </Text>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#1e293b" : "#f1f5f9",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              alignItems: "center",
              borderWidth: 1,
              borderColor: isDark ? "#334155" : "#e2e8f0",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: theme.text,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: isDark ? "#334155" : "#e2e8f0",
            marginBottom: 16,
          }}
        />

        {/* Information Section */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: theme.text,
              marginBottom: 16,
            }}
          >
            Information
          </Text>

          {/* Info Items */}
          <View style={{ gap: 16 }}>
            {/* Email */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: isDark ? "#312e81" : "#e0e7ff",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Envelope
                  size={20}
                  color={isDark ? "#a5b4fc" : "#6366f1"}
                  weight="fill"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDark ? "#94a3b8" : "#64748b",
                    marginBottom: 2,
                  }}
                >
                  Email
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: theme.text,
                  }}
                >
                  john.doe@accord.com
                </Text>
              </View>
            </View>

            {/* Phone */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: isDark ? "#065f4620" : "#d1fae520",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Phone size={20} color="#10b981" weight="fill" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDark ? "#94a3b8" : "#64748b",
                    marginBottom: 2,
                  }}
                >
                  Phone
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: theme.text,
                  }}
                >
                  +250 788 123 456
                </Text>
              </View>
            </View>

            {/* Organization */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: isDark ? "#78350f20" : "#fef3c720",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Buildings size={20} color="#f59e0b" weight="fill" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDark ? "#94a3b8" : "#64748b",
                    marginBottom: 2,
                  }}
                >
                  Organization
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: theme.text,
                  }}
                >
                  Youth Ministry
                </Text>
              </View>
            </View>

            {/* Location */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: isDark ? "#831843" : "#fce7f320",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <MapPin size={20} color="#ec4899" weight="fill" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDark ? "#94a3b8" : "#64748b",
                    marginBottom: 2,
                  }}
                >
                  Location
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: theme.text,
                  }}
                >
                  Kigali, Rwanda
                </Text>
              </View>
            </View>

            {/* Member Since */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: isDark ? "#1e40af20" : "#dbeafe20",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Calendar size={20} color="#3b82f6" weight="fill" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDark ? "#94a3b8" : "#64748b",
                    marginBottom: 2,
                  }}
                >
                  Member Since
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: theme.text,
                  }}
                >
                  January 2024
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
