import { Tabs } from "expo-router";
import { useColorScheme, Platform } from "react-native";
import {
  House,
  User,
  Gear,
  CalendarDots,
  Hourglass,
  UsersThree,
} from "react-native-phosphor";
import AdaptiveStatusBar from "../components/AdaptiveStatusBar";
import AppleTabBar from "../components/AppleTabBar";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <>
      <AdaptiveStatusBar />
      <Tabs
        tabBar={(props) => <AppleTabBar {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
          },
          headerTintColor: isDark ? "#fff" : "#000",
          headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: "LeagueSpartan_700Bold",
          },
          headerShown: false,
        }}
      >
        {/*Home*/}
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <House
                color={color}
                size={30}
                weight={focused ? "fill" : "regular"}
              />
            ),
          }}
        />
        {/*Schedule*/}
        <Tabs.Screen
          name="schedule"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <CalendarDots
                color={color}
                size={30}
                weight={focused ? "fill" : "regular"}
              />
            ),
          }}
        />
        {/*Activities*/}
        <Tabs.Screen
          name="activities"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Hourglass
                color={color}
                size={30}
                weight={focused ? "fill" : "regular"}
              />
            ),
          }}
        />
        {/*Members*/}
        <Tabs.Screen
          name="community"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <UsersThree
                color={color}
                size={30}
                weight={focused ? "fill" : "regular"}
              />
            ),
          }}
        />
        {/*Profile*/}
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <User
                color={color}
                size={30}
                weight={focused ? "fill" : "regular"}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
