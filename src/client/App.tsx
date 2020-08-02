import React from 'react';
import { Grid, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blueGrey, blue } from '@material-ui/core/colors';
import ApplicationBar from './components/ApplicationBar';
import { SnackbarProvider } from 'notistack';

export default function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      background: {
        default: blueGrey[900],
        paper: blueGrey[800],
      },
      primary: {
        light: blue[200],
        main: blue[300],
        dark: blue[400],
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={5}>
        <ApplicationBar />
        <Grid container spacing={2}>
          hi
      </Grid>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
