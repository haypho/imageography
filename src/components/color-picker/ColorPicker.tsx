import React, { useCallback, useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton } from 'react-native-paper';
import { MARGIN } from '../../constants';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import ColorSlider from '../color-slider';
import Animated, { cond, eq, set, add, sub } from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: MARGIN.large,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 15,
  },
  cursor: {},
});

const ColorPicker: React.FC = () => {
  const [blendColor, setBlendColor] = useState<string>('#ff0000');

  const state = useRef(new Animated.Value(-1)).current;

  const dragX = useRef(new Animated.Value(0)).current;
  const dragY = useRef(new Animated.Value(0)).current;

  const transX = useRef(new Animated.Value(0)).current;
  const transY = useRef(new Animated.Value(0)).current;

  const prevDragX = useRef(new Animated.Value(0)).current;
  const prevDragY = useRef(new Animated.Value(0)).current;

  const onGestureEvent = useCallback(
    Animated.event(
      [
        {
          nativeEvent: {
            translationX: dragX,
            translationY: dragY,
            state,
          },
        },
      ],
      { useNativeDriver: true },
    ),
    [],
  );

  const translateX = cond(
    eq(state, State.ACTIVE),
    [
      set(transX, add(transX, sub(dragX, prevDragX))),
      set(prevDragX, dragX),
      transX.interpolate({
        inputRange: [-15, 345],
        outputRange: [-15, 345],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
    ],
    [
      set(dragX, 0),
      set(prevDragX, 0),
      transX.interpolate({
        inputRange: [-15, 345],
        outputRange: [-15, 345],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
    ],
  );

  const translateY = cond(
    eq(state, State.ACTIVE),
    [
      set(transY, add(transY, sub(dragY, prevDragY))),
      set(prevDragY, dragY),
      transY.interpolate({
        inputRange: [-16, 187],
        outputRange: [-16, 187],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
    ],
    [
      set(dragY, 0),
      set(prevDragY, 0),
      transY.interpolate({
        inputRange: [-16, 187],
        outputRange: [-16, 187],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
    ],
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
        colors={['#fff', blendColor, '#000']}
        onLayout={(event: LayoutChangeEvent) => {
          console.log(event.nativeEvent.layout);
        }}
        style={styles.linearGradient}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onGestureEvent}>
          <Animated.View
            onLayout={(event) =>
              console.log('animated view: ', event.nativeEvent.layout)
            }
            style={[
              styles.cursor,
              {
                transform: [
                  {
                    translateX,
                    translateY,
                  },
                ],
              },
            ]}>
            <IconButton
              icon="circle-outline"
              color="grey"
              size={30}
              style={{ position: 'relative', top: 0, left: 0 }}
              onLayout={(event) =>
                console.log('icon', event.nativeEvent.layout)
              }
            />
          </Animated.View>
        </PanGestureHandler>
      </LinearGradient>
      <ColorSlider onValueChange={setBlendColor} />
    </View>
  );
};

export default ColorPicker;
