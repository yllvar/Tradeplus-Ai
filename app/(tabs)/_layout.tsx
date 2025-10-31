import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { IconSymbol } from "../../components/ui/icon-symbol";
import { Colors } from "@constants/theme";

// Define the props type for the tab bar button
interface TabBarButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

const TabBarButton: React.FC<TabBarButtonProps> = (props) => (
  <TouchableOpacity
    {...props}
    activeOpacity={0.7}
  />
);

export default function TabLayout() {
  // Get the color scheme (default to 'light' if not available)
  const colorScheme = 'light'; // Simplified for now
  const tintColor = Colors[colorScheme].tint;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: false,
        // Use our custom TabBarButton
        tabBarButton: (props) => <TabBarButton {...props} />,
      }}
    >
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }: { color: string }) => (
						<IconSymbol size={28} name="house.fill" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
