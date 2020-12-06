import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper';
import { useColorScheme } from 'react-native';

const Main = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
