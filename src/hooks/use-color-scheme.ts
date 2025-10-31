import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

/**
 * A hook that returns the current color scheme of the device.
 * @returns The current color scheme ('light' or 'dark')
 */
export function useColorScheme(): NonNullable<ColorSchemeName> {
  const colorScheme = _useColorScheme() ?? 'light';
  return colorScheme;
}

/**
 * A hook that returns a boolean indicating if the current color scheme is dark.
 * @returns True if the current color scheme is dark, false otherwise
 */
export function useIsDarkMode(): boolean {
  return useColorScheme() === 'dark';
}

/**
 * A hook that returns theme-aware colors based on the current color scheme.
 * @param lightColor - The color to use in light mode
 * @param darkColor - The color to use in dark mode (defaults to lightColor if not provided)
 * @returns The appropriate color based on the current color scheme
 */
export function useThemeAwareColor(lightColor: string, darkColor?: string): string {
  const isDark = useIsDarkMode();
  return isDark ? darkColor || lightColor : lightColor;
}
