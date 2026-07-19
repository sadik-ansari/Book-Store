import { createTheme } from '@mui/material/styles';

// Design tokens
// paper   #F7F2E7  warm paper cream (background)
// ink     #1E1B16  near-black warm ink (text)
// navy    #2B3A55  spine navy (primary)
// gold    #C89B3C  bookmark ribbon gold (accent)
// green   #33513F  spine green (secondary accent)
// burgundy#7A2E2E  spine burgundy (tertiary accent)

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F7F2E7',
      paper: '#FFFDF8',
    },
    text: {
      primary: '#1E1B16',
      secondary: '#5B5347',
    },
    primary: {
      main: '#2B3A55',
      light: '#3F5175',
      dark: '#1B2740',
      contrastText: '#F7F2E7',
    },
    secondary: {
      main: '#C89B3C',
      dark: '#A87F2A',
      contrastText: '#1E1B16',
    },
    divider: 'rgba(30,27,22,0.12)',
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: '"Fraunces", "Georgia", serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Fraunces", "Georgia", serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Fraunces", "Georgia", serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Fraunces", "Georgia", serif',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    overline: {
      fontFamily: '"IBM Plex Mono", monospace',
      letterSpacing: '0.14em',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          paddingLeft: 22,
          paddingRight: 22,
          paddingTop: 10,
          paddingBottom: 10,
        },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
  },
});

export default theme;
