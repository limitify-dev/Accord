import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useState } from "react";
import { useTheme, fontFamilies, useIsDark } from "../utils/theme";
import {
  MagnifyingGlass,
  Funnel,
  ChatCircleDots,
  Phone,
  Envelope,
  X,
  User,
  MapPin,
  Buildings,
  CalendarBlank,
} from "react-native-phosphor";

// Sample member data
const members = [
  {
    id: 1,
    name: "Pastor Mark Johnson",
    role: "Senior Pastor",
    organization: "Main Church",
    phone: "+250 788 123 456",
    email: "mark.j@accord.com",
    joinDate: "Jan 2020",
    location: "Kigali, Rwanda",
    profileImage: "https://i.pravatar.cc/150?img=12",
    status: "online",
    bio: "Leading the congregation with faith and dedication",
  },
  {
    id: 2,
    name: "Elder Sarah Williams",
    role: "Church Elder",
    organization: "Leadership Team",
    phone: "+250 788 234 567",
    email: "sarah.w@accord.com",
    joinDate: "Mar 2020",
    location: "Kigali, Rwanda",
    profileImage: "https://i.pravatar.cc/150?img=5",
    status: "online",
    bio: "Serving the community through outreach programs",
  },
  {
    id: 3,
    name: "Deacon Paul Martinez",
    role: "Deacon",
    organization: "Main Church",
    phone: "+250 788 345 678",
    email: "paul.m@accord.com",
    joinDate: "Jun 2021",
    location: "Kigali, Rwanda",
    profileImage: "https://i.pravatar.cc/150?img=33",
    status: "offline",
    bio: "Coordinating worship services and events",
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "Youth Director",
    organization: "Youth Ministry",
    phone: "+250 788 456 789",
    email: "emily.c@accord.com",
    joinDate: "Sep 2021",
    location: "Kigali, Rwanda",
    profileImage: "https://i.pravatar.cc/150?img=9",
    status: "online",
    bio: "Empowering the next generation",
  },
  {
    id: 5,
    name: "David Thompson",
    role: "Worship Leader",
    organization: "Music Ministry",
    phone: "+250 788 567 890",
    email: "david.t@accord.com",
    joinDate: "Feb 2022",
    location: "Kigali, Rwanda",
    profileImage: "https://i.pravatar.cc/150?img=13",
    status: "offline",
    bio: "Leading worship with passion",
  },
  {
    id: 6,
    name: "Grace Ndayisenga",
    role: "Community Coordinator",
    organization: "Outreach Team",
    phone: "+250 788 678 901",
    email: "grace.n@accord.com",
    joinDate: "May 2022",
    location: "Kigali, Rwanda",
    profileImage: "https://i.pravatar.cc/150?img=24",
    status: "online",
    bio: "Building bridges in our community",
  },
  {
    id: 7,
    name: "Thomas Mukiza",
    role: "Finance Officer",
    organization: "Administration",
    phone: "+250 788 789 012",
    email: "thomas.m@accord.com",
    joinDate: "Aug 2020",
    location: "Kigali, Rwanda",
    profileImage: "https://i.pravatar.cc/150?img=51",
    status: "offline",
    bio: "Managing resources with integrity",
  },
  {
    id: 8,
    name: "Mary Uwase",
    role: "Children's Ministry Lead",
    organization: "Children's Ministry",
    phone: "+250 788 890 123",
    email: "mary.u@accord.com",
    joinDate: "Nov 2021",
    location: "Kigali, Rwanda",
    profileImage: "https://i.pravatar.cc/150?img=47",
    status: "online",
    bio: "Nurturing young hearts and minds",
  },
];

