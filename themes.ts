import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

export const colors = {
  main: '#A37774',
  grey: '#8d99ae',
  white: '#fff',
  error: '#EE6364',
  success: '#84c3be',
};

export const paperTheme = {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: colors.main,
    error: colors.error,
    background: colors.white,
  },
};

export const navigationTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: colors.main,
    border: colors.main,
    text: colors.white,
    background: colors.white,
  },
};
