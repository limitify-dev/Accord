import { View, Text } from "react-native";
import { useTheme, fontFamilies, useIsDark } from "../utils/theme";

interface TaskBoxProps {
  hasTasks?: boolean;
}

export default function TaskBox({ hasTasks = false }: TaskBoxProps) {
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
          Today Task
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: isDark ? "#94a3b8" : "#64748b",
            fontFamily: fontFamilies.regular,
          }}
        >
          The tasks assigned to you for today
        </Text>
      </View>

      {/* Empty State */}
      {!hasTasks && (
        <View
          style={{
            alignItems: "center",
            marginTop: 24,
          }}
        >
          {/* Document Illustration */}
          <View
            style={{
              backgroundColor: isDark ? "#312e81" : "#e0e7ff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
              position: "relative",
            }}
          >
            {/* Three overlapping documents */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: -20,
              }}
            >
              {/* Left document */}
              <View
                style={{
                  width: 80,
                  height: 100,
                  backgroundColor: isDark ? "#4338ca" : "#c7d2fe",
                  borderRadius: 8,
                  padding: 12,
                  justifyContent: "space-between",
                  transform: [{ rotate: "-5deg" }],
                }}
              >
                <View
                  style={{
                    height: 20,
                    backgroundColor: isDark ? "#6366f1" : "#a5b4fc",
                    borderRadius: 4,
                    marginBottom: 8,
                  }}
                />
                {[...Array(3)].map((_, index) => (
                  <View
                    key={index}
                    style={{
                      height: 4,
                      backgroundColor: isDark ? "#6366f1" : "#a5b4fc",
                      borderRadius: 2,
                      marginBottom: 4,
                    }}
                  />
                ))}
              </View>

              {/* Center document (tallest) */}
              <View
                style={{
                  width: 80,
                  height: 120,
                  backgroundColor: isDark ? "#4338ca" : "#c7d2fe",
                  borderRadius: 8,
                  padding: 12,
                  justifyContent: "space-between",
                  zIndex: 1,
                }}
              >
                <View
                  style={{
                    height: 20,
                    backgroundColor: isDark ? "#6366f1" : "#a5b4fc",
                    borderRadius: 4,
                    marginBottom: 8,
                  }}
                />
                {[...Array(4)].map((_, index) => (
                  <View
                    key={index}
                    style={{
                      height: 4,
                      backgroundColor: isDark ? "#6366f1" : "#a5b4fc",
                      borderRadius: 2,
                      marginBottom: 4,
                    }}
                  />
                ))}
              </View>

              {/* Right document */}
              <View
                style={{
                  width: 80,
                  height: 100,
                  backgroundColor: isDark ? "#4338ca" : "#c7d2fe",
                  borderRadius: 8,
                  padding: 12,
                  justifyContent: "space-between",
                  transform: [{ rotate: "5deg" }],
                }}
              >
                <View
                  style={{
                    height: 20,
                    backgroundColor: isDark ? "#6366f1" : "#a5b4fc",
                    borderRadius: 4,
                    marginBottom: 8,
                  }}
                />
                {[...Array(3)].map((_, index) => (
                  <View
                    key={index}
                    style={{
                      height: 4,
                      backgroundColor: isDark ? "#6366f1" : "#a5b4fc",
                      borderRadius: 2,
                      marginBottom: 4,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* No Tasks Text */}
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
            No Tasks Assigned
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
            It looks like you don't have any tasks assigned to you right now.
          </Text>
        </View>
      )}

      {/* When there are tasks, you can add task list here */}
      {hasTasks && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: theme.text }}>Task list will go here...</Text>
        </View>
      )}
    </View>
  );
}
