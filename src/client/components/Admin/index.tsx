import React from 'react';
import { Grid } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DataLoader from './DataLoader';
import Accounts from './Accounts';
import Groups from './Groups';
import Permissions from './Permissions';
import AdminNavigator from './AdminNavigator';

export default function Admin() {
  return (
    <Grid
      container
      spacing={2}
    >
      <DataLoader />
      <Router>
        <AdminNavigator />
        <Switch>
          <Route path="/admin/account">
            <Accounts />
          </Route>
          <Route path="/admin/group">
            <Groups />
          </Route>
          <Route path="/admin/permission">
            <Permissions />
          </Route>
        </Switch>
      </Router>
    </Grid>
  );
}
