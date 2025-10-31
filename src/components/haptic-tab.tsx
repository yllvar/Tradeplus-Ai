import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import * as Haptics from 'expo-haptics';

type HapticTabProps = TouchableOpacityProps & {
  children: React.ReactNode;
  onPress?: () => void;
};

export function HapticTab({ children, onPress, ...props }: HapticTabProps) {
  const handlePress = () => {
    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Call the original onPress if provided
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

// Export as default to match the import in _layout.tsx
export default HapticTab;
