import React from 'react';
import { createMuiTheme, ThemeProvider, Typography, Toolbar } from '@material-ui/core';
import { blueGrey, blue } from '@material-ui/core/colors';
import ApplicationBar from './components/ApplicationBar';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/Admin';

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
        <Router>
          <ApplicationBar />
          <Toolbar />
          <Switch>
            <Route exact path="/">
              <Typography>Hi!</Typography>
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
