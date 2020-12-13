import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import ColorService from '../../services/color.service';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export interface ColorSwatchProps {
  count?: number;
  value?: string;
  onPress(color: string): void;
  iconSize?: number;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  count = 10,
  value,
  onPress,
  iconSize = 34,
}: ColorSwatchProps) => {
  const [colors] = useState<string[]>(ColorService.random(count));

  return (
    <View style={styles.container}>
      {colors.map((color, index) => (
        <IconButton
          key={index}
          icon={value === color ? 'circle-outline' : 'circle'}
          color={color}
          size={iconSize}
          onPress={(): void => onPress(color)}
        />
      ))}
    </View>
  );
};

export default ColorSwatch;
