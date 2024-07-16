import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          body {
            background-color: #bdbdbd;
          }
        `,
    },
  },
});

export default theme;
