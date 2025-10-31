module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '@': '.',
            '@/*': ['./*'],
            '@constants': './constants',
            '@constants/*': ['./constants/*'],
            '@hooks': './hooks',
            '@hooks/*': ['./hooks/*']
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
