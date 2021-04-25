import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MARGIN } from '../../constants';
import Slider from '@react-native-community/slider';

const styles = StyleSheet.create({
  slider: {
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    marginVertical: MARGIN.large,
  },
});

const SLIDER_COLORS: string[] = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff0000'];

export interface ColorSliderProps {
  onChangeHue(value: number): void;
}

const ColorSlider: React.FC<ColorSliderProps> = ({ onChangeHue }: ColorSliderProps) => {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={SLIDER_COLORS} style={styles.slider}>
      <Slider
        minimumValue={0}
        maximumValue={360}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor="white"
        onValueChange={onChangeHue}
      />
    </LinearGradient>
  );
};

export default ColorSlider;
