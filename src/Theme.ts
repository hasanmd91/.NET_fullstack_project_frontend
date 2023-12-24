import { createTheme } from '@mui/material/styles';

export const shades = {
  primary: {
    100: '#cccccc',
    200: '#999999',
    300: '#666666',
    400: '#333333',
    500: '#000000',
    600: '#000000',
    700: '#000000',
    800: '#000000',
    900: '#000000',
  },
  secondary: {
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#d93226',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: shades.primary[500],
    },
    secondary: {
      main: shades.secondary[500],
    },
  },
  typography: {
    fontFamily: ['Fauna One', 'sans-serif'].join(','),
    fontSize: 11,
    h1: {
      fontFamily: ['Cinzel', 'sans-serif'].join(','),
      fontSize: 48,
    },
    h2: {
      fontFamily: ['Cinzel', 'sans-serif'].join(','),
      fontSize: 36,
    },
    h3: {
      fontFamily: ['Cinzel', 'sans-serif'].join(','),
      fontSize: 20,
    },
    h4: {
      fontFamily: ['Cinzel', 'sans-serif'].join(','),
      fontSize: 14,
    },
  },
});
