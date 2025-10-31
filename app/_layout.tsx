// Import React and React Native components
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

// Import Expo and Navigation components
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

// Import theme-related components and hooks
import { ThemeProvider as NavigationThemeProvider, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { useColorScheme } from '../src/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;
  
  return (
    <NavigationThemeProvider value={theme}>
      {children}
    </NavigationThemeProvider>
  );
};

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeWrapper>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style={useColorScheme() === 'dark' ? 'light' : 'dark'} />
    </ThemeWrapper>
  );
}
