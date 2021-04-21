module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-papaer/babel',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@app': './src/',
        },
      },
    ],
    'react-native-reanimated/plugin', // Must be the last plugin
  ],
};
