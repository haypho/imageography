// DO NOT MOVE
// react - native - gesture - handler must be the first import in the entry file.
import 'react-native-gesture-handler';

import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import App from './src/features/App';
import { name as appName } from './app.json';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Main = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <App />
      </NavigationContainer>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
