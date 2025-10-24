import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useState, useRef } from "react";
import {
  useTheme,
  fontFamilies,
  useIsDark,
  getEventColor,
  getEventTypeLabel,
  EventType,
} from "../utils/theme";
import {
  CalendarBlank,
  CaretLeft,
  CaretRight,
  FunnelSimple,
  Plus,
  Clock,
  MapPin,
  Users,
  CheckSquare,
  CalendarCheck,
  X,
} from "react-native-phosphor";

// Sample data - Extended with more events
const sampleEvents = [
  {
    id: 1,
    type: "meeting" as EventType,
    title: "Team Standup",
    time: "09:00 AM",
    duration: "30 min",
    location: "Conference Room A",
    attendees: 5,
    date: new Date(2025, 9, 22), // Oct 22
  },
  {
    id: 2,
    type: "task" as EventType,
    title: "Review Q4 Reports",
    time: "11:00 AM",
    duration: "1 hour",
    location: "Office",
    date: new Date(2025, 9, 22),
  },
  {
    id: 3,
    type: "event" as EventType,
    title: "Company Lunch",
    time: "01:00 PM",
    duration: "1 hour",
    location: "Main Hall",
    attendees: 20,
    date: new Date(2025, 9, 22),
  },
  {
    id: 4,
    type: "meeting" as EventType,
    title: "Client Presentation",
    time: "03:00 PM",
    duration: "45 min",
    location: "Zoom",
    attendees: 8,
    date: new Date(2025, 9, 22),
  },
  {
    id: 5,
    type: "meeting" as EventType,
    title: "Sprint Planning",
    time: "10:00 AM",
    duration: "2 hours",
    location: "Conference Room B",
    attendees: 12,
    date: new Date(2025, 9, 23),
  },
  {
    id: 6,
    type: "task" as EventType,
    title: "Update Documentation",
    time: "02:00 PM",
    duration: "1.5 hours",
    location: "Office",
    date: new Date(2025, 9, 23),
  },
  {
    id: 7,
    type: "event" as EventType,
    title: "Team Building Activity",
    time: "04:00 PM",
    duration: "2 hours",
    location: "Recreation Center",
    attendees: 25,
    date: new Date(2025, 9, 24),
  },
  {
    id: 8,
    type: "meeting" as EventType,
    title: "1-on-1 with Manager",
    time: "09:30 AM",
    duration: "30 min",
    location: "Office",
    attendees: 2,
    date: new Date(2025, 9, 25),
  },
  {
    id: 9,
    type: "task" as EventType,
    title: "Code Review",
    time: "11:30 AM",
    duration: "45 min",
    location: "Office",
    date: new Date(2025, 9, 25),
  },
  {
    id: 10,
    type: "event" as EventType,
    title: "Product Demo",
    time: "03:00 PM",
    duration: "1 hour",
    location: "Main Auditorium",
    attendees: 50,
    date: new Date(2025, 9, 28),
  },
  {
    id: 11,
    type: "meeting" as EventType,
    title: "Monthly All-Hands",
    time: "10:00 AM",
    duration: "1 hour",
    location: "Conference Hall",
    attendees: 100,
    date: new Date(2025, 9, 29),
  },
  {
    id: 12,
    type: "task" as EventType,
    title: "Prepare Quarterly Report",
    time: "02:00 PM",
    duration: "3 hours",
    location: "Office",
    date: new Date(2025, 9, 29),
  },
  {
    id: 13,
    type: "event" as EventType,
    title: "Halloween Party",
    time: "05:00 PM",
    duration: "2 hours",
    location: "Office Lounge",
    attendees: 15,
    date: new Date(2025, 9, 30),
  },
];

