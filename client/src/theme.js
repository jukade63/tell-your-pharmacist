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
    fontFamily: 'Source Sans 3, sans-serif',
    fontWeightRegular: 300,
    fontSize: 14,
    // allVariants: {
    //   color: '#102e75',
    // fontFamily: 'Source Sans 3, sans-serif',

    // },

    h2: {
      fontSize: '2.2rem',
      fontWeight: 400,
      letterSpacing: '0.05em',
      lineHeight: 1.1,
    },
    h3: {
      fontSize: '1.1rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    h4: {
      fontSize: '1.025rem',
      fontWeight: 500,
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
      fontSize: '0.8rem',
      fontWeight: 400,
    },
    subtitle4: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.025em',
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.74rem',
      letterSpacing: '0.05em',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.75rem',
      letterSpacing: '0.05em',
      fontFamily: 'Source Sans 3, sans-serif',
      lineHeight: '90%',
      fontWeight: 300,
    },
    button: {
      color: 'primary',
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: '0.065em',
      lineHeight: 2,
      textTransform: 'none'
    },
  },
})
