import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, TouchableOpacity, Modal } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useState } from "react";
import { useTheme, fontFamilies, useIsDark } from "../utils/theme";
import {
  Bell,
  PushPin,
  Funnel,
  CaretRight,
  MapPin,
  Users,
  Clock,
  FileText,
  CheckCircle,
  Circle,
  Spinner,
  CalendarBlank,
  X,
  DotsThree,
} from "react-native-phosphor";

// Sample data
const pinnedDocuments = [
  {
    id: 1,
    title: "Venue Safety Guidelines 2025",
    type: "PDF",
    size: "2.4 MB",
    pinnedBy: "Admin",
    date: "Oct 20, 2025",
  },
  {
    id: 2,
    title: "Monthly Report Template",
    type: "DOCX",
    size: "1.1 MB",
    pinnedBy: "Leadership Team",
    date: "Oct 18, 2025",
  },
];

const activities = [
  {
    id: 1,
    title: "Church Cleaning & Maintenance",
    description: "Deep cleaning of main sanctuary and side rooms",
    status: "in_progress",
    venue: "Main Church Building",
    assignedTo: "Maintenance Team",
    members: ["John D.", "Sarah M.", "Mike R.", "Lisa K."],
    startDate: "Oct 22, 2025",
    endDate: "Oct 22, 2025",
    progress: 65,
    category: "maintenance",
    color: "#10b981",
  },
  {
    id: 2,
    title: "Guest Speaker Visit - Rev. James",
    description: "Special sermon and Q&A session with visiting minister",
    status: "upcoming",
    venue: "Main Sanctuary",
    assignedTo: "Events Committee",
    members: ["Pastor Mark", "Elder Sarah", "Deacon Paul"],
    startDate: "Oct 25, 2025",
    endDate: "Oct 25, 2025",
    progress: 0,
    category: "event",
    color: "#ec4899",
  },
  {
    id: 3,
    title: "Youth Program Preparation",
    description: "Setup materials and activities for weekend youth program",
    status: "in_progress",
    venue: "Youth Center",
    assignedTo: "Youth Ministry",
    members: ["Emily W.", "David L.", "Grace T.", "Sam H.", "Rachel M."],
    startDate: "Oct 22, 2025",
    endDate: "Oct 23, 2025",
    progress: 40,
    category: "program",
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Community Outreach Planning",
    description: "Organize food drive and community assistance program",
    status: "pending",
    venue: "Community Center",
    assignedTo: "Outreach Team",
    members: ["Thomas B.", "Mary J.", "Peter K."],
    startDate: "Oct 28, 2025",
    endDate: "Oct 30, 2025",
    progress: 0,
    category: "outreach",
    color: "#3b82f6",
  },
  {
    id: 5,
    title: "Sunday Service Setup",
    description: "Audio/visual equipment check and seating arrangement",
    status: "completed",
    venue: "Main Sanctuary",
    assignedTo: "Technical Team",
    members: ["Alex C.", "Jordan P."],
    startDate: "Oct 21, 2025",
    endDate: "Oct 21, 2025",
    progress: 100,
    category: "service",
    color: "#6366f1",
  },
];

