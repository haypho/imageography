import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton } from 'react-native-paper';
import { MARGIN } from '../../constants';
import Slider from '@react-native-community/slider';
import ColorService from '../../services/color.service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: MARGIN.large,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 15,
  },
  slider: {
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    marginVertical: MARGIN.large,
  },
});

const SLIDER_COLORS: string[] = [
  '#ff0000',
  '#ffff00',
  '#00ff00',
  '#00ffff',
  '#0000ff',
  '#ff00ff',
  '#ff0000',
];

const RGB_VALUE = 255;
/*
 * 255 (color) * 6 (transitions) = 1530
 * transitions:
 *  1. #ff0000 => #ffff00
 *  2. #ffff00 => #00ff00
 *  3. #00ff00 => #00ffff
 *  4. #00ffff => #0000ff
 *  5. #0000ff => #ff00ff
 *  6. #ff00ff => #ff0000
 */
const MAX_SLIDER_VALUE = RGB_VALUE * 6;

const convertValueToHex = (value: number): string => {
  const map = [
    {
      incrementIndex: 1,
      color: [255, 0, 0],
    },
    {
      decrementIndex: 0,
      color: [255, 255, 0],
    },
    {
      incrementIndex: 2,
      color: [0, 255, 0],
    },
    {
      decrementIndex: 1,
      color: [0, 255, 255],
    },
    {
      incrementIndex: 0,
      color: [0, 0, 255],
    },
    {
      decrementIndex: 2,
      color: [255, 0, 255],
    },
    {
      color: [255, 0, 0],
    },
  ];
  const index: number = Math.floor(value / RGB_VALUE);
  const metadata = map[index];

  const rgbValues: number[] = metadata.color;
  const remainingColor: number = Math.floor(value) % RGB_VALUE;
  if (remainingColor > 0) {
    if (metadata.incrementIndex !== undefined) {
      rgbValues[metadata.incrementIndex] += remainingColor;
    }
    if (metadata.decrementIndex !== undefined) {
      rgbValues[metadata.decrementIndex] -= remainingColor;
    }
  }
  return rgbValues
    .map(ColorService.toHex)
    .reduce((prev: string, hex: string) => (prev += hex), '#');
};

const ColorPicker: React.FC = () => {
  const [blendColor, setBlendColor] = useState<string>('#ff0000');

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
        colors={['#fff', blendColor, '#000']}
        style={styles.linearGradient}>
        <IconButton icon="circle-outline" />
      </LinearGradient>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={SLIDER_COLORS}
        style={styles.slider}>
        <Slider
          minimumValue={0}
          maximumValue={MAX_SLIDER_VALUE}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="white"
          onValueChange={(value: number) =>
            setBlendColor(convertValueToHex(value))
          }
        />
      </LinearGradient>
    </View>
  );
};

export default ColorPicker;
