import React, { useState } from 'react';
import { AppBar, Button, Typography, Toolbar, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../../redux/state';
import { LockOpen, Lock } from '@material-ui/icons'
import LoginDialog from './LoginDialog';
import Actions from '../../redux/actions';
import { dispatch } from '../../redux/store';
import { Link } from 'react-router-dom';

export default function ApplicationBar() {
  const account = useSelector((state: State) => state.account);
  const {
    loggedIn,
  } = account;

  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  return (
    <AppBar>
      <Toolbar>
        <Grid container>
          <Grid item>
            <Button component={Link} to="/" >
              <Typography>Home</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button component={Link} to="/explorer/browser" >
              <Typography>Browser</Typography>
            </Button>
          </Grid>
          <Grid item xs>
            <Button component={Link} to="/admin" >
              <Typography>Admin</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => loggedIn ? dispatch(Actions.logout()) : setLoginDialogOpen(true)}>
              {loggedIn ? <Lock /> : <LockOpen />}
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
      <LoginDialog open={loginDialogOpen} handleClose={() => setLoginDialogOpen(false)} />
    </AppBar>
  );
}
