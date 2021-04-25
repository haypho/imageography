import React, { useCallback, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { MARGIN } from '@app/constants';
import ColorSlider from '@app/components/color-slider';
import { useTheme } from '@react-navigation/native';

type AnimatedContext = {
  startX: number;
  startY: number;
};

const CURSOR_SIZE: number = 32;

interface ColorPickerProps {
  onChange(hex: string): void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onChange }) => {
  const theme = useTheme();
  const [gradientBounds, setGradientBounds] = useState<{ x: number; y: number }>({ x: 300, y: 300 });

  const hue = useSharedValue(0);

  const setBounds = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setGradientBounds({ x: width - CURSOR_SIZE, y: height - CURSOR_SIZE });
    },
    [setGradientBounds],
  );

  const translation = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  };

  const hslToHex = useCallback((): string => {
    'worklet';
    const saturation: number = interpolate(translation.x.value, [0, gradientBounds.x], [0, 100], Extrapolate.CLAMP);
    let lightness: number = interpolate(translation.y.value, [0, gradientBounds.y], [100, 0], Extrapolate.CLAMP);
    lightness = lightness - saturation / 2;
    lightness = lightness < 0 ? 0 : lightness;
    lightness /= 100;
    const a: number = (saturation * Math.min(lightness, 1 - lightness)) / 100;
    const calc = (value: number) => {
      const k = (value + hue.value / 30) % 12;
      const color = lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${calc(0)}${calc(8)}${calc(4)}`;
  }, [gradientBounds.x, gradientBounds.y, hue.value, translation.x.value, translation.y.value]);
  const onChangeHue = useCallback(
    (h: number) => {
      hue.value = h;
      const hex: string = hslToHex();
      runOnJS(onChange)(hex);
    },
    [hslToHex, hue.value, onChange],
  );
  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedContext>(
    {
      onStart: (_, context) => {
        context.startX = translation.x.value;
        context.startY = translation.y.value;
      },
      onActive: (event, context) => {
        translation.x.value = interpolate(
          context.startX + event.translationX,
          [0, gradientBounds.x],
          [0, gradientBounds.x],
          Extrapolate.CLAMP,
        );
        translation.y.value = interpolate(
          context.startY + event.translationY,
          [0, gradientBounds.y],
          [0, gradientBounds.y],
          Extrapolate.CLAMP,
        );
      },
      onEnd: () => {
        const hex: string = hslToHex();
        runOnJS(onChange)(hex);
      },
    },
    [gradientBounds],
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translation.x.value,
        },
        {
          translateY: translation.y.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#fff', `hsl(${hue.value}, 100%, 50%)`]}
        style={styles.linearGradient}
        onLayout={setBounds}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['transparent', '#000']}
          style={styles.linearGradient}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={animatedStyles}>
              <View style={[styles.cursor, { borderColor: theme.colors.background }]} />
            </Animated.View>
          </PanGestureHandler>
        </LinearGradient>
      </LinearGradient>
      <ColorSlider onChangeHue={onChangeHue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: MARGIN.large,
  },
  linearGradient: {
    flex: 1,
    borderRadius: Math.floor(CURSOR_SIZE / 2),
  },
  cursor: {
    height: CURSOR_SIZE,
    width: CURSOR_SIZE,
    borderWidth: 3,
    borderRadius: Math.floor(CURSOR_SIZE / 2),
  },
});

export default ColorPicker;
