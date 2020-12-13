import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton } from 'react-native-paper';
import { MARGIN } from '../../constants';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import ColorSlider from '../color-slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: MARGIN.large,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 15,
  },
});

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
        <PanGestureHandler>
          <Animated.View>
            <IconButton icon="circle-outline" />
          </Animated.View>
        </PanGestureHandler>
      </LinearGradient>
      <ColorSlider onValueChange={setBlendColor} />
    </View>
  );
};

export default ColorPicker;
