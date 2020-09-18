import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core'
import AddressBar from './AddressBar';
import Browser from './Browser';

export default function Explorer() {
  return (
    <Grid
      container
      spacing={2}
    >
      <Router>
          <Route path="/explorer/:viewer/:path*" component={AddressBar} />
          <Switch>
            <Route path="/explorer/browser/:path*" component={Browser} />
          </Switch>
        </Router>
    </Grid>
  );
}
