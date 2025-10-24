import { View, Text } from "react-native";
import { useTheme, fontFamilies, useIsDark } from "../utils/theme";

interface EventBoxProps {
  hasEvents?: boolean;
}

export default function EventBox({ hasEvents = false }: EventBoxProps) {
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
          Today Event
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: isDark ? "#94a3b8" : "#64748b",
            fontFamily: fontFamilies.regular,
          }}
        >
          Events scheduled for today
        </Text>
      </View>

      {/* Empty State */}
      {!hasEvents && (
        <View
          style={{
            alignItems: "center",
            marginTop: 24,
          }}
        >
          {/* Calendar Illustration */}
          <View
            style={{
              backgroundColor: isDark ? "#312e81" : "#e0e7ff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 12,
              }}
            >
              {/* First Calendar */}
              <View
                style={{
                  width: 70,
                  height: 80,
                  backgroundColor: isDark ? "#4338ca" : "#c7d2fe",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                {/* Calendar Header */}
                <View
                  style={{
                    height: 20,
                    backgroundColor: isDark ? "#6366f1" : "#818cf8",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                {/* Calendar Body */}
                <View
                  style={{
                    flex: 1,
                    padding: 8,
                    justifyContent: "space-around",
                  }}
                >
                  {[...Array(3)].map((_, rowIndex) => (
                    <View
                      key={rowIndex}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      {[...Array(3)].map((_, colIndex) => (
                        <View
                          key={colIndex}
                          style={{
                            width: 6,
                            height: 6,
                            backgroundColor: isDark ? "#6366f1" : "#a5b4fc",
                            borderRadius: 1,
                          }}
                        />
                      ))}
                    </View>
                  ))}
                </View>
              </View>

              {/* Second Calendar */}
              <View
                style={{
                  width: 70,
                  height: 80,
                  backgroundColor: isDark ? "#4338ca" : "#c7d2fe",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                {/* Calendar Header */}
                <View
                  style={{
                    height: 20,
                    backgroundColor: isDark ? "#6366f1" : "#818cf8",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                {/* Calendar Body */}
                <View
                  style={{
                    flex: 1,
                    padding: 8,
                    justifyContent: "space-around",
                  }}
                >
                  {[...Array(3)].map((_, rowIndex) => (
                    <View
                      key={rowIndex}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      {[...Array(3)].map((_, colIndex) => (
                        <View
                          key={colIndex}
                          style={{
                            width: 6,
                            height: 6,
                            backgroundColor: isDark ? "#6366f1" : "#a5b4fc",
                            borderRadius: 1,
                          }}
                        />
                      ))}
                    </View>
                  ))}
                </View>
              </View>

              {/* Third Calendar */}
              <View
                style={{
                  width: 70,
                  height: 80,
                  backgroundColor: isDark ? "#4338ca" : "#c7d2fe",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                {/* Calendar Header */}
                <View
                  style={{
                    height: 20,
                    backgroundColor: isDark ? "#6366f1" : "#818cf8",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                {/* Calendar Body */}
                <View
                  style={{
                    flex: 1,
                    padding: 8,
                    justifyContent: "space-around",
                  }}
                >
                  {[...Array(3)].map((_, rowIndex) => (
                    <View
                      key={rowIndex}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      {[...Array(3)].map((_, colIndex) => (
                        <View
                          key={colIndex}
                          style={{
                            width: 6,
                            height: 6,
                            backgroundColor: isDark ? "#6366f1" : "#a5b4fc",
                            borderRadius: 1,
                          }}
                        />
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* No Events Text */}
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
            No Events Scheduled
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
            You don't have any events scheduled for today. Check back later or
            create a new event!
          </Text>
        </View>
      )}

      {/* When there are events, you can add event list here */}
      {hasEvents && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: theme.text }}>Event list will go here...</Text>
        </View>
      )}
    </View>
  );
}
