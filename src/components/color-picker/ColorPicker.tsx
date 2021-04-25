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
} from 'react-native-reanimated';
import { MARGIN } from '@app/constants';
import ColorSlider from '@app/components/color-slider';

type AnimatedContext = {
  startX: number;
  startY: number;
};

const CURSOR_SIZE: number = 32;

const ColorPicker: React.FC = () => {
  const [gradientLayout, setGradientLayout] = useState<{ x: number; y: number }>({ x: 300, y: 300 });
  const [blendColor, setBlendColor] = useState<string>('#ff0000');

  const setBounds = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setGradientLayout({ x: width - CURSOR_SIZE, y: height - CURSOR_SIZE });
    },
    [setGradientLayout],
  );

  const translation = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  };

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedContext>(
    {
      onStart: (_, context) => {
        context.startX = translation.x.value;
        context.startY = translation.y.value;
      },
      onActive: (event, context) => {
        translation.x.value = context.startX + event.translationX;
        translation.y.value = context.startY + event.translationY;
      },
      onEnd: () => {
        console.log('x', translation.x.value, 'y', translation.y.value);
      },
    },
    [],
  );
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(translation.x.value, [0, gradientLayout.x], [0, gradientLayout.x], Extrapolate.CLAMP),
        },
        {
          translateY: interpolate(translation.y.value, [0, gradientLayout.y], [0, gradientLayout.y], Extrapolate.CLAMP),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
        colors={['#fff', blendColor, '#000']}
        style={styles.linearGradient}
        onLayout={setBounds}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.cursor, animatedStyles]} />
        </PanGestureHandler>
      </LinearGradient>
      <ColorSlider onValueChange={setBlendColor} />
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
    borderRadius: 15,
  },
  cursor: {
    height: CURSOR_SIZE,
    width: CURSOR_SIZE,
    borderWidth: 3,
    borderRadius: Math.floor(CURSOR_SIZE / 2),
  },
});

export default ColorPicker;
