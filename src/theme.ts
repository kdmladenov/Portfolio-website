import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10b981', // emerald-500
      light: '#34d399', // emerald-400
      dark: '#059669', // emerald-600
    },
    secondary: {
      main: '#ffffff',
      light: '#f3f4f6', // gray-100
      dark: '#6b7280', // gray-500
    },
    background: {
      default: '#111827', // gray-900
      paper: '#1f2937', // gray-800
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.6)',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Calistoga", "Inter", sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '4rem',
      },
    },
    h2: {
      fontFamily: '"Calistoga", "Inter", sans-serif',
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: '"Calistoga", "Inter", sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#111827',
          color: '#ffffff',
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#1f2937',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#374151',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#4b5563',
          },
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: '#374151 #1f2937',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          fontWeight: 600,
          padding: '12px 24px',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          },
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#1f2937',
            borderRadius: '12px',
            '& fieldset': {
              borderColor: '#374151',
            },
            '&:hover fieldset': {
              borderColor: '#6b7280',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#10b981',
            },
          },
        },
      },
    },
  },
})