export default function Schedule() {
  const theme = useTheme();
  const isDark = useIsDark();
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Generate calendar days for current month
  const getDaysInMonth = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty slots for days before month starts
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days in month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const filters = [
    { id: "all", label: "All", icon: CalendarBlank },
    { id: "meeting", label: "Meetings", icon: Users },
    { id: "task", label: "Tasks", icon: CheckSquare },
    { id: "event", label: "Events", icon: CalendarCheck },
  ];

  const filteredEvents =
    selectedFilter === "all"
      ? sampleEvents
      : sampleEvents.filter((e) => e.type === selectedFilter);

  // Get events for selected date
  const selectedDateEvents = sampleEvents.filter(
    (e) => e.date.toDateString() === selectedDate.toDateString(),
  );

  // Get events for a specific day (for calendar indicators)
  const getEventsForDay = (date: Date) => {
    return sampleEvents.filter(
      (e) => e.date.toDateString() === date.toDateString(),
    );
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
            paddingBottom: 8,
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
              Schedule
            </Text>
            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: isDark ? "#312e81" : "#e0e7ff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus
                size={24}
                color={isDark ? "#a5b4fc" : "#6366f1"}
                weight="bold"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
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
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isSelected = selectedFilter === filter.id;

            // Get event color for specific filter types
            const getFilterColor = () => {
              if (filter.id === "meeting")
                return getEventColor(theme, "meeting");
              if (filter.id === "task") return getEventColor(theme, "task");
              if (filter.id === "event") return getEventColor(theme, "event");
              return {
                background: theme.primary, // Use theme primary for "all"
                light: isDark
                  ? "rgba(59, 130, 246, 0.15)"
                  : "rgba(59, 130, 246, 0.1)",
              };
            };

            const filterColor = getFilterColor();

            return (
              <TouchableOpacity
                key={filter.id}
                onPress={() => setSelectedFilter(filter.id)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: isSelected
                    ? filterColor.background
                    : isDark
                      ? theme.backgroundSecondary
                      : theme.backgroundTertiary,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Icon
                  size={18}
                  color={isSelected ? "#ffffff" : theme.textTertiary}
                  weight="bold"
                />
                <Text
                  style={{
                    color: isSelected ? "#ffffff" : theme.textTertiary,
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
          {/* Mini Calendar */}
          <View
            style={{
              marginHorizontal: 16,
              marginTop: 8,
              backgroundColor: isDark ? "#1e293b" : "#f8fafc",
              borderRadius: 16,
              padding: 16,
            }}
          >
            {/* Month Navigation */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setSelectedDate(newDate);
                }}
                style={{ padding: 8 }}
              >
                <CaretLeft size={24} color={theme.text} weight="bold" />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: theme.text,
                  fontFamily: fontFamilies.bold || fontFamilies.regular,
                }}
              >
                {monthNames[selectedDate.getMonth()]}{" "}
                {selectedDate.getFullYear()}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setSelectedDate(newDate);
                }}
                style={{ padding: 8 }}
              >
                <CaretRight size={24} color={theme.text} weight="bold" />
              </TouchableOpacity>
            </View>

            {/* Day Labels */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 12,
              }}
            >
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <Text
                  key={index}
                  style={{
                    width: 36,
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "600",
                    color: isDark ? "#64748b" : "#94a3b8",
                  }}
                >
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {getDaysInMonth().map((day, index) => {
                const isToday =
                  day && day.toDateString() === new Date().toDateString();
                const isSelected =
                  day && day.toDateString() === selectedDate.toDateString();
                const dayEvents = day ? getEventsForDay(day) : [];
                const hasEvents = dayEvents.length > 0;

                return (
                  <TouchableOpacity
                    key={index}
                    disabled={!day}
                    onPress={() => day && setSelectedDate(day)}
                    style={{
                      width: "14.28%",
                      aspectRatio: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 4,
                    }}
                  >
                    {day && (
                      <View style={{ alignItems: "center" }}>
                        <View
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isSelected
                              ? isDark
                                ? "#4338ca"
                                : "#6366f1"
                              : "transparent",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: isToday ? "700" : "400",
                              color: isSelected
                                ? "#ffffff"
                                : isToday
                                  ? isDark
                                    ? "#6366f1"
                                    : "#4338ca"
                                  : theme.text,
                            }}
                          >
                            {day.getDate()}
                          </Text>
                        </View>
                        {/* Event Indicators */}
                        {hasEvents && (
                          <View
                            style={{
                              flexDirection: "row",
                              gap: 2,
                              marginTop: 2,
                            }}
                          >
                            {dayEvents.slice(0, 3).map((event, idx) => (
                              <View
                                key={idx}
                                style={{
                                  width: 4,
                                  height: 4,
                                  borderRadius: 2,
                                  backgroundColor: getEventColor(
                                    theme,
                                    event.type,
                                  ).background,
                                }}
                              />
                            ))}
                          </View>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Schedule List */}
          <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: theme.text,
                marginBottom: 12,
                fontFamily: fontFamilies.bold || fontFamilies.regular,
              }}
            >
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Text>

            {selectedDateEvents.length > 0 ? (
              selectedDateEvents
                .filter((event) =>
                  selectedFilter === "all"
                    ? true
                    : event.type === selectedFilter,
                )
                .map((event) => (
                  <TouchableOpacity
                    key={event.id}
                    onPress={() => {
                      setSelectedEvent(event);
                      setShowDetailModal(true);
                    }}
                    style={{
                      backgroundColor: isDark ? "#1e293b" : "#ffffff",
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 12,
                      borderLeftWidth: 4,
                      borderLeftColor: getEventColor(theme, event.type)
                        .background,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: theme.text,
                            marginBottom: 8,
                          }}
                        >
                          {event.title}
                        </Text>

                        <View style={{ gap: 6 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <Clock
                              size={16}
                              color={isDark ? "#94a3b8" : "#64748b"}
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                color: isDark ? "#94a3b8" : "#64748b",
                              }}
                            >
                              {event.time} • {event.duration}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 6,
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
                              {event.location}
                            </Text>
                          </View>

                          {event.attendees && (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 6,
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
                                {event.attendees} attendees
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>

                      <View
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 12,
                          backgroundColor: getEventColor(theme, event.type)
                            .light,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: getEventColor(theme, event.type).background,
                            textTransform: "capitalize",
                          }}
                        >
                          {getEventTypeLabel(event.type)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
            ) : (
              <View
                style={{
                  padding: 32,
                  alignItems: "center",
                  backgroundColor: isDark ? "#1e293b" : "#f8fafc",
                  borderRadius: 12,
                }}
              >
                <CalendarBlank
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
                  No {selectedFilter === "all" ? "items" : selectedFilter + "s"}{" "}
                  scheduled
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Detail Modal */}
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
                maxHeight: "80%",
              }}
            >
              {selectedEvent && (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <View
                      style={{
                        width: 4,
                        height: 40,
                        backgroundColor: getEventColor(
                          theme,
                          selectedEvent.type,
                        ).background,
                        borderRadius: 2,
                        marginRight: 12,
                      }}
                    />
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 24,
                        fontWeight: "700",
                        color: theme.text,
                      }}
                    >
                      {selectedEvent.title}
                    </Text>
                    <TouchableOpacity onPress={() => setShowDetailModal(false)}>
                      <X size={28} color={theme.text} weight="bold" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ gap: 20 }}>
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
                          Type
                        </Text>
                        <View
                          style={{
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            borderRadius: 12,
                            backgroundColor: getEventColor(
                              theme,
                              selectedEvent.type,
                            ).light,
                            alignSelf: "flex-start",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              color: getEventColor(theme, selectedEvent.type)
                                .background,
                              textTransform: "capitalize",
                            }}
                          >
                            {getEventTypeLabel(selectedEvent.type)}
                          </Text>
                        </View>
                      </View>

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
                          Time
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <Clock size={20} color={theme.text} />
                          <Text style={{ fontSize: 16, color: theme.text }}>
                            {selectedEvent.time} • {selectedEvent.duration}
                          </Text>
                        </View>
                      </View>

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
                          Location
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
                            {selectedEvent.location}
                          </Text>
                        </View>
                      </View>

                      {selectedEvent.attendees && (
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
                            Attendees
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <Users size={20} color={theme.text} />
                            <Text style={{ fontSize: 16, color: theme.text }}>
                              {selectedEvent.attendees} people
                            </Text>
                          </View>
                        </View>
                      )}

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
                            Edit
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
                              color: "#ef4444",
                              fontSize: 16,
                              fontWeight: "600",
                            }}
                          >
                            Delete
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
