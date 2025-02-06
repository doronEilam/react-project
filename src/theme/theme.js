// src/theme/theme.js
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#9c27b0",
          },
          background: {
            default: "#f5f5f5",
            paper: "#fff",
          },
        }
      : {
          // Dark mode
          primary: {
            main: "#90caf9",
          },
          secondary: {
            main: "#ce93d8",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
        }),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#fff",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#1976d2",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#fff",
        },
      },
    },
  },
});
