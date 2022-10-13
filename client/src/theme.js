import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    text: {
      primary: '#102e75',
    },
    primary: {
      main: '#A83A7F',
    },
    secondary: {
      main: '#1C419A',
    },
    muted: {
      main: '#999999'
    },
    background: {
      paper: '#fffcfe',
    },
  },
  typography: {
    fontFamily: 'IBM Plex Sans Thai, sans-serif',
    fontWeightRegular: 300,
    fontSize: 12,
    allVariants: {
      color: '#102e75',
      fontFamily: 'IBM Plex Sans Thai, sans-serif'
    },

    h2: {
      fontSize: '2.2rem',
      fontWeight: 400,
      letterSpacing: '0.05em',
      lineHeight: 1.1,
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    h4: {
      fontSize: '1.025rem',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
      letterSpacing: '0.01em',
      lineHeight: 1.4,
    },
    subtitle2: {
      fontSize: '0.85rem',
      fontWeight: 600,
      letterSpacing: '0.025em',
      lineHeight: 1.4,
    },
    subtitle3: {
      fontSize: '0.65rem',
      fontWeight: 500,
    },
    subtitle4: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 600,
    },
    body1: {
      letterSpacing: '0.05em',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.7rem',
      letterSpacing: '0.05em',
      fontWeight: 300,
    },
    button: {
      color: 'primary',
      fontSize: '1.1rem',
      fontWeight: 600,
      letterSpacing: '0.06em',
      lineHeight: 2,
    },
  },
})