export default function Activities() {
  const theme = useTheme();
  const isDark = useIsDark();
  const insets = useSafeAreaInsets();
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "in_progress":
        return {
          label: "In Progress",
          icon: Spinner,
          bgColor: isDark ? "#065f4620" : "#d1fae520",
          textColor: "#10b981",
        };
      case "upcoming":
        return {
          label: "Upcoming",
          icon: Clock,
          bgColor: isDark ? "#1e40af20" : "#dbeafe20",
          textColor: "#3b82f6",
        };
      case "pending":
        return {
          label: "Pending",
          icon: Circle,
          bgColor: isDark ? "#78350f20" : "#fef3c720",
          textColor: "#f59e0b",
        };
      case "completed":
        return {
          label: "Completed",
          icon: CheckCircle,
          bgColor: isDark ? "#14532d20" : "#dcfce720",
          textColor: "#22c55e",
        };
      default:
        return {
          label: "Unknown",
          icon: Circle,
          bgColor: isDark ? "#1e293b" : "#f1f5f9",
          textColor: theme.text,
        };
    }
  };

  const filteredActivities =
    activeFilter === "all"
      ? activities
      : activities.filter((a) => a.status === activeFilter);

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.background,
        }}
        edges={["top", "left", "right"]}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 12,
            backgroundColor: theme.background,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: "700",
                color: theme.text,
                fontFamily: fontFamilies.bold || fontFamilies.regular,
              }}
            >
              Activities
            </Text>
            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: isDark ? "#1e293b" : "#f1f5f9",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bell size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: 12,
            maxHeight: 60,
          }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 8,
          }}
        >
          {[
            { id: "all", label: "All" },
            { id: "in_progress", label: "In Progress" },
            { id: "upcoming", label: "Upcoming" },
            { id: "pending", label: "Pending" },
            { id: "completed", label: "Completed" },
          ].map((filter) => {
            const isSelected = activeFilter === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                onPress={() => setActiveFilter(filter.id)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: isSelected
                    ? isDark
                      ? "#4338ca"
                      : "#6366f1"
                    : isDark
                      ? "#1e293b"
                      : "#f1f5f9",
                }}
              >
                <Text
                  style={{
                    color: isSelected
                      ? "#ffffff"
                      : isDark
                        ? "#94a3b8"
                        : "#64748b",
                    fontFamily: fontFamilies.regular,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Pinned Documents Section */}
          <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                gap: 8,
              }}
            >
              <PushPin size={20} color={theme.text} weight="fill" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: theme.text,
                  fontFamily: fontFamilies.bold || fontFamilies.regular,
                }}
              >
                Pinned Documents
              </Text>
            </View>

            {pinnedDocuments.map((doc) => (
              <TouchableOpacity
                key={doc.id}
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
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    backgroundColor: isDark ? "#312e81" : "#e0e7ff",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <FileText
                    size={24}
                    color={isDark ? "#a5b4fc" : "#6366f1"}
                    weight="fill"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: theme.text,
                      marginBottom: 4,
                    }}
                  >
                    {doc.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: isDark ? "#94a3b8" : "#64748b",
                    }}
                  >
                    {doc.type} • {doc.size} • Pinned by {doc.pinnedBy}
                  </Text>
                </View>

                <CaretRight size={20} color={isDark ? "#64748b" : "#94a3b8"} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Activities Section */}
          <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: theme.text,
                marginBottom: 12,
                fontFamily: fontFamilies.bold || fontFamilies.regular,
              }}
            >
              Current Activities
            </Text>

            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => {
                const statusConfig = getStatusConfig(activity.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <TouchableOpacity
                    key={activity.id}
                    onPress={() => {
                      setSelectedActivity(activity);
                      setShowDetailModal(true);
                    }}
                    style={{
                      backgroundColor: isDark ? "#1e293b" : "#ffffff",
                      borderRadius: 16,
                      padding: 16,
                      marginBottom: 16,
                      borderLeftWidth: 4,
                      borderLeftColor: activity.color,
                    }}
                  >
                    {/* Header */}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 12,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: "700",
                            color: theme.text,
                            marginBottom: 4,
                          }}
                        >
                          {activity.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: isDark ? "#94a3b8" : "#64748b",
                            lineHeight: 20,
                          }}
                        >
                          {activity.description}
                        </Text>
                      </View>

                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: 12,
                          backgroundColor: statusConfig.bgColor,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <StatusIcon
                          size={14}
                          color={statusConfig.textColor}
                          weight="fill"
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: statusConfig.textColor,
                          }}
                        >
                          {statusConfig.label}
                        </Text>
                      </View>
                    </View>

                    {/* Progress Bar (for in_progress activities) */}
                    {activity.status === "in_progress" && (
                      <View style={{ marginBottom: 12 }}>
                        <View
                          style={{
                            height: 6,
                            backgroundColor: isDark ? "#334155" : "#e2e8f0",
                            borderRadius: 3,
                            overflow: "hidden",
                          }}
                        >
                          <View
                            style={{
                              height: "100%",
                              width: `${activity.progress}%`,
                              backgroundColor: activity.color,
                              borderRadius: 3,
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: 12,
                            color: isDark ? "#94a3b8" : "#64748b",
                            marginTop: 4,
                          }}
                        >
                          {activity.progress}% complete
                        </Text>
                      </View>
                    )}

                    {/* Details */}
                    <View style={{ gap: 8 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <MapPin
                          size={16}
                          color={isDark ? "#94a3b8" : "#64748b"}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: isDark ? "#94a3b8" : "#64748b",
                          }}
                        >
                          {activity.venue}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Users
                          size={16}
                          color={isDark ? "#94a3b8" : "#64748b"}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: isDark ? "#94a3b8" : "#64748b",
                          }}
                        >
                          {activity.assignedTo} • {activity.members.length}{" "}
                          members
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <CalendarBlank
                          size={16}
                          color={isDark ? "#94a3b8" : "#64748b"}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: isDark ? "#94a3b8" : "#64748b",
                          }}
                        >
                          {activity.startDate}
                          {activity.endDate !== activity.startDate &&
                            ` - ${activity.endDate}`}
                        </Text>
                      </View>
                    </View>

                    {/* Team Members Preview */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 12,
                        paddingTop: 12,
                        borderTopWidth: 1,
                        borderTopColor: isDark ? "#334155" : "#e2e8f0",
                      }}
                    >
                      <View style={{ flexDirection: "row", marginRight: 8 }}>
                        {activity.members.slice(0, 3).map((member, index) => (
                          <View
                            key={index}
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 14,
                              backgroundColor: activity.color,
                              alignItems: "center",
                              justifyContent: "center",
                              marginLeft: index > 0 ? -8 : 0,
                              borderWidth: 2,
                              borderColor: theme.background,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "600",
                                color: "#ffffff",
                              }}
                            >
                              {member.charAt(0)}
                            </Text>
                          </View>
                        ))}
                      </View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: isDark ? "#94a3b8" : "#64748b",
                        }}
                      >
                        {activity.members.length > 3
                          ? `+${activity.members.length - 3} more`
                          : activity.members.slice(0, 3).join(", ")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View
                style={{
                  padding: 32,
                  alignItems: "center",
                  backgroundColor: isDark ? "#1e293b" : "#f8fafc",
                  borderRadius: 12,
                }}
              >
                <Circle
                  size={48}
                  color={isDark ? "#475569" : "#94a3b8"}
                  weight="thin"
                />
                <Text
                  style={{
                    marginTop: 12,
                    fontSize: 16,
                    color: isDark ? "#94a3b8" : "#64748b",
                    textAlign: "center",
                  }}
                >
                  No activities found
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Activity Detail Modal */}
        <Modal
          visible={showDetailModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowDetailModal(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: theme.background,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                padding: 24,
                paddingBottom: insets.bottom + 24,
                maxHeight: "90%",
              }}
            >
              {selectedActivity && (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 20,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          width: 4,
                          height: 40,
                          backgroundColor: selectedActivity.color,
                          borderRadius: 2,
                          position: "absolute",
                          left: -12,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "700",
                          color: theme.text,
                          marginBottom: 8,
                        }}
                      >
                        {selectedActivity.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: isDark ? "#94a3b8" : "#64748b",
                          lineHeight: 22,
                        }}
                      >
                        {selectedActivity.description}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setShowDetailModal(false)}
                      style={{ padding: 4 }}
                    >
                      <X size={28} color={theme.text} weight="bold" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ gap: 24 }}>
                      {/* Status */}
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: isDark ? "#94a3b8" : "#64748b",
                            marginBottom: 8,
                            textTransform: "uppercase",
                          }}
                        >
                          Status
                        </Text>
                        {(() => {
                          const statusConfig = getStatusConfig(
                            selectedActivity.status,
                          );
                          const StatusIcon = statusConfig.icon;
                          return (
                            <View
                              style={{
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                borderRadius: 12,
                                backgroundColor: statusConfig.bgColor,
                                alignSelf: "flex-start",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
                              <StatusIcon
                                size={18}
                                color={statusConfig.textColor}
                                weight="fill"
                              />
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "600",
                                  color: statusConfig.textColor,
                                }}
                              >
                                {statusConfig.label}
                              </Text>
                            </View>
                          );
                        })()}
                      </View>

                      {/* Venue */}
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: isDark ? "#94a3b8" : "#64748b",
                            marginBottom: 8,
                            textTransform: "uppercase",
                          }}
                        >
                          Venue
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <MapPin size={20} color={theme.text} />
                          <Text style={{ fontSize: 16, color: theme.text }}>
                            {selectedActivity.venue}
                          </Text>
                        </View>
                      </View>

                      {/* Dates */}
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: isDark ? "#94a3b8" : "#64748b",
                            marginBottom: 8,
                            textTransform: "uppercase",
                          }}
                        >
                          Timeline
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <CalendarBlank size={20} color={theme.text} />
                          <Text style={{ fontSize: 16, color: theme.text }}>
                            {selectedActivity.startDate}
                            {selectedActivity.endDate !==
                              selectedActivity.startDate &&
                              ` - ${selectedActivity.endDate}`}
                          </Text>
                        </View>
                      </View>

                      {/* Assigned Group */}
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: isDark ? "#94a3b8" : "#64748b",
                            marginBottom: 12,
                            textTransform: "uppercase",
                          }}
                        >
                          Assigned To
                        </Text>
                        <View
                          style={{
                            backgroundColor: isDark ? "#312e81" : "#e0e7ff",
                            padding: 16,
                            borderRadius: 12,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 8,
                            }}
                          >
                            <Users
                              size={20}
                              color={isDark ? "#a5b4fc" : "#6366f1"}
                              weight="fill"
                            />
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: theme.text,
                              }}
                            >
                              {selectedActivity.assignedTo}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              color: isDark ? "#94a3b8" : "#64748b",
                            }}
                          >
                            {selectedActivity.members.length} team members
                          </Text>
                        </View>
                      </View>

                      {/* Team Members */}
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: isDark ? "#94a3b8" : "#64748b",
                            marginBottom: 12,
                            textTransform: "uppercase",
                          }}
                        >
                          Team Members
                        </Text>
                        <View style={{ gap: 8 }}>
                          {selectedActivity.members.map(
                            (member: string, index: number) => (
                              <View
                                key={index}
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  padding: 12,
                                  backgroundColor: isDark
                                    ? "#1e293b"
                                    : "#f8fafc",
                                  borderRadius: 10,
                                  gap: 12,
                                }}
                              >
                                <View
                                  style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 18,
                                    backgroundColor: selectedActivity.color,
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      fontWeight: "600",
                                      color: "#ffffff",
                                    }}
                                  >
                                    {member.charAt(0)}
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    color: theme.text,
                                    fontWeight: "500",
                                  }}
                                >
                                  {member}
                                </Text>
                              </View>
                            ),
                          )}
                        </View>
                      </View>

                      {/* Progress (if in progress) */}
                      {selectedActivity.status === "in_progress" && (
                        <View>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "600",
                              color: isDark ? "#94a3b8" : "#64748b",
                              marginBottom: 12,
                              textTransform: "uppercase",
                            }}
                          >
                            Progress
                          </Text>
                          <View
                            style={{
                              height: 8,
                              backgroundColor: isDark ? "#334155" : "#e2e8f0",
                              borderRadius: 4,
                              overflow: "hidden",
                              marginBottom: 8,
                            }}
                          >
                            <View
                              style={{
                                height: "100%",
                                width: `${selectedActivity.progress}%`,
                                backgroundColor: selectedActivity.color,
                                borderRadius: 4,
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "600",
                              color: theme.text,
                            }}
                          >
                            {selectedActivity.progress}% Complete
                          </Text>
                        </View>
                      )}

                      {/* Action Buttons */}
                      <View style={{ marginTop: 12, gap: 12 }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: isDark ? "#4338ca" : "#6366f1",
                            paddingVertical: 16,
                            borderRadius: 12,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#ffffff",
                              fontSize: 16,
                              fontWeight: "600",
                            }}
                          >
                            Update Progress
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            backgroundColor: isDark ? "#1e293b" : "#f1f5f9",
                            paddingVertical: 16,
                            borderRadius: 12,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: theme.text,
                              fontSize: 16,
                              fontWeight: "600",
                            }}
                          >
                            View Full Details
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </>
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}