export default function Community() {
  const theme = useTheme();
  const isDark = useIsDark();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.organization.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
              Community
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
              <Funnel size={24} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Member Count */}
          <Text
            style={{
              fontSize: 14,
              color: isDark ? "#94a3b8" : "#64748b",
              marginTop: 4,
            }}
          >
            {members.length} members
          </Text>
        </View>

        {/* Search Bar */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: isDark ? "#1e293b" : "#f1f5f9",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <MagnifyingGlass
              size={20}
              color={isDark ? "#64748b" : "#94a3b8"}
              weight="bold"
            />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search members..."
              placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
              style={{
                flex: 1,
                marginLeft: 12,
                fontSize: 16,
                color: theme.text,
                fontFamily: fontFamilies.regular,
              }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <X size={20} color={isDark ? "#64748b" : "#94a3b8"} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Members List */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <TouchableOpacity
                key={member.id}
                onPress={() => {
                  setSelectedMember(member);
                  setShowDetailModal(true);
                }}
                style={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                }}
              >
                {/* Profile Image */}
                <View style={{ position: "relative" }}>
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 28,
                      backgroundColor: isDark ? "#4338ca" : "#6366f1",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: "#ffffff",
                      }}
                    >
                      {member.name.charAt(0)}
                    </Text>
                  </View>
                  {/* Online Status Indicator */}
                  {member.status === "online" && (
                    <View
                      style={{
                        position: "absolute",
                        bottom: 2,
                        right: 2,
                        width: 14,
                        height: 14,
                        borderRadius: 7,
                        backgroundColor: "#10b981",
                        borderWidth: 2,
                        borderColor: theme.background,
                      }}
                    />
                  )}
                </View>

                {/* Member Info */}
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: theme.text,
                      marginBottom: 4,
                    }}
                  >
                    {member.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: isDark ? "#94a3b8" : "#64748b",
                      marginBottom: 2,
                    }}
                  >
                    {member.role}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: isDark ? "#64748b" : "#94a3b8",
                    }}
                  >
                    {member.organization}
                  </Text>
                </View>

                {/* Message Button */}
                <TouchableOpacity
                  onPress={() => {
                    // Handle direct message
                    console.log(`Message ${member.name}`);
                  }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: isDark ? "#312e81" : "#e0e7ff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ChatCircleDots
                    size={22}
                    color={isDark ? "#a5b4fc" : "#6366f1"}
                    weight="fill"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                padding: 48,
                alignItems: "center",
              }}
            >
              <User
                size={64}
                color={isDark ? "#475569" : "#94a3b8"}
                weight="thin"
              />
              <Text
                style={{
                  marginTop: 16,
                  fontSize: 18,
                  fontWeight: "600",
                  color: theme.text,
                  textAlign: "center",
                }}
              >
                No members found
              </Text>
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 14,
                  color: isDark ? "#94a3b8" : "#64748b",
                  textAlign: "center",
                }}
              >
                Try adjusting your search
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Member Detail Modal */}
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
                paddingBottom: insets.bottom + 24,
                maxHeight: "85%",
              }}
            >
              {selectedMember && (
                <>
                  {/* Header with close button */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      padding: 16,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setShowDetailModal(false)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: isDark ? "#1e293b" : "#f1f5f9",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <X size={24} color={theme.text} weight="bold" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 24 }}
                  >
                    {/* Profile Section */}
                    <View style={{ alignItems: "center", marginBottom: 24 }}>
                      <View style={{ position: "relative" }}>
                        <View
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: isDark ? "#4338ca" : "#6366f1",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 40,
                              fontWeight: "700",
                              color: "#ffffff",
                            }}
                          >
                            {selectedMember.name.charAt(0)}
                          </Text>
                        </View>
                        {selectedMember.status === "online" && (
                          <View
                            style={{
                              position: "absolute",
                              bottom: 4,
                              right: 4,
                              width: 20,
                              height: 20,
                              borderRadius: 10,
                              backgroundColor: "#10b981",
                              borderWidth: 3,
                              borderColor: theme.background,
                            }}
                          />
                        )}
                      </View>

                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "700",
                          color: theme.text,
                          marginTop: 16,
                          textAlign: "center",
                        }}
                      >
                        {selectedMember.name}
                      </Text>

                      <Text
                        style={{
                          fontSize: 16,
                          color: isDark ? "#a5b4fc" : "#6366f1",
                          marginTop: 4,
                          fontWeight: "600",
                        }}
                      >
                        {selectedMember.role}
                      </Text>

                      {selectedMember.bio && (
                        <Text
                          style={{
                            fontSize: 14,
                            color: isDark ? "#94a3b8" : "#64748b",
                            marginTop: 8,
                            textAlign: "center",
                            lineHeight: 20,
                          }}
                        >
                          {selectedMember.bio}
                        </Text>
                      )}
                    </View>

                    {/* Quick Actions */}
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 12,
                        marginBottom: 24,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          backgroundColor: isDark ? "#4338ca" : "#6366f1",
                          paddingVertical: 14,
                          borderRadius: 12,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                        }}
                      >
                        <ChatCircleDots
                          size={20}
                          color="#ffffff"
                          weight="fill"
                        />
                        <Text
                          style={{
                            color: "#ffffff",
                            fontSize: 15,
                            fontWeight: "600",
                          }}
                        >
                          Message
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: isDark ? "#1e293b" : "#f1f5f9",
                          borderRadius: 12,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Phone size={22} color={theme.text} weight="bold" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: isDark ? "#1e293b" : "#f1f5f9",
                          borderRadius: 12,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Envelope size={22} color={theme.text} weight="bold" />
                      </TouchableOpacity>
                    </View>

                    {/* Details Section */}
                    <View
                      style={{
                        backgroundColor: isDark ? "#1e293b" : "#f8fafc",
                        borderRadius: 16,
                        padding: 16,
                        gap: 16,
                      }}
                    >
                      {/* Organization */}
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
                          Organization
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Buildings
                            size={20}
                            color={isDark ? "#a5b4fc" : "#6366f1"}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: theme.text,
                              fontWeight: "500",
                            }}
                          >
                            {selectedMember.organization}
                          </Text>
                        </View>
                      </View>

                      {/* Location */}
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
                            gap: 10,
                          }}
                        >
                          <MapPin
                            size={20}
                            color={isDark ? "#a5b4fc" : "#6366f1"}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: theme.text,
                              fontWeight: "500",
                            }}
                          >
                            {selectedMember.location}
                          </Text>
                        </View>
                      </View>

                      {/* Join Date */}
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
                          Member Since
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <CalendarBlank
                            size={20}
                            color={isDark ? "#a5b4fc" : "#6366f1"}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: theme.text,
                              fontWeight: "500",
                            }}
                          >
                            {selectedMember.joinDate}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Contact Information */}
                    <View style={{ marginTop: 16, marginBottom: 24 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "700",
                          color: theme.text,
                          marginBottom: 12,
                        }}
                      >
                        Contact Information
                      </Text>

                      <View
                        style={{
                          backgroundColor: isDark ? "#1e293b" : "#f8fafc",
                          borderRadius: 16,
                          padding: 16,
                          gap: 16,
                        }}
                      >
                        {/* Phone */}
                        <View>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "600",
                              color: isDark ? "#94a3b8" : "#64748b",
                              marginBottom: 6,
                            }}
                          >
                            Phone
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              color: theme.text,
                              fontWeight: "500",
                            }}
                          >
                            {selectedMember.phone}
                          </Text>
                        </View>

                        {/* Email */}
                        <View>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "600",
                              color: isDark ? "#94a3b8" : "#64748b",
                              marginBottom: 6,
                            }}
                          >
                            Email
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              color: theme.text,
                              fontWeight: "500",
                            }}
                          >
                            {selectedMember.email}
                          </Text>
                        </View>
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
