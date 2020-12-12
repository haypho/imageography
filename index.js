// DO NOT MOVE
// react - native - gesture - handler must be the first import in the entry file.
import 'react-native-gesture-handler';

import React from 'react';
import { AppRegistry, Platform, StatusBar } from 'react-native';
import App from './src/features/App';
import { name as appName } from './app.json';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/store';

const Main = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  let barStyle;
  if (Platform.OS === 'ios') {
    barStyle = colorScheme === 'dark' ? 'dark-content' : 'light-content';
  } else {
    barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ReduxProvider store={store}>
          <StatusBar
            barStyle={barStyle}
            backgroundColor={theme.colors.background}
          />
          <App />
        </ReduxProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
