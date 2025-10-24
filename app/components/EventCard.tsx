import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme, getEventColor, getEventTypeLabel, EventType } from "../utils/theme";
import { Event } from "../data/sampleEvents";

interface EventCardProps {
  event: Event;
  onPress?: () => void;
  variant?: "default" | "compact";
}

export default function EventCard({ event, onPress, variant = "default" }: EventCardProps) {
  const theme = useTheme();
  const eventColor = getEventColor(theme, event.type);
  const isCompact = variant === "compact";

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
          paddingVertical: isCompact ? 12 : 16,
          paddingHorizontal: isCompact ? 12 : 16,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Event Type Indicator */}
      <View
        style={[
          styles.typeIndicator,
          {
            backgroundColor: eventColor.background,
            width: isCompact ? 3 : 4,
          },
        ]}
      />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.text,
                  fontSize: isCompact ? 14 : 16,
                },
              ]}
              numberOfLines={1}
            >
              {event.title}
            </Text>

            {/* Event Type Badge */}
            <View
              style={[
                styles.typeBadge,
                {
                  backgroundColor: eventColor.light,
                  paddingHorizontal: isCompact ? 6 : 8,
                  paddingVertical: isCompact ? 2 : 4,
                },
              ]}
            >
              <Text
                style={[
                  styles.typeText,
                  {
                    color: eventColor.background,
                    fontSize: isCompact ? 10 : 12,
                  },
                ]}
              >
                {getEventTypeLabel(event.type)}
              </Text>
            </View>
          </View>

          {/* Time */}
          <Text
            style={[
              styles.time,
              {
                color: theme.textSecondary,
                fontSize: isCompact ? 12 : 14,
              },
            ]}
          >
            {event.startTime} - {event.endTime}
          </Text>
        </View>

        {/* Description */}
        {!isCompact && event.description && (
          <Text
            style={[
              styles.description,
              {
                color: theme.textTertiary,
              },
            ]}
            numberOfLines={2}
          >
            {event.description}
          </Text>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          {event.location && (
            <Text
              style={[
                styles.location,
                {
                  color: theme.textTertiary,
                  fontSize: isCompact ? 11 : 12,
                },
              ]}
            >
              📍 {event.location}
            </Text>
          )}

          {event.attendees && event.attendees.length > 0 && (
            <Text
              style={[
                styles.attendees,
                {
                  color: theme.textTertiary,
                  fontSize: isCompact ? 11 : 12,
                },
              ]}
            >
              👥 {event.attendees.length} attendee{event.attendees.length > 1 ? 's' : ''}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Variant for event type filtering/grouping
export function EventTypeHeader({ type, count }: { type: EventType; count: number }) {
  const theme = useTheme();
  const eventColor = getEventColor(theme, type);

  return (
    <View style={[styles.typeHeader, { backgroundColor: theme.backgroundSecondary }]}>
      <View
        style={[
          styles.typeHeaderIndicator,
          {
            backgroundColor: eventColor.background,
          },
        ]}
      />
      <Text
        style={[
          styles.typeHeaderTitle,
          {
            color: theme.text,
          },
        ]}
      >
        {getEventTypeLabel(type)}s
      </Text>
      <View
        style={[
          styles.countBadge,
          {
            backgroundColor: eventColor.light,
          },
        ]}
      >
        <Text
          style={[
            styles.countText,
            {
              color: eventColor.background,
            },
          ]}
        >
          {count}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 4,
    overflow: "hidden",
  },
  typeIndicator: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontFamily: "LeagueSpartan_600SemiBold",
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    borderRadius: 6,
  },
  typeText: {
    fontFamily: "LeagueSpartan_500Medium",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  time: {
    fontFamily: "LeagueSpartan_500Medium",
  },
  description: {
    fontFamily: "LeagueSpartan_400Regular",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontFamily: "LeagueSpartan_400Regular",
    flex: 1,
  },
  attendees: {
    fontFamily: "LeagueSpartan_400Regular",
  },
  typeHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  typeHeaderIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
  },
  typeHeaderTitle: {
    fontFamily: "LeagueSpartan_600SemiBold",
    fontSize: 16,
    flex: 1,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 24,
    alignItems: "center",
  },
  countText: {
    fontFamily: "LeagueSpartan_600SemiBold",
    fontSize: 12,
  },
});
