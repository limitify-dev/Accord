import { View, Text } from "react-native";
import { useTheme, fontFamilies, useIsDark } from "../utils/theme";
import { Users } from "react-native-phosphor";

interface MeetingBoxProps {
  hasMeetings?: boolean;
}

export default function MeetingBox({ hasMeetings = false }: MeetingBoxProps) {
  const theme = useTheme();
  const isDark = useIsDark();

  return (
    <View
      style={{
        backgroundColor: isDark ? "rgba(30, 41, 58, 0.2)" : "#f8fafc",
        borderRadius: 16,
        padding: 24,
        marginVertical: 12,
      }}
    >
      {/* Header */}
      <View style={{ marginBottom: 8 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: theme.text,
            fontFamily: fontFamilies.bold || fontFamilies.regular,
            marginBottom: 4,
          }}
        >
          Today Meeting
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: isDark ? "#94a3b8" : "#64748b",
            fontFamily: fontFamilies.regular,
          }}
        >
          Your schedule for the day
        </Text>
      </View>

      {/* Empty State */}
      {!hasMeetings && (
        <View
          style={{
            alignItems: "center",
            marginTop: 24,
          }}
        >
          {/* Avatar Grid */}
          <View
            style={{
              backgroundColor: isDark ? "#312e81" : "#e0e7ff",
              borderRadius: 12,
              padding: 10,
              marginBottom: 24,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: 200,
                gap: 8,
              }}
            >
              {[...Array(6)].map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: isDark ? "#4338ca" : "#c7d2fe",
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Users size={24} color={isDark ? "#a5b4fc" : "#6366f1"} />
                </View>
              ))}
            </View>
          </View>

          {/* No Meeting Text */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: theme.text,
              fontFamily: fontFamilies.bold || fontFamilies.regular,
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            No Meeting Available
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: isDark ? "#94a3b8" : "#64748b",
              fontFamily: fontFamilies.regular,
              textAlign: "center",
              lineHeight: 20,
              paddingHorizontal: 8,
            }}
          >
            It looks like you don't have any meetings scheduled at the moment.
          </Text>
        </View>
      )}

      {/* When there are meetings, you can add meeting list here */}
      {hasMeetings && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: theme.text }}>
            Meeting list will go here...
          </Text>
        </View>
      )}
    </View>
  );
}
