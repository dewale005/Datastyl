import { createTheme } from '@mui/material/styles';

// Create a custom MUI theme
const theme = createTheme({
  typography: {
    // Set the global font family
    fontFamily: '"Source Sans Pro", Arial, sans-serif', // Fallback to Arial and sans-serif if the custom font is unavailable
  },
  palette: {
    // Define primary color
    primary: {
      main: '#1976d2', // Custom primary color (replace with your desired color)
    },
    // Define secondary color
    secondary: {
      main: '#dc004e', // Custom secondary color (replace with your desired color)
    },
  },
  components: {
    // Customize individual component styles
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700, // Make table header cells bold
        },
      },
    },
  },
});

export default theme;
